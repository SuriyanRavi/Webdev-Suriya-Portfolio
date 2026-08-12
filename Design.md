# Design.md — "Kinetic Grid" Developer Portfolio System

> An original, reusable UI system for a code-forward, motion-forward personal
> portfolio. Inspired by the *category* of modern dark-mode developer
> portfolios (bold hero statement, tech-stack chips, marquee footer, service
> tiles, timeline-style experience) — no content, copy, imagery, or brand
> assets are reused from any reference site. Everything below is abstract
> and meant to be filled in with a new person's real content.

---

## 1. Visual System Overview

**Aesthetic goals**
- **Confident and quiet at once**: one oversized editorial headline per
  section, generous negative space around it, everything else recedes.
- **Grid-disciplined**: a strict 12-column grid with consistent gutters so
  that "random" motion still lands on rails.
- **Dark-first, light-capable**: a near-black canvas with a single high-
  energy accent color used sparingly, like a highlighter, not a paint can.
- **Subtle kinetic energy**: content breathes in on scroll, hovers respond
  in under 200ms, nothing loops forever except one intentional marquee.
- **Engineering credibility**: monospace accents for metadata (dates, tech
  names, labels) signal "this person writes code," without turning the
  whole site into a terminal pastiche.

**Non-goals**: skeuomorphism, gradients-as-decoration, more than one accent
hue, autoplaying video, dense multi-column text blocks.

---

## 2. Layout System

**Grid**: 12-column, max content width `1280px`, gutter `24px`, outer
margin `clamp(20px, 5vw, 96px)`. All sections share this rail even when a
section visually breaks out (e.g., a full-bleed marquee).

**Vertical rhythm**: base spacing unit `8px`. Section padding uses the
scale `96 / 128 / 160` (mobile / tablet / desktop) between major sections.

### Header / Navigation
- Fixed/sticky, height `72px`, transparent over hero, gains a blurred
  surface (`backdrop-filter: blur(12px)`, translucent surface color) after
  `~40px` of scroll.
- Left: wordmark or monogram (2–3 letters, monospace, bold).
- Center or right: 4–5 text links (Home, Work, About, Experience, Contact).
- Far right: one primary CTA button ("Let's Talk" / "Book a Call") that is
  visually distinct from the nav links at all times.
- Mobile: collapses to a monogram + single hamburger triggering a full-
  screen overlay menu with large stacked links.

### Hero Section
- Two-zone layout on desktop: an oversized headline (left, ~60% width) and
  a supporting identity block (right, ~40%) — portrait/avatar with a
  status pill ("Open to work," "Available for freelance"), name, role line.
- Headline is 3–5 words wrapped across 2 lines, one line in the accent
  color or accent underline/highlight treatment.
- Below the headline: a one-sentence role/value statement in body-large
  type, plus two CTAs (primary: "Let's Connect"; secondary: "Email me" or
  "Download résumé").
- A thin marquee/ticker strip or scroll-cue sits at the very bottom edge
  of the hero, anchoring it to the next section.
- Mobile: stacks vertically, avatar first or headline first (test both),
  full-width CTAs.

### "How I Work" / Process Strip (optional secondary hero block)
- A horizontally auto-scrolling (marquee-style, pausable on hover/focus)
  row of 5–6 small process cards ("Discovery," "Design," "Build,"
  "Integrate," "Test," "Support"). Each card: icon or number, 3–5 word
  title, one-line description. Purely decorative motion — content is not
  hidden behind it (also rendered statically for reduced-motion users).

### Project Grid
- Section intro: small monospace eyebrow label + large section heading.
- Grid: 1 column mobile, 2 columns tablet, up to 2–3 columns desktop
  depending on card density; alternatively a single-column "stacked
  feature list" of 4–6 flagship projects, each with a large thumbnail.
- Each `ProjectCard` (see §5) shows: cover image, title, one-line
  description, a row of tech chips (max 4 visible + "+N more"), and a
  "View Project ↗" link.
- An optional **ProjectDetail** expanded/modal view shows: longer
  description, bullet list of highlights, full tech chip row, and an
  external link.
- Section ends with a secondary CTA: "View all projects →".

### About Section
- Two-column: short narrative bio (3–4 short paragraphs or a few punchy
  lines) beside a stat block or tech-stack constellation (grid/marquee of
  tool logos or skill chips).
- Optional pull-quote or personal-values line set in the display headline
  type at a smaller size, used as a section divider.

### Experience / Timeline Section
- Vertical timeline or accordion list, most-recent first.
- Each entry: company/role, date range, location/remote tag, 1-sentence
  summary, 3–5 metric highlights (short stat + label), expandable list of
  responsibilities, and a row of technology chips.
