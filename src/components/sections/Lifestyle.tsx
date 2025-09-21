'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useGallery } from '@/components/GalleryContext'

// Import images
import gluteApparel from '../../../public/images/glute-apparel-link.jpg'
import womanJumping from '../../../public/images/woman-jumping.png'
import crossGames from '../../../public/images/cross-games.png'
import womanStrong from '../../../public/images/woman-strong.png'

// Dynamically import GalleryModal to avoid SSR issues
const GalleryModal = dynamic(() => import('../GalleryModal'), { ssr: false })

// News articles
const newsArticles = [
  {
    id: 'news1',
    url: 'https://www.jn.pt/pais/artigo/estudios-personalizados-ganham-cada-vez-mais-espaco/17956610',
    fallbackTitle: 'Estúdios personalizados ganham cada vez mais espaço',
    fallbackSiteName: 'JN'
  },
  {
    id: 'news2',
    url: 'https://radiofestival.com.pt/noticia/1871718/glute-project-o-maior-estudio-personalizado-de-fitness-em-portugal-nasceu-em-matosinhos',
    fallbackTitle: 'Glute Project: O maior estúdio personalizado de fitness em Portugal',
    fallbackSiteName: 'Rádio Festival'
  },
  {
    id: 'news3',
    url: 'https://www.jn.pt/nacional/artigo/ginasios-ja-tem-quase-800-mil-utilizadores/17956604',
    fallbackTitle: 'Ginásios já têm quase 800 mil utilizadores',
    fallbackSiteName: 'JN'
  }
]

interface NewsMetadata {
  title: string
  description: string
  image: string | null
  siteName: string
  url: string
}

const lifestyleCards = [
  {
    id: 'daytoday',
    image: womanStrong,
    link: '#',
    labelKey: 'lifestyle.dayToDay',
    external: false,
    isGallery: true
  },
  {
    id: 'instagram',
    image: womanJumping,
    link: 'https://instagram.com/glute_project',
    labelKey: 'lifestyle.followUs',
    external: true,
    isGallery: false
  },
  {
    id: 'crossgames',
    image: crossGames,
    link: 'https://echosports.barrel.cloud/albums/9d25f0c5-57a4-4c2c-8555-4ad5811d3ee7',
    labelKey: 'lifestyle.crossGames',
    external: true,
    isGallery: false
  },
  {
    id: 'apparel',
    image: gluteApparel,
    link: '#', // Disabled link for coming soon
    labelKey: 'lifestyle.shopApparel',
    external: false, // No longer external
    isGallery: false,
    comingSoon: true // Add coming soon flag
  }
]

