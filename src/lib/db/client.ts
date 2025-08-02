import { Pool } from 'pg'

let pool: Pool | null = null

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
    
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    
    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    })
  }
  return pool
}

export async function query(text: string, params?: unknown[]) {
  const pool = getPool()
  return pool.query(text, params)
}