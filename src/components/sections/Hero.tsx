'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import { images } from '@/lib/images'
import { Globe } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

// Video paths need to be absolute to avoid locale prefix
const videoDesktop = '/videos/loop-hero-desktop.mp4'
const videoMobile = '/videos/loop-hero-mobile.mp4'

export function Hero() {
  const { t, locale } = useTranslations()
  const router = useRouter()
  const pathname = usePathname()

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

  const switchLanguage = (newLocale: 'pt' | 'en') => {
    const currentPath = pathname.replace(`/${locale}`, '')
    router.push(`/${newLocale}${currentPath}`)
  }

  return (
    <section role="banner" className="relative bg-brand-black min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with 80% black overlay */}
      <div className="absolute inset-0">
        {/* Desktop video */}
        <video
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoDesktop} type="video/mp4" />
        </video>
        {/* Mobile video */}
        <video
          className="block md:hidden absolute inset-0 w-full h-full object-cover object-center"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoMobile} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-brand-black/80" />
      </div>
      
      {/* GLUTE PROJECT logo in top left */}
      <motion.div
        className="absolute top-[max(2rem,env(safe-area-inset-top))] left-[max(1.5rem,env(safe-area-inset-left))] md:top-12 md:left-12 z-10"
        initial="hidden"
        animate="visible"
        variants={glitchVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative w-[200px] h-[60px] md:w-[400px] md:h-[120px]">
          <Image
            src="/images/glute-project-logo.png"
            alt="Glute Project"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </motion.div>

      {/* Language switcher and Book Visit button in top right */}
      <motion.div
        className="absolute top-[max(2rem,env(safe-area-inset-top))] right-[max(1.5rem,env(safe-area-inset-right))] md:top-12 md:right-12 z-10 flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4"
        initial="hidden"
        animate="visible"
        variants={glitchVariants}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {/* Language Switcher */}
        <div className="flex items-center gap-1 text-accent-orange">
          <Globe size={16} className="md:w-[18px] md:h-[18px]" />
          <button
            onClick={() => switchLanguage('en')}
            className={`px-1.5 md:px-2 py-1 text-xs md:text-sm font-display uppercase transition-all ${
              locale === 'en' ? 'text-accent-orange' : 'text-white/60 hover:text-accent-orange'
            }`}
          >
            ENG
          </button>
          <span className="text-white/40">|</span>
          <button
            onClick={() => switchLanguage('pt')}
            className={`px-1.5 md:px-2 py-1 text-xs md:text-sm font-display uppercase transition-all ${
              locale === 'pt' ? 'text-accent-orange' : 'text-white/60 hover:text-accent-orange'
            }`}
          >
            POR
          </button>
        </div>

        {/* Book Visit button - Desktop only */}
        <Link href="#contact" className="group hidden md:block">
          <span className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3
                         border-2 border-accent-orange bg-transparent
                         font-display font-normal uppercase tracking-widest text-sm md:text-base
                         text-accent-orange
                         transition-all duration-300
                         hover:bg-accent-orange/10 hover:shadow-[0_0_20px_rgba(255,94,27,0.4)]
                         active:scale-[0.98]
                         focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 focus:ring-offset-brand-black">
            {String(t('hero.book_visit'))}
          </span>
        </Link>
      </motion.div>

      {/* Mobile-centered CTA button - shows before sticky header appears */}
      <motion.div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 md:hidden z-20"
        initial="hidden"
        animate="visible"
        variants={glitchVariants}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <Link href="#contact" className="group inline-block">
          <span className="inline-flex items-center justify-center px-8 py-4
                         border-2 border-accent-orange bg-accent-orange
                         font-display font-normal uppercase tracking-widest text-lg
                         text-brand-black
                         transition-all duration-300
                         hover:bg-transparent hover:text-accent-orange
                         hover:shadow-[0_0_30px_rgba(255,94,27,0.6)]
                         active:scale-[0.95]
                         focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 focus:ring-offset-brand-black">
            {String(t('hero.book_visit'))}
          </span>
        </Link>
      </motion.div>

      {/* Massive scrolling typography at bottom - mobile in bottom third, desktop at bottom */}
      <div className="absolute bottom-[20vh] md:bottom-0 left-0 w-full h-24 md:h-64 overflow-hidden">
        <div className="scrolling-text-container">
          <div className="scrolling-text">
            <span>{String(t('hero.subtitle'))}</span>
            <span className="scrolling-separator">♦</span>
            <span>{String(t('hero.subtitle'))}</span>
            <span className="scrolling-separator">♦</span>
            <span>{String(t('hero.subtitle'))}</span>
            <span className="scrolling-separator">♦</span>
            <span>{String(t('hero.subtitle'))}</span>
            <span className="scrolling-separator">♦</span>
          </div>
        </div>
      </div>
    </section>
  )
}