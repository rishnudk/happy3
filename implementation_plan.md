# 🚀 Performance Audit & Optimization Plan — Happy3 Frontend

A full analysis of your Next.js project to identify every performance bottleneck and provide a prioritized, step-by-step fix plan.

---

## 🔍 Diagnostic Tools — How to Find Performance Bugs

Before fixing anything, here are the tools to measure and profile your site:

### Browser Built-In

| Tool | What it reveals | How to access |
|---|---|---|
| **Chrome Lighthouse** | Overall perf score, LCP, FID, CLS, TTI | DevTools → Lighthouse tab → Run audit |
| **Chrome Performance Panel** | Frame-by-frame CPU/GPU timeline, long tasks, layout shifts | DevTools → Performance → Record → Reload |
| **Chrome Network Panel** | Waterfall of every request, sizes, blocking resources | DevTools → Network → Disable cache → Reload |
| **Coverage Tab** | Unused CSS/JS bytes (red = unused) | DevTools → `Ctrl+Shift+P` → "Coverage" |
| **React DevTools Profiler** | Which components re-render and how long they take | Install React DevTools extension → Profiler tab |

### Next.js-Specific

| Tool | What it reveals | How to use |
|---|---|---|
| **`next build`** | Per-route bundle sizes, static vs dynamic pages | Run `npm run build` and inspect the output table |
| **`@next/bundle-analyzer`** | Interactive treemap of your JS bundles | `npm i -D @next/bundle-analyzer`, add to `next.config.mjs` |
| **`next dev --turbopack`** | Faster dev server (may reveal perf differences) | `next dev --turbopack` |

### External / CLI

| Tool | What it reveals | How to use |
|---|---|---|
| **PageSpeed Insights** | Real-world + lab perf data, Core Web Vitals | https://pagespeed.web.dev → enter your URL |
| **WebPageTest.org** | Filmstrip, waterfall, TTFB, render-blocking | https://www.webpagetest.org |
| **`npx why-bundled`** | Why a specific package ended up in your bundle | `npx why-bundled framer-motion` |

---

## 🐛 Performance Bugs Found (14 Issues)

### Category 1: Images — CRITICAL 🔴

#### Bug 1: 16 MB uncompressed JPEG in `/public/images/`

