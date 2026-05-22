"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface ChallengeCardProps {
  title: string;
  /** Number badge (e.g. "01"). Omit to hide the badge entirely. */
  num?: string;
  icon: LucideIcon;
  /** Hex colour used for the icon and inner disc tint, e.g. "#800080" */
  iconColor: string;
  delay?: number;
  isActive?: boolean;
  className?: string;
  /** Ref forwarded to the root div — used for connector line anchoring.
   *  Accepts both RefObject and callback-ref forms.
   */
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function ChallengeCard({
  title,
  num,
  icon: Icon,
  iconColor,
  delay = 0,
  isActive = false,
  className = "",
  innerRef,
}: ChallengeCardProps) {
  const showNum = Boolean(num);

  return (
    <motion.div
      ref={innerRef}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      whileHover={{
        y: -6,
        scale: 1.03,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`challenge-card group relative flex flex-col p-5 sm:p-6 cursor-default ${className}`}
      style={{
        background: "linear-gradient(145deg, #fdfcff, #f5f0fb)",
        borderRadius: 28,
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: `
          9px 9px 22px rgba(165,140,217,0.13),
          -9px -9px 22px rgba(255,255,255,0.95),
          inset 1px 1px 2px rgba(255,255,255,0.9),
          inset -1px -1px 2px rgba(128,0,128,0.03)
        `,
        minHeight: 160,
        justifyContent: showNum ? "space-between" : "center",
        alignItems: showNum ? "stretch" : "center",
        gap: showNum ? 0 : 14,
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.55), transparent 65%)",
        }}
      />

      {/* Active pulse ring */}
      {isActive && (
        <span
          className="absolute inset-0 rounded-[28px] animate-ping pointer-events-none"
          style={{
            animationDuration: "2.6s",
            background: "transparent",
            border: `1.5px solid rgba(128,0,128,0.18)`,
          }}
        />
      )}

      {/* ── Layout when num IS shown: icon left, badge right, title bottom ── */}
      {showNum ? (
        <>
          {/* Top row: icon + number */}
          <div className="flex items-start justify-between w-full">
            {/* Neumorphic icon orb */}
            <IconOrb Icon={Icon} iconColor={iconColor} />

            {/* Inset number badge */}
            <span
              className="text-[11px] font-extrabold tracking-widest"
              style={{
                color: "rgba(128,0,128,0.35)",
                background: "rgba(243,238,250,0.55)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow:
                  "inset 2px 2px 5px rgba(165,140,217,0.06), inset -2px -2px 5px rgba(255,255,255,0.85)",
                borderRadius: 10,
                padding: "4px 9px",
              }}
            >
              {num}
            </span>
          </div>

          {/* Card title */}
          <div className="mt-auto pt-5">
            <CardTitle title={title} />
          </div>
        </>
      ) : (
        /* ── Layout when num is OMITTED: centred icon + title below ── */
        <>
          <IconOrb Icon={Icon} iconColor={iconColor} />
          <CardTitle title={title} centred />
        </>
      )}
    </motion.div>
  );
}

/* ── Sub-components kept in the same file for simplicity ── */

function IconOrb({
  Icon,
  iconColor,
}: {
  Icon: LucideIcon;
  iconColor: string;
}) {
  return (
    <div
      className="flex items-center justify-center relative overflow-hidden flex-shrink-0"
      style={{
        width: 52,
        height: 52,
        borderRadius: 16,
        background: "linear-gradient(145deg, #ffffff, #f0eaf8)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: `
          4px 4px 10px rgba(165,140,217,0.12),
          -4px -4px 10px rgba(255,255,255,0.95),
          inset 1px 1px 2px rgba(255,255,255,0.8)
        `,
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Inner coloured disc */}
      <div
        className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          background: `${iconColor}18`,
          boxShadow: `inset 2px 2px 6px ${iconColor}22, inset -1px -1px 3px rgba(255,255,255,0.9)`,
        }}
      >
        <Icon style={{ color: iconColor, width: 18, height: 18, strokeWidth: 2.2 }} />
      </div>
    </div>
  );
}

function CardTitle({ title, centred = false }: { title: string; centred?: boolean }) {
  return (
    <h3
      className="font-satoshi font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-[#800080]"
      style={{
        fontSize: 15,
        color: "#2A254B",
        textAlign: centred ? "center" : "left",
      }}
    >
      {title}
    </h3>
  );
}
