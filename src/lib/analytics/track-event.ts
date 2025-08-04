import { track } from '@vercel/analytics'

export type EventName = 
  | 'whatsapp_click'
  | 'call_click'
  | 'instagram_click'
  | 'facebook_click'
  | 'form_submit'
  | 'form_open'
  | 'pricing_view'
  | 'language_switch'
  | 'map_directions_click'

interface EventProperties {
  source?: string
  language?: string
  plan?: string
  [key: string]: string | number | boolean | undefined
}

export function trackEvent(eventName: EventName, properties?: EventProperties) {
  // Vercel Analytics - filter out undefined values
  const cleanProps = properties ? Object.entries(properties).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string | number | boolean>) : undefined
  
  track(eventName, cleanProps)
  
  // If you add Google Analytics later
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as { gtag?: Function }).gtag
    if (gtag) {
      gtag('event', eventName, properties)
    }
  }
}