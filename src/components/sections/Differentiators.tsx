import { useTranslations } from '@/lib/i18n/hooks'

type DifferentiatorKey = 'trainer_guided' | 'nutrition' | 'access_24h' | 'community'

interface DifferentiatorItem {
  key: DifferentiatorKey
  icon: string
}

export function Differentiators() {
  const { t } = useTranslations()

  const differentiators: DifferentiatorItem[] = [
    {
      key: 'trainer_guided',
      icon: '💪',
    },
    {
      key: 'nutrition',
      icon: '🥗',
    },
    {
      key: 'access_24h',
      icon: '🕐',
    },
    {
      key: 'community',
      icon: '🤝',
    },
  ]

  return (
    <section id="differentiators" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-primary font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-center mb-16">
          {t('differentiators.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiators.map((item) => (
            <div key={item.key} className="text-center group">
              <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                <span role="img" aria-hidden="true" className="text-6xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-ink font-display text-2xl font-bold uppercase mb-4">
                {t(`differentiators.${item.key}.title`)}
              </h3>
              <p className="text-ink/80 font-body text-base">
                {t(`differentiators.${item.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}