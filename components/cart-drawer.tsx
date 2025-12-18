"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Sparkles,
  Gift,
  Truck,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  // Free shipping threshold
  const freeShippingThreshold = 200;
  const progressToFreeShipping = Math.min(
    (totalPrice / freeShippingThreshold) * 100,
    100
  );
  const remainingForFreeShipping = Math.max(
    freeShippingThreshold - totalPrice,
    0
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Premium Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-gold/20 z-50 flex flex-col shadow-2xl shadow-gold/5"
          >
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-amber-400 to-gold" />

            {/* Header */}
            <div className="relative p-6 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingBag className="w-6 h-6 text-gold" />
                    {totalItems > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-background text-xs font-bold rounded-full flex items-center justify-center"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      Votre panier
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {totalItems} {totalItems === 1 ? "article" : "articles"}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full border border-border hover:border-gold/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Free shipping progress */}
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-secondary/30 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-gold" />
                    {remainingForFreeShipping > 0 ? (
                      <p className="text-xs text-muted-foreground">
                        Plus que{" "}
                        <span className="text-gold font-semibold">
                          {formatPrice(remainingForFreeShipping)}
                        </span>{" "}
                        pour la livraison gratuite
                      </p>
                    ) : (
                      <p className="text-xs text-green-400 font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Livraison gratuite débloquée !
                      </p>
                    )}
                  </div>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressToFreeShipping}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        progressToFreeShipping >= 100
                          ? "bg-gradient-to-r from-green-500 to-emerald-400"
                          : "bg-gradient-to-r from-gold to-amber-400"
                      }`}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Items */}
            <div className="flex-1 overflow-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-gold/50" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border border-gold/20"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Votre panier est vide
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                    Découvrez notre collection exclusive et trouvez des pièces
                    uniques qui vous correspondent.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 bg-gold text-background font-semibold rounded-xl flex items-center gap-2"
                  >
                    Découvrir la collection
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        layout
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative flex gap-4 p-4 bg-secondary/20 rounded-xl border border-transparent hover:border-gold/20 transition-all"
                      >
                        {/* Product Image */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted"
                        >
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                          {/* Subtle shine overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate text-sm">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.size} · {item.color}
                          </p>
                          <p className="text-gold font-bold mt-2">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.size,
                                    item.color,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1.5 rounded-md hover:bg-gold/20 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </motion.button>
                              <motion.span
                                key={item.quantity}
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                className="w-8 text-center text-sm font-semibold"
                              >
                                {item.quantity}
                              </motion.span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.size,
                                    item.color,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1.5 rounded-md hover:bg-gold/20 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </motion.button>
                            </div>

                            {/* Delete Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                removeItem(
                                  item.product.id,
                                  item.size,
                                  item.color
                                )
                              }
                              className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-6 border-t border-border/50 bg-background/50 backdrop-blur-sm"
              >
                {/* Promo code hint */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 bg-gold/5 border border-gold/20 rounded-xl mb-4 cursor-pointer"
                >
                  <Gift className="w-5 h-5 text-gold" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      Ajouter un code promo
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Économisez sur votre commande
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </motion.div>

                {/* Totals */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="text-foreground">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span
                      className={
                        remainingForFreeShipping <= 0
                          ? "text-green-400"
                          : "text-foreground"
                      }
                    >
                      {remainingForFreeShipping <= 0
                        ? "Gratuite"
                        : formatPrice(15)}
                    </span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-gold">
                      {formatPrice(
                        totalPrice + (remainingForFreeShipping <= 0 ? 0 : 15)
                      )}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.a
                  href="#checkout"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsCartOpen(false)}
                  className="relative block w-full py-4 bg-gradient-to-r from-gold to-amber-500 text-background text-center font-bold tracking-wider rounded-xl overflow-hidden shadow-lg shadow-gold/20"
                >
                  {/* Animated shine */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                  <span className="relative">PASSER AU PAIEMENT</span>
                </motion.a>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  Paiement 100% sécurisé · Retours gratuits sous 30 jours
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
