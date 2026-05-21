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
        whileHover={{ y: -3 }}
        className="inline-flex cursor-default"
      >
        <div
          className="
            rounded-full
            px-5.5 py-2.5
            bg-white/90
            backdrop-blur-md
            border border-white
            shadow-[6px_6px_18px_rgba(165,140,217,0.06),-6px_-6px_18px_rgba(255,255,255,0.95)]
            hover:shadow-[10px_10px_25px_rgba(165,140,217,0.1),-10px_-10px_25px_rgba(255,255,255,1)]
            transition-shadow
            duration-300
            flex items-center gap-3
            text-[14px]
            font-bold
            text-primary
            tracking-wide
          "
        >
          {/* Circular Neumorphic Icon Slot */}
          <span className="w-5.5 h-5.5 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100 shadow-inner">
            <Sparkles className="w-3 h-3 text-primary animate-pulse" />
          </span>
          <span>Your Journey Starts Here</span>
        </div>
      </motion.div>

      {/* 2. HERO HEADING */}
      <div className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="
            text-[48px]
            sm:text-[62px]
            lg:text-[78px]
            font-extrabold
            leading-[1.1]
            tracking-tight
            text-slate-deep
            font-satoshi
          "
        >
          Discover the art  <span className="text-primary font-black">of happiness</span>
          <br />

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
