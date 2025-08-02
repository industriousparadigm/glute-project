Below is a concise yet thorough product brief that your “build-the-site” AI agent can follow without second-guessing the vision, UX, or tech stack.

> **TL;DR** – A single-page, bilingual (PT ⇆ EN) Next.js site that mirrors Glute Project’s bold black-&-orange identity, conveys its “guided-but-friendly” training philosophy, and drives phone/WhatsApp bookings.  It will ship with a free Vercel + Neon (Postgres) back-end, a Payload CMS for easy edits, Framer-Motion micro-interactions, WCAG-2.2 accessibility, and Core-Web-Vitals-grade performance.

---

## 1. Goals & Success Metrics

* **Primary KPI:** number of “Schedule a Visit” conversions (call / WhatsApp / RegyBox form).
* **Secondary KPIs:** site sessions, click-throughs to Instagram, and email enquiries captured by Vercel Web Analytics’ free hobby tier([Vercel][1]) or Plausible (GDPR-friendly)([Plausible Analytics][2]).
* **Traffic Benchmarks:** target “good” Core Web Vitals (LCP < 2.5 s, CLS < 0.1) per Google guidance([web.dev][3]).

## 2. Audience & Brand Voice

* **Core audience:** Portuguese locals + English-speaking expats in Matosinhos seeking a trainer-guided, community-oriented alternative to big-box gyms.
* **Value prop (one-liner, PT):** “Treina com acompanhamento profissional 24/7 num estúdio privado que se torna a tua comunidade.”
* **Tone:** balanced grit & warmth – motivational (“Vamos queimar!”) yet supportive (“Estamos contigo em cada repetição”). Fitness brand research shows orange evokes energy, friendliness, and confidence([stellendesign.com][4], [Slow Dance Studio][5]).

## 3. Information Architecture (single-page scroll)

1. **Hero** – full-bleed video or slideshow, headline overlay, dual-language CTA buttons.
2. **What Makes Us Different** – trainer-guided workouts, nutrition + physio support, 24 h access.
3. **Facility & Equipment** – image gallery (50+ machines, 500 m²).
4. **Community Stories** – Instagram testimonial carousel.
5. **Pricing & Trial Offer** – simple cards; “Primeira sessão gratuita”.
6. **Schedule a Visit** – native form hooked to RegyBox API; phone & WhatsApp quick links.
7. **Location** – embedded map, address, parking tips.
8. **Footer** – social links, legal, language switcher.

## 4. Visual & UX Style Guide

### Palette

| Role    | Color                       | Notes                                              |
| ------- | --------------------------- | -------------------------------------------------- |
| Primary | **#FF5E1B (Safety Orange)** | Energy & action([Chamber Of Commerce][6])          |
| Ink     | #0A0A0A                     | Near-black background                              |
| Accent  | **#D4FF41 (Electric Lime)** | Echoes “Matosinhos” poster highlight([WodGuru][7]) |
| Neutral | #FFFFFF & #F4F4F4           | Text / surfaces                                    |

### Typography

* **Display:** *Barlow Condensed* or *Bebas Neue* (wide uppercase aesthetics common in gym sites([MotoPress][8])).
* **Body:** *Inter* 400/600 for legibility.

### Imagery

* Authentic IG shots showing members, trainers, and community events (rights cleared).
* Use high-contrast B\&W backgrounds with orange typography overlays (see brand posts).

### Micro-interactions

* Framer-Motion for hover lifts, fade-in sections, loading bar motif (mirroring storefront poster)([Framer][9]).
* Keep motion durations ≤ 300 ms and respect `prefers-reduced-motion`.

### Accessibility & Contrast

* Meet WCAG 2.2 AA contrast (≥ 4.5:1 for text) and keyboard focus styles([W3C][10]).

## 5. Tech Stack

| Area           | Choice                                                                                        | Rationale                                                                                                                                                  |
| -------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**  | Next.js ≥ 14 (App Router)                                                                     | Built-in i18n routing([Next.js][11]), React 19 ready                                                                                                       |
| **Hosting**    | Vercel Hobby                                                                                  | SSL, edge CDN, Analytics free tier([Vercel][1])                                                                                                            |
| **DB**         | Neon Postgres (Vercel-managed integration)                                                    | Serverless branches per preview deploy([Neon][12], [Neon][13])                                                                                             |
| **Admin**      | **Custom Admin Panel** with JWT auth + Postgres                                               | Built into `/app/admin`, secure authentication, field-level localization, direct database integration                                                       |
| **Storage**    | Vercel Blob for media (or direct S3 integration)                                              |                                                                                                                                                            |
| **Animations** | Framer-Motion (React)                                                                         | Lightweight, declarative micro UX([Framer][17])                                                                                                            |
| **Analytics**  | Start with Vercel; upgrade to Plausible for GDPR privacy if desired([Plausible Analytics][2]) |                                                                                                                                                            |

