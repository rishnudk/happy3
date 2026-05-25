import { motion, type Variants } from "motion/react";
import Image from "next/image";
import { GlowOrb, OrbitalLines, SmileArc } from "./decor";

const EASE = [0.22, 1, 0.36, 1] as const;
const coachPortrait = "/coach-portrait.png";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: 0.1 + i * 0.08 },
  }),
};

export function HeroSection() {
  return (
    <section className="relative px-4 pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--purple-brand)]/15 bg-white/50 px-4 py-1.5 text-[12px] font-medium tracking-wide text-[var(--purple-brand)] backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--mustard)] shadow-[0_0_12px_rgba(255,206,27,0.9)]" />
            Your Journey Starts Here
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display mt-6 text-balance text-5xl font-bold leading-[1.02] text-[var(--nature-black)] md:text-6xl lg:text-[78px]"
          >
            Transforming{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[var(--purple-brand)]">Mindsets</span>
              <SmileArc className="absolute -bottom-3 left-0 h-5 w-full text-[var(--mustard)]" strokeWidth={3} />
            </span>
            ,
            <br />
            Elevating <span className="italic text-[var(--purple-brand)]">Lives</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-7 max-w-xl text-balance text-base leading-relaxed text-[var(--nature-black)]/65 md:text-lg"
          >
            Happiness is a skill you can learn. Join a science-based coaching
            journey designed to reprogram your mindset, heal what holds you back,
            and unlock the calm, confident life you deserve.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#programs"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--purple-brand)] px-6 py-3.5 text-sm font-medium text-white shadow-[0_18px_40px_-14px_rgba(128,0,128,0.55)] transition-all hover:translate-y-[-1px] hover:shadow-[0_22px_48px_-12px_rgba(128,0,128,0.6)]"
            >
              Start Your Transformation
              <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--nature-black)]/15 bg-white/40 px-6 py-3.5 text-sm font-medium text-[var(--nature-black)] backdrop-blur-md transition-colors hover:bg-white/70"
            >
              Discover the Method
            </a>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[var(--purple-brand)]/10 pt-8"
          >
            {[
              { v: "20k+", l: "Lives transformed" },
              { v: "99%", l: "Client satisfaction" },
              { v: "10+", l: "Countries reached" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-display text-3xl font-bold tracking-tight text-[var(--purple-brand)] md:text-4xl">
                  {s.v}
                </dt>
                <dd className="mt-1 text-[12px] font-medium uppercase tracking-wider text-[var(--nature-black)]/55">
                  {s.l}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-[520px]"
        >
          <GlowOrb className="-left-10 -top-10" color="#FFCE1B" size={360} opacity={0.55} />
          <GlowOrb className="-bottom-12 -right-10" color="#DCC7E8" size={400} opacity={0.7} />
          <OrbitalLines className="inset-0" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="glass-surface relative h-full w-full overflow-hidden rounded-[40px] p-2"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[32px]">
              <Image
                src={coachPortrait}
                alt="A happiness coach smiling warmly"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--purple-brand)]/20 via-transparent to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass-pill absolute -left-6 top-10 hidden items-center gap-2 rounded-2xl px-3 py-2 md:flex"
            >
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[var(--mustard)]/90 text-base">*</span>
              <div>
                <p className="text-[11px] font-semibold text-[var(--nature-black)]">Mindset shift</p>
                <p className="text-[10px] text-[var(--nature-black)]/55">Awareness</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="glass-pill absolute -right-4 bottom-14 hidden items-center gap-2 rounded-2xl px-3 py-2 md:flex"
            >
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[var(--purple-soft)] text-[var(--purple-brand)]">+</span>
              <div>
                <p className="text-[11px] font-semibold text-[var(--nature-black)]">Emotional clarity</p>
                <p className="text-[10px] text-[var(--nature-black)]/55">Loneliness</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