- Entries default collapsed to summary + metrics on mobile; expandable on
  click/tap. Desktop may show the first entry expanded by default.

### "Beyond the Day Job" Section (optional)
- 1–2 wide cards for side ventures (agency, community, content, open
  source) — logo, short description, 2–3 stat pairs, single CTA link.

### Services / What I Offer
- 3–5 compact tiles in a responsive grid, each: icon/emoji glyph, short
  title, one-line description, subtle "Learn more →" text link (can be
  inert until real content exists).

### Contact Section
- Large, centered or left-aligned closing headline ("Let's build
  something") + short supporting line.
- Contact form OR direct contact chips (email, WhatsApp/phone, socials) —
  MVP ships a working `mailto:` + social links; a real form is a stated
  extension point (see Master Prompt).
- Availability/status indicator reused from hero (single source of truth).

### Footer
- Full-bleed marquee of the person's name + role, repeated, at large
  display scale, low-opacity or outlined text — decorative, aria-hidden.
- Below marquee: 3-column layout — identity + tagline, sitemap links,
  contact/social links.
- Bottom bar: copyright, "Built with [stack]" microcopy, back-to-top
  control.

---

## 3. Typography

Two-family system: one **Display/Headline** family with strong
personality, one **Body/UI** family optimized for legibility, plus a
**Mono** family for metadata, code, tags, and labels.

| Role | Family (suggested) | Fallback stack |
|---|---|---|
| Display / Headings | `Clash Display`, `General Sans`, or `Inter Tight` (any confident geometric sans or grotesk) | `system-ui, sans-serif` |
| Body / UI | `Inter`, `Satoshi`, or `Manrope` | `system-ui, sans-serif` |
| Mono / labels / code | `JetBrains Mono`, `IBM Plex Mono`, or `Space Mono` | `ui-monospace, SFMono-Regular, monospace` |

**Type scale** (fluid, `clamp()`-based; desktop max shown):

| Token | Size (desktop) | Size (mobile min) | Weight | Line-height | Usage |
|---|---|---|---|---|---|
| `display-xl` | 96px | 40px | 600–700 | 1.02 | Hero headline |
| `display-lg` | 64px | 32px | 600 | 1.05 | Section headings |
| `display-md` | 40px | 26px | 600 | 1.1 | Sub-section headings, pull-quotes |
| `body-lg` | 20px | 17px | 400–500 | 1.5 | Hero subtext, intro paragraphs |
| `body-md` | 16px | 15px | 400 | 1.6 | Standard body copy |
| `body-sm` | 14px | 13px | 400 | 1.5 | Card descriptions, secondary text |
| `mono-label` | 13px | 12px | 500 | 1.4 | Eyebrows, tags, dates, chips (uppercase, tracked +0.04em) |
| `mono-micro` | 11px | 11px | 500 | 1.3 | Footnotes, badges |

Letter-spacing: display tokens `-0.02em` (tight); mono tokens `+0.03–0.06em`
(tracked, often uppercase).

---

## 4. Color Palette

Dark-first palette with a single accent hue and a light-mode mirror. Values
below are an example token set (swap the accent hue per brand without
breaking contrast rules).

### Dark theme (default)
| Token | Hex | Usage |
|---|---|---|
| `bg-canvas` | `#0A0A0C` | Page background |
| `bg-surface` | `#131316` | Cards, nav-on-scroll, panels |
| `bg-surface-raised` | `#1B1B1F` | Modals, hovered cards |
| `border-subtle` | `#2A2A2F` | Hairlines, card borders |
| `text-primary` | `#F5F5F7` | Headlines, primary body |
| `text-secondary` | `#A1A1AA` | Supporting copy, metadata |
| `text-tertiary` | `#6B6B72` | Placeholder, disabled |
| `accent` | `#C6FF3D` (electric lime — swap freely) | CTAs, links, highlights, focus rings |
| `accent-contrast-text` | `#0A0A0C` | Text placed on top of `accent` |
| `accent-muted` | `#C6FF3D` @ 12% opacity | Tag/chip backgrounds, subtle fills |
| `success` | `#3DDC84` | Status pill ("Available") |
| `danger` | `#FF5C5C` | Form errors |

### Light theme (mirror)
| Token | Hex |
|---|---|
| `bg-canvas` | `#FAFAF9` |
| `bg-surface` | `#FFFFFF` |
| `border-subtle` | `#E5E5E5` |
| `text-primary` | `#111113` |
| `text-secondary` | `#5B5B62` |
| `accent` | `#5B8A00` (darkened lime for AA contrast on white) |

**Contrast targets**: body text ≥ 4.5:1 against its background (WCAG AA);
large display text (≥24px/700 or ≥ 31px) ≥ 3:1; the accent color is never
used for body-length text on the canvas background — only for short
labels, links (with underline), icons, and filled buttons where the
contrast pairing above is verified ≥ 4.5:1 for button text.

---

## 5. UI Components

### Buttons
- **Primary**: filled `accent` background, `accent-contrast-text` label,
  fully rounded or `8px` radius (pick one and stay consistent), `12px 24px`
  padding, mono or semi-bold label, subtle scale (1.0 → 1.02) + brightness
  lift on hover, 150ms ease-out.
- **Secondary**: transparent fill, `1px border-subtle`, `text-primary`
  label; hover swaps border to `accent` and text to `accent`.
- **Ghost/text link**: no border, underline on hover, used for "View
  Project ↗" and "Learn more →" patterns. Arrow glyph nudges `4px` right
  on hover.
- States required: default, hover, focus-visible (2px accent outline,
  2px offset), active (scale 0.98), disabled (40% opacity, no pointer).

### Cards (`ProjectCard`, service tile, timeline entry)
- Base: `bg-surface`, `1px border-subtle`, radius `16px`, padding
  `24–32px`.
- Hover: border brightens to `border-subtle` +20% lightness or to
  `accent-muted`; image (if present) scales `1.0 → 1.04` inside an
  `overflow: hidden` frame; card lifts with `translateY(-4px)` and a soft
  shadow; transition `200–250ms cubic-bezier(0.22,1,0.36,1)`.
- Focus (keyboard): same visual as hover + visible focus ring, because the
  whole card is often a link.

### Chips / Tags (tech stack, status)
- `bg-surface-raised` or `accent-muted` fill, `border-subtle` outline
  (optional), radius `999px` (pill) or `6px` (tag), `4px 10px` padding,
  `mono-label` type, optional 16px logo/icon inline.
- Status pill variant ("Available for work") adds a small pulsing dot in
  `success`.

### Navigation
- Link states: default `text-secondary`, hover/active `text-primary` with
  a `2px` accent underline that animates in from center (`scaleX 0→1`,
  150ms).
- Mobile overlay menu: full-viewport, `bg-canvas` at 98% opacity, links in
  `display-md`, staggered fade/slide-in on open (40ms stagger per item).

### Modal / Project Detail
- Centered panel, `bg-surface-raised`, radius `20px`, max-width `720px`,
  scrim `bg-canvas` at 70% opacity with blur.
- Entrance: scrim fades in 150ms; panel fades + scales `0.96→1` 200ms.
- Focus is trapped inside; `Escape` and scrim click close it; close button
  top-right, `44×44px` hit area minimum.

### Forms (Contact)
- Inputs: `bg-surface`, `1px border-subtle`, radius `10px`, `14px 16px`
  padding, `body-md` type; focus state swaps border to `accent` + subtle
  `accent`-colored glow (`box-shadow` 0 0 0 3px accent-muted).
- Labels above inputs, always visible (never placeholder-only labels).
- Inline validation messages in `danger`/`success`, announced via
  `aria-live="polite"`.

### Marquee (footer / process strip)
- CSS/JS-driven infinite horizontal scroll, duplicated content for
  seamless loop, pauses on hover/focus, and **must** honor
  `prefers-reduced-motion: reduce` by freezing to a static row.
- Marked `aria-hidden="true"` when purely decorative/duplicative of real
  headings elsewhere on the page.

---

## 6. Interaction & Motion

- **Timing tokens**: `motion-fast` 120ms, `motion-base` 200ms,
  `motion-slow` 400ms, `motion-marquee` 24–40s per loop (content-length
  dependent). Easing: `cubic-bezier(0.22, 1, 0.36, 1)` for entrances,
  `ease-out` for hovers.
- **Scroll reveal**: sections/cards fade + translateY(16px→0) once, using
  an IntersectionObserver-style trigger at ~20% visibility; stagger
  children by 60–80ms; never re-trigger on scroll-up (reveal once).
- **Micro-interactions**: button hover lift, card hover lift + image
  zoom, nav underline draw, chip hover brightness, cursor-follow glow on
  hero avatar (optional, desktop-only, disabled on touch).
- **Page transitions**: soft cross-fade (150–200ms) between routes if a
  router is used; avoid full white/black flash.
- **Reduced motion**: all transform/opacity entrance animations collapse
  to instant or opacity-only when `prefers-reduced-motion: reduce` is set;
  marquees freeze; parallax disabled.

**Responsive breakpoints**
| Token | Width | Notes |
|---|---|---|
| `xs` | < 480px | Single column, stacked CTAs |
| `sm` | 480–767px | Mobile landscape |
| `md` | 768–1023px | Tablet, 2-col grids begin |
| `lg` | 1024–1279px | Desktop, nav fully expands |
| `xl` | ≥ 1280px | Max content width reached, extra margin grows |

---

## 7. Imagery & Media

- **Hero**: a single, well-lit portrait/avatar (square or soft-rounded
  frame, `1:1`), optionally paired with a subtle grain/noise or gradient-
  mesh backdrop behind it — never a busy photo behind hero text.
- **Project thumbnails**: 16:9 or 4:3 device/browser-frame screenshots or
  clean product mockups; consistent crop ratio across all cards; lazy-
  loaded, blurred low-res placeholder (LQIP) while loading.
- **Iconography**: one consistent icon set (e.g., Lucide/Phosphor) at
  `20–24px` for UI icons; tech-stack logos as small (`24–32px`) brand
  marks in chips; emoji are acceptable only in the Services tiles as an
  informal accent, used sparingly (1 per tile).
- **Alt text**: every meaningful image gets descriptive alt text; purely
  decorative images (marquee background, texture) get `alt=""` and/or
  `aria-hidden="true"`.

---

## 8. Accessibility & Responsiveness Requirements

- Color contrast per §4 (AA minimum; aim for AAA on body text where
  feasible).
- All interactive elements reachable and operable by keyboard alone;
  visible `:focus-visible` styles on every focusable element (never
  `outline: none` without a replacement).
- Semantic landmarks: `header`, `nav`, `main`, `section` with `aria-label`
  or heading association, `footer`.
- Heading order is strictly hierarchical (`h1` once, `h2` per major
  section, `h3` for cards within).
- Marquees, decorative motion, and auto-scrolling content are pausable and
  respect `prefers-reduced-motion`.
- Forms: labelled inputs, error messages tied via `aria-describedby`,
  success/error state announced via `aria-live`.
- Modals trap focus, restore focus to trigger on close, close on `Escape`.
- Minimum tap target `44×44px` on mobile.
- Layout tested at 320px minimum width with no horizontal scroll; text
  reflows and remains readable at 200% browser zoom.

---

## 9. Deliverables Checklist

- [x] `Design.md` — this document (system rules, not content).
- [ ] `design-tokens.json` — machine-readable color/type/spacing/motion
      tokens (companion file, generate alongside this doc).
- [ ] Component specs — one short spec per component (`Nav`, `Hero`,
      `ProjectCard`, `Chip`, `Modal`, `Form`, `TimelineEntry`) covering
      props/variants/states, derived from §5 above.
- [ ] Style guide snippet — a single static HTML/CSS page instantiating
      the tokens and components for visual QA before wiring up real data.

---

## Style Guide Snippet (reference)

```css
:root {
  /* Color */
  --bg-canvas: #0A0A0C;
  --bg-surface: #131316;
  --bg-surface-raised: #1B1B1F;
  --border-subtle: #2A2A2F;
  --text-primary: #F5F5F7;
  --text-secondary: #A1A1AA;
  --accent: #C6FF3D;
  --accent-contrast-text: #0A0A0C;
  --accent-muted: rgba(198, 255, 61, 0.12);

  /* Type */
  --font-display: "Clash Display", "Inter Tight", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --display-xl: clamp(2.5rem, 6vw, 6rem);
  --display-lg: clamp(2rem, 4.5vw, 4rem);
  --body-lg: clamp(1.0625rem, 1.4vw, 1.25rem);

  /* Space & radius */
  --space-unit: 8px;
  --radius-card: 16px;
  --radius-pill: 999px;

  /* Motion */
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --motion-fast: 120ms;
  --motion-base: 200ms;
}

.btn-primary {
  background: var(--accent);
  color: var(--accent-contrast-text);
  font-family: var(--font-mono);
  padding: 12px 24px;
  border-radius: 8px;
  transition: transform var(--motion-fast) var(--ease-out-soft),
              filter var(--motion-fast) var(--ease-out-soft);
}
.btn-primary:hover { transform: scale(1.02); filter: brightness(1.08); }
.btn-primary:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  padding: 24px;
  transition: transform var(--motion-base) var(--ease-out-soft),
              border-color var(--motion-base) var(--ease-out-soft);
}
.card:hover { transform: translateY(-4px); border-color: var(--accent-muted); }

.chip {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.03em;
  background: var(--bg-surface-raised);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  padding: 4px 10px;
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
```
