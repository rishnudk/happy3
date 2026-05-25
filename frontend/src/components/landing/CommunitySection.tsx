"use client";

import { motion } from "motion/react";
import { Users, Sparkles, ArrowRight } from "lucide-react";
import { SmileArc } from "./decor";
import Masonry from "../ui/Masonry";

const communityImages = [
  {
    id: "1",
    img: "/community/IMG-20260512-WA0030.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 480,
  },
  {
    id: "2",
    img: "/community/IMG-20260512-WA0031.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 380,
  },
  {
    id: "3",
    img: "/community/IMG-20260512-WA0046.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 540,
  },
  {
    id: "4",
    img: "/community/IMG-20260512-WA0048.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 340,
  },
  {
    id: "5",
    img: "/community/IMG-20260512-WA0052.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 580,
  },
  {
    id: "6",
    img: "/community/IMG-20260512-WA0053.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 460,
  },
  {
    id: "7",
    img: "/community/IMG-20260512-WA0054.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 500,
  },
  {
    id: "8",
    img: "/community/IMG-20260512-WA0059.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 360,
  },
  {
    id: "9",
    img: "/community/IMG-20260512-WA0061.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 520,
  },
  {
    id: "10",
    img: "/community/IMG-20260512-WA0063.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 390,
  },
  {
    id: "11",
    img: "/community/IMG-20260512-WA0064.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 480,
  },
  {
    id: "12",
    img: "/community/IMG-20260512-WA0067.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 560,
  },
  {
    id: "13",
    img: "/community/IMG-20260517-WA0043.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 370,
  },
  {
    id: "14",
    img: "/community/IMG-20260517-WA0044.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 510,
  },
  {
    id: "15",
    img: "/community/IMG-20260517-WA0046.jpg",
    url: "https://www.instagram.com/happinesscoachingacademy",
    height: 430,
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="relative px-4 py-24 md:py-32 overflow-hidden bg-gradient-to-b from-transparent via-[var(--cream-deep)]/20 to-transparent">
      {/* Blended Glowing Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Mustard Yellow Glow Orb */}
        <div
          className="absolute -top-[10%] right-[10%] h-[500px] w-[500px] rounded-full opacity-[0.22] blur-[110px] animate-aurora"
          style={{
            background: "radial-gradient(circle, var(--mustard) 0%, transparent 70%)",
          }}
        />
        {/* Soft Purple Glow Orb */}
        <div
          className="absolute -bottom-[10%] left-[5%] h-[550px] w-[550px] rounded-full opacity-[0.18] blur-[120px] animate-aurora-slow"
          style={{
            background: "radial-gradient(circle, var(--purple-brand) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header Elements */}
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--purple-brand)]/20 bg-[var(--purple-brand)]/5 px-4 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[var(--purple-brand)] uppercase"
          >
            <Users className="h-3 w-3 text-[var(--purple-brand)] fill-[var(--purple-brand)]/15" />
            Community
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="font-display mt-6 text-balance text-4xl font-bold leading-[1.05] text-[var(--nature-black)] md:text-5xl lg:text-[62px]"
          >
            A Thriving Community<br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-gradient-to-r from-[var(--purple-brand)] via-[#C040A0] to-[var(--mustard)] bg-clip-text text-transparent">
                Growing Together
              </span>
              <SmileArc className="absolute -bottom-2.5 left-0 h-4 w-full text-[var(--mustard)]" strokeWidth={2.6} />
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="mt-8 text-[var(--nature-black)]/65 md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Real people. Real connections. Real transformation. Become a part of a supportive community that inspires, heals, and uplifts every step of your journey.
          </motion.p>
        </div>

        {/* Masonry Layout Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[400px] w-full"
        >
          <Masonry
            items={communityImages}
            ease="power3.out"
            duration={0.7}
            stagger={0.06}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.97}
            blurToFocus={true}
            colorShiftOnHover={true}
          />
        </motion.div>

        {/* Bottom Call To Action */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--purple-brand)]/5 border border-[var(--purple-brand)]/15 px-7 py-3.5 text-[14px] font-bold text-[var(--purple-brand)] transition-all hover:bg-[var(--purple-brand)]/10 hover:scale-[1.02]"
          >
            <Sparkles className="h-4.5 w-4.5 text-[var(--purple-brand)] animate-pulse" />
            Join Our Vibrant Community
            <ArrowRight className="h-4 w-4 ml-1 stroke-[2.2]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
