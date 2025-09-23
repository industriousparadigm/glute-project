'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import { Users, Utensils, Clock, Heart, Dumbbell, Weight, ExternalLink, MapPin, Target, Zap, TrendingUp } from 'lucide-react'
import { images } from '@/lib/images'

// Import additional images
import gymCardio from '../../../public/images/gym-cardio-zone.jpg'
import gymEquipment from '../../../public/images/gym-equipment-rack.jpg'

// Define grid items: mix of photos and features
type GridItemType = 'photo' | 'feature'

interface PhotoItem {
  type: 'photo'
  src: string | { src: string; height: number; width: number; blurDataURL?: string }
  altKey: string
  imageIndex: number
  colSpan?: number
  rowSpan?: number
}

interface FeatureItem {
  type: 'feature'
  key: 'trainer_guided' | 'nutrition' | 'access_24h' | 'community' | 'results' | 'energy' | 'progress'
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>
  colSpan?: number
  rowSpan?: number
}

interface EquipmentItem {
  type: 'equipment'
  key: 'upper_machines' | 'lower_machines' | 'space'
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>
  href: string
  colSpan?: number
  rowSpan?: number
}

type GridItem = PhotoItem | FeatureItem | EquipmentItem

// All gallery images (8 total)
const galleryImages = [
  ...images.gallery.map((img, index) => ({
    ...img,
    altKey: `facility.image${index + 1}.alt` as const
  })),
  { src: gymCardio, altKey: 'facility.image7.alt' as const },
  { src: gymEquipment, altKey: 'facility.image8.alt' as const }
]

// Grid layout: 4x4 with creative sizing
// Desktop:
// Row 1: feature | wide photo (2x1) | placeholder
// Row 2: vertical (1x2) | equipment | feature | photo
// Row 3: (vertical cont.) | equipment | photo | placeholder
// Row 4: photo | community | photo | placeholder
const gridItems: GridItem[] = [
  // Row 1 (4 cells)
  { type: 'feature', key: 'access_24h', icon: Clock },
  { type: 'photo', src: galleryImages[0].src, altKey: galleryImages[0].altKey, imageIndex: 0, colSpan: 2 }, // Wide 2x1
  { type: 'feature', key: 'nutrition', icon: Utensils }, // Placeholder - can be replaced

  // Row 2 (4 cells)
  { type: 'photo', src: galleryImages[1].src, altKey: galleryImages[1].altKey, imageIndex: 1, rowSpan: 2 }, // Vertical 1x2
  { type: 'equipment', key: 'upper_machines', icon: Dumbbell, href: 'https://www.instagram.com/stories/highlights/18148374118390744' },
  { type: 'feature', key: 'trainer_guided', icon: Users },
  { type: 'photo', src: galleryImages[5].src, altKey: galleryImages[5].altKey, imageIndex: 5 },

  // Row 3 (4 cells - first is continuation of vertical)
  // (vertical photo continues here)
  { type: 'equipment', key: 'lower_machines', icon: Weight, href: 'https://www.instagram.com/stories/highlights/17903819189546729' },
  { type: 'photo', src: galleryImages[2].src, altKey: galleryImages[2].altKey, imageIndex: 2 },
  { type: 'equipment', key: 'space', icon: MapPin, href: 'https://www.instagram.com/stories/highlights/17977709071656182' },

  // Row 4 (4 cells)
  { type: 'photo', src: galleryImages[3].src, altKey: galleryImages[3].altKey, imageIndex: 3 },
  { type: 'feature', key: 'community', icon: Heart },
  { type: 'photo', src: galleryImages[4].src, altKey: galleryImages[4].altKey, imageIndex: 4 },
  { type: 'photo', src: galleryImages[6].src, altKey: galleryImages[6].altKey, imageIndex: 6 }, // Placeholder photo
]

