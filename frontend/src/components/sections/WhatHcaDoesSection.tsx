"use client";

import { motion } from "framer-motion";
import { MessageSquare, Heart, BookOpen } from "lucide-react";
import NeuCard from "@/components/ui/NeuCard";
import PageWrapper from "@/components/layout/page-wrapper";

/* ─── HCA Practices Data ────────────────────────────────────────────────── */
const PRACTICES = [
  {
    title: "Listening",
    desc: "A safe, confidential, and non-judgmental space to express yourself freely with heartful listening.",
    icon: MessageSquare,
    iconColor: "#FF9F1C", // mustard gold for warmth/listening
  },
  {
    title: "Healing",
    desc: "Release emotional burdens, heal inner wounds, overcome limiting patterns, and reconnect with your inner peace and strength.",
    icon: Heart,
    iconColor: "#EC4899", // soft rose for deep emotional healing
  },
  {
    title: "Empowering",
    desc: "Goal achievement, emotional upliftment, and conscious growth that creates a chain reaction of spreading happiness.",
    icon: BookOpen,
    iconColor: "#800080", // royal brand purple for empowerment
  },
] as const;

export function WhatHcaDoesSection() {
  return (
    <PageWrapper id="what-hca-does" className="relative py-20 overflow-visible">



      {/* ── 2-Column layout: text left | cards right ── */}
      <div className="grid items-center gap-16 lg:grid-cols-12 relative z-10">

        {/* ── LEFT: Heading & Description Block (span 4) ── */}
        <div className="lg:col-span-4 flex flex-col gap-7">

          {/* Neumorphic Pill Badge */}
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
              {/* Pulsing Dot */}
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: "rgba(128,0,128,0.5)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: "#800080" }}
                />
              </span>
              What HCA Does
            </span>
          </motion.div>

          {/* Heading with Underline Marker */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-satoshi font-black leading-[1.15] tracking-tight neumorphic-text-embossed"
            style={{ fontSize: "clamp(28px, 3.4vw, 48px)", color: "#2A254B" }}
          >
            <span className="block">We help individuals</span>
            <span className="block">
              <span className="relative inline-block" style={{ color: "#800080" }}>
                reconnect
                {/* Mustard marker underline */}
                <span
                  className="absolute bottom-0 left-[-2px] w-[calc(100%+4px)] h-[9px] rounded-[3px] -z-10"
                  style={{ background: "#FFCE1B", opacity: 0.38 }}
                />
              </span>{" "}
              with themselves
            </span>
          </motion.h2>

          {/* Subtext Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-[15px] sm:text-[16px] leading-[1.9] font-medium max-w-[360px]"
            style={{ color: "rgba(42,37,75,0.60)" }}
          >
            We help individuals reconnect with themselves through emotional healing, mindset transformation, and practical growth tools.
          </motion.p>

          {/* Animated Neumorphic Accent Line */}
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

        {/* ── RIGHT: 3 cards — glass, mustard, glass ── */}
        <div className="lg:col-span-8 relative">
          {/* Smile arc accent */}
          <svg className="absolute -top-8 right-4 opacity-[0.08] pointer-events-none z-0" width="140" height="80" viewBox="0 0 140 80" fill="none" aria-hidden="true">
            <path d="M 5,70 A 100,100 0 0,1 135,70" stroke="#FFCE1B" strokeWidth="14" strokeLinecap="round" fill="none" />
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            {PRACTICES.map((item, index) => {
              const Icon = item.icon;
              const isMustard = index === 1;
              const variant = isMustard ? "mustard" : "glass";
              return (
                <NeuCard
                  key={item.title}
                  delay={index * 0.1}
                  variant={variant}
                  className="p-6 flex flex-col gap-4 group overflow-hidden"
                >
                  {/* Decorative arc inside mustard card */}
                  {isMustard && (
                    <svg className="absolute -bottom-3 -right-3 opacity-20 pointer-events-none" width="70" height="70" viewBox="0 0 70 70" fill="none" aria-hidden="true">
                      <path d="M 5,60 A 45,45 0 0,1 65,60" stroke="#800080" strokeWidth="8" strokeLinecap="round" fill="none" />
                    </svg>
                  )}

                  {/* Icon */}
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 16,
                      background: isMustard ? "rgba(128,0,128,0.08)" : "rgba(246,243,250,0.7)",
                      boxShadow: isMustard ? "inset 2px 2px 6px rgba(128,0,128,0.1)" : "inset 3px 3px 7px rgba(221,218,227,0.6), inset -3px -3px 7px rgba(255,255,255,0.9)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 12,
                        background: `${item.iconColor}18`,
                        boxShadow: `inset 2px 2px 5px ${item.iconColor}20, inset -1px -1px 3px rgba(255,255,255,0.5)`,
                      }}
                    >
                      <Icon style={{ color: item.iconColor, width: 18, height: 18, strokeWidth: 2.2 }} />
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <h3
                      className="font-satoshi font-black text-[18px] leading-tight transition-colors duration-300 group-hover:text-[#800080]"
                      style={{ color: "#2A254B" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-medium text-[13.5px] leading-[1.6] mt-2"
                      style={{ color: "rgba(42,37,75,0.65)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </NeuCard>
              );
            })}
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
