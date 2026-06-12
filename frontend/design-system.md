# Happiness Coaching Academy - Warm Minimalism Design System

This document outlines the updated "Warm Minimalism" design system. This system acts as a softer, more grounded alternative to the original purple/mustard high-contrast branding, while still incorporating the premium typography the brand relies on.

## 1. Vibe & Core Principles
*   **Vibe:** Approachable, calm, structured, uplifting, and safe.
*   **Visual Language:** Soft geometry, gentle gradients, and generous white space.
*   **Goal:** To make the user feel a sense of inner balance and personal growth.

## 2. Color Palette (Warm Minimalism)
The new palette steps away from high-saturation colors to reduce cognitive load and create a softer "spa for the mind" aesthetic.

### Semantic Tokens
*   **Background (Warm Off-White):** `#FDFBF7`
    *   *Why:* Pure white feels too clinical. A slightly warm off-white feels human and inviting.
*   **Text & Foreground (Soft Charcoal):** `#2D3748`
    *   *Why:* Pure black (`#000000`) is too harsh against warm backgrounds.
*   **Primary / CTA (Soft Coral):** `#E67451`
    *   *Why:* Retains the energy of the original "Mustard", but shifts toward a warmer, more grounded, empathetic tone.
*   **Secondary / Highlights (Sage Green):** `#6B8E7B`
    *   *Why:* Represents growth, balance, and calm—crucial elements for a coaching academy.
*   **Accent / Deep (Warm Ochre):** `#E3963E`
    *   *Why:* A softer, earthier version of yellow that maintains positivity without being visually aggressive.

## 3. Typography
The brand uses the premium and geometric **Satoshi** font.

*   **Headings (`h1-h6`):** Satoshi Variable
    *   *Weight:* Bold (700) or Black (900) for major Hero statements.
*   **Body Text (`p`):** Satoshi Variable
    *   *Weight:* Regular (400) or Medium (500)
    *   *Usage:* With increased line-height (1.6 - 1.75) to give the text breathing room.

## 4. UI Elements & Layout
*   **Corners / Border Radius:** Standardized to softer curves (e.g., `8px` for small buttons, `12px` for normal elements, `16px` for cards).
*   **Shadows:** Shadows are tinted with the brand's warm colors (e.g., slight orange/ochre tints) rather than pure black, ensuring shadows feel like "warm glows" rather than harsh drop-shadows.

## 5. Interaction Patterns
*   **Transitions:** All hover states and layout changes should use slow, gentle transitions (150ms-300ms, ease-out).
*   **Click Feedback:** Buttons should have a subtle scale-down effect (e.g., `scale: 0.98`) to feel tactile but not bouncy.

## 6. CSS Variable Mapping (globals.css)
*   `--primary`, `--mustard` → mapped to Coral (`#E67451`)
*   `--secondary` → mapped to Sage Green (`#6B8E7B`)
*   `--purple-brand`, `--patriarch` → mapped to Warm Ochre (`#E3963E`)
*   `--background`, `--page-bg`, `--hero-bg` → `#FDFBF7`
*   `--foreground`, `--text-heading` → `#1A202C` and `#2D3748`
