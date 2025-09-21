# Glute Project - AI Context

Bilingual fitness studio website. Next.js 15.4, TypeScript strict, V3 Bold Black theme. PT default, EN secondary.

## 🚨 ABSOLUTE GROUND RULES - NEVER VIOLATE 🚨

### 1. WORD MINIMALISM
- **NEVER use more words than necessary**
- Maximum 4-word headings
- Maximum 10-word descriptions
- If you can say it in 3 words, don't use 5
- Visual impact > text explanations
- Less is ALWAYS more

### 2. BILINGUAL REQUIREMENT
- **EVERY piece of content MUST have PT and EN versions**
- Portuguese (PT) is primary language
- English (EN) is secondary
- No exceptions - all copy, buttons, messages, errors must be bilingual
- Always update both `pt.json` and `en.json` translation files

## Critical Commands

```bash
npm run dev          # Dev server (stable webpack, better hot reload)
npm run dev:turbo    # Dev server with Turbopack (faster but less stable)
npm run build        # ALWAYS before push
npm run test         # Watch mode
npm run lint         # Check quality
npm run init-db      # Use create-tables-now.ts
```

## Project Context

- **Purpose**: High-converting fitness studio website, Matosinhos Portugal
- **Stack**: Next.js 15.4.5, TypeScript 5.x, Tailwind v4, PostgreSQL, JWT auth
- **Theme**: Dark gradient system with strategic visual variety
- **Copy**: Max 4-word headings, 10-word sub-copy, punchy/direct

## Code Style Rules

- TypeScript strict mode - no `any` types
- Complete implementations only - no TODOs
- Build must pass before commits
- Handle all error states
- Mobile-first responsive
- Test critical paths (auth, API, forms)
- **WORD MINIMALISM**: See ground rules above - this is NON-NEGOTIABLE
- **BILINGUAL ALWAYS**: Every string must exist in both languages

## UI Consistency Rules (CRITICAL - ALWAYS FOLLOW)

- **HEADINGS**: Always uppercase (use `uppercase` class)
- **CTA BUTTONS**: Use existing `cta-primary` or `cta-primary-light` classes
- **NEVER** create custom button styles - reuse existing patterns
- **ALWAYS** check existing components for style patterns before creating new ones
- **MAINTAIN** consistent spacing, colors, and interactions across all sections
- When in doubt, look at existing sections for reference

## File Structure

```
src/
├── app/[locale]/page.tsx      # Homepage (all sections)
├── app/admin/                 # Protected dashboard
├── app/api/                   # API routes
├── components/sections/       # Page sections
├── components/GalleryModal.tsx # Fullscreen image carousel
├── components/GalleryContext.tsx # Gallery state management
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
className="bg-gradient-services text-accent-orange"

// Gradient backgrounds per section
bg-gradient-studio      // Charcoal gradient
bg-gradient-services    // Orange-tinted gradient  
bg-gradient-testimonials // Elevated charcoal
bg-gradient-team        // Deep gradient
bg-gradient-instagram   // Lime-tinted gradient
bg-gradient-contact     // Warm conversion gradient

// Enhanced components
cta-primary            // Gradient button with hover
service-card           // Orange glow on hover
team-card              // Orange rim lighting
testimonial-quote      // Lime accent quotes
instagram-post         // Lime hover overlay
```

### Images
```typescript
import heroImg from '@/public/images/hero.png'
<Image src={heroImg} alt="" fill priority />
```

### Gallery Modal
```typescript
// Use GalleryContext to open modal
const { openGallery } = useGallery()
openGallery(0) // Open at specific index

// Features:
// - Arrow/ESC/F keyboard controls
// - Touch/swipe on mobile
// - Fullscreen mode (F key)
// - Lime accent theme
// - Cloudinary integration via /api/gallery/cloudinary
// - Intelligent preloading (current + adjacent images)
// - Auto-scrolling thumbnail strip
// - Smooth transitions without flicker
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

# Gallery (Cloudinary primary, Dropbox fallback)
CLOUDINARY_URL=       # Cloudinary connection string
CLOUDINARY_CLOUD_NAME= # Cloud name
CLOUDINARY_API_KEY=   # API key
CLOUDINARY_API_SECRET= # API secret
DROPBOX_REFRESH_TOKEN= # Dropbox fallback access
```

## Common Tasks

### Add Section
1. Create in `components/sections/`
2. Import in `[locale]/page.tsx`
3. Add to NavRail items
4. Add translations to BOTH pt.json AND en.json (NO EXCEPTIONS)

### Update Content
- Admin: `/admin` for dynamic content
- Static: Edit translation files

### Handle Forms
1. Client component with validation
2. Submit to API route
3. Show loading/success/error states

