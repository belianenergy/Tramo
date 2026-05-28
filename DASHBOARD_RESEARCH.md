# Dashboard UX Research: Friendly vs. Cold/AI Aesthetic
## EnergyOS — Energy Management for Spanish Property Managers

---

## 1. What Makes a Dashboard Feel "Friendly" vs "Cold/AI"?

### Friendly Characteristics
- **Human language**: "Your properties are doing well" instead of "System optimal"
- **Contextual help**: Inline tips, not documentation links
- **Progressive disclosure**: Show summary first, details on demand
- **Conversational empty states**: "No alerts yet — that's good news!" instead of "0 items found"
- **Warm color accents**: Earth tones, not neon highlights
- **Rounded corners & soft shadows**: Organic feel vs sharp geometric
- **Personalization**: "Good morning, María" vs generic greeting

### Cold/AI Characteristics (Anti-patterns)
- Dense data tables as primary view
- Monospace fonts for everything
- Pure functional colors (blue=info, red=error) without warmth
- Robotic copy: "Execute action", "Process completed"
- Overly minimalist without personality
- Tooltips that explain the obvious

### Key Insight for EnergyOS
Property managers are **not technical users**. They manage people and properties. The dashboard should feel like a **trusted assistant**, not a control panel.

---

## 2. Color Palettes: Warm & Approachable for Dark Mode

### Recommended Palette: "Warm Slate"

```css
/* Background hierarchy */
--bg-primary: #1a1d23;        /* Main background - warm dark, not pure black */
--bg-secondary: #22262d;      /* Cards - slightly lighter */
--bg-tertiary: #2a2f38;       /* Elevated elements */
--bg-hover: #323842;          /* Hover states */

/* Text hierarchy */
--text-primary: #f0e6d3;      /* Warm white - cream, not pure white */
--text-secondary: #b8b0a4;    /* Muted warm gray */
--text-tertiary: #7a756d;     /* Subtle text */
--text-inverse: #1a1d23;      /* For light buttons */

/* Accent colors - warm & energetic */
--accent-primary: #e8913a;    /* Warm amber - energy, approachable */
--accent-primary-hover: #f0a050;
--accent-primary-soft: rgba(232, 145, 58, 0.15);

--accent-success: #7cb97c;    /* Muted green - not neon */
--accent-success-soft: rgba(124, 185, 124, 0.15);

--accent-warning: #d4a843;    /* Warm yellow-gold */
--accent-warning-soft: rgba(212, 168, 67, 0.15);

--accent-danger: #c97070;     /* Muted red - not bright red */
--accent-danger-soft: rgba(201, 112, 112, 0.15);

--accent-info: #6ba3c7;       /* Soft blue - not electric */
--accent-info-soft: rgba(107, 163, 199, 0.15);

/* Energy-specific semantic colors */
--energy-low: #7cb97c;        /* Green - efficient */
--energy-medium: #d4a843;     /* Yellow - moderate */
--energy-high: #c97070;       /* Red - high usage */
--energy-savings: #7cb97c;    /* Positive savings */
```

