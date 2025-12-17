"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CreditCard, Lock, Truck, Gift, Check, Crown } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import { SectionWrapper } from "./section-wrapper"

export function CheckoutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { items, totalPrice, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
      clearCart()
    }, 2000)
  }

  if (orderComplete) {
    return (
      <SectionWrapper id="checkout" className="flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-green-500/30"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Order Confirmed</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Thank you for your purchase. Your exclusive ZIVARA pieces will be delivered with the utmost care.
          </p>
          <p className="text-gold">Order confirmation has been sent to your email.</p>
        </motion.div>
      </SectionWrapper>
    )
  }

  if (items.length === 0) {
    return (
      <SectionWrapper id="checkout" className="flex items-center justify-center bg-background">
        <div className="max-w-2xl mx-auto text-center px-6">
          <Crown className="w-12 h-12 text-gold/30 mx-auto mb-6" />
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Checkout</h2>
          <p className="text-muted-foreground">Your bag is empty. Add some exclusive pieces to proceed.</p>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper id="checkout" fullHeight={false} className="bg-background py-20">
      <div className="max-w-6xl mx-auto px-6" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-gold" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-sans">Secure Checkout</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4">Complete Your Order</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8 bg-card/30 p-8 rounded-3xl border border-border/50 backdrop-blur-sm"
          >
            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-semibold text-foreground flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 text-gold flex items-center justify-center text-sm font-sans border border-gold/30">
                  1
                </span>
                Contact Information
              </h3>
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-5 py-4 bg-background/50 border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full px-5 py-4 bg-background/50 border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Shipping */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-semibold text-foreground flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 text-gold flex items-center justify-center text-sm font-sans border border-gold/30">
                  2
                </span>
                Shipping Address
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  className="w-full px-5 py-4 bg-background/50 border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  className="w-full px-5 py-4 bg-background/50 border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
              <input
                type="text"
                placeholder="Street Address"
                required
                className="w-full px-5 py-4 bg-background/50 border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="w-full px-5 py-4 bg-background/50 border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
                <input
                  type="text"
                  placeholder="State"
                  required
                  className="w-full px-5 py-4 bg-background/50 border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  required
                  className="w-full px-5 py-4 bg-background/50 border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-semibold text-foreground flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 text-gold flex items-center justify-center text-sm font-sans border border-gold/30">
                  3
                </span>
                Payment Details
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Card Number"
                  required
                  className="w-full px-5 py-4 pr-12 bg-background/50 border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
                <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM / YY"
                  required
                  className="w-full px-5 py-4 bg-background/50 border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  required
                  className="w-full px-5 py-4 bg-background/50 border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isProcessing}
              whileHover={{ scale: isProcessing ? 1 : 1.02 }}
              whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-gold via-amber-500 to-gold text-background font-bold tracking-wider rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-gold/20"
            >
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                  />
                  PROCESSING...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  PLACE ORDER - {formatPrice(totalPrice + 50)}
                </>
              )}
            </motion.button>

            <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-gold/50" />
              Your payment information is encrypted and secure
            </p>
          </motion.form>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-card to-card/50 rounded-3xl border border-border/50 p-8 backdrop-blur-sm"
          >
            <h3 className="text-xl font-serif font-semibold text-foreground mb-6 flex items-center gap-2">
              <Crown className="w-5 h-5 text-gold" />
              Order Summary
            </h3>

            <div className="space-y-4 max-h-72 overflow-auto scrollbar-thin">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 pb-4 border-b border-border/50"
                >
                  <div className="relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-border/50">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-background text-xs rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-medium text-foreground text-sm">{item.product.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {item.size} / {item.color}
                    </p>
                    <p className="text-gold font-semibold mt-1 text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 pt-4 border-t border-border/50">
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Express Shipping</span>
                <span>{formatPrice(50)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-2xl font-serif font-bold text-foreground pt-4 border-t border-gold/30">
                <span>Total</span>
                <span className="text-gold">{formatPrice(totalPrice + 50)}</span>
              </div>
            </div>

            {/* Perks */}
            <div className="mt-8 space-y-3 p-4 bg-gold/5 rounded-2xl border border-gold/20">
              <p className="text-xs text-gold tracking-wider uppercase font-medium mb-3">ZIVARA Privileges</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Truck className="w-5 h-5 text-gold" />
                <span>Complimentary white-glove delivery</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Gift className="w-5 h-5 text-gold" />
                <span>Luxury gift packaging included</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Lock className="w-5 h-5 text-gold" />
                <span>Secure encrypted payment</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
