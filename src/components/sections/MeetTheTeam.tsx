'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n/hooks'
import { StaticImageData } from 'next/image'

// Import all team images
import miguelCarvalho from '../../../public/images/team/miguel-carvalho.png'
import franciscoFranca from '../../../public/images/team/francisco-franca.png'
import joanaMartins from '../../../public/images/team/joana-martins.png'
import miguelFerrer from '../../../public/images/team/miguel-ferrer.png'
import renatoFonseca from '../../../public/images/team/renato-fonseca.png'
import sandroMoutinho from '../../../public/images/team/sandro-moutinho.png'

interface TeamMember {
  name: string
  role: 'trainer' | 'nutritionist'
  image: StaticImageData
}

const teamMembers: TeamMember[] = [
  { name: 'Miguel Carvalho', role: 'trainer', image: miguelCarvalho },
  { name: 'Francisco França', role: 'nutritionist', image: franciscoFranca },
  { name: 'Joana Martins', role: 'trainer', image: joanaMartins },
  { name: 'Miguel Ferrer', role: 'trainer', image: miguelFerrer },
  { name: 'Renato Fonseca', role: 'trainer', image: renatoFonseca },
  { name: 'Sandro Moutinho', role: 'trainer', image: sandroMoutinho },
]

export function MeetTheTeam() {
  const { t } = useTranslations()

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
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
            {t('team.title')}
          </h2>
          <p className="text-text-gray font-body text-lg md:text-xl uppercase tracking-wider">
            {t('team.subtitle')}
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              className="team-card group relative aspect-[3/4] overflow-hidden rounded-lg"
            >
              {/* Image Container */}
              <div className="absolute inset-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-display text-2xl md:text-3xl font-normal uppercase text-white mb-1 tracking-wide group-hover:text-accent-orange transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="font-body text-accent-orange text-sm md:text-base font-medium uppercase tracking-wider">
                  {member.role === 'nutritionist' ? t('team.roles.nutritionist') : t('team.roles.trainer')}
                </p>
              </div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 border-2 border-accent-orange/30" />
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,94,27,0.2)]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}