import { getTranslations, getCurrentLocale, Locale } from '../i18n'

describe('i18n', () => {
  describe('getTranslations', () => {
    it('should return Portuguese translations for pt locale', async () => {
      const translations = await getTranslations('pt')
      
      expect(translations).toBeDefined()
      expect(translations.hero.title).toBe('O TEU TREINO O TEU TEMPO')
      expect(translations.hero.subtitle).toBe('Treina com acompanhamento profissional 24/7')
      expect(translations.hero.cta).toBe('AGENDAR VISITA')
    })

    it('should return English translations for en locale', async () => {
      const translations = await getTranslations('en')
      
      expect(translations).toBeDefined()
      expect(translations.hero.title).toBe('YOUR TRAINING YOUR TIME')
      expect(translations.hero.subtitle).toBe('Train with 24/7 professional guidance')
      expect(translations.hero.cta).toBe('SCHEDULE A VISIT')
    })
  })

  describe('getCurrentLocale', () => {
    it('should detect locale from pathname', () => {
      expect(getCurrentLocale('/pt/about')).toBe('pt')
      expect(getCurrentLocale('/en/about')).toBe('en')
      expect(getCurrentLocale('/about')).toBe('pt') // default
    })
  })

  describe('translations structure', () => {
    it('should have all required sections', async () => {
      const translations = await getTranslations('pt')
      
      expect(translations).toHaveProperty('hero')
      expect(translations).toHaveProperty('differentiators')
      expect(translations).toHaveProperty('facility')
      expect(translations).toHaveProperty('community')
      expect(translations).toHaveProperty('pricing')
      expect(translations).toHaveProperty('contact')
      expect(translations).toHaveProperty('footer')
      expect(translations).toHaveProperty('common')
    })

    it('should have consistent structure between locales', async () => {
      const ptTranslations = await getTranslations('pt')
      const enTranslations = await getTranslations('en')
      
      // Check that both have the same keys
      expect(Object.keys(ptTranslations)).toEqual(Object.keys(enTranslations))
    })
  })
})