import { NextRequest } from 'next/server'
import { GET, PUT } from '../route'
import { query } from '@/lib/db/client'
import { verifyToken } from '@/lib/auth/auth'

// Mock dependencies
jest.mock('@/lib/db/client')
jest.mock('@/lib/auth/auth')

const mockQuery = query as jest.MockedFunction<typeof query>
const mockVerifyToken = verifyToken as jest.MockedFunction<typeof verifyToken>

describe('Admin Settings API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/admin/settings', () => {
    it('should return 401 if no authorization header', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/settings')
      const response = await GET(request)
      
      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('Unauthorized')
    })

    it('should return site settings if authorized', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [
          { key: 'phone', value: '+351 937 370 304' },
          { key: 'whatsapp', value: '+351937370304' },
          { key: 'email', value: 'geral@gluteproject.pt' },
          { key: 'address', value: 'Rua Example 123, Matosinhos' },
          { key: 'instagram', value: '@gluteproject' },
          { key: 'facebook', value: 'gluteproject' },
          { key: 'opening_hours_pt', value: 'Segunda a Domingo: 24/7' },
          { key: 'opening_hours_en', value: 'Monday to Sunday: 24/7' }
        ],
        rowCount: 8,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/settings', {
        headers: { Authorization: 'Bearer valid-token' }
      })
      const response = await GET(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.phone).toBe('+351 937 370 304')
      expect(data.email).toBe('geral@gluteproject.pt')
      expect(data.instagram).toBe('@gluteproject')
    })

    it('should return empty object if no settings exist', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      mockQuery.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
        command: '',
        oid: 0,
        fields: []
      })
      
      const request = new NextRequest('http://localhost:3000/api/admin/settings', {
        headers: { Authorization: 'Bearer valid-token' }
      })
      const response = await GET(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data).toEqual({})
    })
  })

  describe('PUT /api/admin/settings', () => {
    it('should update settings if authorized', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      
      // Mock the transaction queries
      mockQuery
        // First call: BEGIN
        .mockResolvedValueOnce({ rows: [], rowCount: 0, command: '', oid: 0, fields: [] })
        // Second call: UPDATE phone
        .mockResolvedValueOnce({ rows: [], rowCount: 1, command: '', oid: 0, fields: [] })
        // Third call: UPDATE email
        .mockResolvedValueOnce({ rows: [], rowCount: 1, command: '', oid: 0, fields: [] })
        // Fourth call: COMMIT
        .mockResolvedValueOnce({ rows: [], rowCount: 0, command: '', oid: 0, fields: [] })
        // Fifth call: SELECT all settings
        .mockResolvedValueOnce({
          rows: [
            { key: 'phone', value: '+351 999 888 777' },
            { key: 'email', value: 'newemail@gluteproject.pt' }
          ],
          rowCount: 2,
          command: '',
          oid: 0,
          fields: []
        })
      
      const request = new NextRequest('http://localhost:3000/api/admin/settings', {
        method: 'PUT',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: '+351 999 888 777',
          email: 'newemail@gluteproject.pt'
        })
      })
      
      const response = await PUT(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.phone).toBe('+351 999 888 777')
      expect(data.email).toBe('newemail@gluteproject.pt')
    })

    it('should return 400 if no settings provided', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      
      const request = new NextRequest('http://localhost:3000/api/admin/settings', {
        method: 'PUT',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      
      const response = await PUT(request)
      
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('No settings to update')
    })

    it('should validate email format', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      
      const request = new NextRequest('http://localhost:3000/api/admin/settings', {
        method: 'PUT',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'invalid-email'
        })
      })
      
      const response = await PUT(request)
      
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Invalid email format')
    })

    it('should validate whatsapp format', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      
      const request = new NextRequest('http://localhost:3000/api/admin/settings', {
        method: 'PUT',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          whatsapp: 'invalid-number'
        })
      })
      
      const response = await PUT(request)
      
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('WhatsApp number must start with + and contain only digits')
    })

    it('should rollback on error', async () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@test.com' })
      
      // Mock the transaction queries
      mockQuery
        // First call: BEGIN
        .mockResolvedValueOnce({ rows: [], rowCount: 0, command: '', oid: 0, fields: [] })
        // Second call: UPDATE fails
        .mockRejectedValueOnce(new Error('Database error'))
        // Third call: ROLLBACK
        .mockResolvedValueOnce({ rows: [], rowCount: 0, command: '', oid: 0, fields: [] })
      
      const request = new NextRequest('http://localhost:3000/api/admin/settings', {
        method: 'PUT',
        headers: { 
          Authorization: 'Bearer valid-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: '+351 999 888 777'
        })
      })
      
      const response = await PUT(request)
      
      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Internal server error')
      expect(mockQuery).toHaveBeenCalledWith('ROLLBACK')
    })
  })
})