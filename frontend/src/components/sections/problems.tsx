"use client";

import { motion } from "framer-motion";
import PageWrapper from "../layout/page-wrapper";

const problems = [
  {
    num: "01",
    title: "Stress",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        {/* Brain/Mind SVG */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25c-3.176 0-5.75 2.574-5.75 5.75s2.574 5.75 5.75 5.75m0-11.5c3.176 0 5.75 2.574 5.75 5.75s-2.574 5.75-5.75 5.75m0-11.5v11.5m-5.75-5.75h11.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Loneliness",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        {/* Lonely person outline */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.933 0 3.5-1.567 3.5-3.5S13.933 4 12 4 8.5 5.567 8.5 7.5 10.067 11 12 11zm0 2c-3.314 0-6 2.686-6 6v1h12v-1c0-3.314-2.686-6-6-6z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Emotional breakdown",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        {/* Cloud with raindrops */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20v2m3-2v2m3-2v2" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Lack of clarity",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        {/* Question mark with rings */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Parenting pressure",
    icon: (
      <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        {/* Family/parenting icon */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Career anxiety",
    icon: (
      <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        {/* Briefcase */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
];

export default function Problems() {
  return (
    <PageWrapper className="relative py-20 bg-[#FAF9FC]">
      


      <div className="grid items-center gap-12 lg:grid-cols-12">
        
        {/* LEFT COLUMN - TEXT CONTENT (Grid span 5) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          {/* Badge */}
          <div className="inline-flex">
            <span
              className="
                glass-card
                inline-flex
                items-center
                rounded-full
                px-5
                py-2
                text-xs
                font-bold
                text-primary/90
                border-white/80
                shadow-sm
              "
            >
              The Real Challenge
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-[36px] sm:text-[46px] font-extrabold leading-[1.2] text-slate-deep">
              Why are people <br />
              <span className="text-secondary font-black">struggling</span> today?
            </h2>
            
            <p className="text-[16px] text-muted-foreground/90 leading-relaxed font-semibold max-w-sm">
              Most people were never taught how to regulate emotions.
            </p>
          </div>

          {/* Neumorphic Accent Line */}
          <div className="relative w-28 h-[6px] rounded-full bg-purple-100/40 border border-white/50 shadow-inner overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
          </div>
        </div>

        {/* RIGHT COLUMN - 3x2 NEUMORPHIC CARD GRID (Grid span 7) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="
                glass-card
                p-6
                flex
                flex-col
                justify-between
                text-center
                relative
                border-white/70
                shadow-lg
                rounded-[28px]
                hover:scale-[1.03]
                hover:shadow-2xl
                hover:shadow-purple-900/5
                transition-all
                duration-300
                min-h-[160px]
              "
            >
              {/* Card top flex (Icon & Number) */}
              <div className="w-full flex items-center justify-between mb-6">
                
                {/* Neumorphic Icon Container */}
                <div
                  className="
                    w-12
                    h-12
                    bg-white
                    border
                    border-white
                    flex
                    items-center
                    justify-center
                    rounded-2xl
                    shadow-md
                    shadow-purple-900/[0.04]
                  "
                >
                  {item.icon}
                </div>

                {/* Inset Number Badge */}
                <span
                  className="
                    text-[12px]
                    font-extrabold
                    text-primary/70
                    px-2.5
                    py-1
                    rounded-xl
                    bg-[#F3EEFA]/50
                    border
                    border-white/60
                    shadow-[inset_2px_2px_4px_rgba(109,40,217,0.06),_inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                  "
                >
                  {item.num}
                </span>
              </div>

              {/* Title label centered */}
              <h4 className="text-[15px] font-black text-slate-deep tracking-tight text-center">
                {item.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
