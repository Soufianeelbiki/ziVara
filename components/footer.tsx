"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Twitter, Linkedin, Wifi, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-card to-background border-t border-gold/10 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Floating mini cards */}
      <motion.div
        className="absolute top-8 left-[10%] w-16 h-10 rounded-lg border border-gold/10 bg-gradient-to-br from-gray-900/30 to-transparent opacity-20 hidden lg:block"
        animate={{ y: [0, -10, 0], rotate: [-8, -5, -8] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-12 right-[15%] w-20 h-12 rounded-lg border border-accent/10 bg-gradient-to-br from-purple-900/20 to-transparent opacity-20 hidden lg:block"
        animate={{ y: [0, 10, 0], rotate: [8, 5, 8] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center gap-8 sm:gap-10">
          {/* Logo styled like a card */}
          <motion.div className="relative" whileHover={{ scale: 1.02 }}>
            <div className="flex items-center gap-3 sm:gap-4 px-6 py-3 rounded-xl border border-gold/20 bg-gradient-to-br from-background/80 to-card/50 backdrop-blur-sm">
              {/* Card-like logo container */}
              <motion.div
                className="relative w-10 h-6 sm:w-12 sm:h-7 rounded-md border border-gold/30 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(212,175,55,0)",
                    "0 0 20px rgba(212,175,55,0.2)",
                    "0 0 0 rgba(212,175,55,0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="text-gold font-serif text-sm font-bold relative z-10">
                  Z
                </span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-foreground">
                  ZIVARA
                </span>
                <span className="text-[10px] text-gold/50 tracking-widest uppercase">
                  NFC Premium
                </span>
              </div>
              <Wifi className="w-4 h-4 text-gold/30 rotate-45 ml-2" />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-muted-foreground text-sm sm:text-base text-center max-w-md tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            L'innovation technologique au service du luxe.
            <br />
            <span className="text-gold/60">
              Cartes NFC connectées haut de gamme.
            </span>
          </motion.p>

          {/* Social with card-like styling */}
          <div className="flex items-center gap-3 sm:gap-4">
            {[
              {
                Icon: Instagram,
                color: "hover:border-pink-400/50 hover:text-pink-400",
              },
              {
                Icon: Twitter,
                color: "hover:border-sky-400/50 hover:text-sky-400",
              },
              {
                Icon: Linkedin,
                color: "hover:border-blue-400/50 hover:text-blue-400",
              },
            ].map(({ Icon, color }, i) => (
              <motion.a
                key={i}
                href="#"
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-border bg-card/50 flex items-center justify-center text-muted-foreground ${color} transition-all duration-300`}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          {/* Bottom info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center">
            <p className="text-muted-foreground text-xs sm:text-sm tracking-wider">
              © 2025 ZIVARA. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground/60 text-xs">
              <CreditCard className="w-3 h-3" />
              <span>Cartes NFC Premium</span>
              <span className="text-gold/30">•</span>
              <span>Made in France</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
