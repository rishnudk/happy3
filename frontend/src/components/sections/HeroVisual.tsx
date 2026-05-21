"use client";

import { motion } from "framer-motion";
import SmileArc from "./SmileArc";
import FloatingTag from "./FloatingTag";

export default function HeroVisual() {
  return (
    <div className="lg:col-span-5 relative flex justify-center items-center min-h-[520px] sm:min-h-[600px] lg:min-h-[640px] w-full z-10 overflow-visible">
      {/* 1. DECORATIVE ELEMENTS: RADIAL BLUR ORBS */}
      <div 
        className="absolute w-[350px] h-[350px] rounded-full opacity-30 filter blur-[80px] pointer-events-none z-0" 
        style={{
          background: "radial-gradient(circle, rgba(128,0,128,0.15) 0%, rgba(255,206,27,0.08) 50%, transparent 100%)"
        }}
      />
      
      {/* 2. THIN CONCENTRIC ORBIT RINGS (BACKGROUND) */}
      <SmileArc variant="thin-orbit" className="w-[480px] h-[480px] opacity-25 z-0" delay={0.2} />

      {/* 3. PORTRAIT CONTAINER (CIRCULAR CUTOUT) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="
          relative
          w-[310px] h-[310px]
          sm:w-[390px] sm:h-[390px]
          rounded-full
          bg-gradient-to-tr from-purple-100/40 via-white/80 to-amber-100/40
          p-2
          shadow-[15px_15px_35px_rgba(165,140,217,0.08),-15px_-15px_35px_rgba(255,255,255,0.95)]
          z-10
          overflow-visible
        "
      >
        {/* White inner border rim */}
        <div className="absolute inset-0 rounded-full border border-white/60 pointer-events-none z-20" />
        
        {/* Overflow hidden container for portrait mask */}
        <div className="w-full h-full rounded-full overflow-hidden relative border-[6px] border-white shadow-inner bg-gradient-to-tr from-purple-50 to-amber-50">
          <img
            src="/images/hero.png"
            alt="Professional Wellness Coach - Happiness Coaching Academy"
            className="
              w-full h-full
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

      {/* 4. PRIMARY THICK MUSTARD YELLOW SMILE ARC */}
      {/* Positioned right below the chin, wrapping the portrait curve */}
      <SmileArc
        variant="primary"
        className="
          w-[330px] sm:w-[380px] 
          h-[150px] sm:h-[180px] 
          bottom-[12%] sm:bottom-[10%] lg:bottom-[12%]
          left-[5%] sm:left-[8%] lg:left-[5%]
          z-20
        "
        delay={0.4}
      />

      {/* 5. SECONDARY PATRIARCH PURPLE SMILE ARC */}
      {/* Offset behind/beside to create premium 3D layered geometry */}
      <SmileArc
        variant="secondary"
        className="
          w-[240px] sm:w-[280px]
          h-[110px] sm:h-[130px]
          top-[42%] lg:top-[44%]
          right-[-10px] sm:right-[2%] lg:right-[0%]
          z-0
          opacity-30
          rotate-[-15deg]
        "
        delay={0.6}
      />

      {/* =========================================
         6. FLOATING EMOTIONAL NEUMORPHIC BADGES
      ========================================= */}

      {/* Badge A: Mindset Shift (Top-Left) */}
      <FloatingTag
        label="Mindset Shift"
        iconName="Brain"
        iconColor="text-primary"
        iconBg="bg-purple-50/60 border-purple-100/60"
        className="top-[12%] left-[-15px] sm:left-[4%]"
        delay={0.15}
        yRange={[0, -9, 0]}
        duration={5.2}
      />

      {/* Badge B: Awareness (Top-Right) */}
      <FloatingTag
        label="Awareness"
        iconName="Sun"
        iconColor="text-secondary"
        iconBg="bg-amber-50/60 border-amber-100/60"
        className="top-[25%] right-[-20px] sm:right-[3%]"
        delay={0.3}
        yRange={[0, 9, 0]}
        duration={4.8}
      />

      {/* Badge C: Emotional Clarity (Mid-Left) */}
      <FloatingTag
        label="Emotional Clarity"
        iconName="Heart"
        iconColor="text-primary animate-pulse"
        iconBg="bg-purple-50/60 border-purple-100/60"
        className="bottom-[35%] left-[-25px] sm:left-[0%]"
        delay={0.45}
        yRange={[0, -11, 0]}
        duration={5.6}
      />

      {/* Badge D: Confidence (Bottom-Right) */}
      <FloatingTag
        label="Confidence"
        iconName="Smile"
        iconColor="text-secondary"
        iconBg="bg-amber-50/60 border-amber-100/60"
        className="bottom-[22%] right-[-15px] sm:right-[4%]"
        delay={0.6}
        yRange={[0, 8, 0]}
        duration={5}
      />

      {/* =========================================
         7. DECORATIVE 3D SPHERES
      ========================================= */}

      {/* Sphere 1: Purple (Top Left Accent) */}
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut" }}
        className="absolute top-[8%] left-[22%] w-5 h-5 sphere-3d sphere-purple z-20 pointer-events-none"
      />

      {/* Sphere 2: Yellow (Bottom Right Accent) */}
      <motion.div
        animate={{ y: [0, 12, 0], x: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 6.4, ease: "easeInOut", delay: 0.3 }}
        className="absolute bottom-[6%] right-[28%] w-5.5 h-5.5 sphere-3d sphere-yellow z-20 pointer-events-none"
      />

      {/* Sphere 3: Purple (Mid Right Orbit) */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.6 }}
        className="absolute top-[48%] right-[-10px] w-7 h-7 sphere-3d sphere-purple z-20 pointer-events-none"
      />

      {/* Sphere 4: Yellow (Mid Right Outer) */}
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.1 }}
        className="absolute bottom-[36%] right-[-30px] w-4.5 h-4.5 sphere-3d sphere-yellow z-20 pointer-events-none"
      />

      {/* Sphere 5: White (Top Right) */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[16%] right-[16%] w-4 h-4 sphere-3d sphere-white z-0 pointer-events-none"
      />
    </div>
  );
}
