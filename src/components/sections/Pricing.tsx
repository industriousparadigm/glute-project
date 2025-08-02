import Link from 'next/link'
import { Button } from '@/components/ui'
import { useTranslations } from '@/lib/i18n/hooks'

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
        <h2 className="text-primary font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-center mb-16">
          {t('pricing.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingOptions.map((option) => (
            <div
              key={option.key}
              className={`bg-white p-8 border-2 ${
                option.highlighted ? 'border-primary' : 'border-neutral'
              } transform transition-transform duration-300 hover:scale-105`}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}