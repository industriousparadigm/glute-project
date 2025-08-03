export const colors = {
  // V3 Bold Black Theme
  accent: {
    orange: '#FF5E1B', // CTAs, icons, h1 - WCAG 4.78:1 on black
    lime: '#E8ED4A', // Highlight words - WCAG 4.62:1 on black  
  },
  
  // Base colors
  brand: {
    black: '#0A0A0A', // Primary background everywhere
  },
  
  // Text colors
  text: {
    white: '#FFFFFF', // Body on black - WCAG 21:1
    gray: '#B4B4B4', // Muted/metadata - WCAG 6.3:1
    light: '#FFFFFF', // White text even in "light" mode
    dark: '#FFFFFF',
  },
  
  // Surface colors
  surface: {
    dark: '#111111', // Alt sections (gray-900)
    black: '#0A0A0A', // Main background
  },
  
  // Legacy mappings (for backward compatibility)
  primary: '#FF5E1B',
  ink: '#0A0A0A',
  neutral: '#111111',
  white: '#FFFFFF',
  offwhite: '#111111', // Changed to dark for v3
  
  // Neutral colors (updated for dark theme)
  gray: {
    900: '#111111', // Dark surface
    800: '#1A1A1A', // Darker surface
    700: '#2A2A2A', // Card backgrounds
    600: '#3A3A3A', // Borders
    500: '#4A4A4A', // Muted borders
    400: '#6A6A6A', // Disabled
    300: '#8A8A8A', // Muted text
    200: '#B4B4B4', // Secondary text
    100: '#D4D4D4', // Light text
    50: '#F4F4F4', // Deprecated - do not use
  },
  
  // Semantic mappings
  background: {
    light: '#0A0A0A', // Force dark even in "light" mode
    dark: '#0A0A0A',
  },
}

export const typography = {
  fontFamily: {
    display: "'Barlow Condensed', sans-serif",
    body: "'Inter', sans-serif",
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1.125rem', // 18px (body)
    lg: '1.25rem', // 20px
    xl: '1.5rem', // 24px
    '2xl': 'clamp(1.5rem, 4vw, 2rem)', // 24-32px
    '3xl': 'clamp(2rem, 5vw, 3rem)', // 32-48px
    '4xl': 'clamp(2.5rem, 6vw, 4rem)', // 40-64px
    '5xl': 'clamp(3rem, 7vw, 4.5rem)', // 48-72px
  },
  fontWeight: {
    normal: 400,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.6,
    relaxed: 1.8,
  },
}

const spacing = {
  '0': '0',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
}

const animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
}

const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const theme = {
  colors,
  typography,
  spacing,
  animation,
  screens,
}