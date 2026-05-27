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
          className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary"
          style={{
            background: "rgba(243,238,250,0.9)",
            border: "1px solid rgba(128,0,128,0.15)"
          }}
        >
          Have Questions?
        </span>
        <h2 className="font-satoshi font-black text-3xl text-slate-deep">
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
                background: "#F6F3FA",
                boxShadow: isOpen 
                  ? "inset 3px 3px 6px #DDDAE3, inset -3px -3px 6px #FFFFFF" 
                  : "6px 6px 12px #DDDAE3, -6px -6px 12px #FFFFFF",
                border: "1px solid rgba(255,255,255,0.75)"
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center gap-4 font-bold text-[15.5px] text-slate-deep cursor-pointer focus:outline-none"
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 bg-white shadow-soft"
                >
                  <ChevronDown className="w-4 h-4 text-primary" strokeWidth={2.5} />
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
                    <div className="px-6 pb-6 pt-1 text-[14.5px] leading-[1.7] text-slate-500 font-medium border-t border-slate-100/50">
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
