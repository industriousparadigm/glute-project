import { NextRequest } from 'next/server'
import { GET, POST, PUT, DELETE } from '../route'
import { query } from '@/lib/db/client'
import { verifyToken } from '@/lib/auth/auth'

// Mock dependencies
jest.mock('@/lib/db/client')
jest.mock('@/lib/auth/auth')

const mockQuery = query as jest.MockedFunction<typeof query>
const mockVerifyToken = verifyToken as jest.MockedFunction<typeof verifyToken>

describe('Admin Prices API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/admin/prices', () => {
    it('should return 401 if no authorization header', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/prices')
      const response = await GET(request)
      
      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('Unauthorized')
    })

    it('should return 401 if invalid token', async () => {
      mockVerifyToken.mockReturnValue(null)
      
      const request = new NextRequest('http://localhost:3000/api/admin/prices', {
        headers: { Authorization: 'Bearer invalid-token' }
      })
      const response = await GET(request)
      
      expect(response.status).toBe(401)
    })

    it('should return all prices if authorized', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [
          { id: 1, title_pt: 'Plano Básico', title_en: 'Basic Plan', price: '29.90' },
          { id: 2, title_pt: 'Plano Premium', title_en: 'Premium Plan', price: '49.90' }
        ],
        rowCount: 2,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/prices', {
        headers: { Authorization: 'Bearer valid-token' }
      })
      const response = await GET(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data).toHaveLength(2)
      expect(data[0].title_pt).toBe('Plano Básico')
    })
  })

  describe('POST /api/admin/prices', () => {
    it('should create a new price if authorized', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [{ id: 3, title_pt: 'Novo Plano', title_en: 'New Plan', price: '39.90' }],
        rowCount: 1,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/prices', {
        method: 'POST',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title_pt: 'Novo Plano',
          title_en: 'New Plan',
          description_pt: 'Descrição do novo plano',
          description_en: 'New plan description',
          price: '39.90',
          features_pt: ['Acesso 24/7', 'Treino personalizado'],
          features_en: ['24/7 Access', 'Personalized training'],
          highlighted: false
        })
      })
      
      const response = await POST(request)
      
      expect(response.status).toBe(201)
      const data = await response.json()
      expect(data.title_pt).toBe('Novo Plano')
      expect(data.price).toBe('39.90')
    })

    it('should return 400 if required fields are missing', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      
      const request = new NextRequest('http://localhost:3000/api/admin/prices', {
        method: 'POST',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title_pt: 'Novo Plano'
          // Missing required fields
        })
      })
      
      const response = await POST(request)
      
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Missing required fields')
    })
  })

  describe('PUT /api/admin/prices', () => {
    it('should update an existing price if authorized', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [{ id: 1, title_pt: 'Plano Atualizado', price: '34.90' }],
        rowCount: 1,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/prices?id=1', {
        method: 'PUT',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title_pt: 'Plano Atualizado',
          price: '34.90'
        })
      })
      
      const response = await PUT(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.title_pt).toBe('Plano Atualizado')
      expect(data.price).toBe('34.90')
    })

    it('should return 400 if id is missing', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      
      const request = new NextRequest('http://localhost:3000/api/admin/prices', {
        method: 'PUT',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title_pt: 'Plano Atualizado'
        })
      })
      
      const response = await PUT(request)
      
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Price ID is required')
    })

    it('should return 404 if price not found', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/prices?id=999', {
        method: 'PUT',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title_pt: 'Plano Atualizado'
        })
      })
      
      const response = await PUT(request)
      
      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBe('Price not found')
    })
  })

  describe('DELETE /api/admin/prices', () => {
    it('should delete a price if authorized', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [],
        rowCount: 1,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/prices?id=1', {
        method: 'DELETE',
        headers: { Authorization: 'Bearer valid-token' }
      })
      
      const response = await DELETE(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.message).toBe('Price deleted successfully')
    })

    it('should return 400 if id is missing', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      
      const request = new NextRequest('http://localhost:3000/api/admin/prices', {
        method: 'DELETE',
        headers: { Authorization: 'Bearer valid-token' }
      })
      
      const response = await DELETE(request)
      
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Price ID is required')
    })

    it('should return 404 if price not found', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/prices?id=999', {
        method: 'DELETE',
        headers: { Authorization: 'Bearer valid-token' }
      })
      
      const response = await DELETE(request)
      
      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBe('Price not found')
    })
  })
})