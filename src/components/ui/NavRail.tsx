'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n/hooks'

interface NavItem {
  id: string
  label: string
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'studio', label: 'Our Studio' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'contact', label: 'Contact' }
]

export function NavRail() {
  const [activeSection, setActiveSection] = useState('hero')
  const [hoveredDot, setHoveredDot] = useState<string | null>(null)
  const { t } = useTranslations()

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      }))

      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      aria-label="Section navigation"
    >
      <ul className="flex flex-col gap-6">
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          const isHovered = hoveredDot === item.id

          return (
            <li key={item.id} className="relative">
              <button
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredDot(item.id)}
                onMouseLeave={() => setHoveredDot(null)}
                className="relative flex items-center justify-end group"
                aria-label={`Navigate to ${item.label}`}
              >
                {/* Label - shows on hover or when active */}
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ 
                    opacity: isHovered || isActive ? 1 : 0,
                    x: isHovered || isActive ? 0 : 10
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-6 whitespace-nowrap text-sm font-semibold text-accent-orange"
                >
                  {t(`navigation.${item.id}`)}
                </motion.span>

                {/* Dot - square for grittier look */}
                <motion.div
                  className="w-2 h-2 bg-accent-orange"
                  animate={{
                    scale: isActive ? 1.8 : 1,
                    backgroundColor: isActive ? '#FF5E1B' : isHovered ? '#FF7E3B' : '#FF5E1B',
                    rotate: isActive ? 45 : 0
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}