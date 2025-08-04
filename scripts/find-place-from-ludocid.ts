// Convert Google Business ludocid to Place ID
// Run with: npx tsx scripts/find-place-from-ludocid.ts

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

interface PlaceResult {
  name: string
  place_id: string
  formatted_address: string
  rating?: number
  user_ratings_total?: number
}

interface PlacesSearchResponse {
  results: PlaceResult[]
  status: string
  error_message?: string
}

interface PlaceDetailsResponse {
  result: PlaceResult
  status: string
}

async function findPlaceFromLudocid() {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY
  
  if (!API_KEY) {
    console.error('❌ Missing GOOGLE_PLACES_API_KEY in .env.local')
    return
  }

  // Your ludocid from the URL
  const ludocid = '1616018237998107272'
  
  // Search for your exact business name
  const businessName = 'Glute Project - Private Fitness Studio'
  const location = 'Matosinhos'

  console.log('🔍 Searching for your business...')
  console.log(`Business: ${businessName}`)
  console.log(`Ludocid: ${ludocid}`)

  try {
    // Search for the business
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?` +
      `query=${encodeURIComponent(businessName + ' ' + location)}&` +
      `key=${API_KEY}`

    const response = await fetch(searchUrl)
    const data: PlacesSearchResponse = await response.json()

    if (data.status !== 'OK') {
      console.error('❌ Search failed:', data.status)
      console.error('Error:', data.error_message)
      return
    }

    console.log(`\n✅ Found ${data.results.length} results:\n`)

    // Look for exact match
    const exactMatch = data.results.find((place: PlaceResult) => 
      place.name.toLowerCase().includes('glute project')
    )

    if (exactMatch) {
      console.log('🎯 Found your business!')
      console.log(`Name: ${exactMatch.name}`)
      console.log(`Address: ${exactMatch.formatted_address}`)
      console.log(`\n🔑 Place ID: ${exactMatch.place_id}`)
      console.log('\nAdd this to your .env.local:')
      console.log(`GOOGLE_PLACE_ID=${exactMatch.place_id}`)
      
      // Get more details about this place
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?` +
        `place_id=${exactMatch.place_id}&` +
        `fields=name,rating,user_ratings_total&` +
        `key=${API_KEY}`
        
      const detailsResponse = await fetch(detailsUrl)
      const details: PlaceDetailsResponse = await detailsResponse.json()
      
      if (details.result) {
        console.log(`\n📊 Current stats:`)
        console.log(`Rating: ${details.result.rating}⭐`)
        console.log(`Total reviews: ${details.result.user_ratings_total}`)
      }
    } else {
      // Show all results
      data.results.forEach((place: PlaceResult, i: number) => {
        console.log(`${i + 1}. ${place.name}`)
        console.log(`   Address: ${place.formatted_address}`)
        console.log(`   Place ID: ${place.place_id}`)
        console.log(`   ---`)
      })
    }

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

findPlaceFromLudocid()