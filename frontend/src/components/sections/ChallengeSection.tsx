"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  HeartCrack,
  CloudLightning,
  Compass,
  Baby,
  Briefcase,
} from "lucide-react";
import ChallengeCard from "@/components/ui/ChallengeCard";
import PageWrapper from "@/components/layout/page-wrapper";

/* ─── Challenge data (no num) ──────────────────────────────────────────── */
const CHALLENGES = [
  { title: "Stress",                 icon: Brain,         iconColor: "#800080" },
  { title: "Relationship Challenges",icon: HeartCrack,    iconColor: "#C026D3" },
  { title: "Emotional Breakdown",    icon: CloudLightning, iconColor: "#7C3AED" },
  { title: "Lack of Clarity",        icon: Compass,       iconColor: "#9333EA" },
  { title: "Parenting Pressure",     icon: Baby,          iconColor: "#A21CAF" },
  { title: "Career Anxiety",         icon: Briefcase,     iconColor: "#6D28D9" },
] as const;

/* ─── Connector pairs: which cards to join ─────────────────────────────── */
// Adjacent horizontals, adjacent verticals, + cross diagonals
const LINE_PAIRS: [number, number][] = [
  [0, 1], [1, 2],          // top row
  [3, 4], [4, 5],          // bottom row
  [0, 3], [1, 4], [2, 5], // verticals
  [1, 3], [2, 4],          // diagonals
];

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Pt { x: number; y: number }

function getCenter(el: HTMLDivElement | null, cont: HTMLDivElement | null): Pt | null {
  if (!el || !cont) return null;
  const cr = el.getBoundingClientRect();
  const pr = cont.getBoundingClientRect();
  return { x: cr.left - pr.left + cr.width / 2, y: cr.top - pr.top + cr.height / 2 };
}

/* ─── AnimatedPath ──────────────────────────────────────────────────────── *
 *  Uses strokeDasharray + animated strokeDashoffset (as requested)          *
 *  The full path length is the dasharray; offset animates from 0 → −length  *
 *  giving a clean marching-ant travelling effect.                            *
 * ─────────────────────────────────────────────────────────────────────────── */
