"use client";

import { motion } from "framer-motion";
import { Users, Sparkles, ArrowUpRight } from "lucide-react";
import PageWrapper from "@/components/layout/page-wrapper";
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
    <PageWrapper className="relative py-28 overflow-visible">

      {/* ── Ambient glow orbs for visual interest ── */}
      <div
        className="pointer-events-none absolute -top-16 left-[-10%] w-[460px] h-[460px] rounded-full blur-[130px] opacity-[0.14]"
        style={{ background: "rgba(128,0,128,0.13)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[420px] h-[420px] rounded-full blur-[120px] opacity-[0.12]"
        style={{ background: "rgba(255,206,27,0.14)" }}
      />

      {/* ── 2-Column layout: text left | masonry right ── */}
      <div className="grid items-center gap-16 lg:grid-cols-12 relative z-10 overflow-visible">

        {/* ── LEFT: Heading & Description Block (span 4) ── */}
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
                color: "rgba(128,0,128,0.75)",
                background: "linear-gradient(145deg, #ffffff, #f4efff)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: `
                  6px 6px 16px rgba(165,140,217,0.12),
                  -6px -6px 16px rgba(255,255,255,0.95),
                  inset 1px 1px 2px rgba(255,255,255,0.9)
                `,
              }}
            >
              {/* Pulsing Dot */}
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: "rgba(128,0,128,0.5)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: "#800080" }}
                />
              </span>
              Community
            </span>
          </motion.div>

          {/* Heading with Underline Marker */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-satoshi font-black leading-[1.15] tracking-tight neumorphic-text-embossed"
            style={{ fontSize: "clamp(28px, 3.4vw, 48px)", color: "#2A254B" }}
          >
            <span className="block">A Thriving Community</span>
            <span className="block">
              <span className="relative inline-block" style={{ color: "#800080" }}>
                Growing
                {/* Mustard marker underline */}
                <span
                  className="absolute bottom-0 left-[-2px] w-[calc(100%+4px)] h-[9px] rounded-[3px] -z-10"
                  style={{ background: "#FFCE1B", opacity: 0.38 }}
                />
              </span>{" "}
              Together
            </span>
          </motion.h2>

          {/* Subtext Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-[15px] sm:text-[16px] leading-[1.9] font-medium max-w-[360px]"
            style={{ color: "rgba(42,37,75,0.60)" }}
          >
            Real people. Real connections. Real transformation. Become a part of a supportive community that inspires, heals, and uplifts every step of your journey.
          </motion.p>

          {/* Join Community Neumorphic CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex pt-2"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full font-semibold text-[14px] transition-all duration-500 cursor-pointer"
              style={{
                color: "#800080",
                background: "linear-gradient(145deg, #ffffff, #f4efff)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: `
                  6px 6px 15px rgba(166,140,255,0.10),
                  -6px -6px 15px rgba(255,255,255,1),
                  inset 1px 1px 2px rgba(255,255,255,1)
                `,
              }}
            >
              <Sparkles className="h-4 w-4 text-[var(--purple-brand)] animate-pulse" />
              <span>Join Our Vibrant Community</span>
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full text-white transition-transform duration-300 group-hover/btn:rotate-45"
                style={{ background: "linear-gradient(145deg, #800080, #C084FC)" }}
              >
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
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
              background: "rgba(243,238,250,0.6)",
              boxShadow: "inset 3px 3px 6px rgba(165,140,217,0.10), inset -3px -3px 6px rgba(255,255,255,0.95)",
              border: "1px solid rgba(255,255,255,0.7)",
              transformOrigin: "left center",
            }}
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 rounded-full"
              style={{ background: "linear-gradient(90deg, #800080, #C084FC)", width: "40%" }}
              animate={{ x: [0, 32, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* ── RIGHT: Masonry Bento Grid (span 8) ── */}
        <div className="lg:col-span-8 relative">
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
        </div>

      </div>
    </PageWrapper>
  );
}
