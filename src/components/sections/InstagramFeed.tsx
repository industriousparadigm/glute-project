'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

// Mock Instagram posts - replace with real API data
const mockPosts = [
  { id: 1, image: '/images/gym-strength-zone.jpg', likes: 42, comments: 5 },
  { id: 2, image: '/images/gym-cardio-zone.jpg', likes: 38, comments: 3 },
  { id: 3, image: '/images/gym-training-floor.jpg', likes: 56, comments: 8 },
  { id: 4, image: '/images/gym-weights-area.jpg', likes: 61, comments: 12 },
  { id: 5, image: '/images/gym-equipment-rack.jpg', likes: 45, comments: 6 },
  { id: 6, image: '/images/people-run.jpg', likes: 73, comments: 9 }
]

export function InstagramFeed() {
  const { t } = useTranslations()

  return (
    <section className="py-20 md:py-24 bg-surface-dark">
      <div className="container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-accent-orange font-display text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase mb-4 tracking-tight">
            INSTAGRAM
          </h2>
          <a 
            href="https://instagram.com/gluteproject" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent-lime hover:text-white transition-colors"
          >
            <Instagram size={24} />
            <span className="font-semibold">@gluteproject</span>
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {mockPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://instagram.com/gluteproject"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-brand-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      <span className="font-semibold">{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">{post.comments}</span>
                    </span>
                  </div>
                  <p className="text-sm text-white/80">Ver no Instagram</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Call to action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://instagram.com/gluteproject"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-orange text-white font-semibold hover:bg-accent-orange/90 transition-colors"
          >
            <Instagram size={20} />
            Segue-nos no Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}