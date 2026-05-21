"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface FloatingTagProps {
  label: string;
  iconName: keyof typeof LucideIcons;
  iconColor?: string;
  className?: string;
  delay?: number;
  yRange?: number[];
  xRange?: number[];
  duration?: number;
}

export default function FloatingTag({
  label,
  iconName,
  iconColor = "text-[#2E1065]",
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
        scale: 1.03,
        y: -12,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 18,
        },
      }}
      className={`
        absolute
        z-30
        flex
        items-center
        min-w-[220px]
        h-[72px]
        rounded-full
        bg-white/80
        backdrop-blur-xl
        border border-white/70
        shadow-[0_10px_40px_rgba(120,90,180,0.08)]
        pr-8
        pl-20
        text-[15px]
        font-semibold
        text-[#1E1B2E]
        tracking-[-0.02em]
        ${className}
      `}
    >
      {/* Large Floating Circle */}
      <div
        className="
          absolute
          left-[-8px]
          top-1/2
          -translate-y-1/2
          w-[88px]
          h-[88px]
          rounded-full
          bg-[#F8F7FB]
          shadow-[inset_0_2px_6px_rgba(255,255,255,0.9),0_8px_24px_rgba(140,120,180,0.12)]
          flex
          items-center
          justify-center
        "
      >
        {/* Inner Icon Circle */}
        <div
          className="
            w-[52px]
            h-[52px]
            rounded-full
            bg-white
            border border-[#F1EDF7]
            shadow-[0_4px_14px_rgba(120,90,180,0.08)]
            flex
            items-center
            justify-center
          "
        >
          {IconComponent ? (
            <IconComponent className={`w-5 h-5 ${iconColor}`} />
          ) : (
            <span className="w-2 h-2 rounded-full bg-purple-700" />
          )}
        </div>
      </div>

      {/* Label */}
      <span>{label}</span>
    </motion.div>
  );
}