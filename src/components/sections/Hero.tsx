'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import { images } from '@/lib/images'

export function Hero() {
  const { t } = useTranslations()

  return (
    <section role="banner" className="relative bg-brand-black min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with 80% black overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-brand-black/80" />
      </div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-accent-orange font-display font-extrabold uppercase tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              lineHeight: 0.9
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p 
            className="text-accent-lime font-display font-bold uppercase tracking-wide mb-12"
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              lineHeight: 1.2
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="#contact" className="inline-block">
              <Button 
                size="lg" 
                className="inline-flex gap-2 px-7 py-4 rounded-lg bg-accent-orange text-white font-semibold text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                {t('hero.cta')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}