// Test script to verify Google Reviews API is working
// Run with: npx tsx scripts/test-google-reviews.ts

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function testGoogleReviews() {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY
  const PLACE_ID = process.env.GOOGLE_PLACE_ID

  if (!API_KEY || !PLACE_ID) {
    console.error('❌ Missing environment variables!')
    console.log('Make sure you have set:')
    console.log('- GOOGLE_PLACES_API_KEY')
    console.log('- GOOGLE_PLACE_ID')
    return
  }

  console.log('🔍 Testing Google Places API...')
  console.log(`Place ID: ${PLACE_ID}`)

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?` +
      `place_id=${PLACE_ID}&` +
      `fields=name,rating,user_ratings_total,reviews&` +
      `key=${API_KEY}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== 'OK') {
      console.error('❌ API Error:', data.status)
      console.error('Error message:', data.error_message)
      return
    }

    console.log('✅ Success! Found business:', data.result.name)
    console.log(`⭐ Rating: ${data.result.rating} (${data.result.user_ratings_total} reviews)`)
    
    if (data.result.reviews && data.result.reviews.length > 0) {
      console.log(`\n📝 Latest ${data.result.reviews.length} reviews:`)
      data.result.reviews.forEach((review, i) => {
        console.log(`\n${i + 1}. ${review.author_name} - ${review.rating}⭐`)
        console.log(`   "${review.text.substring(0, 100)}..."`)
      })
    }

  } catch (error) {
    console.error('❌ Failed to fetch reviews:', error)
  }
}

testGoogleReviews()