"use client";

import PageWrapper from "../layout/page-wrapper";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import StatsSection from "./StatsSection";

export default function Hero() {
  return (
    <PageWrapper className="pt-[92px] pb-8 lg:pt-[90px] lg:pb-12 overflow-x-hidden lg:overflow-visible relative">
      {/* 2-Column Hero Layout */}
      <div className="grid items-center gap-1 lg:grid-cols-12 relative z-10 overflow-visible">
        
        {/* Left Column - Hero content & copy */}
        <HeroContent />

        {/* Right Column - Hero portrait composition & floating pills */}
        <HeroVisual />

      </div>

      {/* Floating Success Stats Section Bar */}
      <div className="w-full flex justify-center relative z-20">
        <StatsSection />
      </div>
    </PageWrapper>
  );
}
