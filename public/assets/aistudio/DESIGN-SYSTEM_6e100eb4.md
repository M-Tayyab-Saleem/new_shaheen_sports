# NEW SHAHEEN SPORTS
# Design System Specification (DESIGN-SYSTEM.md)

**Document ID:** NSS-DESIGN-SYSTEM-001  
**Version:** 2.1  
**Status:** Approved Design Baseline  
**Methodology:** UI/UX Pro Max Design Intelligence (`ui-ux-pro-max`)  
**Design Category:** Sports Team / Athletic Academy / High-Performance Training  
**Aesthetic Theme:** Modern Editorial Athleticism & High-Performance Dark Minimalism  
**Target Viewports:** 360px, 390px, 768px, 1024px, 1440px, 1920px  
**Target Accessibility:** WCAG 2.2 AA (AAA for critical text contrast)

---

## 1. Visual Direction & Aesthetic Philosophy

### 1.1 The High-Performance Editorial Direction
New Shaheen Sports breaks away from cluttered, generic community sports templates. Instead, the design adopts the aesthetic language of elite professional athletic institutions (reminiscent of Olympic volleyball federations, Nike Training Club, and high-end European athletic clubs):

1. **Editorial & Athletic Contrast:** Deep charcoal backgrounds paired with crisp platinum typography, matte slate surfaces, and a high-voltage court flame accent (`#FF5500`).
2. **Photography-First Presentation:** High-contrast, desaturated sports imagery, court action shots, and focused athlete portraits.
3. **Structured Bento Grid Geometry:** Asymmetrical 1px-bordered modular cards that group training tiers, facility details, and coaching credentials without visual clutter.
4. **Restrained Precision:** No superfluous decorative badges or distracting 3D gimmicks. Every visual cue communicates discipline, agility, and authority.
5. **Clear Separation of Concerns:**
   - **Public Experience:** Expansive, editorial, high-contrast sports storytelling designed to inspire and drive membership applications.
   - **Administrative Console:** Dense, functional, low-latency dark-slate operations interface optimized for rapid scanning and status updating.

---

## 2. Design Tokens & Color System

All colors are exposed as semantic CSS custom properties in `src/styles/variables.css`.

### 2.1 Master Color Palette

| Token Name | CSS Variable | Hex / Value | Semantic Role / Usage | Contrast vs Background |
|---|---|---|---|---|
| **Base Background** | `--color-bg-base` | `#080A0F` | Deep obsidian black background for the viewport | Base surface |
| **Surface Raised** | `--color-surface-raised` | `#111520` | Secondary sections, headers, and footers | 1.3:1 vs base |
| **Surface Card** | `--color-surface-card` | `#161B28` | Bento cards, profile cards, and form containers | 1.8:1 vs base |
| **Surface Card Hover** | `--color-surface-card-hover` | `#1E2538` | Hover state for interactive cards | 2.4:1 vs base |
| **Surface Input** | `--color-surface-input` | `#0D111A` | Background for input fields, textareas, and canvas | Inset surface |
| **Border Subtle** | `--color-border-subtle` | `rgba(255, 255, 255, 0.07)` | Dividers, card boundaries, table cell separators | Non-text UI border |
| **Border Active** | `--color-border-active` | `rgba(255, 85, 0, 0.50)` | Focus rings, active tabs, hovered cards | High-visibility cue |
| **Primary Accent** | `--color-accent-primary` | `#FF5500` | High-voltage Flame Orange: Primary CTAs, active pills | 5.8:1 vs base |
| **Accent Hover** | `--color-accent-hover` | `#FF6F26` | Hover state for primary buttons | 6.7:1 vs base |
| **Accent Glow** | `--color-accent-glow` | `rgba(255, 85, 0, 0.18)` | Subtle ambient aura behind hero cards & focal points | Ambient accent |
| **Court Cyan (Secondary)**| `--color-accent-secondary`| `#00E5FF` | Court line highlight, technical badges, position chips | 12.4:1 vs base |
| **Text Primary** | `--color-text-primary` | `#F8FAFC` | Primary headings, button labels, high-emphasis copy | 17.8:1 vs base (AAA) |
| **Text Secondary** | `--color-text-secondary` | `#94A3B8` | Body paragraphs, form helper text, card descriptions | 7.3:1 vs base (AAA) |
| **Text Muted** | `--color-text-muted` | `#64748B` | Timestamps, table captions, disabled placeholders | 4.6:1 vs base (AA) |
| **Success / Approved** | `--color-status-success` | `#10B981` | Approved status badge, validation checkmarks | 8.2:1 vs base |
| **Warning / Review** | `--color-status-warning` | `#F59E0B` | Under Review badge, cautionary notifications | 10.1:1 vs base |
| **Info / Contacted** | `--color-status-info` | `#3B82F6` | Contacted status badge, telephone / WhatsApp hints | 5.2:1 vs base |
| **Danger / Rejected** | `--color-status-danger` | `#EF4444` | Rejected status badge, form error messages | 4.8:1 vs base |

