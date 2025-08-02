import Link from 'next/link'
import { Button } from '@/components/ui'
import { useTranslations } from '@/lib/i18n/hooks'

export function Hero() {
  const { t } = useTranslations()

  return (
    <section role="banner" className="relative bg-ink min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-primary font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl mb-10 font-body">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contact" className="inline-block">
              <Button size="lg" variant="primary">
                {t('hero.cta')}
              </Button>
            </Link>
            <Link href="#facility" className="inline-block">
              <Button size="lg" variant="outline">
                {t('hero.cta_secondary')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ink/50 to-transparent pointer-events-none" />
    </section>
  )
}