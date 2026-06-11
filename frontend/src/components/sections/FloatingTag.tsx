"use client";

import { motion } from "framer-motion";
import { Brain, Sun, Heart, UserRound } from "lucide-react";

const ICON_MAP = { Brain, Sun, Heart, UserRound } as const;

interface FloatingTagProps {
  label: React.ReactNode;
  iconName: keyof typeof ICON_MAP;
  iconColor?: string;
  iconBg?: string;
  className?: string;
  delay?: number;
  yRange?: number[];
  xRange?: number[];
  duration?: number;
}

export default function FloatingTag({
  label,
  iconName,
  iconColor = "text-white",
  iconBg = "#800080",
  className = "",
  delay = 0,
  yRange = [0, -10, 0],
  xRange = [0, 4, 0],
  duration = 5,
}: FloatingTagProps) {
  const IconComponent = ICON_MAP[iconName as keyof typeof ICON_MAP];


  return (
    <motion.div
      animate={{
        y: yRange,
        x: xRange,
      }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "easeInOut",
        delay,
      }}
      whileHover={{
        scale: 1.04,
        y: -8,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 18,
        },
      }}
      className={`
        pointer-events-auto
        relative
        flex items-center
        ${className}
      `}
    >
      {/* =======================================================================
          DEVELOPER NOTE: HOW TO ADJUST THE SIZES of the Circle and Capsule:
          1. CIRCLE SIZE: Change the width/height class names in the "LARGE KEY CIRCLE" div:
             - Currently: w-[44px] h-[44px] (mobile), sm:w-[52px] sm:h-[52px] (tablet), lg:w-[60px] lg:h-[60px] (desktop)
          2. CAPSULE HEIGHT: Change the min-h class names in the "CAPSULE" div:
             - Currently: min-h-[32px] (mobile), sm:min-h-[38px] (tablet), lg:min-h-[42px] (desktop)
          3. CAPSULE WIDTH/PADDING:
             - Increase the left padding pl-[52px] (mobile) sm:pl-[62px] (tablet) lg:pl-[72px] (desktop) 
               to push the text further right and expand the capsule, or decrease it to make it shorter.
          ======================================================================= */}

      {/* CAPSULE (text portion — right side, sliding under circle) */}
      <div
        className="
          relative
          z-0
          flex items-center justify-center

          min-h-[32px]
          sm:min-h-[68px]
          lg:min-h-[42px]
          py-1.5
          sm:py-2

          pl-[52px]
          sm:pl-[62px]
          lg:pl-[72px]
          pr-4
          sm:pr-5

          rounded-full

          border border-white/60

          backdrop-blur-[16px]

          text-[9px]
          sm:text-[16px]
          lg:text-[12px]
          leading-tight

          font-semibold
          tracking-[-0.01em]
          text-[#2A254B]
        "
        style={{
          /* High-end semi-transparent glossy gradient for Liquid Glass */
          background: "linear-gradient(135deg, rgba(230, 210, 232, 0.72) 0%, rgba(245, 240, 255, 0.35) 100%)",
          boxShadow: `
            0 12px 30px rgba(128, 0, 128, 0.05),
            inset 0 2px 4px rgba(242, 185, 243, 0.8),
            inset 0 -2px 4px rgba(218, 177, 218, 0.02)
          `,
        }}
      >
        <span className="relative z-10 leading-tight block text-left">{label}</span>
      </div>

      {/* LARGE KEY CIRCLE (left side - positioned absolutely on top of the capsule's left end) */}
      <div
        className="
          absolute
          left-0
          z-10
          shrink-0

          w-[44px] h-[44px]
          sm:w-[52px] sm:h-[52px]
          lg:w-[60px] lg:h-[60px]

          rounded-full
          flex items-center justify-center

          border border-white/80
          backdrop-blur-[16px]
        "
        style={{
          /* Glossy liquid glass background */
          background: "linear-gradient(135deg, rgba(243, 226, 235, 0.85) 0%, rgba(240, 230, 255, 0.55) 100%)",
          boxShadow: `
            0 10px 25px rgba(128, 0, 128, 0.06),
            inset 0 2px 4px rgba(255, 255, 255, 0.9)
          `,
        }}
      >
        {/* Inner solid icon circle */}
        <div
          className="
            w-[24px] h-[24px]
            sm:w-[28px] sm:h-[28px]
            lg:w-[32px] lg:h-[32px]
            rounded-full
            flex items-center justify-center
          "
          style={{
            background: iconBg,
            boxShadow: `
              0 2px 6px rgba(0,0,0,0.15),
              inset 0 1px 2px rgba(255,255,255,0.3)
            `,
          }}
        >
          {IconComponent ? (
            <IconComponent
              className={`
                w-3 h-3
                sm:w-3.5 sm:h-3.5
                lg:w-4 lg:h-4
                ${iconColor}
              `}
            />
          ) : (
            <span className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