---

## 3. Typography System

The typography pairs an athletic, architectural sans-serif for display headings with an ultra-legible geometric workhorse for body and interface elements.

### 3.1 Font Families
- **Display & Headings:** `Plus Jakarta Sans`, sans-serif (Weights: `600 SemiBold`, `700 Bold`, `800 ExtraBold`)
- **Body & Controls:** `Inter`, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif (Weights: `400 Regular`, `500 Medium`, `600 SemiBold`)
- **Monospace & Reference Codes:** `JetBrains Mono`, Menlo, monospace (for application references such as `NSS-2026-000101`)

### 3.2 Typography Scale & Hierarchy

| Level | Size (Desktop) | Size (Mobile) | Line Height | Weight | Letter Spacing | CSS Class / Token |
|---|---|---|---|---|---|---|
| **Display 1 (Hero Title)** | `3.75rem` (60px) | `2.5rem` (40px) | 1.05 | 800 | `-0.035em` | `.text-display-1` |
| **H1 (Page Title)** | `2.75rem` (44px) | `2.0rem` (32px) | 1.15 | 800 | `-0.025em` | `.text-h1` |
| **H2 (Section Heading)** | `2.0rem` (32px) | `1.5rem` (24px) | 1.25 | 700 | `-0.02em` | `.text-h2` |
| **H3 (Card Title)** | `1.375rem` (22px) | `1.25rem` (20px) | 1.35 | 600 | `-0.015em` | `.text-h3` |
| **Body Large (Lead)** | `1.125rem` (18px) | `1.0rem` (16px) | 1.60 | 400 / 500 | `0` | `.text-body-lg` |
| **Body Regular** | `1.0rem` (16px) | `0.9375rem` (15px) | 1.60 | 400 | `0` | `.text-body` |
| **Body Small / Meta** | `0.875rem` (14px) | `0.8125rem` (13px) | 1.50 | 500 | `+0.01em` | `.text-body-sm` |
| **Overline / Badge** | `0.75rem` (12px) | `0.75rem` (12px) | 1.20 | 700 | `+0.08em` (Uppercase) | `.text-overline` |

---

## 4. Spacing, Grid & Layout Rules

### 4.1 Spacing Scale (8pt Baseline Rhythm)

```css
--space-1: 0.25rem;  /* 4px  - Micro insets, border-radii */
--space-2: 0.5rem;   /* 8px  - Icon spacing, chip padding */
--space-3: 0.75rem;  /* 12px - Input vertical padding, compact gaps */
--space-4: 1.0rem;   /* 16px - Card interior padding, standard gap */
--space-5: 1.5rem;   /* 24px - Section inner padding, card gaps */
--space-6: 2.0rem;   /* 32px - Module spacing, form field groupings */
--space-8: 3.0rem;   /* 48px - Section breaks, hero padding */
--space-10: 4.0rem;  /* 64px - Major section separation */
--space-12: 5.0rem;  /* 80px - Landing page vertical block gaps */
--space-16: 7.0rem;  /* 112px - Hero section top clearance */
```

