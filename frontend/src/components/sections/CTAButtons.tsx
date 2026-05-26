"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

const primaryButtonClass = `
  group relative overflow-hidden flex items-center gap-4 rounded-full pl-8 pr-2.5 py-2.5
  bg-[linear-gradient(145deg,#7B2CBF,#4B006E)] text-white font-semibold text-[15px] tracking-wide
  border border-white/10 transition-all duration-500
  shadow-[0_25px_45px_rgba(123,44,191,0.30),10px_10px_24px_rgba(91,0,122,0.22),-6px_-6px_18px_rgba(255,255,255,0.06),inset_1px_1px_2px_rgba(255,255,255,0.18),inset_-2px_-2px_6px_rgba(0,0,0,0.12)]
  hover:shadow-[0_35px_60px_rgba(123,44,191,0.38),16px_16px_34px_rgba(91,0,122,0.30),inset_1px_1px_2px_rgba(255,255,255,0.20)]
`;

export default function CTAButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Link href="/assessment" className={primaryButtonClass}>
          <span className="absolute top-1 left-[10%] h-[12px] w-[80%] rounded-full bg-white/20 blur-md pointer-events-none" />
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 w-[70%] h-[20px] rounded-full bg-purple-500/30 blur-2xl pointer-events-none" />
          <span className="relative z-10">Start Your Transformation</span>
          <span className="relative z-10 flex items-center justify-center w-11 h-11 rounded-full bg-[linear-gradient(145deg,#ffffff,#f2ebff)] text-primary border border-white/70 transition-all duration-300 shadow-[-4px_-4px_12px_rgba(255,255,255,0.9),6px_6px_16px_rgba(75,0,110,0.16),inset_1px_1px_2px_rgba(255,255,255,1)] group-hover:rotate-45">
            <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
          </span>
        </Link>
      </motion.div>
      <motion.button
        type="button"
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="
          group relative overflow-hidden flex items-center gap-4 rounded-full px-8 py-4
          bg-[linear-gradient(145deg,#ffffff,#f4efff)] backdrop-blur-xl border border-white/90
          text-primary font-semibold text-[15px] tracking-wide transition-all duration-500
          shadow-[0_20px_40px_rgba(166,140,255,0.10),12px_12px_24px_rgba(166,140,255,0.12),-12px_-12px_24px_rgba(255,255,255,1),inset_1px_1px_2px_rgba(255,255,255,1),inset_-2px_-2px_5px_rgba(180,160,220,0.08)]
          hover:shadow-[0_28px_50px_rgba(166,140,255,0.16),16px_16px_30px_rgba(166,140,255,0.18),-14px_-14px_28px_rgba(255,255,255,1)]
        "
        style={{ transformStyle: "preserve-3d" }}
      >
        <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[linear-gradient(145deg,#ffffff,#f3edff)] border border-white group-hover:scale-110 transition-transform duration-300">
          <Play className="w-3.5 h-3.5 fill-current translate-x-[1px]" />
        </span>
        <span className="relative z-10">Discover the Method</span>
      </motion.button>
    </div>
  );
}
