"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type JourneyPillProps = {
  href?: string;
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "dark";
};

export function JourneyPill({
  href,
  children,
  icon,
  onClick,
  className = "",
  variant = "default",
}: JourneyPillProps) {
  const isDark = variant === "dark";

  const pill = (
    <div
      className={`
        relative overflow-hidden rounded-full px-3 py-2 sm:px-6 sm:py-3
        backdrop-blur-xl border
        flex items-center gap-2 sm:gap-3.5
        text-[11px] sm:text-[14px] font-semibold tracking-wide
        transition-all duration-500
        ${isDark ? "border-white/10 text-white" : "border-white/80 text-primary"}
        ${className}
      `}
      style={{
        background: isDark ? "rgba(255, 255, 255, 0.08)" : "linear-gradient(145deg, #ffffff, #f4efff)",
        boxShadow: isDark 
          ? "0 4px 12px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(255,255,255,0.05)"
          : `
          0 20px 40px rgba(128,0,128,0.08),
          12px 12px 24px rgba(128,0,128,0.08),
          -10px -10px 24px rgba(255,255,255,0.95),
          inset 1px 1px 2px rgba(255,255,255,1),
          inset -1px -1px 3px rgba(128,0,128,0.04)
        `,
        transformStyle: "preserve-3d",
      }}
    >
      {!isDark && (
        <>
          <div className="absolute inset-x-5 top-1 h-[12px] rounded-full bg-white/70 blur-[6px] pointer-events-none" />
          <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[70%] h-[18px] rounded-full bg-purple-300/20 blur-2xl pointer-events-none" />
        </>
      )}

      {icon && (
        <span
          className={`relative w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border shrink-0 ${isDark ? "border-white/10 text-white" : "border-white"}`}
          style={{
            background: isDark ? "rgba(255,255,255,0.1)" : "linear-gradient(145deg, #ffffff, #f3edff)",
            boxShadow: isDark ? "none" : `
              -5px -5px 12px rgba(255,255,255,1),
              6px 6px 16px rgba(128,0,128,0.1),
              inset 1px 1px 2px rgba(255,255,255,1)
            `,
          }}
        >
          {!isDark && <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[60%] h-[6px] rounded-full bg-white/80 blur-[2px]" />}
          {icon}
        </span>
      )}

      <span className="relative z-10">{children}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="inline-flex"
    >
      {href ? (
        <Link href={href} onClick={onClick} className="inline-flex">
          {pill}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className="inline-flex">
          {pill}
        </button>
      )}
    </motion.div>
  );
}
