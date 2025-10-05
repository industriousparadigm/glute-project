'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface GalleryContextType {
  isGalleryOpen: boolean
  setIsGalleryOpen: (open: boolean) => void
  singleImageUrl: string | null
  openSingleImage: (url: string) => void
  closeGallery: () => void
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined)

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [singleImageUrl, setSingleImageUrl] = useState<string | null>(null)

  const openSingleImage = (url: string) => {
    setSingleImageUrl(url)
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
    setSingleImageUrl(null)
  }

  return (
    <GalleryContext.Provider value={{
      isGalleryOpen,
      setIsGalleryOpen,
      singleImageUrl,
      openSingleImage,
      closeGallery
    }}>
      {children}
    </GalleryContext.Provider>
  )
}

export function useGallery() {
  const context = useContext(GalleryContext)
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider')
  }
  return context
}