"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import CTAButtons from "./CTAButtons";
import SmileArc from "./SmileArc";

export default function HeroContent() {
  return (
    <div className="lg:col-span-7 flex flex-col items-start text-left gap-10 z-20 pr-0 lg:pr-8">

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
            relative overflow-hidden
            rounded-full px-6 py-3
            backdrop-blur-xl
            border border-white/80
            flex items-center gap-3.5
            text-[14px] font-semibold text-primary tracking-wide
            transition-all duration-500
          "
          style={{
            background: "linear-gradient(145deg, #ffffff, #f4efff)",
            boxShadow: `
              0 20px 40px rgba(128,0,128,0.08),
              12px 12px 24px rgba(128,0,128,0.08),
              -10px -10px 24px rgba(255,255,255,0.95),
              inset 1px 1px 2px rgba(255,255,255,1),
              inset -1px -1px 3px rgba(128,0,128,0.04)
            `,
            transformStyle: "preserve-3d",
          }}
        >
          {/* TOP GLOSSY LIGHT */}
          <div
            className="
              absolute inset-x-5 top-1
              h-[12px] rounded-full
              bg-white/70 blur-[6px] pointer-events-none
            "
          />

          {/* AMBIENT BOTTOM GLOW */}
          <div
            className="
              absolute bottom-[-8px] left-1/2 -translate-x-1/2
              w-[70%] h-[18px]
              rounded-full bg-purple-300/20 blur-2xl
              pointer-events-none
            "
          />

          {/* Circular Neumorphic Icon Slot */}
          <span
            className="
              relative
              w-8 h-8 rounded-full
              flex items-center justify-center
              border border-white
            "
            style={{
              background: "linear-gradient(145deg, #ffffff, #f3edff)",
              boxShadow: `
                -5px -5px 12px rgba(255,255,255,1),
                6px 6px 16px rgba(128,0,128,0.1),
                inset 1px 1px 2px rgba(255,255,255,1)
              `,
            }}
          >
            {/* glossy shine */}
            <div
              className="
                absolute top-1 left-1/2 -translate-x-1/2
                w-[60%] h-[6px]
                rounded-full bg-white/80 blur-[2px]
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
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="
          text-[38px]
          sm:text-[54px]
          lg:text-[70px]
          font-black
          leading-[1.12]
          tracking-tight
          font-satoshi
          text-[#2A254B]
        "
      >
        <span className="block neumorphic-text-embossed">
          Discover the art of
        </span>

        {/* "happiness" in solid Mustard Yellow 3D pill with smile arc */}
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="
            relative inline-flex items-center
            mt-3
            px-7 sm:px-10 lg:px-12
            py-2 sm:py-3
            rounded-full
            gap-3 sm:gap-4 lg:gap-5
          "
          style={{
            background: "#FFCE1B",
            boxShadow: `
              0 8px 0 #D4A600,
              0 12px 24px rgba(180,140,0,0.3),
              inset 0 -3px 6px rgba(180,140,0,0.2),
              inset 0 2px 0 rgba(255,230,100,0.6)
            `,
          }}
        >
          <span
            className="relative z-10 text-white font-black"
            style={{
              textShadow: "0 2px 0 rgba(180,130,0,0.4)",
            }}
          >
            happiness
          </span>

          {/* Inline SmileArc brand element — with extra breathing room */}
          <SmileArc
            variant="inline"
            className="w-[36px] sm:w-[42px] lg:w-[50px] h-auto relative z-10"
          />
        </motion.span>
      </motion.h1>

      {/* 3. FOUNDER NAME — "Shabna Sulthan" with marker underline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
        className="flex items-baseline gap-2.5"
      >
        <span className="text-[13px] sm:text-[15px] text-[#2A254B]/50 font-medium tracking-wide">
          by
        </span>
        <span
          className="
            relative inline-block
            text-[17px] sm:text-[20px] lg:text-[22px]
            font-bold
            tracking-wide
            text-[#800080]
            font-satoshi
            italic
            pb-1
          "
        >
          Shabna Sulthan

          {/* Marker-style underline — thick yellow highlight stroke */}
          <span
            className="
              absolute
              bottom-0 left-[-2px]
              w-[calc(100%+4px)]
              h-[8px] sm:h-[10px]
              rounded-[2px]
              -z-10
            "
            style={{
              background: "#FFCE1B",
              opacity: 0.45,
            }}
          />
        </span>
      </motion.div>

      {/* 4. HERO DESCRIPTION */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="
          max-w-[540px]
          text-[16px]
          sm:text-[18px]
          text-[#2A254B]/70
          leading-[1.9]
          font-medium
          tracking-wide
        "
      >
        Happiness is not just an emotion — it is a skill that can be learned, practiced, and shared.
      </motion.p>

      {/* 5. CTA BUTTONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <CTAButtons />
      </motion.div>
    </div>
  );
}
