# The Unified Apple Design System Specification
**Comprehensive Master Reference: macOS, iOS, iPadOS, visionOS, and watchOS**
*Document Version: 2.0.0 · Author: AgentX Architecture & Design Systems Team · Updated: Q4 2026*

---

## 1. The Core Philosophy: Clarity, Deference, and Depth

Apple's design system across all five hardware ecosystems (**macOS, iOS, iPadOS, visionOS, watchOS**) is founded on three unified pillars, bound together by systemic consistency:

```
                  ┌────────────────────────────────────────┐
                  │          THE APPLE HIG TRIAD           │
                  └───────────────────┬────────────────────┘
                                      │
            ┌─────────────────────────┼─────────────────────────┐
            ▼                         ▼                         ▼
      ┌───────────┐             ┌───────────┐             ┌───────────┐
      │  CLARITY  │             │ DEFERENCE │             │   DEPTH   │
      └─────┬─────┘             └─────┬─────┘             └─────┬─────┘
            │                         │                         │
  • High-contrast SF Pro     • Translucent Liquid Glass • Multi-layer z-axis
  • Optical sizing & weights • Content-first planes     • Specular hairlines
  • SF Symbols hierarchy     • Chrome recedes           • Physical spring physics
```

1. **Clarity**: Text is legible at every scale, glyphs are precise, and negative space is generous. The interface guides attention without visual clutter.
2. **Deference**: Interface containers, navigation bars, and toolbars do not compete with user content. Translucent planes allow ambient environmental luminance to bleed through, grounding digital objects in physical space.
3. **Depth**: The z-axis is communicated through optical thickness, realistic lighting angles, specular edge highlights, and physics-based spring animations.

---

## 2. Cross-Platform Ecosystem Matrix

| Platform | Input Paradigm | Primary Material Role | Key Distinguishing Pattern |
| :--- | :--- | :--- | :--- |
| **macOS** | Mouse pointer, precise cursor, keyboard | `NSVisualEffectView` (`.sidebar`, `.hudWindow`) | Unified titlebar + toolbar, traffic light window controls, vibrant sidebars, split views, menu bar integration |
| **iOS** | Multi-touch, direct thumb manipulation | `UIVisualEffectView` (`.systemMaterialLight`) | Dynamic Island, floating capsule tab bars, segmented controls, full-screen interactive sheets |
| **iPadOS** | Touch, Apple Pencil, Trackpad | Adaptive multi-window materials | Stage Manager, draggable split views, responsive sidebars transforming to floating tabs |
| **visionOS** | Eye gaze, pinch gestures, spatial tracking | Spatial volumetric Glass (`glassBackgroundEffect`) | Ornaments floating outside window bounds, light-reactive specular edges, dynamic luminance adaptation |
| **watchOS** | Digital Crown, micro-touch, glances | Glanceable high-contrast OLED materials | Corner circular gauges, modular complications, high-density typographic scannability |

---

## 3. The Materials Architecture: "Liquid Glass"

Apple replaces flat opacities with **Liquid Glass**—a multi-pass shader combining dynamic blur, chromatic saturation boost, and specular reflection.

### 3.1 The 5 Semantic HIG Material Tiers

| HIG Material | Backdrop Blur | Fill Opacity (Light) | Specular Edge Highlight | Target Platform Components |
| :--- | :--- | :--- | :--- | :--- |
| **`.ultraThinMaterial`** | `blur(16px)` | `rgba(255, 255, 255, 0.55)` | `1px solid rgba(255, 255, 255, 0.70)` | Suggestion pills, floating search capsules, visionOS ornaments |
| **`.thinMaterial`** | `blur(24px)` | `rgba(255, 255, 255, 0.72)` | `1px solid rgba(255, 255, 255, 0.85)` | Action cards, calendar dates, quick toggle buttons, hover states |
| **`.regularMaterial`** | `blur(36px)` | `rgba(255, 255, 255, 0.85)` | `1px solid rgba(255, 255, 255, 0.95)` | Grouped table cards, triage queue rows, modal sheets |
| **`.thickMaterial`** | `blur(48px)` | `rgba(255, 255, 255, 0.92)` | `1px solid rgba(255, 255, 255, 0.98)` | macOS window chassis, navigation headers, persistent sidebars |
| **`.ultraThickMaterial`**| `blur(64px)` | `rgba(255, 255, 255, 0.96)` | `1px solid rgba(255, 255, 255, 1.00)` | High-security dialogs, alert sheets, persistent docks |

