import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from './lib/i18n'
import { isAuthenticated } from './lib/auth/middleware'

// Protected routes that require Clerk authentication
const isProtectedRoute = createRouteMatcher([
  '/:locale/online/dashboard(.*)',
])

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const pathname = request.nextUrl.pathname

  // Handle admin routes authentication (existing JWT system)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Protect Clerk routes
  if (isProtectedRoute(request)) {
    await auth.protect()
  }

  // Skip locale handling for admin, API routes, and static files
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/videos/') ||
    pathname.startsWith('/images/') ||
    pathname.includes('.')  // Any file with an extension
  ) {
    return NextResponse.next()
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Redirect if there is no locale
  const locale = defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
})

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|favicon.ico|robots.txt|sitemap.xml|trpc).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
}