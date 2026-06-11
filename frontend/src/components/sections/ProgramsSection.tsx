"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
    title: "Awaken Mastery",
    desc: "Deep inner work and healing modalities for lasting change.",
    color: "#EC4899", // fuchsia rose
  },
  {
    num: "03",
    title: "Listening Centre",
    desc: "One-to-one personal clarity sessions with trained experts.",
    color: "#7C3AED", // deep violet
  },
  {
    num: "04",
    title: "Coaching Certification",
    desc: "India’s first university certification in happiness life Coaching.",
    color: "#FF9F1C", // mustard gold
  },
] as const;

export function ProgramsSection() {
  return (
    <PageWrapper id="programs" className="relative py-20 overflow-visible bg-[#F4EFFC]">



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

        {/* ── RIGHT: Bento Grid in One Big Card (span 8) ── */}
        <div className="lg:col-span-8 w-full relative">
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-2.5 sm:p-3 md:p-4 w-full relative z-10" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.03)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2.5 sm:gap-3 h-full">
              
              {/* Card 1: Tall (Col 1, Row 1-2) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 0.98 }}
                className="md:col-span-1 md:row-span-2 rounded-[1rem] sm:rounded-[1.25rem] p-3.5 sm:p-4 md:p-5 flex flex-col justify-between bg-[#EFE9FA] transition-transform duration-300 min-h-[140px] sm:min-h-[160px] md:min-h-0 cursor-pointer"
              >
                <div>
                  <h3 className="font-satoshi font-black text-[15px] sm:text-[16px] md:text-[18px] leading-[1.15] text-[#1E1B4B] mb-1 sm:mb-2 tracking-tight">
                    {PROGRAMS[0].title}
                  </h3>
                </div>
                
                <div className="flex-1 flex items-center justify-center py-3 sm:py-4">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/70 flex items-center justify-center text-[#800080] font-black text-sm sm:text-base md:text-lg shadow-sm backdrop-blur-sm">
                     {PROGRAMS[0].num}
                   </div>
                </div>

                <div>
                  <p className="font-medium text-[12px] sm:text-[13px] leading-relaxed text-[#1E1B4B]/80 line-clamp-3">
                    {PROGRAMS[0].desc}
                  </p>
                </div>
              </motion.div>

              {/* Card 2: Wide (Col 2-3, Row 1) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 0.98 }}
                className="md:col-span-2 md:row-span-1 rounded-[1rem] sm:rounded-[1.25rem] p-3.5 sm:p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#FCECF3] transition-transform duration-300 gap-3 sm:gap-4 min-h-[90px] sm:min-h-[100px] cursor-pointer"
              >
                <div className="flex flex-col justify-center max-w-[320px]">
                  <h3 className="font-satoshi font-black text-[15px] sm:text-[16px] md:text-[18px] leading-[1.1] text-[#1E1B4B] mb-1 sm:mb-2 tracking-tight">
                    {PROGRAMS[1].title}
                  </h3>
                  <p className="font-medium text-[12px] sm:text-[13px] leading-relaxed text-[#1E1B4B]/80 line-clamp-2">
                    {PROGRAMS[1].desc}
                  </p>
                </div>
                <div className="flex items-center justify-center shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/70 flex items-center justify-center text-[#EC4899] font-black text-sm sm:text-base md:text-lg shadow-sm backdrop-blur-sm">
                    {PROGRAMS[1].num}
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Square (Col 2, Row 2) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 0.98 }}
                className="md:col-span-1 md:row-span-1 rounded-[1rem] sm:rounded-[1.25rem] p-3.5 sm:p-4 md:p-5 flex flex-col justify-between bg-[#FEF5D7] transition-transform duration-300 min-h-[110px] sm:min-h-[120px] cursor-pointer"
              >
                <div>
                  <h3 className="font-satoshi font-black text-[14px] sm:text-[15px] md:text-[16px] leading-[1.1] text-[#1E1B4B] mb-1 sm:mb-2 tracking-tight">
                    {PROGRAMS[2].title}
                  </h3>
                  <p className="font-medium text-[11px] sm:text-[12px] leading-relaxed text-[#1E1B4B]/80 line-clamp-3">
                    {PROGRAMS[2].desc}
                  </p>
                </div>
                <div className="flex items-end justify-end mt-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/70 flex items-center justify-center text-[#D97706] font-black text-xs sm:text-sm md:text-base shadow-sm backdrop-blur-sm">
                    {PROGRAMS[2].num}
                  </div>
                </div>
              </motion.div>

              {/* Card 4: Square (Col 3, Row 2) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 0.98 }}
                className="md:col-span-1 md:row-span-1 rounded-[1rem] sm:rounded-[1.25rem] p-3.5 sm:p-4 md:p-5 flex flex-col justify-between bg-[#EAF6ED] transition-transform duration-300 min-h-[110px] sm:min-h-[120px] cursor-pointer"
              >
                <div className="flex items-start justify-start mb-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/70 flex items-center justify-center text-[#059669] font-black text-xs sm:text-sm md:text-base shadow-sm backdrop-blur-sm">
                    {PROGRAMS[3].num}
                  </div>
                </div>
                <div>
                  <h3 className="font-satoshi font-black text-[14px] sm:text-[15px] md:text-[16px] leading-[1.1] text-[#1E1B4B] mb-1 sm:mb-2 tracking-tight">
                    {PROGRAMS[3].title}
                  </h3>
                  <p className="font-medium text-[11px] sm:text-[12px] leading-relaxed text-[#1E1B4B]/80 line-clamp-3">
                    {PROGRAMS[3].desc}
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
