"use client";

import { motion } from "framer-motion";
import { MessageSquare, Heart, BookOpen } from "lucide-react";
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
  const Icon0 = PRACTICES[0].icon;
  const Icon1 = PRACTICES[1].icon;
  const Icon2 = PRACTICES[2].icon;

  return (
    <PageWrapper 
      id="what-hca-does" 
      className="relative py-8 lg:py-10 px-6 lg:px-12 overflow-visible rounded-[2.5rem] bg-[#F4EFFC] border border-white/80 shadow-[0_-10px_40px_rgb(255,159,28,0.03),_0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl"
    >



      {/* ── 2-Column layout: text left | cards right ── */}
      <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-12 relative z-10 max-w-[1400px] mx-auto">

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
              {/* Static Dot */}
              <span className="relative flex h-2 w-2 flex-shrink-0 rounded-full bg-[#800080]" />
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
            style={{ fontSize: "clamp(24px, 3vw, 42px)", color: "#2A254B" }}
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


        </div>

        {/* ── RIGHT: Bento Grid in One Big Card (span 8) ── */}
        <div className="lg:col-span-8 w-full relative">
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-2.5 sm:p-3 md:p-4 w-full relative z-10" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.03)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2.5 sm:gap-3 h-full">
              
              {/* Card 1: Wide (Col 1-2, Row 1) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 0.98 }}
                className="md:col-span-2 md:row-span-1 rounded-[1rem] sm:rounded-[1.25rem] p-3.5 sm:p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#FEF5D7] transition-transform duration-300 gap-3 sm:gap-4 min-h-[90px] sm:min-h-[100px] cursor-pointer"
              >
                <div className="flex flex-col justify-center max-w-[280px]">
                  <h3 className="font-satoshi font-black text-[15px] sm:text-[16px] md:text-[18px] leading-[1.15] text-[#1E1B4B] tracking-tight mb-1 sm:mb-2">
                    {PRACTICES[0].title}
                  </h3>
                  <p className="font-medium text-[12px] sm:text-[13px] leading-relaxed text-[#1E1B4B]/80 line-clamp-2">
                    {PRACTICES[0].desc}
                  </p>
                </div>
                <div className="flex items-center justify-center shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/70 flex items-center justify-center shadow-sm backdrop-blur-sm">
                    <Icon0 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" color={PRACTICES[0].iconColor} strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Tall (Col 3, Row 1-2) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 0.98 }}
                className="md:col-span-1 md:row-span-2 rounded-[1rem] sm:rounded-[1.25rem] p-3.5 sm:p-4 md:p-5 flex flex-col justify-between bg-[#FCECF3] transition-transform duration-300 min-h-[140px] sm:min-h-[160px] md:min-h-0 cursor-pointer"
              >
                <div>
                  <h3 className="font-satoshi font-black text-[15px] sm:text-[16px] md:text-[18px] leading-[1.15] text-[#1E1B4B] tracking-tight mb-1 sm:mb-2">
                    {PRACTICES[1].title}
                  </h3>
                </div>
                
                <div className="flex-1 flex items-center justify-center py-3 sm:py-4">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/70 flex items-center justify-center shadow-sm backdrop-blur-sm">
                     <Icon1 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" color={PRACTICES[1].iconColor} strokeWidth={2.5} />
                   </div>
                </div>

                <div>
                  <p className="font-medium text-[12px] sm:text-[13px] leading-relaxed text-[#1E1B4B]/80 line-clamp-3">
                    {PRACTICES[1].desc}
                  </p>
                </div>
              </motion.div>

              {/* Card 3: Wide (Col 1-2, Row 2) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 0.98 }}
                className="md:col-span-2 md:row-span-1 rounded-[1rem] sm:rounded-[1.25rem] p-3.5 sm:p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#EFE9FA] transition-transform duration-300 gap-3 sm:gap-4 min-h-[90px] sm:min-h-[100px] cursor-pointer"
              >
                <div className="flex flex-col justify-center max-w-[280px]">
                  <h3 className="font-satoshi font-black text-[15px] sm:text-[16px] md:text-[18px] leading-[1.15] text-[#1E1B4B] tracking-tight mb-1 sm:mb-2">
                    {PRACTICES[2].title}
                  </h3>
                  <p className="font-medium text-[12px] sm:text-[13px] leading-relaxed text-[#1E1B4B]/80 line-clamp-2">
                    {PRACTICES[2].desc}
                  </p>
                </div>
                <div className="flex items-center justify-center shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/70 flex items-center justify-center shadow-sm backdrop-blur-sm">
                    <Icon2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" color={PRACTICES[2].iconColor} strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
