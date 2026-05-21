"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  UserMinus, 
  CloudRain, 
  HelpCircle, 
  Users, 
  Briefcase 
} from "lucide-react";

const challenges = [
  {
    id: 1,
    title: "Stress",
    num: "01",
    icon: Brain,
    gradient: "from-purple-500/10 to-indigo-500/10 text-purple-600",
  },
  {
    id: 2,
    title: "Relationship challenges",
    num: "02",
    icon: UserMinus,
    gradient: "from-blue-500/10 to-cyan-500/10 text-blue-600",
  },
  {
    id: 3,
    title: "Emotional breakdown",
    num: "03",
    icon: CloudRain,
    gradient: "from-pink-500/10 to-rose-500/10 text-pink-600",
  },
  {
    id: 4,
    title: "Lack of clarity",
    num: "04",
    icon: HelpCircle,
    gradient: "from-amber-500/10 to-orange-500/10 text-amber-600",
  },
  {
    id: 5,
    title: "Parenting pressure",
    num: "05",
    icon: Users,
    gradient: "from-teal-500/10 to-emerald-500/10 text-teal-600",
  },
  {
    id: 6,
    title: "Career anxiety",
    num: "06",
    icon: Briefcase,
    gradient: "from-orange-500/10 to-red-500/10 text-orange-600",
  },
];

export function ChallengeSection() {
  return (
    <section id="challenge" className="relative px-4 py-24 md:py-32 overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[var(--purple-soft)]/20 opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute -right-24 bottom-24 h-96 w-96 rounded-full bg-[var(--mustard-soft)]/15 opacity-40 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] items-start lg:gap-16">
          {/* Left Column: Heading and copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--purple-brand)]/15 bg-[var(--purple-brand)]/5 px-4 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[var(--purple-brand)] uppercase">
              The Real Challenge
            </div>
            
            <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.15] text-[var(--nature-black)] md:text-5xl lg:text-[60px]">
              Why are people{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[var(--purple-brand)] to-[#C040A0] bg-clip-text text-transparent">
                  struggling
                </span>
              </span>{" "}
              today?
            </h2>
            
            <div className="relative mt-8 pl-6 border-l-2 border-[var(--mustard)]">
              <p className="text-base leading-relaxed text-[var(--nature-black)]/70 md:text-lg">
                Most people were never taught how to regulate emotions.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Grid of tactile square cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 md:gap-6">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-85px" }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.05,
                  }}
                  className="neumorphic-raised flex flex-col justify-between aspect-square p-5 sm:p-6 md:p-7 relative overflow-hidden group cursor-default"
                >
                  {/* Top row: Icon on left, Number on right */}
                  <div className="flex items-start justify-between w-full">
                    <div className="neumorphic-icon-container flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${challenge.gradient}`}>
                        <Icon className="h-4.5 w-4.5 stroke-[2.2]" />
                      </div>
                    </div>
                    
                    <span className="font-display text-sm font-bold tracking-wide text-[var(--nature-black)]/30 group-hover:text-[var(--purple-brand)]/40 transition-colors duration-300">
                      {challenge.num}
                    </span>
                  </div>

                  {/* Bottom row: Text label */}
                  <div className="mt-6">
                    <h3 className="font-display text-sm font-black leading-snug text-[var(--nature-black)] sm:text-base md:text-[17px] group-hover:text-[var(--purple-brand)] transition-colors duration-300">
                      {challenge.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
