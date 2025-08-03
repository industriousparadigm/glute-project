# Glute Project 🔥

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/industriousparadigm/glute-project)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

A bold, high-converting fitness studio website for Glute Project in Matosinhos, Portugal. Features a striking black theme with orange accents, bilingual support, and a custom admin panel.

## 🎯 Project Overview

Glute Project is a premium 24/7 fitness studio offering professional guidance and community support. This website drives conversions through strategic design and punchy copy, following the V3 Bold Black design system.

### Key Features

- **Bold Black Theme**: 100% dark surfaces with high-contrast orange CTAs
- **Bilingual Support**: Full PT/EN localization with flag indicators
- **Custom Admin Panel**: JWT-authenticated content management
- **Performance Optimized**: Core Web Vitals optimized, Turbopack enabled
- **Mobile-First**: Responsive design with mobile-specific optimizations
- **Scroll Navigation**: Fixed-position navigation dots for section jumping
- **Instagram Integration**: Mock feed with custom grid layout
- **Light TDD**: Tests for critical paths (auth, API, forms)

## 🚀 Quick Start

### Prerequisites

- Node.js 20.18.0+
- npm 11.0.0+
- PostgreSQL database (Neon recommended)

### Installation

```bash
# Clone the repository
git clone git@github.com:industriousparadigm/glute-project.git
cd glute-project

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Initialize database
npx tsx scripts/create-tables-now.ts
```

### Development

```bash
# Start development server with Turbopack (port 3001)
npm run dev

# Run tests in watch mode
npm run test

# Build for production (ALWAYS run before pushing!)
npm run build

# Check code quality
npm run lint
```

## 📁 Project Structure

```
glute-project/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Localized pages (pt/en)
│   │   ├── admin/             # Admin panel (protected)
│   │   ├── api/               # API routes
│   │   ├── icon.svg           # Orange G favicon
│   │   └── globals.css        # Global styles & theme
│   ├── components/
│   │   ├── sections/          # Page sections
│   │   │   ├── Hero.tsx       # Hero with mobile-specific image
│   │   │   ├── Differentiators.tsx
│   │   │   ├── FacilityGallery.tsx
│   │   │   ├── TestimonialCarousel.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── InstagramFeed.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── Location.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── NavRail.tsx    # Scroll progress navigation
│   │       └── Button.tsx
│   ├── lib/
│   │   ├── i18n/              # Translation system
│   │   ├── theme/             # V3 Bold Black design tokens
│   │   ├── auth/              # JWT authentication
│   │   ├── db/                # Database client & schema
│   │   └── api.ts             # Content API
├── public/
│   └── images/                # Optimized images
├── scripts/                   # Database setup scripts
└── CLAUDE.md                  # AI agent documentation
```

## 🎨 V3 Bold Black Design System

### Theme Colors

```css
--color-accent-orange: #FF5E1B;  /* CTAs, headings - WCAG 4.78:1 on black */
--color-accent-lime: #E8ED4A;    /* Highlights - WCAG 4.62:1 on black */
--color-brand-black: #0A0A0A;   /* Primary background */
--color-ink: #0A0A0A;            /* Near-black surfaces */
--color-text-gray: #B4B4B4;      /* Secondary text */
```

### Typography

- **Display**: Barlow Condensed (700/800) - Uppercase headers
- **Body**: Inter (400/600/700) - Clean, readable content
- **Punchy Copy**: Max 4-word headings, 10-word sub-copy

### Design Principles

- 100% dark surfaces - no light sections
- High contrast orange CTAs
- Micro-motion animations (250ms sweeps)
- Mobile-optimized layouts
- Compressed vertical spacing

## 🌐 Features in Detail

### Navigation

- **NavRail**: Fixed-position scroll progress dots
- **Hover Labels**: Section names on dot hover
- **Smooth Scrolling**: Animated section transitions
- **Language Toggle**: PT 🇵🇹 / EN 🇬🇧 with flags

### Sections

