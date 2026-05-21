"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height?: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: string;
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

export default function Masonry({
  items,
  duration = 0.6,
  stagger = 0.05,
  scaleOnHover = true,
  hoverScale = 0.98,
  blurToFocus = true,
}: MasonryProps) {
  const [columnsCount, setColumnsCount] = useState(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumnsCount(1);
      } else if (window.innerWidth < 1024) {
        setColumnsCount(2);
      } else {
        setColumnsCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {items.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="relative block w-full overflow-hidden rounded-[24px] border border-white/50 bg-white/20 aspect-[4/3] animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Split items into N columns
  const columns: MasonryItem[][] = Array.from({ length: columnsCount }, () => []);
  items.forEach((item, index) => {
    columns[index % columnsCount].push(item);
  });

  return (
    <div className="flex gap-4 md:gap-6 w-full">
      {columns.map((columnItems, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-4 md:gap-6 flex-1">
          {columnItems.map((item, itemIdx) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration,
                delay: (itemIdx * columnsCount + colIdx) * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                scaleOnHover
                  ? {
                      scale: hoverScale,
                      transition: { duration: 0.3 },
                    }
                  : undefined
              }
              className="
                relative
                block
                w-full
                overflow-hidden
                rounded-[24px]
                border
                border-white/60
                bg-white/40
                shadow-[8px_8px_20px_rgba(165,140,217,0.03),_-8px_-8px_20px_rgba(255,255,255,0.85)]
                hover:shadow-[12px_12px_28px_rgba(165,140,217,0.06),_-12px_-12px_28px_rgba(255,255,255,0.95)]
                transition-all
                duration-300
                group
                cursor-pointer
              "
              style={{
                height: item.height ? `${item.height * 0.7}px` : "300px",
                maxHeight: "450px",
              }}
            >
              {/* Image */}
              <img
                src={item.img}
                alt="Community life at HCA"
                className={`
                  w-full
                  h-full
                  object-cover
                  transition-all
                  duration-750
                  ease-out
                  ${blurToFocus ? "blur-[1.5px] scale-[1.02]" : "blur-0"}
                  group-hover:blur-0
                  group-hover:scale-105
                `}
                onLoad={(e) => {
                  (e.target as HTMLImageElement).style.filter = "blur(0px)";
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  View on Instagram <span className="text-sm font-normal">↗</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      ))}
    </div>
  );
}
