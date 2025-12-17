"use client"

import { motion } from "framer-motion"
import { HeroSection } from "./hero-section"
import { ServicesSection } from "./services-section"
import { ShopSection } from "./shop-section"
import { TestimonialsSection } from "./testimonials-section"
import { CheckoutSection } from "./checkout-section"
import { ContactSection } from "./contact-section"
import { Footer } from "./footer"
import { Navigation } from "./navigation"
import { CartDrawer } from "./cart-drawer"
import { Starshine } from "./starshine"

export function MainContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth"
    >
      <Starshine />
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ShopSection />
      <TestimonialsSection />
      <CheckoutSection />
      <ContactSection />
      <Footer />
      <CartDrawer />
    </motion.div>
  )
}
