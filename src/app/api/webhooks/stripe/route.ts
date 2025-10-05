import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { query } from '@/lib/db/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Type extensions for Stripe objects with runtime properties that exist but are missing from type definitions
// These properties are documented in Stripe API but not present in the TypeScript SDK types for API version 2025-09-30.clover
interface SubscriptionWithPeriod extends Stripe.Subscription {
  current_period_start: number
  current_period_end: number
}

interface InvoiceWithDetails extends Stripe.Invoice {
  subscription: string | Stripe.Subscription
  payment_intent: string | Stripe.PaymentIntent | null
  payment_method_types: string[]
}

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err)
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      // Get the subscription from Stripe
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      ) as unknown as SubscriptionWithPeriod

      // Get user by Stripe customer ID
      const userResult = await query(
        'SELECT id FROM online_users WHERE stripe_customer_id = $1',
        [session.customer as string]
      )

      if (userResult.rows.length === 0) {
        console.error('❌ User not found for customer:', session.customer)
        break
      }

      const userId = userResult.rows[0].id

      // Get package by Stripe price ID
      const packageResult = await query(
        'SELECT id FROM online_packages WHERE stripe_price_id = $1',
        [subscription.items.data[0].price.id]
      )

      if (packageResult.rows.length === 0) {
        console.error('❌ Package not found for price:', subscription.items.data[0].price.id)
        break
      }

      const packageId = packageResult.rows[0].id

      // Create subscription in database
      await query(
        `INSERT INTO user_subscriptions
         (user_id, package_id, stripe_subscription_id, stripe_customer_id, status,
          current_period_start, current_period_end, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, to_timestamp($6), to_timestamp($7), NOW(), NOW())
         ON CONFLICT (stripe_subscription_id)
         DO UPDATE SET status = $5, updated_at = NOW()`,
        [
          userId,
          packageId,
          subscription.id,
          session.customer,
          subscription.status,
          subscription.current_period_start,
          subscription.current_period_end,
        ]
      )

      console.log(`✅ Subscription created: ${subscription.id} for user ${userId}`)
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as InvoiceWithDetails

      if (!invoice.subscription) break

      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription as string
      ) as unknown as SubscriptionWithPeriod

      // Update subscription status
      await query(
        `UPDATE user_subscriptions
         SET status = $1, current_period_start = to_timestamp($2),
             current_period_end = to_timestamp($3), updated_at = NOW()
         WHERE stripe_subscription_id = $4`,
        [
          subscription.status,
          subscription.current_period_start,
          subscription.current_period_end,
          subscription.id,
        ]
      )

      // Get user ID for payment record
      const subResult = await query(
        'SELECT user_id FROM user_subscriptions WHERE stripe_subscription_id = $1',
        [subscription.id]
      )

      if (subResult.rows.length > 0) {
        const userId = subResult.rows[0].user_id

        // Record payment
        await query(
          `INSERT INTO payments
           (user_id, subscription_id, stripe_payment_intent_id, stripe_invoice_id,
            amount, currency, status, payment_method, created_at)
           SELECT $1, us.id, $2, $3, $4, $5, $6, $7, NOW()
           FROM user_subscriptions us
           WHERE us.stripe_subscription_id = $8`,
          [
            userId,
            invoice.payment_intent as string,
            invoice.id,
            (invoice.amount_paid / 100).toFixed(2),
            invoice.currency,
            'succeeded',
            invoice.payment_method_types?.[0] || 'unknown',
            subscription.id,
          ]
        )

        console.log(`✅ Payment recorded: €${(invoice.amount_paid / 100).toFixed(2)}`)
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as unknown as SubscriptionWithPeriod

      await query(
        `UPDATE user_subscriptions
         SET status = $1, current_period_start = to_timestamp($2),
             current_period_end = to_timestamp($3), cancel_at_period_end = $4, updated_at = NOW()
         WHERE stripe_subscription_id = $5`,
        [
          subscription.status,
          subscription.current_period_start,
          subscription.current_period_end,
          subscription.cancel_at_period_end,
          subscription.id,
        ]
      )

      console.log(`✅ Subscription updated: ${subscription.id}`)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription

      await query(
        `UPDATE user_subscriptions
         SET status = $1, updated_at = NOW()
         WHERE stripe_subscription_id = $2`,
        ['canceled', subscription.id]
      )

      console.log(`✅ Subscription canceled: ${subscription.id}`)
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
