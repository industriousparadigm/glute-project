import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Footer } from '../Footer'
import { useRouter } from 'next/navigation'

// Mock translations
const mockTranslations = {
  'footer.social': 'Segue-nos',
  'footer.hours': 'Horário',
  'footer.hours_value': 'Aberto 24/7',
  'footer.rights': '© 2025 Glute Project. Todos os direitos reservados.',
  'footer.language': 'Idioma',
  'footer.contact': 'Contacto',
  'footer.phone': '+351 912 345 678',
  'footer.email': 'info@gluteproject.com',
  'footer.address': 'Rua Example, 123',
  'footer.city': '4450-001 Matosinhos',
  'footer.links': 'Links Úteis',
  'footer.privacy': 'Política de Privacidade',
  'footer.terms': 'Termos e Condições'
}

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/pt',
  }),
  usePathname: () => '/pt',
}))

jest.mock('@/lib/i18n/hooks', () => ({
  useTranslations: () => ({
    t: (key: string) => mockTranslations[key as keyof typeof mockTranslations] || key,
    locale: 'pt'
  })
}))

describe('Footer', () => {
  it('should render the footer with all sections', () => {
    render(<Footer />)
    
    expect(screen.getByText('Segue-nos')).toBeInTheDocument()
    expect(screen.getByText('Horário')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
    expect(screen.getByText('Links Úteis')).toBeInTheDocument()
  })

  it('should display contact information', () => {
    render(<Footer />)
    
    expect(screen.getByText('+351 912 345 678')).toBeInTheDocument()
    expect(screen.getByText('info@gluteproject.com')).toBeInTheDocument()
    expect(screen.getByText('Rua Example, 123')).toBeInTheDocument()
    expect(screen.getByText('4450-001 Matosinhos')).toBeInTheDocument()
  })

  it('should display opening hours', () => {
    render(<Footer />)
    
    expect(screen.getByText('Aberto 24/7')).toBeInTheDocument()
  })

  it('should render social media links', () => {
    render(<Footer />)
    
    const instagramLink = screen.getByLabelText('Instagram')
    const facebookLink = screen.getByLabelText('Facebook')
    
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/gluteproject')
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/gluteproject')
    
    expect(instagramLink).toHaveAttribute('target', '_blank')
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render language switcher', () => {
    render(<Footer />)
    
    expect(screen.getByText('Idioma')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /PT/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /EN/ })).toBeInTheDocument()
  })

  it('should highlight current language', () => {
    render(<Footer />)
    
    const ptButton = screen.getByRole('button', { name: /PT/ })
    const enButton = screen.getByRole('button', { name: /EN/ })
    
    expect(ptButton).toHaveClass('bg-orange-500', 'text-white')
    expect(enButton).toHaveClass('bg-gray-700', 'hover:bg-gray-600')
  })

  it('should switch language when clicking language button', () => {
    const mockPush = jest.fn()
    const mockUseRouter = useRouter as jest.Mock
    mockUseRouter.mockReturnValue({
      push: mockPush,
      pathname: '/pt',
    })
    
    render(<Footer />)
    
    const enButton = screen.getByRole('button', { name: /EN/ })
    fireEvent.click(enButton)
    
    expect(mockPush).toHaveBeenCalledWith('/en')
  })

  it('should display copyright information', () => {
    render(<Footer />)
    
    expect(screen.getByText('© 2025 Glute Project. Todos os direitos reservados.')).toBeInTheDocument()
  })

  it('should render privacy and terms links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Política de Privacidade')).toBeInTheDocument()
    expect(screen.getByText('Termos e Condições')).toBeInTheDocument()
  })

  it('should have proper footer styling', () => {
    const { container } = render(<Footer />)
    
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('bg-gray-900', 'text-white')
  })

  it('should use responsive grid layout', () => {
    const { container } = render(<Footer />)
    
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('md:grid-cols-2', 'lg:grid-cols-4')
  })

  it('should render Glute Project logo or title', () => {
    render(<Footer />)
    
    expect(screen.getByText('GLUTE PROJECT')).toBeInTheDocument()
  })

  it('should have phone link with correct href', () => {
    render(<Footer />)
    
    const phoneLink = screen.getByText('+351 912 345 678').closest('a')
    expect(phoneLink).toHaveAttribute('href', 'tel:+351912345678')
  })

  it('should have email link with correct href', () => {
    render(<Footer />)
    
    const emailLink = screen.getByText('info@gluteproject.com').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:info@gluteproject.com')
  })
})