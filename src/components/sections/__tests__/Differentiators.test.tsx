import { render, screen } from '@testing-library/react'
import { Differentiators } from '../Differentiators'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/pt',
}))

// Mock translations hook
jest.mock('@/lib/i18n/hooks', () => ({
  useTranslations: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'differentiators.title': 'O QUE NOS DIFERENCIA',
        'differentiators.trainer_guided.title': 'Acompanhamento Profissional',
        'differentiators.trainer_guided.description': 'Treinos personalizados com acompanhamento de personal trainers certificados',
        'differentiators.nutrition.title': 'Nutrição & Fisioterapia',
        'differentiators.nutrition.description': 'Apoio nutricional e fisioterapêutico integrado no teu plano',
        'differentiators.access_24h.title': 'Acesso 24 Horas',
        'differentiators.access_24h.description': 'Treina quando quiseres, o ginásio está sempre aberto para ti',
        'differentiators.community.title': 'Comunidade',
        'differentiators.community.description': 'Faz parte de uma comunidade que te apoia e motiva',
      }
      return translations[key] || key
    },
    locale: 'pt',
  }),
}))

describe('Differentiators', () => {
  it('should render section with correct title', () => {
    render(<Differentiators />)
    
    expect(screen.getByText('O QUE NOS DIFERENCIA')).toBeInTheDocument()
    expect(screen.getByText('O QUE NOS DIFERENCIA').tagName).toBe('H2')
  })

  it('should render all four differentiators', () => {
    render(<Differentiators />)
    
    expect(screen.getByText('Acompanhamento Profissional')).toBeInTheDocument()
    expect(screen.getByText('Nutrição & Fisioterapia')).toBeInTheDocument()
    expect(screen.getByText('Acesso 24 Horas')).toBeInTheDocument()
    expect(screen.getByText('Comunidade')).toBeInTheDocument()
  })

  it('should render descriptions for each differentiator', () => {
    render(<Differentiators />)
    
    expect(screen.getByText('Treinos personalizados com acompanhamento de personal trainers certificados')).toBeInTheDocument()
    expect(screen.getByText('Apoio nutricional e fisioterapêutico integrado no teu plano')).toBeInTheDocument()
    expect(screen.getByText('Treina quando quiseres, o ginásio está sempre aberto para ti')).toBeInTheDocument()
    expect(screen.getByText('Faz parte de uma comunidade que te apoia e motiva')).toBeInTheDocument()
  })

  it('should have proper section styling', () => {
    const { container } = render(<Differentiators />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-20')
    expect(section).toHaveClass('bg-white')
  })

  it('should use grid layout for differentiators', () => {
    const { container } = render(<Differentiators />)
    
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('md:grid-cols-2')
    expect(grid).toHaveClass('lg:grid-cols-4')
  })

  it('should have icons for each differentiator', () => {
    render(<Differentiators />)
    
    const icons = screen.getAllByRole('img', { hidden: true })
    expect(icons).toHaveLength(4)
  })
})