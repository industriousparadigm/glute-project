# Glute Project - AI Context

Bilingual fitness studio website. Next.js 15.4, TypeScript strict, V3 Bold Black theme. PT default, EN secondary.

## Critical Commands

```bash
npm run dev          # Dev server port 3001
npm run build        # ALWAYS before push
npm run test         # Watch mode
npm run lint         # Check quality
npm run init-db      # Use create-tables-now.ts
```

## Project Context

- **Purpose**: High-converting fitness studio website, Matosinhos Portugal
- **Stack**: Next.js 15.4.5, TypeScript 5.x, Tailwind v4, PostgreSQL, JWT auth
- **Theme**: 100% dark (#0A0A0A), orange CTAs (#FF5E1B), no light sections
- **Copy**: Max 4-word headings, 10-word sub-copy, punchy/direct

## Code Style Rules

- TypeScript strict mode - no `any` types
- Complete implementations only - no TODOs
- Build must pass before commits
- Handle all error states
- Mobile-first responsive
- Test critical paths (auth, API, forms)

## File Structure

```
src/
├── app/[locale]/page.tsx      # Homepage (all sections)
├── app/admin/                 # Protected dashboard
├── app/api/                   # API routes
├── components/sections/       # Page sections
├── lib/i18n/                 # Translations (pt.json, en.json)
└── lib/db/client.ts          # Database pooling
```

## Key Patterns

### Database
```typescript
import { query } from '@/lib/db/client'
// Always use pooling, handle transactions
```

### Translations
```typescript
const { t } = useTranslations()
return <h2>{t('section.title')}</h2>
```

### Styling
```typescript
// Tailwind only, use theme tokens
className="bg-brand-black text-accent-orange"
```

### Images
```typescript
import heroImg from '@/public/images/hero.png'
<Image src={heroImg} alt="" fill priority />
```

## Admin Panel

- URL: `/admin/login`
- Env: `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- Features: Prices, Testimonials, Settings

## Environment Variables

```env
DATABASE_URL=         # PostgreSQL pooled
JWT_SECRET=          # 32+ chars
ADMIN_EMAIL=         # Admin login
ADMIN_PASSWORD=      # Admin password
NEXT_PUBLIC_BASE_URL=  # Production URL
```

## Common Tasks

### Add Section
1. Create in `components/sections/`
2. Import in `[locale]/page.tsx`
3. Add to NavRail items
4. Add translations

### Update Content
- Admin: `/admin` for dynamic content
- Static: Edit translation files

### Handle Forms
1. Client component with validation
2. Submit to API route
3. Show loading/success/error states

## Mobile Specific

- Hero: Different image `woman-strong.png`
- Testimonials: Stacked cards
- Instagram: 1+4 grid maintained
- Pricing: Smaller headings/padding

## Testing Focus

- Auth flows (JWT)
- API routes (admin)
- Contact form
- Critical UI paths

## Edge Cases

- CSS inheritance fixed (specify text colors)
- Edge runtime limits (middleware token check only)
- Form phones auto-format +351
- Database always pooled + SSL

## Current State

✅ Complete: Theme, sections, admin, i18n, SEO, a11y
⚠️ Mock only: Instagram feed
🔧 Manual: Database init required

## Anti-Patterns to Avoid

- Never use CSS-in-JS
- No light theme sections
- No verbose copy
- No client-only SEO
- No unpooled DB connections