> [!CAUTION]
> [222.jpeg](file:///d:/happy3/frontend/public/images/222.jpeg) is **16.3 MB**. Even if not currently used on the homepage, it's in `public/` and can be loaded directly via URL. This alone can tank your performance.

**Impact**: Blocks page if referenced anywhere; wastes disk/deploy space.

---

#### Bug 2: 15 community images totaling ~18 MB are unoptimized raw JPEGs

In [/public/community/](file:///d:/happy3/frontend/public/community) you have 15 images averaging **1.1 MB each** (some as large as 1.7 MB). They are served at `220×165px` display size in [CommunitySection.tsx](file:///d:/happy3/frontend/src/components/sections/CommunitySection.tsx#L55-L64), meaning **~95% of the downloaded pixels are wasted**.

**Impact**: The CommunitySection alone downloads ~18 MB of images on a desktop (3 marquee rows × duplicated images). On 4G, that's 30+ seconds of image loading.

---

#### Bug 3: `hero.png` is duplicated

- [/public/images/hero.png](file:///d:/happy3/frontend/public/images/hero.png) — 847 KB
- [/public/images/hero2.png](file:///d:/happy3/frontend/public/images/hero2.png) — 847 KB (identical size)
- [/public/home/contact1.png](file:///d:/happy3/frontend/public/home/contact1.png) — 847 KB (also identical size)

All three files are exactly 847,389 bytes. These are likely the same file duplicated.

---

#### Bug 4: Remote Unsplash images loaded eagerly in Testimonials

[TestimonialsSection.tsx](file:///d:/happy3/frontend/src/components/sections/TestimonialsSection.tsx#L53-L54) loads 4 poster images from `images.unsplash.com` — these are external, unoptimized, and the carousel doubles them to 8 `<Image>` elements. None have `loading="lazy"` behavior since Next.js `<Image>` with `fill` defaults to eager loading.

---

### Category 2: JavaScript Bundle — HIGH 🟠

#### Bug 5: `import * as LucideIcons from "lucide-react"` — tree-shaking killer

[FloatingTag.tsx](file:///d:/happy3/frontend/src/components/sections/FloatingTag.tsx#L4) imports the **entire** Lucide icon library (1000+ icons, ~200KB+ uncompressed) just to dynamically pick 4 icons by string name:

```tsx
import * as LucideIcons from "lucide-react";
```

**Impact**: Prevents Webpack/Turbopack from tree-shaking unused icons. This single line can add **100–200 KB** to your JS bundle.

---

#### Bug 6: Duplicate motion libraries

[package.json](file:///d:/happy3/frontend/package.json#L20-L22) includes BOTH:
- `"framer-motion": "^12.39.0"` 
- `"motion": "^12.40.0"`

`motion` is the renamed successor of `framer-motion`. Having both means **double the animation runtime** in your bundle (~60–80 KB each).

---

#### Bug 7: Every section is a client component — no server-side rendering benefit

Every section in [page.tsx](file:///d:/happy3/frontend/src/app/page.tsx) (Hero, ChallengeSection, PillarsSection, etc.) has `"use client"` at the top. This means:
- None of them benefit from server-side streaming
- The entire page JS must download and hydrate before anything becomes interactive
- All component code ships to the browser even if it's purely visual

---

### Category 3: Animations — HIGH 🟠

#### Bug 8: 13+ simultaneous infinite Framer Motion animations in the Hero

[HeroVisual.tsx](file:///d:/happy3/frontend/src/components/sections/HeroVisual.tsx) renders **6 SmileArc ring variants** + **4 FloatingTags** + the breathing orbit dot + the portrait scale animation. Each `SmileArc` has 2–3 simultaneous animated properties (`rotate`, `scale`, `y`, `opacity`) with `repeat: Infinity`.

**Impact**: ~20+ concurrent infinite animation loops running from the moment the page loads. Each triggers a requestAnimationFrame loop in Framer Motion's runtime, keeping the main thread busy and preventing the browser from going idle.

---

#### Bug 9: `requestAnimationFrame` scroll loop never pauses in TestimonialsSection

[TestimonialsSection.tsx](file:///d:/happy3/frontend/src/components/sections/TestimonialsSection.tsx#L295-L307) runs a `requestAnimationFrame` loop that fires **60 times per second**, even when the section is off-screen:

```tsx
const scrollStep = () => {
  if (!isHovered && container) {
    container.scrollLeft += scrollSpeed;
    // ...
  }
  animationFrameId = requestAnimationFrame(scrollStep); // Always runs
};
```

**Impact**: This rAF loop runs from mount until unmount — even if the user hasn't scrolled down to this section yet. Constant main-thread work.

---

#### Bug 10: CSS `animate-ping` on multiple pulsing dots

Several sections ([CommunitySection](file:///d:/happy3/frontend/src/components/sections/CommunitySection.tsx#L186), [ProgramsSection](file:///d:/happy3/frontend/src/components/sections/ProgramsSection.tsx#L72), [CtaSection](file:///d:/happy3/frontend/src/components/sections/CtaSection.tsx#L65), [TestimonialsSection](file:///d:/happy3/frontend/src/components/sections/TestimonialsSection.tsx#L347)) each have a `.animate-ping` element that runs infinitely. While individually cheap, 4+ concurrent infinite CSS animations add up.

---

### Category 4: CSS — MEDIUM 🟡

#### Bug 11: External font loaded via render-blocking `@import url()`

[globals.css](file:///d:/happy3/frontend/src/app/globals.css#L1) line 1:
```css
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap');
```

`@import url()` in CSS is **render-blocking** — the browser must download the external CSS before it can continue parsing. Combined with the Next.js Google Font (Plus Jakarta Sans) loaded in [layout.tsx](file:///d:/happy3/frontend/src/app/layout.tsx#L2), you're loading **two font families** from two different CDNs, sequentially.

**Impact**: Adds 200–600ms of blocking time on first load, depending on CDN latency.

---

#### Bug 12: `backdrop-filter: blur()` on multiple FloatingTags

Each `FloatingTag` (4 of them in HeroVisual) uses `backdrop-blur-[16px]` on both the capsule and the circle elements. That's **8 backdrop-filter blur layers** overlapping in the hero.

**Impact**: `backdrop-filter` is GPU-intensive. Multiple overlapping blur layers can cause stuttering on mid-range devices, especially mobile.

---

### Category 5: Rendering Architecture — MEDIUM 🟡

#### Bug 13: `dangerouslySetInnerHTML` for inline `<style>` blocks

[TestimonialsSection.tsx](file:///d:/happy3/frontend/src/components/sections/TestimonialsSection.tsx#L499-L511) injects styles via `dangerouslySetInnerHTML`. [CommunitySection.tsx](file:///d:/happy3/frontend/src/components/sections/CommunitySection.tsx#L144-L153) uses a `<style>` JSX tag.

**Impact**: Creates a new `<style>` element in the DOM on every render. While not a major perf hit, it bypasses CSS-in-JS or Tailwind's stylesheet and can cause FOUC (Flash of Unstyled Content).

---

#### Bug 14: `document.querySelectorAll("video")` in ReelCard

[TestimonialsSection.tsx](file:///d:/happy3/frontend/src/components/sections/TestimonialsSection.tsx#L108-L113):
```tsx
const allVideos = document.querySelectorAll("video");
allVideos.forEach((v) => { if (v !== videoRef.current) v.pause(); });
```

**Impact**: Queries the entire DOM on every play click. Not a major bottleneck but is an anti-pattern in React — should use a shared state or context instead.

---

## ✅ Step-by-Step Fix Plan (Prioritized)

### Phase 1: Quick Wins (30 min, biggest impact) 🏆

#### Step 1.1 — Compress & resize community images
```bash
# Install sharp-cli or use squoosh.app
# Target: 440px wide (2x the 220px display), WebP format, quality 80
npx sharp-cli resize 440 -i public/community/*.jpg -o public/community/ -f webp -q 80
```
Each image drops from ~1 MB → ~30 KB. **Total savings: ~17 MB**.

#### Step 1.2 — Delete or compress the 16 MB `222.jpeg`
```bash
# If unused, delete it
rm public/images/222.jpeg
# If needed, compress it
npx sharp-cli resize 1920 -i public/images/222.jpeg -o public/images/222.webp -f webp -q 80
```

#### Step 1.3 — Remove duplicate image files
Delete [hero2.png](file:///d:/happy3/frontend/public/images/hero2.png) and [contact1.png](file:///d:/happy3/frontend/public/home/contact1.png) if they're duplicates of `hero.png`.

#### Step 1.4 — Remove the duplicate `motion` package
```bash
npm uninstall motion
# Keep only framer-motion, or migrate fully to motion (the newer package)
```
Update all imports to use whichever you keep.

---

### Phase 2: Bundle Optimization (1 hour) 🎯

#### Step 2.1 — Fix FloatingTag wildcard import

Replace the tree-shaking-killing wildcard import in [FloatingTag.tsx](file:///d:/happy3/frontend/src/components/sections/FloatingTag.tsx#L4):

```diff
- import * as LucideIcons from "lucide-react";
+ import { Brain, Sun, Heart, UserRound } from "lucide-react";

+ const ICON_MAP = { Brain, Sun, Heart, UserRound } as const;

// In the component:
- const IconComponent = LucideIcons[iconName] as ...;
+ const IconComponent = ICON_MAP[iconName as keyof typeof ICON_MAP];
```

**Savings**: ~100–200 KB from the JS bundle.

#### Step 2.2 — Add `@next/bundle-analyzer` to monitor bundle sizes

```bash
npm i -D @next/bundle-analyzer
```

Update [next.config.mjs](file:///d:/happy3/frontend/next.config.mjs):
```js
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer({ enabled: true })(nextConfig)
  : nextConfig;
```

Then run: `ANALYZE=true npm run build`

#### Step 2.3 — Lazy-load below-fold sections

Wrap below-fold sections in `next/dynamic` with `ssr: false`:

```tsx
// page.tsx
import dynamic from 'next/dynamic';

const ProgramsSection = dynamic(() => import('@/components/sections/ProgramsSection').then(m => ({ default: m.ProgramsSection })), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })), { ssr: false });
const CommunitySection = dynamic(() => import('@/components/sections/CommunitySection').then(m => ({ default: m.CommunitySection })), { ssr: false });
const CtaSection = dynamic(() => import('@/components/sections/CtaSection').then(m => ({ default: m.CtaSection })), { ssr: false });
```

This code-splits each section into its own chunk, loaded only when needed.

---

### Phase 3: Animation Optimization (1 hour) 🎭

#### Step 3.1 — Gate the rAF loop with IntersectionObserver

In [TestimonialsSection.tsx](file:///d:/happy3/frontend/src/components/sections/TestimonialsSection.tsx#L288-L312), only run the scroll animation when the section is visible:

```tsx
const [isVisible, setIsVisible] = useState(false);
const sectionRef = useRef<HTMLElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.1 }
  );
  if (sectionRef.current) observer.observe(sectionRef.current);
  return () => observer.disconnect();
}, []);

useEffect(() => {
  if (!isVisible) return; // Don't start the loop when off-screen
  const container = carouselRef.current;
  if (!container) return;
  
  let animationFrameId: number;
  const scrollStep = () => {
    if (!isHovered && container) {
      container.scrollLeft += 0.5;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    }
    animationFrameId = requestAnimationFrame(scrollStep);
  };
  animationFrameId = requestAnimationFrame(scrollStep);
  return () => cancelAnimationFrame(animationFrameId);
}, [isHovered, isVisible]);
```

#### Step 3.2 — Replace CSS marquee animations in CommunitySection with the same pattern

The `marquee-left` / `marquee-right` CSS animations run even when off-screen. Use `animation-play-state: paused` driven by an IntersectionObserver.

#### Step 3.3 — Reduce SmileArc ring count

Currently [HeroVisual.tsx](file:///d:/happy3/frontend/src/components/sections/HeroVisual.tsx) renders **6 SmileArc rings** + 1 breathing orbit. Consider:
- Removing 2–3 of the least-visible rings (atmosphere, inner emotional-ring)
- Using CSS `@keyframes` instead of Framer Motion for simple rotate animations (CSS animations run on the compositor thread, bypassing the main thread)

#### Step 3.4 — Use `will-change: transform` sparingly

For the remaining animated rings, add `will-change: transform` to promote them to their own GPU layer. But don't overdo it — too many promoted layers increase VRAM usage.

---

### Phase 4: Font & CSS Optimization (30 min) 🔤

#### Step 4.1 — Move Satoshi font to `next/font`

Replace the render-blocking `@import url()` in [globals.css](file:///d:/happy3/frontend/src/app/globals.css#L1) with a local or next/font approach:

```tsx
// layout.tsx — add alongside Plus Jakarta Sans
import localFont from "next/font/local";

const satoshi = localFont({
  src: [
    { path: '../fonts/Satoshi-Regular.woff2', weight: '400' },
    { path: '../fonts/Satoshi-Medium.woff2', weight: '500' },
    { path: '../fonts/Satoshi-Bold.woff2', weight: '700' },
    { path: '../fonts/Satoshi-Black.woff2', weight: '900' },
  ],
  variable: "--font-satoshi",
  display: "swap",
});
```

Then remove the `@import url(...)` from globals.css.

**Why**: `next/font` self-hosts fonts, eliminates the external request, and automatically applies `font-display: swap`.

#### Step 4.2 — Move inline `<style>` blocks to CSS modules or globals.css

Move the `marquee-left` / `marquee-right` keyframes and `.no-scrollbar` rules into [globals.css](file:///d:/happy3/frontend/src/app/globals.css).

---

### Phase 5: Server Components & Architecture (1+ hours) 🏗️

#### Step 5.1 — Convert static sections to Server Components

Sections that are purely visual with no interactivity can be Server Components (remove `"use client"`):
- **ProgramsSection** — static cards, motion animations could be replaced with CSS
- **CtaSection** — mostly static content with hover effects

This reduces the client-side JS bundle.

#### Step 5.2 — Add `loading="lazy"` to off-screen images

For community images and testimonial posters, ensure they're lazy-loaded:
```tsx
<Image src={img} alt="..." fill sizes="220px" loading="lazy" />
```
Next.js `<Image>` defaults to lazy loading, but when used with `fill` and no explicit `loading` prop, behavior may vary. Be explicit.

#### Step 5.3 — Add image optimization to `next.config.mjs`

```js
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};
```

---

## 📊 Expected Impact Summary

| Fix | Estimated Savings | Difficulty |
|---|---|---|
| Compress community images | **~17 MB** transferred data | Easy |
| Delete/compress 222.jpeg | **~16 MB** storage, risk elimination | Easy |
| Remove duplicate `motion` package | **~60–80 KB** JS bundle | Easy |
| Fix FloatingTag wildcard import | **~100–200 KB** JS bundle | Easy |
| Move Satoshi to next/font | **200–600 ms** faster first paint | Medium |
| Lazy-load below-fold sections | **~40%** less initial JS | Medium |
| Gate rAF loop with IntersectionObserver | **Continuous CPU savings** when off-screen | Medium |
| Reduce SmileArc rings | **~20 fewer** infinite animation loops | Medium |
| Convert sections to Server Components | **~30%** less client JS | Hard |

---

## 🛠️ Recommended Monitoring Setup

After applying fixes, set up continuous monitoring:

1. **Run `npm run build`** after each change — check the route sizes table
2. **Run Lighthouse** in incognito (no extensions) — target score > 90
3. **Use `@next/bundle-analyzer`** — run `ANALYZE=true npm run build` monthly
4. **Check Core Web Vitals** — LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## Open Questions

> [!IMPORTANT]
> 1. Is [222.jpeg](file:///d:/happy3/frontend/public/images/222.jpeg) (16 MB) used anywhere? Can we delete it?
> 2. Are [hero2.png](file:///d:/happy3/frontend/public/images/hero2.png) and [contact1.png](file:///d:/happy3/frontend/public/home/contact1.png) indeed duplicates of hero.png?
> 3. Do you want me to proceed with implementing these fixes, or would you prefer to tackle them phase by phase?
> 4. Are you deploying on Vercel? (Affects image optimization strategy — Vercel has built-in image optimization)
