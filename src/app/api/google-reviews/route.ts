import { NextResponse } from 'next/server'

// Google Places API endpoint for fetching reviews
export async function GET() {
  try {
    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY
    const PLACE_ID = process.env.GOOGLE_PLACE_ID // You'll need to find the gym's Place ID
    
    if (!GOOGLE_PLACES_API_KEY || !PLACE_ID) {
      return NextResponse.json(
        { error: 'Missing Google API configuration' },
        { status: 500 }
      )
    }

    // Fetch place details including reviews
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?` +
      `place_id=${PLACE_ID}&` +
      `fields=name,rating,user_ratings_total,reviews&` +
      `key=${GOOGLE_PLACES_API_KEY}`
    )

    const data = await response.json()

    if (data.status !== 'OK') {
      throw new Error(`Google API Error: ${data.status}`)
    }

    // Transform Google reviews to match our testimonial format
    const reviews = data.result.reviews?.map((review: any) => ({
      id: review.author_url,
      name: review.author_name,
      content: review.text,
      rating: review.rating,
      profile_photo: review.profile_photo_url,
      time: new Date(review.time * 1000).toISOString(),
      isFromGoogle: true
    })) || []

    return NextResponse.json({
      rating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
      reviews: reviews
    })

  } catch (error) {
    console.error('Failed to fetch Google reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}