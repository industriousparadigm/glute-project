import { NextRequest } from 'next/server'
import { GET, POST, PUT, DELETE } from '../route'
import { query } from '@/lib/db/client'
import { verifyToken } from '@/lib/auth/auth'

// Mock dependencies
jest.mock('@/lib/db/client')
jest.mock('@/lib/auth/auth')

const mockQuery = query as jest.MockedFunction<typeof query>
const mockVerifyToken = verifyToken as jest.MockedFunction<typeof verifyToken>

describe('Admin Testimonials API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/admin/testimonials', () => {
    it('should return 401 if no authorization header', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/testimonials')
      const response = await GET(request)
      
      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('Unauthorized')
    })

    it('should return all testimonials if authorized', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [
          { 
            id: 1, 
            name: 'João Silva', 
            text_pt: 'Excelente ginásio!', 
            text_en: 'Excellent gym!',
            rating: 5,
            highlighted: true
          },
          { 
            id: 2, 
            name: 'Maria Santos', 
            text_pt: 'Recomendo muito!', 
            text_en: 'Highly recommend!',
            rating: 5,
            highlighted: false
          }
        ],
        rowCount: 2,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/testimonials', {
        headers: { Authorization: 'Bearer valid-token' }
      })
      const response = await GET(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data).toHaveLength(2)
      expect(data[0].name).toBe('João Silva')
    })
  })

  describe('POST /api/admin/testimonials', () => {
    it('should create a new testimonial if authorized', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [{ 
          id: 3, 
          name: 'Pedro Costa',
          text_pt: 'Ambiente fantástico!',
          text_en: 'Fantastic atmosphere!',
          rating: 5,
          highlighted: false
        }],
        rowCount: 1,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/testimonials', {
        method: 'POST',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Pedro Costa',
          text_pt: 'Ambiente fantástico!',
          text_en: 'Fantastic atmosphere!',
          rating: 5,
          highlighted: false
        })
      })
      
      const response = await POST(request)
      
      expect(response.status).toBe(201)
      const data = await response.json()
      expect(data.name).toBe('Pedro Costa')
      expect(data.rating).toBe(5)
    })

    it('should return 400 if required fields are missing', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      
      const request = new NextRequest('http://localhost:3000/api/admin/testimonials', {
        method: 'POST',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Pedro Costa'
          // Missing required fields
        })
      })
      
      const response = await POST(request)
      
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Missing required fields')
    })

    it('should return 400 if rating is invalid', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      
      const request = new NextRequest('http://localhost:3000/api/admin/testimonials', {
        method: 'POST',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Pedro Costa',
          text_pt: 'Ambiente fantástico!',
          text_en: 'Fantastic atmosphere!',
          rating: 6 // Invalid rating
        })
      })
      
      const response = await POST(request)
      
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Rating must be between 1 and 5')
    })
  })

  describe('PUT /api/admin/testimonials', () => {
    it('should update an existing testimonial if authorized', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [{ 
          id: 1, 
          name: 'João Silva',
          text_pt: 'Ginásio incrível!',
          text_en: 'Amazing gym!',
          rating: 5,
          highlighted: true
        }],
        rowCount: 1,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/testimonials?id=1', {
        method: 'PUT',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text_pt: 'Ginásio incrível!',
          text_en: 'Amazing gym!'
        })
      })
      
      const response = await PUT(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.text_pt).toBe('Ginásio incrível!')
    })

    it('should return 400 if id is missing', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      
      const request = new NextRequest('http://localhost:3000/api/admin/testimonials', {
        method: 'PUT',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text_pt: 'Ginásio incrível!'
        })
      })
      
      const response = await PUT(request)
      
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Testimonial ID is required')
    })

    it('should return 404 if testimonial not found', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/testimonials?id=999', {
        method: 'PUT',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text_pt: 'Ginásio incrível!'
        })
      })
      
      const response = await PUT(request)
      
      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBe('Testimonial not found')
    })
  })

  describe('DELETE /api/admin/testimonials', () => {
    it('should delete a testimonial if authorized', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [],
        rowCount: 1,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/testimonials?id=1', {
        method: 'DELETE',
        headers: { Authorization: 'Bearer valid-token' }
      })
      
      const response = await DELETE(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.message).toBe('Testimonial deleted successfully')
    })

    it('should return 400 if id is missing', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      
      const request = new NextRequest('http://localhost:3000/api/admin/testimonials', {
        method: 'DELETE',
        headers: { Authorization: 'Bearer valid-token' }
      })
      
      const response = await DELETE(request)
      
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Testimonial ID is required')
    })

    it('should return 404 if testimonial not found', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/testimonials?id=999', {
        method: 'DELETE',
        headers: { Authorization: 'Bearer valid-token' }
      })
      
      const response = await DELETE(request)
      
      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBe('Testimonial not found')
    })
  })
})