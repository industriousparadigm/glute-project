'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'

// Import images
import gluteApparel from '../../../public/images/glute-apparel-link.jpg'
import womanJumping from '../../../public/images/woman-jumping.png'
import crossGames from '../../../public/images/cross-games.png'

const lifestyleCards = [
  {
    id: 'apparel',
    image: gluteApparel,
    link: 'https://gluteproj-shop.vercel.app',
    labelKey: 'lifestyle.shopApparel',
    external: true
  },
  {
    id: 'instagram',
    image: womanJumping,
    link: 'https://instagram.com/glute_project',
    labelKey: 'lifestyle.followUs',
    external: true
  },
  {
    id: 'crossgames',
    image: crossGames,
    link: 'https://echosports.barrel.cloud/albums/9d25f0c5-57a4-4c2c-8555-4ad5811d3ee7',
    labelKey: 'lifestyle.crossGames',
    external: true
  }
]

export function Lifestyle() {
  const { t } = useTranslations()

  return (
    <section className="bg-gradient-lifestyle py-16 md:py-20">
      <div className="container relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent-lime font-bold uppercase tracking-[0.2em] text-sm md:text-base mb-3">
            {t('lifestyle.tagline')}
          </p>
          <h2 className="text-dark-primary font-display text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-normal">
            {t('lifestyle.title')}
          </h2>
          <p className="text-dark-secondary text-lg md:text-xl mt-4 max-w-2xl mx-auto">
            {t('lifestyle.subtitle')}
          </p>
        </motion.div>

        {/* Cards Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left column - First card takes full height */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link 
              href={lifestyleCards[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-[600px] overflow-hidden rounded-lg"
            >
              <Image
                src={lifestyleCards[0].image}
                alt={t(lifestyleCards[0].labelKey)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.div
                  className="transform transition-transform duration-300 group-hover:translate-y-[-4px]"
                >
                  <p className="text-accent-lime font-bold uppercase tracking-wider text-sm mb-2">
                    {t(lifestyleCards[0].labelKey)}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">{t('lifestyle.explore')}</span>
                    <svg 
                      className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* Right column - Two stacked cards */}
          <div className="flex flex-col gap-6">
            {lifestyleCards.slice(1).map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Link 
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block h-[287px] overflow-hidden rounded-lg"
                >
                  <Image
                    src={card.image}
                    alt={t(card.labelKey)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <motion.div
                      className="transform transition-transform duration-300 group-hover:translate-y-[-4px]"
                    >
                      <p className="text-accent-lime font-bold uppercase tracking-wider text-sm mb-2">
                        {t(card.labelKey)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-medium">{t('lifestyle.viewMore')}</span>
                        <svg 
                          className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cards - Mobile */}
        <div className="md:hidden space-y-4">
          {lifestyleCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-[250px] overflow-hidden rounded-lg"
              >
                <Image
                  src={card.image}
                  alt={t(card.labelKey)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="100vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-60" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-accent-lime font-bold uppercase tracking-wider text-xs mb-1">
                    {t(card.labelKey)}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium">
                      {card.id === 'apparel' ? t('lifestyle.explore') : t('lifestyle.viewMore')}
                    </span>
                    <svg 
                      className="w-4 h-4"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}