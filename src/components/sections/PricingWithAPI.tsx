import { getPrices } from '@/lib/content-api'
import { useTranslations } from '@/lib/i18n/hooks'
import Link from 'next/link'

export async function PricingWithAPI() {
  let prices = []
  
  try {
    prices = await getPrices()
  } catch (error) {
    console.error('Failed to fetch prices:', error)
  }

  return <PricingContent prices={prices} />
}

interface Price {
  id: string
  title: { pt: string; en: string }
  price: { pt: string; en: string }
  description: { pt: string; en: string }
  highlighted: boolean
}

function PricingContent({ prices }: { prices: Price[] }) {
  'use client'
  
  const { t, locale } = useTranslations()
  
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          {t('pricing.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {prices.map((price) => (
            <div
              key={price.id}
              className={`border-2 ${
                price.highlighted ? 'border-primary' : 'border-gray-200'
              } rounded-lg p-8 text-center`}
            >
              <h3 className="text-2xl font-bold mb-4">
                {price.title[locale as 'pt' | 'en']}
              </h3>
              <p className="text-3xl font-bold mb-4">
                {price.price[locale as 'pt' | 'en']}
              </p>
              <p className="text-gray-600 mb-6">
                {price.description[locale as 'pt' | 'en']}
              </p>
              {price.highlighted && (
                <Link
                  href="/schedule"
                  className="bg-primary text-white px-6 py-3 rounded-lg inline-block hover:bg-primary/90 transition-colors"
                >
                  {t('hero.cta')}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}