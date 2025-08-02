// import { Pool } from 'pg' - unused, mocked below

// Mock pg module
jest.mock('pg', () => {
  const mockQuery = jest.fn()
  const mockEnd = jest.fn()
  const MockPool = jest.fn(() => ({
    query: mockQuery,
    end: mockEnd,
  }))
  return { Pool: MockPool }
})

describe('Database Client', () => {
  let mockQuery: jest.Mock
  // let mockEnd: jest.Mock - unused
  let MockPool: jest.Mock
  let query: (text: string, params?: unknown[]) => Promise<{ rows: unknown[], rowCount: number | null }>
  let getPool: () => { query: jest.Mock, end: jest.Mock }
  
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
    
    // Get fresh mocks
    jest.isolateModules(() => {
      const pgModule = jest.requireMock('pg')
      MockPool = pgModule.Pool
      const poolInstance = new MockPool()
      mockQuery = poolInstance.query
      // mockEnd = poolInstance.end - unused
      
      // Import after mocks are set up
      const client = jest.requireActual('../client')
      query = client.query
      getPool = client.getPool
    })
  })
  
  describe('query', () => {
    it('should execute query with text only', async () => {
      const mockResult = { rows: [{ id: 1 }], rowCount: 1 }
      mockQuery.mockResolvedValue(mockResult)
      
      const result = await query('SELECT * FROM users')
      
      expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM users', undefined)
      expect(result).toEqual(mockResult)
    })
    
    it('should execute query with text and params', async () => {
      const mockResult = { rows: [{ id: 1, email: 'test@example.com' }], rowCount: 1 }
      mockQuery.mockResolvedValue(mockResult)
      
      const result = await query('SELECT * FROM users WHERE email = $1', ['test@example.com'])
      
      expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', ['test@example.com'])
      expect(result).toEqual(mockResult)
    })
    
    it('should handle query errors', async () => {
      const error = new Error('Database error')
      mockQuery.mockRejectedValue(error)
      
      await expect(query('SELECT * FROM invalid_table')).rejects.toThrow('Database error')
    })
  })
  
  describe('getPool', () => {
    it('should return the same pool instance', () => {
      const initialCallCount = MockPool.mock.calls.length
      const pool1 = getPool()
      const pool2 = getPool()
      
      expect(pool1).toBe(pool2)
      expect(MockPool).toHaveBeenCalledTimes(initialCallCount + 1)
    })
    
    it('should create pool with DATABASE_URL', () => {
      process.env.DATABASE_URL = 'postgresql://test'
      
      getPool()
      
      expect(MockPool).toHaveBeenCalledWith({
        connectionString: 'postgresql://test',
      })
    })
  })
})