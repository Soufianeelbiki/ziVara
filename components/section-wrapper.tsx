"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  fullHeight?: boolean
}

export function SectionWrapper({ children, className = "", id, fullHeight = true }: SectionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`relative snap-start ${fullHeight ? "min-h-screen" : ""} ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Section reveal overlay */}
      <motion.div
        className="absolute inset-0 bg-background pointer-events-none z-50"
        initial={{ scaleY: 1 }}
        animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top" }}
      />

      {/* Ambient light effect on section entry */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0, 0.3, 0] } : { opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
        }}
      />

      {children}
    </motion.section>
  )
}
