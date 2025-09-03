'use client'

import { motion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n/hooks'
import { MessageCircle } from 'lucide-react'
import { ReactElement } from 'react'

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
    featured: true,
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
  }
]

export function Services() {
  const { t, locale } = useTranslations()
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const handleWhatsAppClick = () => {
    const phoneNumber = '351912345678' // Replace with actual number
    const message = locale === 'pt' 
      ? 'Olá! Gostaria de saber mais sobre os vossos serviços de treino.'
      : 'Hi! I would like to know more about your training services.'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="min-h-screen py-16 md:py-24 relative overflow-hidden">
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
          <h2 className="font-display text-5xl md:text-7xl font-normal uppercase text-accent-orange mb-2 tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-text-gray font-body text-lg md:text-xl uppercase tracking-wider">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="service-card group relative p-6 md:p-8 overflow-hidden rounded-lg"
            >
              {/* Featured Badge */}
              {service.featured && (
                <div className="absolute top-2 right-2 bg-accent-orange/20 px-2 py-1">
                  <span className="text-accent-orange text-xs font-body font-bold uppercase tracking-wider">
                    {t('services.featured')}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="text-white/40 group-hover:text-accent-orange transition-all duration-300 mb-4 transform group-hover:scale-110">
                {service.icon}
              </div>

              {/* Service Name */}
              <h3 className="font-display text-2xl md:text-3xl font-normal uppercase text-white mb-2 
                           group-hover:text-accent-orange transition-colors duration-300">
                {t(`services.${service.nameKey}` as any)}
              </h3>

              {/* Description */}
              <p className="text-text-gray text-sm md:text-base font-body mb-4">
                {t(`services.${service.descriptionKey}` as any)}
              </p>

              {/* Contact for pricing */}
              <p className="text-accent-orange text-sm font-body font-semibold uppercase tracking-wider">
                {t('services.contactForPricing')}
              </p>

              {/* Glow effect is now handled by the service-card class */}
            </motion.div>
          ))}
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={handleWhatsAppClick}
            className="cta-primary group relative inline-flex items-center gap-3 px-8 py-4 
                     text-white font-display text-lg md:text-xl uppercase tracking-wider z-10"
          >
            <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
            <span className="relative z-10">{t('services.ctaButton')}</span>
          </button>
          <p className="mt-4 text-text-gray/60 text-sm font-body">
            {t('services.responseTime')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}