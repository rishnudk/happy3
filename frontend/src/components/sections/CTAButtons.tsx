"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

export default function CTAButtons() {
  return (
    <div className="flex flex-wrap items-center gap-6 pt-4">
      {/* PRIMARY CTA - START YOUR TRANSFORMATION */}
      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="
          group
          relative
          flex
          items-center
          gap-4
          rounded-full
          bg-gradient-to-r from-primary to-[#5A005A]
          pl-8 pr-2.5 py-2.5
          font-bold
          text-white
          text-[15px]
          tracking-wide
          shadow-[0_10px_25px_rgba(128,0,128,0.25)]
          hover:shadow-[0_15px_30px_rgba(128,0,128,0.35)]
          transition-all
          duration-300
          cursor-pointer
          overflow-hidden
        "
      >
        {/* Subtle white inner highlight border */}
        <span className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
        
        {/* Soft Radial Reflection Glow on Hover */}
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <span className="relative z-10">Start Your Transformation</span>
        
        {/* Circular Arrow Container */}
        <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary shadow-md group-hover:rotate-45 transition-transform duration-300">
          <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
        </span>
      </motion.button>

      {/* SECONDARY CTA - DISCOVER THE METHOD */}
      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="
          group
          flex
          items-center
          gap-4
          rounded-full
          px-8 py-4.5
          bg-white/80
          backdrop-blur-sm
          border border-white/95
          shadow-[8px_8px_20px_rgba(165,140,217,0.08),-8px_-8px_20px_rgba(255,255,255,0.9)]
          hover:shadow-[12px_12px_28px_rgba(165,140,217,0.12),-12px_-12px_28px_rgba(255,255,255,1)]
          transition-all
          duration-300
          text-primary
          font-bold
          text-[15px]
          tracking-wide
          cursor-pointer
        "
      >
        {/* Circular Play Icon Container */}
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 border border-purple-100 text-primary shadow-inner group-hover:scale-105 transition-transform duration-300">
          <Play className="w-3.5 h-3.5 fill-current text-primary translate-x-[1px]" />
        </span>
        
        <span>Discover the Method</span>
      </motion.button>
    </div>
  );
}
