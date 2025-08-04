'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const LANGUAGE_PREFERENCE_KEY = 'glute-project-language'

export function saveLanguagePreference(locale: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_PREFERENCE_KEY, locale)
  }
}

export function getLanguagePreference(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LANGUAGE_PREFERENCE_KEY)
  }
  return null
}

export function useLanguagePreference() {
  const pathname = usePathname()
  const router = useRouter()
  
  useEffect(() => {
    // Extract current locale from pathname
    const currentLocale = pathname.split('/')[1]
    
    // Save the current language preference
    if (currentLocale === 'pt' || currentLocale === 'en') {
      saveLanguagePreference(currentLocale)
    }
  }, [pathname])
  
  return {
    saveLanguagePreference,
    getLanguagePreference
  }
}