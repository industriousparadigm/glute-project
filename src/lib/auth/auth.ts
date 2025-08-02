import { query } from '@/lib/db/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

function getJwtSecret(): string {
  return process.env.JWT_SECRET || 'dev-secret-change-in-production'
}

interface User {
  id: number
  email: string
}

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  try {
    const result = await query(
      'SELECT id, email, password_hash FROM admin_users WHERE email = $1',
      [email]
    )
    
    if (result.rowCount === 0) {
      return null
    }
    
    const user = result.rows[0]
    const isValid = await bcrypt.compare(password, user.password_hash)
    
    if (!isValid) {
      return null
    }
    
    return {
      id: user.id,
      email: user.email,
    }
  } catch (error) {
    console.error('Error verifying credentials:', error)
    return null
  }
}

export function generateToken(user: User): string {
  return jwt.sign(
    { id: user.id, email: user.email },
    getJwtSecret(),
    { expiresIn: '24h' }
  )
}

export function verifyToken(token: string): User | null {
  try {
    return jwt.verify(token, getJwtSecret()) as User
  } catch {
    return null
  }
}