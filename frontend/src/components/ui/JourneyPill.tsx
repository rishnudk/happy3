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
};

export function JourneyPill({
  href,
  children,
  icon,
  onClick,
  className = "",
}: JourneyPillProps) {
  const pill = (
    <div
      className={`
        relative overflow-hidden rounded-full px-6 py-3
        backdrop-blur-xl border border-white/80
        flex items-center gap-3.5
        text-[14px] font-semibold text-primary tracking-wide
        transition-all duration-500
        ${className}
      `}
      style={{
        background: "linear-gradient(145deg, #ffffff, #f4efff)",
        boxShadow: `
          0 20px 40px rgba(128,0,128,0.08),
          12px 12px 24px rgba(128,0,128,0.08),
          -10px -10px 24px rgba(255,255,255,0.95),
          inset 1px 1px 2px rgba(255,255,255,1),
          inset -1px -1px 3px rgba(128,0,128,0.04)
        `,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute inset-x-5 top-1 h-[12px] rounded-full bg-white/70 blur-[6px] pointer-events-none" />
      <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[70%] h-[18px] rounded-full bg-purple-300/20 blur-2xl pointer-events-none" />

      {icon && (
        <span
          className="relative w-8 h-8 rounded-full flex items-center justify-center border border-white shrink-0"
          style={{
            background: "linear-gradient(145deg, #ffffff, #f3edff)",
            boxShadow: `
              -5px -5px 12px rgba(255,255,255,1),
              6px 6px 16px rgba(128,0,128,0.1),
              inset 1px 1px 2px rgba(255,255,255,1)
            `,
          }}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[60%] h-[6px] rounded-full bg-white/80 blur-[2px]" />
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
