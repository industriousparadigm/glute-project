import { theme, colors, typography } from '../theme'

describe('Theme Configuration', () => {
  describe('Colors', () => {
    it('should have the correct brand colors', () => {
      expect(colors.primary).toBe('#f27e00')
      expect(colors.ink).toBe('#0A0A0A')
      expect(colors.accent).toBe('#D4FF41')
      expect(colors.white).toBe('#FFFFFF')
      expect(colors.neutral).toBe('#F4F4F4')
    })

    it('should have semantic color mappings', () => {
      expect(colors.background.light).toBe('#FFFFFF')
      expect(colors.background.dark).toBe('#0A0A0A')
      expect(colors.text.light).toBe('#0A0A0A')
      expect(colors.text.dark).toBe('#FFFFFF')
    })
  })

  describe('Typography', () => {
    it('should have the correct font families', () => {
      expect(typography.fontFamily.display).toContain('Barlow Condensed')
      expect(typography.fontFamily.body).toContain('Inter')
    })

    it('should have font size scale', () => {
      expect(typography.fontSize).toHaveProperty('xs')
      expect(typography.fontSize).toHaveProperty('sm')
      expect(typography.fontSize).toHaveProperty('base')
      expect(typography.fontSize).toHaveProperty('lg')
      expect(typography.fontSize).toHaveProperty('xl')
      expect(typography.fontSize).toHaveProperty('2xl')
      expect(typography.fontSize).toHaveProperty('3xl')
      expect(typography.fontSize).toHaveProperty('4xl')
      expect(typography.fontSize).toHaveProperty('5xl')
    })

    it('should have font weights', () => {
      expect(typography.fontWeight.normal).toBe(400)
      expect(typography.fontWeight.semibold).toBe(600)
      expect(typography.fontWeight.bold).toBe(700)
    })
  })

  describe('Spacing', () => {
    it('should have a spacing scale', () => {
      expect(theme.spacing).toBeDefined()
      expect(theme.spacing['0']).toBe('0')
      expect(theme.spacing['1']).toBe('0.25rem')
      expect(theme.spacing['4']).toBe('1rem')
      expect(theme.spacing['8']).toBe('2rem')
    })
  })

  describe('Animation', () => {
    it('should have animation durations', () => {
      expect(theme.animation.duration.fast).toBe('150ms')
      expect(theme.animation.duration.normal).toBe('300ms')
      expect(theme.animation.duration.slow).toBe('500ms')
    })

    it('should have easing functions', () => {
      expect(theme.animation.easing).toHaveProperty('easeIn')
      expect(theme.animation.easing).toHaveProperty('easeOut')
      expect(theme.animation.easing).toHaveProperty('easeInOut')
    })
  })

  describe('Breakpoints', () => {
    it('should have responsive breakpoints', () => {
      expect(theme.screens.sm).toBe('640px')
      expect(theme.screens.md).toBe('768px')
      expect(theme.screens.lg).toBe('1024px')
      expect(theme.screens.xl).toBe('1280px')
      expect(theme.screens['2xl']).toBe('1536px')
    })
  })
})