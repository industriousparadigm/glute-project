// Script to find your Google Place ID
// Run with: npx tsx scripts/find-place-id.ts

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function findPlaceId() {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY

  if (!API_KEY) {
    console.error('❌ Missing GOOGLE_PLACES_API_KEY in .env.local')
    return
  }

  // Search parameters
  const searchQuery = 'Glute Project Matosinhos'
  const location = '41.1844,-8.6963' // Matosinhos coordinates
  const radius = 5000 // 5km radius

  console.log('🔍 Searching for:', searchQuery)

  try {
    // First, search for the place
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?` +
      `query=${encodeURIComponent(searchQuery)}&` +
      `location=${location}&` +
      `radius=${radius}&` +
      `key=${API_KEY}`

    const searchResponse = await fetch(searchUrl)
    const searchData = await searchResponse.json()

    if (searchData.status !== 'OK') {
      console.error('❌ Search failed:', searchData.status)
      return
    }

    console.log(`\n✅ Found ${searchData.results.length} results:\n`)

    searchData.results.forEach((place, index) => {
      console.log(`${index + 1}. ${place.name}`)
      console.log(`   Address: ${place.formatted_address}`)
      console.log(`   Place ID: ${place.place_id}`)
      console.log(`   --------------------------------`)
    })

    if (searchData.results.length > 0) {
      console.log('\n💡 Copy the Place ID that matches your business!')
      console.log('   Add it to .env.local as: GOOGLE_PLACE_ID=...')
    }

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

findPlaceId()