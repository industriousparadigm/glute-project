import { NextRequest } from 'next/server'
import { verifyToken } from './auth'

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

export function checkAuth(token: string | null): boolean {
  if (!token) {
    return false
  }
  
  const payload = verifyToken(token)
  return payload !== null
}

export function isAuthenticated(req: NextRequest): boolean {
  const cookieHeader = req.headers.get('cookie')
  const token = getAuthToken(cookieHeader || '')
  return checkAuth(token)
}