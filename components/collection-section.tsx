"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

const collections = [
  {
    title: "Couture Elegance",
    image: "/luxury-haute-couture-dress-elegant-black-gold.jpg",
    category: "Evening Wear",
  },
  {
    title: "Executive Prestige",
    image: "/luxury-bespoke-suit-tailored-navy-elegant.jpg",
    category: "Business Attire",
  },
  {
    title: "Resort Opulence",
    image: "/luxury-resort-wear-linen-white-elegant-yacht.jpg",
    category: "Leisure",
  },
  {
    title: "Diamond Moments",
    image: "/luxury-jewelry-diamonds-elegant-accessories.jpg",
    category: "Accessories",
  },
]

export function CollectionSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="collection" ref={sectionRef} className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase">Curated Excellence</span>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mt-4 text-balance">The Collection</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((item, index) => (
            <CollectionCard key={item.title} item={item} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CollectionCard({
  item,
  index,
  isInView,
}: {
  item: (typeof collections)[0]
  index: number
  isInView: boolean
}) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1, 0.9])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
    >
      <motion.div style={{ scale: imageScale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${item.image}')` }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-accent text-sm tracking-[0.2em] uppercase"
        >
          {item.category}
        </motion.span>
        <h3 className="text-2xl font-bold text-foreground mt-2 group-hover:text-accent transition-colors">
          {item.title}
        </h3>
      </div>

      {/* Hover overlay */}
      <motion.div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}
