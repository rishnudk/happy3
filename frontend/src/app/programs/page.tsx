"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NeuButton } from "@/components/ui/NeuButton";
import PageWrapper from "@/components/layout/page-wrapper";

// Modular program component imports
import { ProgramItem } from "@/components/programs/types";
import { PROGRAMS } from "@/components/programs/data";
import ProgramsHero from "@/components/programs/ProgramsHero";
import ProgramFilters from "@/components/programs/ProgramFilters";
import ProgramCard from "@/components/programs/ProgramCard";
import ProgramDetailModal from "@/components/programs/ProgramDetailModal";
import ProgramsFAQ from "@/components/programs/ProgramsFAQ";

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Paths");
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  // Filter programs based on active category tab
  const filteredPrograms = selectedCategory === "All Paths" 
    ? PROGRAMS 
    : PROGRAMS.filter(p => p.category === selectedCategory);

  const smoothReveal = [0.22, 1, 0.36, 1] as const;

  return (
    <main className="relative min-h-screen overflow-x-hidden">

      {/* Header Menu Navigation */}
      <Navbar />

      <PageWrapper className="pt-32 pb-24 relative z-10">
        
        {/* ─── Hero Heading Block ─── */}
        <ProgramsHero />

        {/* ─── Category Filter Navigation Tabs ─── */}
        <ProgramFilters 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        {/* ─── Dynamic Showcase Card Grid ─── */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20 relative z-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: smoothReveal }}
              >
                <ProgramCard 
                  item={item} 
                  index={index} 
                  onLearnDetails={setSelectedProgram} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ─── Self-Reflection / Assessment CTA Banner ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: smoothReveal }}
          className="max-w-5xl mx-auto mb-24"
        >
          <div 
            className="p-8 md:p-12 rounded-[36px] flex flex-col lg:flex-row justify-between items-center gap-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #2A254B 0%, #3D1A6B 100%)",
              boxShadow: "0 20px 50px rgba(42,37,75,0.25)",
              border: "1px solid rgba(192,132,252,0.15)",
            }}
          >
            {/* Ambient Background Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-25 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-mustard rounded-full blur-[100px] opacity-15 pointer-events-none" />

            {/* Left Content Column */}
            <div className="flex flex-col gap-4 text-center lg:text-left relative z-10">
              <span className="text-mustard font-extrabold uppercase tracking-widest text-[11px]">
                Not sure which path is yours?
              </span>
              <h2 className="font-satoshi font-black text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
                Take the Happiness Assessment
              </h2>
              <p className="text-[14px] md:text-[15px] font-medium text-purple-200/80 max-w-xl">
                Answer our science-backed wellness questionnaire and discover your happiness baseline. We'll recommend the exact program to elevate your emotional resilience.
              </p>
            </div>

            {/* Right Action Column */}
            <div className="shrink-0 relative z-10">
              <NeuButton variant="mustard" href="/assessment" size="lg" className="shadow-gold-glow">
                Start Your Transformation
                <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2.5} />
              </NeuButton>
            </div>

          </div>
        </motion.div>

        {/* ─── Interactive FAQ Accordion Section ─── */}
        <ProgramsFAQ />

      </PageWrapper>

      {/* ─── Premium Immersive Detail Modal ─── */}
      <AnimatePresence>
        {selectedProgram && (
          <ProgramDetailModal 
            program={selectedProgram} 
            onClose={() => setSelectedProgram(null)} 
          />
        )}
      </AnimatePresence>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
