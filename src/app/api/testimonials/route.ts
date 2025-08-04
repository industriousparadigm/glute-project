import { NextResponse } from 'next/server'
import { googleTestimonials } from '@/data/google-testimonials'

export async function GET() {
  // Return real Google reviews
  // Transform to match existing format
  const testimonials = googleTestimonials.map((review, index) => ({
    id: index + 1,
    name: review.name,
    text_pt: review.content_pt,
    text_en: review.content_en,
    rating: review.rating,
    highlighted: review.highlight,
    date: review.date,
    source: 'google'
  }))
  
  // Return only highlighted ones for carousel, or all if you prefer
  const highlightedTestimonials = testimonials.filter(t => t.highlighted)
  
  return NextResponse.json(highlightedTestimonials)
}