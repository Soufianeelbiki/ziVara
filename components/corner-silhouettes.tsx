"use client";

import { memo, useMemo, useState, useEffect } from "react";

// Seeded random for SSR consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Single star component with CSS animation
const CornerStar = memo(function CornerStar({
  x,
  y,
  size,
  delay,
  opacity,
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
  opacity: number;
}) {
  return (
    <div
      className="absolute rounded-full bg-gold/80 animate-pulse"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: Math.max(1, size),
        height: Math.max(1, size),
        opacity: Math.max(0.1, opacity),
        animationDelay: `${Math.max(0, delay)}s`,
        animationDuration: "3s",
      }}
    />
  );
});

// Generate stars for each corner
function generateCornerStars(corner: string, seed: number, count: number = 8) {
  const stars = [];

  for (let i = 0; i < count; i++) {
    const baseSeed = seed + i * 7.3;

    let x: number, y: number;

    // Deterministic positioning based on corner
    const randX = seededRandom(baseSeed + 1);
    const randY = seededRandom(baseSeed + 2);

    switch (corner) {
      case "top-left":
        x = randX * 20;
        y = randY * 20;
        break;
      case "top-right":
        x = 80 + randX * 20;
        y = randY * 20;
        break;
      case "bottom-left":
        x = randX * 20;
        y = 80 + randY * 20;
        break;
      case "bottom-right":
        x = 80 + randX * 20;
        y = 80 + randY * 20;
        break;
      default:
        x = randX * 100;
        y = randY * 100;
    }

    stars.push({
      id: `${corner}-${i}`,
      x,
      y,
      size: Math.max(1, 1 + seededRandom(baseSeed + 3) * 2.5),
      delay: seededRandom(baseSeed + 4) * 2,
      opacity: 0.3 + seededRandom(baseSeed + 5) * 0.6,
    });
  }

  return stars;
}

// Edge accent component
const EdgeAccent = memo(function EdgeAccent({
  position,
}: {
  position: "left" | "right";
}) {
  return (
    <div
      className={`fixed top-0 bottom-0 w-24 pointer-events-none z-30 ${
        position === "left" ? "left-0" : "right-0"
      }`}
    >
      {/* Subtle gradient shadow */}
      <div
        className={`absolute inset-0 ${
          position === "left"
            ? "bg-gradient-to-r from-black/30 to-transparent"
            : "bg-gradient-to-l from-black/30 to-transparent"
        }`}
      />

      {/* Gold accent line */}
      <div
        className={`absolute top-1/4 bottom-1/4 w-px ${
          position === "left" ? "left-4" : "right-4"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)",
        }}
      />
    </div>
  );
});

export const CornerSilhouettes = memo(function CornerSilhouettes() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate all corner stars with deterministic seeds
  const allStars = useMemo(() => {
    return [
      ...generateCornerStars("top-left", 100, 6),
      ...generateCornerStars("top-right", 200, 6),
      ...generateCornerStars("bottom-left", 300, 6),
      ...generateCornerStars("bottom-right", 400, 6),
    ];
  }, []);

  // Don't render stars until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed inset-0 pointer-events-none z-30">
        <EdgeAccent position="left" />
        <EdgeAccent position="right" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Corner stars */}
      {allStars.map((star) => (
        <CornerStar
          key={star.id}
          x={star.x}
          y={star.y}
          size={star.size}
          delay={star.delay}
          opacity={star.opacity}
        />
      ))}

      {/* Edge accents */}
      <EdgeAccent position="left" />
      <EdgeAccent position="right" />

      {/* Corner vignettes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-black/40 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-black/40 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-black/40 via-transparent to-transparent" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-black/40 via-transparent to-transparent" />
    </div>
  );
});
