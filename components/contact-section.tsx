"use client"

import type React from "react"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Send, Phone, Mail, MapPin, Crown } from "lucide-react"
import { SectionWrapper } from "./section-wrapper"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formState)
  }

  return (
    <SectionWrapper id="contact" className="flex items-center bg-background">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-gold/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10 px-6 w-full" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-5 h-5 text-gold" />
              <span className="text-gold text-sm tracking-[0.3em] uppercase font-sans">Begin Your Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
              Request a Private Consultation
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Your transformation begins with a conversation. Share your vision with us, and our elite team will craft
              an experience tailored exclusively for you.
            </p>

            <div className="space-y-6">
              {[
                { icon: Phone, label: "Private Line", value: "+1 (888) ZIVARA" },
                { icon: Mail, label: "Email", value: "concierge@zivara.com" },
                { icon: MapPin, label: "Private Showroom", value: "Fifth Avenue, New York" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-gold/10 flex items-center justify-center border border-border group-hover:border-gold/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <item.icon className="w-5 h-5 text-gold" />
                  </motion.div>
                  <div>
                    <p className="text-muted-foreground text-sm tracking-wider uppercase">{item.label}</p>
                    <p className="text-foreground font-medium text-lg">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-card/50 p-8 rounded-3xl border border-border/50 backdrop-blur-sm"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-muted-foreground text-xs mb-2 tracking-[0.2em] uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-6 py-4 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground text-xs mb-2 tracking-[0.2em] uppercase">Phone</label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-6 py-4 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground text-xs mb-2 tracking-[0.2em] uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-6 py-4 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-muted-foreground text-xs mb-2 tracking-[0.2em] uppercase">
                  How may we assist you?
                </label>
                <textarea
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-6 py-4 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-muted-foreground/50"
                  placeholder="Tell us about your styling needs..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-gold via-amber-500 to-gold text-background rounded-xl text-lg tracking-wider uppercase font-bold flex items-center justify-center gap-3 shadow-lg shadow-gold/20"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(212, 175, 55, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Request Consultation</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
