import { POST } from '../login/route'
import { query } from '@/lib/db/client'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

jest.mock('@/lib/db/client')
jest.mock('bcryptjs')
jest.mock('next/headers', () => ({
  cookies: () => ({
    set: jest.fn(),
  }),
}))

describe('POST /api/admin/auth/login', () => {
  const mockQuery = query as jest.MockedFunction<typeof query>
  const mockCompare = bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>
  
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  it('should return 401 for invalid credentials', async () => {
    const req = new NextRequest('http://localhost:3000/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@gluteproject.com',
        password: 'wrongpassword',
      }),
    })
    
    mockQuery.mockResolvedValue({
      rows: [{
        id: 1,
        email: 'admin@gluteproject.com',
        password_hash: 'hashedpassword',
      }],
      rowCount: 1,
    })
    
    mockCompare.mockResolvedValue(false as never)
    
    const response = await POST(req)
    const data = await response.json()
    
    expect(response.status).toBe(401)
    expect(data).toEqual({ error: 'Invalid credentials' })
  })
  
  it('should return 401 for non-existent user', async () => {
    const req = new NextRequest('http://localhost:3000/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'notfound@example.com',
        password: 'password',
      }),
    })
    
    mockQuery.mockResolvedValue({
      rows: [],
      rowCount: 0,
    })
    
    const response = await POST(req)
    const data = await response.json()
    
    expect(response.status).toBe(401)
    expect(data).toEqual({ error: 'Invalid credentials' })
  })
  
  it('should return 200 and session token for valid credentials', async () => {
    const req = new NextRequest('http://localhost:3000/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@gluteproject.com',
        password: 'admin123',
      }),
    })
    
    mockQuery.mockResolvedValue({
      rows: [{
        id: 1,
        email: 'admin@gluteproject.com',
        password_hash: 'hashedpassword',
      }],
      rowCount: 1,
    })
    
    mockCompare.mockResolvedValue(true as never)
    
    const response = await POST(req)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data).toHaveProperty('success', true)
    expect(data).toHaveProperty('user')
    expect(data.user).toEqual({
      id: 1,
      email: 'admin@gluteproject.com',
    })
    
    // Check if auth cookie is set
    const cookies = response.headers.get('set-cookie')
    expect(cookies).toContain('auth-token')
  })
  
  it('should return 400 for missing email or password', async () => {
    const req = new NextRequest('http://localhost:3000/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@gluteproject.com',
      }),
    })
    
    const response = await POST(req)
    const data = await response.json()
    
    expect(response.status).toBe(400)
    expect(data).toEqual({ error: 'Email and password are required' })
  })
  
  it('should handle database errors gracefully', async () => {
    const req = new NextRequest('http://localhost:3000/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@gluteproject.com',
        password: 'password',
      }),
    })
    
    mockQuery.mockRejectedValue(new Error('Database error'))
    
    const response = await POST(req)
    const data = await response.json()
    
    expect(response.status).toBe(500)
    expect(data).toEqual({ error: 'Internal server error' })
  })
})