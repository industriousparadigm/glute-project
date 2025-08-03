# Glute Project - AI Assistant Context

## Project Overview

This is a bilingual fitness studio website for Glute Project in Matosinhos, Portugal. The project follows the V3 Bold Black design system with a focus on high conversion rates through punchy copy and strategic CTAs. Built with Next.js 15.4.5 and deployed on Vercel.

## Tech Stack

- **Framework**: Next.js 15.4.5 (App Router, Turbopack)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS v4 with custom theme
- **Database**: PostgreSQL (Neon) - pooled connection
- **Auth**: JWT-based custom authentication
- **Testing**: Jest 30.x, React Testing Library 16.x
- **Localization**: Next.js i18n (PT default, EN secondary)
- **Deployment**: Vercel (GitHub Actions auto-deploy)
- **Analytics**: Vercel Analytics
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Critical Commands

```bash
npm run dev          # Development with Turbopack on port 3001
npm run build        # ALWAYS run before pushing!
npm run test         # Watch mode testing
npm run lint         # Check code quality
npm run init-db      # Initialize database schema (use create-tables-now.ts)
```

## V3 Bold Black Design System

### Theme Philosophy
- **100% dark surfaces** - No light sections anywhere
- **High contrast** - Orange CTAs meeting WCAG 4.5:1
- **Punchy copy** - Max 4-word headings, 10-word sub-copy
- **Mobile-first** - Different layouts and images for mobile
- **Micro-animations** - 250ms transitions for smooth feel

### Color Palette
```css
--color-accent-orange: #FF5E1B;  /* Primary CTAs, all headings */
--color-accent-lime: #E8ED4A;    /* Highlights only (sparingly) */
--color-brand-black: #0A0A0A;    /* Main background */
--color-text-gray: #B4B4B4;      /* Secondary text */
--color-white: #FFFFFF;          /* Body text */
```

### Typography
- **Display**: Barlow Condensed (700/800) - UPPERCASE only
- **Body**: Inter (400/600/700) - Sentence case
- **Hierarchy**: Orange headings, white body text, gray secondary

## Project Structure

```
src/
├── app/
│   ├── [locale]/              # Localized routes (/pt, /en)
│   │   └── page.tsx          # Homepage with all sections
│   ├── admin/                # Protected admin area
│   │   ├── layout.tsx        # Auth wrapper
│   │   ├── login/            # JWT login page
│   │   ├── prices/           # Manage pricing tiers
│   │   ├── testimonials/     # Manage reviews
│   │   └── settings/         # Contact info & hours
│   ├── api/
│   │   ├── admin/           # Protected endpoints
│   │   ├── contact/         # Form submission
│   │   └── testimonials/    # Public testimonials
│   ├── globals.css          # Theme & utilities
│   └── icon.svg             # Orange G on black
├── components/
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx         # Full-screen with CTAs
│   │   ├── Differentiators.tsx  # 4-column icon grid
│   │   ├── FacilityGallery.tsx  # 3x3 mosaic with modal
│   │   ├── TestimonialCarousel.tsx  # Horizontal scroll
│   │   ├── Pricing.tsx      # 3-tier cards
│   │   ├── InstagramFeed.tsx    # 1+4 grid mock
│   │   ├── ContactForm.tsx  # WhatsApp/Call/Form
│   │   ├── Location.tsx     # Map & directions
│   │   └── Footer.tsx       # Minimal with language
│   └── ui/
│       ├── NavRail.tsx      # Fixed scroll dots
│       └── Button.tsx       # Orange CTA component
├── lib/
│   ├── i18n/                # Translation system
│   │   ├── hooks.ts         # useTranslations()
│   │   └── translations/    # pt.json, en.json
│   ├── theme/               # Design tokens
│   ├── auth/                # JWT implementation
│   │   ├── jwt.ts          # Token creation/verification
│   │   └── middleware.ts   # Route protection
│   ├── db/
│   │   ├── client.ts       # PG connection pool
│   │   └── schema.sql      # Database structure
│   └── api.ts              # Content fetching
└── scripts/
    └── create-tables-now.ts # DB initialization
```

