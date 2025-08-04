'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import { images } from '@/lib/images'
import heroBg from '../../../public/images/hero-bg.png'
import womanStrong from '../../../public/images/woman-strong.png'

export function Hero() {
  const { t } = useTranslations()

  // Glitch animation variants
  const glitchVariants = {
    hidden: { 
      opacity: 0,
      filter: 'blur(10px)',
      transform: 'translate3d(0, 20px, 0) scale(0.9)'
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transform: 'translate3d(0, 0, 0) scale(1)'
    }
  }

  return (
    <section role="banner" className="relative bg-brand-black min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with 80% black overlay */}
      <div className="absolute inset-0">
        {/* Desktop image */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={heroBg}
            alt=""
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        {/* Mobile image */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src={womanStrong}
            alt=""
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-brand-black/80" />
      </div>
      
      {/* GLUTE PROJECT in top left - double size */}
      <motion.div 
        className="absolute top-8 left-8 md:top-12 md:left-12 z-10"
        initial="hidden"
        animate="visible"
        variants={glitchVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-accent-orange font-display font-normal uppercase"
           style={{
             fontSize: 'clamp(4rem, 8vw, 6rem)',
             lineHeight: 0.85,
             letterSpacing: '-0.03em',
             fontWeight: 400
           }}
        >
          GLUTE PROJECT
        </h1>
      </motion.div>

      {/* Massive scrolling typography at bottom */}
      <div className="absolute bottom-9 left-0 w-full h-48 md:h-64 overflow-hidden">
        <div className="scrolling-text-container">
          <div className="scrolling-text">
            <span>{t('hero.subtitle')}</span>
            <span className="scrolling-separator">♦</span>
            <span>{t('hero.subtitle')}</span>
            <span className="scrolling-separator">♦</span>
            <span>{t('hero.subtitle')}</span>
            <span className="scrolling-separator">♦</span>
            <span>{t('hero.subtitle')}</span>
            <span className="scrolling-separator">♦</span>
          </div>
        </div>
      </div>
    </section>
  )
}