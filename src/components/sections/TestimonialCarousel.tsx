'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslations } from '@/lib/i18n/hooks'

interface Testimonial {
  id: number
  name: string
  text_pt: string
  text_en: string
  rating: number
  highlighted: boolean
}

export function TestimonialCarousel() {
  const { t, locale } = useTranslations()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  useEffect(() => {
    // Set up auto-rotation
    if (testimonials.length > 1 && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [testimonials.length, isPaused])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (!response.ok) throw new Error('Failed to fetch')
      
      const data = await response.json()
      setTestimonials(data.filter((t: Testimonial) => t.highlighted))
      setLoading(false)
    } catch {
      setError(true)
      setLoading(false)
    }
  }

  const navigateNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const navigatePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }, [testimonials.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (testimonials.length === 0) return

      switch (e.key) {
        case 'ArrowRight':
          navigateNext()
          break
        case 'ArrowLeft':
          navigatePrev()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [testimonials.length, navigateNext, navigatePrev])

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigateNext()
      } else {
        navigatePrev()
      }
    }

    setTouchStart(0)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-label={`${i + 1} star`}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">{t('community.loading')}</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">{t('community.error')}</p>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">{t('community.empty')}</p>
        </div>
      </section>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t('community.title')}</h2>
          <p className="text-xl text-gray-600">{t('community.subtitle')}</p>
        </div>

        <div
          className="testimonial-carousel max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative">
            <div
              className="testimonial-content bg-white rounded-lg shadow-lg p-8 md:p-12"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex justify-center mb-6">
                {renderStars(currentTestimonial.rating)}
              </div>

              <blockquote className="text-center mb-8">
                <p className="text-xl md:text-2xl text-gray-800 italic">
                  &ldquo;{locale === 'pt' ? currentTestimonial.text_pt : currentTestimonial.text_en}&rdquo;
                </p>
              </blockquote>

              <div className="text-center">
                <p className="font-semibold text-lg">{currentTestimonial.name}</p>
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              aria-label={t('community.previousTestimonial')}
              onClick={navigatePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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
              aria-label={t('community.nextTestimonial')}
              onClick={navigateNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}