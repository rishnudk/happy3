"use client";

import Image from "next/image";
import { Mail, MessageCircle, ArrowUp, MapPin } from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  TwitterXIcon,
} from "../ui/SocialIcons";

const quickLinks = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Method", href: "#what-hca-does" },
  { label: "Success Stories", href: "#testimonials" },
  { label: "Community", href: "#community" },
];

const programs = [
  { label: "Mindset Reprogram", href: "#programs" },
  { label: "Emotional Healing", href: "#programs" },
  { label: "Happiness Coaching", href: "#programs" },
  { label: "Growth Workshops", href: "#programs" },
];

const socialLinks = [
  { icon: InstagramIcon, href: "https://www.instagram.com/happinesscoachingacademy", label: "Instagram", color: "hover:bg-[#E1306C]/10 hover:text-[#E1306C] hover:border-[#E1306C]/20" },
  { icon: FacebookIcon, href: "https://facebook.com/happinesscoachingacademy", label: "Facebook", color: "hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:border-[#1877F2]/20" },
  { icon: LinkedInIcon, href: "https://linkedin.com/company/happinesscoachingacademy", label: "LinkedIn", color: "hover:bg-[#0077B5]/10 hover:text-[#0077B5] hover:border-[#0077B5]/20" },
  { icon: TwitterXIcon, href: "https://twitter.com/hca_tweets", label: "Twitter", color: "hover:bg-black/10 hover:text-black hover:border-black/10" },
];

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden" style={{ background: "#2A254B" }}>

      {/* Brand arc decorations — top edge */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none" style={{ height: 6 }}>
        <div className="w-full h-full" style={{ background: "linear-gradient(90deg, #800080 0%, #FFCE1B 50%, #800080 100%)" }} />
      </div>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -bottom-32 right-[10%] h-[350px] w-[350px] rounded-full opacity-[0.08] blur-[80px]"
          style={{ background: "#FFCE1B" }}
        />
        <div
          className="absolute top-0 left-[-5%] h-[400px] w-[400px] rounded-full opacity-[0.12] blur-[100px]"
          style={{ background: "#800080" }}
        />
      </div>

      {/* Brand smile arc SVG — decorative top-right */}
      <svg
        className="absolute top-6 right-[-40px] opacity-[0.07] pointer-events-none"
        width="260"
        height="260"
        viewBox="0 0 260 260"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M 20,230 A 180,180 0 0,1 240,230"
          stroke="#FFCE1B"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 50,200 A 140,140 0 0,1 210,200"
          stroke="#800080"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Upper section */}
        <div className="pt-16 pb-14 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.3fr] lg:gap-12">

          {/* Col 1 — Brand */}
          <div className="flex flex-col items-start gap-5">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logoH.png"
                alt="Happiness Coaching Academy Logo"
                width={40}
                height={40}
                className="h-10 w-10 flex-shrink-0 object-contain"
              />
              <div className="flex flex-col leading-none font-satoshi font-bold">
                <span className="uppercase tracking-wider text-[#FFCE1B]" style={{ fontSize: 13 }}>
                  Happiness
                </span>
                <span className="uppercase tracking-widest text-white/70" style={{ fontSize: 10, marginTop: 2 }}>
                  Coaching Academy
                </span>
              </div>
            </div>

            <p className="text-[13.5px] leading-relaxed text-white/50 max-w-[260px]">
              Happiness is a skill you can learn. Reprogram your mindset, heal emotional blocks, and unlock the calm, confident life you deserve.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/50 transition-all duration-300 hover:-translate-y-0.5 ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4 stroke-[1.8]" />
                  </a>
                );
              })}
            </div>

            {/* Mustard smile accent */}
            <div className="flex items-center gap-2 mt-1">
              <svg width="36" height="20" viewBox="0 0 36 20" fill="none" aria-hidden="true">
                <path d="M 2,18 A 16,16 0 0,1 34,18" stroke="#FFCE1B" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
              </svg>
              <span className="text-[11px] font-bold text-[#FFCE1B]/60 tracking-widest uppercase">Learn happiness</span>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="flex flex-col items-start">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FFCE1B]">
              Quick Links
            </h4>
            <ul className="mt-5 flex flex-col gap-3 text-[13.5px] font-medium text-white/55">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:gap-2.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#800080] flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Programs */}
          <div className="flex flex-col items-start">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FFCE1B]">
              Our Programs
            </h4>
            <ul className="mt-5 flex flex-col gap-3 text-[13.5px] font-medium text-white/55">
              {programs.map((prog) => (
                <li key={prog.label}>
                  <a
                    href={prog.href}
                    className="inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:gap-2.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#FFCE1B] flex-shrink-0" />
                    {prog.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FFCE1B]">
              Get In Touch
            </h4>

            {/* Email */}
            <a
              href="mailto:hello@happinesscoachingacademy.com"
              className="group flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3.5 w-full transition-all duration-300 hover:bg-white/10 hover:border-[#800080]/30"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#800080]/20 text-[#C084FC] group-hover:scale-105 transition-transform">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">Email Us</p>
                <p className="text-[12px] font-semibold text-white/70 break-all mt-0.5">hello@happinesscoachingacademy.com</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919496000000?text=Hi%20HCA%2C%20I%20want%20to%20start%20my%20transformation%20journey"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3.5 w-full transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/30"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 group-hover:scale-105 transition-transform">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/60">WhatsApp</p>
                <p className="text-[13px] font-semibold text-white/70 mt-0.5">+91 9496000000</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-2 px-1 text-[13px] text-white/40">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#FFCE1B]/70" />
              <span>Calicut, Kerala, India</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

        {/* Bottom bar */}
        <div className="py-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11.5px] text-white/30">
          <p>
            © {new Date().getFullYear()} The Happiness Coaching Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span className="text-white/20">Designed with ☀️ &amp; 💜</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 font-bold text-[#FFCE1B]/70 transition-colors hover:text-[#FFCE1B] focus-visible:outline-none"
              aria-label="Scroll back to top of page"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