### 3.2 The Specular Lighting Rule
In Apple hardware and software, light originates from the top-left (approx. 45° angle). A true Apple glass container always features:
1. **Top & Left Hairline Highlight**: `rgba(255, 255, 255, 0.85)` to `rgba(255, 255, 255, 0.95)` at 0.5px to 1px thickness.
2. **Bottom & Right Ambient Shadow**: `rgba(15, 23, 42, 0.04)` to `rgba(15, 23, 42, 0.08)`.
3. **Inner Specular Bevel**: An inset shadow (`box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)`) creating optical physical glass depth.

---

## 4. Vibrancy & Semantic Color System

Apple avoids hardcoded RGB values for text and fills. Instead, it defines **Semantic Vibrancy Tokens** that dynamically balance contrast against translucent materials:

### 4.1 Foreground Vibrancy Levels
* **`label`** (`#0F172A` / 100% opacity): Primary headers, active titles, high-priority numbers.
* **`secondaryLabel`** (`#475569` / 65% opacity): Subtitles, descriptions, inactive tab titles, metadata.
* **`tertiaryLabel`** (`#94A3B8` / 35% opacity): Placeholder text, inactive icons, keyboard shortcuts.
* **`quaternaryLabel`** (`#CBD5E1` / 18% opacity): Dividers, subtle borders, background fills.

### 4.2 System Accent Palette
* **`systemBlue`** (`#2563EB` / `#007AFF`): Primary interactive tint, links, confirmation buttons.
* **`systemPurple`** (`#7C3AED` / `#AF52DE`): Creative features, AI / synthesis modes, audio spaces.
* **`systemCyan`** (`#0284C7` / `#32ADE6`): Technical telemetry, code commits, neural indices.
* **`systemGreen`** (`#059669` / `#34C759`): Live online indicators, verified badges, active GDP growth.
* **`systemOrange`** (`#D97706` / `#FF9500`): In-progress reasoning, warnings, priority alerts.
* **`systemRed`** (`#E11D48` / `#FF3B30`): High-urgency triage, build failures, duel challenges.

---

## 5. Typography: San Francisco (SF) Font Family

Apple uses optical sizing to optimize letterforms for reading distance and physical screen dimensions:

```
  Large Title (34pt)  ──►  SF Pro Display (Bold 700, Tight Tracking -0.4pt)
  Title 1 (28pt)      ──►  SF Pro Display (Bold 700, Tracking -0.2pt)
  Title 2 (22pt)      ──►  SF Pro Display (Bold 700, Tracking 0pt)
  Headline (17pt)     ──►  SF Pro Text (Semibold 600, Optical Spacing)
  Body (17pt)         ──►  SF Pro Text (Regular 400, Leading 22pt)
  Callout (16pt)      ──►  SF Pro Text (Regular / Medium 500)
  Subhead (15pt)      ──►  SF Pro Text (Regular 400)
  Footnote (13pt)     ──►  SF Pro Text (Regular 400)
  Caption 1 (12pt)    ──►  SF Pro Text (Medium 500)
  Code / Hashes       ──►  SF Mono (Medium 500, Strict Tabular Figures)
```

---

## 6. Geometry: The Apple Squircle (Continuous Curvature)

A standard CSS `border-radius: 24px` creates an abrupt transition where the straight edge meets the circular arc (derivative discontinuity). Apple solves this by using **Lamé Super-Ellipses** (also known as continuous curvature squircles):