export function OurStudio() {
  const { t } = useTranslations()

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
          <h2 className="text-accent-orange font-display text-5xl sm:text-6xl md:text-7xl font-bold uppercase mb-4 tracking-normal">
            {String(t('studio.title'))}
          </h2>
          <p className="text-dark-secondary text-lg font-body">{String(t('studio.subtitle'))}</p>
        </motion.div>

        {/* 4x4 Grid Layout - 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[120px] sm:auto-rows-[180px] md:auto-rows-[200px]">
          {gridItems.map((item, index) => {
            const colSpanClass = item.colSpan === 2 ? 'col-span-2' : 'col-span-1'
            const rowSpanClass = item.rowSpan === 2 ? 'row-span-1 md:row-span-2' : 'row-span-1'
            
            if (item.type === 'photo') {
              return (
                <motion.div
                  key={index}
                  className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${colSpanClass} ${rowSpanClass}`}
                  aria-label={`${String(t(item.altKey))}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={item.src}
                    alt={String(t(item.altKey))}
                    fill
                    className="object-cover"
                    loading={index < 6 ? "eager" : "lazy"}
                    sizes={`(max-width: 768px) ${item.colSpan === 2 ? '50vw' : '50vw'}, ${item.colSpan === 2 ? '66vw' : item.rowSpan === 2 ? '33vw' : '33vw'}`}
                  />
                  <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-brand-black/20 transition-all duration-300" />
                  {/* Subtle rim lighting effect */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-transparent group-hover:ring-accent-orange/30 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </motion.div>
              )
            } else if (item.type === 'equipment') {
              // Equipment showcase card
              const IconComponent = item.icon

              return (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative overflow-hidden bg-zinc-900 group hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${colSpanClass} ${rowSpanClass}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={String(t(`equipment.${item.key}.title`))}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                  {/* Subtle pulse animation on hover */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-transparent group-hover:ring-accent-orange/20 transition-all duration-300" />
                  <div className="relative p-3 md:p-6 h-full flex flex-col items-center justify-center text-center">
                    <div className="mb-2 md:mb-4 transform transition-transform duration-300 group-hover:scale-110">
                      <IconComponent
                        size={32}
                        className="text-accent-orange mx-auto stroke-2 md:w-12 md:h-12"
                        aria-hidden={true}
                      />
                    </div>
                    <h3 className="text-accent-orange font-display text-base md:text-xl font-bold uppercase mb-1 md:mb-2 tracking-wide">
                      {String(t(`equipment.${item.key}.title`))}
                    </h3>
                    <p className="text-white font-body text-[10px] md:text-sm font-semibold mb-2 md:mb-3 hidden md:block">
                      {String(t(`equipment.${item.key}.description`))}
                    </p>
                    <div className="flex items-center gap-1 md:gap-2 text-white/70 group-hover:text-accent-orange transition-colors">
                      <span className="text-[10px] md:text-xs uppercase tracking-wide font-bold">{String(t('equipment.viewMore'))}</span>
                      <ExternalLink size={10} className="stroke-2 md:w-[14px] md:h-[14px]" />
                    </div>
                  </div>
                </motion.a>
              )
            } else {
              // Feature card
              const IconComponent = item.icon
              const description = String(t(`differentiators.${item.key}.description`))
              const [part1, part2] = description.split(' · ')

              return (
                <motion.div
                  key={index}
                  className={`relative overflow-hidden bg-zinc-900 group hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-default ${colSpanClass} ${rowSpanClass}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-transparent group-hover:ring-accent-orange/20 transition-all duration-300" />
                  <div className="relative p-3 md:p-6 h-full flex flex-col items-center justify-center text-center">
                    <div className="mb-2 md:mb-4 transform transition-transform duration-300 group-hover:scale-110">
                      <IconComponent
                        size={32}
                        className="text-accent-orange mx-auto stroke-2 md:w-12 md:h-12"
                        aria-hidden={true}
                      />
                    </div>
                    <h3 className="text-accent-orange font-display text-base md:text-xl font-bold uppercase mb-1 md:mb-2 tracking-wide">
                      {String(t(`differentiators.${item.key}.title`))}
                    </h3>
                    <div className="space-y-1 hidden md:block">
                      <p className="text-white font-body text-xs md:text-sm font-semibold">{part1}</p>
                      {part2 && (
                        <p className="text-white/70 font-body text-xs">{part2}</p>
                      )}
                    </div>
                    <p className="text-white font-body text-[10px] font-semibold md:hidden">{part1}</p>
                  </div>
                </motion.div>
              )
            }
          })}
        </div>
      </div>
    </section>
  )
}