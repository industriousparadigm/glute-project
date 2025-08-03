'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

// Import images
import womanJumping from '../../../public/images/woman-jumping.png'
import gymCardio from '../../../public/images/gym-cardio-zone.jpg'
import gymTraining from '../../../public/images/gym-training-floor.jpg'
import gymWeights from '../../../public/images/gym-weights-area.jpg'
import peopleRun from '../../../public/images/people-run.jpg'

// Mock Instagram posts
const mockPosts = [
  { id: 1, image: womanJumping, likes: 127, comments: 15 },
  { id: 2, image: gymCardio, likes: 89, comments: 8 },
  { id: 3, image: gymTraining, likes: 156, comments: 23 },
  { id: 4, image: gymWeights, likes: 201, comments: 31 },
  { id: 5, image: peopleRun, likes: 173, comments: 19 }
]

export function InstagramFeed() {
  const { t } = useTranslations()

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-accent-orange font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase mb-3 tracking-tight">
            INSTAGRAM
          </h2>
          <a 
            href="https://instagram.com/glute_project" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent-lime hover:text-white transition-colors"
          >
            <Instagram size={20} />
            <span className="font-semibold">@glute_project</span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {/* Large featured post */}
          <motion.a
            href="https://instagram.com/glute_project"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={mockPosts[0].image}
              alt="Latest Instagram post"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-brand-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="flex items-center gap-6 mb-2">
                  <span className="flex items-center gap-1">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    <span className="font-semibold">{mockPosts[0].likes}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">{mockPosts[0].comments}</span>
                  </span>
                </div>
                <p className="text-sm text-white/80">Ver no Instagram</p>
              </div>
            </div>
          </motion.a>

          {/* Grid of smaller posts */}
          <div className="grid grid-cols-2 gap-4">
            {mockPosts.slice(1, 5).map((post, index) => (
              <motion.a
                key={post.id}
                href="https://instagram.com/glute_project"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={post.image}
                  alt={`Instagram post ${post.id}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-brand-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        <span className="font-semibold text-sm">{post.likes}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold text-sm">{post.comments}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}