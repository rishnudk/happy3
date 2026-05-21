"use client";

import { motion } from "framer-motion";
import { Users, Star, Globe } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      value: "25k+",
      label: "Lives transformed",
      icon: Users,
      iconColor: "text-primary",
      iconBg: "bg-purple-50/60 border-purple-100/60",
    },
    {
      value: "99%",
      label: "Client satisfaction",
      icon: Star,
      iconColor: "text-secondary fill-secondary animate-pulse",
      iconBg: "bg-amber-50/60 border-amber-100/60",
    },
    {
      value: "10+",
      label: "Countries reached",
      icon: Globe,
      iconColor: "text-primary",
      iconBg: "bg-purple-50/60 border-purple-100/60",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
      className="mt-20 lg:mt-24 z-20 relative max-w-5xl mx-auto w-full px-4 sm:px-6"
    >
      <div
        className="
          rounded-[32px]
          bg-white/80
          backdrop-blur-md
          border border-white
          shadow-[10px_10px_30px_rgba(165,140,217,0.06),-10px_-10px_30px_rgba(255,255,255,0.95)]
          py-8 px-6 sm:px-12
          grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4
          items-center
          relative
          overflow-hidden
        "
      >
        {/* Soft internal gradient background highlight */}
        <span className="absolute inset-0 bg-gradient-to-tr from-purple-50/10 via-transparent to-amber-50/10 pointer-events-none" />

        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-6 justify-center md:justify-start relative z-10 px-4 md:px-6"
            >
              {/* Circular Neumorphic Inset Icon Slot */}
              <div 
                className={`
                  w-14 h-14 
                  rounded-full 
                  flex items-center justify-center 
                  border
                  ${stat.iconBg} 
                  shadow-[inset_2px_2px_5px_rgba(165,140,217,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]
                  relative
                `}
              >
                {stat.value === "99%" && (
                  <span className="absolute inset-0 rounded-full bg-secondary/15 filter blur-md animate-ping" style={{ animationDuration: "3s" }} />
                )}
                <IconComponent className={`w-6 h-6 relative z-10 ${stat.iconColor}`} strokeWidth={2} />
              </div>

              {/* Stat Typography */}
              <div className="text-left">
                <h4 className="text-3xl sm:text-4xl font-extrabold text-slate-deep tracking-tight leading-none">
                  {stat.value}
                </h4>
                <p className="text-[13px] sm:text-[14px] text-muted-foreground font-semibold mt-1 tracking-wide">
                  {stat.label}
                </p>
              </div>

              {/* Separators between stats on Desktop */}
              {idx < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-purple-900/10" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
