export type Locale = 'pt' | 'en'

export const locales: Locale[] = ['pt', 'en']
export const defaultLocale: Locale = 'pt'

export async function getTranslations(locale: Locale) {
  try {
    const translations = await import(`./translations/${locale}.json`)
    return translations.default
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error)
    // Fallback to default locale
    const fallback = await import(`./translations/${defaultLocale}.json`)
    return fallback.default
  }
}

export function getCurrentLocale(pathname: string): Locale {
  const segments = pathname.split('/')
  const potentialLocale = segments[1]
  
  if (locales.includes(potentialLocale as Locale)) {
    return potentialLocale as Locale
  }
  
  return defaultLocale
}