export function Lifestyle() {
  const { t } = useTranslations()
  const { isGalleryOpen, setIsGalleryOpen } = useGallery()
  const [newsMetadata, setNewsMetadata] = useState<NewsMetadata[]>([])
  const [loadingNews, setLoadingNews] = useState(true)

  useEffect(() => {
    const fetchNewsMetadata = async () => {
      const metadata = await Promise.all(
        newsArticles.map(async (article) => {
          try {
            const response = await fetch(`/api/og-metadata?url=${encodeURIComponent(article.url)}`)
            if (!response.ok) throw new Error('Failed to fetch')
            const data = await response.json()
            return data as NewsMetadata
          } catch (error) {
            console.error(`Failed to fetch metadata for ${article.url}:`, error)
            // Return fallback data
            return {
              title: article.fallbackTitle,
              description: '',
              image: null,
              siteName: article.fallbackSiteName,
              url: article.url
            }
          }
        })
      )
      setNewsMetadata(metadata)
      setLoadingNews(false)
    }

    fetchNewsMetadata()
  }, [])

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
          <p className="text-brand-black font-bold uppercase tracking-[0.2em] text-sm md:text-base mb-3">
            {String(t('lifestyle.tagline'))}
          </p>
          <h2 className="text-dark-primary font-display text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-normal">
            {String(t('lifestyle.title'))}
          </h2>
          <p className="text-dark-secondary text-lg md:text-xl mt-4 max-w-2xl mx-auto">
            {String(t('lifestyle.subtitle'))}
          </p>
        </motion.div>

        {/* Asymmetric Grid - Desktop */}
        <div className="hidden md:block max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 h-[500px]">
            {/* Large Card - Gallery/dia-a-dia/optimized (spans 2/3 width, full height) */}
            <motion.div
              className="col-span-8 row-span-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="group relative block h-full w-full overflow-hidden rounded-xl cursor-pointer"
              >
                <Image
                  src={lifestyleCards[0].image}
                  alt={String(t(lifestyleCards[0].labelKey))}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />

                {/* Special gradient overlay for gallery */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-black/30 via-brand-black/40 to-brand-black/70 opacity-70 group-hover:opacity-85 transition-opacity duration-500" />

                {/* Gallery icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-accent-lime/25 backdrop-blur-sm rounded-full p-6">
                    <svg className="w-16 h-16 text-accent-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <motion.div
                    className="transform transition-transform duration-300 group-hover:translate-y-[-6px]"
                  >
                    <p className="text-accent-lime font-bold uppercase tracking-wider text-lg mb-3">
                      {String(t(lifestyleCards[0].labelKey))}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-medium">
                        {String(t('lifestyle.viewGallery'))}
                      </span>
                      <svg
                        className="w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </button>
            </motion.div>

            {/* Right Column - Stacked Cards */}
            <div className="col-span-4 flex flex-col gap-6">
              {/* Instagram Card - Top Right */}
              <motion.div
                className="flex-1 min-h-[235px]"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link
                  href={lifestyleCards[1].link}
                  target={lifestyleCards[1].external ? "_blank" : undefined}
                  rel={lifestyleCards[1].external ? "noopener noreferrer" : undefined}
                  className="group relative block h-full overflow-hidden rounded-lg"
                >
                  <Image
                    src={lifestyleCards[1].image}
                    alt={String(t(lifestyleCards[1].labelKey))}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <motion.div
                      className="transform transition-transform duration-300 group-hover:translate-y-[-4px]"
                    >
                      <p className="text-accent-lime font-bold uppercase tracking-wider text-sm mb-2">
                        {String(t(lifestyleCards[1].labelKey))}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-medium">
                          {String(t('lifestyle.viewMore'))}
                        </span>
                        <svg
                          className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
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

              {/* Bottom Row - Cross Games + Gallery */}
              <div className="flex gap-3 h-[235px]">
                {/* Cross Games Card */}
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Link
                    href={lifestyleCards[2].link}
                    target={lifestyleCards[2].external ? "_blank" : undefined}
                    rel={lifestyleCards[2].external ? "noopener noreferrer" : undefined}
                    className="group relative block h-full overflow-hidden rounded-lg"
                  >
                    <Image
                      src={lifestyleCards[2].image}
                      alt={String(t(lifestyleCards[2].labelKey))}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 16vw"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <motion.div
                        className="transform transition-transform duration-300 group-hover:translate-y-[-3px]"
                      >
                        <p className="text-accent-lime font-bold uppercase tracking-wider text-xs mb-1">
                          {String(t(lifestyleCards[2].labelKey))}
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">
                            {String(t('lifestyle.viewMore'))}
                          </span>
                          <svg
                            className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1"
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

                {/* Glute Apparel Card */}
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="group relative block h-full overflow-hidden rounded-lg">
                    {lifestyleCards[3]?.comingSoon ? (
                      <div className="relative h-full cursor-default">
                    ) : (
                      <Link
                        href={lifestyleCards[3]?.link || '#'}
                        target={lifestyleCards[3]?.external ? "_blank" : undefined}
                        rel={lifestyleCards[3]?.external ? "noopener noreferrer" : undefined}
                        className="block h-full"
                      >
                    )}
                      <Image
                        src={lifestyleCards[3]?.image}
                        alt={String(t(lifestyleCards[3]?.labelKey || ''))}
                        fill
                        className={`object-cover transition-transform duration-700 ${
                          lifestyleCards[3]?.comingSoon ? 'group-hover:scale-105 filter grayscale' : 'group-hover:scale-110'
                        }`}
                        sizes="(max-width: 768px) 100vw, 16vw"
                      />

                      {/* Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/40 to-transparent transition-opacity duration-300 ${
                        lifestyleCards[3]?.comingSoon ? 'opacity-85' : 'opacity-70 group-hover:opacity-85'
                      }`} />

                      {/* Coming Soon Badge */}
                      {lifestyleCards[3]?.comingSoon && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="bg-accent-orange/90 backdrop-blur-sm px-2 py-1 rounded-full border border-accent-orange">
                            <span className="text-white text-xs font-display font-bold uppercase tracking-wider">
                              {String(t('lifestyle.comingSoon'))}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <motion.div
                          className="transform transition-transform duration-300 group-hover:translate-y-[-3px]"
                        >
                          <p className="text-accent-lime font-bold uppercase tracking-wider text-xs mb-1">
                            {String(t(lifestyleCards[3]?.labelKey || ''))}
                          </p>
                          <div className="flex items-center gap-1">
                            <span className={`text-sm font-medium ${
                              lifestyleCards[3]?.comingSoon ? 'text-white/60' : ''
                            }`}>
                              {lifestyleCards[3]?.comingSoon
                                ? String(t('lifestyle.comingSoon'))
                                : String(t('lifestyle.explore'))
                              }
                            </span>
                            {!lifestyleCards[3]?.comingSoon && (
                              <svg
                                className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    {lifestyleCards[3]?.comingSoon ? (
                      </div>
                    ) : (
                      </Link>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
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
              {card.isGallery ? (
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="group relative block h-[250px] w-full overflow-hidden rounded-lg cursor-pointer"
                >
                  <Image
                    src={card.image}
                    alt={String(t(card.labelKey))}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="100vw"
                  />

                  {/* Special gradient overlay for gallery */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-70" />

                  {/* Gallery icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-accent-lime/20 backdrop-blur-sm rounded-full p-4">
                      <svg className="w-8 h-8 text-accent-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-accent-lime font-bold uppercase tracking-wider text-xs mb-1">
                      {String(t(card.labelKey))}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-medium">
                        {String(t('lifestyle.viewGallery'))}
                      </span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </button>
              ) : (
                <div className="group relative block h-[250px] overflow-hidden rounded-lg">
                  {card.comingSoon ? (
                    <div className="relative h-full cursor-default">
                  ) : (
                    <Link
                      href={card.link}
                      target={card.external ? "_blank" : undefined}
                      rel={card.external ? "noopener noreferrer" : undefined}
                      className="block h-full"
                    >
                  )}
                    <Image
                      src={card.image}
                      alt={String(t(card.labelKey))}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        card.comingSoon ? 'group-hover:scale-105 filter grayscale' : 'group-hover:scale-110'
                      }`}
                      sizes="100vw"
                    />

                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent ${
                      card.comingSoon ? 'opacity-80' : 'opacity-60'
                    }`} />

                    {/* Coming Soon Badge */}
                    {card.comingSoon && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-accent-orange/90 backdrop-blur-sm px-3 py-1 rounded-full border border-accent-orange">
                          <span className="text-white text-xs font-display font-bold uppercase tracking-wider">
                            {String(t('lifestyle.comingSoon'))}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-accent-lime font-bold uppercase tracking-wider text-xs mb-1">
                        {String(t(card.labelKey))}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-medium ${
                          card.comingSoon ? 'text-white/60' : ''
                        }`}>
                          {card.comingSoon
                            ? String(t('lifestyle.comingSoon'))
                            : card.id === 'apparel'
                              ? String(t('lifestyle.explore'))
                              : String(t('lifestyle.viewMore'))
                          }
                        </span>
                        {!card.comingSoon && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        )}
                      </div>
                    </div>
                  {card.comingSoon ? (
                    </div>
                  ) : (
                    </Link>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* News Articles Row - Added to existing grid */}
        <div className="mt-8 md:mt-12">
          <motion.h3
            className="text-dark-primary font-display text-2xl md:text-3xl font-bold uppercase mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {String(t('lifestyle.newsTitle'))}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
            {newsMetadata.map((article, index) => (
              <motion.div
                key={`news-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block h-[250px] md:h-[280px] overflow-hidden rounded-lg"
                >
                  {/* Article Image */}
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-dark-bg to-dark-card flex items-center justify-center">
                      <svg className="w-16 h-16 text-dark-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <motion.div
                      className="transform transition-transform duration-300 group-hover:translate-y-[-4px]"
                    >
                      <p className="text-accent-lime font-bold uppercase tracking-wider text-xs mb-1">
                        {article.siteName}
                      </p>
                      <h4 className="font-semibold text-base md:text-lg line-clamp-2 mb-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-medium">
                          {String(t('lifestyle.readArticle'))}
                        </span>
                        <svg
                          className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
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

            {/* Loading skeleton */}
            {loadingNews && newsArticles.map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-[250px] md:h-[280px] bg-gradient-to-br from-dark-bg to-dark-card rounded-lg overflow-hidden animate-pulse"
              >
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-4 w-20 bg-dark-border rounded mb-2" />
                  <div className="h-5 bg-dark-border rounded mb-2" />
                  <div className="h-4 w-24 bg-dark-border rounded" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery Modal */}
        <GalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
        />
      </div>
    </section>
  )
}