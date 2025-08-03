'use client'

import React, { useState } from 'react'
import { useTranslations } from '@/lib/i18n/hooks'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, ChevronDown, ChevronUp } from 'lucide-react'

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
  const [showForm, setShowForm] = useState(false)
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
    } catch {
      setStatus({ loading: false, success: false, error: true })
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, error: false }))
      }, 5000)
    }
  }

  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="container">
        <motion.h2 
          className="text-accent-orange font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase text-center mb-12 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('contact.title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Quick CTAs - Left column */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <a
              href="https://wa.me/351912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="w-full inline-flex items-center justify-center gap-3 px-8 py-6 rounded-lg bg-accent-orange text-white font-bold text-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <MessageCircle size={28} />
                {t('contact.whatsapp')}
              </button>
            </a>

            <a
              href="tel:+351912345678"
              className="block"
            >
              <button className="w-full inline-flex items-center justify-center gap-3 px-8 py-6 rounded-lg bg-accent-orange text-white font-bold text-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <Phone size={28} />
                {t('contact.call')}
              </button>
            </a>

            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-zinc-800 border-2 border-accent-lime text-accent-lime font-semibold text-lg hover:bg-accent-lime hover:text-black transition-all duration-300"
            >
              {showForm ? 'Fechar formulário' : 'Quero formulário'}
              {showForm ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </motion.div>

          {/* Collapsible form - Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {showForm ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4 bg-black p-6 rounded-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status.loading}
                    placeholder={t('contact.form.name') + ' *'}
                    className="w-full h-11 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange disabled:opacity-50"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status.loading}
                    placeholder={t('contact.form.email') + ' *'}
                    className="w-full h-11 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange disabled:opacity-50"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={status.loading}
                    placeholder="+351"
                    className="w-full h-11 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange disabled:opacity-50"
                  />
                </div>

                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    disabled={status.loading}
                    placeholder={t('contact.form.message')}
                    className="w-full min-h-[80px] px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange disabled:opacity-50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full px-6 py-3 bg-accent-orange text-white font-semibold rounded-lg hover:bg-accent-orange/90 transition-colors disabled:opacity-50"
                >
                  {status.loading ? t('contact.form.submitting') : t('contact.form.submit')}
                </button>

                {status.success && (
                  <p className="text-accent-lime text-center font-semibold">
                    {t('contact.form.success')}
                  </p>
                )}

                {status.error && (
                  <p className="text-red-500 text-center font-semibold">
                    {t('contact.form.error')}
                  </p>
                )}
              </motion.form>
            ) : (
              <div className="bg-black text-white p-6 rounded-lg">
                <h3 className="text-accent-orange font-display text-lg font-bold uppercase mb-3">Horário de contacto</h3>
                <p className="mb-1 text-text-gray text-sm">Segunda a Sexta: 9h - 20h</p>
                <p className="mb-1 text-text-gray text-sm">Sábado: 9h - 13h</p>
                <p className="text-text-gray text-sm">Domingo: Fechado</p>
                <p className="mt-3 text-xs text-text-gray">
                  * Ginásio aberto 24/7 para membros
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}