"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import CTAButtons from "./CTAButtons";
import SmileArc from "./SmileArc";

export default function HeroContent() {
  return (
    <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left gap-4 z-20 pr-0 lg:pr-8 w-full">

      {/* 1. FLOATING PILLED BADGE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{
          y: -2,
          boxShadow: "0 10px 25px rgba(128,0,128,0.15)",
        }}
        className="inline-flex cursor-default"
      >
        <div
          className="
            relative
            rounded-full px-6 py-3
            backdrop-blur-xl
            flex items-center gap-3.5
            text-[12px] font-semibold text-primary tracking-wide
            transition-all duration-500
            animate-rainbow
            border-0
            bg-[linear-gradient(#FAF8FD,#FAF8FD),linear-gradient(#FAF8FD_50%,rgba(250,248,253,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(280,80%,75%),hsl(320,80%,80%),hsl(340,90%,82%),hsl(45,100%,75%),hsl(260,90%,80%))]
            bg-[length:200%]
            [background-clip:padding-box,border-box,border-box]
            [background-origin:border-box]
            [border:calc(0.08*1rem)_solid_transparent]
            before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(280,80%,75%),hsl(320,80%,80%),hsl(340,90%,82%),hsl(45,100%,75%),hsl(260,90%,80%))] before:[filter:blur(calc(0.8*1rem))]
          "
        >
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse relative z-10" />
          <span className="relative z-10">
            Your Journey Starts Here
          </span>
        </div>
      </motion.div>

      {/* 2. HERO HEADING */}
      <motion.h1
        initial={{ y: 25 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="
          text-[38px]
          sm:text-[54px]
          lg:text-[70px]
          font-black
          font-satoshi
          text-[var(--text-heading)]
          tracking-[-0.04em]
          leading-[1.1]
        "
      >
        <span className="block">
          Discover the art of
        </span>

        {/* "happiness" in solid Mustard Yellow 3D pill with smile arc */}
        <motion.span
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="
            relative inline-flex items-center
            mt-3
            px-7 sm:px-10 lg:px-12
            py-2 sm:py-3
            rounded-full
            gap-3 sm:gap-4 lg:gap-5
            bg-happiness-pill
          "
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
            className="w-[90px] sm:w-[100px] lg:w-[100px] -translate-y-[-9px] h-auto relative z-10"
          />
        </motion.span>
      </motion.h1>

      {/* 3. FOUNDER NAME — "Shabna Sulthan" with marker underline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
        className="flex items-baseline justify-center lg:justify-start gap-2.5 w-full lg:w-auto"
      >
        <span className="text-[13px] sm:text-[15px] text-[#475569] font-medium tracking-wide">
          by
        </span>
        <span
          className="
            relative inline-block
            text-[22px] sm:text-[32px] lg:text-[24px]
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
              marker-underline
            "
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
          text-[var(--text-body)]
          leading-[1.9]
          font-sans
          tracking-normal
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
