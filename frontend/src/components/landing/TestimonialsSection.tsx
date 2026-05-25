"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
} from "lucide-react";
import { InstagramIcon } from "../ui/SocialIcons";

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
            <span key={i} className="text-[var(--mustard)] font-bold">
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
      className="relative aspect-[9/16] w-[280px] sm:w-[310px] flex-shrink-0 overflow-hidden rounded-[32px] border border-white/20 bg-gray-950 shadow-[0_20px_50px_rgba(0,0,0,0.3)] cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)] group"
    >
      {/* Fallback Static Poster Image */}
      <img
        src={reel.poster}
        alt={reel.quote}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
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
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* Top Header Row */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
        <div className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-[var(--purple-brand)] bg-white p-0.5">
            <img src={reel.avatar} alt={reel.userName} className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white leading-tight">
              {reel.userName}
            </span>
            <span className="text-[10px] text-white/70 leading-none">
              {reel.time}
            </span>
          </div>
        </div>
        <button className="text-white hover:text-white/80 p-1">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Center Large Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-xl transition-all duration-300 ${
          isPlaying ? "opacity-0 scale-75" : "opacity-100 scale-100 group-hover:bg-white/30"
        }`}>
          <Play className="h-6 w-6 fill-white stroke-none translate-x-[2px]" />
        </div>
      </div>

      {/* Reel Caption Overlay */}
      <div className="absolute inset-x-0 bottom-12 z-10 px-5 text-white select-none">
        <blockquote className="text-[15px] font-semibold leading-relaxed font-sans text-white/95">
          {highlightText(reel.quote, reel.highlight)}
        </blockquote>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-4 pb-4">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="text-white hover:text-white/80 transition-colors p-1"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 fill-white stroke-none" />
          ) : (
            <Play className="h-4 w-4 fill-white stroke-none" />
          )}
        </button>

        {/* Progress Timeline */}
        <div className="flex-1 mx-3 h-[3px] bg-white/30 rounded-full overflow-hidden relative">
          <div
            className="absolute left-0 top-0 bottom-0 bg-[var(--mustard)] rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Volume Button */}
        <button
          onClick={handleVolumeToggle}
          className="text-white hover:text-white/80 transition-colors p-1"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
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
      const scrollAmount = 330; // card width + gap
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
    const scrollSpeed = 0.6; // Scroll speed in pixels per frame

    const scrollStep = () => {
      if (!isHovered && container) {
        container.scrollLeft += scrollSpeed;

        // Infinite loop wrapping logic
        // When we have scrolled past the first half of the elements, snap back to 0
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
    <section id="testimonials" className="relative px-4 py-24 md:py-32 overflow-hidden">
      {/* Decorative crescent shape backgrounds matching branding */}
      <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-[var(--purple-brand)]/15 opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--mustard-soft)]/20 opacity-30 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header Elements */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--purple-brand)]/20 bg-[var(--purple-brand)]/8 px-4 py-1.5 text-[11px] font-bold tracking-widest text-[var(--purple-brand)] uppercase">
            <Star className="h-3 w-3 fill-[var(--purple-brand)] text-[var(--purple-brand)]" />
            Testimonials
          </div>
          
          <h2 className="font-display mt-5 text-balance text-4xl font-bold leading-[1.05] text-[var(--nature-black)] md:text-5xl lg:text-[62px]">
            Real Stories. Real Transformation.<br />
            <span className="text-[var(--mustard)]">Real Impact.</span>
          </h2>
          
          <p className="mt-5 text-[var(--nature-black)]/65 md:text-lg max-w-2xl mx-auto leading-relaxed">
            Hear from individuals whose lives have been transformed through HCA&apos;s programs and guidance.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative mt-12 md:mt-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Arrow Navigation Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 h-12 w-12 rounded-full bg-white flex items-center justify-center border border-gray-150 shadow-[0_6px_20px_rgba(0,0,0,0.08)] text-[var(--purple-brand)] hover:scale-105 transition-transform duration-200"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
          </button>

          {/* Carousel Scroll Area */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto no-scrollbar py-6 px-4 cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {doubledReels.map((reel, index) => (
              <ReelCard key={`${reel.id}-${index}`} reel={reel} />
            ))}
          </div>

          {/* Right Arrow Navigation Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-3 sm:translate-x-6 h-12 w-12 rounded-full bg-white flex items-center justify-center border border-gray-150 shadow-[0_6px_20px_rgba(0,0,0,0.08)] text-[var(--purple-brand)] hover:scale-105 transition-transform duration-200"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Bottom CTA (More Stories on Instagram) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-14 text-center"
        >
          <a
            href="https://www.instagram.com/happinesscoachingacademy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--purple-brand)]/5 border border-[var(--purple-brand)]/15 px-6 py-3 text-[14px] font-bold text-[var(--purple-brand)] transition-all hover:bg-[var(--purple-brand)]/10 hover:scale-[1.02]"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#FFCD1B]/15 to-[#800080]/15 flex items-center justify-center mr-1">
              <InstagramIcon className="h-4.5 w-4.5 text-[var(--purple-brand)]" />
            </div>
            More stories on Instagram
            <ArrowRight className="h-4 w-4 ml-1 stroke-[2.2]" />
          </a>
        </motion.div>

      </div>
      
      {/* Hide scrollbar CSS */}
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
    </section>
  );
}
