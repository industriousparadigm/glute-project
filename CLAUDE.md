# Glute Project - AI Assistant Context

## Project Overview

This is a bilingual fitness studio website for Glute Project in Matosinhos, Portugal. The project follows strict TDD practices and emphasizes performance, accessibility, and conversion optimization.

## Tech Stack

- **Framework**: Next.js 15.4.5 (App Router, Turbopack)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4, CSS Modules
- **Database**: PostgreSQL (Neon)
- **Admin Panel**: Custom authentication-protected admin system
- **Testing**: Jest 30.x, React Testing Library 16.x
- **Localization**: Next.js i18n (PT default, EN secondary)
- **Deployment**: Vercel (auto-deploy on push to main)

## Commands

### Development
- `npm run dev`: Start development server with Turbopack
- `npm run test`: Run tests in watch mode
- `npm run test:ci`: Run all tests once (CI mode)
- `npm run lint`: Run ESLint
- `npm run build`: Build for production (ALWAYS run before pushing!)
- `npm run init-db`: Initialize database with schema and default data

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Localized pages (pt/en)
│   ├── admin/             # Admin panel interface
│   └── api/               # API routes
├── components/
│   ├── sections/          # Page sections (Hero, Pricing, etc.)
│   └── ui/                # Reusable components (Button, etc.)
├── lib/
│   ├── i18n/              # Translation system
│   ├── theme/             # Design tokens
│   ├── auth/              # Authentication system
│   ├── db/                # Database client
│   └── content-api.ts     # Content management API
└── scripts/
    └── init-db.ts          # Database initialization
```

## Design System

### Colors (MUST use these exact values)
- Primary: `#FF5E1B` (Safety Orange)
- Ink: `#0A0A0A` (Near-black)
- Accent: `#D4FF41` (Electric Lime)
- White: `#FFFFFF`
- Neutral: `#F4F4F4`

### Typography
- Display: Barlow Condensed (uppercase, bold)
- Body: Inter (400, 600, 700)

### Spacing
- Use Tailwind classes: `p-4`, `m-8`, etc.
- Sections: `py-20` (consistent vertical rhythm)

## Testing Requirements (CRITICAL - TDD MANDATORY)

### ALWAYS FOLLOW TDD - NO EXCEPTIONS!

1. **RED**: Write failing tests FIRST
2. **GREEN**: Write minimal code to pass tests
3. **REFACTOR**: Clean up code while keeping tests green

### Test First Process:
1. Create test file: `__tests__/ComponentName.test.tsx`
2. Write ALL test cases before any implementation
3. Run tests - they MUST fail (RED)
4. Implement code to pass tests (GREEN)
5. Refactor if needed (tests still pass)

### Example TDD workflow:
```typescript
// 1. FIRST: Write the test
describe('PriceCard', () => {
  it('should display price information', () => {
    render(<PriceCard price={mockPrice} />)
    expect(screen.getByText('€39.90')).toBeInTheDocument()
  })
})

// 2. Run test - it fails (component doesn't exist)

// 3. THEN: Create minimal implementation to pass
export function PriceCard({ price }) {
  return <div>{price}</div>
}

// 4. Test passes - refactor if needed
```

### Testing Rules:
- NO implementation without failing test first
- Mock all external dependencies
- Test user behavior, not implementation details
- Each component MUST have corresponding test file
- API routes need integration tests
- Database operations need unit tests

### VIOLATION = UNACCEPTABLE
Writing code before tests is a critical failure. Always TDD!

## Development Workflow

1. **TDD Cycle**: Write test → See it fail → Implement → See it pass
2. **Build Before Push**: ALWAYS run `npm run build` before pushing
3. **Commit Convention**: Use conventional commits (feat:, fix:, docs:, etc.)
4. **Bilingual Content**: Always implement both PT and EN translations

## Current Implementation Status

### Completed
- ✅ Testing framework setup
- ✅ Design system (colors, typography)
- ✅ i18n configuration
- ✅ Database setup with PostgreSQL (Neon)
- ✅ Hero section
- ✅ Differentiators section
- ✅ Pricing section (static and API-based)
- ✅ Custom admin panel with authentication
- ✅ JWT-based auth system
- ✅ Protected admin routes
- ✅ Database client with connection pooling
- ✅ Content API with database integration

### In Progress
- 🔄 CRUD API routes for content management
- 🔄 Admin UI for managing prices, testimonials, settings

### Pending
- 🔲 Facility gallery section
- 🔲 Testimonials carousel
- 🔲 Contact form with RegyBox integration
- 🔲 Location map section
- 🔲 Footer with language switcher
- 🔲 Framer Motion animations
- 🔲 Vercel Analytics
- 🔲 Performance optimization
- 🔲 Accessibility audit

## Important Notes

1. **No Mocks**: Always implement complete, working code
2. **No TODOs**: Complete implementations only
3. **Test Coverage**: Maintain high test coverage for all components
4. **Performance**: Target LCP < 2.5s, CLS < 0.1
5. **Accessibility**: WCAG 2.2 AA compliance required

## Common Patterns

### Creating a New Section
1. Create test file: `src/components/sections/__tests__/SectionName.test.tsx`
2. Create component: `src/components/sections/SectionName.tsx`
3. Export from index: `src/components/sections/index.ts`
4. Add to page: `src/app/[locale]/page.tsx`

### Adding Translations
1. Update `src/lib/i18n/translations/pt.json`
2. Update `src/lib/i18n/translations/en.json`
3. Use in component: `const { t } = useTranslations()`

## Database Access

- Connection string in `.env.local` (DATABASE_URL)
- Admin panel: `/admin`
- Default admin: admin@gluteproject.com / admin123
- JWT secret: Set JWT_SECRET in production

### Database Schema
- `admin_users`: Authentication for admin panel
- `prices`: Pricing plans with localized content
- `testimonials`: Customer reviews with translations
- `site_settings`: Global configuration values

## Error Prevention

- Always escape special characters in bash commands
- Use proper TypeScript types (no `any` unless necessary)
- Handle loading and error states in async operations
- Validate user input on both client and server