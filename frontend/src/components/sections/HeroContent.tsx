"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import CTAButtons from "./CTAButtons";

export default function HeroContent() {
  return (
    <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8 z-20 pr-0 lg:pr-8">
      {/* 1. FLOATING PILLED BADGE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{
          y: -5,
          scale: 1.02,
        }}
        className="inline-flex cursor-default"
      >
        <div
          className="
      relative
      overflow-hidden
      
      rounded-full
      px-6 py-3
      
      bg-[linear-gradient(145deg,#ffffff,#f4efff)]
      backdrop-blur-xl
      
      border border-white/80
      
      flex items-center gap-3.5
      
      text-[14px]
      font-semibold
      text-primary
      tracking-wide
      
      transition-all
      duration-500
      
      shadow-
      [
        0_20px_40px_rgba(111,76,255,0.10),
        12px_12px_24px_rgba(166,140,255,0.12),
        -10px_-10px_24px_rgba(255,255,255,0.95),
        inset_1px_1px_2px_rgba(255,255,255,1),
        inset_-1px_-1px_3px_rgba(180,160,220,0.08)
      ]
      
      hover:
      shadow-
      [
        0_28px_50px_rgba(111,76,255,0.14),
        16px_16px_30px_rgba(166,140,255,0.16),
        -12px_-12px_28px_rgba(255,255,255,1),
        inset_1px_1px_2px_rgba(255,255,255,1)
      ]
    "
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* TOP GLOSSY LIGHT */}
          <div
            className="
        absolute
        inset-x-5
        top-1
        
        h-[12px]
        rounded-full
        
        bg-white/70
        blur-[6px]
        pointer-events-none
      "
          />

          {/* AMBIENT BOTTOM GLOW */}
          <div
            className="
        absolute
        bottom-[-8px]
        left-1/2
        -translate-x-1/2
        
        w-[70%]
        h-[18px]
        
        rounded-full
        bg-purple-300/20
        blur-2xl
        
        pointer-events-none
      "
          />

          {/* Circular Neumorphic Icon Slot */}
          <span
            className="
        relative
        
        w-8 h-8
        rounded-full
        
        bg-[linear-gradient(145deg,#ffffff,#f3edff)]
        
        flex
        items-center
        justify-center
        
        border border-white
        
        shadow-
        [
          -5px_-5px_12px_rgba(255,255,255,1),
          6px_6px_16px_rgba(166,140,255,0.14),
          inset_1px_1px_2px_rgba(255,255,255,1)
        ]
      "
          >
            {/* glossy shine */}
            <div
              className="
          absolute
          top-1
          left-1/2
          -translate-x-1/2
          
          w-[60%]
          h-[6px]
          
          rounded-full
          bg-white/80
          blur-[2px]
        "
            />

            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          </span>

          {/* TEXT */}
          <span className="relative z-10">
            Your Journey Starts Here
          </span>
        </div>
      </motion.div>

      {/* 2. HERO HEADING */}
      <div className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="
            text-[38px]
            sm:text-[54px]
            lg:text-[70px]
            font-extrabold
            leading-[1.12]
            tracking-tight
            font-satoshi
            text-slate-deep
          "
        >
          <span className="text-primary font-black drop-shadow-[0_4px_12px_rgba(128,0,128,0.12)] block sm:inline-block sm:whitespace-nowrap">
            Discover the art of
          </span>
          <br />
          <span className="text-secondary font-black drop-shadow-[0_4px_12px_rgba(255,206,27,0.35)] relative inline-block mt-2">
            {/* Ambient gold glow behind the yellow word to make it readable and deep */}
            <span className="absolute inset-0 text-secondary/40 blur-[6px] select-none pointer-events-none translate-y-[2px]" aria-hidden="true">
              happiness
            </span>
            <span className="relative z-10">happiness</span>
          </span>
        </motion.h1>

        {/* 3. HERO DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="
            max-w-[540px]
            text-[16px]
            sm:text-[18px]
            text-slate-deep/75
            leading-[1.9]
            font-medium
            tracking-wide
          "
        >
          Happiness is a skill you can learn. Join a science-based coaching journey designed to help reprogram your mindset, heal what holds you back, and create lasting emotional growth.
        </motion.p>
      </div>

      {/* 4. CTA BUTTONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        <CTAButtons />
      </motion.div>
    </div>
  );
}
