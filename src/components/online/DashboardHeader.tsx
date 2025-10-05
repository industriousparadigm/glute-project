'use client'

import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

interface DashboardHeaderProps {
  locale: string
}

export function DashboardHeader({ locale }: DashboardHeaderProps) {
  return (
    <header className="border-b border-accent-orange/20 bg-charcoal-dark">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href={`/${locale}/online`}
          className="text-accent-orange hover:text-accent-lime transition-colors"
        >
          ← {locale === 'pt' ? 'Voltar' : 'Back'}
        </Link>
        <h1 className="font-display text-xl uppercase">DASHBOARD</h1>
        <UserButton
          afterSignOutUrl={`/${locale}/online`}
          appearance={{
            elements: {
              avatarBox: "w-10 h-10",
              userButtonPopoverCard: "bg-charcoal-dark border border-accent-orange/20",
              userButtonPopoverActionButton: "hover:bg-accent-orange/10",
            }
          }}
        />
      </div>
    </header>
  )
}
