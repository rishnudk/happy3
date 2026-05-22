"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PageWrapper from "@/components/layout/page-wrapper";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface Reel {
  id: number;
  userName: string;
  avatar: string;
  time: string;
  poster: string;
  videoUrl: string;
  quote: string;
  highlight: string;
}

const reels: Reel[] = [
  {
    id: 1,
    userName: "hca_official",
    avatar: "/home/logo.svg",
    time: "2h",
    poster: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.instagram.com/reel/DYU2CJRtX26/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    quote: "“HCA helped me overcome anxiety and find inner peace.”",
    highlight: "overcome anxiety",
  },
  {
    id: 2,
    userName: "hca_official",
    avatar: "/home/logo.svg",
    time: "2h",
    poster: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.instagram.com/reel/DYR8XaJNAFD/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    quote: "“The coaching certification changed my life and career.”",
    highlight: "certification changed",
  },
  {
    id: 3,
    userName: "hca_official",
    avatar: "/home/logo.svg",
    time: "2h",
    poster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.instagram.com/reel/DYFCNYAC62O/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    quote: "“I healed emotionally and rebuilt my self-confidence.”",
    highlight: "and rebuilt my",
  },
  {
    id: 4,
    userName: "hca_official",
    avatar: "/home/logo.svg",
    time: "2h",
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.instagram.com/reel/DX1hvXAz58T/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    quote: "“The Happiness Code workshops transformed our entire team.”",
    highlight: "workshops transformed",
  },
];

// Double the reels for seamless looping in the infinite auto-scrolling carousel
const doubledReels = [...reels, ...reels];

function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      // Pause all other playing videos
      const allVideos = document.querySelectorAll("video");
      allVideos.forEach((v) => {
        if (v !== videoRef.current) {
          (v as HTMLVideoElement).pause();
        }
      });

      videoRef.current.play().catch((err) => console.log("Play blocked:", err));
      setIsPlaying(true);
    }
  };

  const handleMouseEnter = () => {
    if (!videoRef.current) return;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => console.log("Autoplay blocked:", err));
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleVolumeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-[#FFCE1B] font-bold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handlePlayPause}
      className="relative aspect-[9/16] w-[220px] sm:w-[245px] flex-shrink-0 overflow-hidden rounded-[32px] border border-white/20 bg-gray-950 shadow-[0_20px_50px_rgba(0,0,0,0.15)] cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_25px_52px_rgba(0,0,0,0.25)] group"
    >
      {/* Fallback Static Poster Image */}
      <Image
        src={reel.poster}
        alt={reel.quote}
        fill
        sizes="245px"
        className={`object-cover transition-opacity duration-700 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video Element */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        loop
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Top and Bottom Dark Overlays */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />

      {/* Top Header Row */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
        <div className="flex items-center gap-2.5">
          <div className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-[#800080] bg-white p-0.5">
            <Image src={reel.avatar} alt={reel.userName} fill className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white leading-tight">
              {reel.userName}
            </span>
            <span className="text-[8.5px] text-white/70 leading-none">
              {reel.time}
            </span>
          </div>
        </div>
        <button className="text-white hover:text-white/80 p-1">
          <MoreVertical className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Center Large Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`h-11 w-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-xl transition-all duration-300 ${
          isPlaying ? "opacity-0 scale-75" : "opacity-100 scale-100 group-hover:bg-white/30"
        }`}>
          <Play className="h-4.5 w-4.5 fill-white stroke-none translate-x-[1px]" />
        </div>
      </div>

      {/* Reel Caption Overlay */}
      <div className="absolute inset-x-0 bottom-10 z-10 px-4 text-white select-none">
        <blockquote className="text-[13px] font-semibold leading-relaxed font-sans text-white/95">
          {highlightText(reel.quote, reel.highlight)}
        </blockquote>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-3 pb-3">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="text-white hover:text-white/80 transition-colors p-1"
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5 fill-white stroke-none" />
          ) : (
            <Play className="h-3.5 w-3.5 fill-white stroke-none" />
          )}
        </button>

        {/* Progress Timeline */}
        <div className="flex-1 mx-2.5 h-[3px] bg-white/30 rounded-full overflow-hidden relative">
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#FFCE1B] rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Volume Button */}
        <button
          onClick={handleVolumeToggle}
          className="text-white hover:text-white/80 transition-colors p-1"
        >
          {isMuted ? (
            <VolumeX className="h-3.5 w-3.5" />
          ) : (
            <Volume2 className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 265; // card width + gap
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Continuous auto-scroll loop animation
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scrollSpeed = 0.5; // Scroll speed in pixels per frame

    const scrollStep = () => {
      if (!isHovered && container) {
        container.scrollLeft += scrollSpeed;

        // Infinite loop wrapping logic
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <PageWrapper className="relative py-28 overflow-visible">

      {/* ── Ambient glow orbs for visual interest ── */}
      <div
        className="pointer-events-none absolute -top-16 left-[-8%] w-[420px] h-[420px] rounded-full blur-[120px] opacity-[0.12]"
        style={{ background: "rgba(255,206,27,0.14)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[460px] h-[460px] rounded-full blur-[130px] opacity-[0.15]"
        style={{ background: "rgba(128,0,128,0.14)" }}
      />

      {/* ── 2-Column layout: text left | cards/reels right ── */}
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
              Testimonials
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
            <span className="block">Real Stories.</span>
            <span className="block">Real Transformation.</span>
            <span className="block">
              Real{" "}
              <span className="relative inline-block" style={{ color: "#800080" }}>
                Impact.
                {/* Mustard marker underline */}
                <span
                  className="absolute bottom-0 left-[-2px] w-[calc(100%+4px)] h-[9px] rounded-[3px] -z-10"
                  style={{ background: "#FFCE1B", opacity: 0.38 }}
                />
              </span>
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
            Hear from individuals whose lives have been transformed through HCA&apos;s programs and guidance.
          </motion.p>

          {/* More Stories Instagram Neumorphic Button */}
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
              <span>More stories on Instagram</span>
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full text-white transition-transform duration-300 group-hover/btn:rotate-45"
                style={{ background: "linear-gradient(145deg, #800080, #C084FC)" }}
              >
                <InstagramIcon className="h-3.5 w-3.5 text-white" />
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

        {/* ── RIGHT: Reels Carousel Container (span 8) ── */}
        <div className="lg:col-span-8 relative overflow-visible">
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left Chevron Button Overlay */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-[-20px] top-1/2 z-20 -translate-y-1/2 h-10 w-10 rounded-full neumorphic-raised flex items-center justify-center text-[#800080] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer bg-white/95 border border-white"
              style={{
                boxShadow: "6px 6px 12px rgba(165,140,217,0.12), -6px -6px 12px rgba(255,255,255,0.95)"
              }}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
            </button>

            {/* Scrolling Viewport */}
            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto no-scrollbar py-4 px-3 cursor-grab active:cursor-grabbing select-none"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {doubledReels.map((reel, index) => (
                <ReelCard key={`${reel.id}-${index}`} reel={reel} />
              ))}
            </div>

            {/* Right Chevron Button Overlay */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-[-20px] top-1/2 z-20 -translate-y-1/2 h-10 w-10 rounded-full neumorphic-raised flex items-center justify-center text-[#800080] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer bg-white/95 border border-white"
              style={{
                boxShadow: "6px 6px 12px rgba(165,140,217,0.12), -6px -6px 12px rgba(255,255,255,0.95)"
              }}
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>

      {/* Inline style block to hide scrollbars */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />
    </PageWrapper>
  );
}