1. **Hero**: Full-screen with overlay, mobile-specific image
2. **Differentiators**: Icon grid with hover effects
3. **Facility Gallery**: Mosaic layout, modal viewer
4. **Testimonials**: Horizontal scroll (desktop), stacked (mobile)
5. **Pricing**: Three-tier with highlighted recommended plan
6. **Instagram**: 1+4 grid layout with hover overlays
7. **Contact**: WhatsApp/Call CTAs, collapsible form
8. **Location**: Google Maps embed with directions

### Admin Panel (`/admin`)

- **Authentication**: JWT tokens in httpOnly cookies
- **Content Management**:
  - Prices: Edit all three pricing tiers
  - Testimonials: Manage reviews and ratings
  - Settings: Update contact info and hours
- **Responsive**: Desktop-optimized interface

### Mobile Optimizations

- Different hero image on mobile
- Stacked testimonials with no quote icons
- Smaller pricing cards and headings
- Full-width first image in facility gallery
- Compressed spacing throughout

## 🧪 Testing Strategy

Light TDD for critical paths:

```bash
# Run tests
npm run test           # Watch mode
npm run test:ci        # CI mode

# Test areas:
# - JWT authentication
# - API routes (admin endpoints)
# - Contact form validation
# - Critical UI components
# - Accessibility (keyboard nav)
```

## 🚢 Deployment

### Vercel Auto-Deploy

1. Push to `main` triggers deployment
2. Environment variables set in Vercel dashboard
3. Database must be initialized separately

### Environment Variables

```env
DATABASE_URL=                    # Neon PostgreSQL pooled connection
JWT_SECRET=                      # 32+ character secret
ADMIN_EMAIL=                     # Admin login
ADMIN_PASSWORD=                  # Admin password
NEXT_PUBLIC_BASE_URL=           # Production URL
```

### Database Setup

```bash
# After setting DATABASE_URL
npx tsx scripts/create-tables-now.ts
```

## 🔧 Common Tasks

### Update Translations

```typescript
// Edit translation files
src/lib/i18n/translations/pt.json
src/lib/i18n/translations/en.json

// Use in components
const { t } = useTranslations()
<h1>{t('hero.title')}</h1>
```

### Add Admin Feature

1. Create page: `src/app/admin/[feature]/page.tsx`
2. Add to navigation: `AdminWrapper.tsx`
3. Create API route: `src/app/api/admin/[feature]/route.ts`
4. Add database table if needed

### Modify Theme

```typescript
// Edit theme tokens
src/lib/theme/theme.ts

// Update CSS variables
src/app/globals.css
```

## 🐛 Troubleshooting

### Common Issues

- **White text not showing**: Check CSS inheritance
- **Images not loading**: Use static imports for Next/Image
- **Auth fails**: Verify JWT_SECRET is set
- **Build errors**: Run `npm run build` locally first
- **Hydration errors**: Check for client-only code

### Debug Commands

```bash
# Test database connection
npx tsx scripts/test-connection.ts

# Clear Next.js cache
rm -rf .next

# Check environment
node -e "console.log(Object.keys(process.env).filter(k => k.includes('ADMIN')))"
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/name`
3. Follow the established patterns
4. Test critical paths
5. Build before committing
6. Open Pull Request

### Code Standards

- TypeScript strict mode
- Complete implementations only (no TODOs)
- Mobile-first responsive design
- WCAG 2.2 AA accessibility
- Performance-conscious decisions

## 📄 License

MIT License - see LICENSE file

## 🙏 Acknowledgments

- Design: V3 Bold Black theme system
- Framework: [Next.js](https://nextjs.org/) 15.4.5
- Styling: [Tailwind CSS](https://tailwindcss.com/) v4
- Database: [Neon](https://neon.tech/) PostgreSQL
- Hosting: [Vercel](https://vercel.com/)
- Icons: [Lucide React](https://lucide.dev/)

---

**Live Site**: [glute-project.vercel.app](https://glute-project.vercel.app)

**Instagram**: [@glute_project](https://instagram.com/glute_project)

Built with 💪 for Glute Project - "TREINA. EVOLUI."