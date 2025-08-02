# Agent Brief — **Polish Sprint v2** for Glute Project

> **Objective:** Replace the existing MVP front‑end & admin UI with a visually cohesive, high‑contrast, brand‑true experience that converts visitors and is accessible WCAG 2.2 AA.

---
## 1  Blocking Issues to Fix
1. **Low‑contrast text:** Any text < 4.5:1 contrast ratio must be recolored. Use the color tokens defined below and run `@axe-core/react` tests in CI.
2. **Inconsistent buttons:** Remove secondary outlines for now. One primary CTA style only — solid orange (#FF5E1B) with white label; 8 px radius; medium shadow on hover.
3. **Misaligned grids:** Every section uses a 12‑col fluid grid (max‑width 1200 px; gutter 24 px). All cards & images snap to this grid.
4. **Wrong contact info & address:**
   * **Address:** _Rua Dr. Afonso Cordeiro, 109 \| 4450‑001 Matosinhos, Portugal_
   * **Phone:** `+351 912 345 678`
   * **Email:** `info@gluteproject.com`
   * **WhatsApp deep‑link:** `https://wa.me/351912345678`
5. **Admin contrast:** Input text is invisible (white on white). Use theme tokens and 1 px inner shadow for focus.

---
## 2  Design System Refresh
### 2.1  Color Tokens  
| Token | Hex | Usage |
|-------|-----|-------|
| `brand.orange` | **#FF5E1B** | CTA fills, links, icons |
| `brand.black` | #0A0A0A | Primary background, hero text |
| `brand.lime`  | #D4FF41 | Accent highlights (max 10 % coverage) |
| `gray.900` | #111111 | Dark surface |
| `gray.50`  | #F4F4F4 | Light surface |
| `offwhite` | #FFF9F4 | Alternate section bg |
| `white` | #FFFFFF | Text on dark, surfaces |

### 2.2  Typography
* **Display:** `"Barlow Condensed", sans‑serif; 700`.  
  *Scale:* 72/64/48/32 px heading steps using `clamp()`.
* **Body:** `Inter 400/600` – 18 px base line height 1.6.

### 2.3  Components
* **Button (Primary)**  
  `inline‑flex items‑center gap‑2 px‑6 py‑3 bg-[brand.orange] text-[white] rounded-[8px] shadow transition hover:scale-[1.02] focus:ring`
* **Card**  
  Rounded‑12, shadow‑lg, border‑gray‑200.
* **Section wrapper**  
  `py‑24 md:py‑32` + dark/light bg alternate, always id‑anchored for nav.

### 2.4  Motion
* Use Framer‑Motion `<motion.section initial="{ opacity:0, y:32 }" whileInView="{ opacity:1, y:0 }" transition="{ duration:0.35 }" />`  
* Respect `prefers‑reduced‑motion`.

---
## 3  Page Structure (single page)
1. **Hero** – Black bg, full‑bleed background video/image overlayed with headline: _“O Teu Treino · O Teu Tempo”_ \| _“Train on Your Time”_. Single CTA **Agendar Visita**.
2. **Differentiators** – 4 icon + copy columns (Trainer Guidance, Nutrition & Physio, 24/7 Access, Community). Replace emojis with Lucide icons in orange.
3. **Facility Gallery** – Masonry grid (6 photos) with lazy‑loaded IG images.
4. **Prices & Trial** – 3 plan cards. Primary “Free First Session” card highlighted (orange border). All CTA buttons identical.
5. **Community Stories** – Testimonial slider (contrast‑safe white card on off‑white bg). Add 5 seed testimonials in PT & EN.
6. **Location** – Google Maps iframe + 3 info cards (address \| parking \| public transport). Follow color tokens.
7. **Schedule a Visit** – Split layout: left form (inputs dark — gray.900 bg, white text); right quick actions (WhatsApp, Call) using brand orange for icons.
8. **Footer** – Dark (#0A0A0A) bg, orange _GLUTE PROJECT_ logotype, columns for contact, opening hours, socials, legal, language toggle.

---
## 4  Admin UI Guidelines
* Reuse same token system (light mode default).  
* Inputs: `bg‑white text‑gray‑900 border‑gray‑300 rounded‑md`.
* Primary buttons identical to public site.
* Validate contrast with storybook‑addon‑a11y.

---
## 5  Required Checks Before PR merge
- [ ] `npm run test:a11y` passes (axe, jest‑dom).  
- [ ] All lighthouse scores ≥ 95.  
- [ ] Page snapshot reviewed at 375 px, 768 px, 1280 px.  
- [ ] CI unit tests for contact form + i18n routing.  
- [ ] Environment variables documented in `README`.

---
## 6  Delivery Notes
* Push revision as `polish‑sprint‑v2` branch and open PR.  
* Seed CMS with placeholder photos and testimonials so owner can update.
* Demo link: `https://gluteproject‑v2.vercel.app` (auto‑deploy from branch).

👉 **When all boxes are green, request design review.**

