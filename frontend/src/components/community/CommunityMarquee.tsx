"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { COMMUNITY_IMAGES } from "./data";
import { MarqueeImage } from "./types";

/* ─── Single Image Card ──────────────────────────────────────────────────── */
function CommunityCard({ img, id }: { img: string; id: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://www.instagram.com/happinesscoachingacademy"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-shrink-0 overflow-hidden rounded-[20px] block group cursor-pointer"
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

      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </a>
  );
}

/* ─── Marquee Row Track ─────────────────────────────────────────────────── */
interface MarqueeRowProps {
  images: MarqueeImage[];
  direction?: "left" | "right";
  speed?: number;
}

function MarqueeRow({
  images,
  direction = "left",
  speed = 35,
}: MarqueeRowProps) {
  const [paused, setPaused] = useState(false);
  const doubled = [...images, ...images];
  const animationName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      className="relative overflow-hidden w-full py-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
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

/* ─── Main Marquee System ───────────────────────────────────────────────── */
export default function CommunityMarquee() {
  const row1 = COMMUNITY_IMAGES.slice(0, 8);
  const row2 = COMMUNITY_IMAGES.slice(7, 15);

  const smoothReveal = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: smoothReveal }}
      className="relative flex flex-col gap-5 overflow-hidden w-full max-w-6xl mx-auto rounded-[32px] p-6 mb-20 relative z-10"
      style={{
        background: "rgba(255,255,255,0.45)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 15px 45px rgba(165,140,217,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Left & Right gradient masks for high-fidelity seamless scroll */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-white/70 via-white/10 to-transparent rounded-l-[32px]" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-white/70 via-white/10 to-transparent rounded-r-[32px]" />

      <h4 className="font-satoshi font-black text-center text-[15px] tracking-wider text-slate-400 uppercase mb-2">
        Moments From Our Instagram
      </h4>

      {/* Track 1 - Left scroll */}
      <MarqueeRow images={row1} direction="left" speed={38} />

      {/* Track 2 - Right scroll */}
      <MarqueeRow images={row2} direction="right" speed={42} />

    </motion.div>
  );
}
