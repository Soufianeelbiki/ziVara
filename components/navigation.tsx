"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const navItems = [
  { name: "Experience", href: "#services" },
  { name: "Shop", href: "#shop" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { totalItems, setIsCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a href="#" className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
              <Image src="/images/zivara-logo.png" alt="ZIVARA" width={44} height={44} className="drop-shadow-lg" />
              <span className="text-2xl font-bold tracking-wider text-foreground">ZIVARA</span>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm tracking-[0.2em] uppercase"
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-semibold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              <motion.a
                href="#checkout"
                className="px-6 py-2 bg-accent text-accent-foreground rounded-full text-sm tracking-wider uppercase hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Checkout
              </motion.a>
            </div>

            {/* Mobile menu button and cart */}
            <div className="flex items-center gap-4 md:hidden">
              <motion.button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-foreground"
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </motion.button>
              <button className="text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl text-foreground tracking-wider"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#checkout"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-accent tracking-wider"
              >
                Checkout
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