function AnimatedPath({ d, delay = 0 }: { d: string; delay?: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, [d]);

  // dash segment = 18 % of the full length, gap = the rest
  const dashLen  = pathLen * 0.18;
  const gapLen   = pathLen - dashLen;

  return (
    <g>
      {/* ① Static base — always-visible faint thread */}
      <path
        d={d}
        fill="none"
        stroke="rgba(128,0,128,0.08)"
        strokeWidth={1}
        strokeLinecap="round"
      />

      {/* ② Travelling dash — strokeDashoffset animates 0 → −pathLen */}
      {pathLen > 0 && (
        <motion.path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="rgba(128,0,128,0.5)"
          strokeWidth={1.5}
          strokeLinecap="round"
          /* dasharray: [dash, gap] so only one segment is visible at a time */
          strokeDasharray={`${dashLen} ${gapLen}`}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -pathLen }}
          transition={{
            duration: 2.5,
            delay,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      )}

      {/* ③ Glowing leading dot, rides along with the dash */}
      {pathLen > 0 && (
        <motion.circle
          r={2.5}
          fill="rgba(128,0,128,0.6)"
          filter="url(#lineglow)"
          /* CSS offset-path lets the dot follow the bezier exactly */
          style={{ offsetPath: `path("${d}")` } as React.CSSProperties}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{
            duration: 2.5,
            delay,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      )}
    </g>
  );
}

/* ─── Named export consumed by page.tsx ─────────────────────────────────── */
export function ChallengeSection() {
  const prefersReducedMotion = useReducedMotion();

  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines]     = useState<string[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  const compute = useCallback(() => {
    const cont = containerRef.current;
    if (!cont) return;
    const { width, height } = cont.getBoundingClientRect();
    setSvgSize({ w: width, h: height });

    const centers = cardRefs.current.map((el) => getCenter(el, cont));

    setLines(
      LINE_PAIRS.map(([a, b]) => {
        const ca = centers[a], cb = centers[b];
        if (!ca || !cb) return "";
        // Gentle cubic bezier — control points pulled slightly off the straight line
        const dx = cb.x - ca.x, dy = cb.y - ca.y;
        const cpx1 = ca.x + dx * 0.25 + (-dy) * 0.10;
        const cpy1 = ca.y + dy * 0.25 +   dx  * 0.10;
        const cpx2 = cb.x - dx * 0.25 + (-dy) * 0.10;
        const cpy2 = cb.y - dy * 0.25 +   dx  * 0.10;
        return `M ${ca.x} ${ca.y} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${cb.x} ${cb.y}`;
      })
    );
  }, []);

  useEffect(() => {
    // Delay so cards finish their entrance animation before we measure
    const t  = setTimeout(compute, 350);
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", compute);
    return () => { clearTimeout(t); ro.disconnect(); window.removeEventListener("resize", compute); };
  }, [compute]);

  return (
    <PageWrapper id="features" className="relative py-20 overflow-visible">



      {/* ── 2-Column layout: text left | cards right ── */}
      <div className="grid items-center gap-16 lg:grid-cols-12 relative z-10">

        {/* ── LEFT: heading block (span 4) ── */}
        <div className="lg:col-span-4 flex flex-col gap-7">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex"
          >
            <span
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase"
              style={{
                color: "rgba(128,0,128,0.75)",
                background: "linear-gradient(145deg, #ffffff, #f4efff)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: `
                  6px 6px 16px rgba(165,140,217,0.12),
                  -6px -6px 16px rgba(255,255,255,0.95),
                  inset 1px 1px 2px rgba(255,255,255,0.9)
                `,
              }}
            >
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                      style={{ background: "rgba(128,0,128,0.5)" }} />
                <span className="relative inline-flex rounded-full h-2 w-2"
                      style={{ background: "#800080" }} />
              </span>
              The Real Challenge
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-satoshi font-black leading-[1.15] tracking-tight neumorphic-text-embossed"
            style={{ fontSize: "clamp(28px, 3.4vw, 48px)", color: "#2A254B" }}
          >
            {/* Line 1 */}
            <span className="block">Why are people</span>
            {/* Line 2 */}
            <span className="block">
              <span className="relative inline-block" style={{ color: "#800080" }}>
                struggling
                {/* Mustard marker underline */}
                <span
                  className="absolute bottom-0 left-[-2px] w-[calc(100%+4px)] h-[9px] rounded-[3px] -z-10"
                  style={{ background: "#FFCE1B", opacity: 0.38 }}
                />
              </span>{" "}
              today?
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-[15px] sm:text-[16px] leading-[1.9] font-medium max-w-[320px]"
            style={{ color: "rgba(42,37,75,0.60)" }}
          >
            Most people were never taught how to regulate emotions.
          </motion.p>

          {/* Animated neumorphic accent rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-20 h-[5px] rounded-full overflow-hidden"
            style={{
              background: "rgba(243,238,250,0.6)",
              boxShadow: "inset 3px 3px 6px rgba(165,140,217,0.10), inset -3px -3px 6px rgba(255,255,255,0.95)",
              border: "1px solid rgba(255,255,255,0.7)",
              transformOrigin: "left center",
            }}
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 rounded-full"
              style={{ background: "linear-gradient(90deg, #800080, #C084FC)", width: "40%" }}
              animate={{ x: [0, 32, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* ── RIGHT: Cards + SVG connector overlay (span 8) ── */}
        <div className="lg:col-span-8">
          <div ref={containerRef} className="relative">

            {/* SVG connector lines — rendered behind the cards */}
            {!prefersReducedMotion && svgSize.w > 0 && (
              <svg
                width={svgSize.w}
                height={svgSize.h}
                className="absolute inset-0 pointer-events-none z-0"
                aria-hidden="true"
              >
                <defs>
                  <filter id="lineglow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {lines.map((d, i) =>
                  d ? <AnimatedPath key={i} d={d} delay={i * 0.4} /> : null
                )}
              </svg>
            )}

            {/* 3 × 2 card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              {CHALLENGES.map((item, index) => {
                const variants: ("default" | "glass" | "outlined-purple" | "inset" | "elevated" | "outlined-mustard")[] = [
                  "default", "glass", "outlined-purple", "inset", "elevated", "outlined-mustard"
                ];
                const cardVariant = variants[index % variants.length];

                return (
                  <ChallengeCard
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    iconColor={item.iconColor}
                    delay={index * 0.08}
                    variant={cardVariant}
                    innerRef={(el) => { cardRefs.current[index] = el; }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </PageWrapper>
  );
}
