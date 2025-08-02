# Glute Project 🏋️‍♂️

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/industriousparadigm/glute-project)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

A modern, bilingual fitness studio website for Glute Project in Matosinhos, Portugal. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring a custom admin panel and light TDD practices.

## 🎯 Project Overview

Glute Project is a premium private fitness studio offering 24/7 access, professional guidance, and a supportive community. This website serves as the primary digital presence, driving conversions through strategic CTAs and showcasing the unique value proposition.

### Key Features

- **Bilingual Support**: Full PT/EN localization with automatic routing
- **Custom Admin Panel**: JWT-authenticated content management with PostgreSQL
- **Performance Optimized**: Core Web Vitals (LCP < 2.5s, CLS < 0.1)
- **Light TDD**: Tests for critical paths (auth, API, forms)
- **Responsive Design**: Mobile-first with Tailwind CSS v4
- **Bold Brand Identity**: Black & orange design system
- **Accessibility**: WCAG 2.2 AA compliant

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
# Edit .env.local with your credentials:
# DATABASE_URL=postgres://...
# JWT_SECRET=your-secret-key
# ADMIN_EMAIL=admin@gluteproject.com
# ADMIN_PASSWORD=GluteProject2024!
# NEXT_PUBLIC_BASE_URL=http://localhost:3001

# Initialize database
npx tsx scripts/create-tables-now.ts
```

### Development

```bash
# Start development server (port 3001)
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
│   │   ├── icon.svg           # Favicon
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── sections/          # Page sections (Hero, Pricing, etc.)
│   │   └── ui/                # Reusable components
│   ├── lib/
│   │   ├── i18n/              # Translation system
│   │   ├── theme/             # Design tokens
│   │   ├── auth/              # JWT authentication
│   │   ├── db/                # Database client & schema
│   │   └── api.ts             # Content API
├── public/                    # Static assets & images
├── scripts/                   # Database & setup scripts
└── __tests__/                # Test files (alongside components)
```

## 🎨 Design System

### Brand Colors

```css
--primary: #FF5E1B;    /* Safety Orange - CTAs & energy */
--ink: #0A0A0A;        /* Near-black - Premium feel */
--accent: #D4FF41;     /* Electric Lime - Highlights */
--white: #FFFFFF;      /* Clean backgrounds */
--neutral: #F4F4F4;    /* Subtle surfaces */
```

### Typography

- **Display**: Barlow Condensed (700/800) - Bold uppercase headers
- **Body**: Inter (400/600/700) - Clean, readable content
- **Consistent spacing**: `py-20` sections, `max-w-7xl` containers

## 🌐 Features in Detail

### Bilingual Support
- Automatic locale detection and routing
- URL structure: `/pt/*` (default) and `/en/*`
- Language switcher in footer
- All content translatable via admin panel

### Admin Panel (`/admin`)
- **Authentication**: JWT tokens in httpOnly cookies
- **Content Management**:
  - Prices: Edit plans and descriptions
  - Testimonials: Manage reviews with ratings
  - Settings: Update contact info and social links
- **Beautiful UI**: Modern design with smooth interactions

### Performance Features
- Image optimization with Next/Image
- Font preloading with next/font
- Lazy loading for galleries
- Database connection pooling
- Edge Runtime compatible middleware

### Contact Form
- RegyBox integration for lead capture
- Client & server validation
- Loading states and error handling
- Success feedback

## 🧪 Testing Strategy

We follow light TDD practices:

```bash
# Run tests
npm run test           # Watch mode
npm run test:ci        # Single run

# Test coverage areas:
# - Authentication flow
# - API routes (prices, testimonials, settings)
# - Form validation
# - Critical UI components
```

### Test Example
```typescript
// Write test first for critical paths
describe('Admin Login', () => {
  it('should authenticate valid credentials', async () => {
    // Test implementation
  })
})
```

## 🚢 Deployment

### Vercel Deployment
1. Push to `main` branch triggers auto-deployment
2. GitHub Actions runs build and deploy
3. Environment variables set in Vercel dashboard

### Required Environment Variables
```env
DATABASE_URL=           # Neon PostgreSQL connection
JWT_SECRET=            # Random secure string (min 32 chars)
ADMIN_EMAIL=           # Admin login email
ADMIN_PASSWORD=        # Admin login password  
NEXT_PUBLIC_BASE_URL=  # Site URL for forms
```

### Database Setup
```bash
# Run after setting DATABASE_URL
npx tsx scripts/create-tables-now.ts
```

## 🔧 Common Tasks

### Add New Translation
1. Edit `src/lib/i18n/translations/pt.json`
2. Edit `src/lib/i18n/translations/en.json`
3. Use in component: `const { t } = useTranslations()`

### Create Admin Page
1. Add page: `src/app/admin/[feature]/page.tsx`
2. Update navigation: `src/app/admin/AdminWrapper.tsx`
3. Create API route if needed
4. Test authentication

### Update Content
1. Navigate to `/admin/login`
2. Use environment credentials
3. Edit content through UI
4. Changes reflect immediately

## 🐛 Troubleshooting

### Common Issues
- **Build fails**: Run `npm run build` locally first
- **Auth not working**: Check JWT_SECRET is set
- **DB connection fails**: Verify DATABASE_URL format
- **Favicon missing in dev**: Normal - works in production
- **Hydration errors**: Check for client-only code

### Debug Commands
```bash
# Check environment
npx tsx -e "console.log(process.env.DATABASE_URL ? 'DB OK' : 'DB Missing')"

# Test database connection
npx tsx scripts/test-connection.ts

# Clear Next.js cache
rm -rf .next
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Write tests for critical paths
4. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open Pull Request

### Development Principles
- **Light TDD**: Test critical paths first
- **Step by step**: Start simple, iterate
- **Complete features**: No TODOs or partial implementations
- **TypeScript strict**: Catch errors at compile time
- **User-focused**: Test behavior, not implementation

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) 15.4.5
- Styled with [Tailwind CSS](https://tailwindcss.com/) v4
- Database by [Neon](https://neon.tech/)
- Deployed on [Vercel](https://vercel.com/)
- Analytics by [Vercel Analytics](https://vercel.com/analytics)

---

**Live Site**: [glute-project.vercel.app](https://glute-project.vercel.app)

Built with 💪 for Glute Project - "O TEU TREINO, O TEU TEMPO"