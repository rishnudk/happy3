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
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-6 transition-all duration-500">
      <div className="container-wrapper">
        <nav
          className={`
            flex
            items-center
            justify-between
            rounded-full
            border
            px-8
            py-3
            transition-all
            duration-500
            ${
              scrolled
                ? "bg-white/80 backdrop-blur-2xl shadow-xl shadow-purple-900/5 border-white/60 py-3"
                : "bg-white/40 backdrop-blur-xl border-white/40 py-4"
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
                bg-secondary
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