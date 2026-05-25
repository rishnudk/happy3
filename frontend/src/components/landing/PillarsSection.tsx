import { motion } from "motion/react";
import { SmileArc } from "./decor";

const pillars = [
  {
    title: "Mindset Reprogramming",
    desc: "Rewire limiting beliefs through proven neuro-cognitive techniques that create lasting inner shifts.",
    icon: "*",
    tint: "from-[#FFCE1B]/30 to-transparent",
  },
  {
    title: "Emotional Healing",
    desc: "Release the weight of past patterns and meet yourself with compassion, presence, and warmth.",
    icon: "+",
    tint: "from-[#DCC7E8]/40 to-transparent",
  },
  {
    title: "Science-Based Coaching",
    desc: "Frameworks built on positive psychology, behavioural science, and decades of clinical research.",
    icon: "#",
    tint: "from-[#F5E7B2]/45 to-transparent",
  },
  {
    title: "Personal Growth Strategies",
    desc: "Practical, daily rituals that compound into a fulfilled, intentional and purpose-led life.",
    icon: "x",
    tint: "from-[#FCFAFF]/60 to-transparent",
  },
];

export function PillarsSection() {
  return (
    <section id="features" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--purple-brand)]/80">
            The Foundations
          </p>
          <h2 className="font-display mt-3 text-balance text-4xl font-bold leading-[1.05] text-[var(--nature-black)] md:text-5xl lg:text-[56px]">
            The foundations of{" "}
            <span className="text-[var(--purple-brand)]">lasting happiness</span>.
          </h2>
          <p className="mt-5 text-[var(--nature-black)]/60 md:text-lg">
            Four interconnected practices that shape the way you think, feel and
            move through the world.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
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
              className={`glass-surface group relative overflow-hidden rounded-3xl p-7 ${
                index % 2 === 1 ? "lg:translate-y-6" : ""
              }`}
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${pillar.tint} opacity-80 blur-2xl transition-opacity duration-700 group-hover:opacity-100`}
              />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-white to-[var(--mustard-soft)]/60 text-xl text-[var(--purple-brand)] shadow-[0_8px_24px_-12px_rgba(128,0,128,0.4)]">
                  {pillar.icon}
                </div>
                <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-[var(--nature-black)]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--nature-black)]/60">
                  {pillar.desc}
                </p>
                <SmileArc className="mt-6 h-4 w-16 text-[var(--mustard)]/80" strokeWidth={2.2} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
