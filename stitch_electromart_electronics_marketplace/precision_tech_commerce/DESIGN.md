---
name: Precision Tech Commerce
colors:
  surface: '#faf8ff'
  surface-dim: '#d7d9e8'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#ebedfc'
  surface-container-high: '#e5e7f6'
  surface-container-highest: '#dfe2f1'
  on-surface: '#171b26'
  on-surface-variant: '#434655'
  inverse-surface: '#2c303b'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#ab0b1c'
  on-tertiary: '#ffffff'
  tertiary-container: '#cf2c30'
  on-tertiary-container: '#ffecea'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#faf8ff'
  on-background: '#171b26'
  surface-variant: '#dfe2f1'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  price-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  price-card:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '800'
    lineHeight: 24px
    letterSpacing: -0.015em
  price-strikethrough:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  badge:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers a high-performance, precision-engineered retail experience tailored for flagship consumer electronics and pro-grade hardware. It targets discerning tech enthusiasts, professionals, and everyday consumers seeking cutting-edge devices with zero friction. 

The aesthetic synthesizes high-contrast modernism with ultra-clean, utilitarian clarity. It balances deep charcoal and midnight tones against pristine white canvases, punctuated by high-potency electric blues and cyan accents. Every surface, metric, and specification is presented with surgical clarity, projecting authority, uncompromising reliability, and premium engineering. The interface avoids frivolous ornamentation, relying instead on deliberate micro-elevations, disciplined spatial cadence, and tactile responsiveness to evoke the sensation of unboxing precision hardware.

## Colors

The palette establishes an architectural hierarchy designed for high-density catalog browsing and conversion clarity:

- **Primary Accent (`#2563EB`)**: Electric Blue commands attention for high-value actions, primary conversion buttons, selected filters, and active tab indicators. Interactive states transition to `#1D4ED8` on hover and active states to `#1E40AF`.
- **Secondary Highlight (`#06B6D4`)**: Neon Cyan provides technical contrast, accentuating live status badges, connectivity specs, fast-charging indicators, and key technical perks.
- **Tertiary & Urgency Alerts (`#EF4444` / `#F59E0B`)**: Bold crimson flags limited-time flash deals, instant clearance discounts, and out-of-stock indicators. Amber serves warnings, low-stock thresholds, and review star ratings.
- **Neutrals & Dark Charcoal Foundation**:
  - `#0B0F19` (Obsidian Charcoal): Dominates high-impact dark zones, sticky navigation chrome, and primary typography.
  - `#111827` (Deep Slate): Used for secondary surface headers, footer wells, and contrast-rich contextual overlays.
  - `#F1F5F9` / `#E2E8F0` (Cool Slate): Forms neutral border lines, card dividers, inactive toggles, and subtle background alternation.
  - `#FFFFFF` (Pure White): The baseline canvas surface ensuring maximum product imagery fidelity and readability.

## Typography

The typographic strategy pairs **Plus Jakarta Sans** for structural headers and price values with **Inter** for sustained technical specs, descriptions, metadata, and micro-labels.

- **Plus Jakarta Sans**: Delivers geometric structure and modern technical gravitas. Large headlines leverage tighter negative tracking (`-0.025em`) to feel engineered and robust. 
- **Numerical Hierarchy**: Prices use dedicated high-weight display tokens (`price-hero` and `price-card`) with tabular numeral alignments where applicable, ensuring instant scanning across grids. Discounted prices anchor the visual field with bold dark slate or electric blue, while original MSRPs sit adjacent in `price-strikethrough` with muted slate tones (`#94A3B8`).
- **Inter**: Governs long-form descriptions, specification tables, and interactive labels, maintaining legibility at condensed sizes across responsive viewport scales.

## Layout & Spacing

The layout is built on a 12-column responsive fluid grid designed for density without visual clutter:

- **Breakpoints**:
  - Mobile: `< 640px` (4 columns, `margin-mobile` of 16px, `gutter-mobile` of 12px)
  - Tablet: `640px - 1024px` (8 columns, 24px margins, 16px gutters)
  - Desktop: `> 1024px` (12 columns, max container width 1360px, 32px margins, 24px gutters)

- **Spacing Cadence**:
  - `space-xs` (4px) and `space-sm` (8px) regulate inline chip badges, rating star groupings, and button icon gaps.
  - `space-md` (16px) defines default interior card padding and compact list spacing.
  - `space-lg` (24px) separates discrete card sections, stacked form modules, and cart rows.
  - `space-xl` (40px) commands section vertical offsets on desktop, collapsing to 24px on mobile viewports.

## Elevation & Depth

