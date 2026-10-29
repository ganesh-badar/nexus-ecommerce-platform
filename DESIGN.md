# Design System — Nexus Direct Hardware Platform

## 1. Design Philosophy & System Identity
- **Product Truth**: Direct hardware & storefront logistics platform for commercial computing, studio audio, and precision electronics.
- **Mode**: Operate — Precision B2B e-commerce, high scanability, crisp architectural dark theme.
- **Craft Floor Rules**: Zero gradient text, zero faux ratings, crisp 4px/6px radii (no pills), strict browser surface theming (selection, scrollbars, focus ring, tabular nums), minimum functional font size of 12px.

## 2. Color Palette & Surfaces
```css
:root {
  /* Surfaces */
  --bg-body: #070809;
  --bg-surface: #0e1015;
  --bg-surface-elevated: #131620;
  --bg-card: #0e1015;

  /* Borders */
  --border-subtle: #1e2536;
  --border-medium: #2d3548;
  --border-focus: #3d4a63;

  /* Typography */
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  /* Accents */
  --primary-accent: #2563eb;
  --primary-hover: #1d4ed8;
  --action-solid: #f8fafc;
  --action-solid-text: #090a0f;
  --action-solid-hover: #e2e8f0;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
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
- **Card Geometry**: 6px radius, 1px subtle border (`var(--border-subtle)`), zero ghost card shadows. Hover transition: subtle border highlight to `var(--border-medium)` and -2px translateY.
- **Buttons**: Crisp 4px rectangular border radius. Zero pill buttons. Solid light action buttons (`#f8fafc`) for maximum contrast against deep slate background.
- **Drawer & Modals**: 440px off-canvas cart drawer with 1px border-left and solid backdrop filter.

## 5. Browser Surfaces
- `::selection`: `rgba(37, 99, 235, 0.35)` with `#f1f5f9`
- `input, textarea, select`: `caret-color: #2563eb`
- `:focus-visible`: `2px solid #2563eb`, outline offset 2px
- `::-webkit-scrollbar`: 8px width, `#2d3548` thumb with `#070809` track

