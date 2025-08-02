# Glute Project - AI Assistant Context

## Project Overview

This is a bilingual fitness studio website for Glute Project in Matosinhos, Portugal. The project follows strict TDD practices and emphasizes performance, accessibility, and conversion optimization.

## Tech Stack

- **Framework**: Next.js 15.4.5 (App Router, Turbopack)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4, CSS Modules
- **CMS**: Payload CMS v3 with PostgreSQL (Neon)
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
- `npm run payload`: Run Payload CMS commands
- `npm run seed`: Seed database with initial data

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Localized pages (pt/en)
│   ├── (payload)/         # CMS admin interface
│   └── api/               # API routes
├── components/
│   ├── sections/          # Page sections (Hero, Pricing, etc.)
│   └── ui/                # Reusable components (Button, etc.)
├── lib/
│   ├── i18n/              # Translation system
│   └── theme/             # Design tokens
├── cms/
│   └── collections/       # Payload CMS schemas
└── payload.config.ts      # CMS configuration
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

## Testing Requirements

MUST write tests BEFORE implementation:
1. Create `__tests__/ComponentName.test.tsx`
2. Mock external dependencies (next/navigation, translations)
3. Test user interactions and visual states
4. Ensure tests pass before committing

Example test structure:
```typescript
describe('ComponentName', () => {
  it('should render with correct content', () => {
    // Test implementation
  })
})
```

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
- ✅ Payload CMS with Neon Postgres
- ✅ Hero section
- ✅ Differentiators section
- ✅ Pricing section

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

- Connection string in `.env.local`
- CMS admin: `/admin`
- Default admin: admin@gluteproject.com / admin123

## Error Prevention

- Always escape special characters in bash commands
- Use proper TypeScript types (no `any` unless necessary)
- Handle loading and error states in async operations
- Validate user input on both client and server