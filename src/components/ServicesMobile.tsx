'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from '@/lib/i18n/hooks'
import { MessageCircle, ChevronDown, ChevronUp, Calendar, ExternalLink } from 'lucide-react'
import { ReactElement } from 'react'
import { useGallery } from '@/components/GalleryContext'

interface Service {
  id: string
  nameKey: string
  descriptionKey: string
  featured?: boolean
  icon: ReactElement
}

const services: Service[] = [
  {
    id: 'pt-express',
    nameKey: 'ptExpress.name',
    descriptionKey: 'ptExpress.description',
    featured: true,
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="22" width="32" height="4" fill="currentColor"/>
        <circle cx="6" cy="24" r="6" fill="currentColor"/>
        <circle cx="42" cy="24" r="6" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'small-group',
    nameKey: 'smallGroup.name',
    descriptionKey: 'smallGroup.description',
    featured: true,
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="12" r="4" fill="currentColor"/>
        <circle cx="12" cy="20" r="4" fill="currentColor"/>
        <circle cx="36" cy="20" r="4" fill="currentColor"/>
        <rect x="20" y="28" width="8" height="12" fill="currentColor"/>
        <rect x="8" y="28" width="8" height="12" fill="currentColor"/>
        <rect x="32" y="28" width="8" height="12" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'pt-duo',
    nameKey: 'ptDuo.name',
    descriptionKey: 'ptDuo.description',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="22" width="32" height="4" fill="currentColor"/>
        <circle cx="4" cy="24" r="4" fill="currentColor"/>
        <circle cx="12" cy="24" r="4" fill="currentColor"/>
        <circle cx="36" cy="24" r="4" fill="currentColor"/>
        <circle cx="44" cy="24" r="4" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'session-plan',
    nameKey: 'sessionPlan.name',
    descriptionKey: 'sessionPlan.description',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="8" width="24" height="32" stroke="currentColor" strokeWidth="2"/>
        <line x1="18" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="2"/>
        <line x1="18" y1="24" x2="30" y2="24" stroke="currentColor" strokeWidth="2"/>
        <line x1="18" y1="32" x2="30" y2="32" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    id: 'team-building',
    nameKey: 'teamBuilding.name',
    descriptionKey: 'teamBuilding.description',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="10" r="3" fill="currentColor"/>
        <circle cx="14" cy="14" r="3" fill="currentColor"/>
        <circle cx="34" cy="14" r="3" fill="currentColor"/>
        <path d="M19 20H29V30H19V20Z" fill="currentColor"/>
        <path d="M9 24H19V34H9V24Z" fill="currentColor"/>
        <path d="M29 24H39V34H29V24Z" fill="currentColor"/>
        <path d="M14 34L14 40M24 30V40M34 34V40" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    id: 'pt-senior',
    nameKey: 'ptSenior.name',
    descriptionKey: 'ptSenior.description',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="12" r="6" fill="currentColor"/>
        <path d="M16 24H32V36H16V24Z" fill="currentColor"/>
        <rect x="32" y="20" width="2" height="16" fill="currentColor"/>
        <rect x="34" y="18" width="6" height="2" fill="currentColor"/>
        <rect x="22" y="36" width="4" height="8" fill="currentColor"/>
        <rect x="20" y="44" width="8" height="2" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'nutrition',
    nameKey: 'nutrition.name',
    descriptionKey: 'nutrition.description',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8C24 8 16 12 16 24C16 30 19 36 24 36C29 36 32 30 32 24C32 12 24 8 24 8Z" stroke="currentColor" strokeWidth="2"/>
        <line x1="24" y1="36" x2="24" y2="40" stroke="currentColor" strokeWidth="2"/>
        <line x1="20" y1="40" x2="28" y2="40" stroke="currentColor" strokeWidth="2"/>
        <circle cx="20" cy="20" r="2" fill="currentColor"/>
        <circle cx="28" cy="22" r="2" fill="currentColor"/>
      </svg>
    )
  }
]

