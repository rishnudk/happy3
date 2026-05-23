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
    | "atmosphere";
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
            rgba(200, 170, 240, 0.12) 65%,
            rgba(128, 0, 128, 0.06) 78%,
            transparent 92%
          )`,
          filter: "blur(8px)",
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
     VARIANT: primary / secondary (ORIGINAL)
     ═══════════════════════════════════════════════ */
  const isPrimary = variant === "primary";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30, rotate: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -6, 0],
        rotate: [0, 1, 0]
      }}
      transition={{
        opacity: { duration: 1, ease: "easeOut", delay },
        scale: { duration: 1, ease: "easeOut", delay },
        y: {
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
          delay: delay + 0.5
        },
        rotate: {
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
          delay: delay + 0.5
        }
      }}
      className={`absolute z-20 pointer-events-none ${className}`}
      style={{
        filter: isPrimary
          ? "drop-shadow(0 15px 30px rgba(255,206,27,0.25))"
          : "drop-shadow(0 15px 30px rgba(128,0,128,0.15))"
      }}
    >
      <svg
        width="380"
        height="180"
        viewBox="0 0 380 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          filter: isPrimary
            ? "drop-shadow(0 10px 20px rgba(255,206,27,0.30))"
            : "drop-shadow(0 10px 20px rgba(128,0,128,0.25))"
        }}
      >
        <defs>
          {/* Mustard Yellow 3D gradient */}
          <linearGradient id="mustardSmileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="30%" stopColor="#FFCE1B" />
            <stop offset="70%" stopColor="#F5B800" />
            <stop offset="100%" stopColor="#D4990A" />
          </linearGradient>

          {/* Patriarch Purple 3D gradient */}
          <linearGradient id="patriarchSmileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D88BE0" />
            <stop offset="40%" stopColor="#800080" />
            <stop offset="100%" stopColor="#4A004A" />
          </linearGradient>

          {/* 3D glow filter */}
          <filter id="smileGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="12"
              floodColor={isPrimary ? "#FFCE1B" : "#800080"}
              floodOpacity="0.3"
            />
          </filter>
        </defs>

        {/* Thick curved smile line */}
        <path
          d="M 40 40 Q 190 145 340 40"
          fill="none"
          stroke={`url(${isPrimary ? "#mustardSmileGrad" : "#patriarchSmileGrad"})`}
          strokeWidth="38"
          strokeLinecap="round"
          filter="url(#smileGlow)"
        />

        {/* Inner highlight for 3D capsule effect */}
        <path
          d="M 46 36 Q 190 137 334 36"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          className="opacity-50"
        />
      </svg>
    </motion.div>
  );
}
