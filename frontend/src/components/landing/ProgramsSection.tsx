"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    num: "01",
    title: "Happiness Code",
    desc: "Workshops for corporates, schools & communities.",
    tint: "from-[#FFCE1B]/20 via-transparent to-transparent",
    borderHover: "group-hover:border-[var(--mustard)]/40",
  },
  {
    num: "02",
    title: "Awaken Mastery Listening Centre",
    desc: "Deep inner work and healing modalities for lasting change.",
    tint: "from-[#DCC7E8]/30 via-transparent to-transparent",
    borderHover: "group-hover:border-[var(--purple-brand)]/35",
  },
  {
    num: "03",
    title: "Listening Centre",
    desc: "One-to-one personal clarity sessions with trained experts.",
    tint: "from-[#F5E7B2]/30 via-transparent to-transparent",
    borderHover: "group-hover:border-[var(--mustard)]/35",
  },
  {
    num: "04",
    title: "Happiness Coaching Certification",
    desc: "Become a certified happiness coach and transform lives.",
    tint: "from-[#FCFAFF]/40 via-transparent to-transparent",
    borderHover: "group-hover:border-[var(--purple-brand)]/20",
  },
];

export function ProgramsSection() {
  return (
    <section id="programs" className="relative px-4 py-20 md:py-28 bg-[var(--cream-deep)]/40">
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
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--purple-brand)]/80">
            Our Programs
          </p>
          <h2 className="font-display mt-4 text-balance text-4xl font-bold leading-[1.05] text-[var(--nature-black)] md:text-5xl lg:text-[60px]">
            Programs Designed to<br />
            <span className="text-[var(--purple-brand)]">Empower Every Journey</span>
          </h2>
          <p className="mt-6 text-[var(--nature-black)]/65 md:text-lg max-w-xl mx-auto leading-relaxed">
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
              className={`glass-surface group relative flex flex-col justify-between overflow-hidden rounded-[32px] p-8 transition-all duration-300 border border-white/50 hover:bg-white/60 hover:shadow-[0_20px_50px_-20px_rgba(128,0,128,0.15)] ${prog.borderHover}`}
            >
              {/* Card gradient background on hover */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${prog.tint} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Premium floating large index number */}
                  <div className="font-display text-5xl font-black tracking-tight text-[var(--purple-brand)]/15 transition-colors duration-300 group-hover:text-[var(--purple-brand)]/30">
                    {prog.num}
                  </div>

                  <h3 className="font-display mt-8 text-2xl font-bold leading-tight tracking-tight text-[var(--nature-black)] group-hover:text-[var(--purple-brand)] transition-colors duration-300">
                    {prog.title}
                  </h3>
                </div>

                <div className="mt-8">
                  <p className="text-[14.5px] leading-relaxed text-[var(--nature-black)]/60">
                    {prog.desc}
                  </p>

                  <div className="mt-6 flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-[var(--purple-brand)] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Learn More <ArrowRight className="h-4 w-4" />
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
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--purple-brand)] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(128,0,128,0.55)] transition-all hover:translate-y-[-1.5px] hover:shadow-[0_24px_48px_-12px_rgba(128,0,128,0.65)]"
          >
            Explore Programs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
