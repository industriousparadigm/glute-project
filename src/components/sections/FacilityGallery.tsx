'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import { images } from '@/lib/images'

const galleryImages = images.gallery.map((img, index) => ({
  ...img,
  altKey: `facility.image${index + 1}.alt` as const
}))

export function FacilityGallery() {
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
    <section id="facility" className="py-12 md:py-16">
      <div className="container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-accent-orange font-display text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase mb-4 tracking-tight">
            {t('facility.title')}
          </h2>
          <p className="text-text-gray text-lg font-body">{t('facility.subtitle')}</p>
        </motion.div>

        {/* Mosaic Grid Layout - responsive with mobile-first approach */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[250px]">
          {/* First image - spans full width on mobile */}
          <motion.button
            className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl col-span-2 md:col-span-2 row-span-1"
            onClick={() => openModal(0)}
            aria-label={`${t('facility.viewAll')} - ${t(galleryImages[0].altKey)}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Image
              src={galleryImages[0].src}
              alt={t(galleryImages[0].altKey)}
              fill
              className="object-cover"
              loading="eager"
              sizes="(max-width: 768px) 66vw, 66vw"
            />
            <div className="absolute inset-0 bg-brand-black/30 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-display font-bold uppercase text-sm tracking-wide drop-shadow-lg">{t(galleryImages[0].altKey)}</p>
            </div>
          </motion.button>

          {/* Second image - vertical on desktop, square on mobile */}
          <motion.button
            className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl col-span-1 row-span-1 md:row-span-2"
            onClick={() => openModal(1)}
            aria-label={`${t('facility.viewAll')} - ${t(galleryImages[1].altKey)}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Image
              src={galleryImages[1].src}
              alt={t(galleryImages[1].altKey)}
              fill
              className="object-cover"
              loading="eager"
              sizes="(max-width: 768px) 33vw, 33vw"
            />
            <div className="absolute inset-0 bg-brand-black/30 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-display font-bold uppercase text-sm tracking-wide drop-shadow-lg">{t(galleryImages[1].altKey)}</p>
            </div>
          </motion.button>

          {/* Row 2: 2x 1x1 blocks (continuing with vertical block from row 1) */}
          <motion.button
            className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl col-span-1 row-span-1"
            onClick={() => openModal(2)}
            aria-label={`${t('facility.viewAll')} - ${t(galleryImages[2].altKey)}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src={galleryImages[2].src}
              alt={t(galleryImages[2].altKey)}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 33vw, 33vw"
            />
            <div className="absolute inset-0 bg-brand-black/30 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-display font-bold uppercase text-sm tracking-wide drop-shadow-lg">{t(galleryImages[2].altKey)}</p>
            </div>
          </motion.button>

          <motion.button
            className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl col-span-1 row-span-1"
            onClick={() => openModal(3)}
            aria-label={`${t('facility.viewAll')} - ${t(galleryImages[3].altKey)}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Image
              src={galleryImages[3].src}
              alt={t(galleryImages[3].altKey)}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 33vw, 33vw"
            />
            <div className="absolute inset-0 bg-brand-black/30 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-display font-bold uppercase text-sm tracking-wide drop-shadow-lg">{t(galleryImages[3].altKey)}</p>
            </div>
          </motion.button>

          {/* Row 3: 1x1 block + 2x1 horizontal block */}
          <motion.button
            className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl col-span-1 row-span-1"
            onClick={() => openModal(4)}
            aria-label={`${t('facility.viewAll')} - ${t(galleryImages[4].altKey)}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image
              src={galleryImages[4].src}
              alt={t(galleryImages[4].altKey)}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 33vw, 33vw"
            />
            <div className="absolute inset-0 bg-brand-black/30 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-display font-bold uppercase text-sm tracking-wide drop-shadow-lg">{t(galleryImages[4].altKey)}</p>
            </div>
          </motion.button>

          <motion.button
            className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl col-span-2 row-span-1"
            onClick={() => openModal(5)}
            aria-label={`${t('facility.viewAll')} - ${t(galleryImages[5].altKey)}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Image
              src={galleryImages[5].src}
              alt={t(galleryImages[5].altKey)}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 66vw, 66vw"
            />
            <div className="absolute inset-0 bg-brand-black/30 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-display font-bold uppercase text-sm tracking-wide drop-shadow-lg">{t(galleryImages[5].altKey)}</p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Modal */}
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
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-opacity"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-opacity"
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
              className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-opacity"
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
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black bg-opacity-50 rounded-full text-white">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}