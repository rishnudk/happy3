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
  const Icon0 = CHALLENGES[0].icon;
  const Icon1 = CHALLENGES[1].icon;
  const Icon2 = CHALLENGES[2].icon;
  const Icon3 = CHALLENGES[3].icon;
  const Icon4 = CHALLENGES[4].icon;
  const Icon5 = CHALLENGES[5].icon;

  return (
    <PageWrapper 
      id="features" 
      className="relative py-8 lg:py-10 px-6 lg:px-12 overflow-visible rounded-[2.5rem] bg-[#F4EFFC] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >



      {/* ── 2-Column layout: text left | cards right ── */}
      <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-12 relative z-10 max-w-[1400px] mx-auto">

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
                boxShadow: "6px 6px 16px rgba(165,140,217,0.12)",
              }}
            >
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full opacity-60"
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
            style={{ fontSize: "clamp(24px, 3vw, 42px)", color: "#2A254B" }}
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
            style={{ color: "rgba(42,37,75,0.80)" }}
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

        {/* ── RIGHT: Bento Grid in One Big Card (span 8) ── */}
        <div className="lg:col-span-8 w-full relative">
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-2.5 sm:p-3 md:p-4 w-full relative z-10" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.03)" }}>
            <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-3 gap-2.5 sm:gap-3 h-full">
              
              {/* Card 1: Tall (Col 1, Row 1-2) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 0.98 }}
                className="col-span-1 md:row-span-2 rounded-[1rem] sm:rounded-[1.25rem] p-3 sm:p-4 md:p-5 flex flex-row md:flex-col justify-between items-center md:items-stretch bg-[#EFE9FA] transition-transform duration-300 min-h-[70px] md:min-h-0 cursor-pointer gap-2 md:gap-0"
              >
                <div className="flex-1">
                  <h3 className="font-satoshi font-black text-[13px] sm:text-[16px] md:text-[18px] leading-[1.15] text-[#1E1B4B] tracking-tight">
                    {CHALLENGES[0].title}
                  </h3>
                </div>
                
                <div className="shrink-0 flex items-center justify-center md:flex-1 py-0 md:py-4">
                   <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                     <Icon0 className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" color={CHALLENGES[0].iconColor} strokeWidth={2.5} />
                   </div>
                </div>
              </motion.div>

              {/* Card 2: Wide (Col 2-3, Row 1) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 0.98 }}
                className="col-span-1 md:col-span-2 md:row-span-1 rounded-[1rem] sm:rounded-[1.25rem] p-3 sm:p-4 md:p-5 flex flex-row justify-between items-center bg-[#FCECF3] transition-transform duration-300 gap-2 sm:gap-4 min-h-[70px] sm:min-h-[100px] cursor-pointer"
              >
                <div className="flex flex-col justify-center flex-1">
                  <h3 className="font-satoshi font-black text-[13px] sm:text-[16px] md:text-[18px] leading-[1.15] text-[#1E1B4B] tracking-tight">
                    {CHALLENGES[1].title}
                  </h3>
                </div>
                <div className="flex items-center justify-center shrink-0 w-auto mt-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                    <Icon1 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" color={CHALLENGES[1].iconColor} strokeWidth={2.5} />
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
                className="col-span-1 md:row-span-1 rounded-[1rem] sm:rounded-[1.25rem] p-3 sm:p-4 md:p-5 flex flex-row md:flex-col justify-between items-center md:items-stretch bg-[#FEF5D7] transition-transform duration-300 min-h-[70px] sm:min-h-[110px] cursor-pointer gap-2 md:gap-0"
              >
                <div className="flex-1">
                  <h3 className="font-satoshi font-black text-[13px] sm:text-[15px] md:text-[16px] leading-[1.15] text-[#1E1B4B] tracking-tight">
                    {CHALLENGES[2].title}
                  </h3>
                </div>
                <div className="shrink-0 flex items-center md:items-end md:justify-end mt-0 md:mt-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                    <Icon2 className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" color={CHALLENGES[2].iconColor} strokeWidth={2.5} />
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
                className="col-span-1 md:row-span-1 rounded-[1rem] sm:rounded-[1.25rem] p-3 sm:p-4 md:p-5 flex flex-row-reverse md:flex-col justify-between items-center md:items-stretch bg-[#EAF6ED] transition-transform duration-300 min-h-[70px] sm:min-h-[110px] cursor-pointer gap-2 md:gap-0"
              >
                <div className="shrink-0 flex items-center md:items-start md:justify-start mb-0 md:mb-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                    <Icon3 className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" color={CHALLENGES[3].iconColor} strokeWidth={2.5} />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-satoshi font-black text-[13px] sm:text-[15px] md:text-[16px] leading-[1.15] text-[#1E1B4B] tracking-tight">
                    {CHALLENGES[3].title}
                  </h3>
                </div>
              </motion.div>

              {/* Card 5: Wide Bottom Left (Col 1-2, Row 3) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 0.98 }}
                className="col-span-1 md:col-span-2 md:row-span-1 rounded-[1rem] sm:rounded-[1.25rem] p-3 sm:p-4 md:p-5 flex flex-row justify-between items-center bg-[#FFF1E6] transition-transform duration-300 gap-2 sm:gap-4 min-h-[70px] sm:min-h-[100px] cursor-pointer"
              >
                <div className="flex flex-col justify-center flex-1">
                  <h3 className="font-satoshi font-black text-[13px] sm:text-[16px] md:text-[18px] leading-[1.15] text-[#1E1B4B] tracking-tight">
                    {CHALLENGES[4].title}
                  </h3>
                </div>
                <div className="flex items-center justify-center shrink-0 w-auto mt-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                    <Icon4 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" color={CHALLENGES[4].iconColor} strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>

              {/* Card 6: Square Bottom Right (Col 3, Row 3) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 0.98 }}
                className="col-span-1 md:row-span-1 rounded-[1rem] sm:rounded-[1.25rem] p-3 sm:p-4 md:p-5 flex flex-row md:flex-col justify-between items-center md:items-stretch bg-[#E8F0FE] transition-transform duration-300 min-h-[70px] sm:min-h-[110px] cursor-pointer gap-2 md:gap-0"
              >
                <div className="flex-1">
                  <h3 className="font-satoshi font-black text-[13px] sm:text-[15px] md:text-[16px] leading-[1.15] text-[#1E1B4B] tracking-tight">
                    {CHALLENGES[5].title}
                  </h3>
                </div>
                <div className="shrink-0 flex items-center md:items-end md:justify-end mt-0 md:mt-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                    <Icon5 className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" color={CHALLENGES[5].iconColor} strokeWidth={2.5} />
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
