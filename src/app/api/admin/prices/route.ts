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

export async function GET(request: NextRequest) {
  const user = authenticate(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await query('SELECT * FROM prices ORDER BY id')
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching prices:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = authenticate(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      title_pt,
      title_en,
      description_pt,
      description_en,
      price,
      features_pt,
      features_en,
      highlighted
    } = body

    // Validate required fields
    if (!title_pt || !title_en || !description_pt || !description_en || !price || !features_pt || !features_en) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await query(
      `INSERT INTO prices (title_pt, title_en, description_pt, description_en, price, features_pt, features_en, highlighted)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title_pt, title_en, description_pt, description_en, price, features_pt, features_en, highlighted || false]
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating price:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const user = authenticate(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
  }

  try {
    const body = await request.json()
    
    // Build dynamic update query
    const updateFields = []
    const values = []
    let paramCount = 1

    Object.entries(body).forEach(([key, value]) => {
      if (value !== undefined) {
        updateFields.push(`${key} = $${paramCount}`)
        values.push(value)
        paramCount++
      }
    })

    if (updateFields.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    values.push(id)
    const updateQuery = `
      UPDATE prices 
      SET ${updateFields.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING *
    `

    const result = await query(updateQuery, values)

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Price not found' }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating price:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const user = authenticate(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
  }

  try {
    const result = await query('DELETE FROM prices WHERE id = $1', [id])

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Price not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Price deleted successfully' })
  } catch (error) {
    console.error('Error deleting price:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}