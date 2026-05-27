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
  // Mixed modern variants to provide rich premium aesthetics
  const variants: ("gradient-brand" | "outlined-mustard" | "outlined-purple" | "elevated")[] = [
    "gradient-brand",
    "outlined-mustard",
    "outlined-purple",
    "elevated"
  ];
  const cardVariant = variants[index % variants.length];

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
              background: "#F6F3FA",
              boxShadow: "inset 3px 3px 7px #DDDAE3, inset -3px -3px 7px #FFFFFF",
            }}
          >
            <div
              className="flex items-center justify-center font-satoshi font-black text-[14px] tracking-wider transition-transform duration-300 group-hover:scale-110"
              style={{
                width: 38,
                height: 38,
                borderRadius: 14,
                background: `${item.color}15`,
                color: item.color,
                boxShadow: `inset 2px 2px 5px ${item.color}20, inset -1px -1px 3px rgba(255,255,255,0.6)`,
              }}
            >
              {item.num}
            </div>
          </div>

          {/* Category Tag Badge */}
          <span 
            className="px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-slate-500"
            style={{ 
              background: "rgba(243,238,250,0.7)", 
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "inset 1px 1px 3px rgba(165,140,217,0.05)"
            }}
          >
            {item.category}
          </span>
        </div>

        {/* Header Content */}
        <h3
          className="font-satoshi font-black text-[24px] leading-tight text-slate-deep mb-3 transition-colors duration-300 group-hover:text-primary"
        >
          {item.title}
        </h3>
        
        <p className="font-medium text-[14.5px] leading-[1.7] text-slate-500 mb-6">
          {item.desc}
        </p>

        {/* Key Highlights Checkmarks */}
        <div className="flex flex-col gap-2.5 mb-2">
          {item.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-3 text-[13.5px] font-semibold text-slate-600">
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
      <div className="border-t border-dashed border-slate-200 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Specifications Quick Detail */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[12px] font-bold text-slate-400">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>DURATION</span>
          </div>
          <span className="text-[13.5px] font-black text-slate-deep">{item.duration}</span>
        </div>

        {/* Explore Button */}
        <button
          onClick={() => onLearnDetails(item)}
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-bold text-[13px] text-white transition-all duration-300 cursor-pointer self-start sm:self-center"
          style={{
            background: `linear-gradient(145deg, #800080, #C084FC)`,
            boxShadow: "0 6px 20px rgba(128,0,128,0.25)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
            e.currentTarget.style.boxShadow = "0 10px 24px rgba(128,0,128,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(128,0,128,0.25)";
          }}
        >
          <span>Learn Details</span>
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
        </button>

      </div>

    </NeuCard>
  );
}
