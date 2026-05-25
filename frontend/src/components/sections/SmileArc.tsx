"use client";

import { motion } from "framer-motion";

interface SmileArcProps {
  variant?:
    | "primary"
    | "secondary"
    | "thin-orbit"
    | "inline"
    | "emotional-ring"
    | "conic-glow"
    | "blur-halo"
    | "smile-lower"
    | "atmosphere"
    | "hero-smile";
  className?: string;
  delay?: number;
  /** Size of the arc ring (used for emotional/conic/blur/atmosphere variants) */
  size?: string;
  /** Rotation direction: 1 = clockwise, -1 = counter-clockwise */
  direction?: 1 | -1;
  /** Full rotation duration in seconds */
  rotationDuration?: number;
  /** Custom border style overrides */
  borderStyle?: React.CSSProperties;
  /** Custom background/gradient style */
  gradientStyle?: React.CSSProperties;
}

export default function SmileArc({
  variant = "primary",
  className = "",
  delay = 0,
  size,
  direction = 1,
  rotationDuration = 50,
  borderStyle,
  gradientStyle,
}: SmileArcProps) {

  /* ═══════════════════════════════════════════════
     VARIANT: emotional-ring
     Thick partial-border ring with slow rotation
     ═══════════════════════════════════════════════ */
  if (variant === "emotional-ring") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: 1,
          scale: [1, 1.015, 1],
          rotate: direction === 1 ? [0, 360] : [0, -360],
        }}
        transition={{
          opacity: { duration: 1.8, delay, ease: "easeOut" },
          scale: {
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
            delay: delay + 0.5,
          },
          rotate: {
            repeat: Infinity,
            duration: rotationDuration,
            ease: "linear",
          },
        }}
        className={`absolute rounded-full pointer-events-none ${size ?? ""} ${className}`}
        style={{
          border: "18px solid rgba(200, 170, 240, 0.18)",
          borderTopColor: "transparent",
          borderRightColor: "rgba(128, 0, 128, 0.10)",
          boxShadow: `
            8px 8px 24px rgba(165, 140, 217, 0.14),
            -8px -8px 24px rgba(255, 255, 255, 0.7),
            inset 3px 3px 8px rgba(255, 255, 255, 0.25),
            inset -3px -3px 8px rgba(165, 140, 217, 0.06)
          `,
          ...borderStyle,
        }}
      />
    );
  }

  /* ═══════════════════════════════════════════════
     VARIANT: conic-glow
     Conic gradient overlay ring with slow rotation
     ═══════════════════════════════════════════════ */
  if (variant === "conic-glow") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          rotate: direction === 1 ? [0, 360] : [0, -360],
          scale: [1, 1.02, 1],
        }}
        transition={{
          opacity: { duration: 2, delay, ease: "easeOut" },
          rotate: {
            repeat: Infinity,
            duration: rotationDuration,
            ease: "linear",
          },
          scale: {
            repeat: Infinity,
            duration: 14,
            ease: "easeInOut",
            delay: delay + 1,
          },
        }}
        className={`absolute rounded-full pointer-events-none ${size ?? ""} ${className}`}
        style={{
          background: `conic-gradient(
            from 0deg,
            rgba(200, 170, 240, 0.08) 0deg,
            rgba(128, 0, 128, 0.12) 60deg,
            transparent 120deg,
            rgba(255, 206, 27, 0.08) 200deg,
            rgba(200, 170, 240, 0.06) 280deg,
            transparent 360deg
          )`,
          boxShadow: `
            6px 6px 20px rgba(165, 140, 217, 0.10),
            -6px -6px 20px rgba(255, 255, 255, 0.6),
            inset 2px 2px 6px rgba(255, 255, 255, 0.20),
            inset -2px -2px 6px rgba(165, 140, 217, 0.04)
          `,
          ...gradientStyle,
        }}
      />
    );
  }

  /* ═══════════════════════════════════════════════
     VARIANT: blur-halo
     Soft blurred radial glow halo ring
     ═══════════════════════════════════════════════ */
  if (variant === "blur-halo") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.03, 1],
          y: [0, -4, 0],
        }}
        transition={{
          opacity: { duration: 2.2, delay, ease: "easeOut" },
          scale: {
            repeat: Infinity,
            duration: 16,
            ease: "easeInOut",
            delay: delay + 0.8,
          },
          y: {
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: delay + 0.5,
          },
        }}
        className={`absolute rounded-full pointer-events-none ${size ?? ""} ${className}`}
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 55%,
            rgba(200, 170, 240, 0.15) 65%,
            rgba(128, 0, 128, 0.08) 78%,
            transparent 92%
          )`,
          boxShadow: `
            4px 4px 16px rgba(165, 140, 217, 0.08),
            -4px -4px 16px rgba(255, 255, 255, 0.5)
          `,
          ...gradientStyle,
        }}
      />
    );
  }

  /* ═══════════════════════════════════════════════
     VARIANT: smile-lower
     Asymmetric lower-hemisphere smile-inspired arc
     ═══════════════════════════════════════════════ */
  if (variant === "smile-lower") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: [0, -5, 0],
          rotate: direction === 1 ? [0, 3, 0] : [0, -3, 0],
        }}
        transition={{
          opacity: { duration: 1.6, delay, ease: "easeOut" },
          y: {
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
            delay: delay + 0.3,
          },
          rotate: {
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: delay + 0.3,
          },
        }}
        className={`absolute rounded-full pointer-events-none ${size ?? ""} ${className}`}
        style={{
          border: "14px solid transparent",
          borderBottomColor: "rgba(255, 206, 27, 0.18)",
          borderLeftColor: "rgba(200, 170, 240, 0.10)",
          borderRightColor: "rgba(200, 170, 240, 0.10)",
          boxShadow: `
            8px 8px 24px rgba(165, 140, 217, 0.12),
            -8px -8px 24px rgba(255, 255, 255, 0.65),
            inset 2px 2px 6px rgba(255, 255, 255, 0.20),
            inset -2px -2px 6px rgba(165, 140, 217, 0.05)
          `,
          ...borderStyle,
        }}
      />
    );
  }

  /* ═══════════════════════════════════════════════
     VARIANT: atmosphere
     Ultra-soft atmospheric border ring
     ═══════════════════════════════════════════════ */
  if (variant === "atmosphere") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{
          opacity: 1,
          rotate: direction === 1 ? [0, 360] : [0, -360],
          scale: [1, 1.008, 1],
        }}
        transition={{
          opacity: { duration: 2.5, delay, ease: "easeOut" },
          rotate: {
            repeat: Infinity,
            duration: rotationDuration,
            ease: "linear",
          },
          scale: {
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut",
            delay: delay + 1,
          },
        }}
        className={`absolute rounded-full pointer-events-none ${size ?? ""} ${className}`}
        style={{
          border: "1.5px solid rgba(200, 170, 240, 0.15)",
          boxShadow: `
            6px 6px 18px rgba(165, 140, 217, 0.10),
            -6px -6px 18px rgba(255, 255, 255, 0.65),
            0 0 40px rgba(128, 0, 128, 0.04),
            inset 0 0 30px rgba(200, 170, 240, 0.03),
            inset 1px 1px 4px rgba(255, 255, 255, 0.15),
            inset -1px -1px 4px rgba(165, 140, 217, 0.03)
          `,
          ...borderStyle,
        }}
      />
    );
  }

  /* ═══════════════════════════════════════════════
     VARIANT: thin-orbit (ORIGINAL)
     ═══════════════════════════════════════════════ */
  if (variant === "thin-orbit") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        className={`absolute pointer-events-none ${className}`}
      >
        <svg
          width="500"
          height="500"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            cx="250"
            cy="250"
            r="240"
            stroke="#800080"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="animate-spin-slow"
            style={{ animationDuration: "120s" }}
          />
          <circle
            cx="250"
            cy="250"
            r="200"
            stroke="#800080"
            strokeWidth="1"
            className="opacity-75"
          />
        </svg>
      </motion.div>
    );
  }

  /* ═══════════════════════════════════════════════
     VARIANT: inline (ORIGINAL)
     ═══════════════════════════════════════════════ */
  if (variant === "inline") {
    return (
      <span className={`inline-block ${className}`}>
        <svg
          width="40"
          height="22"
          viewBox="0 0 40 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{
            filter: "drop-shadow(0 2px 0 rgba(100,0,100,0.25))"
          }}
        >
          <path
            d="M 4 4 Q 20 20 36 4"
            fill="none"
            stroke="#800080"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Top highlight for 3D depth */}
          <path
            d="M 6 3 Q 20 17 34 3"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-30"
          />
        </svg>
      </span>
    );
  }

  /* ═══════════════════════════════════════════════
     VARIANT: primary / secondary (REDESIGNED PREMIUM NEUMORPHIC ARC)
     ═══════════════════════════════════════════════ */
  if (variant === "hero-smile") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className={`absolute pointer-events-none aspect-[380/180] ${className}`}
      >
        <svg
          width="380"
          height="180"
          viewBox="0 0 380 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
          <path
            d="M 40 48 Q 190 153 340 48"
            fill="none"
            stroke="#5E005E"
            strokeWidth="38"
            strokeLinecap="round"
          />
          <path
            d="M 40 54 Q 190 159 340 54"
            fill="none"
            stroke="rgba(90,0,90,0.22)"
            strokeWidth="38"
            strokeLinecap="round"
          />
          <path
            d="M 40 40 Q 190 145 340 40"
            fill="none"
            stroke="#800080"
            strokeWidth="38"
            strokeLinecap="round"
          />
          <path
            d="M 46 34 Q 190 132 334 34"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 44 47 Q 190 151 336 47"
            fill="none"
            stroke="rgba(48,0,48,0.38)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    );
  }

  const isPrimary = variant === "primary";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30, rotate: 0 }}
      animate={{
        opacity: 1,
        scale: [1, 1.012, 1],
        y: [0, -4, 0],
        rotate: [0, 0.8, 0],
      }}
      transition={{
        opacity: { duration: 1.5, ease: "easeOut", delay },
        scale: {
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
          delay: delay + 0.5,
        },
        y: {
          repeat: Infinity,
          duration: 9,
          ease: "easeInOut",
          delay: delay + 0.3,
        },
        rotate: {
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: delay + 0.3,
        },
      }}
      className={`absolute z-20 pointer-events-none aspect-[380/180] ${className}`}
    >
      <svg
        width="380"
        height="180"
        viewBox="0 0 380 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {/* Neumorphic Lighting Filters */}
          {isPrimary ? (
            <filter id="premiumNeumorphicArc" x="-30%" y="-30%" width="160%" height="160%">
              {/* Ambient diffused purple background glow (creates a floating, emotionally calming effect) */}
              <feGaussianBlur in="SourceAlpha" stdDeviation="24" result="blurGlow" />
              <feOffset in="blurGlow" dx="0" dy="16" result="offsetGlow" />
              <feFlood floodColor="#800080" floodOpacity="0.12" result="colorGlow" />
              <feComposite in="colorGlow" in2="offsetGlow" operator="in" result="shadowGlow" />

              {/* Dark Depth Shadow (bottom-right depth shadow, soft purple-gray) */}
              <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blurDark" />
              <feOffset in="blurDark" dx="8" dy="12" result="offsetDark" />
              <feFlood floodColor="#4C3A60" floodOpacity="0.22" result="colorDark" />
              <feComposite in="colorDark" in2="offsetDark" operator="in" result="shadowDark" />

              {/* Light Highlight Shadow (top-left highlight, white/lavender) */}
              <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blurLight" />
              <feOffset in="blurLight" dx="-8" dy="-10" result="offsetLight" />
              <feFlood floodColor="#FFFFFF" floodOpacity="0.85" result="colorLight" />
              <feComposite in="colorLight" in2="offsetLight" operator="in" result="shadowLight" />

              {/* Merge everything together, with SourceGraphic on top */}
              <feMerge>
                <feMergeNode in="shadowGlow" />
                <feMergeNode in="shadowDark" />
                <feMergeNode in="shadowLight" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ) : (
            <filter id="premiumNeumorphicArc" x="-30%" y="-30%" width="160%" height="160%">
              {/* Ambient diffused gold background glow */}
              <feGaussianBlur in="SourceAlpha" stdDeviation="24" result="blurGlow" />
              <feOffset in="blurGlow" dx="0" dy="16" result="offsetGlow" />
              <feFlood floodColor="#FFCE1B" floodOpacity="0.14" result="colorGlow" />
              <feComposite in="colorGlow" in2="offsetGlow" operator="in" result="shadowGlow" />

              {/* Dark Depth Shadow (bottom-right depth shadow, soft gold-brown) */}
              <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blurDark" />
              <feOffset in="blurDark" dx="8" dy="12" result="offsetDark" />
              <feFlood floodColor="#855F00" floodOpacity="0.18" result="colorDark" />
              <feComposite in="colorDark" in2="offsetDark" operator="in" result="shadowDark" />

              {/* Light Highlight Shadow (top-left highlight, white) */}
              <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blurLight" />
              <feOffset in="blurLight" dx="-8" dy="-10" result="offsetLight" />
              <feFlood floodColor="#FFFFFF" floodOpacity="0.85" result="colorLight" />
              <feComposite in="colorLight" in2="offsetLight" operator="in" result="shadowLight" />

              {/* Merge everything together, with SourceGraphic on top */}
              <feMerge>
                <feMergeNode in="shadowGlow" />
                <feMergeNode in="shadowDark" />
                <feMergeNode in="shadowLight" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}

          {/* Core Neumorphic Clay Gradient (Primary: Patriarch Purple to Soft Lavender) */}
          <linearGradient id="neumorphicArcGrad" x1="10%" y1="0%" x2="90%" y2="100%">
            {isPrimary ? (
              <>
                <stop offset="0%" stopColor="#E6DCF2" /> {/* Lightest lavender highlight at the start */}
                <stop offset="25%" stopColor="#C084FC" /> {/* Soft Lavender */}
                <stop offset="65%" stopColor="#800080" /> {/* Patriarch Purple Core */}
                <stop offset="100%" stopColor="#4A054A" /> {/* Deeper Purple Shadow */}
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#FFFBEB" /> {/* Lightest gold highlight at the start */}
                <stop offset="25%" stopColor="#FCD34D" /> {/* Soft Gold */}
                <stop offset="65%" stopColor="#FFCE1B" /> {/* Mustard Yellow Core */}
                <stop offset="100%" stopColor="#92400E" /> {/* Deeper Golden-Brown Shadow */}
              </>
            )}
          </linearGradient>

          {/* Premium Inner Rim Light Highlight Gradient */}
          <linearGradient id="innerHighlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>

          {/* Premium Inner Depth Shadow Gradient */}
          <linearGradient id="innerShadowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            {isPrimary ? (
              <>
                <stop offset="0%" stopColor="#800080" stopOpacity="0.0" />
                <stop offset="60%" stopColor="#4A054A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#300130" stopOpacity="0.75" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#FFCE1B" stopOpacity="0.0" />
                <stop offset="60%" stopColor="#92400E" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#78350F" stopOpacity="0.75" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* 1. Base molded clay body with neumorphic dual-shadowing filter applied */}
        <path
          d="M 40 40 Q 190 145 340 40"
          fill="none"
          stroke="url(#neumorphicArcGrad)"
          strokeWidth="38"
          strokeLinecap="round"
          filter="url(#premiumNeumorphicArc)"
        />

        {/* 2. Inner deep shadow (bottom-right edge of capsule) for rounded depth */}
        <path
          d="M 44 44 Q 190 149 336 44"
          fill="none"
          stroke="url(#innerShadowGrad)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* 3. Inner edge highlight (top-left edge of capsule) for 3D extrusion */}
        <path
          d="M 46 36 Q 190 137 334 36"
          fill="none"
          stroke="url(#innerHighlightGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
