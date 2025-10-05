'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'

interface Package {
  id: string
  name: string
  price: string
  features: string[]
  stripePriceId?: string
  isPopular?: boolean
}

interface PackageSelectorProps {
  packages: Package[]
  locale: string
}

export function PackageSelector({ packages, locale }: PackageSelectorProps) {
  const { isSignedIn, user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSelectPackage = async (pkg: Package) => {
    if (!isSignedIn) {
      // Redirect to sign-up
      router.push(`/${locale}/online/sign-up`)
      return
    }

    if (!pkg.stripePriceId) {
      console.error('No Stripe price ID for package:', pkg.id)
      return
    }

    setLoading(pkg.id)

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: pkg.stripePriceId,
          locale,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('No checkout URL returned')
        setLoading(null)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(null)
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className={`bg-charcoal-dark border p-8 hover:border-accent-orange/60 transition-all duration-300 ${
            pkg.isPopular ? 'border-accent-orange/60 ring-2 ring-accent-orange/20' : 'border-accent-orange/20'
          }`}
        >
          {pkg.isPopular && (
            <div className="text-accent-lime text-xs font-display uppercase mb-2">
              {locale === 'pt' ? 'MAIS POPULAR' : 'MOST POPULAR'}
            </div>
          )}
          <h3 className="font-display text-2xl uppercase mb-2">{pkg.name}</h3>
          <div className="text-4xl font-display mb-6">
            {pkg.price}
            <span className="text-lg text-gray-400">
              /{locale === 'pt' ? 'mês' : 'month'}
            </span>
          </div>
          <ul className="space-y-3 mb-8">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-lime mt-0.5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {isSignedIn ? (
            <Button
              variant={pkg.isPopular ? 'primary' : 'outline'}
              fullWidth
              onClick={() => handleSelectPackage(pkg)}
              disabled={loading === pkg.id}
            >
              {loading === pkg.id
                ? locale === 'pt'
                  ? 'A processar...'
                  : 'Processing...'
                : locale === 'pt'
                ? 'ESCOLHER PLANO'
                : 'CHOOSE PLAN'}
            </Button>
          ) : (
            <SignInButton mode="redirect">
              <Button variant={pkg.isPopular ? 'primary' : 'outline'} fullWidth>
                {locale === 'pt' ? 'COMEÇAR AGORA' : 'START NOW'}
              </Button>
            </SignInButton>
          )}
        </div>
      ))}
    </div>
  )
}
