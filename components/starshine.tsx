"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  type: "small" | "medium" | "large" | "diamond"
}

export function Starshine() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 50; i++) {
        const rand = Math.random()
        let type: Star["type"] = "small"
        if (rand > 0.9) type = "large"
        else if (rand > 0.7) type = "diamond"
        else if (rand > 0.4) type = "medium"

        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: type === "large" ? 4 : type === "medium" ? 2.5 : type === "diamond" ? 3 : 1.5,
          delay: Math.random() * 8,
          duration: Math.random() * 4 + 3,
          type,
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, star.type === "large" ? 0.9 : 0.7, 0],
              scale: [0, 1, 0],
              rotate: star.type === "diamond" ? [0, 45, 90] : [0, 180, 360],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 5 + 2,
              ease: "easeInOut",
            }}
          >
            {star.type === "diamond" ? (
              <svg width={star.size * 10} height={star.size * 10} viewBox="0 0 24 24" className="text-accent/50">
                <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" fill="currentColor" />
              </svg>
            ) : (
              <svg
                width={star.size * 8}
                height={star.size * 8}
                viewBox="0 0 24 24"
                fill="none"
                className={star.type === "large" ? "text-gold/70" : "text-gold/50"}
              >
                <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" fill="currentColor" />
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 15}%`,
            top: `${5 + (i % 4) * 25}%`,
            width: 4 + i * 2,
            height: 4 + i * 2,
            background: `radial-gradient(circle, ${i % 2 === 0 ? "rgba(212,175,55,0.4)" : "rgba(59,130,246,0.3)"} 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 6 + i,
            delay: i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-gold/10 via-transparent to-transparent"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-accent/10 via-transparent to-transparent"
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
      />
    </div>
  )
}