Visual hierarchy uses a refined hybrid of **ambient, tinted micro-shadows** and **low-contrast crisp borders** to keep hardware photography sharp and separate from page chrome.

- **Surface Neutral (Ground Level)**: Baseline page canvas is `#FFFFFF` or neutral slate `#F8FAFC`, paired with crisp 1px borders (`#E2E8F0`).
- **Elevation Tier 1 (Product Cards & Modular Shelves)**: Standard interactive cards feature a 1px border (`#E2E8F0`) alongside an ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Elevation Tier 2 (Hovered Cards, Dropdowns & Menus)**: On pointer engagement or focus, cards rise slightly: `0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`, with the border transitioning to `#CBD5E1`.
- **Elevation Tier 3 (Sticky Nav, Flyouts & Modals)**: Fixed navigation bars and mobile checkout drawer sheets utilize high diffusion: `0 20px 25px -5px rgba(11, 15, 25, 0.12), 0 8px 10px -6px rgba(11, 15, 25, 0.06)`. Sticky headers apply a 12px backdrop blur (`backdrop-filter: blur(12px)`) over an 85% translucent background (`rgba(255, 255, 255, 0.85)` or `#0B0F19` in dark frames) to ground foreground actions.

## Shapes

The design system implements a controlled, modern roundedness profile (`roundedness: 2` base):

- **Base Radius (8px / 0.5rem)**: Standard buttons, text input fields, selector quantity widgets, and micro tooltips.
- **Large Radius (16px / 1rem - `rounded-lg`)**: Product cards, modular category blocks, filter drawers, and checkout summary panels.
- **Extra Large Radius (24px / 1.5rem - `rounded-xl`)**: Primary banners, modal dialogs, and hero showcase displays.
- **Pill / Circular (Full Radius)**: Filter category chips, discount and stock status badges, floating quick-action buttons, and rating indicator pills.

## Components

### Navigation & Search Bar
- **Sticky Header**: Houses branded mark, high-efficiency omni-search, account, and mini-cart counters with badges. 
- **Search Bar**: Centered, multi-part field with leading search icon, internal shortcut cue, and an embedded category dropdown trigger. Includes quick-filter category pills right beneath the search line. Minimum touch height of 44px on mobile, 48px on desktop.

### Product Card
- **Structure**: Surface container bounded by a 1px border (`#E2E8F0`) and `rounded-lg`.
- **Top Zone**: Floating discount tag (e.g., `-25%` in `#EF4444` background with pure white text) aligned top-left; wishlist heart icon top-right with an ambient frosted backplate.
- **Image Area**: Balanced 1:1 neutral gray background (`#F8FAFC`) with zoom-on-hover transition (scale: 1.04).
- **Meta & Rating**: Star rating in vibrant amber (`#F59E0B`) with count metadata in `body-sm` (`#64748B`).
- **Pricing Cluster**: Active promotional price in `price-card` alongside strikethrough MSRP and calculated saving badge.
- **CTA**: Full-width or corner-anchored quick-add button featuring an icon-to-text transform on mobile viewports.

### Buttons & Chips
- **Primary CTA**: `#2563EB` fill, white bold label, minimum tap area of 48px. Includes subtle active press depth (`transform: scale(0.98)`).
- **Secondary / Ghost**: Pure white surface, 1.5px border (`#E2E8F0`), active slate text (`#0B0F19`), hover state filled with `#F8FAFC`.
- **Category Chips**: Pill-shaped (`rounded-full`), height 36px, horizontal scroll on mobile with no scrollbars. Unselected: `#F1F5F9` surface with `#475569` text. Selected: `#0B0F19` surface with white text, or `#2563EB` with white text during active filtering.

### Form Inputs & Quantity Selectors
- **Input Fields**: Crisp 1px border (`#CBD5E1`), focus-ring with 3px halo in `rgba(37, 99, 235, 0.2)` and border `#2563EB`. Error states introduce `#EF4444` borders and associated helper text.
- **Quantity Selector**: Segmented pill component composed of a decrementor (`-`), central tabular numeric input, and incrementor (`+`) bound within an `#F1F5F9` frame, preventing mis-taps via 40px minimum target nodes.

### Trust Badges & Stepper
- **Trust Badges**: Horizontal flex row showcasing warranty, free express delivery, and verified secure checkout, styled with subtle monochrome icons paired with cyan or slate accents.
- **Checkout Stepper**: Segmented progress line with numbered circular milestones. Completed steps fill with `#2563EB` containing checkmarks; active step is highlighted with an outer ring; pending steps remain muted `#E2E8F0`.