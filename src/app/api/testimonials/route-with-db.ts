import { NextResponse } from 'next/server'
import { query } from '@/lib/db/client'

export async function GET() {
  try {
    // First try to get reviews from database (including synced Google reviews)
    const result = await query(
      `SELECT 
        id,
        name,
        content,
        rating,
        source,
        created_at,
        google_author_url
      FROM testimonials 
      WHERE source IN ('manual', 'google')
      ORDER BY 
        CASE WHEN source = 'google' THEN rating END DESC NULLS LAST,
        created_at DESC
      LIMIT 20`
    )
    
    if (result.rows.length > 0) {
      return NextResponse.json(result.rows)
    }
    
    // If no reviews in DB, return mock data as fallback
    const mockTestimonials = [
      {
        id: 1,
        name: 'Maria Silva',
        content: 'O Glute Project mudou a minha vida! Treino há 6 meses e nunca me senti tão bem.',
        rating: 5,
        source: 'manual',
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'João Ferreira',
        content: 'Ambiente incrível e resultados visíveis em poucas semanas. Recomendo a todos!',
        rating: 5,
        source: 'manual',
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Ana Costa',
        content: 'A flexibilidade de horário 24/7 é perfeita para o meu estilo de vida. Treino quando quero!',
        rating: 5,
        source: 'manual',
        created_at: new Date().toISOString()
      }
    ]
    
    return NextResponse.json(mockTestimonials)
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
    
    // On error, return mock data
    return NextResponse.json([
      {
        id: 1,
        name: 'Maria Silva',
        content: 'O Glute Project mudou a minha vida! Treino há 6 meses e nunca me senti tão bem.',
        rating: 5,
        source: 'manual',
        created_at: new Date().toISOString()
      }
    ])
  }
}