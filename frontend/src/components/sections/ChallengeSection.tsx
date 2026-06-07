"use client";

import { motion } from "framer-motion";
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

/* ─── Named export consumed by page.tsx ─────────────────────────────────── */
export function ChallengeSection() {
  return (
    <PageWrapper id="features" className="relative py-12 lg:py-16 overflow-visible">



      {/* ── 2-Column layout: text left | cards right ── */}
      <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-12 relative z-10 max-w-[1400px] mx-auto">

        {/* ── LEFT: heading block ── */}
        <div className="lg:col-span-4 flex flex-col gap-5 items-start text-left">

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
            className="text-[14px] sm:text-[15px] leading-[1.8] font-medium max-w-[320px]"
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
            className="relative w-16 h-[4px] rounded-full overflow-hidden"
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

        {/* ── RIGHT: Cards + SVG connector overlay ── */}
        <div className="lg:col-span-8 w-full">
          <div className="relative">

            {/* Card grid: 3x2 desktop & tablet, 2x3 mobile */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 relative z-10 w-full">
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
