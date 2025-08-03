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

  useEffect(() => {
    fetchTestimonials()
  }, [])

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

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-accent-lime' : 'text-gray-700'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-label={`${i + 1} star`}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <div className="h-16 bg-gray-800 rounded animate-pulse max-w-lg mx-auto mb-4"></div>
            <div className="h-6 bg-gray-800 rounded animate-pulse max-w-md mx-auto"></div>
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-900 p-8 rounded-xl w-80 shrink-0">
                <div className="w-12 h-12 bg-gray-800 rounded animate-pulse mb-6"></div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="w-4 h-4 bg-gray-800 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="h-20 bg-gray-800 rounded animate-pulse mb-4"></div>
                <div className="h-6 bg-gray-800 rounded animate-pulse w-32"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 md:py-24">
        <div className="container text-center">
          <p className="text-red-500">{t('community.error')}</p>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 md:py-24">
        <div className="container text-center">
          <p className="text-text-gray">{t('community.empty')}</p>
        </div>
      </section>
    )
  }


  return (
    <section className="py-16 md:py-20 overflow-hidden">
      <div className="container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-accent-orange font-display text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase mb-4 tracking-tight">
            {t('community.title')}
          </h2>
          <p className="text-text-gray text-lg font-body">{t('community.subtitle')}</p>
        </motion.div>

        <div className="relative">
          {/* Horizontal scrollable container */}
          <motion.div 
            className="overflow-x-auto scrollbar-hide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-6 pb-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="bg-gray-900 p-8 rounded-xl w-80 shrink-0 snap-start relative group hover:bg-gray-800 transition-colors duration-300"
                >
                  {/* Orange quote glyph */}
                  <Quote 
                    size={40} 
                    className="text-accent-orange absolute top-6 left-6 opacity-50"
                  />
                  
                  <div className="mt-12 mb-6">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <blockquote className="mb-6">
                    <p className="text-white/90 text-sm leading-relaxed italic">
                      {locale === 'pt' ? testimonial.text_pt : testimonial.text_en}
                    </p>
                  </blockquote>
                  
                  <p className="font-semibold text-white">
                    {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}