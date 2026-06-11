"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import NeuCard from "@/components/ui/NeuCard";
import PageWrapper from "@/components/layout/page-wrapper";

/* ─── Programs Data ─────────────────────────────────────────────────────── */
const PROGRAMS = [
  {
    num: "01",
    title: "Happiness Code",
    desc: "15 powerful sessions to unlock the secrets of true happiness.",
    color: "#800080", // brand purple
  },
  {
    num: "02",
    title: "Awaken Mastery Listening Centre",
    desc: "Deep inner work and healing modalities for lasting change.",
    color: "#EC4899", // fuchsia rose
  },
  {
    num: "03",
    title: "Listening Centre (online/ offline)",
    desc: "One-to-one personal clarity sessions with trained experts.",
    color: "#7C3AED", // deep violet
  },
  {
    num: "04",
    title: "Happiness Coaching Certification",
    desc: "India’s first university certification in happiness life Coaching.",
    color: "#FF9F1C", // mustard gold
  },
] as const;

export function ProgramsSection() {
  return (
    <PageWrapper id="programs" className="relative py-20 overflow-visible bg-[#FFF7D6]">



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
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase backdrop-blur-sm"
              style={{
                color: "#800080",
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 12px rgba(255,206,27,0.1)",
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
              Our Programs
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
            <span className="block">Programs Designed to</span>
            <span className="block">
              <span className="relative inline-block" style={{ color: "#800080" }}>
                Empower
                {/* Mustard marker underline */}
                <span
                  className="absolute bottom-0 left-[-2px] w-[calc(100%+4px)] h-[9px] rounded-[3px] -z-10"
                  style={{ background: "#FFCE1B", opacity: 0.38 }}
                />
              </span>{" "}
              Every Journey
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
            Science-backed programs to help you learn, heal, communicate and grow with confidence.
          </motion.p>

          {/* Explore Programs Premium Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full font-semibold text-[14px] transition-all duration-500 cursor-pointer backdrop-blur-sm"
              style={{
                color: "#2A254B",
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 8px 24px rgba(255,206,27,0.15)",
              }}
            >
              <span>Explore Programs</span>
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full text-white transition-transform duration-300 group-hover/btn:rotate-45"
                style={{ background: "linear-gradient(145deg, #800080, #C084FC)" }}
              >
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </span>
            </motion.button>
          </motion.div>

        </div>

        {/* ── RIGHT: 2x2 Grid of Modern Clean Cards (span 8) ── */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            {PROGRAMS.map((item, index) => {
              return (
                <NeuCard
                  key={item.title}
                  delay={index * 0.1}
                  variant="glass"
                  className="p-8 flex flex-col justify-between gap-6 group min-h-[240px]"
                >
                  {/* Top Row: Clean Number Container */}
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 16,
                        background: "rgba(255,255,255,0.8)",
                        border: "1px solid rgba(255,255,255,1)",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
                      }}
                    >
                      {/* Tint Circle with Number */}
                      <div
                        className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110 font-satoshi font-black text-[13.5px] tracking-wider"
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          background: "rgba(128,0,128,0.06)",
                          color: "#800080",
                        }}
                      >
                        {item.num}
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Action Link */}
                  <div className="flex flex-col gap-3">
                    <h3
                      className="font-satoshi font-black text-[20px] leading-tight transition-colors duration-300 group-hover:text-[#800080]"
                      style={{ color: "#2A254B" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-medium text-[14.5px] leading-[1.65] transition-colors duration-300"
                      style={{ color: "rgba(42,37,75,0.65)" }}
                    >
                      {item.desc}
                    </p>

                    {/* Learn More Action Link */}
                    <div
                      className="flex items-center gap-1.5 font-bold text-[12.5px] transition-colors duration-300 mt-2"
                      style={{ color: "rgba(128,0,128,0.78)" }}
                    >
                      <span className="group-hover:text-[#800080]">Learn More</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={2.5}
                      />
                    </div>
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
