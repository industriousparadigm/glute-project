# Glute Project - AI Assistant Context

## Project Overview

This is a bilingual fitness studio website for Glute Project in Matosinhos, Portugal. The project follows light TDD practices, emphasizes performance, accessibility, and conversion optimization. Built with Next.js 15.4.5 and deployed on Vercel.

## Tech Stack

- **Framework**: Next.js 15.4.5 (App Router, Turbopack)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL (Neon) - pooled connection
- **Auth**: JWT-based custom authentication
- **Testing**: Jest 30.x, React Testing Library 16.x
- **Localization**: Next.js i18n (PT default, EN secondary)
- **Deployment**: Vercel (GitHub Actions auto-deploy)
- **Analytics**: Vercel Analytics

## Critical Commands

```bash
npm run dev          # Development with Turbopack on port 3001
npm run build        # ALWAYS run before pushing!
npm run test         # Watch mode testing
npm run lint         # Check code quality
npm run init-db      # Initialize database schema
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Localized pages (pt/en)
│   ├── admin/             # Admin panel (protected)
│   ├── api/               # API routes
│   ├── icon.svg           # Favicon (orange G on black)
│   └── globals.css        # Global styles
├── components/
│   ├── sections/          # Page sections
│   └── ui/                # Reusable components
├── lib/
│   ├── i18n/              # Translation system
│   ├── theme/             # Design tokens
│   ├── auth/              # JWT authentication
│   ├── db/client.ts       # Database connection
│   └── api.ts             # Content API
└── scripts/
    └── create-tables-now.ts  # DB initialization
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

### Code Quality
- No TODOs in production code
- Complete implementations only
- Handle all error states
- TypeScript strict mode

## Design System

### Brand Colors
```css
--primary: #FF5E1B;     /* Safety Orange */
--ink: #0A0A0A;         /* Near Black */
--accent: #D4FF41;      /* Electric Lime */
--white: #FFFFFF;
--neutral: #F4F4F4;
```

### Typography
- **Display**: Barlow Condensed (uppercase, 700/800)
- **Body**: Inter (400/600/700)
- **Admin**: System UI stack

### Spacing
- Sections: `py-20` desktop, `py-12` mobile
- Content: `max-w-7xl mx-auto px-4`
- Cards: `p-6` internal padding

## Key Implementation Details

### Authentication
- JWT tokens in httpOnly cookies
- Middleware checks token existence only (Edge Runtime compatible)
- API routes verify full JWT (Node.js runtime)
- Admin credentials: Set via env vars (ADMIN_EMAIL, ADMIN_PASSWORD)

### Database
- Connection pooling via pg library
- SSL required in production
- Schema in `src/lib/db/schema.sql`
- Migrations: Manual SQL files

### Environment Variables
```env
DATABASE_URL=           # Neon PostgreSQL
JWT_SECRET=            # Random secure string
ADMIN_EMAIL=           # Admin login email
ADMIN_PASSWORD=        # Admin login password
NEXT_PUBLIC_BASE_URL=  # Site URL for forms
```

### Edge Runtime Gotchas
- No Node.js APIs in middleware
- No jsonwebtoken in Edge Runtime
- Use cookies() with await in Next.js 15
- Client components for navigation hooks

### Deployment
- Push to main branch triggers Vercel deployment
- Environment variables set in Vercel dashboard
- Database must be initialized separately
- Build locally before pushing!

## Common Tasks

### Add New Admin Page
1. Create page component in `src/app/admin/[name]/page.tsx`
2. Add navigation link in `AdminWrapper.tsx`
3. Create API route if needed
4. Test authentication flow

### Update Content
1. Admin panel: `/admin/login`
2. Use environment credentials
3. Changes reflect immediately on site
4. Database stores all content

### Add Translation
1. Edit `src/lib/i18n/translations/pt.json`
2. Edit `src/lib/i18n/translations/en.json`
3. Use: `const { t } = useTranslations()`
4. Access: `t('key.path')`

### Handle Forms
1. Use server actions or API routes
2. Validate on client AND server
3. Show loading states
4. Handle errors gracefully

## Performance Checklist
- [ ] Images optimized (Next/Image)
- [ ] Fonts preloaded (next/font)
- [ ] CLS < 0.1 (fixed heights)
- [ ] LCP < 2.5s (optimize hero)
- [ ] Bundle size minimal
- [ ] Database queries efficient

## Testing Strategy

### What to Test
- **API Routes**: Full integration tests
- **Auth Flow**: End-to-end testing
- **Forms**: Validation and submission
- **Critical UI**: Pricing, CTAs
- **Accessibility**: Keyboard navigation

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

## Debugging Tips

1. **Hydration Errors**: Check for date/time rendering
2. **Build Errors**: Run `npm run build` locally
3. **Auth Issues**: Check JWT_SECRET is set
4. **DB Errors**: Verify DATABASE_URL format
5. **Deploy Fails**: Check Vercel function logs

## Project Status

### Completed ✅
- Full website implementation
- Admin panel with auth
- Database integration
- Bilingual support
- Contact form
- Image galleries
- Testimonials
- Animations
- SEO optimization
- Accessibility (WCAG 2.2 AA)
- Performance optimization
- Vercel deployment

### Known Issues
- Favicon may not show in dev (works in production)
- Database requires manual initialization
- Admin panel is desktop-optimized

## Best Practices

1. **Always build before pushing** - Catches type errors
2. **Test auth flows** - JWT expiry, logout, etc.
3. **Use semantic HTML** - Helps with SEO/a11y
4. **Optimize images** - Use WebP, proper sizes
5. **Handle loading states** - Better UX
6. **Validate all inputs** - Never trust client
7. **Use TypeScript strictly** - Prevents runtime errors
8. **Keep components focused** - Single responsibility
9. **Document complex logic** - Future you will thank you
10. **Commit working code** - Atomic commits

## Quick Reference

### Admin Access
- URL: `/admin/login`
- Credentials: Environment variables
- Features: Prices, Testimonials, Settings

### API Endpoints
- `GET /api/testimonials` - Public testimonials
- `GET/PUT /api/admin/*` - Protected admin APIs
- `POST /api/contact` - Contact form submission

### Key Files
- `src/app/[locale]/page.tsx` - Homepage
- `src/app/admin/layout.tsx` - Admin layout
- `src/lib/auth/middleware.ts` - Auth middleware
- `src/lib/db/client.ts` - Database connection

### Deployment Checklist
1. Set all env vars in Vercel
2. Initialize database schema
3. Test build locally
4. Push to main branch
5. Monitor deployment logs

Remember: This project values working code over perfect code. Ship it!