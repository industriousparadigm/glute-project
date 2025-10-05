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
├── app/[locale]/
│   ├── page.tsx              # Homepage (all sections)
│   └── online/               # Online coaching platform
│       ├── page.tsx          # Landing page (server component)
│       ├── OnlinePageClient.tsx  # Client component with UI
│       ├── sign-in/[[...rest]]/page.tsx   # Clerk sign-in
│       ├── sign-up/[[...rest]]/page.tsx   # Clerk sign-up
│       └── dashboard/page.tsx             # Protected dashboard
├── app/admin/                # Protected dashboard (JWT auth)
├── app/api/
│   ├── webhooks/
│   │   ├── clerk/route.ts    # User sync webhook
│   │   └── stripe/route.ts   # Payment webhook
│   └── stripe/
│       ├── create-checkout/route.ts       # Checkout session
│       └── create-portal-session/route.ts # Customer portal
├── components/
│   ├── sections/             # Page sections
│   ├── online/
│   │   ├── PackageSelector.tsx    # Pricing cards with Clerk
│   │   └── DashboardHeader.tsx    # Header with UserButton
│   ├── GalleryModal.tsx      # Fullscreen image carousel
│   ├── GalleryContext.tsx    # Gallery state management
│   ├── StickyHeader.tsx      # Mobile sticky nav with hamburger
│   └── ServicesMobile.tsx    # Mobile-specific services layout
├── lib/i18n/                 # Translations (pt.json, en.json)
└── lib/db/
    ├── client.ts             # Database pooling
    └── schema.sql            # Database schema (includes online tables)
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
- Auth: JWT-based authentication
- Features: Prices, Testimonials, Settings

## Online Coaching Platform (Glute Online)

### Overview
Separate product area for remote coaching services with subscription payments.
- **URL**: `/[locale]/online` (e.g., `/pt/online`, `/en/online`)
- **Auth**: Clerk (modern auth platform)
- **Payments**: Stripe (subscription management)
- **Database**: PostgreSQL (same DB, separate tables)

### Architecture
```
┌─────────────────────────────────────────┐
│  Main Site (/)                          │
│  - Studio info, services, team, etc.    │
│  - No login required                    │
│  - JWT admin auth (/admin)              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Online Platform (/online)              │
│  - Remote coaching packages             │
│  - Clerk authentication                 │
│  - Stripe subscriptions                 │
│  - Protected dashboard                  │
└─────────────────────────────────────────┘
```

### Key Routes
- `/[locale]/online` - Landing page (public)
- `/[locale]/online/sign-in/[[...rest]]` - Clerk sign-in (catchall for verification flows)
- `/[locale]/online/sign-up/[[...rest]]` - Clerk sign-up (catchall for verification flows)
- `/[locale]/online/dashboard` - User dashboard (protected)

**IMPORTANT**: The `[[...rest]]` catchall pattern is REQUIRED for Clerk to handle email verification, password reset, and other auth flows properly.

### Database Tables
```sql
-- User management (synced from Clerk via webhook)
online_users (
  id SERIAL PRIMARY KEY,
  clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  stripe_customer_id VARCHAR(255),  -- Auto-created on user signup
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Subscription packages (€49, €89, €149/month)
online_packages (
  id SERIAL PRIMARY KEY,
  name_pt VARCHAR(255),
  name_en VARCHAR(255),
  description_pt TEXT,
  description_en TEXT,
  price_monthly DECIMAL(10,2),
  stripe_price_id VARCHAR(255),    -- Link to Stripe Price
  features_pt JSONB,               -- Array of features
  features_en JSONB,
  is_popular BOOLEAN,
  active BOOLEAN
)

-- Active subscriptions
user_subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES online_users(id),
  package_id INTEGER REFERENCES online_packages(id),
  stripe_subscription_id VARCHAR(255),
  status VARCHAR(50),              -- active, canceled, past_due
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN
)

-- Payment history
payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES online_users(id),
  subscription_id INTEGER REFERENCES user_subscriptions(id),
  stripe_payment_intent_id VARCHAR(255),
  amount DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'EUR',
  status VARCHAR(50),
  payment_method VARCHAR(100),
  created_at TIMESTAMP
)
```

