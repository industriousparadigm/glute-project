import { getAuthToken, isAuthenticated } from '../middleware'
import { NextRequest } from 'next/server'

describe('Auth Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  describe('getAuthToken', () => {
    it('should extract auth token from cookie string', () => {
      const token = getAuthToken('auth-token=valid.jwt.token')
      expect(token).toBe('valid.jwt.token')
    })
    
    it('should extract auth token from multiple cookies', () => {
      const token = getAuthToken('other-cookie=value; auth-token=my.jwt.token; another=value')
      expect(token).toBe('my.jwt.token')
    })
    
    it('should return null when no auth token present', () => {
      const token = getAuthToken('other-cookie=value; another=value')
      expect(token).toBeNull()
    })
    
    it('should return null for empty cookie string', () => {
      const token = getAuthToken('')
      expect(token).toBeNull()
    })
  })
  
  describe('isAuthenticated', () => {
    it('should return true when auth token exists', () => {
      const req = {
        headers: {
          get: jest.fn().mockReturnValue('auth-token=valid.jwt.token')
        }
      } as unknown as NextRequest
      
      const result = isAuthenticated(req)
      
      expect(result).toBe(true)
      expect(req.headers.get).toHaveBeenCalledWith('cookie')
    })
    
    it('should return false when no auth token', () => {
      const req = {
        headers: {
          get: jest.fn().mockReturnValue('other-cookie=value')
        }
      } as unknown as NextRequest
      
      const result = isAuthenticated(req)
      
      expect(result).toBe(false)
    })
    
    it('should return false when no cookies', () => {
      const req = {
        headers: {
          get: jest.fn().mockReturnValue(null)
        }
      } as unknown as NextRequest
      
      const result = isAuthenticated(req)
      
      expect(result).toBe(false)
    })
  })
})