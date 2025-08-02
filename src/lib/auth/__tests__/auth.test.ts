import { verifyCredentials, generateToken, verifyToken } from '../auth'
import { query } from '@/lib/db/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

jest.mock('@/lib/db/client')
jest.mock('bcryptjs')
jest.mock('jsonwebtoken')

describe('Auth Functions', () => {
  const mockQuery = query as jest.MockedFunction<typeof query>
  const mockCompare = bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>
  const mockSign = jwt.sign as jest.MockedFunction<typeof jwt.sign>
  const mockVerify = jwt.verify as jest.MockedFunction<typeof jwt.verify>
  
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.JWT_SECRET = 'test-secret'
  })
  
  describe('verifyCredentials', () => {
    it('should return user for valid credentials', async () => {
      mockQuery.mockResolvedValue({
        rows: [{
          id: 1,
          email: 'admin@gluteproject.com',
          password_hash: 'hashedpassword',
        }],
        rowCount: 1,
      })
      
      mockCompare.mockResolvedValue(true as never)
      
      const user = await verifyCredentials('admin@gluteproject.com', 'admin123')
      
      expect(user).toEqual({
        id: 1,
        email: 'admin@gluteproject.com',
      })
      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT id, email, password_hash FROM admin_users WHERE email = $1',
        ['admin@gluteproject.com']
      )
    })
    
    it('should return null for invalid password', async () => {
      mockQuery.mockResolvedValue({
        rows: [{
          id: 1,
          email: 'admin@gluteproject.com',
          password_hash: 'hashedpassword',
        }],
        rowCount: 1,
      })
      
      mockCompare.mockResolvedValue(false as never)
      
      const user = await verifyCredentials('admin@gluteproject.com', 'wrongpassword')
      
      expect(user).toBeNull()
    })
    
    it('should return null for non-existent user', async () => {
      mockQuery.mockResolvedValue({
        rows: [],
        rowCount: 0,
      })
      
      const user = await verifyCredentials('notfound@example.com', 'password')
      
      expect(user).toBeNull()
    })
    
    it('should handle database errors', async () => {
      mockQuery.mockRejectedValue(new Error('Database error'))
      
      const user = await verifyCredentials('admin@gluteproject.com', 'password')
      
      expect(user).toBeNull()
    })
  })
  
  describe('generateToken', () => {
    it('should generate JWT token for user', () => {
      const user = { id: 1, email: 'admin@gluteproject.com' }
      const mockToken = 'mock.jwt.token'
      
      mockSign.mockReturnValue(mockToken)
      
      const token = generateToken(user)
      
      expect(token).toBe(mockToken)
      expect(mockSign).toHaveBeenCalledWith(
        { id: 1, email: 'admin@gluteproject.com' },
        'test-secret',
        { expiresIn: '24h' }
      )
    })
  })
  
  describe('verifyToken', () => {
    it('should verify and decode valid token', () => {
      const mockPayload = { id: 1, email: 'admin@gluteproject.com' }
      
      mockVerify.mockReturnValue(mockPayload)
      
      const payload = verifyToken('valid.token')
      
      expect(payload).toEqual(mockPayload)
      expect(mockVerify).toHaveBeenCalledWith('valid.token', 'test-secret')
    })
    
    it('should return null for invalid token', () => {
      mockVerify.mockImplementation(() => {
        throw new Error('Invalid token')
      })
      
      const payload = verifyToken('invalid.token')
      
      expect(payload).toBeNull()
    })
  })
})