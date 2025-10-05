import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { query } from '@/lib/db/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { priceId, locale } = await req.json()

  if (!priceId) {
    return NextResponse.json({ error: 'Price ID required' }, { status: 400 })
  }

  // Get user's Stripe customer ID
  const userResult = await query(
    'SELECT stripe_customer_id FROM online_users WHERE clerk_user_id = $1',
    [userId]
  )

  if (userResult.rows.length === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const customerId = userResult.rows[0].stripe_customer_id

  try {
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/${locale}/online/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/${locale}/online?canceled=true`,
      metadata: {
        clerk_user_id: userId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
