"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import PageWrapper from "@/components/layout/page-wrapper";

/* ─── Image data ─────────────────────────────────────────────────────────── */
const communityImages = [
  { id: "1",  img: "/community/IMG-20260512-WA0030.webp" },
  { id: "2",  img: "/community/IMG-20260512-WA0031.webp" },
  { id: "3",  img: "/community/IMG-20260512-WA0046.webp" },
  { id: "4",  img: "/community/IMG-20260512-WA0048.webp" },
  { id: "5",  img: "/community/IMG-20260512-WA0052.webp" },
  { id: "6",  img: "/community/IMG-20260512-WA0053.webp" },
  { id: "7",  img: "/community/IMG-20260512-WA0054.webp" },
  { id: "8",  img: "/community/IMG-20260512-WA0059.webp" },
  { id: "9",  img: "/community/IMG-20260512-WA0061.webp" },
  { id: "10", img: "/community/IMG-20260512-WA0063.webp" },
  { id: "11", img: "/community/IMG-20260512-WA0064.webp" },
  { id: "12", img: "/community/IMG-20260512-WA0067.webp" },
  { id: "13", img: "/community/IMG-20260517-WA0043.webp" },
  { id: "14", img: "/community/IMG-20260517-WA0044.webp" },
  { id: "15", img: "/community/IMG-20260517-WA0046.webp" },
];

/* Split images into two rows */
const row1 = communityImages.slice(0, 8);
const row2 = communityImages.slice(7, 15);

/* ─── Single image card ──────────────────────────────────────────────────── */
function CommunityCard({ img, id }: { img: string; id: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://www.instagram.com/happinesscoachingacademy"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-shrink-0 overflow-hidden rounded-[20px] block group"
      style={{
        width: "220px",
        height: "165px",
        boxShadow: hovered
          ? "0 0 0 2px rgba(128,0,128,0.35), 8px 8px 24px rgba(128,0,128,0.18), -4px -4px 16px rgba(255,255,255,0.9)"
          : "6px 6px 16px rgba(165,140,217,0.10), -4px -4px 12px rgba(255,255,255,0.85)",
        transition: "box-shadow 0.4s ease",
        border: hovered ? "1.5px solid rgba(128,0,128,0.25)" : "1.5px solid rgba(255,255,255,0.6)",
      }}
    >
      {/* Image */}
      <Image
        src={img}
        alt={`HCA community moment ${id}`}
        fill
        sizes="220px"
        className="object-cover transition-transform duration-500 ease-out"
        style={{
          transform: hovered ? "scale(1.10)" : "scale(1.0)",
        }}
      />

      {/* Hover overlay — purple tinted gradient + Instagram CTA */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-400"
        style={{
          background: "linear-gradient(to top, rgba(80,0,80,0.75) 0%, rgba(128,0,128,0.25) 50%, transparent 100%)",
          opacity: hovered ? 1 : 0,
        }}
      >
        <span className="text-white text-[11px] font-bold uppercase tracking-widest flex items-center gap-1">
          View on Instagram <span className="text-[13px]">↗</span>
        </span>
      </div>

      {/* Subtle always-on bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </a>
  );
}

/* ─── Marquee row ────────────────────────────────────────────────────────── */
function MarqueeRow({
  images,
  direction = "left",
  speed = 35,
}: {
  images: typeof communityImages;
  direction?: "left" | "right";
  speed?: number;
}) {
  const [paused, setPaused] = useState(false);
  // Duplicate for seamless loop
  const doubled = [...images, ...images];

  const animationName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      className="relative overflow-hidden w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left fade mask */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #F6F3FA 0%, transparent 100%)",
        }}
      />
      {/* Right fade mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #F6F3FA 0%, transparent 100%)",
        }}
      />

      {/* Scrolling track */}
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((item, i) => (
          <CommunityCard key={`${item.id}-${i}`} img={item.img} id={item.id} />
        ))}
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export function CommunitySection() {
  return (
    <PageWrapper id="community" className="relative py-20 overflow-visible">



      {/* ── 2-Column layout: text left | marquee right ── */}
      <div className="grid items-start gap-16 lg:grid-cols-12 relative z-10">

        {/* ── LEFT: Heading & Description (span 4) ── */}
        <div className="lg:col-span-4 flex flex-col gap-7 lg:sticky lg:top-32">

          {/* Neumorphic Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
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

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-satoshi font-black leading-[1.15] tracking-tight neumorphic-text-embossed"
            style={{ fontSize: "clamp(28px, 3.4vw, 48px)", color: "#2A254B" }}
          >
            <span className="block">A Thriving Community</span>
            <span className="block">
              <span className="relative inline-block" style={{ color: "#800080" }}>
                Growing
                <span
                  className="absolute bottom-0 left-[-2px] w-[calc(100%+4px)] h-[9px] rounded-[3px] -z-10"
                  style={{ background: "#FFCE1B", opacity: 0.38 }}
                />
              </span>{" "}
              Together
            </span>
          </motion.h2>

          {/* Subtext */}
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

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex pt-2"
          >
            <motion.a
              href="https://www.instagram.com/happinesscoachingacademy"
              target="_blank"
              rel="noopener noreferrer"
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

          {/* Animated accent line */}
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

        {/* ── RIGHT: Dual marquee rows (span 8) ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="lg:col-span-8 flex flex-col gap-4 overflow-hidden"
        >
          {/* Row 1 — scrolls left (→) */}
          <MarqueeRow images={row1} direction="left" speed={38} />

          {/* Row 2 — scrolls right (←), hidden on mobile to keep it clean */}
          <div className="hidden sm:block">
            <MarqueeRow images={row2} direction="right" speed={42} />
          </div>

          {/* Row 3 — extra row on large screens only */}
          <div className="hidden lg:block">
            <MarqueeRow images={row1.slice(2)} direction="left" speed={34} />
          </div>
        </motion.div>

      </div>
    </PageWrapper>
  );
}
