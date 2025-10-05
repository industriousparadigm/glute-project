'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n/hooks'

interface TeamMember {
  name: string
  role: 'trainer' | 'nutritionist'
  image: string
  skillsKey: string
}

const CLOUDINARY_BASE = 'https://res.cloudinary.com/thunder-fusion/image/upload/v1759665299/glute/team'

const teamMembers: TeamMember[] = [
  { name: 'Miguel Ferrer', role: 'trainer', image: `${CLOUDINARY_BASE}/miguel-ferrer.png`, skillsKey: 'miguel-ferrer' },
  { name: 'Francisco França', role: 'nutritionist', image: `${CLOUDINARY_BASE}/francisco-franca.png`, skillsKey: 'francisco-franca' },
  { name: 'Joana Martins', role: 'trainer', image: `${CLOUDINARY_BASE}/joana-martins.png`, skillsKey: 'joana-martins' },
  { name: 'Miguel Carvalho', role: 'trainer', image: `${CLOUDINARY_BASE}/miguel-carvalho.png`, skillsKey: 'miguel-carvalho' },
  { name: 'Renato Fonseca', role: 'trainer', image: `${CLOUDINARY_BASE}/renato-fonseca.png`, skillsKey: 'renato-fonseca' },
  { name: 'Sandro Moutinho', role: 'trainer', image: `${CLOUDINARY_BASE}/sandro-moutinho.png`, skillsKey: 'sandro-moutinho' },
  { name: 'Tiago Oliveira', role: 'trainer', image: `${CLOUDINARY_BASE}/tiago-oliveira.png`, skillsKey: 'tiago-oliveira' },
]

export function MeetTheTeam() {
  const { t, locale } = useTranslations()
  const [activeMember, setActiveMember] = useState<string | null>(null)

  const handleMemberClick = (name: string) => {
    if (window.innerWidth <= 768) {
      setActiveMember(activeMember === name ? null : name)
    }
  }

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
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase text-accent-orange mb-2 tracking-normal">
            {String(t('team.title'))}
          </h2>
          <p className="text-text-gray font-body text-lg md:text-xl uppercase tracking-wider">
            {String(t('team.subtitle'))}
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              className="team-card group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer md:cursor-default"
              onClick={() => handleMemberClick(member.name)}
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
                  {member.role === 'nutritionist' ? String(t('team.roles.nutritionist')) : String(t('team.roles.trainer'))}
                </p>
              </div>

              {/* Skills Overlay - appears on hover (desktop) or tap (mobile) */}
              <div className={`absolute inset-0 flex flex-col justify-center items-center p-4 bg-brand-black/90 md:bg-brand-black/75 transition-all duration-500 pointer-events-none ${
                activeMember === member.name ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
              }`}>
                <div className="space-y-3">
                  <h4 className="font-display text-xl md:text-2xl uppercase text-accent-orange text-center mb-4">
                    {locale === 'pt' ? 'Especialidades' : 'Specialties'}
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {(() => {
                      const skills = t(`team.members.${member.skillsKey}.skills`)
                      const skillsArray = Array.isArray(skills) ? skills : []
                      return skillsArray.map((skill: string, skillIndex: number) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-gradient-to-r from-accent-orange/20 to-accent-orange/10 border border-accent-orange/30 text-white text-xs md:text-sm font-body uppercase rounded-full"
                        >
                          {skill}
                        </span>
                      ))
                    })()}
                  </div>
                </div>
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