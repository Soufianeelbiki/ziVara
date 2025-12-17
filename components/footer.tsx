"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Instagram, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
            <Image src="/images/767a22bb-1a37-4882-8ae8-e8abbcf0ae77.png" alt="ZIVARA" width={50} height={50} />
            <span className="text-2xl font-bold tracking-wider text-foreground">ZIVARA</span>
          </motion.div>

          {/* Social */}
          <div className="flex items-center gap-6">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm tracking-wider">© 2025 ZIVARA. Exclusively Crafted.</p>
        </div>
      </div>
    </footer>
  )
}
