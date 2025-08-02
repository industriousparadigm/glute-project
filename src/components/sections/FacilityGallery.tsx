'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/i18n/hooks'

const galleryImages = [
  { src: '/images/facility-1.svg', altKey: 'facility.image1.alt' },
  { src: '/images/facility-2.svg', altKey: 'facility.image2.alt' },
  { src: '/images/facility-3.svg', altKey: 'facility.image3.alt' },
  { src: '/images/facility-4.svg', altKey: 'facility.image4.alt' },
  { src: '/images/facility-5.svg', altKey: 'facility.image5.alt' },
  { src: '/images/facility-6.svg', altKey: 'facility.image6.alt' },
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t('facility.title')}</h2>
          <p className="text-xl text-gray-600">{t('facility.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 block w-full"
              onClick={() => openModal(index)}
              aria-label={`${t('facility.viewAll')} - ${t(image.altKey)}`}
            >
              <Image
                src={image.src}
                alt={t(image.altKey)}
                width={600}
                height={400}
                className="w-full h-full object-cover"
                loading={index < 3 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 pointer-events-none" />
            </button>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <button
            onClick={() => openModal(0)}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            {t('facility.viewAll')}
          </button>
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
            <Image
              src={galleryImages[selectedImageIndex].src}
              alt={t(galleryImages[selectedImageIndex].altKey)}
              width={1200}
              height={800}
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