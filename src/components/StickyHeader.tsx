'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from '@/lib/i18n/hooks'
import { Menu, X, Globe } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export function StickyHeader() {
  const { t, locale } = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.33 // Appears at 1/3 scroll instead of 80%
      setIsVisible(window.scrollY > heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const switchLanguage = (newLocale: 'pt' | 'en') => {
    const currentPath = pathname.replace(`/${locale}`, '')
    router.push(`/${newLocale}${currentPath}`)
  }

  const navigationLinks = [
    { href: '#studio', labelKey: 'nav.studio' },
    { href: '#services', labelKey: 'nav.services' },
    { href: '#team', labelKey: 'nav.team' },
    { href: '#testimonials', labelKey: 'nav.testimonials' },
    { href: '#lifestyle', labelKey: 'nav.lifestyle' },
    { href: '#contact', labelKey: 'nav.contact' }
  ]

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    // Small delay to allow menu animation before scroll
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="bg-brand-black/95 backdrop-blur-md border-b border-accent-orange/20">
            <div className="flex items-center justify-between px-4 py-3">
              <h1 className="text-accent-orange font-display text-xl uppercase tracking-tight">
                GLUTE PROJECT
              </h1>

              <div className="flex items-center gap-3">
                <Link
                  href="#contact"
                  onClick={() => handleNavClick('#contact')}
                  className="px-3 py-1.5 bg-accent-orange text-brand-black font-display uppercase text-xs
                           rounded transition-all duration-300 active:scale-95"
                >
                  {String(t('hero.book_visit'))}
                </Link>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-accent-orange transition-colors duration-200 hover:bg-accent-orange/10 rounded"
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Hamburger Menu Dropdown */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="border-t border-accent-orange/20 bg-brand-black/98"
                >
                  <div className="px-4 py-3 space-y-1">
                    {/* Navigation Links */}
                    {navigationLinks.map((link, index) => (
                      <motion.button
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleNavClick(link.href)}
                        className="block w-full text-left px-3 py-2 text-white font-display uppercase text-sm
                                 hover:text-accent-orange hover:bg-accent-orange/10 rounded transition-all duration-200"
                      >
                        {String(t(link.labelKey))}
                      </motion.button>
                    ))}

                    {/* Language Switcher */}
                    <div className="pt-2 mt-2 border-t border-accent-orange/20">
                      <div className="flex items-center gap-2 px-3 py-2">
                        <Globe size={16} className="text-accent-orange" />
                        <span className="text-white/60 text-xs uppercase font-display">
                          {String(t('nav.language'))}
                        </span>
                      </div>
                      <div className="flex gap-2 px-3">
                        <button
                          onClick={() => switchLanguage('pt')}
                          className={`px-3 py-1.5 text-xs font-display uppercase transition-all rounded ${
                            locale === 'pt'
                              ? 'bg-accent-orange text-brand-black'
                              : 'text-white/60 hover:text-accent-orange border border-accent-orange/30'
                          }`}
                        >
                          POR
                        </button>
                        <button
                          onClick={() => switchLanguage('en')}
                          className={`px-3 py-1.5 text-xs font-display uppercase transition-all rounded ${
                            locale === 'en'
                              ? 'bg-accent-orange text-brand-black'
                              : 'text-white/60 hover:text-accent-orange border border-accent-orange/30'
                          }`}
                        >
                          ENG
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}