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
    <section id="pricing" className="py-20 bg-neutral">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-primary font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('pricing.title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingOptions.map((option, index) => (
            <motion.div
              key={option.key}
              className={`bg-white p-8 border-2 ${
                option.highlighted ? 'border-primary' : 'border-neutral'
              } transform transition-transform duration-300 hover:scale-105`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="text-center">
                <h3 className="text-ink font-display text-2xl font-bold uppercase mb-4">
                  {t(`pricing.${option.key}.title`)}
                </h3>
                <div className="mb-6">
                  <p className={`font-display text-4xl font-bold ${
                    option.highlighted ? 'text-primary' : 'text-ink'
                  }`}>
                    {t(`pricing.${option.key}.price`)}
                  </p>
                </div>
                <p className="text-ink/80 font-body text-base mb-8">
                  {t(`pricing.${option.key}.description`)}
                </p>
                <Link href="#contact" className="block">
                  <Button
                    variant={option.highlighted ? 'primary' : 'outline'}
                    fullWidth
                  >
                    {t('hero.cta')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}