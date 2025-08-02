import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db/client'
import { verifyToken } from '@/lib/auth/auth'

// Middleware to check authentication
function authenticate(request: NextRequest) {
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.substring(7)
  return verifyToken(token)
}

// Valid setting keys
const VALID_SETTING_KEYS = [
  'phone',
  'whatsapp',
  'email',
  'address',
  'instagram',
  'facebook',
  'opening_hours_pt',
  'opening_hours_en'
]

export async function GET(request: NextRequest) {
  const user = authenticate(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await query('SELECT key, value FROM site_settings')
    
    // Convert array of {key, value} to object
    const settings = result.rows.reduce((acc, row) => {
      acc[row.key] = row.value
      return acc
    }, {} as Record<string, string>)
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const user = authenticate(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    
    // Filter valid keys and remove undefined values
    const updates = Object.entries(body).filter(
      ([key, value]) => VALID_SETTING_KEYS.includes(key) && value !== undefined
    )
    
    if (updates.length === 0) {
      return NextResponse.json({ error: 'No settings to update' }, { status: 400 })
    }
    
    // Validate email format if provided
    if (body.email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
      }
    }
    
    // Validate WhatsApp format if provided (must start with + and contain only digits)
    if (body.whatsapp !== undefined) {
      const whatsappRegex = /^\+\d+$/
      if (!whatsappRegex.test(body.whatsapp)) {
        return NextResponse.json({ error: 'WhatsApp number must start with + and contain only digits' }, { status: 400 })
      }
    }
    
    // Start transaction
    await query('BEGIN')
    
    try {
      // Update each setting
      for (const [key, value] of updates) {
        await query(
          `INSERT INTO site_settings (key, value) 
           VALUES ($1, $2)
           ON CONFLICT (key) 
           DO UPDATE SET value = $2`,
          [key, value]
        )
      }
      
      // Commit transaction
      await query('COMMIT')
      
      // Return updated settings
      const result = await query('SELECT key, value FROM site_settings')
      const settings = result.rows.reduce((acc, row) => {
        acc[row.key] = row.value
        return acc
      }, {} as Record<string, string>)
      
      return NextResponse.json(settings)
    } catch (error) {
      // Rollback on error
      await query('ROLLBACK')
      throw error
    }
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}