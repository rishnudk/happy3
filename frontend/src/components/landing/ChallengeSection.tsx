import { motion } from "motion/react";

const challenges = [
  "Stress",
  "Loneliness",
  "Emotional breakdown",
  "Lack of clarity",
  "Parenting pressure",
  "Career anxiety",
];

export function ChallengeSection() {
  return (
    <section id="challenge" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--purple-brand)]/80">
            The Real Challenge
          </p>
          <h2 className="font-display mt-4 text-balance text-4xl font-bold leading-[1.05] text-[var(--nature-black)] md:text-5xl lg:text-[64px]">
            Why are people{" "}
            <span className="text-[var(--purple-brand)]">struggling today?</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--nature-black)]/65 md:text-lg">
            Most people were never taught how to regulate emotions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="glass-surface relative overflow-hidden rounded-[32px] p-5 sm:p-6 md:p-8"
        >
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--mustard)]/35 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[var(--purple-soft)]/60 blur-3xl"
          />

          <div className="relative grid gap-3 sm:grid-cols-2">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.05,
                }}
                className="group flex min-h-20 items-center gap-4 rounded-2xl border border-white/60 bg-white/45 px-4 py-4 shadow-[0_10px_30px_-24px_rgba(17,24,16,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/70"
              >
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-[var(--mustard)]/85 text-sm font-black text-[var(--nature-black)] shadow-[0_8px_20px_-12px_rgba(255,206,27,0.8)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-base font-bold leading-tight text-[var(--nature-black)] sm:text-lg">
                  {challenge}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
