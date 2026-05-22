"use client";

import Image from "next/image";
import { 
  Mail, 
  MessageCircle, 
  ArrowUp,
  MapPin,
  Sparkles
} from "lucide-react";
import { 
  InstagramIcon, 
  FacebookIcon, 
  LinkedInIcon, 
  TwitterXIcon 
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
  { icon: InstagramIcon, href: "https://www.instagram.com/happinesscoachingacademy", label: "Instagram", color: "hover:bg-[#E1306C]/10 hover:text-[#E1306C]" },
  { icon: FacebookIcon, href: "https://facebook.com/happinesscoachingacademy", label: "Facebook", color: "hover:bg-[#1877F2]/10 hover:text-[#1877F2]" },
  { icon: LinkedInIcon, href: "https://linkedin.com/company/happinesscoachingacademy", label: "LinkedIn", color: "hover:bg-[#0077B5]/10 hover:text-[#0077B5]" },
  { icon: TwitterXIcon, href: "https://twitter.com/hca_tweets", label: "Twitter", color: "hover:bg-black/10 hover:text-black" },
];

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="relative px-4 pb-12 pt-20 overflow-hidden">
      {/* Soft Decorative Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -bottom-[20%] right-[15%] h-[400px] w-[400px] rounded-full opacity-[0.12] blur-[100px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--mustard) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[10%] left-[5%] h-[450px] w-[450px] rounded-full opacity-[0.1] blur-[110px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--purple-brand) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="glass-surface relative overflow-hidden rounded-[40px] px-8 py-16 md:px-16 md:py-20 shadow-2xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-8">
            
            {/* Column 1: Brand details & Logo */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3">
                <Image
                  src="/home/logo.svg"
                  alt="Happiness Coaching Academy Logo"
                  width={44}
                  height={44}
                  className="h-10 w-10 flex-shrink-0 object-contain"
                />
                <span className="font-display text-lg font-extrabold tracking-tight text-[var(--nature-black)]">
                  Happiness Coaching <span className="text-[var(--purple-brand)]">Academy</span>
                </span>
              </div>
              <p className="mt-5 text-[14px] leading-relaxed text-[var(--nature-black)]/60 max-w-xs">
                Happiness is a skill you can learn. Reprogram your mindset, heal emotional blocks, and unlock the calm, confident life you deserve.
              </p>
              
              {/* Dynamic Social Icons Row */}
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        flex h-9 w-9 items-center justify-center rounded-xl 
                        bg-white/50 border border-black/5 text-[var(--nature-black)]/60
                        shadow-sm transition-all duration-300 hover:-translate-y-0.5
                        ${social.color}
                      `}
                      aria-label={social.label}
                    >
                      <Icon className="h-4.5 w-4.5 stroke-[1.8]" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col items-start">
              <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--purple-brand)]">
                Quick Links
              </h4>
              <ul className="mt-5 flex flex-col gap-3.5 text-[14px] font-medium text-[var(--nature-black)]/65">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="transition-colors hover:text-[var(--purple-brand)] hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Programs */}
            <div className="flex flex-col items-start">
              <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--purple-brand)]">
                Our Programs
              </h4>
              <ul className="mt-5 flex flex-col gap-3.5 text-[14px] font-medium text-[var(--nature-black)]/65">
                {programs.map((prog) => (
                  <li key={prog.label}>
                    <a 
                      href={prog.href} 
                      className="transition-colors hover:text-[var(--purple-brand)] hover:translate-x-0.5 inline-block"
                    >
                      {prog.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact details (WhatsApp & Email) */}
            <div className="flex flex-col items-start">
              <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--purple-brand)]">
                Get In Touch
              </h4>
              <ul className="mt-5 flex flex-col gap-4 text-[14px] font-medium text-[var(--nature-black)]/65 w-full">
                
                {/* Email Row */}
                <li>
                  <a
                    href="mailto:hello@happinesscoachingacademy.com"
                    className="group flex items-start gap-3 rounded-2xl border border-white/60 bg-white/40 px-3.5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/70 hover:border-[var(--purple-brand)]/20"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--purple-brand)]/5 text-[var(--purple-brand)] group-hover:scale-105 transition-transform">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--nature-black)]/45">Email Us</p>
                      <p className="text-[12.5px] font-semibold text-[var(--nature-black)] break-all mt-0.5">hello@happinesscoachingacademy.com</p>
                    </div>
                  </a>
                </li>

                {/* WhatsApp Row */}
                <li>
                  <a
                    href="https://wa.me/15550192834?text=Hi%20HCA%2C%20I%20want%20to%20start%20my%20transformation%20journey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 rounded-2xl border border-white/60 bg-white/40 px-3.5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/70 hover:border-emerald-500/20"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 group-hover:scale-105 transition-transform">
                      <MessageCircle className="h-4.5 w-4.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600/70">WhatsApp</p>
                      <p className="text-[13px] font-semibold text-[var(--nature-black)] mt-0.5">+91 9496000000</p>
                    </div>
                  </a>
                </li>

                {/* Optional Address row */}
                <li className="flex items-center gap-2.5 px-1 py-1 text-[13px] text-[var(--nature-black)]/55">
                  <MapPin className="h-4 w-4 shrink-0 text-[var(--mustard)]" />
                  <span>Calicut, Kerala, India</span>
                </li>

              </ul>
            </div>

          </div>
        </div>

        {/* Bottom copyright & Scroll back to top */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--purple-brand)]/5 pt-8 sm:flex-row text-[12px] text-[var(--nature-black)]/45 px-2">
          <p>
            &copy; {new Date().getFullYear()} The Happiness Coaching Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 font-bold text-[var(--purple-brand)] transition-colors hover:text-[var(--purple-brand)]/80 focus-visible:outline-none"
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
