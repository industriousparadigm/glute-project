import { render, screen } from '@testing-library/react'

describe('Test Setup', () => {
  it('should verify test environment is working', () => {
    render(<div data-testid="test">Test Setup Working</div>)
    
    expect(screen.getByTestId('test')).toBeInTheDocument()
    expect(screen.getByText('Test Setup Working')).toBeInTheDocument()
  })
})