"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface FloatingTagProps {
  label: string;
  iconName: keyof typeof LucideIcons;
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
  const IconComponent =
    LucideIcons[iconName] as React.ComponentType<{
      className?: string;
    }>;

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
        pointer-events-none
        absolute
        z-30
        flex items-center
        ${className}
      `}
    >
      {/* =======================================
          KEY SHAPE: Capsule (text) → Large Circle (icon)
          Text flows left-to-right, circle protrudes on the right
      ======================================= */}

      {/* CAPSULE (text portion — left side) */}
      <div
        className="
          relative
          flex items-center

          h-[40px]
          sm:h-[48px]
          lg:h-[54px]

          pl-5
          sm:pl-6
          pr-6
          sm:pr-8

          rounded-l-full
          rounded-r-[8px]

          border border-white/70
          border-r-0

          text-[11px]
          sm:text-[13px]
          lg:text-[15px]

          font-semibold
          tracking-[-0.01em]
          text-[#2A254B]
          whitespace-nowrap
        "
        style={{
          background: "linear-gradient(145deg, #ffffff, #F4EEFF)",
          boxShadow: `
            6px 6px 18px rgba(128,0,128,0.08),
            -6px -6px 14px rgba(255,255,255,0.9),
            inset 1px 1px 2px rgba(255,255,255,0.8),
            inset -1px -1px 2px rgba(128,0,128,0.03)
          `,
        }}
      >
        <span className="relative z-10">{label}</span>
      </div>

      {/* LARGE KEY CIRCLE (protruding right) */}
      <div
        className="
          relative
          shrink-0
          z-10

          w-[56px] h-[56px]
          sm:w-[68px] sm:h-[68px]
          lg:w-[80px] lg:h-[80px]

          rounded-full
          flex items-center justify-center

          border border-white/80

          -ml-3
          sm:-ml-4
        "
        style={{
          background: "linear-gradient(145deg, #ffffff, #F0EAF6)",
          boxShadow: `
            8px 8px 22px rgba(128,0,128,0.1),
            -8px -8px 22px rgba(255,255,255,0.95),
            inset 2px 2px 4px rgba(255,255,255,0.9),
            inset -1px -1px 3px rgba(128,0,128,0.04)
          `,
        }}
      >
        {/* Inner solid icon circle */}
        <div
          className="
            w-[30px] h-[30px]
            sm:w-[36px] sm:h-[36px]
            lg:w-[42px] lg:h-[42px]
            rounded-full
            flex items-center justify-center
          "
          style={{
            background: iconBg,
            boxShadow: `
              0 4px 14px rgba(128,0,128,0.2),
              inset 0 1px 2px rgba(255,255,255,0.3)
            `,
          }}
        >
          {IconComponent ? (
            <IconComponent
              className={`
                w-3.5 h-3.5
                sm:w-4 sm:h-4
                lg:w-[18px] lg:h-[18px]
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