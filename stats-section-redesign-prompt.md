# Redesign Existing Stats Section to Premium Neumorphic Style (Tailwind CSS)

## Objective

Redesign the existing stacts/counter section to match the attached reference design.

**Important:**

* Do NOT rebuild the section from scratch.
* Refactor the existing component and preserve all current functionality, responsiveness, animations, and data bindings.
* Only upgrade the visual design system and layout.
* The project uses **React + Tailwind CSS**.

---

## Design Direction

Create a premium, modern neumorphic statistics section with:

* Soft elevated surfaces
* Wellness / healthcare SaaS aesthetic
* Apple-inspired minimalism
* Elegant depth and subtle shadows
* Clean spacing and typography
* Professional and trustworthy appearance

The final result should closely match the visual feel of the provided reference image.

---

## Layout Structure

### Desktop

Display all statistics inside a single large horizontal card.

Example:

```text
[ Icon ] 20k+        |      [ Icon ] 99%        |      [ Icon ] 10+
         Lives transformed              Client satisfaction          Countries reached
```

### Tablet

* 2-column grid
* Maintain equal spacing

### Mobile

* Single-column stack
* Center-aligned content
* Maintain comfortable spacing

---

## Main Container

### Requirements

* Single unified card
* Large border radius (24px–32px)
* Soft neumorphic appearance
* No visible borders
* Maximum width: 1100px–1200px
* Center aligned
* Generous padding

### Background

Use a very light neutral background:

```css
#F5F4F8
```

or similar Tailwind equivalents:

```html
bg-zinc-100/80
```

### Neumorphic Shadow

Create a soft elevated effect using custom Tailwind classes or arbitrary values.

Visual goal:

```css
box-shadow:
  -8px -8px 16px rgba(255,255,255,0.9),
   8px  8px 16px rgba(190,190,210,0.22);
```

The component should feel softly lifted from the page.

---

## Statistics Items

Each stat item should contain:

### Icon

* Circular icon container
* 56px–72px size
* Neumorphic elevated appearance
* Center aligned
* Soft shadows

Example:

```css
box-shadow:
  -4px -4px 10px rgba(255,255,255,0.9),
   4px  4px 10px rgba(180,180,200,0.25);
```

### Icon Colors

Primary accent:

```css
#8B5CF6
```

Secondary accent (optional):

```css
#F5B942
```

for one highlighted stat.

---

## Typography

### Stat Number

Requirements:

* Font weight: 700–800
* Font size: 32px–40px
* High visual emphasis
* Dark purple/navy tone

Suggested Tailwind:

```html
text-3xl md:text-4xl
font-bold
text-slate-900
```

### Label

Requirements:

* Font size: 14px–16px
* Medium weight
* Muted gray-purple tone

Suggested Tailwind:

```html
text-sm md:text-base
text-slate-500
```

---

## Dividers

Add subtle vertical separators between stat items.

Requirements:

* Extremely soft
* Low opacity
* Elegant
* No harsh borders

Suggested style:

```html
border-l
border-slate-200/50
```

or

```html
bg-slate-200/40
w-px
```

---

## Spacing

Maintain generous spacing throughout:

### Container Padding

```html
px-8 md:px-12
py-6 md:py-8
```

### Between Icon and Text

```html
gap-4
```

### Between Stats

```html
gap-8 md:gap-10
```

The section should feel airy and premium.

---

## Hover Effects

Add subtle interaction:

### Hover State

* Slight upward movement
* Slight shadow enhancement
* Smooth transitions

Example:

```html
transition-all duration-300
hover:-translate-y-1
```

Avoid:

* Aggressive scaling
* Bouncy animations
* Excessive glow

---

## Tailwind Implementation Requirements

### Prefer Tailwind Utilities

Use Tailwind utilities wherever possible.

Only use custom CSS for:

* Neumorphic shadow definitions
* Complex shadow combinations

### Avoid

* Glassmorphism
* Heavy gradients
* Strong borders
* Dark backgrounds
* Large drop shadows
* Overly colorful accents

---

## Accessibility

Ensure:

* Proper contrast ratios
* Semantic HTML
* Keyboard accessibility
* Responsive behavior
* Screen-reader friendly structure

---

## Desired Visual Outcome

The finished component should feel like:

* Premium healthcare platform
* Mental wellness SaaS
* Modern telehealth dashboard
* High-end productivity software
* Soft neumorphic Apple-inspired design

The visual language should closely resemble the attached reference image while maintaining the project's existing functionality and responsiveness.

---

## Additional Requirement

Review the current component structure first and refactor it intelligently instead of replacing everything. Preserve:

* Existing data mapping
* Existing animations
* Existing responsiveness
* Existing component API

Only modernize the visual design and spacing to match the provided neumorphic reference.
