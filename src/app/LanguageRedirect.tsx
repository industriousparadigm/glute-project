'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getLanguagePreference } from '@/lib/i18n/useLanguagePreference'
import { defaultLocale } from '@/lib/i18n'

export function LanguageRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    const savedLocale = getLanguagePreference()
    const locale = savedLocale || defaultLocale
    router.replace(`/${locale}`)
  }, [router])
  
  return null
}