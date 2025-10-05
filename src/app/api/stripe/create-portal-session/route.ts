import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.redirect('/sign-in')
  }

  const formData = await req.formData()
  const customerId = formData.get('customerId') as string

  if (!customerId) {
    return NextResponse.json({ error: 'Customer ID required' }, { status: 400 })
  }

  try {
    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/online/dashboard`,
    })

    return NextResponse.redirect(session.url)
  } catch (error) {
    console.error('Portal session error:', error)
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    )
  }
}
