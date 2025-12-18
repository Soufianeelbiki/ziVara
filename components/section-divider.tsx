"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "gold" | "accent" | "gradient";
  className?: string;
}

export function SectionDivider({
  variant = "gold",
  className = "",
}: SectionDividerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const gradients = {
    gold: "from-transparent via-gold to-transparent",
    accent: "from-transparent via-accent to-transparent",
    gradient: "from-gold via-accent to-gold",
  };

  return (
    <div
      ref={ref}
      className={`relative h-32 flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Main line */}
      <motion.div
        className={`h-px w-full max-w-4xl bg-gradient-to-r ${gradients[variant]}`}
        style={{ scaleX, opacity }}
      />

      {/* Center ornament */}
      <motion.div className="absolute" style={{ opacity }}>
        <div className="relative">
          {/* Diamond shape */}
          <motion.div
            className="w-3 h-3 bg-gold rotate-45"
            animate={{ rotate: [45, 225, 45] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          {/* Glow */}
          <div className="absolute inset-0 bg-gold/50 blur-md rotate-45" />
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/60"
          style={{
            left: `${20 + i * 15}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
