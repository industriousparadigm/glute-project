'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
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
    <footer className="bg-[#0A0A0A] text-white">
      <div className="container py-12">
        {/* Logo/Title */}
        <div className="text-center mb-12">
          <h2 className="text-[#FF5E1B] font-display text-4xl font-bold uppercase tracking-wider">
            GLUTE PROJECT
          </h2>
          <p className="text-white/80 font-body mt-3">O TEU TREINO O TEU TEMPO</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid-12 mb-8">
          {/* Contact Info */}
          <div className="col-span-3">
            <h3 className="font-display font-bold text-lg uppercase mb-4 text-[#FF5E1B]">
              {t('footer.contact')}
            </h3>
            <div className="space-y-2">
              <p>
                <a href="tel:+351912345678" className="text-white/90 hover:text-[#FF5E1B] transition-colors">
                  {t('footer.phone')}
                </a>
              </p>
              <p>
                <a href="mailto:info@gluteproject.com" className="text-white/90 hover:text-[#FF5E1B] transition-colors">
                  {t('footer.email')}
                </a>
              </p>
              <p className="text-white/90">{t('footer.address')}</p>
              <p className="text-white/90">{t('footer.city')}</p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="col-span-3">
            <h3 className="font-display font-bold text-lg uppercase mb-4 text-[#FF5E1B]">
              {t('footer.hours')}
            </h3>
            <p className="text-white/90">{t('footer.hours_value')}</p>
          </div>

          {/* Social Media */}
          <div className="col-span-3">
            <h3 className="font-display font-bold text-lg uppercase mb-4 text-[#FF5E1B]">
              {t('footer.social')}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/gluteproject"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-[#111111] rounded-full flex items-center justify-center hover:bg-[#FF5E1B] transition-colors"
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
                className="w-10 h-10 bg-[#111111] rounded-full flex items-center justify-center hover:bg-[#FF5E1B] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Language Switcher & Links */}
          <div className="col-span-3">
            <h3 className="font-display font-bold text-lg uppercase mb-4 text-[#FF5E1B]">
              {t('footer.language')}
            </h3>
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => switchLanguage('pt')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  locale === 'pt' 
                    ? 'bg-[#FF5E1B] text-white' 
                    : 'bg-[#111111] text-white/90 hover:bg-[#222222]'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  locale === 'en' 
                    ? 'bg-[#FF5E1B] text-white' 
                    : 'bg-[#111111] text-white/90 hover:bg-[#222222]'
                }`}
              >
                EN
              </button>
            </div>

            <h3 className="font-display font-bold text-lg uppercase mb-4 text-[#FF5E1B]">
              {t('footer.links')}
            </h3>
            <div className="space-y-2">
              <p>
                <Link href="/privacy" className="text-white/90 hover:text-[#FF5E1B] transition-colors">
                  {t('footer.privacy')}
                </Link>
              </p>
              <p>
                <Link href="/terms" className="text-white/90 hover:text-[#FF5E1B] transition-colors">
                  {t('footer.terms')}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#111111] pt-8 text-center">
          <p className="text-white/70 font-body">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}