'use client'

import React from 'react'
import { useTranslations } from '@/lib/i18n/hooks'

export function Location() {
  const { t } = useTranslations()
  
  // Glute Project coordinates (example - replace with actual)
  const coordinates = {
    lat: 41.1844,
    lng: -8.6963
  }
  
  const address = {
    street: 'Rua Example, 123',
    city: '4450-001 Matosinhos',
    country: 'Portugal'
  }
  
  // Google Maps Embed API URL
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.8!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDExJzAzLjgiTiA4wrA0MSc0Ni43Ilc!5e0!3m2!1sen!2spt!4v1234567890`
  
  // Google Maps directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
  
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{t('location.title')}</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Map */}
          <div className="map-container h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Glute Project location map"
              className="w-full h-full"
            />
          </div>
          
          {/* Information */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-orange-500"
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
                  <h3 className="font-semibold text-lg mb-2">Morada</h3>
                  <p className="text-gray-700">{t('location.address')}</p>
                  <p className="text-gray-700">{t('location.city')}</p>
                </div>
              </div>
            </div>
            
            {/* Parking Info */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-orange-500"
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
                  <h3 className="font-semibold text-lg mb-2">Estacionamento</h3>
                  <p className="text-gray-700">{t('location.parking')}</p>
                </div>
              </div>
            </div>
            
            {/* Public Transport */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-orange-500"
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
                  <h3 className="font-semibold text-lg mb-2">{t('location.publicTransport')}</h3>
                  <p className="text-gray-700 mb-1">{t('location.metro')}</p>
                  <p className="text-gray-700">{t('location.bus')}</p>
                </div>
              </div>
            </div>
            
            {/* Directions Button */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-orange-500 text-white font-bold text-center rounded-lg hover:bg-orange-600 transition-colors"
            >
              {t('location.directions')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}