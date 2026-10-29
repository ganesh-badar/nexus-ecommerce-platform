# Design System — Nexus Direct Hardware Platform

## 1. Design Philosophy & System Identity
- **Product Truth**: Direct hardware & storefront logistics platform for commercial computing, studio audio, and precision electronics.
- **Mode**: Operate — Precision B2B e-commerce, high scanability.
- **Color Theme**: Palette 1 — Slate Steel Blue (`#111522` → `#DCE3EF`).
- **Craft Floor Rules**: Zero gradient text, zero faux ratings, crisp 4px/6px radii (no pills), strict browser surface theming (selection, scrollbars, focus ring, tabular nums), minimum functional font size of 12px.

## 2. Color Palette & Surfaces (Slate Steel Blue)
```css
:root {
  /* Surfaces & Precision Borders (#111522 → #DCE3EF ramp) */
  --bg-body: #111522;             /* Deepest base surface */
  --bg-surface: #1E263B;          /* Cards & panels */
  --bg-surface-elevated: #303D59; /* Elevated active items */
  --bg-card: #1E263B;

  /* Borders & Dividers */
  --border-subtle: #303D59;
  --border-medium: #536684;
  --border-focus: #98A9C4;

  /* Typography */
  --text-primary: #DCE3EF;        /* High-contrast crisp text */
  --text-secondary: #98A9C4;      /* Informational secondary text */
  --text-muted: #536684;          /* De-emphasized metadata */

  /* Navigation & Action */
  --nav-bg: rgba(17, 21, 34, 0.95);
  --action-solid: #DCE3EF;
  --action-solid-text: #111522;
  --action-solid-hover: #ffffff;
  --primary-accent: #2563eb;
  --primary-hover: #1d4ed8;
}
```

## 3. Typography
- **Display**: `'Space Grotesk', system-ui, sans-serif` for titles and brand marks (-0.02em tracking).
- **Body**: `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif` for dense catalog scanning.
- **Data & Measurement**: `'JetBrains Mono', monospace` with `font-variant-numeric: tabular-nums` for SKUs, pricing, stock levels, and timestamps.
- **Scale**:
  - Headings: 1.25rem – 2.2rem
  - Body: 0.875rem – 1rem
  - Badges & SKU: 0.75rem (12px, WCAG legibility compliant)

## 4. Elevation & Controls
- **Card Geometry**: 6px radius, 1px subtle border (`var(--border-subtle)`). Hover transition: subtle border highlight to `var(--border-medium)` and -2px translateY.
- **Buttons**: Crisp 4px rectangular border radius. Zero pill buttons. Solid action buttons (`#DCE3EF`) with `#111522` text for maximum contrast against deep slate background.
- **Drawer & Modals**: 440px off-canvas cart drawer with 1px border-left and solid backdrop filter.

## 5. Browser Surfaces
- `::selection`: `rgba(83, 102, 132, 0.4)` with `#DCE3EF`
- `input, textarea, select`: `caret-color: #2563eb`
- `:focus-visible`: `2px solid #2563eb`, outline offset 2px
- `::-webkit-scrollbar`: 8px width, `#536684` thumb with `#111522` track
