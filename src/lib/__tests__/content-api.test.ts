import { getPrices, getTestimonials, getSiteSettings } from '../content-api'
import { query } from '../db/client'

jest.mock('../db/client')

describe('Content API', () => {
  const mockQuery = query as jest.MockedFunction<typeof query>
  
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('getPrices', () => {
    it('should return array of prices from database', async () => {
      const mockPrices = [
        {
          id: 'trial',
          title_pt: 'PRIMEIRA SESSÃO',
          title_en: 'FIRST SESSION',
          price_pt: 'GRÁTIS',
          price_en: 'FREE',
          description_pt: 'Experimenta sem compromisso',
          description_en: 'Try without commitment',
          highlighted: true,
          sort_order: 1
        }
      ]
      
      mockQuery.mockResolvedValue({ rows: mockPrices, rowCount: 1 })
      
      const prices = await getPrices()
      
      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT * FROM prices ORDER BY sort_order ASC'
      )
      expect(Array.isArray(prices)).toBe(true)
      expect(prices.length).toBe(1)
    })

    it('should transform database rows to API format', async () => {
      const mockPrices = [
        {
          id: 'trial',
          title_pt: 'PRIMEIRA SESSÃO',
          title_en: 'FIRST SESSION',
          price_pt: 'GRÁTIS',
          price_en: 'FREE',
          description_pt: 'Experimenta sem compromisso',
          description_en: 'Try without commitment',
          highlighted: true,
          sort_order: 1
        }
      ]
      
      mockQuery.mockResolvedValue({ rows: mockPrices, rowCount: 1 })
      
      const prices = await getPrices()
      const firstPrice = prices[0]
      
      expect(firstPrice).toHaveProperty('id')
      expect(firstPrice).toHaveProperty('title')
      expect(firstPrice.title).toEqual({ pt: 'PRIMEIRA SESSÃO', en: 'FIRST SESSION' })
      expect(firstPrice).toHaveProperty('price')
      expect(firstPrice.price).toEqual({ pt: 'GRÁTIS', en: 'FREE' })
      expect(firstPrice).toHaveProperty('description')
      expect(firstPrice).toHaveProperty('highlighted')
    })

    it('should handle database errors gracefully', async () => {
      mockQuery.mockRejectedValue(new Error('Database error'))
      
      const prices = await getPrices()
      
      expect(Array.isArray(prices)).toBe(true)
      expect(prices.length).toBe(0)
    })

    it('should return empty array when no prices in database', async () => {
      mockQuery.mockResolvedValue({ rows: [], rowCount: 0 })
      
      const prices = await getPrices()
      
      expect(Array.isArray(prices)).toBe(true)
      expect(prices.length).toBe(0)
    })
  })

  describe('getTestimonials', () => {
    it('should return array of testimonials from database', async () => {
      const mockTestimonials = [
        {
          id: 1,
          name: 'Maria Silva',
          quote_pt: 'Ótima experiência!',
          quote_en: 'Great experience!',
          role_pt: 'Cliente',
          role_en: 'Client',
          rating: 5,
          is_active: true
        }
      ]
      
      mockQuery.mockResolvedValue({ rows: mockTestimonials, rowCount: 1 })
      
      const testimonials = await getTestimonials()
      
      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT * FROM testimonials WHERE is_active = true ORDER BY created_at DESC'
      )
      expect(Array.isArray(testimonials)).toBe(true)
      expect(testimonials.length).toBe(1)
    })

    it('should transform database rows to API format', async () => {
      const mockTestimonials = [
        {
          id: 1,
          name: 'Maria Silva',
          quote_pt: 'Ótima experiência!',
          quote_en: 'Great experience!',
          role_pt: 'Cliente',
          role_en: 'Client',
          rating: 5,
          is_active: true
        }
      ]
      
      mockQuery.mockResolvedValue({ rows: mockTestimonials, rowCount: 1 })
      
      const testimonials = await getTestimonials()
      const firstTestimonial = testimonials[0]
      
      expect(firstTestimonial).toHaveProperty('id')
      expect(firstTestimonial).toHaveProperty('name')
      expect(firstTestimonial).toHaveProperty('quote')
      expect(firstTestimonial.quote).toEqual({ pt: 'Ótima experiência!', en: 'Great experience!' })
      expect(firstTestimonial).toHaveProperty('role')
      expect(firstTestimonial.role).toEqual({ pt: 'Cliente', en: 'Client' })
      expect(firstTestimonial).toHaveProperty('rating')
    })
    
    it('should handle database errors gracefully', async () => {
      mockQuery.mockRejectedValue(new Error('Database error'))
      
      const testimonials = await getTestimonials()
      
      expect(Array.isArray(testimonials)).toBe(true)
      expect(testimonials.length).toBe(0)
    })
  })

  describe('getSiteSettings', () => {
    it('should return site settings from database', async () => {
      const mockSettings = [
        { key: 'phone', value: '+351 123 456 789' },
        { key: 'email', value: 'info@gluteproject.com' },
        { key: 'whatsapp', value: '+351 123 456 789' },
        { key: 'address_street', value: 'Rua Example, 123' },
        { key: 'address_city', value: '4450-001 Matosinhos' },
        { key: 'instagram', value: 'glute_project' }
      ]
      
      mockQuery.mockResolvedValue({ rows: mockSettings, rowCount: 6 })
      
      const settings = await getSiteSettings()
      
      expect(mockQuery).toHaveBeenCalledWith('SELECT key, value FROM site_settings')
      expect(typeof settings).toBe('object')
      expect(settings).not.toBeNull()
    })

    it('should transform database rows to structured object', async () => {
      const mockSettings = [
        { key: 'phone', value: '+351 123 456 789' },
        { key: 'email', value: 'info@gluteproject.com' },
        { key: 'whatsapp', value: '+351 123 456 789' },
        { key: 'address_street', value: 'Rua Example, 123' },
        { key: 'address_city', value: '4450-001 Matosinhos' },
        { key: 'instagram', value: 'glute_project' }
      ]
      
      mockQuery.mockResolvedValue({ rows: mockSettings, rowCount: 6 })
      
      const settings = await getSiteSettings()
      
      expect(settings).toHaveProperty('phone', '+351 123 456 789')
      expect(settings).toHaveProperty('email', 'info@gluteproject.com')
      expect(settings).toHaveProperty('whatsapp', '+351 123 456 789')
      expect(settings).toHaveProperty('address')
      expect(settings.address).toEqual({
        street: 'Rua Example, 123',
        city: '4450-001 Matosinhos'
      })
      expect(settings).toHaveProperty('instagram', 'glute_project')
    })

    it('should handle database errors gracefully', async () => {
      mockQuery.mockRejectedValue(new Error('Database error'))
      
      const settings = await getSiteSettings()
      
      expect(typeof settings).toBe('object')
      expect(settings).toHaveProperty('phone', '')
      expect(settings).toHaveProperty('email', '')
      expect(settings).toHaveProperty('whatsapp', '')
      expect(settings.address).toEqual({ street: '', city: '' })
    })
  })
})