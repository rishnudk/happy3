"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SmileArc from "./SmileArc";
import FloatingTag from "./FloatingTag";

export default function HeroVisual() {
  return (
    <div className="lg:col-span-5 relative flex justify-center items-center min-h-[420px] sm:min-h-[560px] lg:min-h-[640px] w-full z-10 overflow-visible">

      {/* 1. DECORATIVE: RADIAL BLUR ORBS matching global bg */}
      <div
        className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full opacity-30 filter blur-[80px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(128,0,128,0.12) 0%, rgba(255,206,27,0.06) 50%, transparent 100%)"
        }}
      />

      {/* 2. THIN CONCENTRIC ORBIT RINGS */}
      <SmileArc variant="thin-orbit" className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] opacity-25 z-0" delay={0.2} />

      {/* 3. PORTRAIT CONTAINER — bg matches global background (#F6F3FA / #F2EDF8) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="
          relative

          w-[230px] h-[230px]
          sm:w-[320px] sm:h-[320px]
          lg:w-[390px] lg:h-[390px]

          rounded-full
          p-2
          z-10
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
        {/* Neumorphic inner border rim */}
        <div className="absolute inset-0 rounded-full border border-white/60 pointer-events-none z-20" />
        <div
          className="
            absolute top-[4px] left-1/2 -translate-x-1/2
            w-[60%] h-[8px]
            rounded-full bg-white/50 blur-[4px]
            pointer-events-none z-20
          "
        />

        {/* Portrait with background matching global bg tones */}
        <div
          className="
            w-full h-full rounded-full overflow-hidden relative
            border-[4px] sm:border-[6px]
            border-white/80
          "
          style={{
            background: "linear-gradient(135deg, #F6F3FA, #F2EDF8, #FAF8FD)",
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
            sizes="(max-width: 640px) 230px, (max-width: 1024px) 320px, 390px"
            priority
            className="
              object-cover
              object-top
              scale-[1.06]
              translate-y-1.5
              transition-transform
              duration-700
              hover:scale-[1.09]
            "
          />
        </div>
      </motion.div>

      {/* 4. BRAND SMILE ARC — Mustard Yellow, bottom of portrait */}
      <SmileArc
        variant="primary"
        className="bottom-[8%] sm:bottom-[6%] lg:bottom-[4%] w-[280px] sm:w-[340px] lg:w-[380px]"
        delay={0.4}
      />


      {/* =========================================
         5. FLOATING "KEY" BADGES
         Positioned along orbit ring with solid icon colors
      ========================================= */}

      {/* Badge A: Mindset Shift — Top-Left (~10 o'clock) */}
      <FloatingTag
        label="Mindset Shift"
        iconName="Brain"
        iconColor="text-white"
        iconBg="#800080"
        className="
          top-[5%] left-[-8px]
          sm:top-[6%] sm:left-[2%]
          lg:top-[8%] lg:left-[-4%]
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
          top-[20%] right-[-6px]
          sm:top-[18%] sm:right-[-2%]
          lg:top-[20%] lg:right-[-6%]
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
          bottom-[30%] left-[-12px]
          sm:bottom-[32%] sm:left-[-4%]
          lg:bottom-[34%] lg:left-[-8%]
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
          bottom-[14%] right-[-6px]
          sm:bottom-[16%] sm:right-[-2%]
          lg:bottom-[18%] lg:right-[-4%]
        "
        delay={0.6}
        yRange={[0, 8, 0]}
        duration={5}
      />

      {/* =========================================
         6. DECORATIVE 3D SPHERES
      ========================================= */}

      {/* Sphere 1: Purple (Top Left Accent) */}
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut" }}
        className="
          absolute z-20 pointer-events-none
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
          absolute z-20 pointer-events-none
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
          absolute z-20 pointer-events-none
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
          absolute z-0 pointer-events-none
          top-[16%] right-[16%]
          w-3 h-3
          sm:w-3.5 sm:h-3.5
          lg:w-4 lg:h-4
          sphere-3d sphere-white
        "
      />
    </div>
  );
}
