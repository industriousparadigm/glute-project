import { render, screen } from '@testing-library/react'
import { Hero } from '../Hero'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/pt',
}))

// Mock next/link
jest.mock('next/link', () => {
  const MockedLink = ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    return <a href={href} {...props}>{children}</a>
  }
  MockedLink.displayName = 'MockedLink'
  return MockedLink
})

// Mock translations hook
jest.mock('@/lib/i18n/hooks', () => ({
  useTranslations: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'hero.title': 'O TEU TREINO O TEU TEMPO',
        'hero.subtitle': 'Treina com acompanhamento profissional 24/7',
        'hero.cta': 'AGENDAR VISITA',
        'hero.cta_secondary': 'CONHECER O ESPAÇO',
      }
      return translations[key] || key
    },
    locale: 'pt',
  }),
}))

describe('Hero', () => {
  it('should render hero section with correct structure', async () => {
    render(<Hero />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByText('O TEU TREINO O TEU TEMPO')).toBeInTheDocument()
    expect(screen.getByText('Treina com acompanhamento profissional 24/7')).toBeInTheDocument()
  })

  it('should render call-to-action buttons', async () => {
    render(<Hero />)
    
    const primaryCTA = screen.getByRole('link', { name: /AGENDAR VISITA/ })
    const secondaryCTA = screen.getByRole('link', { name: /CONHECER O ESPAÇO/ })
    
    expect(primaryCTA).toBeInTheDocument()
    expect(secondaryCTA).toBeInTheDocument()
    expect(primaryCTA).toHaveAttribute('href', '#contact')
    expect(secondaryCTA).toHaveAttribute('href', '#facility')
  })

  it('should have background styling', () => {
    const { container } = render(<Hero />)
    
    const heroSection = container.querySelector('section')
    expect(heroSection).toHaveClass('bg-ink')
  })

  it('should be full viewport height', () => {
    const { container } = render(<Hero />)
    
    const heroSection = container.querySelector('section')
    expect(heroSection).toHaveClass('min-h-screen')
  })

  it('should have proper text styling', async () => {
    render(<Hero />)
    
    const title = screen.getByText('O TEU TREINO O TEU TEMPO')
    const subtitle = screen.getByText('Treina com acompanhamento profissional 24/7')
    
    expect(title.tagName).toBe('H1')
    expect(title).toHaveClass('text-primary')
    expect(subtitle).toHaveClass('text-white')
  })

  it('should have responsive layout', () => {
    const { container } = render(<Hero />)
    
    const contentContainer = container.querySelector('.container')
    expect(contentContainer).toHaveClass('mx-auto')
    expect(contentContainer).toHaveClass('px-4')
  })
})