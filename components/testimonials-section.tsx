"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star, Wifi } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";

const testimonials = [
  {
    quote:
      "Mes cartes NFC en or 24K ont fait sensation lors du dernier salon. Un simple tap et mes contacts ont toutes mes informations. La technologie au service du luxe !",
    author: "Sophie M.",
    title: "CEO · Cabinet d'avocats · Paris",
    image: "/elegant-professional-woman.png",
    rating: 5,
    cardTier: "royal",
  },
  {
    quote:
      "J'ai commandé les cartes NFC Prestige pour mon cabinet. La qualité est exceptionnelle, le design sublime. Mes clients sont impressionnés dès le premier contact !",
    author: "Thomas D.",
    title: "Architecte · Lyon",
    image: "/elegant-professional-man-portrait-suit.jpg",
    rating: 5,
    cardTier: "prestige",
  },
  {
    quote:
      "Les cartes NFC ZIVARA sont révolutionnaires. Un simple tap et mes prospects ont toutes mes coordonnées. Investissement rentabilisé en une semaine !",
    author: "Camille L.",
    title: "Consultante · Monaco",
    image: "/elegant-sophisticated-woman-portrait-pearls.jpg",
    rating: 5,
    cardTier: "elite",
  },
];

// Testimonial Card Component - styled like a business card
function TestimonialCard({
  testimonial,
  isActive,
  direction,
}: {
  testimonial: (typeof testimonials)[0];
  isActive: boolean;
  direction: number;
}) {
  const tierColors: Record<
    string,
    { bg: string; border: string; accent: string }
  > = {
    elite: {
      bg: "from-[#0d0d15] to-[#1a1a2e]",
      border: "border-gold/30",
      accent: "text-gold",
    },
    prestige: {
      bg: "from-[#0a0a18] to-[#16163a]",
      border: "border-purple-400/30",
      accent: "text-purple-300",
    },
    royal: {
      bg: "from-[#0f0f1a] to-[#1a0f0f]",
      border: "border-rose-400/30",
      accent: "text-rose-300",
    },
  };

  const tier = tierColors[testimonial.cardTier] || tierColors.elite;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: direction * 100,
        rotateY: direction * 15,
        scale: 0.9,
      }}
      animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
      exit={{
        opacity: 0,
        x: direction * -100,
        rotateY: direction * -15,
        scale: 0.9,
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative bg-gradient-to-br ${tier.bg} rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border ${tier.border} backdrop-blur-sm overflow-hidden`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none"
        animate={{ x: ["-150%", "150%"] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* NFC icon */}
      <motion.div
        className="absolute top-4 right-4 sm:top-6 sm:right-6"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Wifi
          className={`w-5 h-5 sm:w-6 sm:h-6 ${tier.accent} opacity-30 rotate-45`}
        />
      </motion.div>

      {/* Rating stars */}
      <div className="flex items-center gap-1 sm:gap-1.5 mb-4 sm:mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-gold text-gold" />
          </motion.div>
        ))}
      </div>

      {/* Quote icon */}
      <Quote
        className={`w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 ${tier.accent} opacity-20 mb-4 sm:mb-6`}
      />

      {/* Quote text */}
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed mb-6 sm:mb-8 md:mb-10 italic">
        "{testimonial.quote}"
      </p>

      {/* Author info - styled like card footer */}
      <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-white/10">
        <div
          className={`w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 rounded-xl bg-cover bg-center border-2 ${tier.border} shadow-lg flex-shrink-0 hover:scale-110 transition-transform`}
          style={{
            backgroundImage: `url('${testimonial.image}')`,
          }}
        />
        <div className="min-w-0 flex-1">
          <p className="text-foreground font-serif font-bold text-base sm:text-lg truncate">
            {testimonial.author}
          </p>
          <p className={`${tier.accent} text-xs sm:text-sm truncate`}>
            {testimonial.title}
          </p>
        </div>
        {/* Card tier badge */}
        <div
          className={`px-3 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider ${tier.border} ${tier.accent} bg-black/30`}
        >
          {testimonial.cardTier}
        </div>
      </div>

      {/* Decorative lines - like card design elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold/30 via-gold/10 to-transparent" />
    </motion.div>
  );
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <SectionWrapper id="testimonials" className="flex items-center bg-card">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-[150px] sm:w-[200px] md:w-[300px] h-[150px] sm:h-[200px] md:h-[300px] bg-gold/5 rounded-full blur-3xl" />

      {/* Floating mini cards decoration */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-10 rounded-lg border border-gold/20 bg-gradient-to-br from-gray-900/50 to-black/50 opacity-20 hidden lg:block"
        animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-20 h-12 rounded-lg border border-purple-400/20 bg-gradient-to-br from-purple-900/30 to-black/50 opacity-20 hidden lg:block"
        animate={{ y: [0, 15, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="max-w-5xl mx-auto relative z-10 px-4 sm:px-6 w-full py-12 md:py-0">
        <div className="text-center mb-8 sm:mb-12">
          <motion.span
            className="inline-flex items-center gap-2 text-accent text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Wifi className="w-4 h-4 rotate-45" />
            Avis clients vérifiés
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mt-3 sm:mt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Ils nous font confiance
          </motion.h2>
          <motion.p
            className="text-muted-foreground mt-3 max-w-md mx-auto text-sm sm:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Découvrez les retours de nos clients qui ont adopté nos cartes NFC
            premium
          </motion.p>
        </div>

        <div className="relative">
          {/* Card swipe animation area */}
          <AnimatePresence mode="wait" initial={false}>
            <TestimonialCard
              key={current}
              testimonial={testimonials[current]}
              isActive={true}
              direction={direction}
            />
          </AnimatePresence>

          {/* Swipe hint */}
          <motion.p
            className="text-center text-muted-foreground/50 text-xs mt-4 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Faites glisser pour voir plus
          </motion.p>

          {/* Navigation */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 rounded-xl border border-border bg-card/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
            <div className="flex items-center gap-2 sm:gap-3">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  whileHover={{ scale: 1.3 }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current
                      ? "bg-gold w-8"
                      : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 rounded-xl border border-border bg-card/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
