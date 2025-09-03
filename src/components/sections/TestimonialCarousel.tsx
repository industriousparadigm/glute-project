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
          <p className="text-red-500">{t('community.error')}</p>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-12 md:py-16">
        <div className="container text-center">
          <p className="text-text-gray">{t('community.empty')}</p>
        </div>
      </section>
    )
  }


  return (
    <section className="py-12 md:py-16 overflow-hidden">
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
          {/* Mobile - stacked */}
          <div className="block md:hidden space-y-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="bg-black p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <blockquote className="testimonial-quote relative mb-4">
                  <p className="text-white/90 text-sm leading-relaxed italic">
                    {locale === 'pt' ? testimonial.text_pt : testimonial.text_en}
                  </p>
                </blockquote>
                
                <p className="font-semibold text-accent-orange">
                  {testimonial.name}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Desktop - horizontal scroll */}
          <motion.div 
            className="hidden md:block overflow-x-auto scrollbar-hide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-6 pb-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="bg-surface-dark/50 backdrop-blur-sm border border-white/5 p-8 w-80 shrink-0 snap-start relative group hover:border-accent-lime/20 transition-all duration-300"
                >
                  {/* Quote glyph now handled by CSS with lime accent */}
                  
                  <blockquote className="testimonial-quote relative mb-4 md:mb-6 mt-2 md:mt-12">
                    <p className="text-white/90 text-sm leading-relaxed italic">
                      {locale === 'pt' ? testimonial.text_pt : testimonial.text_en}
                    </p>
                  </blockquote>
                  
                  <p className="font-semibold text-accent-orange">
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