### Update Schedule/Hours
Schedule info is shown in the **Contact.tsx** component which displays:
- Personal Training: 05h00 - 22h00
- Small Group Classes: 06h00 - 13h30, 17h30 - 21h30

To update schedules, modify the `location.hours.*` translation keys:
- `location.hours.personal_training_hours`
- `location.hours.small_group_morning`
- `location.hours.small_group_evening`

### Setup Gallery

#### Cloudinary (Primary - Recommended)
1. Create Cloudinary account
2. Add environment variables (see Environment Variables section)
3. Upload images to `/glute/dia-a-dia` folder
4. API endpoint: `/api/gallery/cloudinary`
5. Features:
   - Automatic image optimization
   - Separate thumbnail URLs (200x200, smart crop)
   - Full-size URLs (max 1920px, best quality)
   - 5-minute memory cache for performance

#### Dropbox (Fallback)
1. Visit `/api/dropbox/auth`
2. Authorize Dropbox access
3. Add refresh token to env
4. Upload images to `/dia-a-dia/optimized` folder

## Mobile Specific

- Hero: Different image `woman-strong.png`
- Testimonials: Stacked cards
- Lifestyle: Gallery modal access
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

✅ Complete: Gradient system, sections, admin, i18n, SEO, a11y, gallery modal
✅ Live: Cloudinary gallery (38+ images) with Dropbox fallback
✅ Optimized: Intelligent preloading, smooth transitions, auto-scrolling thumbnails
🔧 Manual: Database init, Cloudinary/Dropbox token setup

## Gallery Performance & Features

### Image Loading Strategy
- **Intelligent Preloading**: Current + adjacent images load immediately
- **Background Loading**: Remaining images load in background
- **Smooth Transitions**: Opacity changes prevent flicker
- **3-Image Render**: Renders current + adjacent to eliminate transitions

### Gallery Capabilities
- **Capacity**: Fetches up to 50 images (supports 38+ collection)
- **Navigation**: Keyboard (arrows/ESC/F), touch/swipe, click
- **Thumbnails**: Auto-scroll to keep current visible
- **Counter**: Shows position (e.g., 1/38)
- **Loading State**: Spinner during image load

### Cloudinary Transformations
```javascript
// Thumbnails - 200x200 smart crop
`c_fill,w_200,h_200,g_auto,f_auto,q_auto`

// Full images - Max 1920px, best quality
`c_limit,w_1920,f_auto,q_auto:best`
```

### API Performance
- **Cache**: 5-minute memory cache
- **Fallback**: Automatic Dropbox fallback if Cloudinary fails
- **Endpoint**: `/api/gallery/cloudinary` (primary)

## Visual Design System

### Gradient Strategy
- **Hero**: Pure black (#0A0A0A) - dramatic entry
- **Studio**: Charcoal gradient - subtle depth
- **Services**: Orange-tinted - warm conversion point
- **Testimonials**: Elevated charcoal with lime accents
- **Team**: Deep gradient with orange rim lighting
- **Instagram**: Lime-tinted for energy
- **Contact**: Warm gradient - conversion focus
- **Footer**: Pure black - grounding

### Key Visual Elements
- Enhanced CTAs with gradient animations
- Service cards with orange glow effects
- Team photos with rim lighting on hover
- Testimonial quotes with lime accents
- Gallery modal with lime accents
- Mobile-optimized simplified gradients

## Common Pitfalls & Debugging Tips

### Translation/i18n Issues
- **useTranslations returns ANY type**: The `t()` function can return strings, arrays, or objects
  ```typescript
  // WRONG - assumes string
  const title = t('some.key') // might be array!

  // CORRECT - check type first
  const skills = t('team.skills')
  const skillsArray = Array.isArray(skills) ? skills : []
  ```
- **Always destructure locale**: `const { t, locale } = useTranslations()`
- **Translation keys must exist in BOTH files**: pt.json AND en.json
- **Arrays in translations work**: Just handle them properly in components

### Build Cache Issues
- **Framer-motion vendor chunk errors**: Delete `.next` and run `npm ci`
- **Hot reload not working**: Kill all dev servers, clean cache, restart
- **MODULE_NOT_FOUND errors**: Usually stale cache - clean and rebuild

### Component Patterns
- **Always get locale for conditional text**: Don't hardcode Portuguese
- **Type assertions for translations**: Cast when you know the type
- **Check array/object returns**: Translation function is flexible

## Anti-Patterns to Avoid

- Never use CSS-in-JS
- No light theme sections
- **NO VERBOSE COPY** (violates ground rule #1)
- **NO MONOLINGUAL CONTENT** (violates ground rule #2)
- No client-only SEO
- No unpooled DB connections
- Never add text without PT and EN versions
- Never use more words when fewer will do
- Don't assume translation returns are strings