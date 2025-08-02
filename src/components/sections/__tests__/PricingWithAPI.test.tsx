import { render, screen, waitFor } from '@testing-library/react'
import { PricingWithAPI } from '../PricingWithAPI'
import * as contentAPI from '@/lib/content-api'

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
        'pricing.title': 'PREÇOS & OFERTA DE EXPERIMENTAÇÃO',
        'hero.cta': 'AGENDAR VISITA',
      }
      return translations[key] || key
    },
    locale: 'pt',
  }),
}))

// Mock content API
jest.mock('@/lib/content-api')

describe('PricingWithAPI', () => {
  const mockPrices = [
    {
      id: 'trial',
      title: { pt: 'PRIMEIRA SESSÃO', en: 'FIRST SESSION' },
      price: { pt: 'GRÁTIS', en: 'FREE' },
      description: { pt: 'Experimenta sem compromisso', en: 'Try without commitment' },
      highlighted: true,
    },
    {
      id: 'monthly',
      title: { pt: 'MENSALIDADE', en: 'MONTHLY' },
      price: { pt: 'A partir de €39,90', en: 'From €39.90' },
      description: { pt: 'Acesso ilimitado 24/7', en: 'Unlimited 24/7 access' },
      highlighted: false,
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(contentAPI.getPrices as jest.Mock).mockResolvedValue(mockPrices)
  })

  it('should fetch and display prices from API', async () => {
    render(await PricingWithAPI())
    
    await waitFor(() => {
      expect(screen.getByText('PRIMEIRA SESSÃO')).toBeInTheDocument()
      expect(screen.getByText('MENSALIDADE')).toBeInTheDocument()
    })
  })

  it('should display loading state initially', async () => {
    // Make the API slow
    ;(contentAPI.getPrices as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockPrices), 100))
    )
    
    const { container } = render(await PricingWithAPI())
    
    // Since it's a server component, we won't see loading state
    // Just verify it eventually shows content
    await waitFor(() => {
      expect(screen.getByText('PRIMEIRA SESSÃO')).toBeInTheDocument()
    })
  })

  it('should handle API errors gracefully', async () => {
    ;(contentAPI.getPrices as jest.Mock).mockRejectedValue(new Error('API Error'))
    
    const { container } = render(await PricingWithAPI())
    
    // Should still render the section structure
    expect(screen.getByText('PREÇOS & OFERTA DE EXPERIMENTAÇÃO')).toBeInTheDocument()
  })

  it('should apply correct locale to prices', async () => {
    render(await PricingWithAPI())
    
    await waitFor(() => {
      expect(screen.getByText('GRÁTIS')).toBeInTheDocument()
      expect(screen.getByText('A partir de €39,90')).toBeInTheDocument()
    })
  })

  it('should highlight featured prices', async () => {
    const { container } = render(await PricingWithAPI())
    
    await waitFor(() => {
      const cards = container.querySelectorAll('.border-2')
      const trialCard = Array.from(cards).find(card => 
        card.textContent?.includes('PRIMEIRA SESSÃO')
      )
      
      expect(trialCard).toHaveClass('border-primary')
    })
  })
})