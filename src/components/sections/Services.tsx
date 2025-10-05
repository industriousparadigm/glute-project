'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n/hooks'
import { MessageCircle, Calendar } from 'lucide-react'
import { ReactElement } from 'react'
import { useGallery } from '@/components/GalleryContext'

const ServicesMobile = dynamic(() => import('@/components/ServicesMobile').then(mod => mod.ServicesMobile), {
  ssr: false
})

interface Service {
  id: string
  nameKey: string
  descriptionKey: string
  featured?: boolean
  isNew?: boolean
  icon: ReactElement
}

const services: Service[] = [
  {
    id: 'pt-express',
    nameKey: 'ptExpress.name',
    descriptionKey: 'ptExpress.description',
    featured: true,
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="22" width="32" height="4" fill="currentColor"/>
        <circle cx="6" cy="24" r="6" fill="currentColor"/>
        <circle cx="42" cy="24" r="6" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'pt-duo',
    nameKey: 'ptDuo.name',
    descriptionKey: 'ptDuo.description',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="8" width="24" height="32" stroke="currentColor" strokeWidth="2"/>
        <line x1="18" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="2"/>
        <line x1="18" y1="24" x2="30" y2="24" stroke="currentColor" strokeWidth="2"/>
        <line x1="18" y1="32" x2="30" y2="32" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    id: 'small-group',
    nameKey: 'smallGroup.name',
    descriptionKey: 'smallGroup.description',
    featured: true,
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    id: 'team-building',
    nameKey: 'teamBuilding.name',
    descriptionKey: 'teamBuilding.description',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8C24 8 16 12 16 24C16 30 19 36 24 36C29 36 32 30 32 24C32 12 24 8 24 8Z" stroke="currentColor" strokeWidth="2"/>
        <line x1="24" y1="36" x2="24" y2="40" stroke="currentColor" strokeWidth="2"/>
        <line x1="20" y1="40" x2="28" y2="40" stroke="currentColor" strokeWidth="2"/>
        <circle cx="20" cy="20" r="2" fill="currentColor"/>
        <circle cx="28" cy="22" r="2" fill="currentColor"/>
      </svg>
    )
  }
]

export function Services() {
  const { t, locale } = useTranslations()
  const { openSingleImage } = useGallery()

  const scheduleImageUrl = 'https://res.cloudinary.com/thunder-fusion/image/upload/v1759663400/glute/schedules/ypkimtutnk3vcyfpzxtj.png'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12
      }
    }
  }

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
    <section className="min-h-screen py-16 md:py-24 relative overflow-hidden bg-gradient-services">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase text-accent-orange mb-2 tracking-normal">
            {String(t('services.title'))}
          </h2>
          <p className="text-dark-secondary font-body text-lg md:text-xl uppercase tracking-wider">
            {String(t('services.subtitle'))}
          </p>
        </motion.div>

        {/* Mobile Services */}
        <ServicesMobile />

        {/* Desktop Services Grid - 4-3 layout (2 rows) */}
        <motion.div
          className="hidden md:block max-w-7xl mx-auto mb-8 space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Top row - 4 services */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {services.slice(0, 4).map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="service-card group p-6 md:p-8 h-full flex flex-col"
              >
                {/* POPULAR Badge - Only for PT Express and Small Group */}
                {service.featured && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-accent-orange px-3 py-1.5 rounded-full">
                      <span className="text-white text-xs font-body font-bold uppercase tracking-wider">
                        {String(t('services.featured'))}
                      </span>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="text-accent-orange/60 group-hover:text-accent-orange transition-all duration-300 mb-4 transform group-hover:scale-110">
                  {service.icon}
                </div>

                {/* Service Name */}
                <h3 className="font-display text-xl md:text-2xl font-normal uppercase text-dark-primary mb-3
                             group-hover:text-accent-orange transition-colors duration-300">
                  {String(t(`services.${service.nameKey}`))}
                </h3>

                {/* Description */}
                <p className="text-dark-secondary text-sm md:text-base font-body leading-relaxed mb-4 flex-grow">
                  {String(t(`services.${service.descriptionKey}`))}
                </p>

                {/* Schedule button - only for small-group */}
                {service.id === 'small-group' && (
                  <button
                    onClick={() => openSingleImage(scheduleImageUrl)}
                    className="mt-auto flex items-center justify-center gap-2 px-4 py-2
                             border border-accent-orange/30 rounded-lg text-accent-orange
                             hover:bg-accent-orange/10 transition-all duration-300 text-sm font-display uppercase"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{String(t('services.viewSchedule'))}</span>
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom row - 3 services, centered */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {services.slice(4, 7).map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="service-card group p-6 md:p-8 h-full"
              >
                {/* Icon */}
                <div className="text-accent-orange/60 group-hover:text-accent-orange transition-all duration-300 mb-4 transform group-hover:scale-110">
                  {service.icon}
                </div>

                {/* Service Name */}
                <h3 className="font-display text-xl md:text-2xl font-normal uppercase text-dark-primary mb-3
                             group-hover:text-accent-orange transition-colors duration-300">
                  {String(t(`services.${service.nameKey}`))}
                </h3>

                {/* Description */}
                <p className="text-dark-secondary text-sm md:text-base font-body leading-relaxed">
                  {String(t(`services.${service.descriptionKey}`))}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Desktop WhatsApp CTA with pricing notice */}
        <motion.div
          className="hidden md:block text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Simple pricing text */}
          <p className="text-accent-orange text-lg md:text-xl font-display uppercase tracking-wider mb-4">
            {String(t('services.pricingNotice.description'))}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => handleWhatsAppClick('trainer')}
              className="cta-primary-light group relative inline-flex items-center gap-3 px-8 py-4
                       text-white font-display text-lg md:text-xl uppercase tracking-wider z-10"
            >
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">{String(t('services.ctaButton'))}</span>
            </button>

            <button
              onClick={() => handleWhatsAppClick('nutritionist')}
              className="cta-primary-light group relative inline-flex items-center gap-3 px-8 py-4
                       text-white font-display text-lg md:text-xl uppercase tracking-wider z-10"
            >
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">{String(t('services.ctaNutrition'))}</span>
            </button>
          </div>

          <p className="mt-4 text-text-gray/60 text-sm font-body">
            {String(t('services.responseTime'))}
          </p>
        </motion.div>
      </div>
    </section>
  )
}