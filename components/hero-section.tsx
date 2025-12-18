"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CreditCard, Layers, Sparkles, Gem, Shield } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { CardPattern, FloatingCards } from "./card-pattern";

// Animated text that reveals letter by letter
function AnimatedText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// Magnetic button with smooth hover effect
function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses =
    "relative px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full text-sm sm:text-base tracking-wider uppercase font-medium overflow-hidden group";
  const variants = {
    primary: "bg-gold text-background",
    secondary: "border-2 border-white/20 text-white hover:border-gold/50",
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      data-cursor-hover
    >
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </div>

      {/* Glow effect for primary */}
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gold/50 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
      )}

      <span className="relative z-10 flex items-center gap-2 justify-center">
        {children}
      </span>
    </motion.a>
  );
}

// Floating business card icons
function FloatingElements() {
  const elements = [
    {
      Icon: CreditCard,
      x: "20%",
      y: "25%",
      size: "w-6 h-6 md:w-8 md:h-8",
      delay: 0,
      color: "text-gold/30",
    },
    {
      Icon: Layers,
      x: "75%",
      y: "30%",
      size: "w-8 h-8 md:w-10 md:h-10",
      delay: 0.5,
      color: "text-gold/40",
    },
    {
      Icon: Gem,
      x: "15%",
      y: "65%",
      size: "w-5 h-5 md:w-6 md:h-6",
      delay: 1,
      color: "text-accent/20",
    },
    {
      Icon: Sparkles,
      x: "80%",
      y: "60%",
      size: "w-6 h-6 md:w-8 md:h-8",
      delay: 1.5,
      color: "text-gold/30",
    },
    {
      Icon: Shield,
      x: "60%",
      y: "75%",
      size: "w-4 h-4 md:w-5 md:h-5",
      delay: 2,
      color: "text-white/10",
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map(({ Icon, x, y, size, delay, color }, i) => (
        <motion.div
          key={i}
          className={`absolute ${size} ${color}`}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            opacity: { delay: delay + 1, duration: 0.5 },
            scale: { delay: delay + 1, duration: 0.5 },
            y: {
              delay: delay + 1.5,
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              delay: delay + 1.5,
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Icon className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
}

// Animated gradient orbs
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gold orb */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-gold/10 via-transparent to-transparent blur-3xl" />
      </motion.div>

      {/* Accent orb */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] md:w-[700px] md:h-[700px]"
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-accent/10 via-transparent to-transparent blur-3xl" />
      </motion.div>

      {/* Center pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-gradient-radial from-white/5 to-transparent" />
      </motion.div>
    </div>
  );
}

// Seeded random for SSR consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Particle field effect - using deterministic positions
function ParticleField() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 1.1 + 100) * 100,
    y: seededRandom(i * 2.2 + 200) * 100,
    size: Math.max(1, seededRandom(i * 3.3 + 300) * 3 + 1),
    duration: Math.max(3, seededRandom(i * 4.4 + 400) * 3 + 3),
    delay: seededRandom(i * 5.5 + 500) * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor:
              particle.id % 3 === 0
                ? "rgba(212,175,55,0.4)"
                : "rgba(255,255,255,0.2)",
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 0.9]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <SectionWrapper
      id="hero"
      className="flex items-center justify-center overflow-hidden"
    >
      <div ref={ref} className="absolute inset-0">
        {/* Background with animated gradient */}
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0 z-0"
        >
          {/* Abstract business card themed background */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 30% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
                radial-gradient(ellipse at center, #0a0a15 0%, #050508 100%)
              `,
            }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
        </motion.div>

        {/* Card grid pattern overlay */}
        <CardPattern variant="geometric" opacity={0.015} />

        {/* Floating business cards */}
        <FloatingCards />

        {/* Gradient orbs */}
        <GradientOrbs />

        {/* Particle field */}
        <ParticleField />

        {/* Floating luxury elements */}
        <FloatingElements />

        {/* Floating card stack watermark */}
        <motion.div
          className="absolute top-1/4 right-1/4 opacity-5 pointer-events-none hidden md:block"
          animate={{
            y: [0, -30, 0],
            rotateY: [0, 5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Stylized card stack */}
          <div className="relative w-64 h-40">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-xl border border-gold/30"
                style={{
                  transform: `translateX(${-i * 10}px) translateY(${i * 5}px)`,
                  background:
                    "linear-gradient(135deg, #1a1a2e 0%, #0a0a15 100%)",
                  opacity: 1 - i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border border-gold/30 bg-gold/5 backdrop-blur-sm rounded-full text-gold text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-6 sm:mb-8">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Cartes de visite premium • Design sur mesure</span>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          </span>
        </motion.div>

        {/* Main heading with animated text */}
        <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-foreground mb-6 sm:mb-8 leading-[1.1]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="overflow-hidden"
          >
            <AnimatedText text="Votre identité" delay={0.5} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="overflow-hidden"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-400 to-gold">
              <AnimatedText text="en une carte" delay={0.8} />
            </span>
          </motion.div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed"
        >
          Cartes de visite d'exception en or 24K, métal, bois noble et finitions
          premium.
          <span className="hidden sm:inline">
            {" "}
            Créez une première impression inoubliable avec nos designs sur
            mesure.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <MagneticButton href="#shop" variant="primary">
            <span>Créer ma carte</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </MagneticButton>

          <MagneticButton href="#collections" variant="secondary">
            Voir les collections
          </MagneticButton>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex items-center justify-center gap-6 sm:gap-8 mt-10 sm:mt-12"
        >
          {[
            { label: "4.9/5", sub: "3,200+ avis" },
            { label: "72h", sub: "Livraison express" },
            { label: "100%", sub: "Satisfaction" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + i * 0.1 }}
              className="text-center"
            >
              <p className="text-lg sm:text-xl font-bold text-gold">
                {item.label}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] sm:text-xs text-muted-foreground tracking-widest uppercase">
            Défiler
          </span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-gold rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
