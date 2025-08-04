import { InstagramPost, InstagramApiResponse } from './types'

const INSTAGRAM_API_BASE = 'https://graph.instagram.com/v18.0'
const CACHE_DURATION = 3600 // 1 hour in seconds

interface CachedData {
  posts: InstagramPost[]
  timestamp: number
}

let cache: CachedData | null = null

export async function getInstagramPosts(limit = 5): Promise<InstagramPost[]> {
  // Check if we have all required environment variables
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID
  
  if (!accessToken || !userId) {
    console.warn('Instagram API credentials not configured')
    return []
  }

  // Check cache
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION * 1000) {
    return cache.posts.slice(0, limit)
  }

  try {
    // Fetch posts from Instagram API
    const fields = 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp,username'
    const url = `${INSTAGRAM_API_BASE}/${userId}/media?fields=${fields}&limit=${limit * 2}&access_token=${accessToken}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`)
    }
    
    const data: InstagramApiResponse = await response.json()
    
    // Filter to only include images and carousels (not videos without thumbnails)
    const posts = data.data.filter(post => 
      post.media_type === 'IMAGE' || 
      post.media_type === 'CAROUSEL_ALBUM' ||
      (post.media_type === 'VIDEO' && post.thumbnail_url)
    ).slice(0, limit)
    
    // Update cache
    cache = {
      posts,
      timestamp: Date.now()
    }
    
    return posts
  } catch (error) {
    console.error('Failed to fetch Instagram posts:', error)
    return []
  }
}

export async function refreshInstagramToken(): Promise<boolean> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  
  if (!accessToken) {
    console.error('No Instagram access token to refresh')
    return false
  }

  try {
    const url = `${INSTAGRAM_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status}`)
    }
    
    const data = await response.json()
    
    // In a real app, you'd update the token in your database or env management system
    // For now, we'll just log it
    console.log('Token refreshed successfully. New token expires in:', data.expires_in, 'seconds')
    console.log('ACTION REQUIRED: Update INSTAGRAM_ACCESS_TOKEN with:', data.access_token)
    
    return true
  } catch (error) {
    console.error('Failed to refresh Instagram token:', error)
    return false
  }
}