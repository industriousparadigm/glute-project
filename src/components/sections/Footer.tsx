'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslations } from '@/lib/i18n/hooks'
import { useLanguagePreference } from '@/lib/i18n/useLanguagePreference'
import { trackEvent } from '@/lib/analytics/track-event'
import { Phone, Mail, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'

export function Footer() {
  const { t, locale } = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const [showLanguages, setShowLanguages] = useState(false)
  const languageRef = useRef<HTMLDivElement>(null)
  const { saveLanguagePreference } = useLanguagePreference()

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    saveLanguagePreference(newLocale)
    trackEvent('language_switch', { from: locale, to: newLocale })
    router.push(newPath)
    setShowLanguages(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguages(false)
      }
    }

    if (showLanguages) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showLanguages])

  return (
    <footer className="bg-brand-black border-t border-gray-800">
      <div className="container py-8">
        <div className="flex flex-wrap justify-between items-center gap-6">
          {/* Contact */}
          <a 
            href="tel:+351937370304" 
            className="flex items-center gap-2 text-text-gray hover:text-accent-orange transition-colors"
          >
            <Phone size={20} />
            <span className="text-sm font-medium">+351 937 370 304</span>
          </a>

          {/* Email */}
          <a 
            href="mailto:geral@gluteproject.pt" 
            className="flex items-center gap-2 text-text-gray hover:text-accent-orange transition-colors"
          >
            <Mail size={20} />
            <span className="text-sm font-medium">geral@gluteproject.pt</span>
          </a>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/glute_project"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-text-gray hover:text-accent-orange transition-colors"
              onClick={() => trackEvent('instagram_click', { source: 'footer', language: locale })}
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://facebook.com/gluteproject"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-text-gray hover:text-accent-orange transition-colors"
              onClick={() => trackEvent('facebook_click', { source: 'footer', language: locale })}
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.youtube.com/@gluteproject"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-text-gray hover:text-accent-orange transition-colors"
              onClick={() => trackEvent('youtube_click', { source: 'footer', language: locale })}
            >
              <Youtube size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/glute-project/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-gray hover:text-accent-orange transition-colors"
              onClick={() => trackEvent('linkedin_click', { source: 'footer', language: locale })}
            >
              <Linkedin size={20} />
            </a>
          </div>

          {/* Language Switcher */}
          <div className="relative" ref={languageRef}>
            <button
              onClick={() => setShowLanguages(!showLanguages)}
              className="flex items-center gap-2 text-text-gray hover:text-accent-orange transition-colors"
              aria-label="Select language"
            >
              <span className="text-lg font-bold">{locale === 'pt' ? '🇵🇹 PT' : '🇬🇧 EN'}</span>
            </button>
            
            {showLanguages && (
              <div className="absolute bottom-full right-0 mb-2 bg-black shadow-lg overflow-hidden">
                <button
                  onClick={() => switchLanguage('pt')}
                  className={`block w-full px-4 py-2 text-left hover:bg-zinc-800 transition-colors whitespace-nowrap ${
                    locale === 'pt' ? 'text-accent-orange' : 'text-white'
                  }`}
                >
                  <span className="text-lg font-bold">🇵🇹 PT</span>
                </button>
                <button
                  onClick={() => switchLanguage('en')}
                  className={`block w-full px-4 py-2 text-left hover:bg-zinc-800 transition-colors whitespace-nowrap ${
                    locale === 'en' ? 'text-accent-orange' : 'text-white'
                  }`}
                >
                  <span className="text-lg font-bold">🇬🇧 EN</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-600 text-xs">{String(t('footer.rights'))}</p>
        </div>
      </div>
    </footer>
  )
}