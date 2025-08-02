import { getAuthToken, checkAuth } from '../middleware'
import { verifyToken } from '../auth'

jest.mock('../auth')

describe('Auth Middleware', () => {
  const mockVerifyToken = verifyToken as jest.MockedFunction<typeof verifyToken>
  
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
  
  describe('checkAuth', () => {
    it('should return true for valid token', () => {
      mockVerifyToken.mockReturnValue({ id: 1, email: 'admin@gluteproject.com' })
      
      const result = checkAuth('valid.jwt.token')
      
      expect(result).toBe(true)
      expect(mockVerifyToken).toHaveBeenCalledWith('valid.jwt.token')
    })
    
    it('should return false for invalid token', () => {
      mockVerifyToken.mockReturnValue(null)
      
      const result = checkAuth('invalid.jwt.token')
      
      expect(result).toBe(false)
      expect(mockVerifyToken).toHaveBeenCalledWith('invalid.jwt.token')
    })
    
    it('should return false for null token', () => {
      const result = checkAuth(null)
      
      expect(result).toBe(false)
      expect(mockVerifyToken).not.toHaveBeenCalled()
    })
  })
})