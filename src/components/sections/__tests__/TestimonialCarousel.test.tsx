import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TestimonialCarousel } from '../TestimonialCarousel'

// Mock translations
const mockTranslations = {
  'community.title': 'Histórias da Comunidade',
  'community.subtitle': 'O que dizem os nossos membros',
  'community.loading': 'A carregar testemunhos...',
  'community.error': 'Erro ao carregar testemunhos',
  'community.empty': 'Ainda não temos testemunhos',
  'community.previousTestimonial': 'Testemunho anterior',
  'community.nextTestimonial': 'Próximo testemunho'
}

jest.mock('@/lib/i18n/hooks', () => ({
  useTranslations: () => ({
    t: (key: string) => mockTranslations[key as keyof typeof mockTranslations] || key,
    locale: 'pt'
  })
}))

// Mock testimonials data
const mockTestimonials = [
  {
    id: 1,
    name: 'João Silva',
    text_pt: 'O melhor ginásio de Matosinhos! Ambiente fantástico e equipamento de qualidade.',
    text_en: 'The best gym in Matosinhos! Fantastic atmosphere and quality equipment.',
    rating: 5,
    highlighted: true
  },
  {
    id: 2,
    name: 'Maria Santos',
    text_pt: 'Mudou completamente a minha vida. Os treinadores são excepcionais!',
    text_en: 'Completely changed my life. The trainers are exceptional!',
    rating: 5,
    highlighted: true
  },
  {
    id: 3,
    name: 'Pedro Costa',
    text_pt: 'Recomendo a todos! Resultados incríveis em poucos meses.',
    text_en: 'Recommend to everyone! Incredible results in just a few months.',
    rating: 5,
    highlighted: true
  }
]

// Mock fetch
global.fetch = jest.fn()

describe('TestimonialCarousel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render title and subtitle', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTestimonials
    })

    render(<TestimonialCarousel />)
    
    await waitFor(() => {
      expect(screen.getByText('Histórias da Comunidade')).toBeInTheDocument()
      expect(screen.getByText('O que dizem os nossos membros')).toBeInTheDocument()
    })
  })

  it('should show loading state initially', () => {
    render(<TestimonialCarousel />)
    
    expect(screen.getByText('A carregar testemunhos...')).toBeInTheDocument()
  })

  it('should fetch and display testimonials', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTestimonials
    })

    render(<TestimonialCarousel />)

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
      expect(screen.getByText(/"O melhor ginásio de Matosinhos! Ambiente fantástico e equipamento de qualidade."/)).toBeInTheDocument()
    })
  })

  it('should display rating stars', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTestimonials
    })

    render(<TestimonialCarousel />)

    await waitFor(() => {
      const stars = screen.getAllByLabelText(/star/i)
      expect(stars).toHaveLength(5)
      stars.forEach(star => {
        expect(star).toHaveClass('text-yellow-400')
      })
    })
  })

  it('should navigate to next testimonial', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTestimonials
    })

    render(<TestimonialCarousel />)

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    const nextButton = screen.getByLabelText('Próximo testemunho')
    fireEvent.click(nextButton)

    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
    expect(screen.getByText(/"Mudou completamente a minha vida. Os treinadores são excepcionais!"/)).toBeInTheDocument()
  })

  it('should navigate to previous testimonial', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTestimonials
    })

    render(<TestimonialCarousel />)

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    const prevButton = screen.getByLabelText('Testemunho anterior')
    fireEvent.click(prevButton)

    // Should wrap around to the last testimonial
    expect(screen.getByText('Pedro Costa')).toBeInTheDocument()
  })

  it('should handle keyboard navigation', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTestimonials
    })

    render(<TestimonialCarousel />)

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    // Press right arrow
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()

    // Press left arrow
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(screen.getByText('João Silva')).toBeInTheDocument()
  })

  it('should auto-rotate testimonials', async () => {
    jest.useFakeTimers()
    
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTestimonials
    })

    render(<TestimonialCarousel />)

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    // Advance timer by 5 seconds
    jest.advanceTimersByTime(5000)

    await waitFor(() => {
      expect(screen.getByText('Maria Santos')).toBeInTheDocument()
    })

    jest.useRealTimers()
  })

  it('should pause auto-rotation on hover', async () => {
    jest.useFakeTimers()
    
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTestimonials
    })

    const { container } = render(<TestimonialCarousel />)

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    const carousel = container.querySelector('.testimonial-carousel')
    
    // Hover over carousel
    fireEvent.mouseEnter(carousel!)

    // Advance timer by 5 seconds
    jest.advanceTimersByTime(5000)

    // Should still show first testimonial
    expect(screen.getByText('João Silva')).toBeInTheDocument()

    // Mouse leave
    fireEvent.mouseLeave(carousel!)

    // Advance timer again
    jest.advanceTimersByTime(5000)

    // Now should advance
    await waitFor(() => {
      expect(screen.getByText('Maria Santos')).toBeInTheDocument()
    })

    jest.useRealTimers()
  })

  it('should show error state if fetch fails', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    render(<TestimonialCarousel />)

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar testemunhos')).toBeInTheDocument()
    })
  })

  it('should show empty state if no testimonials', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => []
    })

    render(<TestimonialCarousel />)

    await waitFor(() => {
      expect(screen.getByText('Ainda não temos testemunhos')).toBeInTheDocument()
    })
  })

  it('should have proper section styling', () => {
    const { container } = render(<TestimonialCarousel />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-20', 'bg-gray-50')
  })

  it('should display pagination dots', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTestimonials
    })

    render(<TestimonialCarousel />)

    await waitFor(() => {
      const dots = screen.getAllByRole('button', { name: /Go to testimonial/i })
      expect(dots).toHaveLength(3)
      
      // First dot should be active
      expect(dots[0]).toHaveClass('bg-orange-500')
      expect(dots[1]).toHaveClass('bg-gray-300')
      expect(dots[2]).toHaveClass('bg-gray-300')
    })
  })

  it('should navigate when clicking pagination dots', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTestimonials
    })

    render(<TestimonialCarousel />)

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    const dots = screen.getAllByRole('button', { name: /Go to testimonial/i })
    
    // Click third dot
    fireEvent.click(dots[2])

    expect(screen.getByText('Pedro Costa')).toBeInTheDocument()
  })

  it('should support touch swipe gestures', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTestimonials
    })

    const { container } = render(<TestimonialCarousel />)

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    const carousel = container.querySelector('.testimonial-content')

    // Simulate swipe left
    fireEvent.touchStart(carousel!, { touches: [{ clientX: 300, clientY: 100 }] })
    fireEvent.touchMove(carousel!, { touches: [{ clientX: 100, clientY: 100 }] })
    fireEvent.touchEnd(carousel!, { changedTouches: [{ clientX: 100, clientY: 100 }] })

    // Should advance to next testimonial
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
  })
})