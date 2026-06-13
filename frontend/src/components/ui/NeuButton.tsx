"use client";

import React from "react";
import Link from "next/link";

/* ─── Variant definitions ───────────────────────────────────────────────── */
type NeuButtonVariant = "primary" | "mustard" | "dark-primary";

interface VariantStyle {
  bg: string;
  bgHover: string;
  border: string;
  borderHover: string;
  color: string;
  shadow: string;
  shadowHover: string;
}

const VARIANTS: Record<NeuButtonVariant, VariantStyle> = {
  primary: {
    bg: "linear-gradient(145deg, #ffffff, #f4efff)",
    bgHover: "linear-gradient(145deg, #f4efff, #ece4fa)",
    border: "2px solid rgba(128,0,128,0.12)",
    borderHover: "2px solid rgba(128,0,128,0.25)",
    color: "#800080",
    shadow:
      "inset 4px 4px 10px rgba(165,140,217,0.15), inset -4px -4px 10px rgba(255,255,255,0.95)",
    shadowHover:
      "inset 2px 2px 5px rgba(165,140,217,0.18), inset -2px -2px 5px rgba(255,255,255,0.9), 2px 2px 8px rgba(165,140,217,0.10), -2px -2px 8px rgba(255,255,255,0.95)",
  },
  mustard: {
    bg: "linear-gradient(145deg, #FFCE1B, #FFD84D)",
    bgHover: "linear-gradient(145deg, #FFD84D, #FFCE1B)",
    border: "2px solid rgba(212,166,0,0.2)",
    borderHover: "2px solid rgba(212,166,0,0.35)",
    color: "#2A254B",
    shadow:
      "inset 4px 4px 10px rgba(180,140,0,0.18), inset -4px -4px 10px rgba(255,230,100,0.6)",
    shadowHover:
      "inset 2px 2px 5px rgba(180,140,0,0.2), inset -2px -2px 5px rgba(255,230,100,0.5), 2px 2px 8px rgba(255,206,27,0.2), -2px -2px 8px rgba(255,255,255,0.8)",
  },
  "dark-primary": {
    bg: "#FFCE1B",
    bgHover: "#FFD84D",
    border: "2px solid transparent",
    borderHover: "2px solid transparent",
    color: "#2A254B",
    shadow: "0 4px 14px rgba(255, 206, 27, 0.25)",
    shadowHover: "0 6px 20px rgba(255, 206, 27, 0.4)",
  },
};

/* ─── Props ─────────────────────────────────────────────────────────────── */
interface NeuButtonProps {
  children: React.ReactNode;
  variant?: NeuButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES: Record<"sm" | "md" | "lg", string> = {
  sm: "px-4 py-2 text-[11px] sm:text-[12px]",
  md: "px-5 py-2.5 text-[12px] sm:px-6 sm:py-3 sm:text-[13px] md:px-8 md:py-3.5 md:text-[14px]",
  lg: "px-6 py-3 text-[13px] sm:px-8 sm:py-3.5 sm:text-[14px] md:px-10 md:py-4 md:text-[15px]",
};

/* ─── Component ─────────────────────────────────────────────────────────── */
export function NeuButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  style: externalStyle,
  size = "md",
}: NeuButtonProps) {
  const v = VARIANTS[variant];
  const sizeClasses = SIZE_CLASSES[size];

  const baseStyle: React.CSSProperties = {
    background: v.bg,
    border: v.border,
    borderRadius: 9999,
    color: v.color,
    boxShadow: v.shadow,
    cursor: "pointer",
    fontWeight: 700,
    whiteSpace: "nowrap",
    transition: "all 0.25s ease-in-out",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    ...externalStyle,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.background = v.bgHover;
    el.style.border = v.borderHover;
    el.style.boxShadow = v.shadowHover;
    el.style.transform = "translateY(-1px)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.background = v.bg;
    el.style.border = v.border;
    el.style.boxShadow = v.shadow;
    el.style.transform = "translateY(0)";
  };

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.boxShadow = v.shadowHover;
    e.currentTarget.style.outline = "none";
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.boxShadow = v.shadow;
  };

  if (href) {
    return (
      <Link
        href={href}
        className={`${sizeClasses} ${className}`}
        style={baseStyle}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${sizeClasses} ${className}`}
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </button>
  );
}
