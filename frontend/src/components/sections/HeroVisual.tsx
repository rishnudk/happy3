"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SmileArc from "./SmileArc";
import FloatingTag from "./FloatingTag";

export default function HeroVisual() {
  return (
<div
      className="
        lg:col-span-5
        relative
        isolate
        lg:-mt-16
        lg:-translate-x-10
        flex
        justify-center
        items-center
        min-h-[420px]
        sm:min-h-[560px]
        lg:min-h-[640px]
        w-full
        overflow-visible
      "
    >
      {/* ═══════════════════════════════════════════════
          -z-20 → BACKGROUND GLOW LAYER
          ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 -z-20 flex justify-center items-center pointer-events-none overflow-visible">
        <div
          className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full opacity-30 filter blur-[80px]"
          style={{
            background: "radial-gradient(circle, rgba(0, 0, 0, 0.12) 0%, rgba(255,206,27,0.06) 50%, transparent 100%)"
          }}
        />

        {/* Secondary atmospheric glow — wider and softer */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.18, 0.25, 0.18] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute w-[400px] h-[400px] sm:w-[520px] sm:h-[520px] lg:w-[600px] lg:h-[600px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(39, 8, 81, 0.12) 0%, rgba(94, 27, 94, 0.04) 40%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════
          -z-10 → RINGS LAYER (Emotional Orbit System)
          ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center pointer-events-none overflow-visible">
        {/* ARC 1: Outermost Atmosphere Ring — ultra-subtle, large */}
        <SmileArc
          variant="atmosphere"
          size="w-[270px] h-[270px] sm:w-[370px] sm:h-[370px] lg:w-[440px] lg:h-[440px]"
          className="opacity-40"
          delay={0.2}
          direction={1}
          rotationDuration={65}
          borderStyle={{
            border: "1px solid rgba(200, 170, 240, 0.12)",
            boxShadow: "0 0 60px rgba(128,0,128,0.03), inset 0 0 40px rgba(200,170,240,0.02)",
          }}
        />

        {/* ARC 2: Outer Emotional Ring — thick partial border, slow reverse rotation */}
        <SmileArc
          variant="emotional-ring"
          size="w-[245px] h-[245px] sm:w-[335px] sm:h-[335px] lg:w-[395px] lg:h-[395px]"
          className="opacity-50"
          delay={0.3}
          direction={-1}
          rotationDuration={55}
          borderStyle={{
            border: "16px solid rgba(114, 43, 208, 0.12)",
            borderTopColor: "transparent",
            borderBottomColor: "rgba(188, 48, 188, 0.06)",
            borderRightColor: "rgba(219, 11, 11, 0.08)",
            borderLeftColor: "rgba(172, 122, 238, 0.14)",
          }}
        />

        {/* ARC 3: Middle Conic Glow Ring — conic gradient, forward rotation */}
        <SmileArc
          variant="conic-glow"
          size="w-[215px] h-[215px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px]"
          className="opacity-60"
          delay={0.4}
          direction={1}
          rotationDuration={45}
          gradientStyle={{
            background: `conic-gradient(
              from 45deg,
              rgba(163, 105, 220, 0.1) 0deg,
              rgba(135, 116, 231, 0.14) 50deg,
              transparent 110deg,
              rgba(233, 133, 133, 0.1) 180deg,
              transparent 240deg,
              rgba(38, 195, 140, 0.08) 300deg,
              transparent 180deg
            )`,
          }}
        />

        {/* ARC 4: Inner Blur Halo — soft radial glow, breathing */}
        <SmileArc
          variant="blur-halo"
          size="w-[200px] h-[200px] sm:w-[270px] sm:h-[270px] lg:w-[325px] lg:h-[325px]"
          className="opacity-70"
          delay={0.5}
          gradientStyle={{
            background: `radial-gradient(
              ellipse at center,
              transparent 50%,
              rgba(108, 25, 216, 0.14) 62%,
              rgba(213, 48, 213, 0.08) 75%,
              rgba(212, 177, 50, 0.04) 85%,
              transparent 95%
            )`,
          }}
        />

        {/* ARC 5: Smile-Inspired Lower Arc — bottom crescent, gentle sway */}
        <SmileArc
          variant="smile-lower"
          size="w-[225px] h-[225px] sm:w-[315px] sm:h-[315px] lg:w-[370px] lg:h-[370px]"
          className="opacity-45"
          delay={0.6}
          direction={1}
          borderStyle={{
            border: "12px solid transparent",
            borderBottomColor: "rgba(255, 206, 27, 0.15)",
            borderLeftColor: "rgba(200, 170, 240, 0.08)",
            borderRightColor: "rgba(125, 50, 222, 0.08)",
            borderTopColor: "transparent",
          }}
        />

        {/* ARC 6: Inner Emotional Ring — tighter, reverse, thinner */}
        <SmileArc
          variant="emotional-ring"
          size="w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px]"
          className="opacity-35"
          delay={0.7}
          direction={1}
          rotationDuration={40}
          borderStyle={{
            border: "8px solid rgba(255, 255, 255, 0.12)",
            borderTopColor: "rgba(200, 170, 240, 0.10)",
            borderBottomColor: "transparent",
            borderRightColor: "transparent",
            borderLeftColor: "rgba(128, 0, 128, 0.06)",
          }}
        />

        {/* NEW PERFECT ORBIT TRACK CIRCLE */}
        <div
          className="
            absolute
            w-[290px] h-[290px]
            sm:w-[390px] sm:h-[390px]
            lg:w-[480px] lg:h-[480px]
            rounded-full
            border-[1.5px] border-dashed border-[#800080]/15
            pointer-events-none
            z-0
            flex items-center justify-center
          "
        >
          {/* Subtle breathing animation */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dotted border-[#800080]/10"
            animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          z-[70] → IMAGE LAYER (Portrait)
          ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1,
        }}
        className="
          relative
          w-[215px] h-[215px]
          sm:w-[273px] sm:h-[273px]
          lg:w-[332px] lg:h-[332px]
          rounded-full
          p-2
          z-[70]
          overflow-visible
        "
        style={{
          background: "transparent",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-8 sm:inset-10 rounded-full bg-[#F6F3FA] pointer-events-none z-0"
        />

        <div
          aria-hidden
          className="absolute inset-4 sm:inset-5 rounded-full pointer-events-none z-[5]"
          style={{
            background: `conic-gradient(
              from 215deg,
              rgba(255,255,255,0.92) 0deg,
              rgba(245,208,254,0.72) 48deg,
              rgba(220,199,232,0.88) 108deg,
              rgba(252,250,255,0.9) 170deg,
              rgba(255,206,27,0.35) 224deg,
              rgba(230,220,242,0.85) 292deg,
              rgba(255,255,255,0.92) 360deg
            )`,
            boxShadow: `
              10px 10px 24px rgba(128,0,128,0.08),
              -10px -10px 22px rgba(255,255,255,0.9),
              inset 2px 2px 5px rgba(255,255,255,0.85),
              inset -3px -3px 8px rgba(128,0,128,0.08)
            `,
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 20px), #000 calc(100% - 19px))",
            mask:
              "radial-gradient(farthest-side, transparent calc(100% - 20px), #000 calc(100% - 19px))",
          }}
        />

        {/* Neumorphic rim */}
        <div className="absolute inset-8 sm:inset-10 rounded-full border border-white/60 pointer-events-none z-20" />

        {/* Top soft highlight */}
        <div
          className="
            absolute
            top-[42px]
            left-1/2
            -translate-x-1/2
            w-[42%]
            h-[8px]
            rounded-full
            bg-white/50
            blur-[4px]
            pointer-events-none
            z-20
          "
        />

        {/* Portrait background plate */}
        <div
          className="
            absolute
            inset-8
            sm:inset-10
            rounded-full
            overflow-hidden
            border-[4px]
            sm:border-[6px]
            border-white/80
            z-10
          "
          style={{
            background:
              "radial-gradient(circle at 35% 25%, #FCFAFF 0%, #FAF8FD 38%, #F6F3FA 72%, #E7DEE7 100%)",
            boxShadow: `
              inset 4px 4px 10px rgba(128,0,128,0.06),
              inset -4px -4px 10px rgba(255,255,255,0.95)
            `,
          }}
        />

        {/* Transparent PNG cutout. This is intentionally not clipped by the circle. */}
        <Image
          src="/images/hero.png"
          alt="Shabna Sulthan - Founder, Happiness Coaching Academy"
          fill
          priority
          sizes="(max-width: 640px) 215px, (max-width: 1024px) 273px, 332px"
          className="
            z-30
            object-contain
            object-center
            pointer-events-none
            transition-transform
            duration-700
          "
          style={{
            transform: "translateY(-2%) scale(1.45)",
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════
          -z-10 → BRAND ARC LAYER (Primary Smile Arc)
          ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[80] flex justify-center items-center pointer-events-none overflow-visible">
        <SmileArc
          variant="hero-smile"
          className="absolute w-[290px] sm:w-[350px] lg:w-[410px] translate-y-[150px] sm:translate-y-[180px] lg:translate-y-[225px]"
          delay={0.4}
        />
      </div>

      {/* ═══════════════════════════════════════════════
          z-[90] → FLOATING TAGS LAYER (Respecting the Orbit)
          ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[90] pointer-events-none flex justify-center items-center overflow-visible">
        <div className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[540px] lg:h-[540px] pointer-events-none overflow-visible">
          {/* Tag A: Mindset Shift — Top-Left (~10:30 o'clock) */}
          <FloatingTag
            label="Mindset Shift"
            iconName="Brain"
            iconColor="text-white"
            iconBg="#800080"
            className="
              top-[30%] left-[-10%]
              sm:top-[28%] sm:left-[-12%]
              lg:top-[20%] lg:left-[-5%]
            "
            delay={0.15}
            yRange={[0, -9, 0]}
            duration={5.2}
          />

          {/* Tag B: Awareness — Top-Right (~1:30 o'clock) */}
          <FloatingTag
            label="Awareness"
            iconName="Sun"
            iconColor="text-white"
            iconBg="#FFCE1B"
            className="
              top-[10%] right-[-75%]
              sm:top-[8%] sm:right-[-80%]
              lg:top-[9%] lg:right-[-80%]
            "
            delay={0.3}
            yRange={[0, 9, 0]}
            duration={4.8}
          />

          {/* Tag C: Emotional Clarity — Bottom-Left (~7:30 o'clock) */}
          <FloatingTag
            label={<>Emotional<br />Clarity</>}
            iconName="Heart"
            iconColor="text-white"
            iconBg="#FFCE1B"
            className="
              bottom-[-48%] left-[-22%]
              sm:bottom-[-42%] sm:left-[-12%]
              lg:bottom-[-52%] lg:left-[-18%]
            "
            delay={0.45}
            yRange={[0, -11, 0]}
            duration={5.6}
          />

          {/* Tag D: Loneliness — Bottom-Right (~4:30 o'clock) */}
          <FloatingTag
            label="Loneliness"
            iconName="UserRound"
            iconColor="text-white"
            iconBg="#800080"
            className="
              bottom-[-32%] right-[-85%]
              sm:bottom-[-32%] sm:right-[-84%]
              lg:bottom-[-34%] lg:right-[-85%]
            "
            delay={0.6}
            yRange={[0, 8, 0]}
            duration={5}
          />
        </div>
      </div>
    </div>
  );
}
