"use client";

import { motion } from "framer-motion";
import PageWrapper from "../layout/page-wrapper";

export default function Hero() {
  return (
    <PageWrapper className="pt-28 pb-16 overflow-visible">
      <div className="grid items-center gap-12 lg:grid-cols-12 relative">
        
        {/* LEFT COLUMN - CONTENT (Grid span 7) */}
        <div className="lg:col-span-7 space-y-8 z-20 text-left">
          {/* Journey Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex"
          >
            <div
              className="
                glass-card
                inline-flex
                items-center
                rounded-full
                px-5
                py-2
                text-sm
                font-semibold
                text-primary
                border-white/70
                shadow-sm
              "
            >
              {/* Sparkle SVG */}
              <svg
                className="w-4 h-4 mr-2 text-primary/80 animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.187.904zM18 10.5l-.5 3-.5-3-3-.5 3-.5.5-3 .5 3 3 .5-3 .5z"
                />
              </svg>
              Your Journey Starts Here
            </div>
          </motion.div>

          {/* Headline and Description */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="
                text-[44px]
                sm:text-[58px]
                lg:text-[76px]
                font-extrabold
                leading-[1.12]
                tracking-tight
                text-slate-deep
              "
            >
              Transforming <span className="text-[#3b2b80] font-black">Mindsets,</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 font-black">Elevating</span> <span className="text-[#3b2b80] font-black">Lives.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="
                max-w-xl
                text-lg
                text-muted-foreground/90
                leading-relaxed
                font-medium
              "
            >
              Happiness is a skill you can learn. Join a science-based coaching journey designed to reprogram your mindset, heal what holds you back, and unlock the calm, confident life you deserve.
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            {/* Primary CTA */}
            <button
              className="
                group
                flex
                items-center
                rounded-full
                bg-primary
                pl-8
                pr-2
                py-2
                font-bold
                text-white
                glow-purple
                hover:scale-[1.03]
                active:scale-[0.98]
                transition-all
                duration-300
                shadow-xl
                shadow-purple-700/20
              "
            >
              Start Your Transformation
              <span className="flex items-center justify-center w-10 h-10 ml-4 rounded-full bg-white text-primary group-hover:rotate-45 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </button>

            {/* Secondary CTA */}
            <button
              className="
                group
                flex
                items-center
                rounded-full
                glass-card
                pl-2
                pr-8
                py-2
                font-bold
                text-slate-deep
                border-white/80
                hover:bg-white/80
                hover:scale-[1.03]
                active:scale-[0.98]
                transition-all
                duration-300
                shadow-lg
              "
            >
              <span className="flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-white border border-purple-100 text-primary shadow-sm group-hover:scale-105 transition-transform duration-300">
                <svg className="w-4 h-4 fill-current text-primary" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Discover the Method
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - VISUALS & FLOATING ELEMENTS (Grid span 5) */}
        <div className="lg:col-span-5 relative flex justify-center items-center min-h-[560px] lg:min-h-[640px] z-10">
          
          {/* ORBITING PATHS */}
          <div className="absolute w-[460px] h-[460px] rounded-full border border-purple-900/[0.04] z-0 pointer-events-none" />
          <div className="absolute w-[530px] h-[530px] rounded-full border border-purple-900/[0.02] z-0 pointer-events-none" />
          
          {/* ORBITING DOTTED PATTERN ACCENTS */}
          <div className="absolute right-[-10%] top-[10%] opacity-40 pointer-events-none z-0">
            <svg width="100" height="160" viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="2.5" fill="#6D28D9" />
              <circle cx="30" cy="10" r="2.5" fill="#6D28D9" />
              <circle cx="50" cy="10" r="2.5" fill="#6D28D9" />
              <circle cx="70" cy="10" r="2.5" fill="#6D28D9" />
              <circle cx="90" cy="10" r="2.5" fill="#6D28D9" />
              <circle cx="10" cy="30" r="2.5" fill="#6D28D9" />
              <circle cx="30" cy="30" r="2.5" fill="#6D28D9" />
              <circle cx="50" cy="30" r="2.5" fill="#6D28D9" />
              <circle cx="70" cy="30" r="2.5" fill="#6D28D9" />
              <circle cx="90" cy="30" r="2.5" fill="#6D28D9" />
              <circle cx="10" cy="50" r="2.5" fill="#6D28D9" />
              <circle cx="30" cy="50" r="2.5" fill="#6D28D9" />
              <circle cx="50" cy="50" r="2.5" fill="#6D28D9" />
              <circle cx="70" cy="50" r="2.5" fill="#6D28D9" />
              <circle cx="90" cy="50" r="2.5" fill="#6D28D9" />
              <circle cx="10" cy="70" r="2.5" fill="#6D28D9" />
              <circle cx="30" cy="70" r="2.5" fill="#6D28D9" />
              <circle cx="50" cy="70" r="2.5" fill="#6D28D9" />
              <circle cx="70" cy="70" r="2.5" fill="#6D28D9" />
              <circle cx="90" cy="70" r="2.5" fill="#6D28D9" />
            </svg>
          </div>

          {/* MAIN COACH IMAGE CONTAINER WITH WHITE RAMP & MASK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="
              relative
              w-[380px] h-[380px]
              sm:w-[430px] sm:h-[430px]
              rounded-full
              border-[8px] border-white
              shadow-2xl
              shadow-purple-950/10
              overflow-hidden
              z-10
              bg-gradient-to-tr from-purple-100/50 to-amber-100/30
            "
          >
            <img
              src="/images/hero.png"
              alt="Professional Coach - Happiness Coaching Academy"
              className="
                w-full
                h-full
                object-cover
                object-top
                scale-[1.08]
                translate-y-2
              "
            />
          </motion.div>

          {/* =========================================
             FLOATING 3D SPHERES (DYNAMIC SHADOWS)
          ========================================= */}
          
          {/* Sphere 1: Purple (Top Left) */}
          <motion.div
            animate={{ y: [0, -12, 0], x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-[8%] left-[10%] w-5 h-5 sphere-3d sphere-purple z-20"
          />

          {/* Sphere 2: Yellow (Bottom Right Orbit) */}
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[6%] right-[22%] w-5.5 h-5.5 sphere-3d sphere-yellow z-20"
          />

          {/* Sphere 3: Purple (Mid Right Orbit) */}
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }}
            className="absolute top-[44%] right-[0%] w-8 h-8 sphere-3d sphere-purple z-20"
          />

          {/* Sphere 4: Yellow (Mid Right Outer) */}
          <motion.div
            animate={{ y: [0, -8, 0], x: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 0.2 }}
            className="absolute bottom-[38%] right-[-15px] w-4.5 h-4.5 sphere-3d sphere-yellow z-20"
          />

          {/* Sphere 5: White (Top Right) */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.8 }}
            className="absolute top-[18%] right-[12%] w-4 h-4 sphere-3d sphere-white z-0"
          />

          {/* Sphere 6: Purple (Mid Left Outer) */}
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut" }}
            className="absolute bottom-[34%] left-[4%] w-4 h-4 sphere-3d sphere-purple z-20"
          />

          {/* =========================================
             FLOATING PILLED LABELS (HIGH-FIDELITY GLASS)
          ========================================= */}

          {/* Badge 1: Mindset Shift (Top) */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
            className="
              absolute
              top-[15%]
              left-[5%]
              sm:left-[12%]
              z-20
              glass-card
              rounded-full
              pl-2.5 pr-5 py-2
              flex
              items-center
              gap-3
              shadow-lg
              shadow-purple-900/5
              border-white/80
              text-[14px]
              font-bold
              text-slate-deep
            "
          >
            <span className="w-8 h-8 bg-purple-50 border border-purple-100 flex items-center justify-center text-slate-deep rounded-full shadow-inner">
              {/* Asterisk Sparkle */}
              <svg className="w-4 h-4 text-purple-700 animate-spin" style={{ animationDuration: "12s" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15m12.75-5.25l-10.5 10.5M18.75 18.75l-10.5-10.5" />
              </svg>
            </span>
            Mindset shift
          </motion.div>

          {/* Badge 2: Awareness (Right) */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.4 }}
            className="
              absolute
              top-[28%]
              right-[-10px]
              sm:right-[2%]
              z-20
              glass-card
              rounded-full
              pl-2.5 pr-5 py-2
              flex
              items-center
              gap-3
              shadow-lg
              shadow-purple-900/5
              border-white/80
              text-[14px]
              font-bold
              text-slate-deep
            "
          >
            <span className="w-8 h-8 bg-amber-400 flex items-center justify-center text-white rounded-full shadow-md shadow-amber-500/20 font-black">
              +
            </span>
            Awareness
          </motion.div>

          {/* Badge 3: Emotional Clarity (Left) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5.6, ease: "easeInOut", delay: 0.8 }}
            className="
              absolute
              bottom-[42%]
              left-[-15px]
              sm:left-[2%]
              z-20
              glass-card
              rounded-full
              pl-2.5 pr-5 py-2
              flex
              items-center
              gap-3
              shadow-lg
              shadow-purple-900/5
              border-white/80
              text-[14px]
              font-bold
              text-slate-deep
            "
          >
            <span className="w-8 h-8 bg-primary flex items-center justify-center text-white rounded-full shadow-md shadow-purple-600/20 font-black">
              +
            </span>
            Emotional clarity
          </motion.div>

          {/* Badge 4: Loneliness (Bottom Right) */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.2 }}
            className="
              absolute
              bottom-[32%]
              right-[-15px]
              sm:right-[2%]
              z-20
              glass-card
              rounded-full
              pl-2.5 pr-5 py-2
              flex
              items-center
              gap-3
              shadow-lg
              shadow-purple-900/5
              border-white/80
              text-[14px]
              font-bold
              text-slate-deep
            "
          >
            <span className="w-8 h-8 bg-purple-100 flex items-center justify-center text-purple-700 rounded-full shadow-inner">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </span>
            Loneliness
          </motion.div>

        </div>
      </div>

      {/* =========================================
         INTEGRATED HORIZONTAL STATS BAR CARD
      ========================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 sm:mt-24 z-20 relative max-w-5xl mx-auto"
      >
        <div
          className="
            glass-card
            py-7
            px-8
            sm:px-14
            grid
            grid-cols-1
            md:grid-cols-5
            items-center
            gap-6
            sm:gap-8
            shadow-2xl
            shadow-purple-950/[0.04]
            border-white/80
            rounded-[32px]
          "
        >
          {/* STAT 1: 20k+ Lives transformed */}
          <div className="md:col-span-1.5 flex items-center gap-5 justify-center md:justify-start">
            <span className="w-14 h-14 bg-purple-50 border border-purple-100 flex items-center justify-center text-primary rounded-full shadow-inner">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </span>
            <div>
              <h4 className="text-3xl font-extrabold text-slate-deep leading-none">20k+</h4>
              <p className="text-[14px] text-muted-foreground font-semibold mt-1">Lives transformed</p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden md:block col-span-0.25 justify-self-center">
            <div className="w-[1px] h-10 bg-purple-900/10" />
          </div>

          {/* STAT 2: 99% Client satisfaction */}
          <div className="md:col-span-1.5 flex items-center gap-5 justify-center">
            <span className="w-14 h-14 bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 rounded-full shadow-inner">
              {/* Glowing 3D-like Star SVG */}
              <svg className="w-6 h-6 fill-current text-amber-500 animate-pulse" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </span>
            <div className="text-left">
              <h4 className="text-3xl font-extrabold text-slate-deep leading-none">99%</h4>
              <p className="text-[14px] text-muted-foreground font-semibold mt-1">Client satisfaction</p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden md:block col-span-0.25 justify-self-center">
            <div className="w-[1px] h-10 bg-purple-900/10" />
          </div>

          {/* STAT 3: 10+ Countries reached */}
          <div className="md:col-span-1.5 flex items-center gap-5 justify-center md:justify-end">
            <span className="w-14 h-14 bg-purple-50 border border-purple-100 flex items-center justify-center text-primary rounded-full shadow-inner">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V14a2 2 0 00-2-2h-.5A2 2 0 0116 8V5a2 2 0 00-2-2h-3.935M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div className="text-left">
              <h4 className="text-3xl font-extrabold text-slate-deep leading-none">10+</h4>
              <p className="text-[14px] text-muted-foreground font-semibold mt-1">Countries reached</p>
            </div>
          </div>
        </div>
      </motion.div>

    </PageWrapper>
  );
}

