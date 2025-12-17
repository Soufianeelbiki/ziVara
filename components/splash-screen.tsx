"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { Sparkles, Lock, Unlock } from "lucide-react"

interface SplashScreenProps {
  onEnter: () => void
  isTransitioning: boolean
}

export function SplashScreen({ onEnter, isTransitioning }: SplashScreenProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const cardX = useMotionValue(0)
  const cardProgress = useTransform(cardX, [0, 280], [0, 100])
  const springCardX = useSpring(cardX, { stiffness: 300, damping: 30 })

  const trackGlow = useTransform(cardProgress, [0, 100], [0, 1])
  const cardRotate = useTransform(cardX, [0, 140, 280], [0, -5, 0])
  const cardScale = useTransform(cardX, [0, 140, 280], [1, 1.1, 1])

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const handleDragStart = () => {
    setIsDragging(true)
    setShowHint(false)
  }

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const rect = containerRef.current.getBoundingClientRect()
    const relativeX = clientX - rect.left - 40 // Account for card width
    const clampedX = Math.min(Math.max(relativeX, 0), 280)

    cardX.set(clampedX)

    if (clampedX > 250 && !isUnlocked) {
      setIsUnlocked(true)
      cardX.set(280)
      setTimeout(onEnter, 800)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    if (!isUnlocked) {
      cardX.set(0)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />

          {/* Floating luxury particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 3 === 0 ? "#d4af37" : "rgba(59, 130, 246, 0.5)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative mb-8 z-10"
          initial={{ scale: 3, opacity: 0, y: 50 }}
          animate={{
            scale: logoAnimationComplete ? 1 : [3, 1.2, 1],
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 2,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.7, 1],
          }}
          onAnimationComplete={() => setLogoAnimationComplete(true)}
        >
          {/* Outer glow rings */}
          <motion.div
            className="absolute inset-0 -m-8 rounded-full"
            animate={{
              boxShadow: [
                "0 0 60px 20px rgba(59, 130, 246, 0.2), 0 0 120px 40px rgba(59, 130, 246, 0.1)",
                "0 0 80px 30px rgba(59, 130, 246, 0.3), 0 0 160px 60px rgba(59, 130, 246, 0.15)",
                "0 0 60px 20px rgba(59, 130, 246, 0.2), 0 0 120px 40px rgba(59, 130, 246, 0.1)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* Gold accent ring */}
          <motion.div
            className="absolute inset-0 -m-4 rounded-full border border-[#d4af37]/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          <Image
            src="/images/zivara-logo.png"
            alt="ZIVARA Logo"
            width={200}
            height={200}
            className="relative z-10 logo-glow"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center mb-12 z-10"
        >
          <motion.div className="overflow-hidden">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-foreground mb-3 tracking-[0.2em]"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
            >
              ZIVARA
            </motion.h1>
          </motion.div>
          <motion.div
            className="flex items-center justify-center gap-4 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          </motion.div>
          <motion.p
            className="text-muted-foreground text-sm tracking-[0.4em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            Style Elegance for the Elite
          </motion.p>
        </motion.div>

        <AnimatePresence>
          {isTransitioning && (
            <>
              {/* Left door */}
              <motion.div
                className="fixed top-0 left-0 w-1/2 h-full z-[60] door-pattern"
                style={{
                  background: "linear-gradient(to right, #0a0a12, #12121a)",
                }}
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              >
                {/* Door frame */}
                <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-[#d4af37] via-[#f5d87a] to-[#d4af37]" />
                {/* Ornate border */}
                <div className="absolute right-2 top-8 bottom-8 w-px bg-[#d4af37]/30" />
                {/* Door handle */}
                <motion.div
                  className="absolute right-6 top-1/2 -translate-y-1/2"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div className="w-3 h-24 rounded-full gold-shine" />
                  <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-8 h-3 rounded-full bg-[#d4af37]" />
                </motion.div>
                {/* Decorative elements */}
                <div className="absolute right-12 top-1/4 w-16 h-px bg-gradient-to-l from-[#d4af37]/50 to-transparent" />
                <div className="absolute right-12 bottom-1/4 w-16 h-px bg-gradient-to-l from-[#d4af37]/50 to-transparent" />
              </motion.div>

              {/* Right door */}
              <motion.div
                className="fixed top-0 right-0 w-1/2 h-full z-[60] door-pattern"
                style={{
                  background: "linear-gradient(to left, #0a0a12, #12121a)",
                }}
                initial={{ x: 0 }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              >
                {/* Door frame */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#d4af37] via-[#f5d87a] to-[#d4af37]" />
                {/* Ornate border */}
                <div className="absolute left-2 top-8 bottom-8 w-px bg-[#d4af37]/30" />
                {/* Door handle */}
                <motion.div
                  className="absolute left-6 top-1/2 -translate-y-1/2"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div className="w-3 h-24 rounded-full gold-shine" />
                  <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-8 h-3 rounded-full bg-[#d4af37]" />
                </motion.div>
                {/* Decorative elements */}
                <div className="absolute left-12 top-1/4 w-16 h-px bg-gradient-to-r from-[#d4af37]/50 to-transparent" />
                <div className="absolute left-12 bottom-1/4 w-16 h-px bg-gradient-to-r from-[#d4af37]/50 to-transparent" />
              </motion.div>

              {/* Center light burst */}
              <motion.div
                className="fixed inset-0 z-[55] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.3)_0%,_transparent_70%)]" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="w-full max-w-md px-6 z-10"
        >
          {/* Card reader housing */}
          <div className="relative p-1 rounded-2xl bg-gradient-to-r from-[#d4af37]/50 via-[#f5d87a]/50 to-[#d4af37]/50">
            <div
              ref={containerRef}
              className="relative h-24 bg-gradient-to-b from-card to-background rounded-xl overflow-hidden swipe-zone"
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onMouseMove={handleDrag}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              onTouchMove={handleDrag}
            >
              {/* Track glow effect */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent/30 via-accent/50 to-[#d4af37]/30"
                style={{
                  width: useTransform(cardProgress, (v) => `${v}%`),
                  opacity: trackGlow,
                }}
              />

              {/* Card slot indicator lines */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                <div className="w-8 h-0.5 bg-[#d4af37]/30 rounded" />
                <div className="w-6 h-0.5 bg-[#d4af37]/20 rounded" />
                <div className="w-8 h-0.5 bg-[#d4af37]/30 rounded" />
              </div>

              {/* Slot destination with icon */}
              <div className="absolute right-16 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <motion.div animate={{ scale: isUnlocked ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.3 }}>
                  {isUnlocked ? (
                    <Unlock className="w-6 h-6 text-[#d4af37]" />
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  )}
                </motion.div>
                <span
                  className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                    isUnlocked ? "text-[#d4af37] font-medium" : "text-muted-foreground"
                  }`}
                >
                  {isUnlocked ? "Access Granted" : "Insert Card"}
                </span>
              </div>

              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-20 h-14 rounded-lg shadow-2xl overflow-hidden"
                style={{
                  x: springCardX,
                  rotate: cardRotate,
                  scale: cardScale,
                }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Card gradient background */}
                <div className="absolute inset-0 gold-shine" />

                {/* Card chip */}
                <div className="absolute top-2 left-2 w-6 h-5 rounded bg-[#c9a227] border border-[#e6c84a]/50">
                  <div className="absolute inset-0.5 flex flex-col justify-center gap-0.5 px-0.5">
                    <div className="h-px bg-[#b8962d]" />
                    <div className="h-px bg-[#b8962d]" />
                    <div className="h-px bg-[#b8962d]" />
                  </div>
                </div>

                {/* ZIVARA text */}
                <div className="absolute top-2 right-2 text-[8px] font-bold text-background/80 tracking-wider">
                  ZIVARA
                </div>

                {/* Card lines */}
                <div className="absolute bottom-3 left-2 right-2">
                  <div className="h-1.5 bg-[#c9a227] rounded mb-1" />
                  <div className="h-1 bg-[#c9a227] rounded w-2/3" />
                </div>

                {/* Shine overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                />
              </motion.div>

              {/* Drag hint animation */}
              {showHint && !isDragging && (
                <motion.div
                  className="absolute top-1/2 left-24 -translate-y-1/2 flex items-center gap-2 text-muted-foreground text-sm pointer-events-none"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], x: [0, 30, 30, 60] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span>Swipe to enter</span>
                  <motion.span
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  >
                    →
                  </motion.span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Status text */}
          <motion.p
            className="text-center text-muted-foreground text-xs mt-4 tracking-[0.3em] uppercase"
            animate={{ opacity: isUnlocked ? 0 : 1 }}
          >
            Exclusive Members Only
          </motion.p>

          {/* Success message */}
          <AnimatePresence>
            {isUnlocked && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-[#d4af37] text-sm mt-4 tracking-wider font-medium"
              >
                Welcome to ZIVARA
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
