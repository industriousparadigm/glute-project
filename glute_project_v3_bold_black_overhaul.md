# **V3 – “Bold & Black” Overhaul**

> **Mission Update:**  We’re turning the MVP into a visceral, brand‑driven experience.  Think _dark‑mode battle station_ where orange and electric‑lime accents slice through the black, copy is trimmed to fighting weight, and every scroll snap hits like a rep PR.

---
## 0  Guiding Principles
| Principle | What It Means | Implementation Hook |
|-----------|---------------|----------------------|
| **All‑Black Canvas** | 100 % dark surfaces (#0A0A0A / #111) – no light sections at all | body `bg-brand.black`; alt sections `bg-gray.900` |
| **Punchy Copy** | Max 4‑word headings, sub‑copy ≤ 10 words | Review all strings in `locales/*` |
| **Visual Rhythm** | Scroll‑snap sections; vertical nav dots show progress | Tailwind `scroll-snap-y`, Framer `<motion.div>` |
| **High Contrast** | Orange (#FF5E1B) & Lime (#E8ED4A) accents meet 4.5:1 | Re‑run axe tests |
| **Micro‑Motion** | 250 ms sweep line / icon flicker on viewport enter | `whileInView` animations |

---
## 1  Layout Blueprint (Single Page)
1. **Hero**  
   * Full‑viewport `hero-bg.png` (cover) with 80 % black overlay.  
   * Logo ⟶ big tagline (PT | EN) ⟶ **single** CTA.
2. **Nav Rail**  
   * Sticky right‑side `<ul>` – 6 orange bullets (`w-2 h-2`).  
   * Active bullet scales ×1.8 & shows label on hover/focus.
3. **Why Glute Project**  
   * Four cards, icon 56 px stroke‑orange, heading white, sub‑copy lime bullet list.  
   * Copy example:  _“Treino guiado” · “Nutri/Physio” · “24 h” · “Comunidade”_.
4. **Gallery Mosaic**  
   * Keep masonry but overlay each img with subtle black gradient + caption on hover.
5. **Testimonials Strip**  
   * Horizontal auto‑scroll (3 cards visible).  
   * Card: black background, orange quote glyph, lime star row.
6. **Plans**  
   * 3 equal‑width transparent cards.  
   * “Free Trial” card has glowing orange border (`shadow-[0_0_20px_#FF5E1B]`).  
   * Align heading & button baseline with CSS grid.
7. **Schedule a Visit**  
   * 2‑column: left quick CTA stack (WhatsApp / Call) big & orange; right collapsible inline form (“Quero formulário” link).  
   * Drops section height by 35 %.
8. **Map / Info**  
   * Reverse order on mobile (info first).  
   * Reduce map to `h-64` desktop, `h-48` mobile.
9. **Footer Lite**  
   * One row, four columns.  
   * Kill subtitles; show icons + labels only.  
   * Language switcher becomes globe icon → dropdown.

---
## 2  Design Tokens Update
| Token | Hex | Use | WCAG Ratio (on #0A0A0A) |
|-------|-----|-----|---------------------------|
| `accent.orange` | **#FF5E1B** | CTAs, icons, h1 | 4.78 ✔︎ |
| `accent.lime`   | **#E8ED4A** | Highlight words | 4.62 ✔︎ |
| `text.white`    | #FFFFFF | Body on black | 21 ✔︎ |
| `text.gray`     | #B4B4B4 | Muted / metadata | 6.3 ✔︎ |

---
## 3  Component Specs
### 3.1  Heading Block
```tsx
<Heading level={1} className="font-barlow text-orange text-[clamp(2.5rem,6vw,6rem)] leading-tight uppercase tracking-tight" />
```
Orange sweep line animates from left on intersection.

### 3.2  Button (Primary)
`class="inline-flex gap-2 px-7 py-3 rounded-lg bg-orange text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"`

### 3.3  Testimonial Card
`bg-gray-900 p-8 rounded-xl w-80 shrink-0 snap-start`  
Includes orange quotation mark icon absolutely positioned top‑left.

---
## 4  Copy Pass (PT Examples)
| Section | Old | **New** |
|---------|-----|---------|
| Hero H1 | _O TEU TREINO · O TEU TEMPO_ | **TREINA. EVOLVE.** |
| Hero sub | _Treina com acompanhamento profissional 24/7_ | **24/7 · SEM DESCULPAS** |
| CTA | _Agendar Visita_ | **MARCA JÁ** |

*(Apply same brevity to EN locale.)*

---
## 5  Dev Tasks
1. **Purge all light sections** – audit tailwind classes.
2. Implement **scroll‑snap** (`snap-y snap-mandatory`) on the main wrapper.
3. Build **NavRail** React comp with Framer scrollProgress.
4. Swap testimonial slider to **keen-slider** with `loop` & `slidesPerView:3`.
5. Add **hover captions** to gallery via `group-hover` utilities.
6. Fix **pricing grid** – CSS grid `auto-fit minmax(270px,1fr)`.
7. Compress **contact/map** section as described.
8. Re‑seed CMS strings with tightened copy.
9. Axe + Lighthouse ≥ 95 again.

When shipped, this should feel punchy, on‑brand, and void of filler – just like a killer workout session. **Go build & ship.**

