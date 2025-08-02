import { NextRequest } from 'next/server'

export function getAuthToken(cookieString: string): string | null {
  if (!cookieString) {
    return null
  }
  
  // Parse cookies
  const cookies = cookieString.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    if (key && value) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
  
  return cookies['auth-token'] || null
}

export function isAuthenticated(req: NextRequest): boolean {
  const cookieHeader = req.headers.get('cookie')
  const token = getAuthToken(cookieHeader || '')
  
  // In middleware, we just check if token exists
  // Actual verification happens in the API routes
  return !!token
}