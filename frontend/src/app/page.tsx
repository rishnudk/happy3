import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/hero";
import { PhilosophyStack } from "@/components/sections/PhilosophyStack";
import ScrollProgress from "@/components/layout/scroll-progress";
import { Footer } from "@/components/layout/Footer";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Happiness Coaching Academy | Science-Backed Well-being Programs",
  description:
    "Transform your life and career with professional happiness coaching. Explore science-backed programs, community events, and wellness assessments.",
};

/* ── Lazy-loaded below-fold sections ─────────────────────────────────────
   These are code-split into separate chunks and only downloaded when the
   browser is about to render them.  This dramatically reduces the initial
   JS payload the user must download before the page becomes interactive. */

const ProgramsSection = nextDynamic(
  () => import("@/components/sections/ProgramsSection").then((m) => ({ default: m.ProgramsSection })),
);
const TestimonialsSection = nextDynamic(
  () => import("@/components/sections/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
);
const CommunitySection = nextDynamic(
  () => import("@/components/sections/CommunitySection").then((m) => ({ default: m.CommunitySection })),
);
const CtaSection = nextDynamic(
  () => import("@/components/sections/CtaSection").then((m) => ({ default: m.CtaSection })),
);

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--page-bg)]">
      
      {/* Scroll indicator bar */}
      <ScrollProgress />
      <Navbar />

      {/* Hero Wrapper with 40px gap */}
      <div className="p-4 md:p-10 w-full relative">
        <div className="hero-surface">
          {/* Ambient Glows and Noise Texture */}
          <div className="bg-hero-glow" />
          <div className="bg-hero-grain" />

          {/* Page Sections */}
          <Hero />
        </div>
      </div>
      <PhilosophyStack />
      <ProgramsSection />
      <TestimonialsSection />
      <CommunitySection />
      <CtaSection />
      <Footer />
    </main>
  );
}