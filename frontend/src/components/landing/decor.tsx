import { motion } from "motion/react";

export function SmileArc({
  className = "",
  stroke = "currentColor",
  strokeWidth = 1.5,
}: {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M10 30 Q100 110 190 30"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OrbitalLines({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <motion.svg
        viewBox="0 0 600 600"
        className="h-full w-full animate-orbit"
        fill="none"
      >
        <ellipse
          cx="300"
          cy="300"
          rx="280"
          ry="260"
          stroke="url(#orb1)"
          strokeWidth="1"
          strokeDasharray="2 6"
          opacity="0.5"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="220"
          ry="240"
          stroke="url(#orb2)"
          strokeWidth="1"
          opacity="0.35"
        />
        <defs>
          <linearGradient id="orb1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#800080" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFCE1B" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="orb2" x1="1" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#DCC7E8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F5E7B2" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}

export function GlowOrb({
  className = "",
  color = "#FFCE1B",
  size = 320,
  opacity = 0.5,
}: {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(closest-side, ${color}, transparent 70%)`,
        filter: "blur(80px)",
        opacity,
      }}
    />
  );
}

export function CurvedDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="pointer-events-none relative w-full"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 120"
        className="block h-16 w-full md:h-24"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C320,120 720,0 1440,80 L1440,120 L0,120 Z"
          fill="url(#cd)"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="cd" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#F5E7B2" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#FCFAFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#DCC7E8" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="18" fill="url(#bm)" />
      <path
        d="M10 22 Q20 34 30 22"
        stroke="#111810"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="14" cy="16" r="1.6" fill="#111810" />
      <circle cx="26" cy="16" r="1.6" fill="#111810" />
      <defs>
        <linearGradient id="bm" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFCE1B" />
          <stop offset="100%" stopColor="#FFE082" />
        </linearGradient>
      </defs>
    </svg>
  );
}
