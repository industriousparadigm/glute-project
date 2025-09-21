import { NextRequest, NextResponse } from 'next/server'

const DROPBOX_APP_KEY = 'zc0q9ztfuqtjmsh'
const DROPBOX_APP_SECRET = 'uxbkj3h00f1jdfc'
// For App folder apps, the path is relative to the app folder
// Don't include /Apps/[AppName]/ - just use the subfolder path
const DROPBOX_FOLDER_PATH = '/dia-a-dia/optimized'
const CACHE_SECONDS = 600 // 10 minutes

// In-memory cache
let cachedData: { images: any[], timestamp: number } | null = null
const MEMORY_CACHE_MS = 60 * 1000 // 1 minute

interface DropboxFile {
  name: string
  path_lower: string
  server_modified: string
  id: string
}

interface GalleryImage {
  url: string
  name: string
  modified: string
  thumbnail?: string
}

async function getAccessToken(): Promise<string> {
  const refreshToken = process.env.DROPBOX_REFRESH_TOKEN

  console.log('[Dropbox] Getting access token...')
  console.log('[Dropbox] Refresh token exists:', !!refreshToken)

  if (!refreshToken) {
    console.error('[Dropbox] ERROR: DROPBOX_REFRESH_TOKEN not configured')
    throw new Error('DROPBOX_REFRESH_TOKEN not configured')
  }
  
  const response = await fetch('https://api.dropboxapi.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: DROPBOX_APP_KEY,
      client_secret: DROPBOX_APP_SECRET,
    }),
  })

  console.log('[Dropbox] Token response status:', response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.error('[Dropbox] Token error response:', errorText)
    throw new Error(`Failed to get access token: ${response.status}`)
  }

  const data = await response.json()
  console.log('[Dropbox] Access token obtained successfully')
  return data.access_token
}

async function listImages(accessToken: string): Promise<DropboxFile[]> {
  console.log('[Dropbox] Listing images from folder:', DROPBOX_FOLDER_PATH)

  const response = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: DROPBOX_FOLDER_PATH,
      recursive: false,
      include_media_info: false,
    }),
  })
  
  if (!response.ok) {
    const error = await response.text()
    console.error('[Dropbox] list_folder error:', error)
    console.error('[Dropbox] Response status:', response.status)
    throw new Error('Failed to list images from Dropbox')
  }

  const data = await response.json()
  console.log('[Dropbox] Total entries found:', data.entries?.length || 0)
  console.log('[Dropbox] Raw entries:', JSON.stringify(data.entries?.slice(0, 3), null, 2))

  // Filter for image files
  const imageExtensions = /\.(jpg|jpeg|png|webp|gif)$/i
  const images = data.entries.filter((file: any) =>
    file['.tag'] === 'file' && imageExtensions.test(file.name)
  )

  console.log('[Dropbox] Filtered image files:', images.length)
  console.log('[Dropbox] Image names:', images.map((f: any) => f.name))

  return images
}

async function getTemporaryLinks(
  accessToken: string, 
  files: DropboxFile[]
): Promise<GalleryImage[]> {
  const links = await Promise.all(
    files.map(async (file) => {
      const response = await fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: file.path_lower,
        }),
      })
      
      if (!response.ok) {
        console.error(`Failed to get link for ${file.name}`)
        return null
      }
      
      const data = await response.json()
      
      return {
        url: data.link,
        name: file.name,
        modified: file.server_modified,
        thumbnail: data.link, // Same URL for now, client can handle sizing
      }
    })
  )
  
  return links.filter((link) => link !== null) as GalleryImage[]
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export async function GET(request: NextRequest) {
  console.log('\n[Gallery API] Request received')
  const searchParams = request.nextUrl.searchParams
  const count = parseInt(searchParams.get('count') || '12', 10)
  const order = searchParams.get('order') || 'latest'
  console.log('[Gallery API] Count:', count, 'Order:', order)
  
  // Check memory cache first
  if (cachedData && Date.now() - cachedData.timestamp < MEMORY_CACHE_MS) {
    console.log('[Gallery API] Serving from cache')
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

  console.log('[Gallery API] Cache miss, fetching from Dropbox...')
  
  try {
    // Get access token
    const accessToken = await getAccessToken()
    
    // List images in folder
    let files = await listImages(accessToken)
    
    // Sort or shuffle
    if (order === 'latest') {
      files.sort((a, b) => 
        new Date(b.server_modified).getTime() - new Date(a.server_modified).getTime()
      )
    } else if (order === 'random') {
      files = shuffleArray(files)
    }
    
    // Take requested count
    const selectedFiles = files.slice(0, Math.min(count, files.length))
    
    // Get temporary links
    const images = await getTemporaryLinks(accessToken, selectedFiles)
    
    // Update cache
    cachedData = { images, timestamp: Date.now() }
    
    return NextResponse.json(
      { images, cached: false },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate`,
        },
      }
    )
  } catch (error) {
    console.error('[Gallery API] ERROR:', error)
    console.error('[Gallery API] Error stack:', error instanceof Error ? error.stack : 'No stack trace')

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