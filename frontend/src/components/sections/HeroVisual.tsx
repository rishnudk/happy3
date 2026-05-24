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
            background: "radial-gradient(circle, rgba(128,0,128,0.12) 0%, rgba(255,206,27,0.06) 50%, transparent 100%)"
          }}
        />

        {/* Secondary atmospheric glow — wider and softer */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.18, 0.25, 0.18] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute w-[400px] h-[400px] sm:w-[520px] sm:h-[520px] lg:w-[600px] lg:h-[600px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(200,170,240,0.12) 0%, rgba(128,0,128,0.04) 40%, transparent 70%)",
            filter: "blur(40px)",
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
          size="w-[300px] h-[300px] sm:w-[410px] sm:h-[410px] lg:w-[490px] lg:h-[490px]"
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
          size="w-[270px] h-[270px] sm:w-[370px] sm:h-[370px] lg:w-[440px] lg:h-[440px]"
          className="opacity-50"
          delay={0.3}
          direction={-1}
          rotationDuration={55}
          borderStyle={{
            border: "16px solid rgba(200, 170, 240, 0.12)",
            borderTopColor: "transparent",
            borderBottomColor: "rgba(128,0,128,0.06)",
            borderRightColor: "rgba(255, 206, 27, 0.08)",
            borderLeftColor: "rgba(200, 170, 240, 0.14)",
          }}
        />

        {/* ARC 3: Middle Conic Glow Ring — conic gradient, forward rotation */}
        <SmileArc
          variant="conic-glow"
          size="w-[240px] h-[240px] sm:w-[330px] sm:h-[330px] lg:w-[390px] lg:h-[390px]"
          className="opacity-60"
          delay={0.4}
          direction={1}
          rotationDuration={45}
          gradientStyle={{
            background: `conic-gradient(
              from 45deg,
              rgba(200, 170, 240, 0.10) 0deg,
              rgba(128, 0, 128, 0.14) 50deg,
              transparent 110deg,
              rgba(255, 206, 27, 0.10) 180deg,
              transparent 240deg,
              rgba(200, 170, 240, 0.08) 300deg,
              transparent 360deg
            )`,
          }}
        />

        {/* ARC 4: Inner Blur Halo — soft radial glow, breathing */}
        <SmileArc
          variant="blur-halo"
          size="w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[360px] lg:h-[360px]"
          className="opacity-70"
          delay={0.5}
          gradientStyle={{
            background: `radial-gradient(
              ellipse at center,
              transparent 50%,
              rgba(200, 170, 240, 0.14) 62%,
              rgba(128, 0, 128, 0.08) 75%,
              rgba(255, 206, 27, 0.04) 85%,
              transparent 95%
            )`,
          }}
        />

        {/* ARC 5: Smile-Inspired Lower Arc — bottom crescent, gentle sway */}
        <SmileArc
          variant="smile-lower"
          size="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[410px] lg:h-[410px]"
          className="opacity-45"
          delay={0.6}
          direction={1}
          borderStyle={{
            border: "12px solid transparent",
            borderBottomColor: "rgba(255, 206, 27, 0.15)",
            borderLeftColor: "rgba(200, 170, 240, 0.08)",
            borderRightColor: "rgba(200, 170, 240, 0.08)",
            borderTopColor: "transparent",
          }}
        />

        {/* ARC 6: Inner Emotional Ring — tighter, reverse, thinner */}
        <SmileArc
          variant="emotional-ring"
          size="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[330px] lg:h-[330px]"
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

        {/* Original thin orbit ring — kept but faded further back */}
        <SmileArc variant="thin-orbit" className="w-[270px] h-[270px] sm:w-[350px] sm:h-[350px] lg:w-[410px] lg:h-[410px] opacity-15" delay={0.2} />
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
          w-[220px] h-[220px]
          sm:w-[280px] sm:h-[280px]
          lg:w-[340px] lg:h-[340px]
          rounded-full
          p-2
          z-[70]
          overflow-visible
        "
        style={{
          background: "linear-gradient(145deg, #FAF8FD, #F2EDF8)",
          boxShadow: `
            12px 12px 30px rgba(128,0,128,0.1),
            -12px -12px 30px rgba(255,255,255,0.95),
            inset 2px 2px 4px rgba(255,255,255,0.9),
            inset -2px -2px 4px rgba(128,0,128,0.04)
          `,
        }}
      >
        {/* Neumorphic rim */}
        <div className="absolute inset-0 rounded-full border border-white/60 pointer-events-none z-20" />

        {/* Top soft highlight */}
        <div
          className="
            absolute
            top-[4px]
            left-1/2
            -translate-x-1/2
            w-[60%]
            h-[8px]
            rounded-full
            bg-white/50
            blur-[4px]
            pointer-events-none
            z-20
          "
        />

        {/* Image container */}
        <div
          className="
            relative
            w-full
            h-full
            rounded-full
            overflow-hidden
            border-[4px]
            sm:border-[6px]
            border-white/80
            z-30
          "
          style={{
            background:
              "linear-gradient(135deg, #F6F3FA, #F2EDF8, #FAF8FD)",
            boxShadow: `
              inset 4px 4px 10px rgba(128,0,128,0.06),
              inset -4px -4px 10px rgba(255,255,255,0.95)
            `,
          }}
        >
          <Image
            src="/images/hero.png"
            alt="Shabna Sulthan - Founder, Happiness Coaching Academy"
            fill
            priority
            sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 340px"
            className="
              object-cover
              object-top
              scale-[1.38]
              translate-y-4
              transition-transform
              duration-700
              hover:scale-[1.44]
            "
          />
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          -z-10 → BRAND ARC LAYER (Primary Smile Arc)
          ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center pointer-events-none overflow-visible">
        <SmileArc
          variant="primary"
          className="absolute bottom-[10%] sm:bottom-[8%] lg:bottom-[6%] w-[220px] sm:w-[280px] lg:w-[320px]"
          delay={0.4}
        />
      </div>

      {/* ═══════════════════════════════════════════════
          z-50 → FLOATING TAGS LAYER
          ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-50 pointer-events-none overflow-visible">
        {/* Badge A: Mindset Shift — Top-Left (~10 o'clock) */}
        <FloatingTag
          label="Mindset Shift"
          iconName="Brain"
          iconColor="text-white"
          iconBg="#800080"
          className="
            top-[8%] left-[2%]
            sm:top-[10%] sm:left-[8%]
            lg:top-[12%] lg:left-[4%]
          "
          delay={0.15}
          yRange={[0, -9, 0]}
          duration={5.2}
        />

        {/* Badge B: Awareness — Top-Right (~2 o'clock) */}
        <FloatingTag
          label="Awareness"
          iconName="Sun"
          iconColor="text-white"
          iconBg="#FFCE1B"
          className="
            top-[22%] right-[2%]
            sm:top-[20%] sm:right-[6%]
            lg:top-[22%] lg:right-[2%]
          "
          delay={0.3}
          yRange={[0, 9, 0]}
          duration={4.8}
        />

        {/* Badge C: Emotional Clarity — Mid-Left (~8 o'clock) */}
        <FloatingTag
          label="Emotional Clarity"
          iconName="Heart"
          iconColor="text-white"
          iconBg="#800080"
          className="
            bottom-[34%] left-[0%]
            sm:bottom-[36%] sm:left-[6%]
            lg:bottom-[38%] lg:left-[0%]
          "
          delay={0.45}
          yRange={[0, -11, 0]}
          duration={5.6}
        />

        {/* Badge D: Loneliness — Bottom-Right (~4 o'clock) */}
        <FloatingTag
          label="Loneliness"
          iconName="UserRound"
          iconColor="text-white"
          iconBg="#800080"
          className="
            bottom-[18%] right-[2%]
            sm:bottom-[20%] sm:right-[6%]
            lg:bottom-[22%] lg:right-[2%]
          "
          delay={0.6}
          yRange={[0, 8, 0]}
          duration={5}
        />
      </div>

      {/* ═══════════════════════════════════════════════
          z-60 → SPHERES LAYER
          ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-60 pointer-events-none overflow-visible">
        {/* Sphere 1: Purple (Top Left Accent) */}
        <motion.div
          animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut" }}
          className="
            absolute pointer-events-none
            top-[8%] left-[22%]
            w-3.5 h-3.5
            sm:w-4 sm:h-4
            lg:w-5 lg:h-5
            sphere-3d sphere-purple
          "
        />

        {/* Sphere 2: Yellow (Bottom Right Accent) */}
        <motion.div
          animate={{ y: [0, 12, 0], x: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 6.4, ease: "easeInOut", delay: 0.3 }}
          className="
            absolute pointer-events-none
            bottom-[6%] right-[28%]
            w-4 h-4
            sm:w-4.5 sm:h-4.5
            lg:w-5.5 lg:h-5.5
            sphere-3d sphere-yellow
          "
        />

        {/* Sphere 3: Purple (Mid Right Orbit) */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.6 }}
          className="
            absolute pointer-events-none
            top-[48%] right-[-6px]
            sm:right-[-8px]
            lg:right-[-10px]
            w-5 h-5
            sm:w-6 sm:h-6
            lg:w-7 lg:h-7
            sphere-3d sphere-purple
          "
        />

        {/* Sphere 4: Yellow (Top Right) */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
          className="
            absolute pointer-events-none
            top-[16%] right-[16%]
            w-3 h-3
            sm:w-3.5 sm:h-3.5
            lg:w-4 lg:h-4
            sphere-3d sphere-white
          "
        />
      </div>
    </div>
  );
}
