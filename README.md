# Glute Project - Private Fitness Studio

A modern, high-performance bilingual website for Glute Project fitness studio in Matosinhos, Portugal. Built with Next.js 15.4.5 and featuring a bold dark theme with enhanced mobile UX and desktop features.

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server (port 3001)
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

Visit [http://localhost:3001](http://localhost:3001) to see the development server.

## 🎯 Features

- **Bilingual Support** - Portuguese (PT_PT) default and English with automatic locale detection
- **Dark Gradient Theme** - Sophisticated visual variety with strategic gradient system
- **Mobile-First Design** - Sticky header, hamburger menu, optimized layouts
- **Desktop Features** - Infinite testimonial carousel, preserved layouts, hover effects
- **Admin Dashboard** - Manage prices, testimonials, and settings
- **Contact Form** - Direct inquiries with validation and auto-formatting
- **Gallery Modal** - Fullscreen image carousel with keyboard/touch navigation
- **Cloudinary Gallery** - Optimized image delivery with Dropbox fallback
- **Partnerships** - Regybox integration, Glute Apparel showcase
- **SEO Optimized** - Dynamic metadata and structured data
- **Performance** - 90+ Lighthouse scores across all metrics
- **Accessibility** - WCAG 2.2 AA compliant

## 📱 Mobile & Desktop Experience

### Mobile Features
- Sticky navigation header appearing at 1/3 scroll
- Hamburger menu with fullscreen overlay
- Touch gestures for gallery and testimonials
- Accordion-style service cards
- Optimized image sizes and layouts
- Responsive grids for team and lifestyle sections

### Desktop Features
- Fixed side navigation rail with section indicators
- Infinite testimonial carousel with arrow controls
- Service cards with orange glow hover effects
- Team photos with rim lighting on hover
- Keyboard navigation for gallery (arrows, ESC, F for fullscreen)
- Preserved layouts from V3 Bold Black theme

## 📄 Key Pages & Sections

- **Homepage** (`/`) - All sections with smooth scrolling
  - Hero with video background
  - Studio showcase
  - Services (PT Express, Small Group, PT Duo, Glute Apparel)
  - Testimonials carousel
  - Team members
  - Lifestyle gallery
  - Regybox partnership
  - Contact & location
- **Admin Panel** (`/admin`) - Protected dashboard
  - Login: `/admin/login`
  - Prices management
  - Testimonials management
  - Site settings

## 🏗️ Tech Stack

- **Framework**: [Next.js 15.4.5](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Neon)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Images**: [Cloudinary](https://cloudinary.com/) with Dropbox fallback
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Authentication**: JWT-based admin auth

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```env
# Database
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require

# Authentication
JWT_SECRET=your-random-32-char-string
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure-password

# Base URL
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Gallery - Cloudinary (Primary)
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Gallery - Dropbox (Fallback)
DROPBOX_REFRESH_TOKEN=your-refresh-token
```

### Database Setup

Initialize the database schema:

```bash
npm run init-db
# or manually:
npx tsx scripts/init-db.ts
```

### Gallery Setup

#### Cloudinary (Recommended)
1. Create Cloudinary account
2. Add environment variables (see above)
3. Upload images to `/glute/dia-a-dia` folder
4. Images are automatically optimized with smart cropping

#### Dropbox (Fallback)
1. Visit `/api/dropbox/auth` in your browser
2. Authorize the app with your Dropbox account
3. Copy the refresh token to `.env.local`
4. Upload images to `/dia-a-dia/optimized` folder

## 📊 Database Schema

PostgreSQL database with the following tables:

- **admin_users** - Administrator accounts with bcrypt passwords
- **prices** - Pricing tiers and plans (PT Express, Small Group, PT Duo)
- **testimonials** - Customer reviews with ratings and translations
- **site_settings** - Global settings, contact info, social links

## 🧪 Testing

```bash
# Run all tests in watch mode
npm test

# Run tests once (CI mode)
npm run test:ci

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- ContactForm.test.tsx
```

## 📦 Deployment

### Vercel (Recommended)

1. Fork this repository
2. Import to Vercel
3. Add all environment variables
4. Deploy (automatic on push to main)

### Manual Deployment

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

## 🌍 Internationalization

The site supports two languages:
- **Portuguese (PT_PT)** - European Portuguese (default)
- **English (EN)** - Secondary language

All text content is stored in translation files:
- `/src/lib/i18n/translations/pt.json`
- `/src/lib/i18n/translations/en.json`

**Important**: Always use PT_PT (European Portuguese), never PT_BR (Brazilian).

## 🎨 Design System

### Gradient Theme
Each section has a unique gradient background:
- **Hero**: Pure black (#0A0A0A)
- **Studio**: Charcoal gradient
- **Services**: Orange-tinted gradient
- **Testimonials**: Elevated charcoal with lime accents
- **Team**: Deep gradient with orange rim lighting
- **Lifestyle**: Dynamic gradient
- **Regybox**: Partnership gradient
- **Contact**: Warm conversion gradient

### Colors
- **Primary**: Orange (#FF5E1B)
- **Accent**: Lime (#E8ED4A)
- **Dark**: Gradient variations of black/charcoal
- **Text**: White on dark, dark on light backgrounds

### Typography
- **Display**: Bebas Neue
- **Body**: Oswald
- **Accent**: Barlow Condensed

### Components
- `cta-primary` - Gradient button with hover effects
- `cta-primary-light` - Light variant for dark backgrounds
- `service-card` - Orange glow on hover (desktop)
- `team-card` - Orange rim lighting
- `testimonial-quote` - Lime accent quotes
- `sticky-header` - Mobile navigation

## 📝 Content Management

### Dynamic Content (via Admin Panel)
- Pricing plans and features
- Customer testimonials
- Site settings (contact info, social links)

### Static Content (via Translation Files)
- Section headings and descriptions
- Navigation labels
- Form labels and messages
- Schedule information

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Ensure PT_PT and EN translations are added for any new text
4. Test on both mobile and desktop viewports
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style Guidelines
- TypeScript strict mode (no `any` types)
- Mobile-first responsive design
- Maximum 4-word headings
- Maximum 10-word descriptions
- Build must pass before commits
- All text must be bilingual (PT_PT/EN)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by modern fitness brands
- Built with love for the Glute Project community
- Special thanks to all trainers and members

---

**Live Site**: [glute-project.vercel.app](https://glute-project.vercel.app)

**Need Help?** Open an issue or contact the development team.