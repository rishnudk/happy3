"use client";

import React from "react";
import { Check, Clock, ArrowUpRight } from "lucide-react";
import NeuCard from "@/components/ui/NeuCard";
import { ProgramItem } from "./types";

interface ProgramCardProps {
  item: ProgramItem;
  index: number;
  onLearnDetails: (item: ProgramItem) => void;
}

export default function ProgramCard({
  item,
  index,
  onLearnDetails,
}: ProgramCardProps) {
  // Highlight the flagship Certification program (index 3), standard default for others
  const cardVariant = index === 3 ? "gradient-brand" : "dark-glass";

  return (
    <NeuCard
      variant={cardVariant}
      animate={false} // layout handles parent container transitions
      className="p-8 flex flex-col justify-between gap-8 h-full group"
    >
      
      {/* Top Section - Color Bar & Badge Details */}
      <div>
        <div className="flex items-center justify-between mb-6">
          
          {/* Interactive Program Number Container */}
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 54,
              height: 54,
              borderRadius: 18,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              className="flex items-center justify-center font-satoshi font-black text-[14px] tracking-wider transition-transform duration-300 group-hover:scale-110"
              style={{
                width: 38,
                height: 38,
                borderRadius: 14,
                background: `${item.color}30`,
                color: item.color,
              }}
            >
              {item.num}
            </div>
          </div>

          {/* Category Tag Badge */}
          <span 
            className="px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white/70"
            style={{ 
              background: "rgba(255,255,255,0.05)", 
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {item.category}
          </span>
        </div>

        {/* Header Content */}
        <h3
          className="font-satoshi font-black text-[24px] leading-tight text-white mb-3 transition-colors duration-300 group-hover:text-[#FFCE1B]"
        >
          {item.title}
        </h3>
        
        <p className="font-medium text-[14.5px] leading-[1.7] text-white/70 mb-6">
          {item.desc}
        </p>

        {/* Key Highlights Checkmarks */}
        <div className="flex flex-col gap-2.5 mb-2">
          {item.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-3 text-[13.5px] font-semibold text-white/80">
              <span 
                className="flex items-center justify-center w-5 h-5 rounded-full text-white flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}bb)` }}
              >
                <Check className="w-3 h-3" strokeWidth={3} />
              </span>
              <span>{highlight}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Section - Core Specs & Trigger Action Button */}
      <div className="border-t border-dashed border-white/20 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Specifications Quick Detail */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[12px] font-bold text-white/50">
            <Clock className="w-3.5 h-3.5 text-white/50" />
            <span>DURATION</span>
          </div>
          <span className="text-[13.5px] font-black text-white">{item.duration}</span>
        </div>

        {/* Explore Button */}
        <button
          onClick={() => onLearnDetails(item)}
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-bold text-[13px] transition-all duration-300 cursor-pointer self-start sm:self-center"
          style={{
            background: "#FFCE1B",
            color: "#2A254B",
            boxShadow: "0 4px 14px rgba(255, 206, 27, 0.25)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 206, 27, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(255, 206, 27, 0.25)";
          }}
        >
          <span>Learn Details</span>
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
        </button>

      </div>

    </NeuCard>
  );
}
