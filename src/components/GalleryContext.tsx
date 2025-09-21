'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface GalleryContextType {
  isGalleryOpen: boolean
  setIsGalleryOpen: (open: boolean) => void
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined)

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  return (
    <GalleryContext.Provider value={{ isGalleryOpen, setIsGalleryOpen }}>
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