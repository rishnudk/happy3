"use client";

import { motion } from "framer-motion";
import React from "react";

/**
 * NeuCard — site-wide reusable neumorphic card primitive.
 *
 * Variants:
 *  - "default"  : Soft neumorphic raised card — page-background toned (#F6F3FA)
 *  - "purple"   : Deep patriarch purple card — premium / accent usage
 *  - "mustard"  : Warm mustard-tinted card — energy / CTA usage
 *  - "glass"    : Frosted glass card — light overlay usage
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
  variant?: "default" | "purple" | "mustard" | "glass";
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
      className={`relative cursor-default ${className}`}
      style={{ ...baseStyle, ...style }}
    >
      {children}
    </motion.div>
  );
}
