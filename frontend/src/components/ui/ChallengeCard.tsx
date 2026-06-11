"use client";

import { ArrowRight, type LucideIcon } from "lucide-react";
import NeuCard from "./NeuCard";

export interface ChallengeCardProps {
  title: string;
  description?: string;
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
    | "dark-glass"
    | "purple-neu"
    | "mustard-neu"
    | "brand-arc"
    | "metric-card";
}

/**
 * ChallengeCard — one of the 6 "struggle" cards in the Real Challenge section.
 * Built on top of <NeuCard> to inherit the global neumorphic design token.
 */
export default function ChallengeCard({
  title,
  description,
  icon: Icon,
  iconColor,
  delay = 0,
  innerRef,
  className = "",
  variant = "default",
}: ChallengeCardProps) {
  const isDark = variant === "purple" || variant === "purple-neu" || variant === "dark-glass";
  const isMetric = variant === "metric-card";

  if (isMetric) {
    return (
      <NeuCard
        delay={delay}
        innerRef={innerRef}
        variant={variant}
        className={`relative flex flex-col justify-between p-5 sm:p-6 group min-h-[160px] ${className}`}
      >
        <div className="flex justify-between items-start w-full gap-4 relative z-10">
          {/* Text on left */}
          <h3 className="font-satoshi font-bold text-[#2A254B] text-[18px] sm:text-[20px] leading-snug tracking-tight pt-2 mt-1">
            {title}
          </h3>

          {/* Icon & Arc on top right */}
          <div className="relative w-[70px] h-[70px] flex-shrink-0">
            {/* SVG Arc wrapped around the inset circle */}
            <svg
              className="absolute z-10 pointer-events-none"
              style={{ top: -12, left: -12, width: 94, height: 94 }}
              viewBox="0 0 108 108"
              overflow="visible"
            >
              <defs>
                <filter id="arc-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.12)" />
                </filter>
              </defs>
              <g filter="url(#arc-shadow)">
                {/* Mustard arc (solid yellow) */}
                <circle
                  cx="54"
                  cy="54"
                  r="46"
                  fill="none"
                  stroke="#FFCE1B"
                  strokeWidth="10"
                  strokeDasharray="72.25 289"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
                {/* Purple arc (top half) */}
                <circle
                  cx="54"
                  cy="54"
                  r="46"
                  fill="none"
                  stroke="#800080"
                  strokeWidth="10"
                  strokeDasharray="60.2 289"
                  strokeDashoffset="-228.8"
                  strokeLinecap="round"
                />
              </g>
            </svg>

            {/* Inset Circle */}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center z-20"
              style={{
                background: "#F8F7FB",
                boxShadow: "inset 6px 6px 12px #DDDAE3, inset -6px -6px 12px #FFFFFF",
              }}
            >
              <Icon style={{ color: iconColor, width: 28, height: 28 }} strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Bottom Right Arrow */}
        <div className="absolute bottom-5 right-5 text-[#800080] transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight size={20} strokeWidth={2.5} />
        </div>
      </NeuCard>
    );
  }

  const iconOrbStyles = variant === "purple-neu"
    ? {
        background: "#800080",
        boxShadow: "inset 3px 3px 6px #4d004d, inset -3px -3px 6px #b300b3",
      }
    : variant === "mustard-neu"
    ? {
        background: "#FFCE1B",
        boxShadow: "inset 3px 3px 6px #CCA000, inset -3px -3px 6px #FFFC8E",
      }
    : variant === "purple"
    ? {
        background: "#2f1b4e",
        boxShadow: "inset 3px 3px 6px #180d28, inset -3px -3px 6px #4b2d7b",
      }
    : variant === "dark-glass"
    ? {
        background: "rgba(0, 0, 0, 0.2)",
        boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.4), inset -2px -2px 5px rgba(255,255,255,0.08)",
      }
    : {
        background: "#F6F3FA",
        boxShadow: "inset 3px 3px 7px #DDDAE3, inset -3px -3px 7px #FFFFFF",
      };

  const getTintDiscStyles = () => {
    if (variant === "purple-neu" || variant === "purple" || variant === "dark-glass") {
      return {
        width: 32,
        height: 32,
        borderRadius: 10,
        background: "rgba(255, 255, 255, 0.12)",
        boxShadow: "inset 1px 1px 3px rgba(255,255,255,0.15), inset -1px -1px 2px rgba(0,0,0,0.3)",
      };
    }
    if (variant === "mustard-neu") {
      return {
        width: 32,
        height: 32,
        borderRadius: 10,
        background: "rgba(128, 0, 128, 0.08)",
        boxShadow: "inset 1px 1px 3px rgba(128, 0, 128, 0.1), inset -1px -1px 2px rgba(255, 255, 255, 0.4)",
      };
    }
    return {
      width: 32,
      height: 32,
      borderRadius: 10,
      background: `${iconColor}20`,
      boxShadow: `inset 2px 2px 5px ${iconColor}25, inset -1px -1px 3px rgba(255,255,255,0.6)`,
    };
  };

  const getIconColor = () => {
    if (variant === "purple-neu" || variant === "purple" || variant === "dark-glass") {
      return "#FFFFFF";
    }
    if (variant === "mustard-neu") {
      return "#800080";
    }
    return iconColor;
  };

  return (
    <NeuCard
      delay={delay}
      innerRef={innerRef}
      variant={variant}
      /* Size is controlled here — compact square feel */
      className={`flex flex-col items-center justify-center gap-3 p-4 sm:p-5 group min-h-[110px] sm:min-h-[120px] lg:min-h-[130px] ${className}`}
    >
      {/* ── Icon orb ── */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          ...iconOrbStyles,
        }}
      >
        {/* Coloured tint disc */}
        <div
          className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={getTintDiscStyles()}
        >
          <Icon style={{ color: getIconColor(), width: 16, height: 16, strokeWidth: 2.2 }} />
        </div>
      </div>

      {/* ── Label ── */}
      <h3
        className={`font-satoshi font-bold text-center leading-snug tracking-tight transition-colors duration-300 ${
          isDark ? "group-hover:text-[#FFCE1B]" : "group-hover:text-[#800080]"
        }`}
        style={{ fontSize: 13, color: isDark ? "#F3E8FF" : "#4A4568" }}
      >
        {title}
      </h3>
    </NeuCard>
  );
}
