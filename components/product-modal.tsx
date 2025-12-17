"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, ShoppingBag, Check } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  if (!product) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return
    addItem(product, selectedSize, selectedColor, quantity)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      onClose()
      setSelectedSize("")
      setSelectedColor("")
      setQuantity(1)
    }, 1500)
  }

  const canAddToCart = selectedSize && selectedColor && product.inStock

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 flex items-center justify-center"
          >
            <div className="relative w-full max-w-5xl max-h-full overflow-auto bg-card rounded-3xl border border-border shadow-2xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-square md:aspect-auto overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                  <motion.div
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:bg-gradient-to-r" />

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {product.new && (
                      <span className="px-4 py-1.5 bg-accent text-accent-foreground text-sm tracking-wider rounded-full">
                        NEW ARRIVAL
                      </span>
                    )}
                    {product.featured && (
                      <span className="px-4 py-1.5 bg-gold text-background text-sm tracking-wider rounded-full">
                        EXCLUSIVE
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 md:p-12 flex flex-col">
                  <span className="text-accent text-sm tracking-[0.3em] uppercase">{product.category}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">{product.name}</h2>

                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground mt-6 leading-relaxed">{product.description}</p>

                  {/* Size Selection */}
                  <div className="mt-8">
                    <label className="text-sm font-medium text-foreground tracking-wider">SIZE</label>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg border transition-all ${
                            selectedSize === size
                              ? "border-accent bg-accent text-accent-foreground"
                              : "border-border hover:border-accent/50 text-foreground"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div className="mt-6">
                    <label className="text-sm font-medium text-foreground tracking-wider">COLOR</label>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                            selectedColor === color.name
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <div
                            className="w-5 h-5 rounded-full border border-border/50"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-sm text-foreground">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mt-6">
                    <label className="text-sm font-medium text-foreground tracking-wider">QUANTITY</label>
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 rounded-lg border border-border hover:border-accent/50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 rounded-lg border border-border hover:border-accent/50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: canAddToCart ? 1.02 : 1 }}
                    whileTap={{ scale: canAddToCart ? 0.98 : 1 }}
                    onClick={handleAddToCart}
                    disabled={!canAddToCart}
                    className={`mt-8 py-4 px-8 rounded-xl font-semibold tracking-wider flex items-center justify-center gap-3 transition-all ${
                      added
                        ? "bg-green-600 text-white"
                        : canAddToCart
                          ? "bg-accent text-accent-foreground hover:bg-accent/90"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        ADDED TO BAG
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        {canAddToCart ? "ADD TO BAG" : "SELECT OPTIONS"}
                      </>
                    )}
                  </motion.button>

                  {/* Total */}
                  {canAddToCart && (
                    <p className="text-center text-muted-foreground mt-4">
                      Total: {formatPrice(product.price * quantity)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
