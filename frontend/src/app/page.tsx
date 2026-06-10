import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Happiness Coaching Academy | Science-Backed Well-being Programs",
  description:
    "Transform your life and career with professional happiness coaching. Explore science-backed programs, community events, and wellness assessments.",
};
import Hero from "@/components/sections/hero";
import { ChallengeSection } from "@/components/sections/ChallengeSection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { WhatHcaDoesSection } from "@/components/sections/WhatHcaDoesSection";
import { CoreValuesSection } from "@/components/sections/CoreValuesSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Footer } from "@/components/layout/Footer";

import ScrollProgress from "@/components/layout/scroll-progress";

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
      <ChallengeSection />
      <PillarsSection />
      <WhatHcaDoesSection />
      <CoreValuesSection />
      <ProgramsSection />
      <TestimonialsSection />
      <CommunitySection />
      <CtaSection />
      <Footer />
    </main>
  );
}