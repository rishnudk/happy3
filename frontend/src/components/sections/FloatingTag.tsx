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
        pointer-events-auto
        absolute
        flex items-center
        ${className}
      `}
    >
      {/* =======================================
          KEY SHAPE: Large Circle (icon) → Capsule (text)
          Circle on the left, text capsule flows to the right
      ======================================= */}

      {/* LARGE KEY CIRCLE (left side) */}
      <div
        className="
          relative
          shrink-0
          z-10

          w-[44px] h-[44px]
          sm:w-[52px] sm:h-[52px]
          lg:w-[60px] lg:h-[60px]

          rounded-full
          flex items-center justify-center

          border border-white/80
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
            w-[24px] h-[24px]
            sm:w-[28px] sm:h-[28px]
            lg:w-[32px] lg:h-[32px]
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

      {/* CAPSULE (text portion — right side, sliding under circle) */}
      <div
        className="
          relative
          flex items-center

          h-[32px]
          sm:h-[38px]
          lg:h-[42px]

          pl-5
          sm:pl-6
          pr-4
          sm:pr-5

          -ml-3
          sm:-ml-3
          lg:-ml-4

          rounded-r-full
          rounded-l-[8px]

          border border-white/70
          border-l-0

          text-[9px]
          sm:text-[11px]
          lg:text-[12px]

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
    </motion.div>
  );
}
