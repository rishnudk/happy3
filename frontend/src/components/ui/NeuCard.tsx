"use client";

import { motion } from "framer-motion";
import React from "react";

/**
 * NeuCard — site-wide reusable neumorphic card primitive.
 *
 * ─── Neumorphism rule ───────────────────────────────────────────────────────
 * The card background MUST match the page background so the dual-shadow trick
 * creates the illusion of the element extruding from the same surface.
 *
 * GlobalBackground base: #F6F3FA  (soft lavender-white)
 *   → Dark shadow  (bottom-right): #DDDAE3  — ~12 % darker, purple-grey tint
 *   → Light shadow (top-left)    : #FFFFFF  — pure white highlight
 *
 * Design tokens:
 *   background   : #F6F3FA
 *   border-radius: 41px
 *   box-shadow   : 6px 6px 9px #DDDAE3, -6px -6px 9px #FFFFFF
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Usage:
 *   - Wrap any content in <NeuCard> — the card itself is unsized.
 *   - Control dimensions / padding / layout via `className`.
 *   - Pass `delay` (seconds) to stagger cards in a list.
 *   - Pass `hoverLift={false}` to opt out of the default hover lift.
 *   - Pass `animate={false}` to skip the entrance animation.
 *
 * Example (ChallengeSection — small compact card):
 *   <NeuCard className="p-5 flex flex-col items-center" delay={0.1}>
 *     <BrainIcon />
 *     <p>Stress</p>
 *   </NeuCard>
 *
 * Example (PillarsSection — larger card, no hover):
 *   <NeuCard className="p-8 min-h-[220px] flex flex-col gap-4" hoverLift={false}>
 *     ...
 *   </NeuCard>
 */

export interface NeuCardProps {
  children: React.ReactNode;
  /** Extra Tailwind / inline classes — controls size, padding, flex layout, etc. */
  className?: string;
  /** Framer-motion entrance delay in seconds (default 0) */
  delay?: number;
  /** Whether the card animates in on scroll (default true) */
  animate?: boolean;
  /** Whether to lift on hover (default true) */
  hoverLift?: boolean;
  /** Forwarded ref — used for SVG connector line anchoring */
  innerRef?: React.Ref<HTMLDivElement>;
  /** Additional inline styles merged on top of the base card style */
  style?: React.CSSProperties;
}

/* ── Design tokens — derived from GlobalBackground base (#F6F3FA) ────────────
 *
 *  Base bg   : #F6F3FA  (page surface — matches GlobalBackground gradient start)
 *  Dark shad : #DDDAE3  (–12 % luminance, keeps the lavender undertone)
 *  Light shad: #FFFFFF  (pure white — page already fades to white at edges)
 * ─────────────────────────────────────────────────────────────────────────── */
const BG        = "#F6F3FA";
const DARK_SHD  = "#DDDAE3";
const LIGHT_SHD = "#FFFFFF";

const BASE_STYLE: React.CSSProperties = {
  background  : BG,
  borderRadius: 41,
  boxShadow   : `6px 6px 9px ${DARK_SHD}, -6px -6px 9px ${LIGHT_SHD}`,
};

/* Hover: larger offsets for a more pronounced lift effect */
const HOVER_SHADOW = `10px 10px 18px ${DARK_SHD}, -10px -10px 18px ${LIGHT_SHD}`;

export default function NeuCard({
  children,
  className = "",
  delay = 0,
  animate = true,
  hoverLift = true,
  innerRef,
  style,
}: NeuCardProps) {
  return (
    <motion.div
      ref={innerRef}
      /* ── Entrance animation ── */
      initial={animate ? { opacity: 0, y: 24, scale: 0.97 } : false}
      whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        animate
          ? { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
          : undefined
      }
      /* ── Hover lift ── */
      whileHover={
        hoverLift
          ? {
              y: -5,
              scale: 1.02,
              boxShadow: HOVER_SHADOW,
              transition: { type: "spring", stiffness: 260, damping: 22 },
            }
          : undefined
      }
      className={`relative cursor-default ${className}`}
      style={{ ...BASE_STYLE, ...style }}
    >
      {children}
    </motion.div>
  );
}
