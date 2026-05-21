"use client";

import { motion } from "framer-motion";

interface SmileArcProps {
  variant?: "primary" | "secondary" | "thin-orbit" | "inline";
  className?: string;
  delay?: number;
}

export default function SmileArc({ variant = "primary", className = "", delay = 0 }: SmileArcProps) {
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

  /* Inline variant — small smile arc that fits within text, used inside the yellow pill */
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

  const isPrimary = variant === "primary";

  /* Primary = Mustard Yellow (#FFCE1B) brand arc
     Secondary = Patriarch Purple (#800080) brand arc */
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
