'use client'

import React, { useState } from 'react'
import { useTranslations } from '@/lib/i18n/hooks'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

interface FormStatus {
  loading: boolean
  success: boolean
  error: boolean
}

export function ContactForm() {
  const { t } = useTranslations()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    success: false,
    error: false
  })

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    let digits = value.replace(/\D/g, '')
    
    // If user cleared the field, start fresh
    if (!digits) return ''
    
    // Ensure it starts with 351
    if (!digits.startsWith('351')) {
      digits = '351' + digits
    }
    
    // Format as +351 XXX XXX XXX
    const phoneNumber = digits.slice(3)
    const formatted = phoneNumber.match(/(\d{0,3})(\d{0,3})(\d{0,3})/)
    
    if (formatted && phoneNumber) {
      const parts = [formatted[1], formatted[2], formatted[3]].filter(Boolean)
      return `+351 ${parts.join(' ')}`
    }
    
    return '+351 '
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhoneNumber(value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setStatus({ loading: true, success: false, error: false })
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) throw new Error('Failed to send')
      
      setStatus({ loading: false, success: true, error: false })
      setFormData({ name: '', email: '', phone: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }))
      }, 5000)
    } catch (error) {
      setStatus({ loading: false, success: false, error: true })
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, error: false }))
      }, 5000)
    }
  }

  return (
    <section className="py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{t('contact.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  {t('contact.form.name')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status.loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  {t('contact.form.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status.loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                  {t('contact.form.phone')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={status.loading}
                  placeholder="+351"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  disabled={status.loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.loading ? t('contact.form.submitting') : t('contact.form.submit')}
              </button>

              {status.success && (
                <p className="text-green-600 text-center font-semibold">
                  {t('contact.form.success')}
                </p>
              )}

              {status.error && (
                <p className="text-red-600 text-center font-semibold">
                  {t('contact.form.error')}
                </p>
              )}
            </form>

            {/* Contact options */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Outras formas de contacto</h3>
                
                <div className="space-y-4">
                  <a
                    href="https://wa.me/351912345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 bg-green-500 text-white font-bold text-center rounded-lg hover:bg-green-600 transition-colors"
                  >
                    {t('contact.whatsapp')}
                  </a>

                  <a
                    href="tel:+351912345678"
                    className="block w-full py-4 bg-blue-500 text-white font-bold text-center rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {t('contact.call')}
                  </a>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Horário de contacto</h3>
                <p className="mb-2">Segunda a Sexta: 9h - 20h</p>
                <p className="mb-2">Sábado: 9h - 13h</p>
                <p>Domingo: Fechado para contactos</p>
                <p className="mt-4 text-sm text-gray-300">
                  * O ginásio está aberto 24/7 para membros
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}