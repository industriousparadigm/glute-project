import { getPrices } from '@/lib/content-api'
import { useTranslations } from '@/lib/i18n/hooks'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Price {
  id: string
  title: { pt: string; en: string }
  price: { pt: string; en: string }
  description: { pt: string; en: string }
  highlighted: boolean
}

export async function PricingWithAPI() {
  let prices: Price[] = []
  
  try {
    prices = await getPrices()
  } catch (error) {
    console.error('Failed to fetch prices:', error)
  }

  return <PricingContent prices={prices} />
}

function PricingContent({ prices }: { prices: Price[] }) {
  'use client'
  
  const { t, locale } = useTranslations()
  
  return (
    <section id="pricing" className="py-12 md:py-16">
      <div className="container">
        <motion.h2 
          className="text-accent-orange font-display text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase text-center mb-16 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {String(t('pricing.title'))}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {prices.map((price, index) => (
            <motion.div
              key={price.id}
              className={`relative bg-black border-2 ${
                price.highlighted 
                  ? 'border-accent-orange glow-orange' 
                  : 'border-zinc-700'
              } rounded-xl p-8 flex flex-col justify-between transition-all duration-300 hover:bg-zinc-900`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <h3 className="text-accent-orange font-display text-2xl font-bold uppercase mb-4 tracking-wide">
                  {price.title[locale as 'pt' | 'en']}
                </h3>
                <p className="text-accent-orange font-display text-4xl font-extrabold mb-4">
                  {price.price[locale as 'pt' | 'en']}
                </p>
                <p className="text-text-gray mb-8">
                  {price.description[locale as 'pt' | 'en']}
                </p>
              </div>
              
              <Link
                href="#contact"
                className={`inline-flex justify-center items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  price.highlighted
                    ? 'bg-accent-orange text-white hover:bg-accent-orange/90 hover:-translate-y-0.5 shadow-lg'
                    : 'bg-accent-orange text-white hover:bg-accent-orange/90'
                }`}
              >
                {String(t('hero.cta'))}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}