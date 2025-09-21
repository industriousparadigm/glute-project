import { NextRequest, NextResponse } from 'next/server'

// Temporary OAuth route to get Dropbox refresh token
// Visit /api/dropbox/auth to start the flow

const DROPBOX_APP_KEY = 'zc0q9ztfuqtjmsh'
const REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL 
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/dropbox/callback`
  : 'http://localhost:3001/api/dropbox/callback'

export async function GET() {
  const authUrl = new URL('https://www.dropbox.com/oauth2/authorize')
  authUrl.searchParams.set('client_id', DROPBOX_APP_KEY)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
  authUrl.searchParams.set('token_access_type', 'offline')
  
  return NextResponse.redirect(authUrl.toString())
}