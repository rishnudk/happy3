"use client";

import { motion } from "framer-motion";

type FloatingProps = {
  children: React.ReactNode;
  duration?: number;
};

export default function Floating({
  children,
  duration = 6,
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}