"use client"

import { motion } from "framer-motion"
import { ShoppingBag, Eye, Crown, Gem } from "lucide-react"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  index: number
  onSelect: () => void
}

export function ProductCard({ product, index, onSelect }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getRarityLevel = (price: number) => {
    if (price >= 5000) return { label: "Ultra Rare", color: "from-gold via-amber-400 to-gold", icon: Crown }
    if (price >= 3000) return { label: "Rare", color: "from-accent via-blue-400 to-accent", icon: Gem }
    return { label: "Exclusive", color: "from-slate-400 to-slate-500", icon: null }
  }

  const rarity = getRarityLevel(product.price)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <motion.div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-gold/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-gold/50 transition-all duration-700 backdrop-blur-sm">
        {/* Rarity Badge */}
        <div className="absolute top-4 left-4 z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className={`px-3 py-1.5 bg-gradient-to-r ${rarity.color} rounded-full flex items-center gap-1.5 shadow-lg`}
          >
            {rarity.icon && <rarity.icon className="w-3 h-3 text-background" />}
            <span className="text-[10px] font-bold tracking-wider uppercase text-background">{rarity.label}</span>
          </motion.div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {product.new && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
              className="px-3 py-1 bg-accent text-accent-foreground text-[10px] tracking-wider rounded-full font-bold"
            >
              NEW
            </motion.span>
          )}
          {product.featured && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
              className="px-3 py-1 bg-gradient-to-r from-gold to-amber-500 text-background text-[10px] tracking-wider rounded-full font-bold"
            >
              VIP
            </motion.span>
          )}
        </div>

        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${product.image}')` }}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: "-200%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSelect}
                className="p-4 rounded-full bg-foreground/90 text-background hover:bg-gold transition-colors shadow-xl"
              >
                <Eye className="w-5 h-5" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSelect}
                className="p-4 rounded-full bg-accent text-accent-foreground hover:bg-gold hover:text-background transition-colors shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-6 bg-gradient-to-t from-card to-card/80">
          <span className="text-gold text-[10px] tracking-[0.25em] uppercase font-medium">{product.category}</span>
          <h3 className="text-lg font-serif font-semibold text-foreground mt-2 group-hover:text-gold transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-2xl font-serif font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Color Options Preview */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              {product.colors.slice(0, 3).map((color) => (
                <motion.div
                  key={color.name}
                  className="w-5 h-5 rounded-full border-2 border-border hover:border-gold transition-colors cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-muted-foreground self-center">+{product.colors.length - 3}</span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground tracking-wider">Limited Stock</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
