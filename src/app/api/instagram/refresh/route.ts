import { NextResponse } from 'next/server'
import { refreshInstagramToken } from '@/lib/instagram/client'

export async function GET(request: Request) {
  try {
    // Verify this is coming from Vercel Cron
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Refresh the Instagram token
    const success = await refreshInstagramToken()
    
    if (success) {
      return NextResponse.json({ 
        success: true,
        message: 'Instagram token refreshed successfully',
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({ 
        success: false,
        error: 'Failed to refresh Instagram token' 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error' 
    }, { status: 500 })
  }
}