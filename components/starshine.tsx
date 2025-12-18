"use client";

import { useMemo, memo } from "react";

// Seeded random for SSR consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  isGold: boolean;
}

// Optimized Starshine using CSS animations instead of Framer Motion
export const Starshine = memo(function Starshine() {
  const stars = useMemo(() => {
    const newStars: Star[] = [];
    // Reduced from 50 to 20 stars for better performance
    for (let i = 0; i < 20; i++) {
      newStars.push({
        id: i,
        x: seededRandom(i * 1.1) * 100,
        y: seededRandom(i * 2.2) * 100,
        size: 1.5 + seededRandom(i * 3.3) * 2.5,
        delay: seededRandom(i * 4.4) * 8,
        duration: 3 + seededRandom(i * 5.5) * 4,
        isGold: i % 3 === 0,
      });
    }
    return newStars;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full animate-star-twinkle ${
            star.isGold ? "bg-gold/60" : "bg-white/40"
          }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
});
