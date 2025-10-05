# Glute Project - AI Context

Bilingual fitness studio website. Next.js 15.4.5, TypeScript strict, V3 Bold Black theme. PT_PT default, EN secondary. Mobile-first responsive design with enhanced UX.

## 🚨 ABSOLUTE GROUND RULES - NEVER VIOLATE 🚨

### 1. WORD MINIMALISM
- **NEVER use more words than necessary**
- Maximum 4-word headings
- Maximum 10-word descriptions
- If you can say it in 3 words, don't use 5
- Visual impact > text explanations
- Less is ALWAYS more

### 2. BILINGUAL REQUIREMENT
- **EVERY piece of content MUST have PT_PT and EN versions**
- Portuguese (PT_PT - European Portuguese) is primary language
- English (EN) is secondary
- **IMPORTANT: Use PT_PT (European Portuguese) NOT PT_BR (Brazilian Portuguese)**
- No exceptions - all copy, buttons, messages, errors must be bilingual
- Always update both `pt.json` and `en.json` translation files

### 3. MOBILE-FIRST REQUIREMENT
- **MOBILE IS THE PRIMARY EXPERIENCE** - most users access the site on mobile
- Always test mobile first, then desktop
- Mobile viewports are narrow and have overlays (sticky header, browser UI)
- Touch targets must be large enough (minimum 44x44px)
- Modals/overlays must work perfectly on mobile before desktop

## Critical Commands

```bash
npm run dev          # Dev server (stable webpack) - port 3001
npm run dev:turbo    # Dev server with Turbopack (faster but less stable)
npm run build        # ALWAYS before push
npm run test         # Watch mode
npm run test:ci      # CI mode
npm run lint         # Check quality
npm run init-db      # Database setup via scripts/init-db.ts
```

## Project Context

- **Purpose**: High-converting fitness studio website, Matosinhos Portugal
- **Stack**: Next.js 15.4.5, TypeScript 5.x, Tailwind CSS v4, PostgreSQL, JWT auth
- **Theme**: Dark gradient system with strategic visual variety
- **Copy**: Max 4-word headings, 10-word sub-copy, punchy/direct
- **Mobile UX**: Sticky header, hamburger menu, optimized layouts, touch gestures
- **Desktop Features**: Infinite testimonial carousel with arrows, preserved layouts

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
- **BUTTONS**: Use the reusable `<Button>` component from `@/components/ui/Button`
  - **NEVER** create inline button styles - always use the Button component
  - **NO ROUNDED CORNERS** - buttons have sharp corners for gritty aesthetic
  - Supports variants: `primary` (gradient with glow) and `outline` (border only)
  - Supports optional icons with rotation on hover
  - Example: `<Button icon={<MessageCircle />} size="lg">Contact</Button>`
- **ALWAYS** check existing components for style patterns before creating new ones
- **MAINTAIN** consistent spacing, colors, and interactions across all sections
- When in doubt, look at existing sections for reference

## File Structure

```
src/
├── app/[locale]/page.tsx      # Homepage (all sections)
├── app/admin/                 # Protected dashboard
├── app/api/                   # API routes
├── components/
│   ├── sections/             # Page sections
│   ├── GalleryModal.tsx      # Fullscreen image carousel
│   ├── GalleryContext.tsx    # Gallery state management
│   ├── StickyHeader.tsx      # Mobile sticky nav with hamburger
│   └── ServicesMobile.tsx    # Mobile-specific services layout
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
const { t, locale } = useTranslations()
return <h2>{t('section.title')}</h2>
```

### Styling
```typescript
// Tailwind only, use theme tokens
className="bg-gradient-services text-accent-orange"

// Gradient backgrounds per section
bg-gradient-studio       // Charcoal gradient
bg-gradient-services     // Orange-tinted gradient
bg-gradient-testimonials // Elevated charcoal
bg-gradient-team         // Deep gradient
bg-gradient-lifestyle    // Dynamic lifestyle section
bg-gradient-regybox      // Regybox partnership section
bg-gradient-contact      // Warm conversion gradient

// Enhanced components
service-card            // Orange glow on hover
team-card               // Orange rim lighting
testimonial-quote       // Lime accent quotes
sticky-header           // Mobile navigation header

// Reusable Button component (ALWAYS USE THIS)
import { Button } from '@/components/ui/Button'

<Button
  variant="primary"     // or "outline"
  size="md"             // sm, md, lg
  fullWidth={false}     // optional
  icon={<Icon />}       // optional, rotates on hover
  iconPosition="left"   // or "right"
>
  Button Text
</Button>
```

### Images
```typescript
import heroImg from '@/public/images/hero.png'
<Image src={heroImg} alt="" fill priority />
```

### Gallery Modal
```typescript
// REUSABLE IMAGE MODAL PATTERN - supports both modes:

// 1. Multi-image gallery mode (lifestyle section)
const { isGalleryOpen, setIsGalleryOpen } = useGallery()
setIsGalleryOpen(true) // Opens full gallery from Cloudinary

// 2. Single image mode (schedules, diagrams, etc.)
const { openSingleImage } = useGallery()
openSingleImage('https://cloudinary.com/...') // Opens single image fullscreen

// Close gallery (works for both modes)
const { closeGallery } = useGallery()
closeGallery()

// Render modal (add to component with GalleryProvider)
<GalleryModal
  isOpen={isGalleryOpen}
  onClose={closeGallery}
  singleImageUrl={singleImageUrl}
/>

// Features (both modes):
// - ESC to close, F for fullscreen
// - Touch/swipe on mobile
// - Lime accent theme
// - Smooth transitions

// Features (gallery mode only):
// - Arrow navigation
// - Cloudinary integration via /api/gallery/cloudinary
// - Intelligent preloading (current + adjacent images)
// - Auto-scrolling thumbnail strip
// - Image counter

// Use case examples:
// - Gallery mode: Lifestyle "Dia a Dia" section
// - Single image mode: Small Group schedule viewer
```

