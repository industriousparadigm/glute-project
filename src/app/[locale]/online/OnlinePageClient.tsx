'use client'

import { useTranslations } from '@/lib/i18n/hooks'
import { Button } from '@/components/ui/Button'
import { MessageCircle, Users, TrendingUp, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { SignInButton, useUser } from '@clerk/nextjs'
import { PackageSelector } from '@/components/online/PackageSelector'

interface Package {
  id: string
  name: string
  price: string
  features: string[]
  stripePriceId?: string
  isPopular?: boolean
}

interface OnlinePageClientProps {
  locale: string
  packages: Package[]
}

export function OnlinePageClient({ locale, packages }: OnlinePageClientProps) {
  const { t } = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const { isSignedIn } = useUser()

  const switchLanguage = (newLocale: 'pt' | 'en') => {
    const currentPath = pathname.replace(`/${locale}`, '')
    router.push(`/${newLocale}${currentPath}`)
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-accent-orange/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="relative w-[120px] h-[36px] hover:opacity-80 transition-opacity">
            <Image
              src="/images/glute-project-logo.png"
              alt="Glute Project"
              fill
              className="object-contain object-left"
            />
          </Link>

          {/* Language Switcher & Login */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-accent-orange hidden sm:block" />
              <div className="flex gap-2">
                <button
                  onClick={() => switchLanguage('pt')}
                  className={`px-3 py-1.5 text-xs font-display uppercase transition-all ${
                    locale === 'pt'
                      ? 'bg-accent-orange text-brand-black'
                      : 'text-white/60 hover:text-accent-orange border border-accent-orange/30'
                  }`}
                >
                  PT
                </button>
                <button
                  onClick={() => switchLanguage('en')}
                  className={`px-3 py-1.5 text-xs font-display uppercase transition-all ${
                    locale === 'en'
                      ? 'bg-accent-orange text-brand-black'
                      : 'text-white/60 hover:text-accent-orange border border-accent-orange/30'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Login/Dashboard Button */}
            {isSignedIn ? (
              <Link href={`/${locale}/online/dashboard`}>
                <button className="hidden sm:block px-4 py-1.5 text-xs font-display uppercase bg-accent-orange text-brand-black hover:bg-accent-lime transition-all">
                  DASHBOARD
                </button>
              </Link>
            ) : (
              <SignInButton mode="redirect">
                <button className="hidden sm:block px-4 py-1.5 text-xs font-display uppercase text-accent-orange border border-accent-orange/30 hover:bg-accent-orange/10 transition-all">
                  {locale === 'pt' ? 'ENTRAR' : 'LOGIN'}
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </header>

      <main className="min-h-screen w-full">
        {/* Hero Section */}
        <section className="relative min-h-screen bg-brand-black text-white flex items-center justify-center px-4 py-20 pt-32">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-6 bg-gradient-to-r from-accent-orange to-accent-lime bg-clip-text text-transparent">
              {String(t('online.hero.title'))}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              {String(t('online.hero.subtitle'))}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isSignedIn ? (
                <Link href={`/${locale}/online/dashboard`}>
                  <Button variant="primary" size="lg" icon={<Users />}>
                    DASHBOARD
                  </Button>
                </Link>
              ) : (
                <SignInButton mode="redirect">
                  <Button variant="primary" size="lg" icon={<Users />}>
                    {String(t('online.hero.cta_primary'))}
                  </Button>
                </SignInButton>
              )}
              <a href="#packages">
                <Button variant="outline" size="lg">
                  {locale === 'pt' ? 'VER PACOTES' : 'VIEW PACKAGES'}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gradient-studio text-dark-primary py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-16">
              {String(t('online.howItWorks.title'))}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent-orange/20 flex items-center justify-center mx-auto mb-4 text-accent-orange font-display text-2xl">
                    {step}
                  </div>
                  <h3 className="font-display text-xl uppercase mb-3">
                    {String(t(`online.howItWorks.step${step}.title`))}
                  </h3>
                  <p className="text-gray-600">
                    {String(t(`online.howItWorks.step${step}.description`))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="bg-gradient-services text-dark-primary py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-16">
              {String(t('online.packages.title'))}
            </h2>
            <PackageSelector packages={packages} locale={locale} />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gradient-testimonials text-dark-primary py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-16">
              {String(t('online.benefits.title'))}
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {['flexibility', 'personalized', 'community', 'results'].map((benefit) => (
                <div key={benefit} className="flex gap-4">
                  <div className="w-12 h-12 bg-accent-orange/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl uppercase mb-2">
                      {String(t(`online.benefits.${benefit}.title`))}
                    </h3>
                    <p className="text-gray-600">
                      {String(t(`online.benefits.${benefit}.description`))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-team text-white py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-16">
              {String(t('online.stats.title'))}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {['clients', 'sessions', 'satisfaction'].map((stat) => (
                <div key={stat}>
                  <div className="text-5xl md:text-6xl font-display text-accent-lime mb-2">
                    {String(t(`online.stats.${stat}.value`))}
                  </div>
                  <div className="text-lg uppercase tracking-wider">
                    {String(t(`online.stats.${stat}.label`))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-contact text-white py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-6">
              {String(t('online.cta.title'))}
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              {String(t('online.cta.subtitle'))}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isSignedIn ? (
                <Link href={`/${locale}/online/dashboard`}>
                  <Button variant="primary" size="lg" icon={<MessageCircle />}>
                    DASHBOARD
                  </Button>
                </Link>
              ) : (
                <SignInButton mode="redirect">
                  <Button variant="primary" size="lg" icon={<MessageCircle />}>
                    {String(t('online.cta.primary'))}
                  </Button>
                </SignInButton>
              )}
              <a href="https://wa.me/351937370304" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  {String(t('online.cta.secondary'))}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-brand-black text-white py-12 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <Link href={`/${locale}`} className="text-accent-orange hover:text-accent-lime transition-colors">
              {String(t('online.footer.backHome'))}
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
