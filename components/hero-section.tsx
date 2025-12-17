"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Diamond, Crown, Star } from "lucide-react"
import Image from "next/image"
import { SectionWrapper } from "./section-wrapper"

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 0.8])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <SectionWrapper id="hero" className="flex items-center justify-center overflow-hidden">
      <div ref={ref} className="absolute inset-0">
        {/* Animated background image */}
        <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/luxury-fashion-clothing-elegant-dark-moody-high-en.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </motion.div>

        <motion.div
          className="absolute top-1/4 right-1/4 opacity-10 pointer-events-none"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Image src="/images/zivara-logo.png" alt="" width={200} height={200} className="blur-sm" />
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-1/4 left-1/4"
          >
            <Diamond className="w-8 h-8 text-accent/30" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-1/3 right-1/4"
          >
            <Crown className="w-10 h-10 text-gold/30" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-1/3 left-1/3"
          >
            <Star className="w-6 h-6 text-accent/20" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div style={{ y: textY }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-2 border border-accent/30 rounded-full text-accent text-sm tracking-[0.3em] uppercase mb-8">
            Exclusive Styling for the Elite
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground mb-6 leading-tight text-balance"
        >
          Style Elegance
          <br />
          <span className="text-accent">Redefined</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Curated excellence for those who demand the extraordinary. Personal styling that transcends fashion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#shop"
            className="px-10 py-4 bg-accent text-accent-foreground rounded-full text-lg tracking-wider uppercase font-medium"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Collection
          </motion.a>
          <motion.a
            href="#services"
            className="px-10 py-4 border-2 border-foreground/20 text-foreground rounded-full text-lg tracking-wider uppercase font-medium hover:border-accent hover:text-accent transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Our Services
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1.5 h-1.5 bg-accent rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
