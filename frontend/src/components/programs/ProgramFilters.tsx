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
              color: isActive ? "#800080" : "rgba(42,37,75,0.65)",
              background: isActive ? "#F3EEFA" : "linear-gradient(145deg, #ffffff, #f4efff)",
              border: isActive ? "2px solid rgba(128,0,128,0.2)" : "2px solid rgba(255,255,255,0.7)",
              boxShadow: isActive
                ? "inset 3px 3px 6px #DDDAE3, inset -3px -3px 6px #FFFFFF"
                : "4px 4px 10px rgba(165,140,217,0.06), -4px -4px 10px #FFFFFF"
            }}
          >
            {cat}
          </button>
        );
      })}
    </motion.div>
  );
}
