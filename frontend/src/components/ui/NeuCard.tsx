"use client";

import { motion } from "framer-motion";
import React from "react";

/**
 * NeuCard — site-wide reusable neumorphic card primitive.
 *
 * Variants:
 *  - "default"          : Soft neumorphic raised card
 *  - "purple"           : Deep patriarch purple card
 *  - "mustard"          : Warm mustard-tinted card
 *  - "glass"            : Frosted glass card
 *  - "elevated"         : Higher lift, softer shadow (floating effect)
 *  - "inset"            : Pressed-in neumorphic well
 *  - "outlined-purple"  : Clean border with subtle purple glow
 *  - "outlined-mustard" : Clean border with subtle mustard glow
 *  - "gradient-brand"   : Soft diagonal gradient (purple to mustard)
 *  - "dark-glass"       : Deep dark glass effect for high contrast
 *
 * Usage:
 *   <NeuCard variant="purple" delay={0.1} className="p-6 flex flex-col gap-4">
 *     ...
 *   </NeuCard>
 */

export interface NeuCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animate?: boolean;
  hoverLift?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  /** Card design variant — defaults to "default" */
  variant?: 
    | "default" 
    | "purple" 
    | "mustard" 
    | "glass"
    | "elevated"
    | "inset"
    | "outlined-purple"
    | "outlined-mustard"
    | "gradient-brand"
    | "dark-glass"
    | "purple-neu"
    | "mustard-neu"
    | "brand-arc"
    | "metric-card";
}

