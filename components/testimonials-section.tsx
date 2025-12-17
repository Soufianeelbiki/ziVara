"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { SectionWrapper } from "./section-wrapper"

const testimonials = [
  {
    quote:
      "ZIVARA transformed not just my wardrobe, but my entire presence. The attention to detail is unmatched in this industry.",
    author: "Alexandra R.",
    title: "CEO, Fortune 500",
    image: "/elegant-professional-woman.png",
    rating: 5,
  },
  {
    quote:
      "Working with ZIVARA feels like having a trusted advisor who truly understands the language of luxury and success.",
    author: "Marcus D.",
    title: "Private Investor",
    image: "/elegant-professional-man-portrait-suit.jpg",
    rating: 5,
  },
  {
    quote:
      "Every piece they've curated for me tells a story of excellence. They don't just dress you; they elevate you.",
    author: "Victoria L.",
    title: "Art Collector",
    image: "/elegant-sophisticated-woman-portrait-pearls.jpg",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <SectionWrapper id="testimonials" className="flex items-center bg-card">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10 px-6 w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-sans">Client Voices</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-4">Trusted by the Elite</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-3xl p-10 md:p-16 border border-border/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star className="w-5 h-5 fill-gold text-gold" />
                </motion.div>
              ))}
            </div>

            <Quote className="w-12 h-12 text-gold/30 mb-6" />

            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed mb-10 italic">
                "{testimonials[current].quote}"
              </p>

              <div className="flex items-center gap-4">
                <motion.div
                  className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-gold/50 shadow-lg shadow-gold/20"
                  style={{ backgroundImage: `url('${testimonials[current].image}')` }}
                  whileHover={{ scale: 1.1 }}
                />
                <div>
                  <p className="text-foreground font-serif font-bold text-lg">{testimonials[current].author}</p>
                  <p className="text-gold text-sm">{testimonials[current].title}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              className="w-14 h-14 rounded-full border border-border bg-card/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current ? "bg-gold w-8" : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
            <motion.button
              onClick={next}
              className="w-14 h-14 rounded-full border border-border bg-card/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
