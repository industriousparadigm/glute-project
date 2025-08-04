'use client'

import { useLanguagePreference } from '@/lib/i18n/useLanguagePreference'

export function LanguageTracker() {
  useLanguagePreference()
  return null
}