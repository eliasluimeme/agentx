# Apple iOS & visionOS Liquid Glass Design System Specification
**Official HIG Research, Layout Grids, Material Tokens & Glassmorphism Reference for AgentX**
*Document Version: 1.0.0 · Author: AgentX Architecture Team · Updated: Q4 2026*

---

## 1. Executive Summary & Design Philosophy

Apple’s interface paradigm is defined by **Liquid Glass**—a unified design system spanning iOS, iPadOS, macOS, watchOS, and visionOS. Liquid Glass synthesizes the optical properties of physical glass (translucency, specular reflection, chromatic refraction, and edge diffusion) with dynamic interface adaptability.

The foundational design principles governing this design language are:
1. **Deference**: The interface recedes and defers to content. Controls and containers exist as luminous, translucent planes that allow the underlying environment and data to infuse into the user's focus.
2. **Clarity**: High-contrast typography (SF Pro / San Francisco), crisp iconographic glyphs (SF Symbols), and vibrant label colors ensure maximum legibility against light, shifting backgrounds.
3. **Depth**: Hierarchical z-axis positioning established via optical thickness, variable blur radii, specular hairline borders, and ambient diffuse elevation shadows.

---

## 2. Liquid Glass Materials System & Tokens

Apple's HIG categorizes materials into four standard thickness tiers, each fulfilling specific semantic roles in the UI hierarchy:

| HIG Material Variant | Semantic Role | Blur Radius | Fill Opacity | Border Specular |
| :--- | :--- | :--- | :--- | :--- |
| **Ultra-Thin Material** | Floating overlays, ambient toolbars, subtle background pills | `blur(16px)` | `rgba(255, 255, 255, 0.55)` | `1px solid rgba(255, 255, 255, 0.70)` |
| **Thin Material** | Interactive controls, contextual suggestion pills, active state cards | `blur(24px)` | `rgba(255, 255, 255, 0.75)` | `1px solid rgba(255, 255, 255, 0.85)` |
| **Regular Material (Default)**| Content cards, grouped table views, modal sheets, window bodies | `blur(36px)` | `rgba(255, 255, 255, 0.85)` | `1px solid rgba(255, 255, 255, 0.95)` |
| **Thick Material** | Primary operating windows, navigation bars, persistent headers | `blur(48px)` | `rgba(255, 255, 255, 0.92)` | `1px solid rgba(255, 255, 255, 0.98)` |

### CSS Implementation Tokens for Web Applications

```css
/* ─── Apple Liquid Glass Web Tokens ─── */
:root {
  /* Ambient Background Canvas */
  --liquid-canvas-bg: #F8FAFC;
  --liquid-ambient-wave-1: rgba(56, 189, 248, 0.18); /* Sky Cyan */
  --liquid-ambient-wave-2: rgba(192, 132, 252, 0.15); /* Lavender */
  --liquid-ambient-wave-3: rgba(96, 165, 250, 0.12); /* Azure Blue */

  /* Text & Vibrancy Hierarchy */
  --label-primary: #0F172A;        /* Slate 900 */
  --label-secondary: #475569;      /* Slate 600 */
  --label-tertiary: #94A3B8;       /* Slate 400 */
  --label-quaternary: #CBD5E1;     /* Slate 300 */
  
  /* System Accents */
  --liquid-accent-blue: #2563EB;
  --liquid-accent-purple: #7C3AED;
  --liquid-accent-emerald: #059669;
  --liquid-accent-amber: #D97706;
  --liquid-accent-rose: #E11D48;
}

/* Regular Liquid Glass Window */
.liquid-glass-window {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(36px) saturate(180%);
  -webkit-backdrop-filter: blur(36px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.88);
  box-shadow: 
    0 20px 50px -12px rgba(15, 23, 42, 0.07),
    0 0 0 1px rgba(255, 255, 255, 0.60) inset;
  border-radius: 28px;
}

/* Thin Liquid Glass Card */
.liquid-glass-card {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.92);
  box-shadow: 
    0 4px 20px -2px rgba(15, 23, 42, 0.035),
    0 1px 3px rgba(15, 23, 42, 0.02);
  border-radius: 20px;
}

/* Ultra-Thin Suggestion Pill */
.liquid-glass-pill {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.90);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
  border-radius: 9999px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.liquid-glass-pill:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(37, 99, 235, 0.35);
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.08);
  transform: translateY(-1px);
}
```

