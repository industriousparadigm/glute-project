'use client'

import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import { Users, Utensils, Clock, Heart } from 'lucide-react'

type DifferentiatorKey = 'trainer_guided' | 'nutrition' | 'access_24h' | 'community'

interface DifferentiatorItem {
  key: DifferentiatorKey
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>
}

export function Differentiators() {
  const { t } = useTranslations()

  const differentiators: DifferentiatorItem[] = [
    {
      key: 'trainer_guided',
      icon: Users,
    },
    {
      key: 'nutrition',
      icon: Utensils,
    },
    {
      key: 'access_24h',
      icon: Clock,
    },
    {
      key: 'community',
      icon: Heart,
    },
  ]

  return (
    <section id="differentiators" className="py-24 md:py-32 bg-white">
      <div className="container">
        <motion.h2 
          className="text-[#FF5E1B] font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('differentiators.title')}
        </motion.h2>
        
        <div className="grid-12">
          {differentiators.map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div 
                key={item.key} 
                className="col-span-3 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <IconComponent 
                    size={64} 
                    className="text-[#FF5E1B] mx-auto"
                    aria-hidden={true}
                  />
                </div>
                <h3 className="text-[#0A0A0A] font-display text-2xl font-bold uppercase mb-4">
                  {t(`differentiators.${item.key}.title`)}
                </h3>
                <p className="text-[#0A0A0A]/80 font-body text-base">
                  {t(`differentiators.${item.key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}