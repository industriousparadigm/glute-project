import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pricing } from '../Pricing'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/pt',
}))

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock translations hook
jest.mock('@/lib/i18n/hooks', () => ({
  useTranslations: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'pricing.title': 'PREÇOS & OFERTA DE EXPERIMENTAÇÃO',
        'pricing.trial.title': 'PRIMEIRA SESSÃO',
        'pricing.trial.price': 'GRÁTIS',
        'pricing.trial.description': 'Experimenta sem compromisso',
        'pricing.monthly.title': 'MENSALIDADE',
        'pricing.monthly.price': 'A partir de €39,90',
        'pricing.monthly.description': 'Acesso ilimitado 24/7',
        'pricing.personal.title': 'PERSONAL TRAINING',
        'pricing.personal.price': 'Sob consulta',
        'pricing.personal.description': 'Planos personalizados',
        'hero.cta': 'AGENDAR VISITA',
      }
      return translations[key] || key
    },
    locale: 'pt',
  }),
}))

describe('Pricing', () => {
  it('should render section with correct title', () => {
    render(<Pricing />)
    
    expect(screen.getByText('PREÇOS & OFERTA DE EXPERIMENTAÇÃO')).toBeInTheDocument()
    expect(screen.getByText('PREÇOS & OFERTA DE EXPERIMENTAÇÃO').tagName).toBe('H2')
  })

  it('should render all three pricing options', () => {
    render(<Pricing />)
    
    expect(screen.getByText('PRIMEIRA SESSÃO')).toBeInTheDocument()
    expect(screen.getByText('MENSALIDADE')).toBeInTheDocument()
    expect(screen.getByText('PERSONAL TRAINING')).toBeInTheDocument()
  })

  it('should display prices for each option', () => {
    render(<Pricing />)
    
    expect(screen.getByText('GRÁTIS')).toBeInTheDocument()
    expect(screen.getByText('A partir de €39,90')).toBeInTheDocument()
    expect(screen.getByText('Sob consulta')).toBeInTheDocument()
  })

  it('should display descriptions for each option', () => {
    render(<Pricing />)
    
    expect(screen.getByText('Experimenta sem compromisso')).toBeInTheDocument()
    expect(screen.getByText('Acesso ilimitado 24/7')).toBeInTheDocument()
    expect(screen.getByText('Planos personalizados')).toBeInTheDocument()
  })

  it('should have CTA buttons for each pricing option', () => {
    render(<Pricing />)
    
    const ctaButtons = screen.getAllByRole('link', { name: 'AGENDAR VISITA' })
    expect(ctaButtons).toHaveLength(3)
    ctaButtons.forEach(button => {
      expect(button).toHaveAttribute('href', '#contact')
    })
  })

  it('should highlight the trial offer', () => {
    const { container } = render(<Pricing />)
    
    const cards = container.querySelectorAll('.border-2')
    const trialCard = Array.from(cards).find(card => 
      card.textContent?.includes('PRIMEIRA SESSÃO')
    )
    
    expect(trialCard).toHaveClass('border-primary')
  })

  it('should have proper section styling', () => {
    const { container } = render(<Pricing />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-20')
    expect(section).toHaveClass('bg-neutral')
  })

  it('should use grid layout for pricing cards', () => {
    const { container } = render(<Pricing />)
    
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('md:grid-cols-3')
  })
})