$$\left|\frac{x}{a}\right|^n + \left|\frac{y}{b}\right|^n = 1 \quad \text{where } n \approx 5$$

### Apple Squircle Radius Hierarchy
* **Desktop Application Windows**: `28px – 36px` continuous radius.
* **Large Modal Sheets & Cards**: `20px – 24px` continuous radius.
* **Small Action Cards & Controls**: `14px – 16px` continuous radius.
* **Interactive Pills & Badges**: `9999px` full capsule radius.

```css
/* Web implementation of continuous curvature */
.apple-squircle {
  border-radius: 28px;
  /* Supported in WebKit / Safari */
  corner-smoothing: 100%;
}
```

---

## 7. Motion: Mass-Spring-Damper Physics

Apple explicitly rejects linear and cubic Bézier timing curves like `ease-in-out` for interactive navigation. Everything is animated using physical **Mass-Spring-Damper Solvers**:

$$\ddot{x} + 2\zeta\omega_0\dot{x} + \omega_0^2 x = 0$$

* $\omega_0$ (Natural frequency / Response): Dictates how fast the spring reaches its destination (`0.35s – 0.5s`).
* $\zeta$ (Damping ratio): Dictates whether the movement overshoots or settles smoothly:
  * **Critically Damped ($\zeta = 1.0$)**: Default window transitions, sheets, search expansions. Smooth with zero bounce.
  * **Sub-Critically Damped ($\zeta = 0.75 – 0.82$)**: Tactile buttons, pill selection, card expansions. Crisp, authoritative click feeling.
  * **Underdamped / Playful ($\zeta = 0.60 – 0.70$)**: Micro-badges, notification pings, living AI orb hover.

---

## 8. Web Implementation Reference Code

```css
/* ─── Unified Apple Design System CSS Master Sheet ─── */

/* 1. Canvas Foundation */
.apple-canvas {
  background-color: #F8FAFC;
  background-image: 
    radial-gradient(at 85% 15%, rgba(56, 189, 248, 0.20) 0px, transparent 55%),
    radial-gradient(at 15% 85%, rgba(192, 132, 252, 0.16) 0px, transparent 55%),
    radial-gradient(at 50% 50%, rgba(96, 165, 250, 0.12) 0px, transparent 65%);
  color: #0F172A;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, sans-serif;
}

/* 2. macOS Window Chrome */
.apple-macos-window {
  background: rgba(255, 255, 255, 0.70);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.90);
  border-radius: 28px;
  box-shadow: 
    0 30px 60px -15px rgba(15, 23, 42, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.70) inset;
}

/* 3. macOS Traffic Lights */
.apple-traffic-dot-close {
  background-color: #FF5F56;
  border: 1px solid rgba(224, 68, 62, 0.6);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4);
}

.apple-traffic-dot-min {
  background-color: #FFBD2E;
  border: 1px solid rgba(222, 161, 35, 0.6);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4);
}

.apple-traffic-dot-max {
  background-color: #27C93F;
  border: 1px solid rgba(26, 171, 41, 0.6);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4);
}

/* 4. Liquid Glass Content Card */
.apple-card {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  box-shadow: 
    0 4px 20px -2px rgba(15, 23, 42, 0.035),
    0 1px 2px rgba(15, 23, 42, 0.02);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.apple-card:hover {
  background: rgba(255, 255, 255, 0.94);
  border-color: rgba(37, 99, 235, 0.3);
  box-shadow: 
    0 12px 30px -4px rgba(15, 23, 42, 0.06),
    0 2px 6px rgba(15, 23, 42, 0.03);
  transform: translateY(-1px);
}

/* 5. Ultra-Thin Floating Pill */
.apple-pill {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.90);
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.apple-pill:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(37, 99, 235, 0.35);
  transform: translateY(-1px);
}
```
