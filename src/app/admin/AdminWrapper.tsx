'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Don't show nav on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/prices', label: 'Prices', icon: '💰' },
    { href: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin" className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary">G</span>
                  <span className="text-xl font-bold text-white">Glute Project Admin</span>
                </Link>
              </div>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      pathname === item.href
                        ? 'bg-primary text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                View Site →
              </Link>
              <form action="/api/admin/auth/logout" method="GET">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="py-8">
        {children}
      </main>
    </div>
  )
}