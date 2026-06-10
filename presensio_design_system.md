# Presensio-Style Floating Hero Design System

This document outlines the exact design tokens and CSS patterns required to recreate the "Floating Paper" hero section style in any project.

## 1. Core Principles

- **Vibe**: Premium, calm, airy, minimal, editorial, soft, warm, modern.
- **Constraints**: 
  - NO harsh shadows
  - NO strong color gradients (except soft ambient glows)
  - NO neon colors
  - NO heavy glassmorphism
  - NO pure black or pure white text/backgrounds.

---

## 2. Color Palette

### Backgrounds
- **Page Background (`--page-bg`)**: `#F8F5F2` (A solid, warm off-white canvas)
- **Hero Surface (`--hero-bg`)**: `#FAF7F4` (A slightly lighter warm tone, acting as the "paper")

### Typography & Elements
- **Heading Text (`--text-heading`)**: `#5A4D4D` (Soft, warm dark gray/brown)
- **Body Text (`--text-body`)**: `#6E6A67` (Muted warm gray)
- **Primary CTA (`--cta-bg`)**: `#F56E57` (Warm, friendly soft orange)
- **CTA Hover (`--cta-hover`)**: `#F15C45` 
- **Badge Text (`--badge-text`)**: `#1B8D8D` (Subtle teal)
- **Badge Border (`--badge-border`)**: `rgba(0, 150, 150, 0.3)`

---

## 3. Structural Properties

### The "Floating" Effect
The hero surface must sit inside the viewport with a generous gap on all sides.
- **Outer Gap**: `40px` padding on desktop (scale down to `16px` on mobile).
- **Surface Shape**: `border-radius: 48px;` (Large, organic, soft corners).
- **Surface Border/Shadow**: Avoid hard borders. Use a barely visible shadow to detach it from the background: `box-shadow: 0 0 1px rgba(0, 0, 0, 0.04);`.

### Floating Navbar
Sits inside the hero surface, separated from the edges.
- **Spacing**: `margin: 20px 24px 0 24px;`
- **Surface**: `background: rgba(255, 255, 255, 0.70);`
- **Blur**: `backdrop-filter: blur(12px);`
- **Shape**: `border-radius: 28px; height: 72px;`
- **Shadow/Border**: `border: 1px solid rgba(0, 0, 0, 0.04); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);`

---

## 4. The Ambient Glow System

The glow exists **only at the top** of the hero container and fades out entirely before it reaches the main text content.

- **Positioning**: Absolutely positioned container spanning the top `600px` of the hero surface.
- **Z-Index**: Placed *behind* the navbar and content, but *above* the base background.
- **Gradients** (Applied via CSS `background`):
  1. **Left Glow (Soft Pink)**: `radial-gradient(circle at 15% 0%, rgba(255, 190, 220, 0.55) 0%, rgba(255, 190, 220, 0) 50%)`
  2. **Right Glow (Soft Peach)**: `radial-gradient(circle at 85% 0%, rgba(255, 220, 170, 0.55) 0%, rgba(255, 220, 170, 0) 50%)`
  3. **Center Blend (Subtle Coral)**: `radial-gradient(circle at 50% 0%, rgba(255, 210, 200, 0.20) 0%, rgba(255, 210, 200, 0) 60%)`

---

## 5. The Tiled Grain Texture

To mimic high-quality paper, a very fine, tiled SVG noise is applied over the top of the glows. Like the glows, the grain must fade out so the bottom of the section remains perfectly clean.

### Properties
- **Blend Mode**: `mix-blend-mode: multiply;`
- **Opacity**: `0.03` (must remain extremely subtle)
- **Tiling**: `background-size: 150px 150px; background-repeat: repeat;` (Prevents the noise from stretching and looking cloudy/distant).
- **Z-Index**: Placed *above* the glow, but *below* the content.

### Fade Mask
To make the grain disappear exactly where the ambient colors do, apply a CSS mask to the noise element:
```css
-webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 600px);
mask-image: linear-gradient(to bottom, black 0%, transparent 600px);
```

### SVG Base Code
The specific noise generator URL:
```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
```
*(Note: `baseFrequency` around `1` to `1.5` combined with `background-size: 150px` ensures a tight, realistic paper feel).*

---

## 6. Typography Guidelines

- **Headings**: Editorial serif fonts (e.g., Georgia, Times New Roman, or custom fonts like "Editorial New"). Keep tracking tight (`letter-spacing: -0.04em;`) and line-heights snug (`1.1`).
- **Body**: Clean, modern sans-serifs (e.g., Inter, system-ui). Use generous line heights (`1.7`) for readability. 
- **Alignment**: Center-aligned layout with large amounts of whitespace (e.g., `120px` padding around the text block).
