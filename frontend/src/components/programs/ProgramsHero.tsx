"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ProgramsHero() {
  const smoothReveal = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 gap-6 relative">
      
      {/* Decorative Brand Arc 1 - Patriarch Purple Arc */}
      <div className="absolute top-[-50px] left-[-300px] pointer-events-none select-none z-0 opacity-40 animate-float hidden lg:block">
        <svg width="450" height="450" viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="225" cy="225" r="200" stroke="#800080" strokeWidth="24" strokeLinecap="round" strokeDasharray="300 600" />
        </svg>
      </div>

      {/* Decorative Brand Arc 2 - Mustard Yellow Arc */}
      <div className="absolute top-[80px] right-[-320px] pointer-events-none select-none z-0 opacity-30 animate-spin-slow hidden lg:block">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="300" r="270" stroke="#FFCE1B" strokeWidth="20" strokeLinecap="round" strokeDasharray="400 800" />
        </svg>
      </div>

      {/* Neumorphic Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: smoothReveal }}
        className="inline-flex relative z-10"
      >
        <span
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase"
          style={{
            color: "#ffffff",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: `
              0 4px 12px rgba(0,0,0,0.2),
              inset 1px 1px 2px rgba(255,255,255,0.05)
            `,
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-mustard animate-pulse" />
          Interactive Hub
        </span>
      </motion.div>

      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.1, ease: smoothReveal }}
        className="font-satoshi font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] text-white relative z-10"
      >
        Explore Our <span style={{ color: "#FFCE1B" }}>Programs</span>
      </motion.h1>

      {/* Subtext Description */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="text-[16px] sm:text-[18px] leading-[1.8] font-medium text-white/70 max-w-2xl relative z-10"
      >
        A curated environment designed to teach happiness as a practical life skill. Discover which framework matches your unique journey towards emotional intelligence and inner balance.
      </motion.p>
      
      {/* Animated Accent Line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative w-36 h-[5px] rounded-full overflow-hidden mt-2 z-10"
        style={{
          background: "rgba(243,238,250,0.6)",
          boxShadow: "inset 3px 3px 6px rgba(165,140,217,0.10), inset -3px -3px 6px rgba(255,255,255,0.95)",
          border: "1px solid rgba(255,255,255,0.7)",
          transformOrigin: "center center",
        }}
      >
        <motion.div
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{ background: "linear-gradient(90deg, #800080, #C084FC)", width: "35%" }}
          animate={{ x: [-20, 100, -20] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

    </div>
  );
}
