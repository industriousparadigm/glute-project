import { renderHook } from '@testing-library/react'
import { useTranslations } from '../useTranslations'
import React from 'react'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/pt/test',
}))

describe('useTranslations', () => {
  it('should return translation function', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    )
    
    const { result } = renderHook(() => useTranslations(), { wrapper })
    
    expect(result.current.t).toBeDefined()
    expect(result.current.locale).toBe('pt')
  })

  it('should translate keys correctly', async () => {
    const { result } = renderHook(() => useTranslations())
    
    // Wait for translations to load
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(result.current.t('hero.title')).toBe('O TEU TREINO O TEU TEMPO')
    expect(result.current.t('common.loading')).toBe('A carregar...')
  })

  it('should handle nested translation keys', async () => {
    const { result } = renderHook(() => useTranslations())
    
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(result.current.t('differentiators.trainer_guided.title')).toBe('Acompanhamento Profissional')
  })

  it('should return key if translation not found', async () => {
    const { result } = renderHook(() => useTranslations())
    
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(result.current.t('non.existent.key')).toBe('non.existent.key')
  })
})