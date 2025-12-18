"use client";

import type React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Phone, Mail, MapPin, Crown, Wifi, QrCode } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";

// NFC Contact Card visual element
function ContactCard() {
  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      {/* Card with NFC styling */}
      <motion.div
        className="relative aspect-[1.6/1] rounded-2xl border border-gold/30 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 50%, #0a0a15 100%)",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 175, 55, 0.1)",
        }}
        whileHover={{
          rotateY: 5,
          rotateX: -5,
          boxShadow:
            "0 35px 60px -15px rgba(0, 0, 0, 0.5), 0 0 60px rgba(212, 175, 55, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          animate={{ x: ["-150%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />

        {/* Content */}
        <div className="relative p-6 h-full flex flex-col justify-between z-10">
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/30 to-gold/5 border border-gold/30 flex items-center justify-center">
              <span className="text-gold font-serif text-lg font-bold">Z</span>
            </div>
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Wifi className="w-5 h-5 text-gold/60 rotate-45" />
            </motion.div>
          </div>

          {/* Contact info */}
          <div className="space-y-1">
            <p className="text-gold font-serif text-lg">ZIVARA</p>
            <p className="text-white/60 text-sm">Service Client Premium</p>
            <p className="text-white/40 text-xs tracking-wider">
              contact@zivara.fr
            </p>
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between">
            <div className="w-8 h-8 rounded bg-white/10 border border-white/20 p-1">
              <div className="w-full h-full grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${
                      i % 2 === 0 ? "bg-white/40" : "bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-white/30 text-[10px] tracking-widest uppercase">
              TAP TO CONNECT
            </p>
          </div>
        </div>

        {/* Gold accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold/60 via-gold/20 to-gold/60" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </motion.div>

      {/* NFC pulse rings */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20"
            initial={{ width: 20, height: 20, opacity: 0 }}
            animate={{
              width: [20, 80],
              height: [20, 80],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.6,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <SectionWrapper id="contact" className="flex items-center bg-background">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-gold/5 to-transparent" />

      {/* Floating card decorations */}
      <motion.div
        className="absolute top-20 right-20 w-24 h-14 rounded-xl border border-gold/10 bg-gradient-to-br from-gray-900/30 to-black/30 opacity-20 hidden xl:block"
        animate={{ y: [0, -15, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 left-20 w-20 h-12 rounded-xl border border-purple-400/10 bg-gradient-to-br from-purple-900/20 to-black/20 opacity-20 hidden xl:block"
        animate={{ y: [0, 15, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div
        className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 w-full py-12 md:py-0"
        ref={ref}
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-gold rotate-45" />
              </motion.div>
              <span className="text-gold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-sans">
                Service client NFC
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6 text-balance">
              Connectez-vous avec nous
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
              Notre équipe d'experts NFC est disponible 7j/7 pour vous
              conseiller sur vos cartes connectées. Réponse garantie sous 24h.
            </p>

            {/* Visual NFC card */}
            <div className="mb-8 hidden lg:block">
              <ContactCard />
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  icon: Phone,
                  label: "Téléphone",
                  value: "+33 1 42 00 00 00",
                },
                { icon: Mail, label: "E-mail", value: "contact@zivara.fr" },
                {
                  icon: MapPin,
                  label: "Atelier Paris",
                  value: "8 Rue du Faubourg Saint-Honoré",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-3 sm:gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-accent/20 to-gold/10 flex items-center justify-center border border-border group-hover:border-gold/50 transition-colors flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-xs sm:text-sm tracking-wider uppercase">
                      {item.label}
                    </p>
                    <p className="text-foreground font-medium text-base sm:text-lg truncate">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form styled like a card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative space-y-4 sm:space-y-6 bg-gradient-to-br from-card/80 to-card/40 p-5 sm:p-7 md:p-9 rounded-2xl sm:rounded-3xl border border-gold/20 backdrop-blur-sm overflow-hidden"
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -skew-x-12 pointer-events-none"
                animate={{ x: ["-150%", "200%"] }}
                transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 }}
              />

              {/* Form header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-5 rounded border border-gold/30 bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                    <span className="text-gold text-xs font-bold">Z</span>
                  </div>
                  <span className="text-gold/60 text-xs tracking-widest uppercase">
                    Contact Form
                  </span>
                </div>
                <Wifi className="w-4 h-4 text-gold/40 rotate-45" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-muted-foreground text-[10px] sm:text-xs mb-1.5 sm:mb-2 tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-background/50 border border-border rounded-xl text-foreground text-sm sm:text-base focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground text-[10px] sm:text-xs mb-1.5 sm:mb-2 tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState({ ...formState, phone: e.target.value })
                    }
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-background/50 border border-border rounded-xl text-foreground text-sm sm:text-base focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50"
                    placeholder="+33 6 00 00 00 00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground text-[10px] sm:text-xs mb-1.5 sm:mb-2 tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-background/50 border border-border rounded-xl text-foreground text-sm sm:text-base focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50"
                  placeholder="vous@email.com"
                />
              </div>

              <div>
                <label className="block text-muted-foreground text-[10px] sm:text-xs mb-1.5 sm:mb-2 tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  Votre projet de carte NFC
                </label>
                <textarea
                  rows={4}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-background/50 border border-border rounded-xl text-foreground text-sm sm:text-base focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-muted-foreground/50"
                  placeholder="Parlez-nous de vos besoins (quantité, design, fonctionnalités NFC)..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-gold via-amber-500 to-gold text-background rounded-xl text-sm sm:text-base md:text-lg tracking-wider uppercase font-bold flex items-center justify-center gap-2 sm:gap-3 shadow-lg shadow-gold/20 relative overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(212, 175, 55, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
                <span className="relative z-10">Demander un devis</span>
                <Send className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
              </motion.button>

              {/* Card bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
