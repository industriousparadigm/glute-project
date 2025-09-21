import { NextRequest, NextResponse } from 'next/server'

const DROPBOX_APP_KEY = 'zc0q9ztfuqtjmsh'
const DROPBOX_APP_SECRET = 'uxbkj3h00f1jdfc'
const REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/dropbox/callback`
  : 'http://localhost:3001/api/dropbox/callback'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  
  if (!code) {
    return NextResponse.json({ error: 'No authorization code received' }, { status: 400 })
  }
  
  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://api.dropboxapi.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        client_id: DROPBOX_APP_KEY,
        client_secret: DROPBOX_APP_SECRET,
        redirect_uri: REDIRECT_URI,
      }),
    })
    
    const tokens = await tokenResponse.json()
    
    if (tokens.refresh_token) {
      // Display the refresh token for manual copying to env
      return new NextResponse(
        `<html>
          <head><title>Dropbox OAuth Success</title></head>
          <body style="font-family: monospace; padding: 2rem; background: #0A0A0A; color: #F5F5F5;">
            <h2 style="color: #FF6B00;">✅ OAuth Success!</h2>
            <p>Copy this refresh token to your .env.local file:</p>
            <pre style="background: #1A1A1A; padding: 1rem; border: 2px solid #FF6B00; border-radius: 4px; word-wrap: break-word;">
DROPBOX_REFRESH_TOKEN=${tokens.refresh_token}</pre>
            <p style="color: #999; margin-top: 2rem;">⚠️ Save this token securely - you won't see it again!</p>
            <p style="color: #999;">After saving, you can close this window.</p>
          </body>
        </html>`,
        { 
          status: 200,
          headers: { 'Content-Type': 'text/html' }
        }
      )
    } else {
      return NextResponse.json({ error: 'No refresh token received', details: tokens }, { status: 400 })
    }
  } catch (error) {
    console.error('OAuth token exchange error:', error)
    return NextResponse.json({ error: 'Failed to exchange code for tokens' }, { status: 500 })
  }
}