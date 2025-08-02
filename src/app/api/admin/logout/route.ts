import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-token')
  
  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'))
}