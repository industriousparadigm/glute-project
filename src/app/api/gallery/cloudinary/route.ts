import { NextRequest, NextResponse } from 'next/server'

const CACHE_SECONDS = 3600 // 1 hour cache for Cloudinary
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'thunder-fusion'
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
const DEFAULT_GALLERY_FOLDER = 'glute/dia-a-dia' // Default folder in Cloudinary

// In-memory cache per folder
const folderCaches = new Map<string, { images: any[], timestamp: number }>()
const MEMORY_CACHE_MS = 5 * 60 * 1000 // 5 minutes

interface CloudinaryResource {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  created_at: string
  folder: string
  asset_id: string
}

interface GalleryImage {
  url: string
  thumbnail: string
  name: string
  modified: string
  width: number
  height: number
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

async function fetchCloudinaryImages(folder: string): Promise<CloudinaryResource[]> {
  console.log('=== CLOUDINARY DEBUG START ===')
  console.log('[Cloudinary] Cloud Name:', CLOUDINARY_CLOUD_NAME)
  console.log('[Cloudinary] API Key exists:', !!CLOUDINARY_API_KEY)
  console.log('[Cloudinary] API Secret exists:', !!CLOUDINARY_API_SECRET)
  console.log('[Cloudinary] Gallery Folder:', folder)

  if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error('[Cloudinary] FATAL: Missing API credentials')
    console.error('[Cloudinary] API Key:', CLOUDINARY_API_KEY || 'NOT SET')
    console.error('[Cloudinary] API Secret:', CLOUDINARY_API_SECRET ? '***hidden***' : 'NOT SET')
    throw new Error('Cloudinary credentials not configured')
  }

  // Use Cloudinary Admin API to list resources
  const auth = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString('base64')
  console.log('[Cloudinary] Auth header created (length):', auth.length)

  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image`
  const params = new URLSearchParams({
    type: 'upload',
    prefix: folder,
    max_results: '50',
    context: 'true',
    tags: 'true',
    metadata: 'true'
  })

  const fullUrl = `${url}?${params}`
  console.log('[Cloudinary] Full API URL:', fullUrl)
  console.log('[Cloudinary] Request params:', Object.fromEntries(params))

  const response = await fetch(fullUrl, {
    headers: {
      'Authorization': `Basic ${auth}`
    }
  })

  console.log('[Cloudinary] Response status:', response.status)
  console.log('[Cloudinary] Response headers:', Object.fromEntries(response.headers.entries()))

  if (!response.ok) {
    console.error('[Cloudinary] API error - Status:', response.status)
    const error = await response.text()
    console.error('[Cloudinary] Error response body:', error)
    throw new Error(`Failed to fetch images from Cloudinary: ${response.status} - ${error}`)
  }

  const data = await response.json()
  console.log('[Cloudinary] Response data keys:', Object.keys(data))
  console.log('[Cloudinary] Total resources found:', data.resources?.length || 0)

  if (data.resources && data.resources.length > 0) {
    console.log('[Cloudinary] First 3 resources:')
    data.resources.slice(0, 3).forEach((r: any, i: number) => {
      console.log(`  [${i}] public_id: ${r.public_id}`)
      console.log(`      secure_url: ${r.secure_url}`)
      console.log(`      format: ${r.format}`)
      console.log(`      width: ${r.width} x height: ${r.height}`)
    })
  } else {
    console.warn('[Cloudinary] NO RESOURCES FOUND!')
    console.log('[Cloudinary] Full response:', JSON.stringify(data, null, 2))
  }

  console.log('=== CLOUDINARY DEBUG END ===')
  return data.resources || []
}

function transformToGalleryImage(resource: CloudinaryResource): GalleryImage {
  console.log(`[Transform] Processing: ${resource.public_id}`)

  // Generate optimized URLs using Cloudinary transformations
  const baseUrl = resource.secure_url.replace('/upload/', '/upload/f_auto,q_auto/')

  // Thumbnail: 200x200 with smart cropping
  const thumbnailUrl = resource.secure_url.replace(
    '/upload/',
    '/upload/c_fill,w_200,h_200,g_auto,f_auto,q_auto/'
  )

  // Full image: optimized for web, max width 1920px
  const fullUrl = resource.secure_url.replace(
    '/upload/',
    '/upload/c_limit,w_1920,f_auto,q_auto:best/'
  )

  // Extract filename from public_id
  const name = resource.public_id.split('/').pop() || resource.public_id

  console.log(`[Transform] Thumbnail URL: ${thumbnailUrl}`)
  console.log(`[Transform] Full URL: ${fullUrl}`)

  return {
    url: fullUrl,
    thumbnail: thumbnailUrl,
    name: name,
    modified: resource.created_at,
    width: resource.width,
    height: resource.height
  }
}

export async function GET(request: NextRequest) {
  console.log('\n[Cloudinary Gallery API] Request received')
  const searchParams = request.nextUrl.searchParams
  const count = parseInt(searchParams.get('count') || '20', 10)
  const order = searchParams.get('order') || 'latest'
  const folder = searchParams.get('folder') || DEFAULT_GALLERY_FOLDER
  console.log('[Cloudinary Gallery API] Count:', count, 'Order:', order, 'Folder:', folder)

  // Check memory cache first (per folder)
  const cachedData = folderCaches.get(folder)
  if (cachedData && Date.now() - cachedData.timestamp < MEMORY_CACHE_MS) {
    console.log('[Cloudinary Gallery API] Serving from cache')
    const images = order === 'random'
      ? shuffleArray(cachedData.images).slice(0, count)
      : cachedData.images.slice(0, count)

    return NextResponse.json(
      { images, cached: true },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate`,
        },
      }
    )
  }

  console.log('[Cloudinary Gallery API] Cache miss, fetching from Cloudinary...')

  try {
    // Fetch images from Cloudinary
    const resources = await fetchCloudinaryImages(folder)

    // Transform to gallery format
    let images = resources.map(transformToGalleryImage)

    // Sort or shuffle
    if (order === 'latest') {
      images.sort((a, b) =>
        new Date(b.modified).getTime() - new Date(a.modified).getTime()
      )
    } else if (order === 'random') {
      images = shuffleArray(images)
    }

    // Update cache with all images (per folder)
    folderCaches.set(folder, { images, timestamp: Date.now() })

    // Return requested count
    const selectedImages = images.slice(0, Math.min(count, images.length))

    return NextResponse.json(
      { images: selectedImages, cached: false },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate`,
        },
      }
    )
  } catch (error) {
    console.error('[Cloudinary Gallery API] ERROR:', error)
    console.error('[Cloudinary Gallery API] Error stack:', error instanceof Error ? error.stack : 'No stack trace')

    // Return graceful error
    return NextResponse.json(
      {
        error: 'Unable to load images at this time',
        images: []
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    )
  }
}