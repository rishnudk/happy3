"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Check, ArrowRight, Sparkles } from "lucide-react";
import NeuCard from "@/components/ui/NeuCard";

export default function WhatsAppCallout() {
  const smoothReveal = [0.22, 1, 0.36, 1] as const;

  const benefits = [
    "Daily Mindfulness & Happiness prompts to start your morning centered.",
    "Exclusive event links & Zoom invitations delivered directly to your phone.",
    "A supportive, non-judgmental space to connect with fellow academy seekers.",
    "First access to offline gatherings, certifications, and sound healing meetups."
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: smoothReveal }}
      className="max-w-4xl mx-auto mb-20 relative z-10"
    >
      <NeuCard
        variant="elevated"
        hoverLift={false}
        className="p-8 md:p-12 relative overflow-hidden"
      >
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-[110px] opacity-15 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-[110px] opacity-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Descriptive (span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Neumorphic WhatsApp Pill */}
            <div className="inline-flex">
              <span
                className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full text-[10px] font-extrabold tracking-wider uppercase"
                style={{
                  color: "#10B981", // Emerald Green
                  background: "linear-gradient(145deg, #ffffff, #effffb)",
                  border: "1.5px solid rgba(16,185,129,0.2)",
                  boxShadow: "4px 4px 10px rgba(16,185,129,0.06), -4px -4px 10px #FFFFFF",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Live Connection
              </span>
            </div>

            <h3 className="font-satoshi font-black text-3xl md:text-4xl text-slate-deep leading-tight">
              Join Our <span style={{ color: "#10B981" }}>WhatsApp</span> Community
            </h3>
            
            <p className="text-[14.5px] leading-relaxed text-slate-500 font-medium">
              Do not walk the growth journey in isolation. Connect with hundreds of like-minded individuals in our exclusive HCA Sharing Circle and protect your positive momentum.
            </p>

            {/* Benefit Checklists */}
            <div className="flex flex-col gap-3.5 mt-2">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3.5 text-[14px] font-semibold text-slate-600">
                  <span 
                    className="flex items-center justify-center w-5 h-5 rounded-full text-white shrink-0 mt-0.5"
                    style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: CTA Button (span 5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-[28px] bg-slate-50/50 border border-slate-100/80 shadow-soft">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-600 mb-4 animate-pulse">
              <MessageCircle className="w-8 h-8" strokeWidth={2.2} />
            </div>
            
            <span className="text-[13px] font-bold text-slate-400 mb-1">HCA OFFICIAL CHANNEL</span>
            <span className="text-[14.5px] font-black text-slate-deep mb-6">100% Free & Spam-Safe</span>

            {/* Glowing Pulsing WhatsApp Button */}
            <motion.a
              href="https://chat.whatsapp.com/invite-link-placeholder" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full font-extrabold text-[14.5px] text-white transition-all duration-300 shadow-md cursor-pointer"
              style={{
                background: "linear-gradient(145deg, #10B981, #059669)",
                boxShadow: "0 10px 25px rgba(16,185,129,0.35)",
              }}
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-none" />
              <span>Join WhatsApp Group</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </motion.a>
          </div>

        </div>

      </NeuCard>
    </motion.div>
  );
}
