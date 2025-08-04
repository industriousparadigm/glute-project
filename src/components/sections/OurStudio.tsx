'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import { Users, Utensils, Clock, Heart } from 'lucide-react'
import { images } from '@/lib/images'

// Import additional images
import gymCardio from '../../../public/images/gym-cardio-zone.jpg'
import gymEquipment from '../../../public/images/gym-equipment-rack.jpg'

// Define grid items: mix of photos and features
type GridItemType = 'photo' | 'feature'

interface PhotoItem {
  type: 'photo'
  src: any
  altKey: string
  imageIndex: number
  colSpan?: number
  rowSpan?: number
}

interface FeatureItem {
  type: 'feature'
  key: 'trainer_guided' | 'nutrition' | 'access_24h' | 'community'
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>
  colSpan?: number
  rowSpan?: number
}

type GridItem = PhotoItem | FeatureItem

// All gallery images (8 total)
const galleryImages = [
  ...images.gallery.map((img, index) => ({
    ...img,
    altKey: `facility.image${index + 1}.alt` as const
  })),
  { src: gymCardio, altKey: 'facility.image7.alt' as const },
  { src: gymEquipment, altKey: 'facility.image8.alt' as const }
]

// Grid layout: 4x3 with special sizing
// Desktop:
// Row 1: feature | wide photo (2x1)
// Row 2: vertical (1x2) | photo | feature  
// Row 3: (vertical cont.) | nutrition | photo
// Row 4: photo | community | photo
const gridItems: GridItem[] = [
  // Row 1
  { type: 'feature', key: 'access_24h', icon: Clock },
  { type: 'photo', src: galleryImages[0].src, altKey: galleryImages[0].altKey, imageIndex: 0, colSpan: 2 }, // Wide 2x1
  
  // Row 2
  { type: 'photo', src: galleryImages[1].src, altKey: galleryImages[1].altKey, imageIndex: 1, rowSpan: 2 }, // Vertical 1x2 - Cardio Zone
  { type: 'photo', src: galleryImages[6].src, altKey: galleryImages[6].altKey, imageIndex: 6 },
  { type: 'feature', key: 'trainer_guided', icon: Users },
  
  // Row 3
  // (vertical photo continues here)
  { type: 'feature', key: 'nutrition', icon: Utensils },
  { type: 'photo', src: galleryImages[2].src, altKey: galleryImages[2].altKey, imageIndex: 2 },
  
  // Row 4
  { type: 'photo', src: galleryImages[3].src, altKey: galleryImages[3].altKey, imageIndex: 3 },
  { type: 'feature', key: 'community', icon: Heart },
  { type: 'photo', src: galleryImages[4].src, altKey: galleryImages[4].altKey, imageIndex: 4 },
]

export function OurStudio() {
  const { t } = useTranslations()
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeModal = useCallback(() => {
    setSelectedImageIndex(null)
  }, [])

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return

    if (direction === 'next') {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length)
    } else {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? galleryImages.length - 1 : selectedImageIndex - 1
      )
    }
  }, [selectedImageIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return

      switch (e.key) {
        case 'ArrowRight':
          navigateImage('next')
          break
        case 'ArrowLeft':
          navigateImage('prev')
          break
        case 'Escape':
          closeModal()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex, navigateImage, closeModal])

  return (
    <section id="studio" className="py-12 md:py-16">
      <div className="container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-accent-orange font-display text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase mb-4 tracking-tight">
            {t('studio.title')}
          </h2>
          <p className="text-text-gray text-lg font-body">{t('studio.subtitle')}</p>
        </motion.div>

        {/* 4x3 Grid Layout - 2 cols on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[200px]">
          {gridItems.map((item, index) => {
            const colSpanClass = item.colSpan === 2 ? 'col-span-2' : 'col-span-1'
            const rowSpanClass = item.rowSpan === 2 ? 'row-span-1 md:row-span-2' : 'row-span-1'
            
            if (item.type === 'photo') {
              return (
                <motion.button
                  key={index}
                  className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${colSpanClass} ${rowSpanClass}`}
                  onClick={() => openModal(item.imageIndex)}
                  aria-label={`${t('facility.viewAll')} - ${t(item.altKey)}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Image
                    src={item.src}
                    alt={t(item.altKey)}
                    fill
                    className="object-cover"
                    loading={index < 6 ? "eager" : "lazy"}
                    sizes={`(max-width: 768px) ${item.colSpan === 2 ? '50vw' : '50vw'}, ${item.colSpan === 2 ? '66vw' : item.rowSpan === 2 ? '33vw' : '33vw'}`}
                  />
                  <div className="absolute inset-0 bg-brand-black/30 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-display font-bold uppercase text-sm tracking-wide drop-shadow-lg">{t(item.altKey)}</p>
                  </div>
                </motion.button>
              )
            } else {
              // Feature card
              const IconComponent = item.icon
              const description = t(`differentiators.${item.key}.description`)
              const [part1, part2] = description.split(' · ')
              
              return (
                <motion.div
                  key={index}
                  className={`relative overflow-hidden bg-zinc-900 group hover:bg-zinc-800 transition-all duration-300 ${colSpanClass} ${rowSpanClass}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/10 to-transparent opacity-50" />
                  <div className="relative p-6 h-full flex flex-col items-center justify-center text-center">
                    <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                      <IconComponent 
                        size={48} 
                        className="text-accent-orange mx-auto stroke-2"
                        aria-hidden={true}
                      />
                    </div>
                    <h3 className="text-accent-orange font-display text-lg md:text-xl font-bold uppercase mb-2 tracking-wide">
                      {t(`differentiators.${item.key}.title`)}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-white font-body text-xs md:text-sm font-semibold">{part1}</p>
                      {part2 && (
                        <p className="text-white/70 font-body text-xs">{part2}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            }
          })}
        </div>
      </div>

      {/* Modal - reuse from original */}
      {selectedImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('facility.viewAll')}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black bg-opacity-90"
            onClick={closeModal}
            aria-label={t('facility.close')}
          />
          <div
            className="relative max-w-5xl max-h-[90vh] mx-4 z-10"
            role="document"
          >
            <div className="relative w-full h-full">
              <Image
                src={galleryImages[selectedImageIndex].src}
                alt={t(galleryImages[selectedImageIndex].altKey)}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {/* Navigation buttons */}
            <button
              aria-label="Previous image"
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center text-white transition-opacity"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              aria-label="Next image"
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center text-white transition-opacity"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Close button */}
            <button
              aria-label={t('facility.close')}
              onClick={closeModal}
              className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center text-white transition-opacity"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black bg-opacity-50 text-white">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}