"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${scrolled ? "pt-2.5" : "pt-6"}`}>
      <div className="container-wrapper">
        <nav
          className={`
            flex
            items-center
            justify-between
            rounded-full
            border
            px-8
            transition-all
            duration-500
            ${
              scrolled
                ? "bg-white/80 backdrop-blur-xl border-white/60 shadow-[4px_4px_15px_rgba(165,140,217,0.06),_-4px_-4px_15px_rgba(255,255,255,0.9)] py-2.5"
                : "bg-transparent border-transparent py-4 shadow-none"
            }
          `}
        >
          {/* LEFT - LOGO */}
          <a href="#" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img
              src="/images/logo.png"
              alt="Happiness Coaching Academy Logo"
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col text-left leading-none font-satoshi font-bold">
              <span className="text-[#800080] text-[13px] sm:text-[14px] uppercase tracking-wider">
                Happiness
              </span>
              <span className="text-[#FFCE1B] text-[10px] sm:text-[11px] uppercase tracking-widest mt-0.5">
                Coaching Academy
              </span>
            </div>
          </a>

          {/* CENTER - NAVIGATION LINKS */}
          <div className="hidden lg:flex items-center gap-7 font-medium text-slate-deep/80 text-[14px]">
            <a href="#" className="hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Method
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Values
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Programs
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Stories
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Community
            </a>
          </div>

          {/* RIGHT - ACTIONS */}
          <div className="flex items-center gap-3">
            <button
              className="
                hidden sm:inline-flex
                rounded-full
                border border-primary/20
                bg-primary/5
                px-5
                py-2.5
                text-[14px]
                font-semibold
                text-primary
                hover:bg-primary/10
                transition-all
                duration-300
              "
            >
              Explore Programs
            </button>

            <button
              className="
                rounded-full
                bg-mustard
                px-6
                py-2.5
                text-[14px]
                font-bold
                text-slate-deep
                glow-gold
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                duration-300
                shadow-lg
              "
            >
              Start Your Transformation
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}