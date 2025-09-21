import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Footer } from '../Footer'

// Mock translations
const mockTranslations = {
  'footer.rights': 'Todos os direitos reservados.'
}

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
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

jest.mock('@/lib/i18n/useLanguagePreference', () => ({
  useLanguagePreference: () => ({
    saveLanguagePreference: jest.fn()
  })
}))

jest.mock('@/lib/analytics/track-event', () => ({
  trackEvent: jest.fn()
}))

describe('Footer', () => {
  it('should display contact information', () => {
    render(<Footer />)

    expect(screen.getByText('+351 937 370 304')).toBeInTheDocument()
    expect(screen.getByText('geral@gluteproject.pt')).toBeInTheDocument()
  })

  it('should render all social media links', () => {
    render(<Footer />)

    const instagramLink = screen.getByLabelText('Instagram')
    const facebookLink = screen.getByLabelText('Facebook')
    const youtubeLink = screen.getByLabelText('YouTube')
    const linkedinLink = screen.getByLabelText('LinkedIn')

    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/glute_project')
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/gluteproject')
    expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/@gluteproject')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/company/glute-project/')

    expect(instagramLink).toHaveAttribute('target', '_blank')
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render language switcher', () => {
    render(<Footer />)

    expect(screen.getByText('🇵🇹 PT')).toBeInTheDocument()
  })

  it('should toggle language dropdown when clicked', () => {
    render(<Footer />)

    const languageButton = screen.getByLabelText('Select language')

    // Initially dropdown should not be visible
    expect(screen.queryByRole('button', { name: /🇬🇧 EN/ })).not.toBeInTheDocument()

    // Click to open dropdown
    fireEvent.click(languageButton)

    // Now both options should be visible in dropdown
    expect(screen.getAllByText('🇵🇹 PT')).toHaveLength(2) // One in button, one in dropdown
    expect(screen.getByText('🇬🇧 EN')).toBeInTheDocument()
  })

  it('should switch language when clicking language option', () => {
    mockPush.mockClear()
    render(<Footer />)

    // Open dropdown
    const languageButton = screen.getByLabelText('Select language')
    fireEvent.click(languageButton)

    // Click EN option
    const enButton = screen.getByText('🇬🇧 EN')
    fireEvent.click(enButton)

    expect(mockPush).toHaveBeenCalledWith('/en')
  })

  it('should display copyright information', () => {
    render(<Footer />)

    expect(screen.getByText(/© 2024 Glute Project/)).toBeInTheDocument()
  })

  it('should have phone link with correct href', () => {
    render(<Footer />)

    const phoneLink = screen.getByText('+351 937 370 304').closest('a')
    expect(phoneLink).toHaveAttribute('href', 'tel:+351937370304')
  })

  it('should have email link with correct href', () => {
    render(<Footer />)

    const emailLink = screen.getByText('geral@gluteproject.pt').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:geral@gluteproject.pt')
  })
})