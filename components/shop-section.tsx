"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { products, categories, type Product } from "@/lib/products"
import { ProductCard } from "./product-card"
import { ProductModal } from "./product-modal"
import { SectionWrapper } from "./section-wrapper"
import { Crown, Diamond, Shield, Lock } from "lucide-react"

export function ShopSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory)

  return (
    <SectionWrapper
      id="shop"
      fullHeight={false}
      className="bg-gradient-to-b from-background via-secondary/20 to-background py-20"
    >
      {/* Exclusive privilege header overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative" ref={sectionRef}>
        {/* Privilege Badge Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 border border-gold/30 rounded-full backdrop-blur-sm">
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Members Only Collection</span>
            <Lock className="w-4 h-4 text-gold" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Diamond className="w-6 h-6 text-accent" />
            <span className="text-accent text-sm tracking-[0.3em] uppercase font-sans">Exclusive Collection</span>
            <Diamond className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-4 text-balance">
            The <span className="text-gold">Privilege</span> Boutique
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Pieces reserved for the discerning few. Each garment is a statement of unparalleled excellence, crafted for
            those who accept nothing less than extraordinary.
          </p>

          {/* Rarity Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-8 mt-8"
          >
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-gold">8</p>
              <p className="text-xs text-muted-foreground tracking-wider uppercase">Exclusive Pieces</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-gold">Top 1%</p>
              <p className="text-xs text-muted-foreground tracking-wider uppercase">Clientele Access</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-gold">Limited</p>
              <p className="text-xs text-muted-foreground tracking-wider uppercase">Availability</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Filter with elegant styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm tracking-wider transition-all duration-500 relative overflow-hidden ${
                activeCategory === category
                  ? "bg-gradient-to-r from-accent via-accent to-accent/80 text-accent-foreground shadow-lg shadow-accent/25"
                  : "bg-card/80 text-muted-foreground hover:text-foreground border border-border hover:border-gold/50 backdrop-blur-sm"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {category === "All" && <Crown className="w-3 h-3" />}
                {category}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid with staggered reveal */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onSelect={() => setSelectedProduct(product)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom exclusive notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-card/50 border border-border/50 rounded-2xl backdrop-blur-sm">
            <Lock className="w-4 h-4 text-gold" />
            <p className="text-muted-foreground text-sm">
              Private viewings available for <span className="text-gold font-medium">ZIVARA Elite</span> members
            </p>
          </div>
        </motion.div>
      </div>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
    </SectionWrapper>
  )
}
