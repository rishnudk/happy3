# Admin Dashboard Design System

## Overview

A modern, minimal, productivity-focused admin dashboard inspired by Linear, Notion, Slack, and modern SaaS products.

### Design Principles

* Clean whitespace
* Soft borders
* Large rounded corners
* Neutral color palette
* Subtle accent colors
* High readability
* Enterprise SaaS feel
* Minimal shadows
* Consistent spacing

---

# Layout Structure

```txt
┌─────────────────────────────────────────────┐
│ Top Navigation                              │
├───────┬─────────────────────────────────────┤
│       │                                     │
│       │ Greeting Header                     │
│       │                                     │
│ Side  │ Statistics Cards                    │
│ Bar   │                                     │
│       │ Quick Actions                       │
│       │                                     │
│       │ Tasks List     Notifications        │
│       │                                     │
└───────┴─────────────────────────────────────┘
```

---

# Design Tokens

## Border Radius

```css
--radius-xs: 8px;
--radius-sm: 12px;
--radius-md: 16px;
--radius-lg: 20px;
--radius-xl: 24px;
```

---

## Spacing Scale

```css
4px
8px
12px
16px
24px
32px
48px
64px
```

Recommended:

```txt
Card Padding      → 24px
Page Padding      → 32px
Section Gap       → 24px
Sidebar Padding   → 16px
```

---

# Typography

## Font Family

```txt
Inter
Geist
SF Pro Display
```

## Heading Styles

```css
font-weight: 700;
letter-spacing: -0.03em;
```

## Font Sizes

```css
Hero Heading: 40px
Page Title: 24px
Stat Number: 48px
Body Text: 15px
Caption: 13px
```

---

# Light Theme

## Backgrounds

```css
--bg: #fafafa;
--surface: #ffffff;
--surface-secondary: #f7f7f7;
```

## Text

```css
--text-primary: #111111;
--text-secondary: #666666;
--text-muted: #8e8e8e;
```

## Borders

```css
--border: #e7e7e7;
```

## Accent Colors

```css
--blue: #4f8cff;
--green: #36c275;
--orange: #f6a623;
--purple: #a78bfa;
--red: #ff5c5c;
```

---

# Dark Theme

## Backgrounds

```css
--bg: #0f1115;
--surface: #171a21;
--surface-secondary: #1d2129;
```

## Text

```css
--text-primary: #ffffff;
--text-secondary: #b8bcc6;
--text-muted: #808794;
```

## Borders

```css
--border: #2b313c;
```

## Accent Colors

```css
--blue: #5b8cff;
--green: #42d88c;
--orange: #ffb347;
--purple: #b794ff;
--red: #ff6b6b;
```

---

# Sidebar

## Width

```css
280px
```

## Active Item

Light Mode

```css
background: #111111;
color: #ffffff;
border-radius: 16px;
```

Dark Mode

```css
background: #ffffff;
color: #111111;
border-radius: 16px;
```

---

# Top Navigation

## Height

```css
72px
```

## Elements

```txt
Search Bar
Theme Toggle
Notifications
User Avatar
```

---

# Search Component

```css
height: 44px;
border-radius: 14px;
background: var(--surface);
border: 1px solid var(--border);
padding-inline: 16px;
```

---

# Statistics Cards

## Layout

```txt
4 Cards
Equal Width
Responsive Grid
```

## Card Style

```css
padding: 24px;
border-radius: 20px;
border: 1px solid var(--border);
background: var(--surface);
```

## Structure

```txt
Icon
Large Number
Label
```

## Number

```css
font-size: 48px;
font-weight: 700;
```

---

# Quick Action Buttons

## Style

```css
height: 44px;
padding-inline: 18px;
border-radius: 14px;
border: 1px solid var(--border);
background: var(--surface);
```

## Primary Action

```css
background: #f3e8ff;
color: #7c3aed;
border-color: #d8b4fe;
```

---

# Tasks Section

## Row Style

```css
height: 56px;
padding-inline: 16px;
border-bottom: 1px solid var(--border);
```

## Structure

```txt
Status Dot
Task Name
Metadata
```

---

# Notifications Panel

## Style

```css
background: var(--surface-secondary);
border-radius: 20px;
border: 1px solid var(--border);
```

## Structure

```txt
Icon
Title
Timestamp
Unread Indicator
```

---

# Global Card Style

```css
background: var(--surface);
border: 1px solid var(--border);
border-radius: 20px;
box-shadow: none;
```

---

# Hover States

## Light

```css
background: rgba(0, 0, 0, 0.02);
```

## Dark

```css
background: rgba(255, 255, 255, 0.04);
```

## Transition

```css
transition: all 0.2s ease;
```

---

# Responsive Behavior

## Desktop

```txt
Sidebar Visible
4 Stat Cards
2 Column Content Area
```

## Tablet

```txt
Collapsible Sidebar
2 Stat Cards Per Row
```

## Mobile

```txt
Drawer Sidebar
1 Stat Card Per Row
Single Column Layout
```

---

# Visual Style Keywords

```txt
Minimal
Professional
Modern SaaS
Enterprise
Productivity
Linear Style
Notion Style
Clean
Focused
Elegant
```

---

# Avoid

```txt
Heavy Shadows
Glassmorphism
Neon Colors
Complex Gradients
Crypto Dashboard Styling
Gaming UI Elements
```

---

# Tailwind Theme Tokens

```js
theme: {
  extend: {
    borderRadius: {
      card: "20px",
      button: "12px",
    },
    colors: {
      background: "var(--bg)",
      surface: "var(--surface)",
      border: "var(--border)",
      primary: "var(--text-primary)",
      secondary: "var(--text-secondary)",
    }
  }
}
```

---

# Design Summary

A clean enterprise dashboard that combines:

* Linear's minimalism
* Notion's spacing
* Slack's information hierarchy
* Modern SaaS usability

The interface should feel calm, professional, highly readable, and productivity-focused in both Light and Dark modes.
