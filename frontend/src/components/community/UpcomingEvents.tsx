"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Check, 
  ArrowRight,
  ChevronRight,
  MessageCircle
} from "lucide-react";
import NeuCard from "@/components/ui/NeuCard";
import { EVENTS, EVENT_CATEGORIES } from "./data";
import { CommunityEvent } from "./types";

export default function UpcomingEvents() {
  const [selectedCat, setSelectedCat] = useState<string>("All Events");
  const [rsvpedEvents, setRsvpedEvents] = useState<Record<string, boolean>>({});

  const filteredEvents = selectedCat === "All Events" 
    ? EVENTS 
    : EVENTS.filter(e => e.category === selectedCat);

  const handleRsvp = (id: string) => {
    setRsvpedEvents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const smoothReveal = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="max-w-5xl mx-auto mb-20 relative z-10">
      
      {/* Title block */}
      <div className="text-center flex flex-col items-center gap-4 mb-12">
        <span 
          className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary"
          style={{
            background: "rgba(243,238,250,0.9)",
            border: "1px solid rgba(128,0,128,0.15)"
          }}
        >
          Calendar
        </span>
        <h2 className="font-satoshi font-black text-3xl md:text-4xl text-slate-deep">
          Upcoming Events & Sharing Circles
        </h2>
        <p className="text-[14.5px] leading-relaxed text-slate-500 max-w-xl font-medium">
          Secure your spot in our upcoming masterclasses, acoustic sound circles, and peer gatherings. Tap RSVP to register instantly.
        </p>
      </div>

      {/* Category Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: smoothReveal }}
        className="flex flex-wrap justify-center gap-3.5 mb-14 max-w-3xl mx-auto"
      >
        {EVENT_CATEGORIES.map((cat) => {
          const isActive = selectedCat === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4.5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 cursor-pointer focus:outline-none`}
              style={{
                color: isActive ? "#800080" : "rgba(42,37,75,0.65)",
                background: isActive ? "#F3EEFA" : "linear-gradient(145deg, #ffffff, #f4efff)",
                border: isActive ? "2px solid rgba(128,0,128,0.2)" : "2px solid rgba(255,255,255,0.7)",
                boxShadow: isActive
                  ? "inset 3px 3px 6px #DDDAE3, inset -3px -3px 6px #FFFFFF"
                  : "4px 4px 10px rgba(165,140,217,0.06), -4px -4px 10px #FFFFFF"
              }}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Events Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((item, idx) => {
            const isRsvped = !!rsvpedEvents[item.id];
            
            // Reused card variant index mapping
            const variants: ("gradient-brand" | "outlined-mustard" | "outlined-purple" | "elevated")[] = [
              "gradient-brand",
              "outlined-mustard",
              "outlined-purple",
              "elevated"
            ];
            const cardVariant = variants[idx % variants.length];

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: smoothReveal }}
              >
                <NeuCard
                  variant={cardVariant}
                  animate={false}
                  className="p-8 flex flex-col justify-between gap-6 h-full group transition-all duration-300"
                >
                  <div>
                    {/* Top Row: Format & Date Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <span 
                        className="px-3.5 py-1.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500"
                        style={{ 
                          background: "rgba(243,238,250,0.7)", 
                          border: "1px solid rgba(255,255,255,0.8)",
                          boxShadow: "inset 1px 1px 3px rgba(165,140,217,0.05)"
                        }}
                      >
                        {item.category}
                      </span>

                      {/* Date Badge */}
                      <div className="flex items-center gap-1.5 font-bold text-[12px] text-[#800080]">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-satoshi font-black text-[22px] leading-tight text-slate-deep mb-3 transition-colors duration-300 group-hover:text-primary">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[14px] leading-[1.65] font-medium text-slate-500 mb-6">
                      {item.desc}
                    </p>

                    {/* Specs List: Time & Host */}
                    <div className="flex flex-col gap-2.5 bg-slate-50/50 p-4 rounded-[20px] border border-slate-100/60 mb-2">
                      <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-600">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-bold text-[11px] text-slate-400 uppercase tracking-wider mr-1">Time:</span>
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-600">
                        <User className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-bold text-[11px] text-slate-400 uppercase tracking-wider mr-1">Host:</span>
                        <span>{item.host}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-600">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-bold text-[11px] text-slate-400 uppercase tracking-wider mr-1">Format:</span>
                        <span>{item.format}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="border-t border-dashed border-slate-200 pt-5 flex items-center justify-between gap-4">
                    
                    {/* Secondary WhatsApp Button */}
                    <a
                      href="https://chat.whatsapp.com/invite-link-placeholder" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-bold text-[12.5px] transition-colors duration-300 text-slate-400 hover:text-green-600"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Group</span>
                    </a>

                    {/* RSVP Trigger Button */}
                    <button
                      onClick={() => handleRsvp(item.id)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-[13px] transition-all duration-300 cursor-pointer focus:outline-none"
                      style={{
                        background: isRsvped 
                          ? "rgba(246, 243, 250, 0.9)" 
                          : `linear-gradient(145deg, #800080, #C084FC)`,
                        color: isRsvped ? "#10B981" : "#ffffff",
                        border: isRsvped ? "1.5px solid rgba(16,185,129,0.3)" : "none",
                        boxShadow: isRsvped 
                          ? "inset 3px 3px 6px #DDDAE3, inset -3px -3px 6px #FFFFFF" 
                          : "0 4px 15px rgba(128,0,128,0.22)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isRsvped) {
                          e.currentTarget.style.transform = "translateY(-1.5px) scale(1.02)";
                          e.currentTarget.style.boxShadow = "0 8px 20px rgba(128,0,128,0.3)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isRsvped) {
                          e.currentTarget.style.transform = "translateY(0) scale(1)";
                          e.currentTarget.style.boxShadow = "0 4px 15px rgba(128,0,128,0.22)";
                        }
                      }}
                    >
                      {isRsvped ? (
                        <>
                          <Check className="w-4 h-4" strokeWidth={3} />
                          <span>RSVP Confirmed!</span>
                        </>
                      ) : (
                        <>
                          <span>RSVP Now</span>
                          <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                        </>
                      )}
                    </button>

                  </div>

                </NeuCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
