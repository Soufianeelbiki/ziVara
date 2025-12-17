"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, Crown, Diamond, Star } from "lucide-react"
import { SectionWrapper } from "./section-wrapper"

const services = [
  {
    icon: Crown,
    title: "Private Consultations",
    description:
      "One-on-one sessions with our elite stylists in the privacy of your residence or our exclusive showroom.",
  },
  {
    icon: Diamond,
    title: "Bespoke Wardrobe",
    description:
      "Custom-tailored collections from the world's most prestigious fashion houses, curated exclusively for you.",
  },
  {
    icon: Sparkles,
    title: "Event Styling",
    description: "Complete styling for galas, premieres, and exclusive gatherings where presence matters.",
  },
  {
    icon: Star,
    title: "Lifestyle Curation",
    description: "Beyond fashion—we curate your entire aesthetic presence from accessories to art.",
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <SectionWrapper id="services" className="flex items-center bg-card">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10 px-6 py-20 w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-sans">Our Services</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-4 text-balance">
            The ZIVARA Experience
          </h2>
          <p className="text-muted-foreground text-xl mt-6 max-w-2xl mx-auto">
            Every interaction is crafted to exceed the expectations of the most discerning clientele.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group"
            >
              <motion.div
                className="p-10 bg-secondary/50 rounded-2xl border border-border hover:border-accent/50 transition-all duration-500 h-full backdrop-blur-sm"
                whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(59, 130, 246, 0.15)" }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon className="w-8 h-8 text-accent" />
                </motion.div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
