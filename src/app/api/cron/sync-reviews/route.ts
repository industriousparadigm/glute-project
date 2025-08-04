import { NextResponse } from 'next/server'
import { query } from '@/lib/db/client'

export const runtime = 'nodejs'
export const maxDuration = 60

// This runs daily at 3am UTC (configured in vercel.json)
export async function GET(request: Request) {
  try {
    // Verify this is called by Vercel Cron
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY
    const PLACE_ID = process.env.GOOGLE_PLACE_ID
    
    if (!GOOGLE_PLACES_API_KEY || !PLACE_ID) {
      throw new Error('Missing Google API configuration')
    }

    // Fetch reviews from Google
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?` +
      `place_id=${PLACE_ID}&` +
      `fields=reviews,rating,user_ratings_total&` +
      `key=${GOOGLE_PLACES_API_KEY}`
    )

    const data = await response.json()

    if (data.status !== 'OK') {
      throw new Error(`Google API Error: ${data.status}`)
    }

    // Start transaction
    await query('BEGIN')

    try {
      // Clear existing Google reviews
      await query('DELETE FROM testimonials WHERE source = $1', ['google'])

      // Insert new reviews
      for (const review of data.result.reviews || []) {
        await query(
          `INSERT INTO testimonials (name, content, created_at, source, rating, google_author_url)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            review.author_name,
            review.text,
            new Date(review.time * 1000),
            'google',
            review.rating,
            review.author_url
          ]
        )
      }

      await query('COMMIT')

      return NextResponse.json({
        success: true,
        reviewsSynced: data.result.reviews?.length || 0,
        rating: data.result.rating,
        totalReviews: data.result.user_ratings_total
      })

    } catch (error) {
      await query('ROLLBACK')
      throw error
    }

  } catch (error) {
    console.error('Review sync failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Sync failed', details: errorMessage },
      { status: 500 }
    )
  }
}