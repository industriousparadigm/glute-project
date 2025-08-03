'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'

export function Hero() {
  const { t } = useTranslations()

  return (
    <section role="banner" className="relative bg-[#0A0A0A] min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 bg-[#0A0A0A]">
        {/* TODO: Add background video/image here */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A]/90 via-[#0A0A0A]/70 to-[#0A0A0A]/90" />
      </div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/logo.jpg"
              alt="Glute Project Logo"
              width={120}
              height={120}
              className="rounded-full border-4 border-[#FF5E1B] shadow-xl"
            />
          </motion.div>
          
          <motion.h1 
            className="text-white font-display font-bold uppercase tracking-tighter mb-2"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: 1.1
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-[#FF5E1B]">GLUTE PROJECT</span>
          </motion.h1>
          
          <motion.h2 
            className="text-white font-display font-bold uppercase tracking-tighter mb-6"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              lineHeight: 1.2
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero.title')}
          </motion.h2>
          <motion.p 
            className="text-white/90 text-lg sm:text-xl md:text-2xl mb-10 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
              <Button size="lg">
                {t('hero.cta')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A]/50 to-transparent pointer-events-none" />
    </section>
  )
}