"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

const primaryButtonClass = `
  group relative overflow-hidden flex items-center gap-4 rounded-full pl-8 pr-2.5 py-2.5
  bg-[var(--cta-bg)] hover:bg-[var(--cta-hover)] text-white font-semibold text-[15px] tracking-wide
  border border-white/10 transition-all duration-500
  shadow-sm hover:shadow-md
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
          <span className="relative z-10">Start Your Transformation</span>
          <span className="relative z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white text-[var(--cta-bg)] transition-all duration-300 shadow-sm group-hover:rotate-45">
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
          bg-white/80 backdrop-blur-xl border border-white/90
          text-[var(--text-heading)] font-semibold text-[15px] tracking-wide transition-all duration-500
          shadow-sm hover:shadow-md
        "
        style={{ transformStyle: "preserve-3d" }}
      >
        <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 border border-gray-100 group-hover:scale-110 transition-transform duration-300">
          <Play className="w-3.5 h-3.5 fill-current translate-x-[1px]" />
        </span>
        <span className="relative z-10">Discover the Method</span>
      </motion.button>
    </div>
  );
}