## 6. Localization Strategy

* Configure `next.config.js` with `locales: ['pt', 'en'], defaultLocale: 'pt'` for automatic i18n routing([Next.js][18]).
* Store translations in `locales/{lang}.json`; Admin panel provides field-level localization for content editors.

## 7. Performance & SEO

* Optimise images with `next/image` & `srcset`; generate blurred placeholders.
* Defer non-critical Framer Motion bundles (`dynamic import`).
* Follow web.dev Web-Vitals guide for LCP, FID, CLS budgets([web.dev][19]).
* Add structured data (LocalBusiness, OpeningHours) for local SEO.

## 8. Measurement & Observability

* Track primary CTA clicks (tel:, whatsapp: links, form submits).
* Configure Vercel Analytics event filters; add UTM tagging for Instagram swipe-ups.
* Weekly email digest via Plausible (if adopted) for owner.

## 9. Deliverables for the AI Agent

1. **Next.js project scaffolding** with App Router, Tailwind, ESLint, Prettier.
2. **Custom admin panel** inside `/app/admin` with database tables: `admin_users`, `prices`, `testimonials`, `site_settings`.
3. **Database schema** migrations for Neon.
4. **Localization files** (PT default, EN fallback).
5. **Reusable components**: Hero, Section, Gallery, TestimonialSlider, CTAButton (Framer-Motion presets).
6. **CI/CD config** – preview branches auto-provision Neon branch & seed data.
7. **Accessibility checks** via `@axe-core/react` in dev.
8. **README** with setup, `.env.example`, and owner instructions for admin panel login.

This brief should give your execution agent a crystal-clear blueprint—from brand vibe to pixel-level UX to infra choices—so it can spin up a performant, stylish, and conversion-focused web presence for Glute Project. Boa construção!

[1]: https://vercel.com/docs/analytics/limits-and-pricing?utm_source=chatgpt.com "Pricing for Web Analytics"
[2]: https://plausible.io/vs-google-analytics?utm_source=chatgpt.com "What makes Plausible a great Google Analytics alternative"
[3]: https://web.dev/articles/top-cwv?utm_source=chatgpt.com "The most effective ways to improve Core Web Vitals | Articles"
[4]: https://www.stellendesign.com/colors-for-fitness-branding/?utm_source=chatgpt.com "Colors For Fitness Branding"
[5]: https://slowdancestudio.com/blog/the-psychology-of-colour?utm_source=chatgpt.com "Colour Theory and Psychology for Branding"
[6]: https://www.chamberofcommerce.org/guide-to-color-psychology-marketing/?utm_source=chatgpt.com "Guide to Color Psychology in Marketing"
[7]: https://wod.guru/blog/gym-website-design/?utm_source=chatgpt.com "10 Best Gym Website Design Ideas to Stand Out in 2025"
[8]: https://motopress.com/blog/gym-website-design/?srsltid=AfmBOoquYSabAIeu-objQycgYv0XpcwFOwgNaTRmzGxaW6CaR4TD6JgJ&utm_source=chatgpt.com "21 Gym Website Design Inspirations, Examples, and Ideas"
[9]: https://www.framer.com/motion/animation/?utm_source=chatgpt.com "React animation | Motion for React (prev Framer Motion)"
[10]: https://www.w3.org/TR/WCAG22/ "Web Content Accessibility Guidelines (WCAG) 2.2"
[11]: https://nextjs.org/docs/pages/guides/internationalization?utm_source=chatgpt.com "Guides: Internationalization - Next.js"
[12]: https://neon.tech/docs/guides/vercel-postgres?utm_source=chatgpt.com "Integrating Neon with Vercel - Neon Docs"
[13]: https://neon.tech/blog/neon-vercel-native-integration?utm_source=chatgpt.com "Vercel Native Integration: Create a Neon Branch Per Preview"
[14]: https://payloadcms.com/?utm_source=chatgpt.com "Payload: The Next.js Headless CMS and App Framework"
[15]: https://payloadcms.com/posts/blog/payload-30-the-first-cms-that-installs-directly-into-any-nextjs-app?utm_source=chatgpt.com "Payload 3.0: The first CMS that installs directly into any ..."
[16]: https://strapi.io/?utm_source=chatgpt.com "Strapi - Open source Node.js Headless CMS"
[17]: https://www.framer.com/blog/web-design-trends/?utm_source=chatgpt.com "7 emerging web design trends for 2025 | Professional UX ..."
[18]: https://nextjs.org/docs/app/guides/internationalization?utm_source=chatgpt.com "Guides: Internationalization - Next.js"
[19]: https://web.dev/articles/vitals?utm_source=chatgpt.com "Web Vitals | Articles"
