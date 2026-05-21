# Happiness Coaching Academy — Design System

## Design Philosophy

The UI should feel emotionally calming, premium, soft, uplifting, and transformational.

The design language combines:
- Soft Neumorphism
- Emotional wellness branding
- Premium SaaS-style structure
- Human-centered layouts
- Floating geometric branding
- Smooth motion aesthetics

The interface should create a feeling of:
- emotional safety
- positivity
- inner transformation
- clarity
- warmth
- trust

Avoid:
- harsh contrast
- dark heavy UI
- sharp edges
- aggressive gradients
- corporate dashboard feel
- overly colorful layouts

---

# Core Visual Identity

## Brand Element

The primary brand element is:

> A thick smiling circular arc.

This arc acts as:
- a smile symbol
- a transformation path
- emotional uplift
- positive movement
- happiness journey

The arc should:
- feel soft and human
- use thick rounded geometry
- have smooth curvature
- appear partially visible
- float around sections
- guide visual flow

---

# Arc Design Rules

## Shape

The arc must:
- be part of a large invisible circle
- appear as a cropped curved segment
- have fully rounded caps
- be thick and smooth
- tilt diagonally slightly
- resemble a smiling curve

---

## Arc Personality

The arc should feel:
- uplifting
- elegant
- emotionally warm
- optimistic
- modern
- soft
- premium

---

## Arc Colors

### Mustard Yellow Arc
HEX: #FFCE1B

Used for:
- positive emotions
- smile symbolism
- uplifting moments
- CTA emphasis
- emotional highlights

---

### Patriarch Purple Arc
HEX: #800080

Used for:
- emotional depth
- transformation
- wisdom
- premium identity
- grounding visuals

---

# Color System

## Primary Colors

### Mustard Yellow
HEX: #FFCE1B

Meaning:
- happiness
- positivity
- confidence
- emotional energy

Usage:
- highlight text
- icons
- CTA buttons
- smile arcs
- important UI accents

---

### Patriarch Purple
HEX: #800080

Meaning:
- wisdom
- transformation
- emotional awareness
- calm intelligence

Usage:
- headings
- buttons
- gradients
- cards
- decorative elements

---

## Neutral Colors

### Soft Background
HEX: #F6F3FA

Use instead of pure white.

Purpose:
- improves yellow visibility
- creates softer neumorphism
- reduces eye strain
- creates premium softness

---

### Light Lavender Surface
HEX: #EEE8F7

Used for:
- elevated neumorphic surfaces
- cards
- containers

---

### Nature Black
HEX: #111810

Used for:
- body text
- high readability
- premium contrast

---

# Typography System

## Font Family

Satoshi Variable

Fallback:
- Inter
- sans-serif

---

## Font Weights

### Regular
Use for:
- body text
- descriptions

### Medium
Use for:
- navigation
- labels
- supporting headings

### Bold
Use for:
- section headings
- CTA emphasis

### Black
Use for:
- hero titles
- impact statements

---

# Layout Rules

## Overall Layout

The website should:
- feel spacious
- use large breathing room
- maintain soft visual hierarchy
- avoid cramped sections

---

## Container Width

Recommended:
- max-width: 1280px
- centered layout

---

## Section Spacing

Desktop:
- padding-top: 120px
- padding-bottom: 120px

Mobile:
- padding-top: 72px
- padding-bottom: 72px

---

# Neumorphism System

## Core Style

All cards and buttons should use:
- soft outer shadows
- subtle inner highlights
- rounded corners
- low contrast surfaces

---

## Neumorphism Shadow Style

Use:
- light top-left highlight
- soft bottom-right shadow

Example:
box-shadow:
  10px 10px 30px rgba(0,0,0,0.08),
  -10px -10px 30px rgba(255,255,255,0.9);

---

## Border Radius

Cards:
- 28px to 40px

Buttons:
- fully rounded pills

Icons:
- circular neumorphic containers

---

# Hero Section Pattern

## Structure

Hero should contain:
1. Navigation
2. Hero text content
3. CTA buttons
4. Floating emotional tags
5. Main portrait image
6. Smiling arc behind image
7. Floating decorative particles
8. Stats section

---

# Hero Layout

Desktop:
- two-column grid
- left text content
- right image composition

Mobile:
- stacked layout
- centered alignment

---

# Hero Typography

## Hero Heading

Style:
- bold
- oversized
- elegant spacing
- split color emphasis

Example:
Transforming Minds,
Elevating Lives.

Use:
- purple for primary words
- yellow for emotional keywords

---

## Hero Paragraph

Should feel:
- calm
- supportive
- emotionally intelligent

Max width:
- 540px

Line-height:
- 1.9

---

# Floating Elements

## Floating Tags

Examples:
- Awareness
- Emotional Clarity
- Mindset Shift
- Growth
- Confidence

Style:
- floating neumorphic pills
- soft shadows
- circular icons
- blur background
- subtle hover movement

---

# Buttons

## Primary Button

Style:
- purple gradient
- white text
- glowing shadow
- rounded pill shape

Hover:
- slight lift
- brighter glow

---

## Secondary Button

Style:
- soft neumorphic surface
- purple text
- minimal border

---

# Card System

Cards should:
- float softly
- use layered depth
- maintain visual softness
- avoid hard outlines

---

# Icon Style

Icons should:
- use rounded strokes
- feel minimal
- match neumorphic aesthetic
- combine purple and yellow

---

# Motion Guidelines

Animations should feel:
- smooth
- floating
- calming
- organic

Avoid:
- fast animations
- sharp transitions
- excessive movement

---

# Animation Suggestions

Use Framer Motion.

Recommended:
- floating particles
- slow smile arc rotation
- fade-up entrance animations
- soft hover lift
- blur transitions
- gradient breathing

---

# Background System

The entire page should use:
- one connected background
- smooth gradient blending
- soft radial overlays

Avoid:
- separate disconnected section backgrounds

---

# Recommended Background Gradient

Use:
- soft lavender
- pale purple
- warm cream
- subtle yellow glow

Example:
background:
radial-gradient(circle at top left, rgba(128,0,128,0.08), transparent 40%),
radial-gradient(circle at bottom right, rgba(255,206,27,0.12), transparent 40%),
#F6F3FA;

---

# Decorative Elements

Use:
- soft blurred circles
- dotted wave patterns
- smile arcs
- floating particles
- subtle glow effects

Keep decorations:
- minimal
- soft
- low opacity

---

# Accessibility

Ensure:
- yellow text always has contrast
- body text is readable
- interactive elements are large enough
- spacing improves readability

Never place:
- yellow text directly on white background

Always use:
- soft cream/lavender background behind yellow elements