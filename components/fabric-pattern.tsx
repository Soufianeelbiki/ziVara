"use client";

import { motion } from "framer-motion";

interface FabricPatternProps {
  variant?: "damask" | "silk" | "brocade" | "velvet";
  opacity?: number;
  className?: string;
}

export function FabricPattern({
  variant = "damask",
  opacity = 0.02,
  className = "",
}: FabricPatternProps) {
  const patterns = {
    damask: <DamaskPattern />,
    silk: <SilkPattern />,
    brocade: <BrocadePattern />,
    velvet: <VelvetPattern />,
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

function DamaskPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="damask"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          {/* Central medallion */}
          <path
            fill="currentColor"
            className="text-gold"
            d="M50,10 
               C60,15 65,25 65,35 
               C65,45 60,50 50,50 
               C40,50 35,45 35,35 
               C35,25 40,15 50,10 Z"
          />
          {/* Symmetrical flourishes */}
          <path
            fill="currentColor"
            className="text-gold"
            d="M50,50 Q60,60 50,70 Q40,60 50,50
               M30,30 Q20,40 30,50 Q40,40 30,30
               M70,30 Q80,40 70,50 Q60,40 70,30
               M30,70 Q20,80 30,90 Q40,80 30,70
               M70,70 Q80,80 70,90 Q60,80 70,70"
            opacity="0.5"
          />
          {/* Leaf accents */}
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-gold"
            d="M10,50 Q25,45 25,30 M10,50 Q25,55 25,70
               M90,50 Q75,45 75,30 M90,50 Q75,55 75,70
               M50,10 Q45,25 30,25 M50,10 Q55,25 70,25
               M50,90 Q45,75 30,75 M50,90 Q55,75 70,75"
            opacity="0.3"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#damask)" />
    </svg>
  );
}

function SilkPattern() {
  return (
    <div className="absolute inset-0">
      {/* Diagonal silk weave lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="silk"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="20"
              y2="20"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-gold"
              opacity="0.5"
            />
            <line
              x1="10"
              y1="0"
              x2="30"
              y2="20"
              stroke="currentColor"
              strokeWidth="0.2"
              className="text-gold"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#silk)" />
      </svg>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-gold/5 to-transparent"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 200%" }}
      />
    </div>
  );
}

function BrocadePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="brocade"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* Floral motif */}
          <circle
            cx="40"
            cy="40"
            r="3"
            fill="currentColor"
            className="text-gold"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-gold"
            d="M40,25 Q50,35 40,40 Q30,35 40,25
               M40,55 Q50,45 40,40 Q30,45 40,55
               M25,40 Q35,50 40,40 Q35,30 25,40
               M55,40 Q45,50 40,40 Q45,30 55,40"
          />
          {/* Corner accents */}
          <path
            fill="currentColor"
            className="text-gold"
            d="M10,10 L15,5 L20,10 L15,15 Z
               M70,10 L75,5 L80,10 L75,15 Z
               M10,70 L15,65 L20,70 L15,75 Z
               M70,70 L75,65 L80,70 L75,75 Z"
            opacity="0.4"
          />
          {/* Connecting curves */}
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            className="text-gold"
            d="M20,10 Q40,20 40,25
               M60,10 Q40,20 40,25
               M20,70 Q40,60 40,55
               M60,70 Q40,60 40,55
               M10,20 Q20,40 25,40
               M10,60 Q20,40 25,40
               M70,20 Q60,40 55,40
               M70,60 Q60,40 55,40"
            opacity="0.3"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#brocade)" />
    </svg>
  );
}

function VelvetPattern() {
  return (
    <div className="absolute inset-0">
      {/* Deep texture gradient */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(212,175,55,0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(212,175,55,0.02) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.1) 0%, transparent 70%)
          `,
        }}
      />

      {/* Subtle noise texture */}
      <svg className="absolute inset-0 w-full h-full opacity-50">
        <defs>
          <filter id="velvetNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <pattern
            id="velvetTexture"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="100"
              height="100"
              filter="url(#velvetNoise)"
              opacity="0.15"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#velvetTexture)" />
      </svg>
    </div>
  );
}

// Decorative border component
export function OrnamentalBorder({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Left border */}
      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      {/* Right border */}
      <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      {/* Corner ornaments */}
      {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
        <div
          key={pos}
          className={`absolute w-8 h-8 ${
            pos === "top-left"
              ? "top-2 left-2"
              : pos === "top-right"
              ? "top-2 right-2 rotate-90"
              : pos === "bottom-left"
              ? "bottom-2 left-2 -rotate-90"
              : "bottom-2 right-2 rotate-180"
          }`}
        >
          <svg viewBox="0 0 32 32" className="w-full h-full text-gold/30">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              d="M2,16 L2,2 L16,2"
            />
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </svg>
        </div>
      ))}
    </div>
  );
}
