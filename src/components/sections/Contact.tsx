'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n/hooks'
import { MapPin, Phone, Clock, Car, Bus } from 'lucide-react'
import Link from 'next/link'

export function Contact() {
  const { t } = useTranslations()

  return (
    <section className="min-h-screen py-16 md:py-24 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-accent-orange font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase mb-4 tracking-tight">
            {t('contact.title')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left side - Contact Info & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Quick Actions */}
            <div className="space-y-4">
              <Link
                href="https://wa.me/351910000000"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div
                  className="px-6 py-4 bg-gradient-to-r from-accent-orange to-accent-orange-light text-white font-bold uppercase tracking-wider rounded flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-accent-orange/25 transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  {t('contact.whatsapp')}
                </motion.div>
              </Link>

              <Link
                href="tel:+351910000000"
                className="block"
              >
                <motion.div
                  className="px-6 py-4 bg-gradient-to-r from-accent-orange to-accent-orange-light text-white font-bold uppercase tracking-wider rounded flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-accent-orange/25 transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone size={20} />
                  {t('contact.call')}
                </motion.div>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Hours */}
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-accent-orange font-bold uppercase tracking-wider mb-4">
                  {t('location.hours.title')}
                </h3>
                <div className="space-y-2 text-white/80">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-accent-lime" />
                    <span>{t('location.hours.weekdays')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-accent-lime" />
                    <span>{t('location.hours.saturday')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-accent-lime" />
                    <span>{t('location.hours.sunday')}</span>
                  </div>
                  <p className="text-sm text-white/60 mt-3 italic">
                    * {t('location.hours.members')}
                  </p>
                </div>
              </div>

              {/* Address & Transport */}
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-accent-orange font-bold uppercase tracking-wider mb-4">
                  {t('location.address')}
                </h3>
                <div className="space-y-3 text-white/80">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-accent-lime mt-1 flex-shrink-0" />
                    <div>
                      <p>Rua Dr. Afonso Cordeiro, 109</p>
                      <p>4450-001 Matosinhos, Portugal</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 space-y-2">
                    <p className="text-accent-lime font-semibold">{t('location.transport.title')}</p>
                    <div className="flex items-center gap-2">
                      <Bus size={14} className="text-white/60" />
                      <span className="text-sm">{t('location.transport.metro')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car size={14} className="text-white/60" />
                      <span className="text-sm">{t('location.transport.car')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-[400px] lg:h-full min-h-[500px] rounded-lg overflow-hidden border border-white/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3002.0944739810894!2d-8.693916923577636!3d41.19834730719889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd246f5d2c1dbf6f%3A0x9ce95e89e1df926e!2sR.%20Dr.%20Afonso%20Cordeiro%20109%2C%204450-001%20Matosinhos!5e0!3m2!1spt-PT!2spt!4v1735851967557!5m2!1spt-PT!2spt&style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Glute Project Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}