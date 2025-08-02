// Content API that fetches data from database

import { query } from './db/client'

interface LocalizedString {
  pt: string
  en: string
}

interface Price {
  id: string
  title: LocalizedString
  price: LocalizedString
  description: LocalizedString
  highlighted: boolean
}

interface Testimonial {
  id: string | number
  name: string
  quote: LocalizedString
  role: LocalizedString
  rating: number
}

interface SiteSettings {
  phone: string
  email: string
  whatsapp: string
  address: {
    street: string
    city: string
  }
  instagram: string
}

export async function getPrices(): Promise<Price[]> {
  try {
    const result = await query('SELECT * FROM prices ORDER BY sort_order ASC')
    
    return result.rows.map(row => ({
      id: row.id,
      title: { pt: row.title_pt, en: row.title_en },
      price: { pt: row.price_pt, en: row.price_en },
      description: { pt: row.description_pt, en: row.description_en },
      highlighted: row.highlighted,
    }))
  } catch (error) {
    console.error('Error fetching prices:', error)
    return []
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const result = await query(
      'SELECT * FROM testimonials WHERE is_active = true ORDER BY created_at DESC'
    )
    
    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      quote: { pt: row.quote_pt, en: row.quote_en },
      role: { pt: row.role_pt, en: row.role_en },
      rating: row.rating,
    }))
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const result = await query('SELECT key, value FROM site_settings')
    
    const settings: Record<string, string> = {}
    result.rows.forEach(row => {
      settings[row.key] = row.value
    })
    
    return {
      phone: settings.phone || '',
      email: settings.email || '',
      whatsapp: settings.whatsapp || '',
      address: {
        street: settings.address_street || '',
        city: settings.address_city || '',
      },
      instagram: settings.instagram || '',
    }
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return {
      phone: '',
      email: '',
      whatsapp: '',
      address: { street: '', city: '' },
      instagram: '',
    }
  }
}