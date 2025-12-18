"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring animation for the progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Show progress bar after initial scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-amber-400 to-gold z-[100] origin-left"
        style={{ scaleX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow effect under progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-4 bg-gradient-to-b from-gold/20 to-transparent z-[99] origin-left pointer-events-none blur-sm"
        style={{ scaleX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
