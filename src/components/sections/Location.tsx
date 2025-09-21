'use client'

import React from 'react'
import { useTranslations } from '@/lib/i18n/hooks'

export function Location() {
  const { t } = useTranslations()
  
  // Glute Project coordinates - Rua Dr. Afonso Cordeiro, 109, Matosinhos
  const coordinates = {
    lat: 41.1879,
    lng: -8.6968
  }
  
  // Google Maps Embed API URL - using address search
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.2477!2d-8.6989!3d41.1879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua+Dr.+Afonso+Cordeiro%2C+109%2C+4450-001+Matosinhos!5e0!3m2!1spt!2spt!4v1234567890`
  
  // Google Maps directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
  
  return (
    <section className="py-10 md:py-12 border-t border-zinc-800">
      <div className="container">
        <h2 className="text-accent-orange font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-center mb-8 tracking-tight">
          {String(t('location.title'))}
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Information - appears first on mobile */}
          <div className="space-y-4 order-2 lg:order-1">
            {/* Address Card */}
            <div className="bg-black p-5">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-accent-orange"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-accent-orange mb-1">Morada</h3>
                  <p className="text-text-gray text-sm">{String(t('location.address'))}</p>
                  <p className="text-text-gray text-sm">{String(t('location.city'))}</p>
                </div>
              </div>
            </div>
            
            {/* Parking & Transport combined */}
            <div className="bg-black p-5">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-accent-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent-orange mb-1">Estacionamento</h3>
                    <p className="text-text-gray text-sm">{String(t('location.parking'))}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 pt-2">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-accent-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent-orange mb-1">{String(t('location.publicTransport'))}</h3>
                    <p className="text-text-gray text-sm">{String(t('location.metro'))}</p>
                    <p className="text-text-gray text-sm">{String(t('location.bus'))}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Directions Button */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-accent-orange text-white font-bold text-center hover:bg-accent-orange/90 transition-colors"
            >
              {String(t('location.directions'))}
            </a>
          </div>
          
          {/* Map */}
          <div className="h-48 md:h-64 overflow-hidden order-1 lg:order-2">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Glute Project location map"
              className="w-full h-full opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  )
}