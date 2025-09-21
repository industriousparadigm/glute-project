'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getCurrentLocale, getTranslations } from '../i18n'

type TranslationFunction = (key: string) => string | string[] | unknown

export function useTranslations() {
  const pathname = usePathname()
  const locale = getCurrentLocale(pathname)
  const [translations, setTranslations] = useState<Record<string, unknown>>({})

  useEffect(() => {
    getTranslations(locale).then(setTranslations)
  }, [locale])

  const t: TranslationFunction = (key: string) => {
    const keys = key.split('.')
    let value: unknown = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key // Return the key if translation not found
      }
    }

    // Return the value as is (string, array, object, etc.)
    if (typeof value === 'string') return value
    if (Array.isArray(value)) return value
    if (typeof value === 'object') return value
    return key
  }

  return { t, locale }
}