"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NeuButton } from "@/components/ui/NeuButton";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Method", href: "#what-hca-does" },
  { label: "Values", href: "#core-values" },
  { label: "Programs", href: "#programs" },
  { label: "Stories", href: "#testimonials" },
  { label: "Community", href: "#community" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    navLinks
      .map((link) => link.href.replace("#", ""))
      .forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  /* ─── Logo size (single source of truth) ─────────────────────────────── */
  const logoSize = scrolled ? 42 : 64;

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50"
        style={{ paddingTop: scrolled ? 8 : 20 }}
      >
        <motion.nav
          initial={false}
          animate={{
            /* Request 4: transparent initially → glass on scroll */
            backgroundColor: scrolled
              ? "rgba(255, 255, 255, 0.72)"
              : "rgba(255, 255, 255, 0)",
            backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
            borderColor: scrolled
              ? "rgba(255, 255, 255, 0.65)"
              : "rgba(255, 255, 255, 0)",
            boxShadow: scrolled
              ? "4px 4px 20px rgba(165,140,217,0.1), -4px -4px 20px rgba(255,255,255,0.95), 0 8px 32px rgba(128,0,128,0.06)"
              : "none",
            /* Request 4: shrink on scroll via padding */
            paddingTop: scrolled ? 10 : 18,
            paddingBottom: scrolled ? 10 : 18,
            paddingLeft: scrolled ? 28 : 40,
            paddingRight: scrolled ? 28 : 40,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
            maxWidth: 1320,
            width: "92%",
            margin: "0 auto",
            borderRadius: 9999,
            border: "1px solid transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          aria-label="Main navigation"
        >
          {/* LEFT – LOGO */}
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity shrink-0"
            style={{ gap: 12 }}
            aria-label="Happiness Coaching Academy - Home"
          >
            {/* Request 1: Logo respects the size prop with explicit
                min-width/min-height to prevent flex shrinking,
                and animated size on scroll */}
            <motion.div
              animate={{ width: logoSize, height: logoSize }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative shrink-0"
            >
              <Image
                src="/home/logo.svg"
                alt="Happiness Coaching Academy"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="flex flex-col text-left leading-none font-satoshi font-bold">
              <span className="text-primary uppercase tracking-wider" style={{ fontSize: 14 }}>
                Happiness
              </span>
              <span className="text-mustard uppercase tracking-widest" style={{ fontSize: 11, marginTop: 2 }}>
                Coaching Academy
              </span>
            </div>
          </Link>

          {/* CENTER – NAVIGATION LINKS */}
          <ul
            className="hidden xl:flex items-center"
            style={{ gap: 2 }}
            role="list"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.label} className="relative">
                  <Link
                    href={link.href}
                    className="relative block rounded-full font-semibold transition-all duration-300"
                    style={{
                      padding: "10px 18px",
                      fontSize: 14,
                      color: isActive ? "#800080" : scrolled ? "#374151" : "#1f2937",
                      backgroundColor: isActive ? "rgba(128,0,128,0.08)" : "transparent",
                      /* Request 3: font-weight change for active instead of underline */
                      fontWeight: isActive ? 800 : 600,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "rgba(128,0,128,0.05)";
                        e.currentTarget.style.color = "#800080";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = scrolled ? "#374151" : "#1f2937";
                      }
                    }}
                  >
                    {link.label}
                    {/* Request 3: REMOVED the active underline motion.div */}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* RIGHT – CTA BUTTONS (using NeuButton) */}
          <div className="hidden xl:flex items-center" style={{ gap: 14 }}>
            {/* Request 2: Neumorphic button – primary variant */}
            <NeuButton variant="primary" href="#programs" size="md">
              Explore Programs
            </NeuButton>
            {/* Request 2: Neumorphic button – mustard variant */}
            <NeuButton variant="mustard" href="/assessment" size="md">
              Start Your Transformation
            </NeuButton>
          </div>

          {/* MOBILE – CTA + HAMBURGER */}
          <div className="flex items-center xl:hidden" style={{ gap: 8 }}>
            <NeuButton variant="mustard" href="/assessment" size="sm" onClick={closeMenu}>
              <span className="hidden sm:inline">Start Your Transformation</span>
              <span className="inline sm:hidden">Start Now</span>
            </NeuButton>

            <button
              className="flex items-center justify-center rounded-full text-gray-700 transition-colors duration-200 shrink-0"
              style={{ width: 40, height: 40 }}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(128,0,128,0.08)";
                e.currentTarget.style.color = "#800080";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#374151";
              }}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </motion.nav>

        {/* MOBILE DROPDOWN MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-1/2 top-full xl:hidden"
              style={{
                marginTop: 12,
                width: "92%",
                maxWidth: 420,
                transform: "translateX(-50%)",
                borderRadius: 24,
                border: "1px solid rgba(255,255,255,0.6)",
                backgroundColor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                boxShadow: "0 16px 48px rgba(31,38,135,0.12)",
              }}
            >
              <nav style={{ padding: 20, display: "flex", flexDirection: "column", gap: 4 }}>
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="block transition-all duration-200 font-semibold"
                        style={{
                          padding: "12px 16px",
                          fontSize: 15,
                          borderRadius: 16,
                          color: isActive ? "#800080" : "#1f2937",
                          backgroundColor: isActive ? "rgba(128,0,128,0.08)" : "transparent",
                          fontWeight: isActive ? 800 : 600,
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: "1px solid #f3f4f6",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <NeuButton variant="primary" href="#programs" onClick={closeMenu} size="md"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Explore Programs
                  </NeuButton>
                  <NeuButton variant="mustard" href="/assessment" onClick={closeMenu} size="md"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Start Your Transformation
                  </NeuButton>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE OVERLAY BACKDROP */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}