## Development Philosophy

### Light TDD Approach
1. **Write tests for critical paths** - Auth, API routes, data mutations
2. **Test after for UI** - Components can be built first, tested after
3. **Focus on behavior** - Test what users see/do, not implementation
4. **Mock external services** - Database, APIs, etc.

### Step-by-Step Development
1. Start simple, iterate
2. Get it working first, optimize later
3. Commit working code frequently
4. Build → Test → Refactor cycle

### Code Quality Rules
- **No TODOs** in production code
- **Complete implementations** only
- **Handle all error states**
- **TypeScript strict mode** - no any types
- **Build before pushing** - catch errors early

## Key Implementation Details

### Authentication Flow
```typescript
// JWT in httpOnly cookies
// Middleware checks token existence (Edge Runtime)
// API routes verify full JWT (Node.js runtime)
// Admin credentials from env vars
```

### Database Patterns
```typescript
// Always use connection pooling
import { query } from '@/lib/db/client'

// Transactions for multi-table updates
await query('BEGIN')
try {
  await query('UPDATE ...')
  await query('INSERT ...')
  await query('COMMIT')
} catch (error) {
  await query('ROLLBACK')
  throw error
}
```

### Styling Approach
```typescript
// Tailwind classes only, no CSS-in-JS
// Use theme tokens via CSS variables
className="bg-brand-black text-accent-orange"

// Mobile-first responsive
className="text-4xl md:text-6xl lg:text-7xl"

// Consistent spacing
className="py-12 md:py-16"  // Sections
className="p-6 md:p-8"       // Cards
```

### Component Patterns
```typescript
// Server components by default
// 'use client' only when needed (forms, interactions)

// Translations in every component
const { t, locale } = useTranslations()

// Framer Motion for animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
```

## Common Tasks

### Add New Section
1. Create component in `src/components/sections/`
2. Import in `src/app/[locale]/page.tsx`
3. Add to NavRail navigation items
4. Add translations to both language files
5. Follow existing animation patterns

### Update Content
1. Admin panel: `/admin/login`
2. Use environment credentials
3. Changes reflect immediately
4. Database stores all editable content

### Add Translation
```typescript
// 1. Edit translation files
src/lib/i18n/translations/pt.json
src/lib/i18n/translations/en.json

// 2. Use in component
const { t } = useTranslations()
<h2>{t('section.title')}</h2>
```

### Handle Forms
```typescript
// 1. Client-side component with 'use client'
// 2. Use React Hook Form or controlled inputs
// 3. Submit to API route
// 4. Show loading/success/error states
// 5. Clear form on success
```

### Add Admin Feature
1. Create page in `src/app/admin/[feature]/page.tsx`
2. Add navigation link in `AdminWrapper.tsx`
3. Create API routes in `src/app/api/admin/[feature]/`
4. Add database table if needed
5. Test authentication flow

## Mobile-Specific Implementations

### Hero Section
- Desktop: `hero-bg.png` (full gym view)
- Mobile: `woman-strong.png` (focused athlete)
- Different aspect ratios handled

### Testimonials
- Desktop: Horizontal scroll with quote icons
- Mobile: Stacked cards, no decorations
- Touch-friendly navigation

### Instagram Grid
- Desktop: 1 large + 2x2 grid
- Mobile: Same layout, smaller gaps
- Proper aspect ratios maintained

### Pricing Cards
- Smaller headings on mobile
- Reduced padding
- Buttons always same height

## Performance Optimization

### Images
```typescript
// Always use Next/Image with static imports
import heroImg from '../../../public/images/hero.png'
<Image src={heroImg} alt="" fill priority />

// Proper sizes for responsive
sizes="(max-width: 768px) 100vw, 50vw"
```

### Fonts
```typescript
// Preloaded via next/font
import { Barlow_Condensed, Inter } from 'next/font/google'

// Applied via CSS variables
--font-display: var(--font-barlow-condensed);
```

