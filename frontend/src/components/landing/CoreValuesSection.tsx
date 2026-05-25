"use client";

import { motion } from "motion/react";
import { Compass, Heart, TrendingUp, Users } from "lucide-react";
import { SmileArc } from "./decor";

const values = [
  {
    title: "Heart full listening",
    desc: "Creating safe spaces for emotional healing, release, and transformation.",
    icon: Compass,
    tint: "from-[#FFCE1B]/20 to-transparent",
    borderHover: "group-hover:border-[var(--mustard)]/40",
  },
  {
    title: "Emotional Healing",
    desc: "Creating safe spaces for emotional healing, release, and transformation.",
    icon: Heart,
    tint: "from-[#DCC7E8]/35 to-transparent",
    borderHover: "group-hover:border-[var(--purple-brand)]/35",
  },
  {
    title: "Growth Mindset",
    desc: "Empowering people to build resilience, confidence, and lifelong growth habits.",
    icon: TrendingUp,
    tint: "from-[#F5E7B2]/30 to-transparent",
    borderHover: "group-hover:border-[var(--mustard)]/30",
  },
  {
    title: "Confidentiality",
    desc: "We strictly protect your privacy. Every conversation, insight, and progress remains completely confidential, creating a secure space for your journey.",
    icon: Users,
    tint: "from-[#FCFAFF]/60 to-transparent",
    borderHover: "group-hover:border-[var(--purple-brand)]/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function CoreValuesSection() {
  return (
    <section id="core-values" className="relative px-4 py-20 md:py-28 overflow-hidden">
      {/* Premium Immersive Blended Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Warm Yellow Glow */}
        <div
          className="absolute -top-[10%] left-[20%] h-[500px] w-[500px] rounded-full opacity-[0.25] blur-[120px] animate-aurora-slow"
          style={{
            background: "radial-gradient(circle, var(--mustard) 0%, transparent 70%)",
          }}
        />
        {/* Subtle Warm Purple Glow */}
        <div
          className="absolute -bottom-[15%] right-[15%] h-[550px] w-[550px] rounded-full opacity-[0.22] blur-[130px] animate-aurora"
          style={{
            background: "radial-gradient(circle, var(--purple-brand) 0%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          
          {/* Left Column - Sticky Description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--purple-brand)]/20 bg-[var(--purple-brand)]/5 px-4 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[var(--purple-brand)] uppercase">
              Our Core Values
            </div>

            <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.05] text-[var(--nature-black)] md:text-5xl lg:text-[60px]">
              The Foundation Behind<br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-[var(--purple-brand)] ">
                  Every Transformation
                </span>
                <SmileArc className="absolute -bottom-2.5 left-0 h-4 w-full text-[var(--mustard)]" strokeWidth={2.6} />
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--nature-black)]/65 md:text-lg">
              Happiness is not a matter of chance—it is a skill that can be consciously learned through deep emotional awareness, somatic healing, authentic communication, and intentional growth.
            </p>

            {/* Premium decorative citation link */}
            <a
              href="#about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--purple-brand)] transition-transform duration-300 hover:translate-x-1"
            >
              Discover Our Philosophy <span className="text-base">-&gt;</span>
            </a>
          </motion.div>

          {/* Right Column - 2x2 Grid of Core Values Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 sm:grid-cols-2 lg:gap-6"
          >
            {values.map((val, index) => {
              const IconComponent = val.icon;
              return (
                <motion.article
                  key={val.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className={`glass-surface group relative overflow-hidden rounded-[28px] p-6 border border-white/50 hover:bg-white/65 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(128,0,128,0.15)] flex flex-col justify-between min-h-[220px] ${val.borderHover}`}
                >
                  {/* Decorative glowing gradient circle that glows intenser on card hover */}
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${val.tint} opacity-40 blur-xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-90`}
                  />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Icon container */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/85 text-[var(--purple-brand)] shadow-[0_6px_18px_-8px_rgba(128,0,128,0.3)] ring-1 ring-white/60 transition-transform duration-300 group-hover:scale-110">
                        <IconComponent className="h-5 w-5 stroke-[2]" />
                      </div>

                      <h3 className="font-display mt-6 text-2xl font-bold tracking-tight text-[var(--nature-black)] group-hover:text-[var(--purple-brand)] transition-colors duration-300">
                        {val.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-[14.5px] leading-relaxed text-[var(--nature-black)]/60">
                      {val.desc}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
