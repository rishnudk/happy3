"use client";

import { ChallengeSection } from "./ChallengeSection";
import { PillarsSection } from "./PillarsSection";
import { WhatHcaDoesSection } from "./WhatHcaDoesSection";
import { CoreValuesSection } from "./CoreValuesSection";

export function PhilosophyStack() {
  return (
    <div className="relative w-full max-w-[1600px] mx-auto px-4 md:px-8 py-20">
      
      {/* 
        Sticky Stacking Cards
        Each section pins to the screen with a progressively larger top offset,
        creating a beautiful 3D deck-of-cards stacking effect without complex JS.
      */}

      {/* Card 1: Challenge (Cool base tint) */}
      <div className="sticky top-6 lg:top-10 z-[1] w-full mb-16 lg:mb-32 transition-transform duration-500">
        <ChallengeSection />
      </div>

      {/* Card 2: Pillars (Slightly warmer purple tint) */}
      <div className="sticky top-10 lg:top-[72px] z-[2] w-full mb-16 lg:mb-32 transition-transform duration-500">
        <PillarsSection />
      </div>

      {/* Card 3: What HCA Does (Warm purple/mustard mix) */}
      <div className="sticky top-14 lg:top-[104px] z-[3] w-full mb-16 lg:mb-32 transition-transform duration-500">
        <WhatHcaDoesSection />
      </div>

      {/* Card 4: Core Values (Warmest Mustard Yellow tint) */}
      <div className="sticky top-18 lg:top-[136px] z-[4] w-full mb-16 lg:mb-32 transition-transform duration-500">
        <CoreValuesSection />
      </div>

    </div>
  );
}
