import { NextResponse } from 'next/server'
import { getInstagramPosts } from '@/lib/instagram/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '5')
    
    const posts = await getInstagramPosts(limit)
    
    return NextResponse.json({ 
      posts,
      isPlaceholder: posts.length === 0 
    })
  } catch (error) {
    console.error('Instagram API error:', error)
    return NextResponse.json({ 
      posts: [],
      isPlaceholder: true,
      error: 'Failed to fetch Instagram posts' 
    }, { status: 500 })
  }
}