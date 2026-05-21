"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Flower, Brain, ShieldCheck } from "lucide-react";
import { SmileArc } from "./decor";

const values = [
  {
    title: "Heart full listening",
    desc: "Creating safe spaces for emotional healing, release, and transformation.",
    icon: HeartHandshake,
    tint: "from-[#FFCE1B]/20 to-transparent",
  },
  {
    title: "Emotional Healing",
    desc: "Creating safe spaces for emotional healing, release, and transformation.",
    icon: Flower,
    tint: "from-[#DCC7E8]/25 to-transparent",
  },
  {
    title: "Growth Mindset",
    desc: "Empowering people to build resilience, confidence, and lifelong growth habits.",
    icon: Brain,
    tint: "from-[#F5E7B2]/30 to-transparent",
  },
  {
    title: "Confidentiality",
    desc: "We strictly protect your privacy. Every conversation, insight, and progress remains completely confidential, creating a secure space for your journey.",
    icon: ShieldCheck,
    tint: "from-[#FCFAFF]/40 to-transparent",
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
    <section id="core-values" className="relative px-4 py-20 md:py-28 overflow-hidden bg-[#FAF9FC]">
      {/* Premium Immersive Blended Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Warm Yellow Glow */}
        <div
          className="absolute -top-[10%] left-[20%] h-[500px] w-[500px] rounded-full opacity-[0.2] blur-[120px]"
          style={{
            background: "radial-gradient(circle, var(--mustard) 0%, transparent 70%)",
          }}
        />
        {/* Subtle Warm Purple Glow */}
        <div
          className="absolute -bottom-[15%] right-[15%] h-[550px] w-[550px] rounded-full opacity-[0.18] blur-[130px]"
          style={{
            background: "radial-gradient(circle, var(--primary) 0%, transparent 75%)",
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
            {/* Badge */}
            <div className="inline-flex mb-4">
              <span
                className="
                  glass-card
                  inline-flex
                  items-center
                  rounded-full
                  px-5
                  py-2
                  text-xs
                  font-bold
                  text-primary/90
                  border-white/80
                  shadow-sm
                "
              >
                Our Core Values
              </span>
            </div>

            <h2 className="font-display mt-2 text-balance text-4xl font-extrabold leading-[1.1] text-slate-deep md:text-5xl lg:text-[56px]">
              The Foundation Behind<br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-secondary font-black">
                  Every Transformation
                </span>
                <SmileArc className="absolute -bottom-2.5 left-0 h-4.5 w-full text-[var(--mustard)]" strokeWidth={2.6} />
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-muted-foreground/90 font-semibold">
              Happiness is not a matter of chance—it is a skill that can be consciously learned through deep emotional awareness, somatic healing, authentic communication, and intentional growth.
            </p>

            {/* Premium diagonal arrow button matches image design */}
            <a
              href="#about"
              className="mt-8 group inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-[14px] font-bold text-white shadow-[0_15px_35px_-8px_rgba(109,40,217,0.45)] hover:shadow-[0_20px_40px_-6px_rgba(109,40,217,0.55)] transition-all duration-300 hover:translate-y-[-1.5px]"
            >
              Discover Our Philosophy
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-primary text-[10px] font-extrabold transition-transform group-hover:translate-x-0.5 group-hover:translate-y-[-0.5px]">
                ↗
              </span>
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
            {values.map((val) => {
              const IconComponent = val.icon;
              return (
                <motion.article
                  key={val.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="neumorphic-raised group relative overflow-hidden rounded-[28px] p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300"
                >
                  {/* Decorative glowing gradient circle that glows intenser on card hover */}
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${val.tint} opacity-40 blur-xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-90`}
                  />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Neumorphic Icon Container */}
                      <div className="neumorphic-icon-container flex h-14 w-14 items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
                        <IconComponent className="h-6 w-6 stroke-[1.8]" />
                      </div>

                      <h3 className="font-display mt-8 text-2xl font-bold tracking-tight text-slate-deep">
                        {val.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground/80 font-medium">
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
