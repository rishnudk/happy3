"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, BookOpen, TrendingUp } from "lucide-react";
import { SmileArc } from "./decor";

const pillars = [
  {
    title: "Mindset Reprogramming",
    desc: "Rewire limiting beliefs through proven neuro-cognitive techniques that create lasting inner shifts.",
    icon: BrainCircuit,
    tint: "from-[#FFCE1B]/20 to-transparent",
  },
  {
    title: "Emotional Healing",
    desc: "Release the weight of past patterns and meet yourself with compassion, presence, and warmth.",
    icon: Sparkles,
    tint: "from-[#DCC7E8]/25 to-transparent",
  },
  {
    title: "Science-Based Coaching",
    desc: "Frameworks built on positive psychology, behavioural science, and decades of clinical research.",
    icon: BookOpen,
    tint: "from-[#F5E7B2]/30 to-transparent",
  },
  {
    title: "Personal Growth Strategies",
    desc: "Practical, daily rituals that compound into a fulfilled, intentional and purpose-led life.",
    icon: TrendingUp,
    tint: "from-[#FCFAFF]/40 to-transparent",
  },
];

export function PillarsSection() {
  return (
    <section id="features" className="relative px-4 py-24 md:py-32 bg-[#FAF9FC]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
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
              The Foundations
            </span>
          </div>

          <h2 className="font-display text-balance text-4xl font-extrabold leading-[1.1] text-slate-deep md:text-5xl lg:text-[56px]">
            The foundations of{" "}
            <span className="text-secondary font-black">lasting happiness</span>.
          </h2>
          <p className="mt-6 text-muted-foreground/90 md:text-lg font-semibold max-w-xl mx-auto leading-relaxed">
            Four interconnected practices that shape the way you think, feel and
            move through the world.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6 }}
                className={`neumorphic-raised group relative overflow-hidden rounded-[28px] p-8 transition-all duration-300 ${
                  index % 2 === 1 ? "lg:translate-y-6" : ""
                }`}
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${pillar.tint} opacity-80 blur-2xl transition-opacity duration-700 group-hover:opacity-100`}
                />
                <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
                  <div>
                    {/* Neumorphic Icon Container */}
                    <div className="neumorphic-icon-container flex h-14 w-14 items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="h-6 w-6 stroke-[1.8]" />
                    </div>
                    
                    <h3 className="font-display mt-8 text-2xl font-bold tracking-tight text-slate-deep">
                      {pillar.title}
                    </h3>
                    
                    <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground/80 font-medium">
                      {pillar.desc}
                    </p>
                  </div>

                  <SmileArc className="mt-6 h-4 w-16 text-[var(--mustard)]/80" strokeWidth={2.2} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
