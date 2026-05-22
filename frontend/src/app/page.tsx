import Navbar from "@/components/layout/Navbar";
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
import { GlobalBackground } from "@/components/sections/GlobalBackground";

import ScrollProgress from "@/components/layout/scroll-progress";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Premium Cinematic Ambient Background Layers */}
      <GlobalBackground />
      
      {/* Scroll indicator bar */}
      <ScrollProgress />

      {/* Page Sections */}
      <Navbar />
      <Hero />
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