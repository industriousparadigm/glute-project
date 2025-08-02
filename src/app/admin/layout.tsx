import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import AdminWrapper from './AdminWrapper'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Glute Project Admin',
  description: 'Admin panel for Glute Project',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AdminWrapper>{children}</AdminWrapper>
      </body>
    </html>
  )
}