'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import type { InstagramPost } from '@/lib/instagram/types'

// Import placeholder images
import womanJumping from '../../../public/images/woman-jumping.png'
import gymCardio from '../../../public/images/gym-cardio-zone.jpg'
import gymTraining from '../../../public/images/gym-training-floor.jpg'
import gymWeights from '../../../public/images/gym-weights-area.jpg'
import peopleRun from '../../../public/images/people-run.jpg'

// Mock Instagram posts for placeholder
const mockPosts = [
  { id: '1', image: womanJumping, likes: 127, comments: 15 },
  { id: '2', image: gymCardio, likes: 89, comments: 8 },
  { id: '3', image: gymTraining, likes: 156, comments: 23 },
  { id: '4', image: gymWeights, likes: 201, comments: 31 },
  { id: '5', image: peopleRun, likes: 173, comments: 19 }
]

export function InstagramFeed() {
  const { t } = useTranslations()
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaceholder, setIsPlaceholder] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/instagram/posts?limit=5')
        const data = await response.json()
        
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts)
          setIsPlaceholder(false)
        } else {
          // No posts or API not configured, use placeholder
          setIsPlaceholder(true)
        }
      } catch (error) {
        console.error('Failed to fetch Instagram posts:', error)
        setIsPlaceholder(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Render placeholder content
  const renderPlaceholderPost = (post: typeof mockPosts[0], index: number, isLarge = false) => (
    <motion.a
      key={post.id}
      href="https://instagram.com/glute_project"
      target="_blank"
      rel="noopener noreferrer"
      className={`instagram-post group relative aspect-square cursor-pointer ${
        isLarge ? 'col-span-2 row-span-2' : ''
      } rounded-lg`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: isLarge ? 0 : 0.1 + index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      <Image
        src={post.image}
        alt={`Instagram post ${post.id}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes={isLarge ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
      />
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-brand-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-white text-center">
          <div className={`flex items-center ${isLarge ? 'gap-6' : 'gap-3'} ${isLarge ? 'mb-2' : ''}`}>
            <span className="flex items-center gap-1">
              <svg className={`${isLarge ? 'w-6 h-6' : 'w-5 h-5'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              <span className={`font-semibold ${isLarge ? '' : 'text-sm'}`}>{post.likes}</span>
            </span>
            <span className="flex items-center gap-1">
              <svg className={`${isLarge ? 'w-6 h-6' : 'w-5 h-5'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
              </svg>
              <span className={`font-semibold ${isLarge ? '' : 'text-sm'}`}>{post.comments}</span>
            </span>
          </div>
          {isLarge && <p className="text-sm text-white/80">Ver no Instagram</p>}
        </div>
      </div>
    </motion.a>
  )

  // Render real Instagram post
  const renderInstagramPost = (post: InstagramPost, index: number, isLarge = false) => (
    <motion.a
      key={post.id}
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className={`instagram-post group relative aspect-square cursor-pointer ${
        isLarge ? 'col-span-2 row-span-2' : ''
      } rounded-lg`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: isLarge ? 0 : 0.1 + index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      <Image
        src={post.thumbnail_url || post.media_url}
        alt={post.caption || `Instagram post by ${post.username}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes={isLarge ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
        unoptimized // Instagram images are already optimized
      />
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-brand-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-white text-center">
          <Instagram className={`${isLarge ? 'w-8 h-8' : 'w-6 h-6'} mx-auto mb-2`} />
          {isLarge && <p className="text-sm text-white/80">Ver no Instagram</p>}
        </div>
      </div>
    </motion.a>
  )

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

        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
            <div className="aspect-square bg-zinc-900 animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-900 animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {/* Large featured post */}
            {isPlaceholder ? (
              renderPlaceholderPost(mockPosts[0], 0, true)
            ) : (
              posts[0] && renderInstagramPost(posts[0], 0, true)
            )}

            {/* Grid of smaller posts */}
            <div className="grid grid-cols-2 gap-4">
              {isPlaceholder ? (
                mockPosts.slice(1, 5).map((post, index) => 
                  renderPlaceholderPost(post, index)
                )
              ) : (
                posts.slice(1, 5).map((post, index) => 
                  renderInstagramPost(post, index)
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}