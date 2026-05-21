"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    num: "01",
    title: "Happiness Code",
    desc: "15 powerful sessions to unlock the secrets of true happiness..",
    tint: "from-[#FFCE1B]/20 via-transparent to-transparent",
    borderHover: "group-hover:border-[var(--mustard)]/40",
  },
  {
    num: "02",
    title: "Awaken Mastery Listening Centre ",
    desc: "Deep inner work and healing modalities for lasting change.",
    tint: "from-[#DCC7E8]/30 via-transparent to-transparent",
    borderHover: "group-hover:border-[var(--purple-brand)]/35",
  },
  {
    num: "03",
    title: "Listening Centre (ofline/ online)",
    desc: "One-to-one personal clarity sessions with trained experts.",
    tint: "from-[#F5E7B2]/30 via-transparent to-transparent",
    borderHover: "group-hover:border-[var(--mustard)]/35",
  },
  {
    num: "04",
    title: "Happiness Coaching Certification",
    desc: "India’s first university certification in happiness life Coaching.",
    tint: "from-[#FCFAFF]/40 via-transparent to-transparent",
    borderHover: "group-hover:border-[var(--purple-brand)]/20",
  },
];

export function ProgramsSection() {
  return (
    <section id="programs" className="relative px-4 py-20 md:py-28 bg-[#FAF9FC]">
      {/* Dynamic background element */}
      <div className="absolute inset-0 noise-overlay opacity-[0.015] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center mb-16 md:mb-20"
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
              Our Programs
            </span>
          </div>

          <h2 className="font-display text-balance text-4xl font-extrabold leading-[1.1] text-slate-deep md:text-5xl lg:text-[56px]">
            Programs Designed to<br />
            <span className="text-secondary font-black">Empower Every Journey</span>
          </h2>
          <p className="mt-6 text-muted-foreground/90 md:text-lg max-w-xl mx-auto leading-relaxed font-semibold">
            Science-backed programs to help you learn, heal, communicate and grow with confidence.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((prog, index) => (
            <motion.article
              key={prog.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.08,
              }}
              whileHover={{ y: -8 }}
              className="neumorphic-raised group relative flex flex-col justify-between overflow-hidden rounded-[32px] p-8 transition-all duration-300 min-h-[280px]"
            >
              {/* Card gradient background on hover */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${prog.tint} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Premium floating large index number */}
                  <div className="font-display text-5xl font-black tracking-tight text-primary/15 transition-colors duration-300 group-hover:text-primary/30">
                    {prog.num}
                  </div>

                  <h3 className="font-display mt-8 text-2xl font-bold leading-tight tracking-tight text-slate-deep group-hover:text-primary transition-colors duration-300">
                    {prog.title}
                  </h3>
                </div>

                <div className="mt-8">
                  <p className="text-[14.5px] leading-relaxed text-muted-foreground/80 font-medium">
                    {prog.desc}
                  </p>

                  <div className="mt-6 flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Learn More <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Explore Programs CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <a
            href="#programs"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(109,40,217,0.55)] transition-all hover:translate-y-[-1.5px] hover:shadow-[0_24px_48px_-12px_rgba(109,40,217,0.65)]"
          >
            Explore Programs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
