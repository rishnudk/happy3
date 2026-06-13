"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  X, 
  Clock, 
  Layers, 
  Compass, 
  Heart, 
  User, 
  Award, 
  BookOpen 
} from "lucide-react";
import { ProgramItem } from "./types";

interface ProgramDetailModalProps {
  program: ProgramItem | null;
  onClose: () => void;
}

export default function ProgramDetailModal({
  program,
  onClose,
}: ProgramDetailModalProps) {
  if (!program) return null;

  const smoothReveal = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      
      {/* Dark Blur Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.55, ease: smoothReveal }}
        className="bg-[#1E193B] relative w-full max-w-4xl rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden max-h-[90vh] flex flex-col z-10"
      >
        
        {/* Modal Banner Background */}
        <div 
          className="h-28 relative flex items-center shrink-0 px-8"
          style={{ background: `linear-gradient(135deg, ${program.color}, ${program.color}bb)` }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col gap-1 text-white">
            <span className="text-[10px] font-black tracking-widest uppercase opacity-75">
              {program.category}
            </span>
            <h2 className="font-satoshi font-black text-2xl sm:text-3xl leading-none">
              {program.title}
            </h2>
          </div>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="overflow-y-auto p-6 md:p-8 flex flex-col gap-8">
          
          {/* Spec Pills Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-[20px] bg-white/5 border border-white/10 flex flex-col gap-1">
              <span className="text-[10px] font-black text-white/50 uppercase tracking-wider">Duration</span>
              <span className="text-[13.5px] font-bold text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-white/50 shrink-0" />
                {program.duration}
              </span>
            </div>
            <div className="p-4 rounded-[20px] bg-white/5 border border-white/10 flex flex-col gap-1">
              <span className="text-[10px] font-black text-white/50 uppercase tracking-wider">Format</span>
              <span className="text-[13.5px] font-bold text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-white/50 shrink-0" />
                {program.format}
              </span>
            </div>
            <div className="p-4 rounded-[20px] bg-white/5 border border-white/10 flex flex-col gap-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-black text-white/50 uppercase tracking-wider">Category</span>
              <span className="text-[13.5px] font-bold text-white flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-white/50 shrink-0" />
                {program.category}
              </span>
            </div>
          </div>

          {/* Main 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Objectives & Targets (span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex flex-col gap-2.5">
                <h4 className="font-satoshi font-black text-[16px] text-white flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#FFCE1B]" />
                  Program Objective
                </h4>
                <p className="text-[14px] leading-[1.65] font-medium text-white/70 bg-white/5 p-4 rounded-[20px] border border-white/10">
                  {program.objective}
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <h4 className="font-satoshi font-black text-[16px] text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-[#FFCE1B]" />
                  Who Is This For?
                </h4>
                <p className="text-[14px] leading-[1.65] font-medium text-white/70 bg-white/5 p-4 rounded-[20px] border border-white/10">
                  {program.whoItIsFor}
                </p>
              </div>

              {/* Quick Checklist Highlights */}
              <div className="flex flex-col gap-2.5">
                <h4 className="font-satoshi font-black text-[16px] text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#FFCE1B]" />
                  Key Takeaways
                </h4>
                <div className="flex flex-col gap-2">
                  {program.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-[13px] font-semibold text-white/80">
                      <span 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: program.color }} 
                      />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Roadmap / Curriculum (span 7) */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <h4 className="font-satoshi font-black text-[16px] text-white flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-[#FFCE1B]" />
                Curriculum & Integration Roadmap
              </h4>

              {/* Timeline Container */}
              <div className="relative pl-6 flex flex-col gap-6">
                
                {/* Vertical line connecting nodes */}
                <div 
                  className="absolute left-[9px] top-2 bottom-2 w-[3px] rounded-full opacity-30" 
                  style={{ background: program.color }}
                />

                {program.curriculum.map((c, idx) => (
                  <div key={idx} className="relative flex flex-col gap-1.5">
                    
                    {/* Circle Node */}
                    <div 
                      className="absolute left-[-22px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-[#1E193B]"
                      style={{ 
                        backgroundColor: program.color,
                        boxShadow: `0 0 0 3px ${program.color}35`
                      }}
                    />

                    <div className="flex items-center gap-2">
                      <span 
                        className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md"
                        style={{ 
                          color: program.color,
                          backgroundColor: `${program.color}15`,
                          border: `1px solid ${program.color}35`
                        }}
                      >
                        {c.phase}
                      </span>
                      <h5 className="font-satoshi font-black text-[14.5px] text-white">
                        {c.title}
                      </h5>
                    </div>
                    
                    <p className="text-[13px] leading-[1.6] text-white/70 font-medium">
                      {c.detail}
                    </p>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 md:px-8 border-t border-white/10 bg-white/5 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left flex flex-col">
            <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest leading-none">Ready to start?</span>
            <span className="text-[13px] font-bold text-white/70 mt-1">Assessment determines fit and program pricing</span>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-3 rounded-full font-bold text-[13px] text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer text-center focus:outline-none"
            >
              Close Hub
            </button>
            <Link 
              href="/assessment" 
              className="flex-1 sm:flex-none px-6 py-3 rounded-full font-bold text-[13px] text-white transition-all duration-300 cursor-pointer text-center"
              style={{ 
                background: "linear-gradient(145deg, #FFCE1B, #FFD84D)", 
                color: "#2A254B",
                boxShadow: "0 4px 15px rgba(255,206,27,0.3)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,206,27,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(255,206,27,0.3)";
              }}
            >
              Start Transformation
            </Link>
          </div>
        </div>

      </motion.div>

    </div>
  );
}