---

## 3. Layout Grid, Spacing & Tap Targets

Apple interfaces operate on strict mathematical rhythmic standards:

### 3.1 The 8pt Rhythm System
All margins, padding, column gutters, and control heights are multiples of **8pt** (or sub-increments of 4pt for micro-badges):
* `4pt`: Micro-tag padding, badge offsets, icon gaps.
* `8pt`: Compact internal padding, pill item spacing.
* `12pt / 16pt`: Standard container padding, card interior margins.
* `20pt / 24pt`: Section header margins, card-to-card separation.
* `32pt / 40pt / 48pt`: Primary section gutters and canvas breathing room.

### 3.2 Human Interface Tap Target Minimums
* **Desktop / Pointer Target**: Minimum `32px × 32px` clickable area.
* **Mobile / Touch Target**: Strict minimum `44px × 44px` interactive bounding box (or `48px` for primary actions), ensuring ergonomic accessibility without accidental misses.

---

## 4. Curvature & Geometry: Continuous Curvature (Squircles)

Apple does not use standard circular arc corner radiuses. Instead, it employs **Continuous Curvature (Super-ellipses / Squircles)** where the curvature transitions tangentially with zero curvature discontinuity:

* **Primary Application Windows**: `28px` to `36px` continuous radius.
* **Content Cards / Modals**: `20px` to `24px` continuous radius.
* **Interactive Buttons**: `14px` to `18px` continuous radius.
* **Status Badges & Capsules**: `9999px` full capsule radius.

```css
/* CSS Continuous Curvature Utility */
.squircle-window {
  border-radius: 28px;
  /* Safari / iOS Continuous Corner Smoothing */
  corner-smoothing: 100%;
}
```

---

## 5. Typography Hierarchy & Optical Sizing

Using Apple's San Francisco (SF Pro) design rules:

| Semantic Style | Optical Sizing | Weight | Target Usage |
| :--- | :--- | :--- | :--- |
| **Large Title** | `32pt – 36pt` (SF Pro Display) | Bold (700) | Greeting ("Good Morning Alex,") |
| **Title 2** | `20pt – 22pt` (SF Pro Display) | Bold (700) | Section Headers ("Here's what needs your attention") |
| **Headline** | `15pt – 17pt` (SF Pro Text) | Semibold (600) | Card Titles, Agent Names |
| **Body** | `13pt – 15pt` (SF Pro Text) | Regular (400) | Conversational text, issue descriptions |
| **Callout / Subhead**| `11pt – 13pt` (SF Pro Text) | Medium (500) | Action button text, status subtitles |
| **Footnote / Caption**| `10pt – 11pt` (SF Pro Text) | Regular / Mono | Timestamps, DID hashes, micro-telemetry |

---

## 6. Living Chromatic Prismatic Orb Specification

The central AI entity in AgentX is modeled after Apple's spatial holographic sphere:
* **Core**: Pearlescent white base (`radial-gradient(circle, #FFFFFF 0%, #F1F5F9 70%, #E2E8F0 100%)`).
* **Prismatic Shell**: Chromatic dispersion ring using conic gradients (`conic-gradient(from 180deg, #38BDF8, #818CF8, #C084FC, #F472B6, #38BDF8)`).
* **Volumetric Ambient Blur**: Outer blurred halo (`blur(32px)`) with slow breathing oscillation (`scale(1.0)` to `scale(1.06)` over 4 seconds).

---

## 7. Reference Checklist for Landing Page Implementation

- [x] Background canvas: `#F8FAFC` with subtle radial cyan & lavender gradients (15-20% opacity).
- [x] macOS style window header with traffic light dots (`#FF5F56`, `#FFBD2E`, `#27C93F`).
- [x] Frosted activity rail with semantic date groups (`Today`, `Yesterday`, `This Week`).
- [x] Central consciousness sphere with multi-layer chromatic refraction.
- [x] Contextual quick action pills with SF Symbols and hairline borders.
- [x] Floating capsule command runner with radial send button.
- [x] Dual-pane attention triage deck with [High, Medium, Low] segmented control.
- [x] Autonomous Mobile Mesh companion with horizontal calendar day strip, Zoom card, and circular voice visualizer.
