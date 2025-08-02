import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  // Clear the auth cookie
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
  
  // Redirect to login page
  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
}