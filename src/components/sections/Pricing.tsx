'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'

type PricingKey = 'trial' | 'monthly' | 'personal'

interface PricingOption {
  key: PricingKey
  highlighted?: boolean
}

export function Pricing() {
  const { t } = useTranslations()

  const pricingOptions: PricingOption[] = [
    {
      key: 'trial',
      highlighted: true,
    },
    {
      key: 'monthly',
    },
    {
      key: 'personal',
    },
  ]

  return (
    <section id="pricing" className="py-12 md:py-16">
      <div className="container">
        <motion.h2 
          className="text-accent-orange font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase text-center mb-8 md:mb-16 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('pricing.title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingOptions.map((option, index) => (
            <motion.div
              key={option.key}
              className={`relative bg-black border-2 ${
                option.highlighted 
                  ? 'border-accent-orange glow-orange' 
                  : 'border-zinc-700'
              } p-6 md:p-8 flex flex-col transition-all duration-300 hover:bg-zinc-900 h-full`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex-grow flex flex-col">
                {option.highlighted && (
                  <div className="bg-accent-orange text-white px-4 py-2 text-sm font-bold uppercase mb-4 self-center">
                    Recomendado
                  </div>
                )}
                <h3 className="text-accent-orange font-display text-2xl font-bold uppercase mb-4 text-center tracking-wide">
                  {t(`pricing.${option.key}.title`)}
                </h3>
                <div className="mb-6 text-center">
                  <p className="text-accent-orange font-display text-4xl font-extrabold">
                    {t(`pricing.${option.key}.price`)}
                  </p>
                </div>
                <p className="text-text-gray mb-8 text-center flex-grow">
                  {t(`pricing.${option.key}.description`)}
                </p>
              </div>
              
              <Link href="#contact" className="block mt-auto">
                <button className={`w-full px-6 py-3 font-semibold transition-all duration-300 ${
                  option.highlighted
                    ? 'bg-accent-orange text-white hover:bg-accent-orange/90 hover:-translate-y-0.5 shadow-lg'
                    : 'bg-accent-orange text-white hover:bg-accent-orange/90'
                }`}>
                  {t('hero.cta')}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}