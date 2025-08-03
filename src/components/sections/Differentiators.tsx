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
    <section id="differentiators" className="py-12 md:py-16">
      <div className="container">
        <motion.h2 
          className="text-accent-orange font-display text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase text-center mb-16 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('differentiators.title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, index) => {
            const IconComponent = item.icon
            const description = t(`differentiators.${item.key}.description`)
            const [part1, part2] = description.split(' · ')
            
            return (
              <motion.div 
                key={item.key} 
                className="bg-black p-8 rounded-xl group hover:bg-zinc-900 transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <IconComponent 
                    size={56} 
                    className="text-accent-orange mx-auto stroke-2"
                    aria-hidden={true}
                  />
                </div>
                <h3 className="text-accent-orange font-display text-xl font-bold uppercase mb-4 text-center tracking-wide">
                  {t(`differentiators.${item.key}.title`)}
                </h3>
                <div className="space-y-2">
                  <p className="text-white font-body text-sm font-semibold">{part1}</p>
                  {part2 && (
                    <p className="text-white/80 font-body text-xs">{part2}</p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}