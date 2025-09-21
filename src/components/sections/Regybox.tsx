'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n/hooks'
import { Smartphone, Calendar, Activity } from 'lucide-react'

// Import images
import regyboxBg from '../../../public/images/regybox-bg.png'
import regyboxPhone from '../../../public/images/regybox-phone.png'
import regyboxLogo from '../../../public/images/regybox-logo.png'

export function Regybox() {
  const { t } = useTranslations()

  return (
    <>
      {/* Desktop Version - Original Design */}
      <section className="hidden md:block relative h-screen bg-white">
        {/* Background container */}
        <div className="absolute inset-0">
          {/* Top 2/3 background image */}
          <div className="absolute top-0 left-0 right-0 h-[67%] overflow-hidden">
            <Image
              src={regyboxBg}
              alt=""
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          {/* Bottom 1/3 is white from the section bg-white */}
        </div>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

              {/* Left container - stacked content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center lg:items-start gap-12 max-w-md"
              >
                {/* Heading */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase">
                  {String(t('regybox.tagline'))} {String(t('regybox.headline'))}
                </h2>

                {/* CTA Button */}
                <Link
                  href="https://www.regibox.pt/app/app_nova/login.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="cta-primary-light group relative inline-flex items-center gap-3 px-8 py-4
                           text-white font-display text-lg md:text-xl uppercase tracking-wider">
                    {String(t('regybox.cta'))}
                  </button>
                </Link>

                {/* RegyBox Logo */}
                <div className="w-64 h-64 relative">
                  <Image
                    src={regyboxLogo}
                    alt="RegyBox"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Right container - phone image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-md lg:max-w-lg h-[500px] lg:h-[600px]"
              >
                <Image
                  src={regyboxPhone}
                  alt="RegyBox App"
                  fill
                  className="object-contain object-center"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Version - Barry's Inspired Clean Design */}
      <section className="md:hidden relative bg-gradient-regybox overflow-hidden">
        <div className="relative z-10 py-16">
          <div className="container mx-auto px-4">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <p className="text-accent-orange font-bold uppercase tracking-[0.3em] text-xs mb-2">
                {String(t('regybox.tagline'))}
              </p>
              <h2 className="text-white font-display text-4xl uppercase tracking-tight mb-2">
                {String(t('regybox.headline'))}
              </h2>
              <p className="text-white/70 text-sm">
                {String(t('regybox.subtitle'))}
              </p>
            </motion.div>

            {/* Phone Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full h-[300px] mb-8"
            >
              <Image
                src={regyboxPhone}
                alt="RegyBox App"
                fill
                className="object-contain object-center"
              />
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div className="text-center">
                <Activity className="w-8 h-8 text-accent-orange mx-auto mb-2" />
                <p className="text-white text-xs uppercase font-bold">
                  {String(t('regybox.features.workouts'))}
                </p>
              </div>
              <div className="text-center">
                <Calendar className="w-8 h-8 text-accent-orange mx-auto mb-2" />
                <p className="text-white text-xs uppercase font-bold">
                  {String(t('regybox.features.schedule'))}
                </p>
              </div>
              <div className="text-center">
                <Smartphone className="w-8 h-8 text-accent-orange mx-auto mb-2" />
                <p className="text-white text-xs uppercase font-bold">
                  {String(t('regybox.features.progress'))}
                </p>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-8"
            >
              <Link
                href="https://www.regibox.pt/app/app_nova/login.php"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full bg-accent-orange text-brand-black font-display uppercase text-base py-4 px-8
                               transition-all duration-300 active:scale-95">
                  {String(t('regybox.cta'))}
                </button>
              </Link>
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="w-32 h-32 relative">
                <Image
                  src={regyboxLogo}
                  alt="RegyBox"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}