### Authentication Flow (Clerk)
1. **Sign-up**: User creates account → Clerk sends webhook → API creates Stripe customer → Stores in DB
2. **Sign-in**: Clerk handles authentication, sets session cookie
3. **Protected Routes**: Middleware checks Clerk session before allowing access
4. **Sign-out**: Click UserButton in dashboard → "Sign out"

**Webhook Endpoint**: `/api/webhooks/clerk`
- Listens for: `user.created`, `user.updated`, `user.deleted`
- Auto-creates Stripe customer on user creation
- Syncs user data to `online_users` table

### Payment Flow (Stripe)
1. **Package Selection**: User clicks "ESCOLHER PLANO" on pricing card
2. **Checkout**: Redirects to Stripe Checkout (hosted page)
3. **Payment**: User enters card details, completes payment
4. **Webhook**: Stripe sends `checkout.session.completed` → API creates subscription in DB
5. **Dashboard**: User sees active subscription, can manage billing

**Webhook Endpoint**: `/api/webhooks/stripe`
- Listens for: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.*`
- Auto-updates subscriptions and records payments

**Stripe Customer Portal**: `/api/stripe/create-portal-session`
- Pre-built UI for users to:
  - Update payment method
  - View invoices
  - Cancel subscription
  - Download receipts

### Components
```typescript
// Package selector with Clerk integration
<PackageSelector packages={packages} locale={locale} />
// Shows sign-up button if not logged in
// Shows checkout button if logged in

// Clerk UI components (pre-built)
<SignIn appearance={{...}} />   // Sign-in form
<SignUp appearance={{...}} />   // Sign-up form
<UserButton />                  // User avatar with dropdown menu (includes sign-out)

// Dashboard header (client component wrapper for UserButton)
<DashboardHeader locale={locale} />
// IMPORTANT: UserButton must be in a client component
// Shows user avatar - click to see sign-out option

// Hooks
const { isSignedIn, user } = useUser()  // Clerk auth state
```

### Environment Variables (Online Platform)
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
CLERK_WEBHOOK_SECRET=whsec_xxx

# Clerk URLs (pre-configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/online/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/online/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/online/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/online/dashboard

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### Local Development vs Production

#### What Works Locally (No Webhooks Needed)
- ✅ Sign-up/Sign-in UI
- ✅ Clerk authentication
- ✅ Protected routes (dashboard redirect)
- ✅ Viewing packages
- ✅ Stripe checkout UI

#### What Needs Webhooks (Production or ngrok)
- ⚠️ User syncing to database (Clerk webhook)
- ⚠️ Stripe customer creation (Clerk webhook)
- ⚠️ Subscription creation (Stripe webhook)
- ⚠️ Payment recording (Stripe webhook)

#### Testing Webhooks Locally
Use **ngrok** to expose localhost:
```bash
# Install ngrok
brew install ngrok  # or download from ngrok.com

# Get auth token from https://dashboard.ngrok.com
ngrok config add-authtoken YOUR_TOKEN

# Expose local server
ngrok http 3002

# Copy HTTPS URL (e.g., https://abc123.ngrok.app)
# Configure in Clerk/Stripe:
# - Clerk webhook: https://abc123.ngrok.app/api/webhooks/clerk
# - Stripe webhook: https://abc123.ngrok.app/api/webhooks/stripe
```

**Alternative**: Skip local webhook testing, test in production
- Deploy to Vercel/production
- Configure webhooks with production URL
- Test end-to-end on live site

### Middleware Configuration
```typescript
// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Protected routes requiring Clerk auth
const isProtectedRoute = createRouteMatcher([
  '/:locale/online/dashboard(.*)',
])