### Why This Works
- **Pure black (#000)** feels like a terminal. **Warm dark (#1a1d23)** feels like a cozy room.
- **Cream text (#f0e6d3)** reduces eye strain and feels warmer than pure white.
- **Amber accent (#e8913a)** = energy, warmth, sunshine. Associated with savings/gold.
- **Muted semantic colors** feel sophisticated, not alarming.

### Alternative: "Olive Dark" (More Organic)
```css
--bg-primary: #1c1f1a;        /* Dark olive undertone */
--accent-primary: #c4a35a;    /* Muted gold */
--text-primary: #e8e2d9;      /* Warm cream */
```

---

## 3. Typography Choices That Feel Human

### Font Stack Recommendation

```css
/* Primary: Clean, warm, humanist sans-serif */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* For large headlines: Slightly more character */
--font-display: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* For data/numbers: Tabular figures for alignment */
--font-mono: 'JetBrains Mono', 'SF Mono', monospace;
```

### Why Inter?
- **Humanist proportions**: Based on traditional typefaces, not geometric
- **Friendly letterforms**: Open counters, slightly rounded
- **Excellent at all sizes**: Crisp at 12px, elegant at 48px
- **Tabular numbers**: Aligns data perfectly (critical for energy metrics)
- **Free & widely available**: Google Fonts, no licensing issues

### Type Scale
```css
--text-xs: 0.75rem;      /* 12px - Tags, badges */
--text-sm: 0.875rem;     /* 14px - Secondary text, labels */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Lead text */
--text-xl: 1.25rem;      /* 20px - Card titles */
--text-2xl: 1.5rem;      /* 24px - Section headers */
--text-3xl: 1.875rem;    /* 30px - Page titles */
--text-4xl: 2.25rem;     /* 36px - Display numbers (kWh, €) */
```

### Typography Rules
- **Never use monospace for body text** — only for raw data/numbers
- **Use font-weight 500 (medium)** for labels and emphasis, not 700 (bold)
- **Line height 1.5** for body, **1.2** for headings
- **Letter spacing: -0.01em** for large numbers (tighter = more premium)

### Display Numbers (kWh, €, %)
```css
.metric-value {
  font-family: var(--font-primary);
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  letter-spacing: -0.02em;
  font-feature-settings: 'tnum';
}
```

---

## 4. Card & Layout Patterns That Feel Inviting

### Card Design
```css
.card {
  background: var(--bg-secondary);
  border-radius: 16px;              /* Generous rounding */
  border: 1px solid rgba(240, 230, 211, 0.08);  /* Subtle warm border */
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.08);  /* Soft, diffuse shadow */
  padding: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 8px 24px rgba(0, 0, 0, 0.08);
}
```

### Layout Principles
- **16px gap between cards** (generous breathing room)
- **Max 3 columns** on desktop — don't overcrowd
- **Asymmetric layouts** feel more organic than perfect grids
- **Zigzag reading pattern**: Important info top-left, secondary bottom-right
- **80px horizontal padding** on large screens (don't stick to edges)

### Card Types for EnergyOS

```
┌─────────────────────────────┐
│ ⚡ Total Consumption        │  ← Large metric card
│                             │
│    1,247 kWh                │  ← Big number, tabular-nums
│    ↑ 12% vs last month      │  ← Context with trend
│                             │
│    [sparkline chart]        │  ← Mini visualization
└─────────────────────────────┘

┌─────────────────────────────┐
│ 🏠 Properties Overview      │  ← Section header
├─────────────────────────────┤
│ • Calle Mayor 12      🟢    │  ← List with status
│ • Plaza España 5      🟢    │
│ • Gran Vía 88         🟡    │  ← Yellow = attention
│ • Rambla Catalunya 44 🔴    │  ← Red = needs action
└─────────────────────────────┘
```

### Dashboard Grid Layout
```
┌─────────────────────────────────────────────────────┐
│  [Header: "Good morning, María" + Date]             │
├────────────────────────┬────────────────────────────┤
│  [Consumption Card]    │  [Cost Card]               │
│  1,247 kWh             │  €1,843.20                 │
├────────────────────────┼────────────────────────────┤
│  [Efficiency Score]    │  [Alerts / Notifications]  │
│  87/100                │  2 items need attention    │
├────────────────────────┴────────────────────────────┤
│  [Consumption Chart - Full Width]                   │
│  [Line chart: last 30 days per property]            │
├─────────────────────────────────────────────────────┤
│  [Property List]           [Quick Actions]          │
└─────────────────────────────────────────────────────┘
```

---

## 5. Real Examples of Friendly Dashboards

### Linear (linear.app)
- **What works**: Clean dark mode, subtle borders, generous spacing
- **Color**: `#0d0d0d` background, `#c4c4c4` text, `#5e6ad2` accent
- **Cards**: 6px border-radius, subtle borders over heavy shadows
- **Copy**: "In progress", "Done" — simple, human verbs
- **Learn**: Use borders over shadows; keep it airy

### Notion (notion.so)
- **What works**: Flexible blocks, friendly empty states, emoji icons
- **Typography**: Inter (was SF Pro), clean hierarchy
- **Empty state**: "Write something beautiful" + templates
- **Learn**: Use emoji as friendly icons; empty states should inspire, not just inform

### Figma (figma.com)
- **What works**: File cards with previews, contextual menus
- **Color**: `#2c2c2c` background (warm dark gray)
- **Cards**: 8px radius, hover lift effect
- **Learn**: Show preview/thumbnail when possible; hover effects add life

### Cron (cron.com) — now Notion Calendar
- **What works**: Time blocks with soft colors, human time language
- **Color**: Pastel event colors on dark background
- **Copy**: "Focus time", "Lunch" — natural language
- **Learn**: Use natural time ranges ("This morning", "Last week")

### Vercel Dashboard
- **What works**: Deploy status with live feel, clean metrics
- **Color**: `#000` background, `#fff` text, `#0070f3` accent
- **Animation**: Subtle pulse on "Building" status
- **Learn**: Show live/real-time status with subtle animation

### Raycast
- **What works**: Command palette UI, friendly copy, emoji icons
- **Color**: `#1a1a1a` background, warm grays
- **Copy**: "Open", "Search", "Create" — action-oriented, friendly
- **Learn**: Use emoji + text labels together

---

## 6. Making Energy Dashboards Approachable for Non-Technical Users

### The Problem
Property managers:
- Don't think in kWh — think in "how much will this cost me?"
- Don't understand load profiles — understand "this tenant uses too much"
- Don't want raw data — want actionable insights
- Are busy — need information at a glance

### Solutions

#### A. Lead with Money, Not kWh
```
❌ "Consumption: 1,247 kWh"
✅ "This month: €184  ↑ €23 vs last month"
```

#### B. Use Familiar Analogies
```
❌ "Power factor: 0.85"
✅ "Efficiency: Good (85%)"

❌ "Peak demand: 12.4 kW"
✅ "Busiest time: 8 PM (like running 12 hair dryers)"
```

#### C. Natural Time Periods
```
❌ "2026-04-01 to 2026-04-30"
✅ "Last month" / "This month so far" / "March 2026"
```

#### D. Action-Oriented Alerts
```
❌ "Alert: Threshold exceeded"
✅ "Calle Mayor 12 used 40% more than usual — check if AC was left on"
```

#### E. Relative Comparisons
```
❌ "Usage: 1,247 kWh"
✅ "You're using 15% more than similar properties"
```

#### F. Progress Over Perfection
```
Show trend arrows: ↑ ↓ →
Show sparklines (mini charts) for context
Show badges: "Improving", "Stable", "Needs attention"
```

#### G. Property-Centric Organization
```
Group by property, not by metric:
┌─ Calle Mayor 12 ───────────┐
│ €245 this month │ 🟢 Good  │
│ vs €198 last month          │
│ [mini chart]                │
└─────────────────────────────┘

Not:
┌─ All Consumption ──────────┐
│ Property A: 450 kWh         │
│ Property B: 380 kWh         │
│ Property C: 417 kWh         │
└─────────────────────────────┘
```

#### H. Use Spanish Context
- "Factura" not "Invoice"
- "Comunidad" for shared building areas
- "IBI" reference for property tax context
- "kWh" is understood, but always show € alongside

---

## 7. Icon Styles That Feel Friendly

### Recommended: Phosphor Icons
```
Website: https://phosphoricons.com
Style: Clean, rounded, consistent
Weight: Regular or Bold (not Thin)
License: MIT (free)
```

### Why Phosphor?
- **Rounded corners**: Friendly, approachable
- **Consistent stroke width**: Professional but not cold
- **Large set**: 7,000+ icons
- **Variable weight**: Can animate from thin to bold
- **React/Vue/SVG support**: Easy integration

### Icon Usage Rules
```css
/* Small icons (inline, buttons) */
.icon-sm { width: 16px; height: 16px; }

/* Medium icons (card headers) */
.icon-md { width: 20px; height: 20px; }

/* Large icons (empty states, features) */
.icon-lg { width: 24px; height: 24px; }

/* Icon color */
.icon-default { color: var(--text-secondary); }
.icon-accent { color: var(--accent-primary); }
```

### Icon Categories for EnergyOS
```
Navigation:
- House (property overview)
- Lightning (energy/consumption)
- ChartLineUp (analytics)
- Bell (alerts)
- Gear (settings)

Status:
- CheckCircle (good/resolved)
- WarningCircle (attention needed)
- XCircle (problem)
- Info (information)

Actions:
- Plus (add)
- Pencil (edit)
- Trash (delete)
- Download (export)
- Eye (view details)

Energy-specific:
- Lightning (electricity)
- Flame (gas)
- Drop (water)
- Sun (solar)
- Thermometer (temperature)
```

### Alternative Icon Sets
- **Heroicons**: Similar style, also MIT licensed
- **Tabler Icons**: Larger set, slightly more technical feel
- **Lucide**: Fork of Feather, very clean
- **Radix Icons**: Minimal, good for UI chrome

### Anti-patterns
- ❌ Material Symbols: Too corporate, too many variants
- ❌ Font Awesome: Dated, inconsistent styles
- ❌ Emoji-only: Hard to scan, inconsistent across platforms
- ❌ Custom illustrations: Hard to maintain, slow to load

---

## 8. Micro-interactions That Add Warmth

### Hover Effects
```css
/* Card lift */
.card {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Button glow */
.btn-primary:hover {
  box-shadow: 0 0 20px rgba(232, 145, 58, 0.3);
}

/* List item highlight */
.list-item:hover {
  background: var(--bg-hover);
  border-radius: 8px;
}
```

### Loading States
```css
/* Skeleton shimmer */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 25%,
    var(--bg-tertiary) 50%,
    var(--bg-secondary) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Number Animations
```javascript
// Count up animation for metrics
function animateValue(element, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3); // Ease out cubic
    const current = start + (end - start) * easeOut;
    element.textContent = Math.round(current).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

### Status Indicators
```css
/* Pulsing dot for live data */
.status-live {
  width: 8px;
  height: 8px;
  background: var(--accent-success);
  border-radius: 50%;
  position: relative;
}
.status-live::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--accent-success);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}
```

### Toast Notifications
```css
.toast {
  animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-in 4.7s;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### Page Transitions
```css
/* Fade + slight slide for page changes */
.page-enter {
  opacity: 0;
  transform: translateY(8px);
}
.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
```

### Micro-interaction Checklist
- [ ] Cards lift on hover (2px)
- [ ] Buttons glow on hover
- [ ] Numbers count up on first view
- [ ] Charts animate in (draw lines left-to-right)
- [ ] Status dots pulse for live data
- [ ] Toasts slide in from right
- [ ] Skeleton screens while loading
- [ ] Empty states have gentle animation (floating icon)

---

## Summary: Design Token Reference

### Quick Reference Card
```css
:root {
  /* Backgrounds */
  --bg-primary: #1a1d23;
  --bg-secondary: #22262d;
  --bg-tertiary: #2a2f38;
  --bg-hover: #323842;

  /* Text */
  --text-primary: #f0e6d3;
  --text-secondary: #b8b0a4;
  --text-tertiary: #7a756d;

  /* Accent */
  --accent: #e8913a;
  --accent-soft: rgba(232, 145, 58, 0.15);

  /* Semantic */
  --success: #7cb97c;
  --warning: #d4a843;
  --danger: #c97070;
  --info: #6ba3c7;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12);
  --shadow-glow: 0 0 20px rgba(232, 145, 58, 0.3);

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
}
```

### Checklist for EnergyOS Dashboard
- [ ] Dark mode with warm undertones (not pure black)
- [ ] Inter font family throughout
- [ ] Amber (#e8913a) as primary accent
- [ ] 16px card border-radius
- [ ] Phosphor Icons (regular weight)
- [ ] Cards lift on hover
- [ ] Numbers animate on load
- [ ] Show € before kWh
- [ ] Natural language labels ("last month", not "2026-04")
- [ ] Property-centric organization
- [ ] Inline alerts with actionable copy
- [ ] Relative comparisons ("15% more than similar")
- [ ] Spanish-friendly terminology
- [ ] Sparklines for context
- [ ] Status badges with color + text

---

## Resources

### Design Inspiration
- [Linear.app](https://linear.app) — Best-in-class dark dashboard
- [Vercel Dashboard](https://vercel.com/dashboard) — Clean dev tools UI
- [Raycast](https://raycast.com) — Friendly command palette
- [Notion](https://notion.so) — Block-based flexibility
- [Cron](https://cron.com) — Human calendar design

### Tools
- [Phosphor Icons](https://phosphoricons.com) — Icon set
- [Inter Font](https://rsms.me/inter) — Typeface
- [Tailwind CSS](https://tailwindcss.com) — Utility framework
- [Framer Motion](https://www.framer.com/motion) — React animations

### Further Reading
- [Refactoring UI](https://refactoringui.com) — Practical design for developers
- [The Design of Everyday Things](https://en.wikipedia.org/wiki/The_Design_of_Everyday_Things) — UX fundamentals
- [Don't Make Me Think](https://en.wikipedia.org/wiki/Don%27t_Make_Me_Think) — Usability basics

---

*Research compiled for EnergyOS — Energy Management Platform for Spanish Property Managers*
*Date: 2026-05-06*
