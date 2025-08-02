import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getCurrentLocale, getTranslations, Locale } from '../i18n'

type TranslationFunction = (key: string) => string

export function useTranslations() {
  const pathname = usePathname()
  const locale = getCurrentLocale(pathname)
  const [translations, setTranslations] = useState<any>({})

  useEffect(() => {
    getTranslations(locale).then(setTranslations)
  }, [locale])

  const t: TranslationFunction = (key: string) => {
    const keys = key.split('.')
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return the key if translation not found
      }
    }

    return typeof value === 'string' ? value : key
  }

  return { t, locale }
}