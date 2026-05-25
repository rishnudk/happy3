"use client";

import { motion } from "motion/react";
import { MessageSquare, Heart, BookOpen, TrendingUp } from "lucide-react";
import { SmileArc } from "./decor";

const hcaPillars = [
  {
    title: "Talk",
    desc: "Develop deeper communication and listening skills.",
    icon: MessageSquare,
    tint: "from-[#FFCE1B]/35 to-transparent",
  },
  {
    title: "Heal",
    desc: "Release emotional blocks and inner limitations.",
    icon: Heart,
    tint: "from-[#DCC7E8]/45 to-transparent",
  },
  {
    title: "Learn",
    desc: "Build awareness and emotional intelligence.",
    icon: BookOpen,
    tint: "from-[#F5E7B2]/50 to-transparent",
  },
  {
    title: "Grow",
    desc: "Create lasting transformation in life and relationships.",
    icon: TrendingUp,
    tint: "from-[#FCFAFF]/75 to-transparent",
  },
];

export function WhatHcaDoesSection() {
  return (
    <section id="what-hca-does" className="relative px-4 py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center mb-16 md:mb-20"
        >
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--purple-brand)]/80">
            What HCA Does
          </p>
          <h2 className="font-display mt-4 text-balance text-4xl font-bold leading-[1.05] text-[var(--nature-black)] md:text-5xl lg:text-[60px]">
            We help individuals{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[var(--purple-brand)]">reconnect</span>
              <SmileArc className="absolute -bottom-2 left-0 h-4 w-full text-[var(--mustard)]" strokeWidth={2.5} />
            </span>{" "}
            with themselves
          </h2>
          <p className="mt-6 text-[var(--nature-black)]/65 md:text-lg max-w-2xl mx-auto leading-relaxed">
            We help individuals reconnect with themselves through emotional healing, mindset transformation, and practical growth tools.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {hcaPillars.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.08,
                }}
                whileHover={{ y: -8 }}
                className="glass-surface group relative overflow-hidden rounded-[28px] p-8 transition-all duration-300"
              >
                {/* Decorative background glow that intensifies on hover */}
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${item.tint} opacity-60 blur-xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100`}
                />
                
                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-[var(--purple-brand)] shadow-[0_8px_20px_-10px_rgba(128,0,128,0.3)] ring-1 ring-white/50 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="h-6 w-6 stroke-[1.8]" />
                  </div>

                  <h3 className="font-display mt-8 text-2xl font-bold tracking-tight text-[var(--nature-black)]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--nature-black)]/60">
                    {item.desc}
                  </p>

                  {/* Micro-interaction line */}
                  <div className="mt-6 h-0.5 w-8 bg-[var(--purple-brand)]/10 transition-all duration-300 group-hover:w-16 group-hover:bg-[var(--purple-brand)]/30" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
