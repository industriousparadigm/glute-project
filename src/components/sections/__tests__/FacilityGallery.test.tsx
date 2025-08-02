import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { FacilityGallery } from '../FacilityGallery'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, onClick, className, ...props }: any) => (
    <img 
      src={src} 
      alt={alt} 
      onClick={onClick}
      className={className}
      {...props}
    />
  ),
}))

// Mock translations
const mockTranslations = {
  'facility.title': 'Instalações e Equipamentos',
  'facility.subtitle': 'Um espaço de 500m² com mais de 50 equipamentos',
  'facility.image1.alt': 'Área de musculação',
  'facility.image2.alt': 'Zona cardio',
  'facility.image3.alt': 'Área funcional',
  'facility.image4.alt': 'Estúdio de aulas',
  'facility.image5.alt': 'Área de peso livre',
  'facility.image6.alt': 'Zona de alongamento',
  'facility.viewAll': 'Ver todas as fotos',
  'facility.close': 'Fechar'
}

jest.mock('@/lib/i18n/hooks', () => ({
  useTranslations: () => ({
    t: (key: string) => mockTranslations[key as keyof typeof mockTranslations] || key
  })
}))

describe('FacilityGallery', () => {
  it('should render the title and subtitle', () => {
    render(<FacilityGallery />)
    
    expect(screen.getByText('Instalações e Equipamentos')).toBeInTheDocument()
    expect(screen.getByText('Um espaço de 500m² com mais de 50 equipamentos')).toBeInTheDocument()
  })

  it('should display a grid of 6 facility images', () => {
    render(<FacilityGallery />)
    
    expect(screen.getByAltText('Área de musculação')).toBeInTheDocument()
    expect(screen.getByAltText('Zona cardio')).toBeInTheDocument()
    expect(screen.getByAltText('Área funcional')).toBeInTheDocument()
    expect(screen.getByAltText('Estúdio de aulas')).toBeInTheDocument()
    expect(screen.getByAltText('Área de peso livre')).toBeInTheDocument()
    expect(screen.getByAltText('Zona de alongamento')).toBeInTheDocument()
  })

  it('should apply correct grid layout classes', () => {
    const { container } = render(<FacilityGallery />)
    
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3')
  })

  it('should have images with correct aspect ratio', () => {
    const { container } = render(<FacilityGallery />)
    
    const images = container.querySelectorAll('img')
    images.forEach(img => {
      expect(img).toHaveAttribute('width', '600')
      expect(img).toHaveAttribute('height', '400')
    })
  })

  it('should have hover effects on images', () => {
    const { container } = render(<FacilityGallery />)
    
    const imageContainers = container.querySelectorAll('.group')
    imageContainers.forEach(container => {
      expect(container).toHaveClass('hover:scale-105')
    })
  })

  it('should open modal when image is clicked', () => {
    render(<FacilityGallery />)
    
    const firstImage = screen.getByAltText('Área de musculação')
    fireEvent.click(firstImage)
    
    // Modal should be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    
    // Should show a larger version of the image
    const modalImages = screen.getAllByAltText('Área de musculação')
    expect(modalImages.length).toBeGreaterThan(1)
  })

  it('should navigate between images in modal', () => {
    render(<FacilityGallery />)
    
    // Open modal
    const firstImage = screen.getByAltText('Área de musculação')
    fireEvent.click(firstImage)
    
    // Click next button
    const nextButton = screen.getByLabelText('Next image')
    fireEvent.click(nextButton)
    
    // Should show second image (there will be multiple - gallery and modal)
    const cardioImages = screen.getAllByAltText('Zona cardio')
    expect(cardioImages.length).toBeGreaterThan(1)
    
    // Click previous button
    const prevButton = screen.getByLabelText('Previous image')
    fireEvent.click(prevButton)
    
    // Should go back to first image
    const muscleImages = screen.getAllByAltText('Área de musculação')
    expect(muscleImages.length).toBeGreaterThan(1)
  })

  it('should close modal when close button is clicked', () => {
    render(<FacilityGallery />)
    
    // Open modal
    const firstImage = screen.getByAltText('Área de musculação')
    fireEvent.click(firstImage)
    
    // Modal should be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    
    // Click close button
    const closeButton = screen.getByLabelText('Fechar')
    fireEvent.click(closeButton)
    
    // Modal should be hidden
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should close modal when clicking outside the image', () => {
    render(<FacilityGallery />)
    
    // Open modal
    const firstImage = screen.getByAltText('Área de musculação')
    fireEvent.click(firstImage)
    
    // Click on backdrop
    const backdrop = screen.getByRole('dialog')
    fireEvent.click(backdrop)
    
    // Modal should be hidden
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should handle keyboard navigation in modal', () => {
    render(<FacilityGallery />)
    
    // Open modal
    const firstImage = screen.getByAltText('Área de musculação')
    fireEvent.click(firstImage)
    
    // Press right arrow
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    const cardioImages = screen.getAllByAltText('Zona cardio')
    expect(cardioImages.length).toBeGreaterThan(1)
    
    // Press left arrow
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    const muscleImages = screen.getAllByAltText('Área de musculação')
    expect(muscleImages.length).toBeGreaterThan(1)
    
    // Press escape
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should show view all button on mobile', () => {
    render(<FacilityGallery />)
    
    const viewAllButton = screen.getByText('Ver todas as fotos')
    expect(viewAllButton).toBeInTheDocument()
    // Button should exist but visibility is controlled by CSS
  })

  it('should handle view all button click', () => {
    render(<FacilityGallery />)
    
    const viewAllButton = screen.getByText('Ver todas as fotos')
    fireEvent.click(viewAllButton)
    
    // Should open modal with first image
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    const muscleImages = screen.getAllByAltText('Área de musculação')
    expect(muscleImages.length).toBeGreaterThan(1)
  })

  it('should have proper section padding and styling', () => {
    const { container } = render(<FacilityGallery />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-20', 'bg-white')
  })

  it('should display image counter in modal', () => {
    render(<FacilityGallery />)
    
    // Open modal
    const firstImage = screen.getByAltText('Área de musculação')
    fireEvent.click(firstImage)
    
    // Should show "1 / 6"
    expect(screen.getByText('1 / 6')).toBeInTheDocument()
    
    // Navigate to next image
    const nextButton = screen.getByLabelText('Next image')
    fireEvent.click(nextButton)
    
    // Should show "2 / 6"
    expect(screen.getByText('2 / 6')).toBeInTheDocument()
  })
})