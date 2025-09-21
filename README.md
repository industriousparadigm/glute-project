# Glute Project - Private Fitness Studio

A modern, high-performance bilingual website for Glute Project fitness studio in Matosinhos, Portugal. Built with Next.js 15.4 and featuring a bold dark theme optimized for conversion.

![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

Visit [http://localhost:3001](http://localhost:3001) to see the development server.

## 🎯 Features

- **Bilingual Support** - Portuguese (default) and English with automatic locale detection
- **Dark Gradient Theme** - Sophisticated visual variety with strategic gradient system
- **Admin Dashboard** - Manage prices, testimonials, and settings
- **Contact Form** - Direct inquiries with validation
- **Gallery Modal** - Fullscreen image carousel with keyboard/touch navigation
- **Dropbox Gallery** - Live photo integration from Dropbox folder
- **Google Reviews** - Sync with Google My Business
- **Mobile Optimized** - Different layouts and images for mobile devices
- **SEO Optimized** - Dynamic metadata and structured data
- **Performance** - 90+ Lighthouse scores across all metrics
- **Accessibility** - WCAG 2.2 AA compliant

## 📱 Key Pages

- **Homepage** - Hero, studio showcase, testimonials, pricing, contact
- **Admin Panel** - `/admin` - Protected area for content management
  - Login: `/admin/login`
  - Prices: `/admin/prices`
  - Testimonials: `/admin/testimonials`
  - Settings: `/admin/settings`

## 🏗️ Tech Stack

- **Framework**: [Next.js 15.4](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Neon)
- **CMS**: [Payload CMS](https://payloadcms.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Deployment**: [Vercel](https://vercel.com/)

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

# Optional: Google Places API
GOOGLE_PLACES_API_KEY=your-api-key
GOOGLE_PLACE_ID=your-place-id

# Optional: Instagram
INSTAGRAM_ACCESS_TOKEN=your-token
INSTAGRAM_USER_ID=your-id

# Dropbox Gallery
DROPBOX_REFRESH_TOKEN=your-refresh-token
```

### Database Setup

Initialize the database schema:

```bash
npx tsx scripts/create-tables-now.ts
```

### Dropbox Gallery Setup

1. Visit `/api/dropbox/auth` in your browser
2. Authorize the app with your Dropbox account
3. Copy the refresh token to `DROPBOX_REFRESH_TOKEN` in `.env.local`
4. Upload images to `/dia-a-dia/optimized` folder in your Dropbox app folder

## 📊 Database Schema

The application uses PostgreSQL with the following tables:

- **admin_users** - Administrator accounts
- **prices** - Pricing tiers and plans
- **testimonials** - Customer reviews
- **site_settings** - Global settings and contact info

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- ContactForm.test.tsx
```

## 📦 Deployment

### Vercel (Recommended)

1. Fork this repository
2. Import to Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Use credentials from environment variables
3. Manage content through the dashboard

## 🎨 Design System

The project uses a sophisticated dark gradient system:

- **Visual Rhythm**: Strategic gradients create depth while maintaining dark aesthetic
- **Colors**: Dark gradients with Orange (#FF5E1B) and Lime (#E8ED4A) accents
- **Typography**: Bebas Neue (display), Oswald (body), Barlow Condensed (accents)
- **Spacing**: 8px grid system
- **Animations**: Enhanced CTAs, card glows, hover effects with Framer Motion
- **Mobile**: Simplified gradients for optimal performance

## 📝 Content Management

Content can be managed in two ways:

1. **Admin Panel** - For dynamic content (prices, testimonials, settings)
2. **Translation Files** - For static content (`src/lib/i18n/translations/`)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by modern fitness brands
- Built with love for the Glute Project community
- Special thanks to all contributors

---

**Live Site**: [glute-project.vercel.app](https://glute-project.vercel.app)

**Need Help?** Open an issue or contact the development team.