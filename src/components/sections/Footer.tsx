'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslations } from '@/lib/i18n/hooks'

export function Footer() {
  const { t, locale } = useTranslations()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: string) => {
    // Replace the current locale with the new one in the pathname
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-orange-500">GLUTE PROJECT</h2>
          <p className="text-gray-400 mt-2">O TEU TREINO O TEU TEMPO</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.contact')}</h3>
            <div className="space-y-2">
              <p>
                <a href="tel:+351912345678" className="hover:text-orange-500 transition-colors">
                  {t('footer.phone')}
                </a>
              </p>
              <p>
                <a href="mailto:info@gluteproject.com" className="hover:text-orange-500 transition-colors">
                  {t('footer.email')}
                </a>
              </p>
              <p>{t('footer.address')}</p>
              <p>{t('footer.city')}</p>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.hours')}</h3>
            <p className="text-gray-300">{t('footer.hours_value')}</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.social')}</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/gluteproject"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/gluteproject"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Language Switcher & Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.language')}</h3>
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => switchLanguage('pt')}
                className={`px-4 py-2 rounded transition-colors ${
                  locale === 'pt' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-4 py-2 rounded transition-colors ${
                  locale === 'en' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                EN
              </button>
            </div>

            <h3 className="font-bold text-lg mb-4">{t('footer.links')}</h3>
            <div className="space-y-2">
              <p>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  {t('footer.privacy')}
                </a>
              </p>
              <p>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  {t('footer.terms')}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}