"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";
import { useState, useCallback } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 500);
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-8 right-8 z-50 group"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          data-cursor-text="Haut"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gold/30 blur-xl"
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Button background */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-gold to-amber-600 shadow-lg shadow-gold/30 flex items-center justify-center overflow-hidden">
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              animate={{
                x: isHovered ? ["100%", "-100%"] : "-100%",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* Icon */}
            <motion.div
              animate={{
                y: isHovered ? -2 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUp className="w-5 h-5 text-background" />
            </motion.div>

            {/* Sparkles on hover */}
            <AnimatePresence>
              {isHovered && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        y: [-10, -30],
                        x: [-10 + i * 10, -15 + i * 15],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Ring animation */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gold/50"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