### Modal/Overlay Patterns (CRITICAL FOR MOBILE)

**Problem**: Mobile has sticky header (z-50) that overlays content. Modals must be above header and prevent scroll.

**Solution Pattern**:
```typescript
// 1. Higher z-index than sticky header (header is z-50)
className="fixed inset-0 z-[9999]"  // Modal container

// 2. Modal buttons must be fixed with even higher z-index
className="fixed top-4 right-4 z-[10002]"  // Above everything
className="bg-black/80 ... shadow-lg"       // High contrast for visibility

// 3. Hide sticky header when modal is open
const { isGalleryOpen } = useGallery()
{isVisible && !isGalleryOpen && <StickyHeader />}

// 4. Prevent body scroll when modal is open
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
  return () => { document.body.style.overflow = '' }
}, [isOpen])
```

**Modal Checklist**:
- [ ] Container has `z-[9999]` or higher
- [ ] Buttons use `fixed` positioning with `z-[10002]`
- [ ] Sticky header hidden when modal open
- [ ] Body scroll prevented when modal open
- [ ] Close button visible on mobile (test on narrow viewport)
- [ ] ESC key closes modal
- [ ] Click outside closes modal (optional, depends on UX)
- [ ] Works on mobile first, then desktop

**Common Pitfalls**:
- ❌ Using `absolute` instead of `fixed` for modal buttons (they scroll with content)
- ❌ Forgetting to hide sticky header (buttons get covered)
- ❌ Not preventing body scroll (page scrolls behind modal)
- ❌ Low z-index (header appears on top of modal)
- ❌ Poor button contrast (hard to see on mobile)
- ❌ Testing only on desktop (most users are mobile!)

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
3. Add to NavRail items (desktop) and StickyHeader (mobile)
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

- **Sticky Header**: Appears at 1/3 scroll with hamburger menu
- **Hero**: Different image `woman-strong.png`, optimized layout
- **Services**: Custom ServicesMobile component with accordion
- **Testimonials**: Stacked cards, swipe navigation
- **Lifestyle**: Gallery modal access, responsive grid
- **Team**: 2-column grid, optimized spacing
- **Regybox**: Responsive partnership section
- **Navigation**: Fullscreen menu overlay with smooth animations

## Desktop Specific

- **NavRail**: Fixed side navigation with section indicators
- **Testimonials**: Infinite carousel with arrow navigation
- **Services**: Grid layout with hover effects
- **Team**: 3-column grid with rim lighting
- **Layouts**: All desktop layouts preserved during mobile fixes

## Testing Focus

- Auth flows (JWT)
- API routes (admin)
- Contact form
- Mobile navigation
- Responsive layouts
- Critical UI paths

## Edge Cases

- CSS inheritance fixed (specify text colors)
- Edge runtime limits (middleware token check only)
- Form phones auto-format +351
- Database always pooled + SSL
- Mobile menu closes on navigation
- Testimonial carousel infinite loop
- Horizontal overflow prevented (html/body `overflow-x: hidden` + main container `w-full overflow-x-hidden`)

## Current State

✅ Complete: Gradient system, all sections, admin, i18n, SEO, a11y, gallery modal
✅ Mobile UX: Sticky header, hamburger menu, optimized layouts, touch gestures
✅ Desktop: Infinite testimonial carousel, preserved layouts, keyboard nav
✅ Gallery: Cloudinary primary (38+ images) with Dropbox fallback
✅ Partnerships: Regybox section, Glute Apparel "Coming Soon"
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
- **Lifestyle**: Dynamic gradient for gallery showcase
- **Regybox**: Partnership gradient theme
- **Contact**: Warm gradient - conversion focus
- **Footer**: Pure black - grounding

### Key Visual Elements
- Enhanced CTAs with gradient animations
- Service cards with orange glow effects (desktop)
- Service accordion with smooth transitions (mobile)
- Team photos with rim lighting on hover
- Testimonial quotes with lime accents
- Gallery modal with lime accents
- Mobile-optimized simplified gradients
- Sticky header with blur backdrop

## Common Pitfalls & Debugging Tips

### Translation/i18n Issues
- **PT_PT vs PT_BR**: ALWAYS use European Portuguese (PT_PT), never Brazilian
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
- **Syntax errors in components**: Check for missing closing tags, especially in JSX
- **Mobile layout breaking desktop**: Use responsive classes, not separate components when possible

### Component Patterns
- **Always get locale for conditional text**: Don't hardcode Portuguese
- **Type assertions for translations**: Cast when you know the type
- **Check array/object returns**: Translation function is flexible
- **Mobile-first approach**: Start with mobile layout, enhance for desktop

## Anti-Patterns to Avoid

- Never use CSS-in-JS
- No light theme sections
- **NO VERBOSE COPY** (violates ground rule #1)
- **NO MONOLINGUAL CONTENT** (violates ground rule #2)
- No client-only SEO
- No unpooled DB connections
- Never add text without PT_PT and EN versions
- Never use more words when fewer will do
- Don't assume translation returns are strings
- Don't break desktop layouts when fixing mobile
- Don't use PT_BR instead of PT_PT
- Don't create custom button styles - use existing classes