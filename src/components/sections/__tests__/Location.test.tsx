import React from 'react'
import { render, screen } from '@testing-library/react'
import { Location } from '../Location'

// Mock translations
const mockTranslations = {
  'location.title': 'Localização',
  'location.address': 'Rua Example, 123',
  'location.city': '4450-001 Matosinhos',
  'location.parking': 'Estacionamento gratuito disponível',
  'location.directions': 'Obter direções',
  'location.publicTransport': 'Transporte público',
  'location.metro': 'Metro: Estação Matosinhos Sul (10 min a pé)',
  'location.bus': 'Autocarro: Linhas 500, 502, 507'
}

jest.mock('@/lib/i18n/hooks', () => ({
  useTranslations: () => ({
    t: (key: string) => mockTranslations[key as keyof typeof mockTranslations] || key,
    locale: 'pt'
  })
}))

describe('Location', () => {
  it('should render the title', () => {
    render(<Location />)
    
    expect(screen.getByText('Localização')).toBeInTheDocument()
  })

  it('should display the address', () => {
    render(<Location />)
    
    expect(screen.getByText('Rua Example, 123')).toBeInTheDocument()
    expect(screen.getByText('4450-001 Matosinhos')).toBeInTheDocument()
  })

  it('should display parking information', () => {
    render(<Location />)
    
    expect(screen.getByText('Estacionamento gratuito disponível')).toBeInTheDocument()
  })

  it('should render the map container', () => {
    const { container } = render(<Location />)
    
    const mapContainer = container.querySelector('.map-container')
    expect(mapContainer).toBeInTheDocument()
    expect(mapContainer).toHaveClass('h-96')
  })

  it('should display the embedded Google Maps iframe', () => {
    render(<Location />)
    
    const iframe = screen.getByTitle('Glute Project location map')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src')
    expect(iframe.getAttribute('src')).toContain('google.com/maps/embed')
  })

  it('should have proper iframe attributes for accessibility', () => {
    render(<Location />)
    
    const iframe = screen.getByTitle('Glute Project location map')
    expect(iframe).toHaveAttribute('loading', 'lazy')
    expect(iframe).toHaveAttribute('allowfullscreen')
    expect(iframe).toHaveClass('w-full', 'h-full')
  })

  it('should display directions button', () => {
    render(<Location />)
    
    const directionsButton = screen.getByText('Obter direções')
    expect(directionsButton).toBeInTheDocument()
    
    const link = directionsButton.closest('a')
    expect(link).toHaveAttribute('href')
    expect(link?.getAttribute('href')).toContain('google.com/maps/dir/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should display public transport information', () => {
    render(<Location />)
    
    expect(screen.getByText('Transporte público')).toBeInTheDocument()
    expect(screen.getByText('Metro: Estação Matosinhos Sul (10 min a pé)')).toBeInTheDocument()
    expect(screen.getByText('Autocarro: Linhas 500, 502, 507')).toBeInTheDocument()
  })

  it('should have proper section styling', () => {
    const { container } = render(<Location />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-20', 'bg-gray-100')
  })

  it('should use responsive grid layout', () => {
    const { container } = render(<Location />)
    
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('lg:grid-cols-2')
  })

  it('should display contact information alongside map', () => {
    render(<Location />)
    
    // Check for presence of info card
    const infoCard = screen.getByText('Rua Example, 123').closest('.bg-white')
    expect(infoCard).toBeInTheDocument()
    expect(infoCard).toHaveClass('bg-white', 'p-6', 'rounded-lg', 'shadow-lg')
  })

  it('should have icons for different information types', () => {
    const { container } = render(<Location />)
    
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })
})