'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/i18n/hooks'
import { ChevronLeft, ChevronRight, X, Maximize2, Loader2 } from 'lucide-react'

interface GalleryImage {
  url: string
  name: string
  modified: string
  thumbnail?: string
  width?: number
  height?: number
}

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  singleImageUrl?: string | null
  galleryFolder?: string | null
}

export default function GalleryModal({ isOpen, onClose, singleImageUrl = null, galleryFolder = null }: GalleryModalProps) {
  const { t } = useTranslations()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, boolean>>({})
  const modalRef = useRef<HTMLDivElement>(null)
  const preloadedImages = useRef<Record<number, HTMLImageElement>>({})
  const [allImagesPreloaded, setAllImagesPreloaded] = useState(false)

  // Single image mode
  const isSingleImageMode = !!singleImageUrl
  
  // Preload an image
  const preloadImage = useCallback((index: number) => {
    if (!images[index] || preloadedImages.current[index]) return

    const img = document.createElement('img')
    img.onload = () => {
      preloadedImages.current[index] = img
      setImageLoadStates(prev => ({ ...prev, [index]: true }))
    }
    img.src = images[index].url // Set src after onload handler
  }, [images])

  // Preload adjacent images (next 2 and previous 1)
  const preloadAdjacentImages = useCallback((centerIndex: number) => {
    // Preload current
    preloadImage(centerIndex)

    // Preload next 2
    for (let i = 1; i <= 2; i++) {
      const nextIndex = (centerIndex + i) % images.length
      preloadImage(nextIndex)
    }

    // Preload previous 1
    const prevIndex = (centerIndex - 1 + images.length) % images.length
    preloadImage(prevIndex)
  }, [images.length, preloadImage])

  // Preload all images in background (after initial adjacent ones)
  const preloadAllImages = useCallback(() => {
    if (allImagesPreloaded) return

    // Load all images with a small delay between each to avoid overwhelming the browser
    images.forEach((_, index) => {
      setTimeout(() => {
        preloadImage(index)
      }, index * 50) // 50ms delay between each image
    })

    setAllImagesPreloaded(true)
  }, [images, preloadImage, allImagesPreloaded])

  // Fetch images from Cloudinary API or set single image
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      preloadedImages.current = {} // Reset preloaded images
      setImageLoadStates({}) // Reset load states
      setAllImagesPreloaded(false)

      // Single image mode - just set the single image
      if (isSingleImageMode && singleImageUrl) {
        setImages([{
          url: singleImageUrl,
          name: 'Image',
          modified: new Date().toISOString()
        }])
        setCurrentIndex(0)
        setIsLoading(false)
        return
      }

      // Gallery mode - fetch all images
      const folderParam = galleryFolder ? `&folder=${encodeURIComponent(galleryFolder)}` : ''
      fetch(`/api/gallery/cloudinary?count=50&order=latest${folderParam}`)
        .then(res => res.json())
        .then(data => {
          if (data.images && data.images.length > 0) {
            setImages(data.images)
            setCurrentIndex(0)
            // Start preloading immediately after getting images
            setTimeout(() => {
              if (data.images.length > 0) {
                // Preload first image and adjacent ones
                for (let i = 0; i < Math.min(3, data.images.length); i++) {
                  const img = document.createElement('img')
                  const idx = i
                  img.onload = () => {
                    preloadedImages.current[idx] = img
                    setImageLoadStates(prev => ({ ...prev, [idx]: true }))
                  }
                  img.src = data.images[i].url
                }
              }
            }, 0)
          }
          setIsLoading(false)
        })
        .catch(err => {
          console.error('Failed to load gallery:', err)
          // Fallback to old Dropbox endpoint if Cloudinary fails
          fetch('/api/gallery?count=50&order=latest')
            .then(res => res.json())
            .then(data => {
              if (data.images && data.images.length > 0) {
                setImages(data.images)
                setCurrentIndex(0)
              }
              setIsLoading(false)
            })
            .catch(fallbackErr => {
              console.error('Fallback also failed:', fallbackErr)
              setIsLoading(false)
            })
        })
    }
  }, [isOpen, isSingleImageMode, singleImageUrl, galleryFolder])

  // Preload adjacent images when current index changes
  useEffect(() => {
    if (images.length > 0) {
      // Immediately preload current and adjacent images
      const indicesToPreload = [
        currentIndex,
        (currentIndex + 1) % images.length,
        (currentIndex + 2) % images.length,
        (currentIndex - 1 + images.length) % images.length
      ]

      indicesToPreload.forEach(idx => {
        if (!preloadedImages.current[idx] && images[idx]) {
          const img = document.createElement('img')
          img.onload = () => {
            preloadedImages.current[idx] = img
            setImageLoadStates(prev => ({ ...prev, [idx]: true }))
          }
          img.src = images[idx].url
        }
      })

      // Start preloading all images in background after a short delay
      const timer = setTimeout(() => {
        images.forEach((image, idx) => {
          if (!preloadedImages.current[idx]) {
            const img = document.createElement('img')
            img.onload = () => {
              preloadedImages.current[idx] = img
              setImageLoadStates(prev => ({ ...prev, [idx]: true }))
            }
            img.src = image.url
          }
        })
      }, 500) // Start background preload sooner

      return () => clearTimeout(timer)
    }
  }, [currentIndex, images])

  // Preload thumbnails for the gallery strip
  useEffect(() => {
    if (images.length > 0) {
      images.forEach((image, index) => {
        const img = document.createElement('img')
        img.src = image.thumbnail || image.url
        // Just let them load in background, no need to track
      })
    }
  }, [images])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default arrow key behavior (scrolling)
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case 'Escape':
          if (isFullscreen) {
            setIsFullscreen(false)
          } else {
            onClose()
          }
          break
        case 'ArrowLeft':
          e.preventDefault()
          setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
          break
        case 'ArrowRight':
          e.preventDefault()
          setCurrentIndex(prev => (prev + 1) % images.length)
          break
        case 'f':
        case 'F':
          setIsFullscreen(prev => !prev)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isFullscreen, images.length, onClose])
  
  const navigatePrev = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
  }

  const navigateNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length)
  }
  
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
  }
  
  const handleImageLoad = (index: number) => {
    setImageLoadStates(prev => ({ ...prev, [index]: true }))

    // Preload next and previous images immediately when current loads
    if (images.length > 0) {
      const nextIndex = (index + 1) % images.length
      const prevIndex = (index - 1 + images.length) % images.length

      const indicesToPreload = [nextIndex, prevIndex]
      indicesToPreload.forEach(idx => {
        if (!preloadedImages.current[idx] && images[idx]) {
          const img = document.createElement('img')
          img.onload = () => {
            preloadedImages.current[idx] = img
            setImageLoadStates(prev => ({ ...prev, [idx]: true }))
          }
          img.src = images[idx].url
        }
      })
    }
  }
  
  // Touch/swipe handling
  const touchStartX = useRef<number | null>(null)
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigateNext()
      } else {
        navigatePrev()
      }
    }
    
    touchStartX.current = null
  }
  
  if (!isOpen) return null
  
  const currentImage = images[currentIndex]
  
  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isFullscreen) {
          onClose()
        }
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[10002] p-3 bg-black/80 backdrop-blur-sm rounded-full text-white hover:text-accent-orange hover:bg-black transition-all duration-300 group shadow-lg"
        aria-label={String(t('gallery.close'))}
      >
        <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Fullscreen toggle - hide in single image mode */}
      {!isSingleImageMode && (
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="fixed top-4 right-20 z-[10002] p-3 bg-black/80 backdrop-blur-sm rounded-full text-white hover:text-accent-orange hover:bg-black transition-all duration-300 group shadow-lg"
          aria-label={String(t('gallery.fullscreen'))}
        >
          <Maximize2 className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}
      
      {/* Main container */}
      <div className={`h-full flex flex-col ${isFullscreen ? 'p-0' : 'p-4 md:p-8'}`}>
        
        {/* Image viewer */}
        <div 
          className="flex-1 relative flex items-center justify-center min-h-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-accent-orange animate-spin" />
              <p className="text-white/60">{String(t('gallery.loading'))}</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center">
              <p className="text-white/60">{String(t('gallery.noImages'))}</p>
            </div>
          ) : (
            <>
              {/* Navigation arrows - hide in single image mode */}
              {!isSingleImageMode && images.length > 1 && (
                <>
                  <button
                    onClick={navigatePrev}
                    className={`absolute left-4 z-[10000] p-3 rounded-full transition-all duration-300 group ${
                      isFullscreen
                        ? 'bg-black/70 text-white hover:bg-accent-orange/30'
                        : 'bg-black/50 backdrop-blur-sm text-white/70 hover:text-white hover:bg-accent-orange/20'
                    }`}
                    aria-label={String(t('gallery.previous'))}
                  >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
                  </button>

                  <button
                    onClick={navigateNext}
                    className={`absolute right-4 z-[10000] p-3 rounded-full transition-all duration-300 group ${
                      isFullscreen
                        ? 'bg-black/70 text-white hover:bg-accent-orange/30'
                        : 'bg-black/50 backdrop-blur-sm text-white/70 hover:text-white hover:bg-accent-orange/20'
                    }`}
                    aria-label={String(t('gallery.next'))}
                  >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </>
              )}
              
              {/* Main image */}
              {currentImage && (
                <div
                  className={`relative w-full h-full flex items-center justify-center ${
                    isSingleImageMode ? '' : isFullscreen ? 'cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => !isSingleImageMode && setIsFullscreen(!isFullscreen)}
                >
                  <div className={`relative ${isFullscreen ? 'w-full h-full' : 'w-full max-w-[90vw] h-[70vh]'}`}>
                    {/* Always show spinner while loading */}
                    {!imageLoadStates[currentIndex] && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20">
                        <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
                          <Loader2 className="w-10 h-10 text-accent-orange animate-spin" />
                        </div>
                      </div>
                    )}
                    {/* Render multiple images to avoid flickering */}
                    {images.map((image, index) => {
                      // Only render current and adjacent images
                      const isVisible = index === currentIndex
                      const isAdjacent = Math.abs(index - currentIndex) === 1 ||
                                        (currentIndex === 0 && index === images.length - 1) ||
                                        (currentIndex === images.length - 1 && index === 0)

                      if (!isVisible && !isAdjacent) return null

                      return (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-opacity ${
                            isVisible ? 'opacity-100 z-10' : 'opacity-0 z-0'
                          }`}
                          style={{ transitionDuration: '300ms' }}
                        >
                          <Image
                            src={image.url}
                            alt={image.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 90vw"
                            priority={isVisible}
                            quality={90}
                            onLoad={() => {
                              if (!imageLoadStates[index]) {
                                handleImageLoad(index)
                              }
                            }}
                            onError={() => {
                              console.error(`Failed to load image ${index}: ${image.url}`)
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>

                  {/* Image counter - hide in single image mode */}
                  {!isSingleImageMode && !isFullscreen && images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white/70 text-sm">
                      {currentIndex + 1} / {images.length}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Thumbnails - hide in single image mode */}
        {!isSingleImageMode && !isFullscreen && !isLoading && images.length > 1 && (
          <div className="mt-4 pb-4">
            <div
              className="flex gap-2 overflow-x-auto py-2 px-4 max-w-full"
              style={{
                scrollbarWidth: 'thin',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}
              ref={(el) => {
                // Auto-scroll to current thumbnail when it changes
                if (el && currentIndex >= 0) {
                  const button = el.children[currentIndex] as HTMLElement
                  if (button) {
                    button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
                  }
                }
              }}>
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                index === currentIndex
                                  ? 'border-accent-orange scale-110 shadow-lg shadow-accent-orange/30'
                                  : 'border-white/20 hover:border-accent-orange/50 hover:scale-105'
                              }`}
                >
                  <Image
                    src={image.thumbnail || image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                    quality={60}
                    loading="eager"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        
        /* Custom scrollbar for thumbnails */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        
        .scrollbar-track-black\/20::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        
        .scrollbar-thumb-accent-orange\/30::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 0, 0.3);
          border-radius: 3px;
        }
        
        .scrollbar-thumb-accent-orange\/30::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 107, 0, 0.5);
        }
      `}</style>
    </div>
  )
}