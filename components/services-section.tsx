"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Crown,
  Diamond,
  Sparkles,
  Shield,
  Heart,
  Truck,
  Award,
  ArrowRight,
  Zap,
  Star,
  CheckCircle2,
  Palette,
  Layers,
  Fingerprint,
  Cpu,
  Smartphone,
  QrCode,
  Wifi,
  Globe,
  Users,
  BarChart3,
  Lock,
  RefreshCw,
} from "lucide-react";
import { SectionWrapper } from "./section-wrapper";

// Animated counter with smooth easing
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

// Floating particles effect
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// Technology showcase card - NFC + QR explanation
function TechnologyCard() {
  const features = [
    {
      icon: Wifi,
      title: "Technologie NFC",
      desc: "Un simple tap suffit pour partager vos coordonnées",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: QrCode,
      title: "QR Code Universel",
      desc: "Compatible avec tous les appareils, même sans NFC",
      color: "from-purple-500 to-pink-400",
    },
    {
      icon: Globe,
      title: "Profil Digital",
      desc: "Votre page de contact personnalisée accessible partout",
      color: "from-gold to-amber-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative bg-gradient-to-br from-[#0a0a15] to-[#0f0f1a] rounded-3xl border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/30">
              <Cpu className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">
                Double Technologie
              </h3>
              <p className="text-gray-500 text-sm">
                NFC + QR Code pour une compatibilité totale
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="p-8 pt-6 space-y-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual demo */}
        <div className="px-8 pb-8">
          <div className="relative h-20 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-gold/10 border border-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center gap-8">
              <div className="flex items-center gap-2 text-blue-400">
                <Smartphone className="w-5 h-5" />
                <span className="text-sm font-medium">Tap</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <div className="flex items-center gap-2 text-gold">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Connect</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Stats showcase with premium design
function StatsShowcase() {
  const stats = [
    {
      value: 12000,
      suffix: "+",
      label: "Cartes créées",
      icon: Heart,
      color: "text-rose-400",
    },
    {
      value: 99,
      suffix: "%",
      label: "Satisfaction client",
      icon: Award,
      color: "text-gold",
    },
    {
      value: 72,
      suffix: "h",
      label: "Livraison express",
      icon: Truck,
      color: "text-emerald-400",
    },
    {
      value: 50000,
      prefix: "",
      suffix: "+",
      label: "Contacts partagés",
      icon: Users,
      color: "text-blue-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-4"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.1 }}
          viewport={{ once: true }}
          className="group relative bg-gradient-to-br from-[#0a0a15] to-[#0c0c18] rounded-2xl border border-white/10 p-6 hover:border-gold/30 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
          <div className="relative">
            <div
              className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4`}
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
              />
            </div>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Premium benefits grid
function BenefitsGrid() {
  const benefits = [
    {
      icon: Diamond,
      title: "Matériaux Nobles",
      desc: "Or 24K, titane, métal brossé premium",
      gradient: "from-gold/20 to-amber-600/20",
      iconColor: "text-gold",
    },
    {
      icon: Layers,
      title: "Finitions d'Exception",
      desc: "Gravure laser, embossage, détails dorés",
      gradient: "from-emerald-500/20 to-teal-600/20",
      iconColor: "text-emerald-400",
    },
    {
      icon: Fingerprint,
      title: "100% Personnalisable",
      desc: "Design unique adapté à votre identité",
      gradient: "from-purple-500/20 to-pink-600/20",
      iconColor: "text-purple-400",
    },
    {
      icon: BarChart3,
      title: "Analytics Intégrés",
      desc: "Suivez qui consulte votre profil",
      gradient: "from-blue-500/20 to-cyan-600/20",
      iconColor: "text-blue-400",
    },
    {
      icon: RefreshCw,
      title: "Mises à Jour Illimitées",
      desc: "Modifiez vos infos sans changer de carte",
      gradient: "from-orange-500/20 to-red-600/20",
      iconColor: "text-orange-400",
    },
    {
      icon: Lock,
      title: "Données Sécurisées",
      desc: "Protection et confidentialité garanties",
      gradient: "from-gray-500/20 to-slate-600/20",
      iconColor: "text-gray-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      {benefits.map((benefit, i) => (
        <motion.div
          key={benefit.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          viewport={{ once: true }}
          className="group relative bg-gradient-to-br from-[#0a0a12] to-[#0c0c16] rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all duration-300"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`}
          />
          <div className="relative">
            <benefit.icon className={`w-6 h-6 ${benefit.iconColor} mb-3`} />
            <h4 className="text-white font-semibold text-sm mb-1">
              {benefit.title}
            </h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              {benefit.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// VIP Service Banner
function VIPBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      viewport={{ once: true }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-gold/20 to-purple-600/20" />
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ["-200%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="relative bg-gradient-to-br from-[#12101a]/95 to-[#0a080f]/95 rounded-3xl border border-gold/20 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/30 to-purple-500/30 flex items-center justify-center border border-gold/40">
                <Crown className="w-8 h-8 text-gold" />
              </div>
              <motion.div
                className="absolute -inset-2 rounded-3xl border-2 border-gold/30"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-2xl font-serif font-bold text-white">
                  Service VIP
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-xs font-semibold border border-gold/30">
                  EXCLUSIF
                </span>
              </div>
              <p className="text-gray-400">
                Designer dédié • Maquettes illimitées • Livraison prioritaire
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold via-amber-400 to-gold text-background font-semibold rounded-2xl hover:shadow-lg hover:shadow-gold/20 transition-all"
          >
            <span>Devenir VIP</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// Guarantee section
function GuaranteeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-[#0a0a12] to-[#0c0c16] rounded-3xl border border-white/10 p-8"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
              <Shield className="w-7 h-7 text-emerald-400" />
            </div>
          </div>
          <div>
            <h4 className="text-xl font-serif font-bold text-white mb-1">
              Garantie Satisfaction 100%
            </h4>
            <p className="text-gray-400 text-sm">
              Réimpression gratuite si défaut • Révisions illimitées avant
              impression
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gold fill-gold" />
            ))}
          </div>
          <div className="text-right">
            <span className="text-white font-bold text-xl">4.9/5</span>
            <p className="text-gray-500 text-xs">(3,200+ avis)</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <SectionWrapper
      id="services"
      fullHeight={false}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #030305 0%, #08080d 30%, #0a0a12 70%, #030305 100%)",
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingParticles />
        <motion.div
          style={{ y }}
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] -translate-y-1/2"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] translate-y-1/2"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div ref={containerRef} className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10 border border-gold/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium tracking-wider uppercase">
                Notre Expertise
              </span>
              <Diamond className="w-4 h-4 text-gold" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              <span className="text-white">Pourquoi choisir </span>
              <span className="bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
                ZIVARA
              </span>
              <span className="text-white"> ?</span>
            </h2>

            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              La carte de visite NFC nouvelle génération. Partagez vos
              coordonnées d un simple tap, avec un QR code intégré pour une
              compatibilité universelle.
              <span className="text-gold font-medium">
                {" "}
                Premium, élégant, innovant.
              </span>
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <TechnologyCard />
            <StatsShowcase />
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <BenefitsGrid />
          </div>

          {/* VIP Banner */}
          <div className="mb-8">
            <VIPBanner />
          </div>

          {/* Guarantee */}
          <GuaranteeSection />
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </SectionWrapper>
  );
}
