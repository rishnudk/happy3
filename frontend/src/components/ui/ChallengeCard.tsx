"use client";

import type { LucideIcon } from "lucide-react";
import NeuCard from "./NeuCard";

export interface ChallengeCardProps {
  title: string;
  icon: LucideIcon;
  /** Hex colour for the icon and tinted disc, e.g. "#800080" */
  iconColor: string;
  /** Framer-motion entrance delay in seconds */
  delay?: number;
  /** Ref forwarded to the root div — used for SVG connector line anchoring */
  innerRef?: React.Ref<HTMLDivElement>;
  className?: string;
  /** Card design variant */
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
    | "dark-glass";
}

/**
 * ChallengeCard — one of the 6 "struggle" cards in the Real Challenge section.
 * Built on top of <NeuCard> to inherit the global neumorphic design token.
 * Layout: centred icon orb above a centred label.
 */
export default function ChallengeCard({
  title,
  icon: Icon,
  iconColor,
  delay = 0,
  innerRef,
  className = "",
  variant = "default",
}: ChallengeCardProps) {
  return (
    <NeuCard
      delay={delay}
      innerRef={innerRef}
      variant={variant}
      /* Size is controlled here — compact square feel */
      className={`flex flex-col items-center justify-center gap-4 p-5 group ${className}`}
      style={{ minHeight: 130 }}
    >
      {/* ── Icon orb ── */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          /* Inset neumorphic well — same palette as GlobalBackground (#F6F3FA) */
          background: "#F6F3FA",
          boxShadow: "inset 3px 3px 7px #DDDAE3, inset -3px -3px 7px #FFFFFF",
        }}
      >
        {/* Coloured tint disc */}
        <div
          className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: `${iconColor}20`,
            boxShadow: `inset 2px 2px 5px ${iconColor}25, inset -1px -1px 3px rgba(255,255,255,0.6)`,
          }}
        >
          <Icon style={{ color: iconColor, width: 16, height: 16, strokeWidth: 2.2 }} />
        </div>
      </div>

      {/* ── Label ── */}
      <h3
        className="font-satoshi font-bold text-center leading-snug tracking-tight transition-colors duration-300 group-hover:text-[#800080]"
        style={{ fontSize: 13, color: "#4A4568" }}
      >
        {title}
      </h3>
    </NeuCard>
  );
}
