# Glute Project 🏋️‍♂️

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/industriousparadigm/glute-project)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

A modern, bilingual fitness studio website for Glute Project in Matosinhos, Portugal. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring a custom admin panel and comprehensive testing.

## 🎯 Project Overview

Glute Project is a premium private fitness studio offering 24/7 access, professional guidance, and a supportive community. This website serves as the primary digital presence, driving conversions through strategic CTAs and showcasing the unique value proposition.

### Key Features

- **Bilingual Support**: Full PT/EN localization with automatic routing
- **Custom Admin Panel**: Secure content management system with PostgreSQL
- **Performance First**: Optimized for Core Web Vitals (LCP < 2.5s, CLS < 0.1)
- **Test-Driven Development**: 100% test coverage for critical components
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Brand Identity**: Bold black & orange design system

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

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# Initialize database
npm run db:migrate
```

### Development

```bash
# Start development server
npm run dev

# Run tests in watch mode
npm run test

# Run all tests once
npm run test:ci

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
glute-project/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── [locale]/          # Localized routes
│   │   ├── admin/             # Admin panel routes
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── sections/          # Page sections
│   │   └── ui/                # Reusable UI components
│   ├── lib/                   # Utilities and configs
│   │   ├── i18n/              # Internationalization
│   │   ├── theme/             # Design system
│   │   ├── auth/              # Authentication system
│   │   └── db/                # Database client
├── public/                    # Static assets
├── scripts/                   # Build and setup scripts
└── tests/                     # Test utilities
```

## 🎨 Design System

### Colors

- **Primary**: `#FF5E1B` (Safety Orange) - Energy & action
- **Ink**: `#0A0A0A` (Near-black) - Premium feel
- **Accent**: `#D4FF41` (Electric Lime) - Highlights
- **White**: `#FFFFFF` - Clean backgrounds
- **Neutral**: `#F4F4F4` - Subtle surfaces

### Typography

- **Display**: Barlow Condensed - Bold, uppercase headers
- **Body**: Inter - Clean, readable content

## 🌐 Internationalization

The site supports Portuguese (default) and English:

- Routes automatically redirect to locale prefix: `/pt/*` or `/en/*`
- Content managed through CMS with field-level localization
- Language switcher available in footer

## 📊 Admin Panel Access

Access the custom admin panel at `/admin`

Default credentials (development):
- Email: admin@gluteproject.com
- Password: admin123

### Content Management

- **Prices**: Manage pricing plans and offers
- **Testimonials**: Add and edit member reviews
- **Site Settings**: Update contact information and details

## 🧪 Testing

We follow Test-Driven Development (TDD) practices:

```bash
# Run specific test file
npm run test:ci src/components/sections/__tests__/Hero.test.tsx

# Run tests with coverage
npm run test -- --coverage

# Run linting
npm run lint
```

## 🚢 Deployment

The project auto-deploys to Vercel on push to main branch.

### Environment Variables

Required for production:
```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Build Command

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Write tests for your changes
4. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Commit Convention

We follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Test additions/changes
- `refactor:` Code refactoring

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database hosted on [Neon](https://neon.tech/)
- Deployed on [Vercel](https://vercel.com/)

## 📞 Contact

For project inquiries, contact the development team at [GitHub Issues](https://github.com/industriousparadigm/glute-project/issues).

---

Built with 💪 for Glute Project - "O TEU TREINO O TEU TEMPO"