"use client";

import { motion } from "framer-motion";
import { Brain, Heart, GraduationCap, TrendingUp } from "lucide-react";
import NeuCard from "@/components/ui/NeuCard";
import PageWrapper from "@/components/layout/page-wrapper";

/* ─── Pillars Data ──────────────────────────────────────────────────────── */
const PILLARS = [
  {
    title: "Mindset Reprogramming",
    desc: "Rewire limiting beliefs through proven neuro-cognitive techniques that create lasting inner shifts.",
    icon: Brain,
    iconColor: "#800080", // brand purple
  },
  {
    title: "Emotional Healing",
    desc: "Release the weight of past patterns and meet yourself with compassion, presence, and warmth.",
    icon: Heart,
    iconColor: "#EC4899", // warm rose/pink
  },
  {
    title: "Science-Based Coaching",
    desc: "Frameworks built on positive psychology, behavioural science, and decades of clinical research.",
    icon: GraduationCap,
    iconColor: "#7C3AED", // deep violet
  },
  {
    title: "Personal Growth Strategies",
    desc: "Practical, daily rituals that compound into a fulfilled, intentional and purpose-led life.",
    icon: TrendingUp,
    iconColor: "#FF9F1C", // mustard-gold accent
  },
] as const;

export function PillarsSection() {
  return (
    <PageWrapper className="relative py-20 overflow-visible">
      


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
              The Pillars
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
            <span className="block">The foundations of</span>
            <span className="block">
              <span className="relative inline-block" style={{ color: "#800080" }}>
                lasting
                {/* Mustard marker underline */}
                <span
                  className="absolute bottom-0 left-[-2px] w-[calc(100%+4px)] h-[9px] rounded-[3px] -z-10"
                  style={{ background: "#FFCE1B", opacity: 0.38 }}
                />
              </span>{" "}
              happiness.
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
            Four interconnected practices that shape the way you think, feel and move through the world.
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

        {/* ── RIGHT: 2x2 Grid — alternating default + purple cards ── */}
        <div className="lg:col-span-8 relative">
          {/* Brand arc watermark */}
          <svg className="absolute -bottom-6 right-0 opacity-[0.06] pointer-events-none z-0" width="180" height="180" viewBox="0 0 180 180" fill="none" aria-hidden="true">
            <path d="M 10,160 A 130,130 0 0,1 170,160" stroke="#800080" strokeWidth="20" strokeLinecap="round" fill="none" />
            <path d="M 30,140 A 100,100 0 0,1 150,140" stroke="#FFCE1B" strokeWidth="12" strokeLinecap="round" fill="none" />
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            {PILLARS.map((item, index) => {
              const Icon = item.icon;
              return (
                <NeuCard
                  key={item.title}
                  delay={index * 0.1}
                  variant="default"
                  className="p-6 flex flex-col gap-4 group overflow-hidden"
                >
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 16,
                      background: "#F6F3FA",
                      boxShadow: "inset 3px 3px 7px #DDDAE3, inset -3px -3px 7px #FFFFFF",
                    }}
                  >
                    <div
                      className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 12,
                        background: `${item.iconColor}20`,
                        boxShadow: `inset 2px 2px 5px ${item.iconColor}25, inset -1px -1px 3px rgba(255,255,255,0.6)`,
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
