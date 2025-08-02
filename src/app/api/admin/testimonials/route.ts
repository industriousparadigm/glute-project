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
    const result = await query('SELECT * FROM testimonials ORDER BY id DESC')
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
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
      name,
      text_pt,
      text_en,
      rating,
      highlighted
    } = body

    // Validate required fields
    if (!name || !text_pt || !text_en || rating === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const result = await query(
      `INSERT INTO testimonials (name, text_pt, text_en, rating, highlighted)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, text_pt, text_en, rating, highlighted || false]
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
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
    return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 })
  }

  try {
    const body = await request.json()
    
    // Validate rating if provided
    if (body.rating !== undefined && (body.rating < 1 || body.rating > 5)) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }
    
    // Build dynamic update query
    const updateFields: string[] = []
    const values: unknown[] = []
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
      UPDATE testimonials 
      SET ${updateFields.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING *
    `

    const result = await query(updateQuery, values)

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating testimonial:', error)
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
    return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 })
  }

  try {
    const result = await query('DELETE FROM testimonials WHERE id = $1', [id])

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}