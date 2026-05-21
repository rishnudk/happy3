"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface FloatingTagProps {
  label: string;
  iconName: keyof typeof LucideIcons;
  iconColor?: string;
  iconBg?: string;
  className?: string;
  delay?: number;
  yRange?: number[];
  xRange?: number[];
  duration?: number;
}

export default function FloatingTag({
  label,
  iconName,
  iconColor = "text-primary",
  iconBg = "bg-purple-50 border-purple-100",
  className = "",
  delay = 0,
  yRange = [0, -10, 0],
  xRange = [0, 4, 0],
  duration = 5,
}: FloatingTagProps) {
  // Grab the icon component dynamically from Lucide library
  const IconComponent = LucideIcons[iconName] as React.ComponentType<{ className?: string }>;

  return (
    <motion.div
      animate={{ 
        y: yRange,
        x: xRange,
      }}
      transition={{ 
        repeat: Infinity, 
        duration, 
        ease: "easeInOut", 
        delay 
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -15,
        transition: { type: "spring", stiffness: 300, damping: 15 } 
      }}
      className={`
        absolute
        z-30
        flex
        items-center
        gap-3.5
        rounded-full
        pl-3 pr-6 py-2.5
        bg-white/90
        backdrop-blur-md
        border border-white
        shadow-[8px_8px_24px_rgba(165,140,217,0.1),-8px_-8px_24px_rgba(255,255,255,0.95)]
        hover:shadow-[12px_12px_32px_rgba(165,140,217,0.15),-12px_-12px_32px_rgba(255,255,255,1)]
        transition-shadow
        duration-300
        cursor-default
        text-[14px]
        font-bold
        text-slate-deep
        ${className}
      `}
    >
      {/* Dynamic Neumorphic Inset Circle Container for the Icon */}
      <span className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shadow-inner ${iconBg} border`}>
        {IconComponent ? (
          <IconComponent className={`w-4 h-4 ${iconColor}`} />
        ) : (
          <span className="w-2 h-2 rounded-full bg-primary" />
        )}
      </span>
      
      <span className="tracking-wide">{label}</span>
    </motion.div>
  );
}