/* ── Design tokens ───────────────────────────────────────────────────────── */
const VARIANTS = {
  default: {
    background: "#F6F3FA",
    borderRadius: 41,
    boxShadow: "6px 6px 9px #DDDAE3, -6px -6px 9px #FFFFFF",
    border: "none",
    hoverShadow: "10px 10px 18px #DDDAE3, -10px -10px 18px #FFFFFF",
  },
  purple: {
    background: "linear-gradient(145deg, #2A254B 0%, #3D1A6B 100%)",
    borderRadius: 28,
    boxShadow: "0 8px 32px rgba(128,0,128,0.20), 0 2px 8px rgba(0,0,0,0.12)",
    border: "1px solid rgba(192,132,252,0.18)",
    hoverShadow: "0 16px 48px rgba(128,0,128,0.30), 0 4px 16px rgba(0,0,0,0.18)",
  },
  mustard: {
    background: "linear-gradient(145deg, #FFFBEA 0%, #FFF3C4 100%)",
    borderRadius: 28,
    boxShadow: "0 6px 24px rgba(255,206,27,0.18), 0 2px 8px rgba(0,0,0,0.04)",
    border: "1px solid rgba(255,206,27,0.35)",
    hoverShadow: "0 12px 40px rgba(255,206,27,0.30), 0 4px 16px rgba(0,0,0,0.06)",
  },
  glass: {
    background: "rgba(255,255,255,0.55)",
    borderRadius: 28,
    boxShadow: "0 8px 32px rgba(165,140,217,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
    border: "1px solid rgba(255,255,255,0.7)",
    hoverShadow: "0 16px 48px rgba(165,140,217,0.14), inset 0 1px 0 rgba(255,255,255,1)",
  },
  elevated: {
    background: "#F6F3FA",
    borderRadius: 41,
    boxShadow: "12px 12px 28px #DDDAE3, -12px -12px 28px #FFFFFF",
    border: "none",
    hoverShadow: "16px 16px 36px #DDDAE3, -16px -16px 36px #FFFFFF",
  },
  inset: {
    background: "#F6F3FA",
    borderRadius: 41,
    boxShadow: "inset 6px 6px 12px #DDDAE3, inset -6px -6px 12px #FFFFFF",
    border: "none",
    hoverShadow: "inset 8px 8px 16px #DDDAE3, inset -8px -8px 16px #FFFFFF",
  },
  "outlined-purple": {
    background: "#F6F3FA",
    borderRadius: 41,
    boxShadow: "4px 4px 10px rgba(128,0,128,0.05), -4px -4px 10px #FFFFFF",
    border: "1.5px solid rgba(128,0,128,0.3)",
    hoverShadow: "8px 8px 20px rgba(128,0,128,0.12), -8px -8px 20px #FFFFFF",
  },
  "outlined-mustard": {
    background: "#F6F3FA",
    borderRadius: 41,
    boxShadow: "4px 4px 10px rgba(255,206,27,0.05), -4px -4px 10px #FFFFFF",
    border: "1.5px solid rgba(255,206,27,0.5)",
    hoverShadow: "8px 8px 20px rgba(255,206,27,0.18), -8px -8px 20px #FFFFFF",
  },
  "gradient-brand": {
    background: "linear-gradient(135deg, rgba(128,0,128,0.04) 0%, rgba(255,206,27,0.06) 100%)",
    borderRadius: 41,
    boxShadow: "6px 6px 12px #DDDAE3, -6px -6px 12px #FFFFFF",
    border: "1.5px solid rgba(255,255,255,0.9)",
    hoverShadow: "10px 10px 20px #DDDAE3, -10px -10px 20px #FFFFFF",
  },
  "dark-glass": {
    background: "rgba(42,37,75,0.85)",
    borderRadius: 28,
    boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.1)",
    hoverShadow: "0 16px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
  },
  "purple-neu": {
    background: "#800080",
    borderRadius: 28,
    boxShadow: "6px 6px 12px #4d004d, -6px -6px 12px #b300b3",
    border: "none",
    hoverShadow: "10px 10px 18px #330033, -10px -10px 18px #cc00cc",
  },
  "mustard-neu": {
    background: "#FFCE1B",
    borderRadius: 28,
    boxShadow: "6px 6px 12px #CCA000, -6px -6px 12px #FFFC8E",
    border: "none",
    hoverShadow: "10px 10px 18px #B89000, -10px -10px 18px #FFFFAC",
  },
  "brand-arc": {
    background: "linear-gradient(135deg, #FFFFFF 0%, #F6F3FA 100%)",
    borderRadius: 28,
    boxShadow: "6px 6px 12px #DDDAE3, -6px -6px 12px #FFFFFF",
    border: "1px solid rgba(255, 255, 255, 0.7)",
    hoverShadow: "10px 10px 18px #DDDAE3, -10px -10px 18px #FFFFFF",
  },
  "metric-card": {
    background: "#F8F7FB",
    borderRadius: 24,
    boxShadow: "10px 10px 24px rgba(212, 208, 224, 0.6), -10px -10px 24px #FFFFFF",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    hoverShadow: "14px 14px 32px rgba(212, 208, 224, 0.7), -14px -14px 32px #FFFFFF",
  },
} as const;

export default function NeuCard({
  children,
  className = "",
  delay = 0,
  animate = true,
  hoverLift = true,
  innerRef,
  style,
  variant = "default",
}: NeuCardProps) {
  const v = VARIANTS[variant];

  const baseStyle: React.CSSProperties = {
    background: v.background,
    borderRadius: v.borderRadius,
    boxShadow: v.boxShadow,
    border: v.border,
  };

  return (
    <motion.div
      ref={innerRef}
      initial={animate ? { opacity: 0, y: 24, scale: 0.97 } : false}
      whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        animate
          ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay }
          : undefined
      }
      whileHover={
        hoverLift
          ? {
              y: -5,
              scale: 1.02,
              boxShadow: v.hoverShadow,
              transition: { type: "spring", stiffness: 260, damping: 22 },
            }
          : undefined
      }
      className={`relative cursor-default overflow-hidden ${className}`}
      style={{ ...baseStyle, ...style }}
    >
      {variant === "brand-arc" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] z-0">
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Purple Arc */}
            <path
              d="M -20,220 A 240,240 0 0,1 220,-20"
              stroke="#800080"
              strokeWidth="24"
              strokeLinecap="round"
              opacity="0.07"
            />
            {/* Mustard Arc (Subtly shifted) */}
            <path
              d="M -40,240 A 240,240 0 0,1 240,-40"
              stroke="#FFCE1B"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.14"
            />
          </svg>
        </div>
      )}
      {children}
    </motion.div>
  );
}