// Protects online dashboard, preserves JWT admin auth
export default clerkMiddleware(async (auth, request) => {
  // ... admin JWT check ...

  if (isProtectedRoute(request)) {
    await auth.protect()
  }

  // ... locale handling ...
})
```

### Common Workflows

#### Adding a New Package
1. Create Stripe product + price in Stripe Dashboard
2. Copy Stripe Price ID (e.g., `price_xxx`)
3. Insert in database:
```sql
INSERT INTO online_packages (name_pt, name_en, price_monthly, stripe_price_id, features_pt, features_en, is_popular)
VALUES ('NEW PLAN', 'NEW PLAN', 199.00, 'price_xxx', '["Feature 1"]', '["Feature 1"]', false);
```

#### Viewing Users & Subscriptions
```sql
-- All users with subscriptions
SELECT u.email, p.name_pt, s.status, s.current_period_end
FROM online_users u
LEFT JOIN user_subscriptions s ON u.id = s.user_id
LEFT JOIN online_packages p ON s.package_id = p.id;

-- Active subscriptions only
SELECT * FROM user_subscriptions WHERE status = 'active';
```

#### Debugging Auth Issues
1. **User can't sign in**: Check Clerk Dashboard → Users → See if user exists
2. **User signed in but not in DB**: Check webhook logs in Clerk Dashboard → Webhooks
3. **Stuck on verification**: Ensure catchall routes exist (`[[...rest]]`)
4. **Dashboard shows "setting up"**: Webhook hasn't fired yet, wait or check logs
5. **UserButton not visible**: Must be in client component - use `<DashboardHeader>` wrapper

#### Debugging Payment Issues
1. **Checkout not working**: Verify Stripe publishable key, check browser console
2. **Subscription not created**: Check Stripe webhook logs in Stripe Dashboard → Developers → Webhooks
3. **Wrong package showing**: Verify `stripe_price_id` matches between DB and Stripe

### Security Considerations
- **Webhook Verification**: All webhooks verify signatures (Svix for Clerk, Stripe signature for Stripe)
- **Protected Routes**: Middleware blocks unauthorized access to dashboard
- **Stripe Keys**: Secret keys server-side only, publishable keys client-side
- **User Data**: Clerk manages sensitive auth data, we only store IDs and metadata

### Error Handling
- **Missing ENV vars**: App shows error, check `.env.local` for all required keys
- **Webhook signature fail**: Check webhook secret matches Clerk/Stripe dashboard
- **Database errors**: Check table exists, connection string correct
- **Clerk errors**: Check `https://clerk.com/docs/errors` for error codes

### Testing Checklist
- [ ] Sign-up flow completes (email verification works)
- [ ] Sign-in redirects to dashboard
- [ ] Dashboard shows user info (name, email)
- [ ] Package selection triggers Stripe checkout
- [ ] Successful payment creates subscription in DB
- [ ] Dashboard shows active subscription
- [ ] Stripe Customer Portal opens from dashboard
- [ ] User can cancel subscription
- [ ] Sign-out works from dashboard

### Production Deployment
1. **Switch to Production Keys**:
   - Clerk: Get production keys from Clerk Dashboard
   - Stripe: Switch to live mode, get live keys
2. **Configure Production Webhooks**:
   - Clerk: `https://gluteproject.pt/api/webhooks/clerk`
   - Stripe: `https://gluteproject.pt/api/webhooks/stripe`
3. **Update ENV vars** in Vercel/hosting platform
4. **Test end-to-end** with real card (Stripe live mode)
5. **Monitor webhooks** in Clerk/Stripe dashboards

### Documentation
- Full setup guide: `/SETUP_ONLINE.md`
- Database schema: `/src/lib/db/schema.sql` (lines 70-164)
- Stripe integration: `/docs/stripe-integration.md` (if exists)

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
✅ Online Platform: Clerk auth, Stripe payments, user dashboard, subscription management
🔧 Manual: Database init, Cloudinary/Dropbox token setup, Clerk/Stripe webhook configuration

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