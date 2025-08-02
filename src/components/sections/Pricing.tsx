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
    <section id="pricing" className="py-24 md:py-32 bg-[#F4F4F4]">
      <div className="container">
        <motion.h2 
          className="text-[#FF5E1B] font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('pricing.title')}
        </motion.h2>
        
        <div className="grid-12">
          {pricingOptions.map((option, index) => (
            <motion.div
              key={option.key}
              className={`col-span-4 bg-white p-8 rounded-xl shadow-lg border-2 ${
                option.highlighted 
                  ? 'border-[#FF5E1B] shadow-xl scale-105' 
                  : 'border-gray-200'
              } transform transition-all duration-300 hover:shadow-xl ${
                !option.highlighted ? 'hover:scale-105' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="text-center">
                {option.highlighted && (
                  <div className="bg-[#FF5E1B] text-white px-4 py-2 rounded-lg text-sm font-bold uppercase mb-4 inline-block">
                    Recomendado
                  </div>
                )}
                <h3 className="text-[#0A0A0A] font-display text-2xl font-bold uppercase mb-4">
                  {t(`pricing.${option.key}.title`)}
                </h3>
                <div className="mb-6">
                  <p className={`font-display text-4xl font-bold ${
                    option.highlighted ? 'text-[#FF5E1B]' : 'text-[#0A0A0A]'
                  }`}>
                    {t(`pricing.${option.key}.price`)}
                  </p>
                </div>
                <p className="text-[#0A0A0A]/80 font-body text-base mb-8">
                  {t(`pricing.${option.key}.description`)}
                </p>
                <Link href="#contact" className="block">
                  <Button fullWidth>
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