"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, CreditCard } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const navItems = [
  { name: "Services", href: "#services" },
  { name: "Collections", href: "#collections" },
  { name: "Boutique", href: "#shop" },
  { name: "Avis", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setIsMobileMenuOpen(false);
    },
    []
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, [setIsCartOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with card-like element */}
            <motion.a
              href="#"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              {/* Business card shaped logo container */}
              <motion.div
                className="relative w-11 h-7 rounded-md border border-gold/30 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden"
                whileHover={{
                  boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)",
                }}
              >
                {/* Foil shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="text-gold font-serif text-sm font-bold relative z-10">
                  Z
                </span>
              </motion.div>
              <span className="text-2xl font-bold tracking-wider text-foreground">
                ZIVARA
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm tracking-[0.2em] uppercase hover:-translate-y-0.5 transform"
                >
                  {item.name}
                </a>
              ))}

              <button
                onClick={openCart}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-110 transform"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </button>

              <a
                href="#checkout"
                onClick={(e) => handleNavClick(e, "#checkout")}
                className="px-6 py-2 bg-accent text-accent-foreground rounded-full text-sm tracking-wider uppercase hover:bg-accent/90 transition-colors duration-200 hover:scale-105 transform"
              >
                Paiement
              </a>
            </div>

            {/* Mobile menu button and cart */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={openCart}
                className="relative p-2 text-foreground"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </button>
              <button className="text-foreground" onClick={toggleMobileMenu}>
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl pt-20 sm:pt-24 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-4 sm:gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-xl sm:text-2xl text-foreground tracking-wider py-2 border-b border-border/30 hover:text-accent transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="#checkout"
                onClick={(e) => handleNavClick(e, "#checkout")}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="mt-4 px-6 py-3 bg-accent text-accent-foreground rounded-full text-center text-lg tracking-wider uppercase font-medium"
              >
                Paiement
              </motion.a>
            </div>

            {/* Mobile contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-8 border-t border-border/30"
            >
              <p className="text-muted-foreground text-sm tracking-wider">
                Service client
              </p>
              <p className="text-foreground text-lg mt-1">contact@zivara.fr</p>
              <p className="text-foreground text-lg">+33 1 42 00 00 00</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