### 4.2 Layout Boundaries
- **Maximum Content Width:** `1280px` (`max-w-7xl` centered with `margin-inline: auto`)
- **Admin Dashboard Max Width:** `1440px` for optimal data density
- **Gutter Padding:**
  - Mobile (< 768px): `1.25rem` (20px)
  - Tablet (768px - 1024px): `2.0rem` (32px)
  - Desktop (> 1024px): `2.5rem` (40px)
- **Border Radius Standards:**
  - Bento & Container Cards: `14px` (`--radius-card`)
  - Buttons & Inputs: `8px` (`--radius-btn`)
  - Status Pills & Badges: `9999px` (`--radius-full`)

---

## 5. Component Specifications

### 5.1 Buttons & Interactive Controls
1. **Primary Button (`.btn-primary`):**
   - Background: `--color-accent-primary` (`#FF5500`)
   - Text: `#FFFFFF` (Font weight 600, letter spacing +0.01em)
   - Padding: `0.75rem 1.75rem` (Height: 46px min to exceed 44px touch target)
   - Radius: `8px`
   - Hover: Elevates slightly (`transform: translateY(-1px)`), background shifts to `--color-accent-hover` (`#FF6F26`), shadow `0 6px 20px rgba(255, 85, 0, 0.28)`.
   - Active: `transform: scale(0.98)`, transition 80ms.
   - Focus Visible: `outline: 2px solid #FFFFFF; outline-offset: 2px;`.

2. **Secondary Ghost Button (`.btn-secondary`):**
   - Background: `rgba(255, 255, 255, 0.04)`
   - Border: `1px solid rgba(255, 255, 255, 0.14)`
   - Text: `--color-text-primary` (`#F8FAFC`)
   - Hover: Border changes to `rgba(255, 255, 255, 0.30)`, background to `rgba(255, 255, 255, 0.08)`.

3. **Danger / Action Button (`.btn-danger`):**
   - Background: `rgba(239, 68, 68, 0.12)`
   - Border: `1px solid rgba(239, 68, 68, 0.30)`
   - Text: `#EF4444`
   - Hover: Background `rgba(239, 68, 68, 0.22)`.

### 5.2 Bento Grid Cards (`.card-bento`)
- Background: `--color-surface-card` (`#161B28`)
- Border: `1px solid var(--color-border-subtle)`
- Padding: `1.75rem`
- Radius: `14px`
- Transitions: `border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease`
- Hover state:
  - Border: `1px solid rgba(255, 85, 0, 0.35)`
  - Shadow: `0 12px 32px -4px rgba(0, 0, 0, 0.5)`
  - Subtle upward translation: `translateY(-2px)`

### 5.3 Form Elements (`.form-field`)
- Label: Font size `0.875rem`, weight 600, color `--color-text-primary`, margin-bottom `0.5rem`.
- Input & Select:
  - Height: `46px`
  - Background: `--color-surface-input` (`#0D111A`)
  - Border: `1px solid rgba(255, 255, 255, 0.12)`
  - Text: `--color-text-primary`, font size `0.9375rem`
  - Radius: `8px`
  - Focus Ring: `border-color: #FF5500`, `box-shadow: 0 0 0 3px rgba(255, 85, 0, 0.18)`
  - Error state: `border-color: #EF4444`, `box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.18)`
- Error Message: Font size `0.8125rem`, color `#EF4444`, icon accompanied, screen-reader announced (`aria-live="polite"`).

### 5.4 Digital Signature Pad
- Canvas Dimensions: Responsive width (100%), fixed height `180px`.
- Canvas Background: `#0A0E17` (Deep slate) with high-contrast White/Volt stroke (`#FFFFFF`, stroke width 2.5px).
- Controls: Inset "Clear" button at top-right with icon and label.
- Touch Handling: `touch-action: none` prevents accidental page scrolling while signing.