### Loading States
- Skeleton screens for dynamic content
- Suspense boundaries for sections
- Progressive enhancement approach

## Edge Cases & Gotchas

### CSS Variable Inheritance
- Body color removed to prevent override
- Tailwind classes now work properly
- Always specify text color explicitly

### Edge Runtime Limitations
- No Node.js APIs in middleware
- Can't use jsonwebtoken directly
- Check for token existence only

### Database Connections
- Always use pooled connections
- SSL required in production
- Handle connection errors gracefully

### Form Validation
- Phone numbers auto-format to +351
- Email validation on client AND server
- Clear error messages in user's language

## Testing Guidelines

### What to Test
```typescript
// Critical paths
- Authentication flow
- Admin CRUD operations
- Contact form submission
- API error handling

// UI behavior
- Form validation
- Loading states
- Error states
- Accessibility
```

### Test Utilities
```typescript
// Mock translations
jest.mock('@/lib/i18n/hooks', () => ({
  useTranslations: () => ({
    t: (key: string) => key,
    locale: 'pt'
  })
}))

// Mock router
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/'
}))
```

## Deployment Checklist

1. **Local Build**: `npm run build` - must pass
2. **Tests Pass**: `npm run test:ci`
3. **Environment Variables**: All set in Vercel
4. **Database**: Schema initialized
5. **Admin Access**: Credentials working
6. **Forms**: Submission endpoints configured
7. **Images**: All optimized and loading
8. **Mobile**: Test on actual devices

## Debug Commands

```bash
# Check database connection
npx tsx scripts/test-connection.ts

# Initialize database
npx tsx scripts/create-tables-now.ts

# Clear caches
rm -rf .next node_modules/.cache

# Check environment
node -e "console.log(process.env.DATABASE_URL ? 'DB ✓' : 'DB ✗')"

# Test JWT secret
node -e "console.log(process.env.JWT_SECRET?.length > 32 ? 'JWT ✓' : 'JWT ✗')"
```

## Current Status

### Completed ✅
- V3 Bold Black theme implementation
- All sections fully responsive
- Admin panel with auth
- Bilingual support
- Contact form integration
- SEO optimization
- Performance optimization
- Accessibility (WCAG 2.2 AA)
- Mobile-specific layouts
- NavRail scroll navigation

### Known Limitations
- Instagram feed is mock data only
- Admin panel desktop-optimized
- No email notifications yet
- Manual database initialization required

## Best Practices

1. **Always build before pushing** - Catches type errors
2. **Test auth flows manually** - JWT expiry, logout
3. **Use semantic HTML** - Helps with SEO/a11y
4. **Optimize images** - Use WebP where possible
5. **Handle loading states** - Better UX
6. **Validate all inputs** - Never trust client
7. **Keep components focused** - Single responsibility
8. **Document complex logic** - Future you will thank you
9. **Commit working code** - Atomic commits
10. **Follow the theme** - Consistency is key

## Quick Reference

### Admin Access
- URL: `/admin/login`
- Credentials: Environment variables
- Features: Prices, Testimonials, Settings

### API Endpoints
- `GET /api/testimonials` - Public testimonials
- `GET/PUT /api/admin/prices` - Protected
- `GET/PUT /api/admin/testimonials` - Protected
- `GET/PUT /api/admin/settings` - Protected
- `POST /api/contact` - Contact form

### Key Files
- `src/app/[locale]/page.tsx` - Homepage
- `src/app/globals.css` - Theme definitions
- `src/lib/theme/theme.ts` - Design tokens
- `src/components/ui/NavRail.tsx` - Navigation
- `CLAUDE.md` - This file (AI context)

### Environment Variables
```env
DATABASE_URL=         # PostgreSQL connection string
JWT_SECRET=          # Random 32+ char string
ADMIN_EMAIL=         # Admin login email
ADMIN_PASSWORD=      # Admin login password
NEXT_PUBLIC_BASE_URL=  # https://glute-project.vercel.app
```

Remember: This project values **working code over perfect code**. Ship it! 🚀