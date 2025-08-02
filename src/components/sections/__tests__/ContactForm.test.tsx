import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '../ContactForm'

// Mock translations
const mockTranslations = {
  'contact.title': 'Agendar Visita',
  'contact.form.name': 'Nome',
  'contact.form.email': 'Email',
  'contact.form.phone': 'Telefone',
  'contact.form.message': 'Mensagem (opcional)',
  'contact.form.submit': 'ENVIAR',
  'contact.form.submitting': 'A enviar...',
  'contact.whatsapp': 'CONTACTAR VIA WHATSAPP',
  'contact.call': 'LIGAR AGORA',
  'contact.form.success': 'Mensagem enviada com sucesso!',
  'contact.form.error': 'Erro ao enviar mensagem. Tente novamente.',
  'common.required': 'Obrigatório'
}

jest.mock('@/lib/i18n/hooks', () => ({
  useTranslations: () => ({
    t: (key: string) => mockTranslations[key as keyof typeof mockTranslations] || key,
    locale: 'pt'
  })
}))

// Mock fetch
global.fetch = jest.fn()

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the title', () => {
    render(<ContactForm />)
    
    expect(screen.getByText('Agendar Visita')).toBeInTheDocument()
  })

  it('should render all form fields', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/Nome/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Telefone/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Mensagem \(opcional\)/)).toBeInTheDocument()
  })

  it('should mark required fields', () => {
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/Nome/)
    const emailInput = screen.getByLabelText(/Email/)
    const phoneInput = screen.getByLabelText(/Telefone/)
    const messageInput = screen.getByLabelText(/Mensagem \(opcional\)/)
    
    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(phoneInput).toBeRequired()
    expect(messageInput).not.toBeRequired()
  })

  it('should validate email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/Email/)
    const submitButton = screen.getByRole('button', { name: 'ENVIAR' })
    
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)
    
    expect(emailInput).toBeInvalid()
  })

  it('should validate phone format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const phoneInput = screen.getByLabelText(/Telefone/) as HTMLInputElement
    
    await user.clear(phoneInput)
    await user.type(phoneInput, '912345678')
    expect(phoneInput.value).toBe('+351 912 345 678')
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    })
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/Nome/)
    const emailInput = screen.getByLabelText(/Email/)
    const phoneInput = screen.getByLabelText(/Telefone/)
    const messageInput = screen.getByLabelText(/Mensagem \(opcional\)/)
    const submitButton = screen.getByRole('button', { name: 'ENVIAR' })
    
    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao@example.com')
    await user.type(phoneInput, '912345678')
    await user.type(messageInput, 'Gostaria de agendar uma visita')
    
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'João Silva',
          email: 'joao@example.com',
          phone: '+351 912 345 678',
          message: 'Gostaria de agendar uma visita'
        })
      })
    })
  })

  it('should show loading state while submitting', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    )
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/Nome/)
    const emailInput = screen.getByLabelText(/Email/)
    const phoneInput = screen.getByLabelText(/Telefone/)
    const submitButton = screen.getByRole('button', { name: 'ENVIAR' })
    
    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao@example.com')
    await user.type(phoneInput, '912345678')
    
    await user.click(submitButton)
    
    expect(screen.getByRole('button', { name: 'A enviar...' })).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })

  it('should show success message after successful submission', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    })
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/Nome/)
    const emailInput = screen.getByLabelText(/Email/)
    const phoneInput = screen.getByLabelText(/Telefone/)
    const submitButton = screen.getByRole('button', { name: 'ENVIAR' })
    
    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao@example.com')
    await user.type(phoneInput, '912345678')
    
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Mensagem enviada com sucesso!')).toBeInTheDocument()
    })
  })

  it('should reset form after successful submission', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    })
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/Nome/)
    const emailInput = screen.getByLabelText(/Email/)
    const phoneInput = screen.getByLabelText(/Telefone/)
    const submitButton = screen.getByRole('button', { name: 'ENVIAR' })
    
    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao@example.com')
    await user.type(phoneInput, '912345678')
    
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(phoneInput).toHaveValue('')
    })
  })

  it('should show error message on submission failure', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/Nome/)
    const emailInput = screen.getByLabelText(/Email/)
    const phoneInput = screen.getByLabelText(/Telefone/)
    const submitButton = screen.getByRole('button', { name: 'ENVIAR' })
    
    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao@example.com')
    await user.type(phoneInput, '912345678')
    
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Erro ao enviar mensagem. Tente novamente.')).toBeInTheDocument()
    })
  })

  it('should render WhatsApp button with correct link', () => {
    render(<ContactForm />)
    
    const whatsappButton = screen.getByText('CONTACTAR VIA WHATSAPP')
    const whatsappLink = whatsappButton.closest('a')
    
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/351912345678')
    expect(whatsappLink).toHaveAttribute('target', '_blank')
    expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render call button with correct link', () => {
    render(<ContactForm />)
    
    const callButton = screen.getByText('LIGAR AGORA')
    const callLink = callButton.closest('a')
    
    expect(callLink).toHaveAttribute('href', 'tel:+351912345678')
  })

  it('should have proper section styling', () => {
    const { container } = render(<ContactForm />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-20', 'bg-orange-50')
  })

  it('should disable form fields while submitting', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    )
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/Nome/)
    const emailInput = screen.getByLabelText(/Email/)
    const phoneInput = screen.getByLabelText(/Telefone/)
    const messageInput = screen.getByLabelText(/Mensagem \(opcional\)/)
    const submitButton = screen.getByRole('button', { name: 'ENVIAR' })
    
    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao@example.com')
    await user.type(phoneInput, '912345678')
    
    await user.click(submitButton)
    
    expect(nameInput).toBeDisabled()
    expect(emailInput).toBeDisabled()
    expect(phoneInput).toBeDisabled()
    expect(messageInput).toBeDisabled()
  })

  it('should integrate with RegyBox API', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, regyBoxId: '12345' })
    })
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/Nome/)
    const emailInput = screen.getByLabelText(/Email/)
    const phoneInput = screen.getByLabelText(/Telefone/)
    const submitButton = screen.getByRole('button', { name: 'ENVIAR' })
    
    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao@example.com')
    await user.type(phoneInput, '912345678')
    
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', expect.any(Object))
    })
  })
})