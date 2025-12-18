"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, memo } from "react";

// Seeded random for consistent SSR/client rendering
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Floating card particles - optimized
const CardParticles = memo(function CardParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 1.2 + 10) * 100,
      y: seededRandom(i * 2.3 + 20) * 100,
      size: 30 + seededRandom(i * 3.4 + 30) * 40,
      rotation: seededRandom(i * 4.5 + 40) * 360,
      delay: seededRandom(i * 5.6 + 50) * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden will-change-transform">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-lg border border-gold/20 bg-gold/5 animate-float-card"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size * 0.62,
            transform: `rotate(${p.rotation}deg)`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
});

// NFC Pulse Animation - CSS optimized
const NFCPulse = memo(function NFCPulse() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 animate-nfc-pulse"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}
    </div>
  );
});

// Main card - enhanced with NFC chip
function MainCard({ stage, isExiting }: { stage: number; isExiting: boolean }) {
  return (
    <motion.div
      className="relative w-[320px] h-[200px] md:w-[380px] md:h-[235px] perspective-[1000px]"
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={
        isExiting
          ? {
              opacity: 0,
              scale: 2.5,
              z: 500,
              rotateY: 0,
            }
          : {
              opacity: stage >= 1 ? 1 : 0,
              scale: stage >= 1 ? 1 : 0.8,
              rotateY: stage >= 1 ? 0 : -15,
            }
      }
      transition={
        isExiting
          ? {
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            }
          : {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
      }
    >
      {/* Card shadow */}
      <div className="absolute inset-0 rounded-2xl bg-black/50 blur-2xl transform translate-y-4" />

      {/* Main card body */}
      <motion.div
        className="relative w-full h-full rounded-2xl border-2 border-gold/40 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 50%, #0a0a15 100%)",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(212, 175, 55, 0.15)",
          transformStyle: "preserve-3d",
        }}
        animate={
          !isExiting
            ? {
                rotateY: [0, 3, -3, 0],
                rotateX: [0, 2, -2, 0],
              }
            : {}
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Foil shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/25 to-transparent -skew-x-12"
          animate={{ x: ["-200%", "300%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5 }}
        />

        {/* Card content */}
        <div className="relative p-5 md:p-7 h-full flex flex-col justify-between z-10">
          {/* Top section */}
          <div className="flex items-start justify-between">
            {/* Logo */}
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-gold/30 to-gold/5 border border-gold/30 flex items-center justify-center">
              <span className="text-gold font-serif text-xl md:text-2xl font-bold">
                Z
              </span>
            </div>

            {/* NFC chip icon */}
            <motion.div
              className="w-9 h-9 md:w-10 md:h-10 rounded-lg border border-gold/30 flex items-center justify-center bg-gradient-to-br from-gold/10 to-transparent"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(212,175,55,0)",
                  "0 0 20px 5px rgba(212,175,55,0.3)",
                  "0 0 0 0 rgba(212,175,55,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gold"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1.5-2.5" />
                <path d="M7 16c1.5-1.5 2-3.5 2-5 0-3-1.5-4-3-5" />
                <path d="M5 18c2.5-2.5 3.5-6 3.5-8.5 0-4-2-6-4.5-7.5" />
              </svg>
            </motion.div>
          </div>

          {/* Middle section - text lines */}
          <div className="space-y-2">
            <motion.div
              className="h-2.5 w-36 md:w-40 bg-gradient-to-r from-gold/50 via-gold/30 to-gold/10 rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: stage >= 1 ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
            <motion.div
              className="h-1.5 w-28 md:w-32 bg-white/20 rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: stage >= 1 ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
            <motion.div
              className="h-1.5 w-32 md:w-36 bg-white/10 rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: stage >= 1 ? 1 : 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
          </div>

          {/* Bottom section */}
          <div className="flex items-end justify-between">
            {/* QR Code placeholder */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/10 border border-white/20 p-1.5">
              <div className="w-full h-full grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${
                      i % 2 === 0 ? "bg-white/40" : "bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Card info */}
            <div className="text-right">
              <p className="text-gold/70 text-xs tracking-wider font-medium">
                ZIVARA
              </p>
              <p className="text-white/40 text-[10px] tracking-widest">
                PREMIUM NFC
              </p>
            </div>
          </div>
        </div>

        {/* Gold edge accents */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold/60 via-gold/20 to-gold/60" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </motion.div>
    </motion.div>
  );
}

// Card swipe animation - enhanced
function SwipeCards({ isExiting }: { isExiting: boolean }) {
  if (isExiting) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Left swipe card */}
      <motion.div
        className="absolute w-52 h-32 md:w-64 md:h-40 rounded-xl border border-gold/30 bg-gradient-to-br from-[#12121f] to-[#08080f] shadow-xl overflow-hidden"
        initial={{ x: 0, rotate: 0, opacity: 0, scale: 0.9 }}
        animate={{
          x: [0, -40, "-140%"],
          rotate: [0, -5, -18],
          opacity: [0, 1, 1, 0],
          scale: [0.9, 1, 0.95],
        }}
        transition={{
          duration: 1.8,
          delay: 1.5,
          times: [0, 0.2, 0.8, 1],
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1, delay: 1.6 }}
        />
      </motion.div>

      {/* Right swipe card */}
      <motion.div
        className="absolute w-52 h-32 md:w-64 md:h-40 rounded-xl border border-gold/30 bg-gradient-to-br from-[#12121f] to-[#08080f] shadow-xl overflow-hidden"
        initial={{ x: 0, rotate: 0, opacity: 0, scale: 0.9 }}
        animate={{
          x: [0, 40, "140%"],
          rotate: [0, 5, 18],
          opacity: [0, 1, 1, 0],
          scale: [0.9, 1, 0.95],
        }}
        transition={{
          duration: 1.8,
          delay: 1.5,
          times: [0, 0.2, 0.8, 1],
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1, delay: 1.6 }}
        />
      </motion.div>
    </div>
  );
}

// Door zoom transition effect
function DoorZoomTransition({ isExiting }: { isExiting: boolean }) {
  return (
    <AnimatePresence>
      {isExiting && (
        <>
          {/* Top door panel */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 z-50 origin-top"
            style={{
              background:
                "linear-gradient(to bottom, #050508 0%, #0a0a12 100%)",
            }}
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.15,
            }}
          >
            {/* Gold line at edge */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          </motion.div>

          {/* Bottom door panel */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 z-50 origin-bottom"
            style={{
              background: "linear-gradient(to top, #050508 0%, #0a0a12 100%)",
            }}
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.15,
            }}
          >
            {/* Gold line at edge */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          </motion.div>

          {/* Center light burst */}
          <motion.div
            className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, times: [0, 0.3, 1] }}
          >
            <div className="w-full h-full bg-gradient-radial from-gold/30 via-gold/5 to-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function RobeEntrance() {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const timer1 = setTimeout(() => setStage(1), 300);
    const timer2 = setTimeout(() => setStage(2), 1200);
    const timer3 = setTimeout(() => setIsExiting(true), 3000);
    const timer4 = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "auto";
    }, 4100);

    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!isMounted) {
    return <div className="fixed inset-0 z-[200] bg-[#050508]" />;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, #0a0a18 0%, #050508 50%, #020205 100%)",
            }}
            animate={isExiting ? { scale: 1.3, opacity: 0 } : {}}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Grid pattern overlay */}
          <motion.div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
            animate={isExiting ? { opacity: 0, scale: 1.2 } : {}}
            transition={{ duration: 0.6 }}
          />

          {/* Floating card particles */}
          <motion.div
            animate={isExiting ? { opacity: 0, scale: 1.3 } : {}}
            transition={{ duration: 0.5 }}
          >
            <CardParticles />
          </motion.div>

          {/* NFC Pulse effect */}
          {!isExiting && <NFCPulse />}

          {/* Gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full opacity-20 blur-[120px] bg-gold/30"
            animate={
              isExiting
                ? { scale: 1.8, opacity: 0 }
                : { scale: [1, 1.1, 1], opacity: 0.2 }
            }
            transition={
              isExiting ? { duration: 0.8 } : { duration: 4, repeat: Infinity }
            }
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full opacity-15 blur-[100px] bg-purple-500/20"
            animate={
              isExiting
                ? { scale: 1.8, opacity: 0 }
                : { scale: [1, 1.15, 1], opacity: 0.15 }
            }
            transition={
              isExiting ? { duration: 0.8 } : { duration: 5, repeat: Infinity }
            }
          />

          {/* Swipe animation */}
          <SwipeCards isExiting={isExiting} />

          {/* Center content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            animate={isExiting ? { scale: 2.2, opacity: 0, y: -30 } : {}}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Main card */}
            <MainCard stage={stage} isExiting={isExiting} />

            {/* Logo text */}
            <motion.div
              className="text-center mt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isExiting
                  ? { opacity: 0, y: -20 }
                  : { opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 30 }
              }
              transition={{ duration: 0.7, delay: isExiting ? 0 : 0.4 }}
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-gold via-amber-200 to-gold drop-shadow-lg">
                ZIVARA
              </h1>
              <motion.div
                className="flex items-center justify-center gap-3 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 1 ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-gold/60" />
                <p className="text-gold/70 text-xs md:text-sm tracking-[0.3em] uppercase">
                  Cartes NFC Premium
                </p>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-gold/60" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Swipe hint */}
          <motion.p
            className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={
              isExiting
                ? { opacity: 0 }
                : { opacity: stage >= 2 ? [0.3, 0.6, 0.3] : 0 }
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            Chargement...
          </motion.p>

          {/* Door zoom transition */}
          <DoorZoomTransition isExiting={isExiting} />

          {/* Vignette */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.7) 100%)",
            }}
            animate={isExiting ? { opacity: 0 } : {}}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
