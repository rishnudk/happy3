"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Star, Globe } from "lucide-react";

// Scroll-triggered animated counter component
function Counter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = match[2] || "";

    let startTime: number | null = null;
    const duration = 2200;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // easeOutExpo for a snappier feel
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * target);

      if (target >= 1000) {
        setDisplayValue(Math.floor(current).toLocaleString() + suffix);
      } else {
        setDisplayValue(current + suffix);
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function StatsSection() {
  const stats = [
    {
      value: "25k+",
      label: "Lives transformed",
      icon: Users,
      iconColor: "text-primary",
      iconBg: "bg-[#FAF8FD] border-purple-100/30",
    },
    {
      value: "99%",
      label: "Client satisfaction",
      icon: Star,
      iconColor: "text-secondary fill-secondary",
      iconBg: "bg-[#FAF8FD] border-amber-100/30",
    },
    {
      value: "10+",
      label: "Countries reached",
      icon: Globe,
      iconColor: "text-primary",
      iconBg: "bg-[#FAF8FD] border-purple-100/30",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12 lg:mt-16 z-20 relative max-w-5xl mx-auto w-full px-4 sm:px-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="
          rounded-[32px]
          bg-white/80 backdrop-blur-2xl
          border-[1.5px] border-white/90
          shadow-[0_20px_60px_rgba(128,0,128,0.08),0_4px_16px_rgba(128,0,128,0.04)]
          py-8 sm:py-10 px-4 sm:px-12
          grid grid-cols-3 gap-2 sm:gap-8 md:gap-4
          items-center
          relative
          overflow-hidden
        "
      >
        {/* Soft internal gradient background highlight */}
        <span className="absolute inset-0 bg-gradient-to-tr from-purple-50/20 via-transparent to-amber-50/20 pointer-events-none" />

        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              className="flex flex-col lg:flex-row items-center gap-3 sm:gap-4 lg:gap-6 justify-center relative z-10 px-1 sm:px-4 lg:px-6"
            >
              {/* Circular Icon Slot */}
              <div
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
                  rounded-full
                  flex items-center justify-center
                  bg-white
                  border border-purple-100/50
                  shadow-[0_4px_12px_rgba(128,0,128,0.05)]
                  relative
                  shrink-0
                `}
              >
                <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 relative z-10 ${stat.iconColor}`} strokeWidth={2.5} />
              </div>

              {/* Stat Typography */}
              <div className="text-center lg:text-left">
                <h4 className="font-satoshi font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl text-[#2A254B] tracking-tight leading-none">
                  <Counter value={stat.value} />
                </h4>
                <p className="text-[10px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[16px] text-slate-600 font-semibold mt-1 sm:mt-2 tracking-wide leading-tight">
                  {stat.label}
                </p>
              </div>

              {/* Separators between stats on Desktop */}
              {idx < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-purple-900/10" />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