export function ServicesMobile() {
  const { t, locale } = useTranslations()
  const { openSingleImage } = useGallery()
  const [showAll, setShowAll] = useState(false)

  const scheduleImageUrl = 'https://res.cloudinary.com/thunder-fusion/image/upload/v1759663400/glute/schedules/ypkimtutnk3vcyfpzxtj.png'
  const instagramScheduleUrl = 'https://www.instagram.com/stories/highlights/17868853560118259/?hl=en'

  const visibleServices = showAll ? services : services.slice(0, 3)

  const handleWhatsAppClick = (type: 'trainer' | 'nutritionist' = 'trainer') => {
    const phoneNumber = '351937370304'
    const message = locale === 'pt'
      ? type === 'trainer'
        ? 'Olá! Gostaria de saber mais sobre os vossos serviços de treino.'
        : 'Olá! Gostaria de saber mais sobre acompanhamento nutricional.'
      : type === 'trainer'
        ? 'Hi! I would like to know more about your training services.'
        : 'Hi! I would like to know more about nutrition services.'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="md:hidden">
      {/* Mobile Grid - Single column */}
      <motion.div
        className="grid grid-cols-1 gap-4 mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <AnimatePresence mode="popLayout">
          {visibleServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="service-card group p-4 h-full flex flex-col"
            >
              {/* POPULAR Badge */}
              {service.featured && (
                <div className="absolute top-2 right-2">
                  <div className="bg-accent-orange px-2 py-1 rounded-full">
                    <span className="text-white text-[10px] font-body font-bold uppercase tracking-wider">
                      {String(t('services.featured'))}
                    </span>
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className="text-accent-orange/60 group-hover:text-accent-orange transition-all duration-300 mb-3">
                {service.icon}
              </div>

              {/* Service Name */}
              <h3 className="font-display text-base font-normal uppercase text-dark-primary mb-2
                           group-hover:text-accent-orange transition-colors duration-300">
                {String(t(`services.${service.nameKey}`))}
              </h3>

              {/* Description - always show full description */}
              <p className="text-dark-secondary text-sm font-body leading-relaxed mb-3 flex-grow">
                {String(t(`services.${service.descriptionKey}`))}
              </p>

              {/* Schedule buttons - only for small-group */}
              {service.id === 'small-group' && (
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => openSingleImage(scheduleImageUrl)}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-2
                             border border-accent-orange/30 rounded-lg text-accent-orange
                             active:bg-accent-orange/10 transition-all duration-300 text-xs font-display uppercase"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>{String(t('services.sampleSchedule'))}</span>
                  </button>
                  <a
                    href={instagramScheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-2
                             border border-accent-orange/30 rounded-lg text-accent-orange
                             active:bg-accent-orange/10 transition-all duration-300 text-xs font-display uppercase"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{String(t('services.liveSchedule'))}</span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More/Less Button */}
      {!showAll && (
        <motion.button
          onClick={() => setShowAll(true)}
          className="w-full py-3 mb-6 border border-accent-orange/30 rounded-lg
                   flex items-center justify-center gap-2
                   text-accent-orange font-display uppercase text-sm
                   transition-all duration-300 active:scale-95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span>{String(t('services.viewAllServices'))}</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      )}

      {showAll && (
        <motion.button
          onClick={() => setShowAll(false)}
          className="w-full py-3 mb-6 border border-accent-orange/30 rounded-lg
                   flex items-center justify-center gap-2
                   text-accent-orange font-display uppercase text-sm
                   transition-all duration-300 active:scale-95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span>{String(t('services.showLess'))}</span>
          <ChevronUp className="w-4 h-4" />
        </motion.button>
      )}

      {/* WhatsApp CTA */}
      <div className="text-center">
        <p className="text-accent-orange text-base font-display uppercase tracking-wider mb-3">
          {String(t('services.pricingNotice.description'))}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleWhatsAppClick('trainer')}
            className="cta-primary-light group relative inline-flex items-center justify-center gap-2 px-6 py-3
                     text-white font-display text-base uppercase tracking-wider z-10 w-full"
          >
            <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
            <span className="relative z-10">{String(t('services.ctaButton'))}</span>
          </button>

          <button
            onClick={() => handleWhatsAppClick('nutritionist')}
            className="cta-primary-light group relative inline-flex items-center justify-center gap-2 px-6 py-3
                     text-white font-display text-base uppercase tracking-wider z-10 w-full"
          >
            <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
            <span className="relative z-10">{String(t('services.ctaNutrition'))}</span>
          </button>
        </div>
      </div>
    </div>
  )
}