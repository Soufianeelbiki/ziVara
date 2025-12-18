"use client";

import { motion } from "framer-motion";
import { memo, useMemo } from "react";

interface CardPatternProps {
  variant?: "grid" | "emboss" | "foil" | "geometric";
  opacity?: number;
  className?: string;
}

export function CardPattern({
  variant = "grid",
  opacity = 0.03,
  className = "",
}: CardPatternProps) {
  const patterns = {
    grid: <GridPattern />,
    emboss: <EmbossPattern />,
    foil: <FoilPattern />,
    geometric: <GeometricPattern />,
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {patterns[variant]}
    </div>
  );
}

function GridPattern() {
  return (
    <div className="absolute inset-0">
      {/* Professional grid lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="card-grid"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="50"
              y1="0"
              x2="50"
              y2="50"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gold"
            />
            <line
              x1="0"
              y1="50"
              x2="50"
              y2="50"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gold"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#card-grid)" />
      </svg>
    </div>
  );
}

function EmbossPattern() {
  return (
    <div className="absolute inset-0">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="emboss"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Embossed diamond shapes */}
            <rect
              x="30"
              y="30"
              width="20"
              height="20"
              fill="currentColor"
              className="text-gold"
              transform="rotate(45 40 40)"
              opacity="0.4"
            />
            <rect
              x="32"
              y="32"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gold"
              transform="rotate(45 40 40)"
              opacity="0.6"
            />
            {/* Corner accents */}
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="currentColor"
              className="text-gold"
              opacity="0.3"
            />
            <circle
              cx="80"
              cy="0"
              r="3"
              fill="currentColor"
              className="text-gold"
              opacity="0.3"
            />
            <circle
              cx="0"
              cy="80"
              r="3"
              fill="currentColor"
              className="text-gold"
              opacity="0.3"
            />
            <circle
              cx="80"
              cy="80"
              r="3"
              fill="currentColor"
              className="text-gold"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#emboss)" />
      </svg>
    </div>
  );
}

function FoilPattern() {
  return (
    <div className="absolute inset-0">
      {/* Animated foil shimmer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              120deg,
              transparent 20%,
              rgba(212, 175, 55, 0.1) 40%,
              rgba(245, 231, 163, 0.15) 50%,
              rgba(212, 175, 55, 0.1) 60%,
              transparent 80%
            )
          `,
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Subtle texture */}
      <svg
        className="absolute inset-0 w-full h-full mix-blend-overlay"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5" />
      </svg>
    </div>
  );
}

function GeometricPattern() {
  return (
    <div className="absolute inset-0">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="geometric"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Hexagonal business card inspired pattern */}
            <polygon
              points="30,5 55,17.5 55,42.5 30,55 5,42.5 5,17.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gold"
              opacity="0.5"
            />
            <polygon
              points="30,15 45,22.5 45,37.5 30,45 15,37.5 15,22.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-gold"
              opacity="0.3"
            />
            {/* Center dot */}
            <circle
              cx="30"
              cy="30"
              r="2"
              fill="currentColor"
              className="text-gold"
              opacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geometric)" />
      </svg>
    </div>
  );
}

// Animated floating business cards for hero background - optimized
export const FloatingCards = memo(function FloatingCards() {
  const cards = useMemo(
    () => [
      { x: "10%", y: "20%", rotate: -15, scale: 0.6, delay: 0 },
      { x: "75%", y: "15%", rotate: 20, scale: 0.5, delay: 0.5 },
      { x: "85%", y: "60%", rotate: -10, scale: 0.7, delay: 1 },
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cards.map((card, i) => (
        <div
          key={i}
          className="absolute animate-gentle-float"
          style={{
            left: card.x,
            top: card.y,
            width: 200 * card.scale,
            height: 120 * card.scale,
            transform: `rotate(${card.rotate}deg)`,
            opacity: 0.3,
            animationDelay: `${card.delay}s`,
          }}
        >
          {/* Business card shape */}
          <div className="relative w-full h-full rounded-lg border border-gold/20 bg-gradient-to-br from-[#1a1a2e]/80 to-[#0a0a15]/80 shadow-2xl overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-shine" />

            {/* Card content placeholder */}
            <div className="absolute inset-0 p-3 flex flex-col justify-between">
              <div className="w-6 h-6 rounded bg-gold/20" />
              <div className="space-y-1">
                <div className="h-1.5 w-16 bg-gold/30 rounded" />
                <div className="h-1 w-12 bg-white/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

// Animated card stack for hero
export function CardStackHero() {
  return (
    <div className="relative w-64 h-40 perspective-1000">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-xl border border-gold/30 shadow-2xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #1a1a2e ${
              i * 5
            }%, #0a0a15 100%)`,
            transformStyle: "preserve-3d",
            zIndex: 3 - i,
          }}
          initial={{
            rotateY: -15 + i * 5,
            rotateX: 10,
            x: -i * 20,
            y: i * 10,
            scale: 1 - i * 0.05,
            opacity: 0,
          }}
          animate={{
            rotateY: [-15 + i * 5, -10 + i * 5, -15 + i * 5],
            rotateX: [10, 15, 10],
            opacity: 1,
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.5 + i * 0.15 },
            rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotateX: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            animate={{ x: ["-200%", "200%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1.5,
              delay: i * 0.3,
            }}
          />

          {/* Card content - only on front card */}
          {i === 0 && (
            <div className="relative p-4 h-full flex flex-col justify-between">
              {/* Logo area */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/40 to-gold/20 flex items-center justify-center">
                  <span className="text-gold font-serif text-sm font-bold">
                    Z
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="w-4 h-4 rounded-full border border-gold/30" />
                  <div className="w-4 h-4 rounded-full border border-gold/20" />
                </div>
              </div>

              {/* Text lines */}
              <div className="space-y-1.5">
                <div className="h-2 w-24 bg-gradient-to-r from-gold/50 to-gold/20 rounded" />
                <div className="h-1.5 w-20 bg-white/20 rounded" />
                <div className="h-1.5 w-16 bg-white/10 rounded" />
              </div>

              {/* Gold bottom border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
