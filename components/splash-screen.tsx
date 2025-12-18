"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { Sparkles, ChevronRight } from "lucide-react";

interface SplashScreenProps {
  onEnter: () => void;
  isTransitioning: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

export function SplashScreen({ onEnter, isTransitioning }: SplashScreenProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate particles with useMemo to avoid regeneration
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 4,
        color:
          i % 4 === 0
            ? "#d4af37"
            : i % 4 === 1
            ? "#f5d87a"
            : i % 4 === 2
            ? "rgba(59, 130, 246, 0.6)"
            : "rgba(255,255,255,0.3)",
      })),
    []
  );

  const cardX = useMotionValue(0);
  const maxDrag = 260;
  const cardProgress = useTransform(cardX, [0, maxDrag], [0, 100]);
  const springCardX = useSpring(cardX, { stiffness: 400, damping: 35 });

  const trackGlow = useTransform(cardProgress, [0, 100], [0, 1]);
  const cardRotate = useTransform(cardX, [0, maxDrag / 2, maxDrag], [0, -8, 0]);
  const cardScale = useTransform(
    cardX,
    [0, maxDrag / 2, maxDrag],
    [1, 1.08, 1.02]
  );
  const cardY = useTransform(cardX, [0, maxDrag / 2, maxDrag], [0, -4, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    setShowHint(false);
  }, []);

  const handleDrag = useCallback(
    (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
      if (!isDragging || !containerRef.current || isUnlocked) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = clientX - rect.left - 48;
      const clampedX = Math.min(Math.max(relativeX, 0), maxDrag);

      cardX.set(clampedX);

      if (clampedX > maxDrag - 30 && !isUnlocked) {
        setIsUnlocked(true);
        cardX.set(maxDrag);
        setTimeout(onEnter, 600);
      }
    },
    [isDragging, isUnlocked, cardX, maxDrag, onEnter]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    if (!isUnlocked) {
      cardX.set(0);
    }
  }, [isUnlocked, cardX]);

  // Global mouse/touch event handlers for smoother dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMove = (e: MouseEvent | TouchEvent) => handleDrag(e);
      const handleGlobalUp = () => handleDragEnd();

      window.addEventListener("mousemove", handleGlobalMove);
      window.addEventListener("mouseup", handleGlobalUp);
      window.addEventListener("touchmove", handleGlobalMove);
      window.addEventListener("touchend", handleGlobalUp);

      return () => {
        window.removeEventListener("mousemove", handleGlobalMove);
        window.removeEventListener("mouseup", handleGlobalUp);
        window.removeEventListener("touchmove", handleGlobalMove);
        window.removeEventListener("touchend", handleGlobalUp);
      };
    }
  }, [isDragging, handleDrag, handleDragEnd]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden select-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(212,175,55,0.1),transparent)]" />

          {/* Floating luxury particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                background: p.color,
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
                filter: "blur(0.5px)",
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, Math.sin(p.id) * 20, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Elegant grid lines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
              linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)
            `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        {/* Logo section */}
        <motion.div
          className="relative mb-10 z-10"
          initial={{ scale: 2.5, opacity: 0, y: 60, filter: "blur(20px)" }}
          animate={{
            scale: logoAnimationComplete ? 1 : [2.5, 1.1, 1],
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 2.2,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.6, 1],
          }}
          onAnimationComplete={() => setLogoAnimationComplete(true)}
        >
          {/* Pulsing glow rings */}
          <motion.div
            className="absolute inset-0 -m-12 rounded-full"
            animate={{
              boxShadow: [
                "0 0 60px 15px rgba(212,175,55,0.15), 0 0 100px 30px rgba(59,130,246,0.1)",
                "0 0 80px 25px rgba(212,175,55,0.25), 0 0 140px 50px rgba(59,130,246,0.15)",
                "0 0 60px 15px rgba(212,175,55,0.15), 0 0 100px 30px rgba(59,130,246,0.1)",
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Rotating accent rings */}
          <motion.div
            className="absolute inset-0 -m-6 rounded-full border border-gold/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 -m-10 rounded-full border border-accent/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          />

          <Image
            src="/images/zivara-logo.png"
            alt="ZIVARA Logo"
            width={180}
            height={180}
            className="relative z-10 drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 0 30px rgba(59,130,246,0.4))" }}
            priority
          />
        </motion.div>

        {/* Brand text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 z-10"
        >
          <motion.div className="overflow-hidden">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-[0.25em]"
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              ZIVARA
            </motion.h1>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-5 mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <motion.div
              className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.1, duration: 0.8 }}
            />
            <motion.div
              animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-gold" />
            </motion.div>
            <motion.div
              className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.1, duration: 0.8 }}
            />
          </motion.div>

          <motion.p
            className="text-muted-foreground text-sm tracking-[0.5em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
          >
            Élégance du style, pour l&apos;élite
          </motion.p>
        </motion.div>

        {/* Door transition */}
        <AnimatePresence>
          {isTransitioning && (
            <>
              <motion.div
                className="fixed top-0 left-0 w-1/2 h-full z-[60]"
                style={{
                  background: "linear-gradient(to right, #08080f, #0f0f18)",
                }}
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{
                  duration: 1.2,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.15,
                }}
              >
                <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-gold via-gold/80 to-gold" />
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-20 rounded-full bg-gradient-to-b from-gold to-amber-600"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.div
                className="fixed top-0 right-0 w-1/2 h-full z-[60]"
                style={{
                  background: "linear-gradient(to left, #08080f, #0f0f18)",
                }}
                initial={{ x: 0 }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.2,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.15,
                }}
              >
                <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-gold via-gold/80 to-gold" />
                <motion.div
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-20 rounded-full bg-gradient-to-b from-gold to-amber-600"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.div
                className="fixed inset-0 z-[55] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.4)_0%,transparent_60%)]" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Premium Card Swipe Interface */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm px-6 z-10"
        >
          {/* Card reader frame */}
          <div className="relative">
            {/* Outer glow */}
            <motion.div
              className="absolute -inset-1 rounded-2xl opacity-60"
              style={{
                background: "linear-gradient(90deg, #d4af37, #f5d87a, #d4af37)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Main track */}
            <div
              ref={containerRef}
              className="relative h-20 bg-gradient-to-b from-card via-background to-card rounded-xl overflow-hidden border border-border/50 cursor-grab active:cursor-grabbing"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            >
              {/* Track progress glow */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/40 via-gold/50 to-gold/60"
                style={{
                  width: useTransform(cardProgress, (v) => `${v}%`),
                  opacity: trackGlow,
                }}
              />

              {/* Track shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              />

              {/* Destination indicator */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isUnlocked
                      ? "bg-gold/30 border-2 border-gold"
                      : "bg-border/30 border border-border/50"
                  }`}
                  animate={isUnlocked ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    animate={!isUnlocked ? { x: [0, 4, 0] } : {}}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <ChevronRight
                      className={`w-5 h-5 transition-colors ${
                        isUnlocked ? "text-gold" : "text-muted-foreground"
                      }`}
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Draggable VIP Card */}
              <motion.div
                className="absolute top-1/2 left-2 -translate-y-1/2 touch-none"
                style={{
                  x: springCardX,
                  y: cardY,
                  rotate: cardRotate,
                  scale: cardScale,
                }}
              >
                <div className="relative w-24 h-16 rounded-xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing">
                  {/* Card background with premium gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #f5d87a 0%, #d4af37 30%, #b8962d 60%, #d4af37 100%)",
                    }}
                  />

                  {/* Card pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 2px,
                        rgba(0,0,0,0.1) 2px,
                        rgba(0,0,0,0.1) 4px
                      )`,
                    }}
                  />

                  {/* EMV Chip */}
                  <div className="absolute top-2.5 left-3 w-8 h-6 rounded-sm bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 border border-amber-500/30 overflow-hidden">
                    <div className="absolute inset-0 flex flex-col justify-center gap-[2px] px-1">
                      <div className="h-[1.5px] bg-amber-600/40 rounded" />
                      <div className="h-[1.5px] bg-amber-600/40 rounded" />
                      <div className="h-[1.5px] bg-amber-600/40 rounded" />
                      <div className="h-[1.5px] bg-amber-600/40 rounded" />
                    </div>
                    <div className="absolute inset-0 flex justify-center">
                      <div className="w-[1.5px] h-full bg-amber-600/30" />
                    </div>
                  </div>

                  {/* ZIVARA branding */}
                  <div className="absolute top-2 right-2.5">
                    <span className="text-[9px] font-bold text-background/70 tracking-wider">
                      ZIVARA
                    </span>
                  </div>

                  {/* VIP indicator */}
                  <div className="absolute bottom-2 left-3 right-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] font-bold text-background/60 tracking-widest">
                        VIP MEMBER
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-background/40"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Animated shine */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                    animate={{ x: ["-150%", "150%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>

              {/* Hint animation */}
              {showHint && !isDragging && !isUnlocked && (
                <motion.div
                  className="absolute top-1/2 left-32 -translate-y-1/2 flex items-center gap-2 text-muted-foreground/70 text-sm pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], x: [0, 20, 20, 40] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                >
                  <span className="font-light tracking-wide">Glissez</span>
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Status text */}
          <motion.div className="text-center mt-5" layout>
            <AnimatePresence mode="wait">
              {isUnlocked ? (
                <motion.p
                  key="welcome"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gold text-sm tracking-[0.3em] uppercase font-medium"
                >
                  ✦ Bienvenue chez ZIVARA ✦
                </motion.p>
              ) : (
                <motion.p
                  key="access"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  className="text-muted-foreground text-xs tracking-[0.35em] uppercase"
                >
                  Accès membre exclusif
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
