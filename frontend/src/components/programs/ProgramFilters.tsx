"use client";

import React from "react";
import { motion } from "framer-motion";
import { CATEGORIES } from "./data";

interface ProgramFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function ProgramFilters({
  selectedCategory,
  onSelectCategory,
}: ProgramFiltersProps) {
  const smoothReveal = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: smoothReveal }}
      className="flex flex-wrap justify-center gap-3.5 mb-14 max-w-4xl mx-auto relative z-10"
    >
      {CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-5 py-3 rounded-full text-[13.5px] font-bold transition-all duration-300 cursor-pointer focus:outline-none`}
            style={{
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
              background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
              border: isActive ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
              boxShadow: isActive
                ? "0 4px 12px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(255,255,255,0.05)"
                : "none"
            }}
          >
            {cat}
          </button>
        );
      })}
    </motion.div>
  );
}
