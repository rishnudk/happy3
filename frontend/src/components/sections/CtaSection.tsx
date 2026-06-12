"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Phone, Users, ShieldCheck, Sparkles } from "lucide-react";
import NeuCard from "@/components/ui/NeuCard";
import PageWrapper from "@/components/layout/page-wrapper";

const TRUST_METRICS = [
  {
    title: "Trusted by 25,000+ Individuals",
    desc: "Join a massive global network of individuals who have successfully elevated their life paths.",
    icon: Users,
    color: "#800080", // Patriarch Purple
  },
  {
    title: "Science-Backed Frameworks",
    desc: "Every program integrates positive psychology, neuro-cognitive training, and clinical research.",
    icon: ShieldCheck,
    color: "#FF9F1C", // Mustard Gold
  },
  {
    title: "Supportive Uplifting Community",
    desc: "Experience non-judgmental accountability, absolute warmth, and safe healing relationships.",
    icon: Sparkles,
    color: "#EC4899", // Soft Fuchsia
  },
] as const;

export function CtaSection() {
  return (
    <section className="w-full bg-[#2A254B] py-20 text-white relative overflow-hidden">
      {/* Ambient dark glow backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,0,128,0.2),transparent_70%)] pointer-events-none z-0" />

      <PageWrapper id="cta" className="relative overflow-visible z-10 !py-0">


      {/* ── 2-Column layout: left text and actions | right bento details ── */}
      <div className="grid items-center gap-16 lg:grid-cols-12 relative z-10">

        {/* ── LEFT: Typography & Actions Block (span 4) ── */}
        <div className="lg:col-span-4 flex flex-col gap-7">

          {/* Neumorphic Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex"
          >
            <span
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase"
              style={{
                color: "#E9D5FF",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Pulsing Dot */}
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span
                  className="animate-pulse absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: "rgba(192, 132, 252, 0.5)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: "#C084FC" }}
                />
              </span>
              Transformation
            </span>
          </motion.div>

          {/* Main Heading with Marker Underline */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-satoshi font-black leading-[1.15] tracking-tight"
            style={{ fontSize: "clamp(28px, 3.4vw, 48px)", color: "#FFFFFF" }}
          >
            <span className="block">Ready to</span>
            <span className="block">
              <span className="relative inline-block" style={{ color: "#FFCE1B" }}>
                transform
                {/* Mustard marker underline */}
                <span
                  className="absolute bottom-0 left-[-2px] w-[calc(100%+4px)] h-[9px] rounded-[3px] -z-10"
                  style={{ background: "#FFCE1B", opacity: 0.25 }}
                />
              </span>{" "}
              your life?
            </span>
          </motion.h2>

          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-[15px] sm:text-[16px] leading-[1.9] font-medium max-w-[360px]"
            style={{ color: "rgba(255,255,255,0.70)" }}
          >
            Whether you&apos;re here to heal, grow, or become a coach, we&apos;re here to walk with you every step of the way.
          </motion.p>

          {/* Action buttons block */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            {/* Apply Now Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn inline-flex items-center justify-center gap-3.5 px-7 py-4 rounded-full font-bold text-[14px] text-white transition-all duration-500 cursor-pointer shadow-[0_16px_36px_-10px_rgba(128,0,128,0.38)] hover:shadow-[0_22px_44px_-8px_rgba(128,0,128,0.48)] w-full sm:w-auto"
              style={{
                background: "linear-gradient(145deg, #800080, #A21CAF)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <span>Apply Now</span>
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 transition-transform duration-300 group-hover/btn:rotate-45">
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </span>
            </motion.a>

            {/* Book Call Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full font-bold text-[14px] transition-all duration-500 cursor-pointer w-full sm:w-auto"
              style={{
                color: "#FFFFFF",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Phone className="w-4 h-4 text-[#FFCE1B]" strokeWidth={2.2} />
              <span>Book Call</span>
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-white transition-transform duration-300 group-hover/btn:translate-x-0.5">
                <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              </span>
            </motion.a>
          </motion.div>

          {/* Animated Neumorphic Accent Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="relative w-20 h-[5px] rounded-full overflow-hidden mt-2"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              transformOrigin: "left center",
            }}
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 rounded-full"
              style={{ background: "linear-gradient(90deg, #FFCE1B, #FF9F1C)", width: "40%" }}
              animate={{ x: [0, 32, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* ── RIGHT: Combined Image Frame and Vertical Stack of Trust Cards (span 8) ── */}
        <div className="lg:col-span-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">

            {/* Left Side: Contact Visual Frame with Signature Growth Arcs (col-span-5) */}
            <div className="md:col-span-5 relative flex items-center justify-center overflow-visible py-4">
              
              {/* Background Orbiting Signature Brand Arcs */}
              <div className="absolute inset-0 -z-10 pointer-events-none scale-[1.25]">
                <motion.svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                >
                  {/* Arc 1: Patriarch Purple */}
                  <path
                    d="M 50,200 A 150,150 0 0,1 350,200"
                    fill="none"
                    stroke="#800080"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.22"
                  />
                  {/* Arc 2: Mustard Yellow */}
                  <path
                    d="M 350,200 A 150,150 0 0,1 50,200"
                    fill="none"
                    stroke="#FFCE1B"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.32"
                  />
                </motion.svg>
              </div>

              {/* Graphic Frame Card */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="p-3 w-full max-w-[280px] md:max-w-none aspect-[4/4.8] relative overflow-hidden rounded-[36px] bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="relative w-full h-full rounded-[24px] sm:rounded-[30px] overflow-hidden">
                  <Image
                    src="/images/contact1.png"
                    alt="Start your transformation journey with HCA"
                    fill
                    priority
                    sizes="(max-w-7xl) 33vw, 320px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Premium overlay tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#800080]/15 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating overlay badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-6 bottom-6 flex items-center gap-3 rounded-2xl px-4 py-3 border border-white/10 bg-white/10 backdrop-blur-md"
                  style={{
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#FFCE1B] shadow-[inset_1px_1px_3px_rgba(255,255,255,0.15)]">
                    <Sparkles className="h-4.5 w-4.5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[11.5px] font-black text-white leading-none">Science-Backed</p>
                    <p className="text-[9px] font-bold text-white/70 mt-1 leading-none">Guaranteed Growth</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side: Tactfully Stacked Trust Metrics Cards (col-span-7) */}
            <div className="md:col-span-7 flex flex-col gap-6">
              {TRUST_METRICS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    whileHover={{ y: -4 }}
                    className="p-6 flex items-start gap-5 group rounded-[1.5rem] bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-300"
                  >
                    {/* Inset Neumorphic Icon Well Orb */}
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 16,
                        background: "rgba(0,0,0,0.2)",
                        boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.3), inset -2px -2px 6px rgba(255,255,255,0.05)",
                      }}
                    >
                      <div
                        className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          background: `${item.color}30`,
                          boxShadow: `inset 2px 2px 5px rgba(0,0,0,0.2), inset -1px -1px 3px rgba(255,255,255,0.1)`,
                        }}
                      >
                        <Icon style={{ color: item.color, width: 18, height: 18, strokeWidth: 2.2 }} />
                      </div>
                    </div>

                    {/* Card text detailing trust statistics */}
                    <div className="flex flex-col gap-1.5">
                      <h3
                        className="font-satoshi font-black text-[16px] sm:text-[18px] leading-tight transition-colors duration-300 group-hover:text-[#FFCE1B]"
                        style={{ color: "#FFFFFF" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="font-medium text-[13px] sm:text-[13.5px] leading-[1.65] transition-colors duration-300"
                        style={{ color: "rgba(255,255,255,0.70)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
      </PageWrapper>
    </section>
  );
}
