'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslations } from '@/lib/i18n/hooks'
import { Phone, Mail, Clock, Globe, Instagram, Facebook } from 'lucide-react'

export function Footer() {
  const { t, locale } = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const [showLanguages, setShowLanguages] = useState(false)

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
    setShowLanguages(false)
  }

  return (
    <footer className="bg-brand-black border-t border-gray-800">
      <div className="container py-8">
        <div className="flex flex-wrap justify-between items-center gap-6">
          {/* Contact */}
          <a 
            href="tel:+351912345678" 
            className="flex items-center gap-2 text-text-gray hover:text-accent-orange transition-colors"
          >
            <Phone size={20} />
            <span className="text-sm font-medium">+351 912 345 678</span>
          </a>

          {/* Email */}
          <a 
            href="mailto:info@gluteproject.com" 
            className="flex items-center gap-2 text-text-gray hover:text-accent-orange transition-colors"
          >
            <Mail size={20} />
            <span className="text-sm font-medium">info@gluteproject.com</span>
          </a>

          {/* Hours */}
          <div className="flex items-center gap-2 text-text-gray">
            <Clock size={20} />
            <span className="text-sm font-medium">24/7</span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/glute_project"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-text-gray hover:text-accent-orange transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://facebook.com/gluteproject"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-text-gray hover:text-accent-orange transition-colors"
            >
              <Facebook size={20} />
            </a>
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLanguages(!showLanguages)}
              className="flex items-center gap-2 text-text-gray hover:text-accent-orange transition-colors"
              aria-label="Select language"
            >
              <Globe size={20} />
              <span className="text-sm font-medium uppercase">{locale}</span>
            </button>
            
            {showLanguages && (
              <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={() => switchLanguage('pt')}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-colors ${
                    locale === 'pt' ? 'text-accent-orange' : 'text-white'
                  }`}
                >
                  Português
                </button>
                <button
                  onClick={() => switchLanguage('en')}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-colors ${
                    locale === 'en' ? 'text-accent-orange' : 'text-white'
                  }`}
                >
                  English
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-600 text-xs">© 2024 Glute Project. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}