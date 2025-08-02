export const colors = {
  // Brand colors
  primary: '#FF5E1B', // Safety Orange
  ink: '#0A0A0A', // Near-black
  accent: '#D4FF41', // Electric Lime
  white: '#FFFFFF',
  neutral: '#F4F4F4',
  
  // Semantic mappings
  background: {
    light: '#FFFFFF',
    dark: '#0A0A0A',
  },
  text: {
    light: '#0A0A0A',
    dark: '#FFFFFF',
  },
}

export const typography = {
  fontFamily: {
    display: "'Barlow Condensed', sans-serif",
    body: "'Inter', sans-serif",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    normal: 400,
    semibold: 600,
    bold: 700,
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