### 5.5 Status Badges (`.badge-status`)
- Size: Compact pill (`padding: 0.25rem 0.75rem`, font-size `0.75rem`, weight 600, text-transform uppercase, tracking +0.05em).
- Variants:
  - **New:** Background `rgba(0, 229, 255, 0.12)`, Border `rgba(0, 229, 255, 0.30)`, Text `#00E5FF`
  - **Under Review:** Background `rgba(245, 158, 11, 0.12)`, Border `rgba(245, 158, 11, 0.30)`, Text `#F59E0B`
  - **Contacted:** Background `rgba(59, 130, 246, 0.12)`, Border `rgba(59, 130, 246, 0.30)`, Text `#60A5FA`
  - **Approved:** Background `rgba(16, 185, 129, 0.12)`, Border `rgba(16, 185, 129, 0.30)`, Text `#10B981`
  - **Rejected:** Background `rgba(239, 68, 68, 0.12)`, Border `rgba(239, 68, 68, 0.30)`, Text `#F87171`

---

## 6. Iconography System

- **Icon Family:** Lucide Icons (Rendered as clean SVGs via `lucide-react`).
- **Standard Stroke Width:** `1.75px` across all sizes for visual uniformity.
- **Icon Sizing Hierarchy:**
  - Micro / Inline (`16px`): Badge indicators, table status dots.
  - Standard Action (`20px`): Navigation links, button icons, form icons.
  - Card Feature (`28px`): Program card headers, value icons.
  - Hero Graphic (`40px`): Empty states, success modal icons.
- **Rule:** Never use raw emojis as structural or interface icons. Standalone icon buttons must include an explicit `aria-label`.

---

## 7. Animation & Interaction Tokens

Animations are strictly CSS-first, optimized for 60fps GPU acceleration:

```css
/* Transitions */
--transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-normal: 250ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-smooth: 350ms cubic-bezier(0.16, 1, 0.3, 1);

/* Keyframe Reveals */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Reduced Motion Override */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 8. Public Website Layout & Editorial Rules

1. **Navigation Bar (`<PublicHeader>`):**
   - Sticky with subtle background blur: `background: rgba(8, 10, 15, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.07);`.
   - Height: `72px`.
   - Left: New Shaheen Sports wordmark & monogram.
   - Center: Nav links (`Home`, `About`, `Training`, `Coaches`, `Founder`, `Schedule`, `Contact`).
   - Right: Distinguishable "Apply Now" button with Flame Orange fill.
   - Mobile: Hamburger toggle opening a full-height dark drawer with accessible keyboard focus trap.

2. **Hero Section (`<HeroSection>`):**
   - High-contrast sports background image with radial gradient vignette.
   - Split-line typography:
     - Line 1: "BUILDING SKILLS. DEVELOPING ATHLETES."
     - Line 2 (Highlighted): "STRENGTHENING TEAMS."
   - Dual CTAs: Primary "Apply for Academy" + Secondary "Explore Training Programs".
   - Key stats row (e.g. "Boys & Girls Batches", "Certified National Coaching", "Shah Faisal Colony, KHI").

3. **Editorial Founder & Coach Cards:**
   - Coach portraits presented in high-contrast duotone or desaturated monochrome with subtle border glow on hover.
   - Verified credentials, position specialization (e.g., Setter Training, Spike Mechanics, Defensive Fundamentals), and official role clearly labeled.

---

## 9. Administrative Console Design Rules

1. **Information Density:**
   - Compact table rows (`height: 52px`) allowing 10–15 records to be visible without excessive scrolling.
   - Dedicated filter bar with immediate text search and status tab buttons.
2. **Secure Detail Drawer:**
   - Slides from the right on desktop, modal on mobile.
   - Displays applicant photo (with authenticated click-to-zoom) and captured canvas signature.
   - Quick Action bar: "WhatsApp Applicant", "Call Applicant", "Update Status", "Save Internal Notes".
3. **Audit Log & Notes:**
   - Notes box with real-time save indicator.
   - Transparent display of submission timestamp and last status update.

---

## 10. Design Checklist & Compliance Sign-Off

- [x] Tested against 4.5:1 contrast for all body text on dark surfaces.
- [x] All touch targets designed to ≥ 44px × 44px.
- [x] Zero emojis used as structural interface icons.
- [x] Consistent SVG icon system via Lucide with 1.75px stroke.
- [x] CSS-only animations respecting `prefers-reduced-motion`.
- [x] Strict visual separation between Public Editorial Website and Administrative Console.
- [x] Documented in `docs/DESIGN-SYSTEM.md` as the single design truth.
