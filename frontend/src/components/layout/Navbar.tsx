"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

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

  return (
    <>
      <header
        style={{ paddingTop: scrolled ? 12 : 24 }}
        className="fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-in-out"
      >
        <motion.nav
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? "rgba(255, 255, 255, 0.72)"
              : "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(24px)",
            borderColor: scrolled
              ? "rgba(255, 255, 255, 0.65)"
              : "rgba(255, 255, 255, 0.4)",
            boxShadow: scrolled
              ? "4px 4px 20px rgba(165,140,217,0.1), -4px -4px 20px rgba(255,255,255,0.95), 0 8px 32px rgba(128,0,128,0.06)"
              : "4px 4px 15px rgba(165,140,217,0.06), -4px -4px 15px rgba(255,255,255,0.85)",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            WebkitBackdropFilter: "blur(24px)",
            padding: "16px 40px",
            maxWidth: 1320,
            width: "92%",
            margin: "0 auto",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          aria-label="Main navigation"
        >
          {/* LEFT – LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity shrink-0"
            aria-label="Happiness Coaching Academy - Home"
          >
            <Image
              src="/images/logo.png"
              alt="Happiness Coaching Academy"
              width={64}
              height={64}
              className="object-contain transition-all duration-300"
              style={{ height: 64, width: 64 }}
              priority
            />
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
            style={{ gap: 6 }}
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
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 right-0 bg-primary"
                        style={{
                          bottom: -2,
                          height: 2,
                          marginLeft: 16,
                          marginRight: 16,
                          borderRadius: 9999,
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* RIGHT – CTA BUTTONS */}
          <div className="hidden xl:flex items-center" style={{ gap: 16 }}>
            <Link
              href="#programs"
              className="rounded-full font-bold text-primary whitespace-nowrap transition-all duration-300"
              style={{
                padding: "14px 28px",
                fontSize: 14,
                border: "1px solid rgba(128,0,128,0.2)",
                backgroundColor: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 12px rgba(128,0,128,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(128,0,128,0.4)";
                e.currentTarget.style.backgroundColor = "rgba(128,0,128,0.05)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(128,0,128,0.12)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(128,0,128,0.2)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.5)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(128,0,128,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Explore Programs
            </Link>
            <Link
              href="#cta"
              className="rounded-full font-bold text-slate-deep whitespace-nowrap transition-all duration-300"
              style={{
                padding: "14px 28px",
                fontSize: 14,
                backgroundColor: "#FFCE1B",
                boxShadow: "0 10px 25px rgba(255, 206, 27, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(255,206,27,0.5)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(255, 206, 27, 0.4)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Start Your Transformation
            </Link>
          </div>

          {/* MOBILE – CTA + HAMBURGER */}
          <div className="flex items-center xl:hidden" style={{ gap: 8 }}>
            <Link
              href="#cta"
              className="rounded-full font-extrabold text-slate-deep transition-all duration-300 flex items-center justify-center shrink-0"
              style={{
                padding: "10px 18px",
                fontSize: 12,
                backgroundColor: "#FFCE1B",
                boxShadow: "0 6px 15px rgba(255,206,27,0.45)",
              }}
            >
              <span className="hidden sm:inline">Start Your Transformation</span>
              <span className="inline sm:hidden">Start Now</span>
            </Link>

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
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`
            absolute left-1/2 top-full xl:hidden
            origin-top overflow-hidden
            transition-all duration-300 ease-out
            ${
              menuOpen
                ? "translate-y-0 scale-y-100 opacity-100"
                : "pointer-events-none -translate-y-2 scale-y-95 opacity-0"
            }
          `}
          style={{
            marginTop: 12,
            width: "92%",
            maxWidth: 420,
            transform: `translateX(-50%) ${menuOpen ? "translateY(0) scaleY(1)" : "translateY(-8px) scaleY(0.95)"}`,
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
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="transition-all duration-200 font-semibold"
                  style={{
                    padding: "12px 16px",
                    fontSize: 15,
                    borderRadius: 16,
                    color: isActive ? "#800080" : "#1f2937",
                    backgroundColor: isActive ? "rgba(128,0,128,0.08)" : "transparent",
                    boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                    transitionDelay: menuOpen ? `${index * 30}ms` : "0ms",
                  }}
                >
                  {link.label}
                </Link>
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
              <Link
                href="#programs"
                onClick={closeMenu}
                className="font-semibold text-primary text-center transition-all duration-200"
                style={{
                  width: "100%",
                  padding: "12px 24px",
                  borderRadius: 9999,
                  fontSize: 14,
                  border: "1px solid rgba(128,0,128,0.25)",
                  backgroundColor: "rgba(128,0,128,0.05)",
                }}
              >
                Explore Programs
              </Link>
              <Link
                href="#cta"
                onClick={closeMenu}
                className="font-semibold text-slate-deep text-center transition-all duration-200"
                style={{
                  width: "100%",
                  padding: "12px 24px",
                  borderRadius: 9999,
                  fontSize: 14,
                  backgroundColor: "#FFCE1B",
                  boxShadow: "0 6px 16px rgba(255,206,27,0.25)",
                }}
              >
                Start Your Transformation
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* MOBILE OVERLAY BACKDROP */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 xl:hidden"
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}