'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'

const galleryImages = [
  { src: '/images/gym-weights-area.jpg', altKey: 'facility.image1.alt', gridSpan: 'md:col-span-2', height: 'h-64 md:h-80' },
  { src: '/images/gym-cardio-zone.jpg', altKey: 'facility.image2.alt', gridSpan: 'md:col-span-1', height: 'h-48 md:h-64' },
  { src: '/images/gym-training-floor.jpg', altKey: 'facility.image3.alt', gridSpan: 'md:col-span-1', height: 'h-56 md:h-72' },
  { src: '/images/gym-equipment-rack.jpg', altKey: 'facility.image4.alt', gridSpan: 'md:col-span-1', height: 'h-52 md:h-60' },
  { src: '/images/gym-functional-area.jpg', altKey: 'facility.image5.alt', gridSpan: 'md:col-span-2', height: 'h-48 md:h-64' },
  { src: '/images/gym-strength-zone.jpg', altKey: 'facility.image6.alt', gridSpan: 'md:col-span-1', height: 'h-60 md:h-76' },
]

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
    <section id="facility" className="py-24 md:py-32 bg-[#F4F4F4]">
      <div className="container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[#FF5E1B] font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase mb-4">
            {t('facility.title')}
          </h2>
          <p className="text-[#0A0A0A]/80 text-xl font-body">{t('facility.subtitle')}</p>
        </motion.div>

        {/* Mosaic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
          {galleryImages.map((image, index) => (
            <motion.button
              key={index}
              className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl block w-full ${image.gridSpan} ${image.height}`}
              onClick={() => openModal(index)}
              aria-label={`${t('facility.viewAll')} - ${t(image.altKey)}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={image.src}
                alt={t(image.altKey)}
                className="w-full h-full object-cover"
                loading={index < 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/20 transition-all duration-300 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          ))}
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
            <img
              src={galleryImages[selectedImageIndex].src}
              alt={t(galleryImages[selectedImageIndex].altKey)}
              className="w-full h-full object-contain"
            />

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