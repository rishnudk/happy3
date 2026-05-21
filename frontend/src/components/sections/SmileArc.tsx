"use client";

import { motion } from "framer-motion";

interface SmileArcProps {
  variant?: "primary" | "secondary" | "thin-orbit";
  className?: string;
  delay?: number;
}

export default function SmileArc({ variant = "primary", className = "", delay = 0 }: SmileArcProps) {
  if (variant === "thin-orbit") {
    // Elegant, thin supporting orbital rings in purple in the background
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

  const isPrimary = variant === "primary";

  // Quadratic Bézier curve for a perfect smile arc capsule shape
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
      className={`absolute z-20 pointer-events-none drop-shadow-[0_15px_30px_rgba(128,0,128,0.12)] ${className}`}
    >
      <svg
        width="380"
        height="180"
        viewBox="0 0 380 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(255,206,27,0.3)]"
      >
        <defs>
          {/* Rich 3D gradient for the Yellow Smile Arc */}
          <linearGradient id="yellowSmileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFE875" />
            <stop offset="30%" stopColor="#FFCE1B" />
            <stop offset="70%" stopColor="#FFAA00" />
            <stop offset="100%" stopColor="#FF8800" />
          </linearGradient>

          {/* Elegant 3D gradient for the Purple Smile Arc */}
          <linearGradient id="purpleSmileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D88BE0" />
            <stop offset="40%" stopColor="#800080" />
            <stop offset="100%" stopColor="#4A004A" />
          </linearGradient>

          {/* Neumorphic 3D filter glow */}
          <filter id="neumorphicGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor={isPrimary ? "#FFCE1B" : "#800080"} floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Thick curved smile line */}
        <path
          d="M 40 40 Q 190 145 340 40"
          fill="none"
          stroke={`url(${isPrimary ? "#yellowSmileGrad" : "#purpleSmileGrad"})`}
          strokeWidth="38"
          strokeLinecap="round"
          filter="url(#neumorphicGlow)"
        />
        
        {/* Soft Inner Highlight for the Neumorphic 3D Capsule edge */}
        <path
          d="M 46 36 Q 190 137 334 36"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          className="opacity-45"
        />
      </svg>
    </motion.div>
  );
}
