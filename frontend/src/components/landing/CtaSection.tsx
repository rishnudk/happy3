"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, Phone, Users, ShieldCheck, Sparkles } from "lucide-react";
import { GlowOrb, OrbitalLines, SmileArc } from "./decor";

export function CtaSection() {
  return (
    <section id="cta" className="relative px-4 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-surface relative overflow-hidden rounded-[40px] px-6 py-12 md:p-16 lg:p-20"
        >
          {/* Enhanced Glowing Background Orbs */}
          <GlowOrb className="-left-20 -top-24" color="#FFCE1B" size={450} opacity={0.45} />
          <GlowOrb className="-bottom-24 -right-20" color="#800080" size={500} opacity={0.35} />
          <OrbitalLines className="inset-0 opacity-40 pointer-events-none" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 items-center">
            
            {/* Left Column: Richly styled typography and controls */}
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--purple-brand)]/20 bg-[var(--purple-brand)]/5 px-4 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[var(--purple-brand)] uppercase">
                <Sparkles className="h-3 w-3 text-[var(--purple-brand)] animate-pulse" />
                Your Transformation Starts Here
              </div>

              <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.1] text-[var(--nature-black)] md:text-5xl lg:text-[62px]">
                Ready to<br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 bg-gradient-to-r from-[var(--purple-brand)] via-[#C040A0] to-[var(--mustard)] bg-clip-text text-transparent">
                    transform your life
                  </span>
                  <SmileArc className="absolute -bottom-2.5 left-0 h-4 w-full text-[var(--mustard)]" strokeWidth={2.8} />
                </span><br />
                and help others?
              </h2>

              <p className="mt-8 text-[var(--nature-black)]/65 md:text-lg leading-relaxed max-w-xl">
                Whether you're here to heal, grow, or become a coach, we're here to walk with you every step of the way.
              </p>

              {/* Modern actionable CTA buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--purple-brand)] px-8 py-4 text-sm font-semibold text-white shadow-[0_22px_50px_-14px_rgba(128,0,128,0.55)] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_26px_56px_-12px_rgba(128,0,128,0.6)] w-full sm:w-auto"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--nature-black)]/15 bg-white/40 px-8 py-4 text-sm font-semibold text-[var(--nature-black)] backdrop-blur-md transition-all duration-300 hover:bg-white/70 hover:translate-y-[-2px] w-full sm:w-auto"
                >
                  <Phone className="h-4 w-4 text-[var(--nature-black)]/70" />
                  Book Call
                </a>
              </div>

              {/* Premium trust metrics block */}
              <div className="mt-12 w-full border-t border-[var(--purple-brand)]/10 pt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { text: "Trusted by 20000+ Individuals", icon: Users, color: "text-[var(--purple-brand)]" },
                  { text: "Science-backed Approach", icon: ShieldCheck, color: "text-[var(--mustard)]" },
                  { text: "Supportive Community", icon: Sparkles, color: "text-[#C040A0]" },
                ].map((trust, idx) => {
                  const Icon = trust.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/60 shadow-sm ring-1 ring-black/5">
                        <Icon className={`h-5 w-5 ${trust.color}`} />
                      </div>
                      <span className="text-[13px] font-semibold leading-snug text-[var(--nature-black)]/75">
                        {trust.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Premium framed graphic representation */}
            <div className="relative aspect-[4/4.5] w-full max-w-[420px] mx-auto lg:max-w-none">
              <GlowOrb className="-right-10 -bottom-10" color="#FFCE1B" size={280} opacity={0.4} />
              <GlowOrb className="-left-10 -top-10" color="#800080" size={300} opacity={0.3} />
              <OrbitalLines className="absolute inset-0 opacity-40 pointer-events-none" />

              <div className="glass-surface relative h-full w-full overflow-hidden rounded-[32px] p-2 bg-white/30 backdrop-blur-md shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[26px]">
                  <Image
                    src="/home/contact.png"
                    alt="Start your transformation journey with HCA"
                    width={800}
                    height={900}
                    priority
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--purple-brand)]/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Float-animated Badge Indicator */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="glass-pill absolute -left-4 bottom-10 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-lg border border-white/60 bg-white/70 backdrop-blur-md"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--purple-brand)]/10 text-[var(--purple-brand)]">
                    <Sparkles className="h-4.5 w-4.5 text-[var(--purple-brand)] animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[var(--nature-black)]">Science-Backed Method</p>
                    <p className="text-[9px] text-[var(--nature-black)]/60">Guaranteed Growth & Clarity</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
