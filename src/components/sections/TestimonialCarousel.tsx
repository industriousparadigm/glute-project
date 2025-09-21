'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()
      setTestimonials(data) // Show all testimonials, not just highlighted
      setLoading(false)
    } catch {
      setError(true)
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return null; // Remove stars from display
  }

  if (loading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-12">
            <div className="h-16 bg-gray-800 animate-pulse max-w-lg mx-auto mb-4"></div>
            <div className="h-6 bg-gray-800 animate-pulse max-w-md mx-auto"></div>
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-black p-8 w-80 shrink-0">
                <div className="w-12 h-12 bg-gray-800 animate-pulse mb-6"></div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="w-4 h-4 bg-gray-800 animate-pulse"></div>
                  ))}
                </div>
                <div className="h-20 bg-gray-800 animate-pulse mb-4"></div>
                <div className="h-6 bg-gray-800 animate-pulse w-32"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 md:py-16">
        <div className="container text-center">
          <p className="text-red-500">{String(t('community.error'))}</p>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-12 md:py-16">
        <div className="container text-center">
          <p className="text-dark-secondary">{String(t('community.empty'))}</p>
        </div>
      </section>
    )
  }


  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-accent-orange font-display text-5xl sm:text-6xl md:text-7xl font-bold uppercase mb-4 tracking-normal">
            {String(t('community.title'))}
          </h2>
          <p className="text-dark-secondary text-lg font-body">{String(t('community.subtitle'))}</p>
        </motion.div>

        {/* Responsive flex layout with centered rows - max 4 per row */}
        <div className="flex flex-wrap justify-center gap-6">
          {testimonials.slice(0, visibleCount).map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-sm bg-white shadow-lg border border-gray-200 p-6 md:p-8 relative group hover:border-accent-orange/40 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4) }}
            >
              <Quote className="text-accent-lime w-10 h-10 mb-4 opacity-40" />

              <blockquote className="testimonial-quote relative mb-4">
                <p className="text-dark-primary text-sm leading-relaxed italic">
                  {locale === 'pt' ? testimonial.text_pt : testimonial.text_en}
                </p>
              </blockquote>

              <p className="font-semibold text-accent-orange">
                {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Load More Button - Mobile Only */}
        {visibleCount < testimonials.length && (
          <motion.div
            className="flex justify-center mt-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 3, testimonials.length))}
              className="px-6 py-3 border-2 border-accent-orange text-accent-orange font-display uppercase text-sm
                       transition-all duration-300 hover:bg-accent-orange/10 active:scale-95"
            >
              {String(t('community.loadMore'))} ({visibleCount}/{testimonials.length})
            </button>
          </motion.div>
        )}

        {/* Show All on Desktop */}
        {visibleCount < testimonials.length && (
          <motion.div
            className="hidden md:flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setVisibleCount(testimonials.length)}
              className="px-8 py-3 border-2 border-accent-orange text-accent-orange font-display uppercase text-base
                       transition-all duration-300 hover:bg-accent-orange/10"
            >
              {String(t('community.viewAll'))} ({testimonials.length})
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}