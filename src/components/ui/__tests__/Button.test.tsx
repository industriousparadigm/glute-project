import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  it('should render with default variant', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary')
  })

  it('should render with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    
    const button = screen.getByRole('button', { name: 'Secondary' })
    expect(button).toHaveClass('bg-ink')
  })

  it('should render with outline variant', () => {
    render(<Button variant="outline">Outline</Button>)
    
    const button = screen.getByRole('button', { name: 'Outline' })
    expect(button).toHaveClass('border-primary')
  })

  it('should handle click events', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    
    const button = screen.getByRole('button', { name: 'Disabled' })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50')
  })

  it('should render different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-4 py-2 text-sm')
    
    rerender(<Button size="md">Medium</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-6 py-3 text-base')
    
    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-8 py-4 text-lg')
  })

  it('should render with full width', () => {
    render(<Button fullWidth>Full Width</Button>)
    
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })
})