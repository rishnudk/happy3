"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "./data";

export default function ProgramsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto mb-16 relative z-10">
      
      <div className="text-center flex flex-col items-center gap-4 mb-12">
        <span 
          className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/80"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)"
          }}
        >
          Have Questions?
        </span>
        <h2 className="font-satoshi font-black text-3xl text-white">
          Wisdom & Enrollment Board
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="rounded-[22px] overflow-hidden transition-all duration-300"
              style={{
                background: isOpen ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.03)",
                border: isOpen ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center gap-4 font-bold text-[15.5px] text-white cursor-pointer focus:outline-none"
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5"
                >
                  <ChevronDown className="w-4 h-4 text-white" strokeWidth={2.5} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-1 text-[14.5px] leading-[1.7] text-white/70 font-medium border-t border-white/10">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
