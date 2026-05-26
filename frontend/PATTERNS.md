# happy3 Frontend — Code Patterns Reference

A living document of established patterns, standards, and gotchas for this codebase.
Update this file whenever a new pattern is established or a bug is fixed.

---

## 1. Framer Motion — Scroll Reveal Animations

### ✅ Rule: Use `whileInView`, NOT `animate` for below-the-fold sections

`animate` fires immediately on mount regardless of scroll position.
`whileInView` fires only when the element enters the viewport.

```tsx
// ❌ Wrong — fires on mount, user never sees the animation
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>

// ✅ Correct — fires when scrolled into view
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
>
```

**Exception:** Hero section content (HeroContent, HeroVisual) lives above the fold —
these correctly use `animate` because they should fire immediately on page load.

---

## 2. Framer Motion — Cubic Bezier `ease` Arrays

### ✅ Rule: Always use `as const` for cubic bezier arrays in variants defined OUTSIDE JSX

Framer Motion's `Transition` type requires `ease` to be a specific 4-tuple.
TypeScript infers a plain array literal as `number[]`, which doesn't match.
`as const` narrows it to `readonly [0.22, 1, 0.36, 1]`, which does match.

```tsx
// ❌ Type error — TypeScript infers ease as number[]
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ✅ Correct — as const narrows to the exact tuple type
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};
```

> **Why not inline?** When you write `ease={[0.22, 1, 0.36, 1]}` directly in JSX props,
> TypeScript infers the tuple from the prop signature context — no `as const` needed.
> The issue only occurs when the object is defined outside JSX first.

### Brand cubic bezier presets

| Name | Values | Feel |
|---|---|---|
| **Smooth reveal** | `[0.22, 1, 0.36, 1]` | Natural, slightly snappy — used across all sections |
| **Spring-like** | `[0.16, 1, 0.3, 1]` | More elastic, used for hero image entrance |

---

## 3. Framer Motion — Staggered Card Grids

Use `variants` + `staggerChildren` on the container to cascade card reveals.

```tsx
// Define variants OUTSIDE the component to avoid re-creation on each render
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,   // delay between each child
      delayChildren: 0.1,      // initial delay before first child
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Usage — container triggers children automatically
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={cardVariants}>
      {/* card content */}
    </motion.div>
  ))}
</motion.div>
```

> When using `variants`, child `motion` elements do NOT need their own
> `initial` / `whileInView` — they inherit from the parent container automatically.

---

## 4. Framer Motion — Standard Section Heading Block Pattern

Every section follows this consistent left-column animation sequence:

```tsx
{/* 1. Badge — appears first */}
<motion.div
  initial={{ opacity: 0, y: 14 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
>
  <span className="neumorphic pill badge...">Section Label</span>
</motion.div>

{/* 2. Heading — slight delay */}
<motion.h2
  initial={{ opacity: 0, y: 22 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
>
  ...
</motion.h2>

{/* 3. Subtext — slightly more delay */}
<motion.p
  initial={{ opacity: 0, y: 14 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
>
  ...
</motion.p>

{/* 4. CTA button or accent line — last */}
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.25 }}
>
  ...
</motion.div>

{/* 5. Animated accent rule (scaleX reveal) */}
<motion.div
  initial={{ opacity: 0, scaleX: 0 }}
  whileInView={{ opacity: 1, scaleX: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.35 }}
  style={{ transformOrigin: "left center" }}
>
  ...
</motion.div>
```

---

## 5. NeuCard — Built-in Scroll Reveal

`NeuCard` already handles its own `whileInView` animation internally.
Do NOT wrap it in an additional `motion.div` for entrance animation — use the `delay` prop instead.

```tsx
// ✅ Correct — use delay prop for staggering
{items.map((item, index) => (
  <NeuCard key={item.title} delay={index * 0.1} className="p-8 flex flex-col gap-5">
    ...
  </NeuCard>
))}

// ❌ Wrong — double animation wrapping
<motion.div whileInView={...}>
  <NeuCard delay={0.1}>...</NeuCard>
</motion.div>
```

---

## 6. `viewport` Options Reference

| Option | Value | When to use |
|---|---|---|
| `once` | `true` | Always — animations should not replay on scroll-up |
| `margin` | `"-80px"` | Default — triggers slightly before element is fully visible |
| `margin` | `"-50px"` | For counters / tighter triggers (e.g. `useInView` in Counter) |
| `margin` | `"-100px"` | For large sections where earlier trigger feels better |

---

## 7. Scroll Counter Pattern

For number count-up animations tied to scroll visibility:

```tsx
function Counter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    // easeOutExpo — snappy deceleration
    const easeProgress = (p: number) => p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    // ... animation loop with requestAnimationFrame
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}
```

**Key:** The counter only starts when `isInView` becomes `true` (scroll-triggered).

---

## 8. TypeScript Checklist for New Sections

Before shipping a new section component, verify:

- [ ] All below-fold `motion.*` elements use `whileInView`, not `animate`
- [ ] All `viewport` props have `once: true`
- [ ] Cubic bezier arrays defined in external `variants` objects use `as const`
- [ ] `NeuCard` is NOT double-wrapped with entrance motion
- [ ] Variants are defined **outside** the component function (not inside render)

---

## 9. Card Padding — Match Padding to Content Density

Cards with sparse content (icon + title only, or short 1-line descriptions) feel
hollow when given the same generous padding as content-rich cards.

| Content type | Recommended padding | Gap |
|---|---|---|
| Icon + title only (e.g. ChallengeCard) | `p-5` | `gap-4` |
| Icon + title + short desc (1–2 lines) | `p-6` | `gap-4` |
| Icon + title + longer desc (3+ lines) + extras | `p-8` | `gap-5` |

**Rule: Never use `min-h` on cards whose content length varies.** Let content
dictate height naturally so shorter cards don't leave dead space at the bottom.

```tsx
// ❌ Dead space below title when description is short
<NeuCard className="p-8 min-h-[240px] flex flex-col gap-5">

// ✅ Card shrinks to wrap content naturally
<NeuCard className="p-6 flex flex-col gap-4">
```

Also scale down font sizes proportionally:
- Title: `text-[20px]` → `text-[18px]` for compact cards
- Description: `text-[14.5px]` → `text-[13.5px]`
- Description margin-top: `mt-3` → `mt-2`

