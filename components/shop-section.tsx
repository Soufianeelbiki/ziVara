"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  premiumCards,
  products,
  categories,
  type Product,
} from "@/lib/products";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";
import { SectionWrapper } from "./section-wrapper";
import Image from "next/image";
import {
  Crown,
  Diamond,
  Shield,
  Sparkles,
  Star,
  ArrowRight,
  Lock,
  Wifi,
  QrCode,
  Check,
  ChevronRight,
  Zap,
} from "lucide-react";

// Seeded random for consistent SSR/client
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Lightweight starfield with CSS animations
function ShopStarfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 1.5) * 100,
      y: seededRandom(i * 2.5) * 100,
      size: Math.max(1, 0.5 + seededRandom(i * 3.5) * 2),
      duration: Math.max(2, 2 + seededRandom(i * 4.5) * 3),
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-gold/40 animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Premium NFC Card Component
function PremiumCardShowcase({
  product,
  index,
  onSelect,
}: {
  product: Product;
  index: number;
  onSelect: () => void;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const tierConfig = {
    elite: {
      gradient: "from-blue-600 via-blue-500 to-cyan-400",
      bgGradient: "from-blue-950/50 to-blue-900/30",
      borderColor: "border-blue-500/30",
      glowColor: "shadow-blue-500/20",
      badge: "STARTER",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    },
    prestige: {
      gradient: "from-gold via-amber-400 to-yellow-300",
      bgGradient: "from-amber-950/50 to-amber-900/30",
      borderColor: "border-gold/40",
      glowColor: "shadow-gold/30",
      badge: "POPULAIRE",
      badgeColor: "bg-gold/20 text-gold border-gold/40",
    },
    royal: {
      gradient: "from-purple-500 via-pink-500 to-rose-400",
      bgGradient: "from-purple-950/50 to-purple-900/30",
      borderColor: "border-purple-500/40",
      glowColor: "shadow-purple-500/30",
      badge: "PREMIUM",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-400/30",
    },
  };

  const tier = product.tier || "elite";
  const config = tierConfig[tier];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative group"
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-4 bg-gradient-to-r ${config.gradient} rounded-[32px] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700`}
      />

      {/* Main card */}
      <div
        className={`relative bg-gradient-to-br ${config.bgGradient} rounded-3xl ${config.borderColor} border overflow-hidden backdrop-blur-sm`}
      >
        {/* Popular badge for Prestige */}
        {tier === "prestige" && (
          <div className="absolute top-0 left-0 right-0 z-20">
            <div className="flex justify-center -mt-px">
              <div
                className={`px-4 py-1.5 ${config.badgeColor} border-x border-b rounded-b-xl text-xs font-bold tracking-wider uppercase`}
              >
                ⭐ Le Plus Populaire
              </div>
            </div>
          </div>
        )}

        {/* Card image area */}
        <div className="relative p-6 pb-4">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
            {/* Card image */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* NFC indicator */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
              <Wifi className="w-3 h-3 text-blue-400" />
              <span className="text-white text-[10px] font-semibold tracking-wide">
                NFC
              </span>
            </div>

            {/* QR indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
              <QrCode className="w-3 h-3 text-purple-400" />
              <span className="text-white text-[10px] font-semibold tracking-wide">
                QR
              </span>
            </div>

            {/* Hover overlay */}
            <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center">
                <button
                  onClick={onSelect}
                  className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${config.gradient} text-background text-sm font-semibold rounded-xl hover:scale-105 transition-transform`}
                >
                  <span>Voir les détails</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Card content */}
        <div className="px-6 pb-6">
          {/* Tier badge */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${config.badgeColor}`}
            >
              {tier.toUpperCase()}
            </span>
            {product.new && (
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30">
                NOUVEAU
              </span>
            )}
          </div>

          {/* Name and price */}
          <h3 className="text-2xl font-serif font-bold text-white mb-1">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-3 mb-4">
            <span
              className={`text-3xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
            >
              {product.price}€
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-lg">
                {product.originalPrice}€
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-5 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Features */}
          <div className="space-y-2.5 mb-6">
            {product.features?.slice(0, 4).map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div
                  className={`w-5 h-5 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center flex-shrink-0`}
                >
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
            {product.features && product.features.length > 4 && (
              <div className="text-gray-500 text-sm pl-7">
                + {product.features.length - 4} autres avantages
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={onSelect}
            className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-300 ${
              tier === "prestige"
                ? `bg-gradient-to-r ${config.gradient} text-background hover:shadow-lg ${config.glowColor}`
                : `bg-white/10 text-white border ${config.borderColor} hover:bg-white/20`
            }`}
          >
            Commander maintenant
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Stats display
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center px-4">
      <p className="text-2xl sm:text-3xl font-serif font-bold bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
        {value}
      </p>
      <p className="text-[10px] sm:text-xs text-muted-foreground tracking-[0.2em] uppercase mt-1">
        {label}
      </p>
    </div>
  );
}

// Category button
function CategoryButton({
  category,
  isActive,
  onClick,
}: {
  category: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 sm:px-7 py-3 rounded-2xl text-xs sm:text-sm tracking-wider transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-gold via-amber-400 to-gold text-background font-semibold"
          : "text-muted-foreground hover:text-foreground border border-white/10 hover:border-gold/30"
      }`}
    >
      <span className="flex items-center gap-2">
        {category === "Tous" && <Crown className="w-3.5 h-3.5" />}
        {category === "NFC Premium" && <Wifi className="w-3.5 h-3.5" />}
        {category}
      </span>
    </button>
  );
}

export function ShopSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("NFC Premium");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(
    () =>
      activeCategory === "Tous"
        ? products
        : activeCategory === "NFC Premium"
        ? premiumCards
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <SectionWrapper
      id="shop"
      fullHeight={false}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #030305 0%, #0a0a12 30%, #08080f 70%, #030305 100%)",
      }}
    >
      {/* Starfield background */}
      <ShopStarfield />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10"
        ref={sectionRef}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10 border border-gold/40 rounded-full backdrop-blur-sm">
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">
              Collection Exclusive
            </span>
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Diamond className="w-5 h-5 text-gold" />
            <span className="text-gold/80 text-sm tracking-[0.3em] uppercase font-light">
              Cartes NFC Premium
            </span>
            <Diamond className="w-5 h-5 text-gold" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4">
            <span className="text-white">La Boutique </span>
            <span className="bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
              ZIVARA
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Découvrez nos 3 cartes de visite NFC premium. Chaque carte intègre
            la technologie NFC et un QR code pour une compatibilité universelle
            avec tous les appareils.
          </p>
        </motion.div>

        {/* Key benefits pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {[
            { icon: Wifi, text: "Technologie NFC" },
            { icon: QrCode, text: "QR Code intégré" },
            { icon: Zap, text: "Partage instantané" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
            >
              <item.icon className="w-4 h-4 text-gold" />
              <span className="text-white text-sm">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-12">
          <StatItem value="+12 000" label="Cartes créées" />
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          <StatItem value="4.9/5" label="Note moyenne" />
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          <StatItem value="72h" label="Livraison express" />
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <Diamond className="w-4 h-4 text-gold/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isActive={activeCategory === category}
              onClick={() => handleCategoryChange(category)}
            />
          ))}
        </div>

        {/* Premium Cards Grid - Special layout for NFC Premium */}
        {activeCategory === "NFC Premium" ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {premiumCards.map((product, index) => (
                <PremiumCardShowcase
                  key={product.id}
                  product={product}
                  index={index}
                  onSelect={() => handleProductSelect(product)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onSelect={() => handleProductSelect(product)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Comparison table hint */}
        {activeCategory === "NFC Premium" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
              <Diamond className="w-4 h-4 text-gold" />
              <span className="text-gray-300 text-sm">
                Toutes nos cartes incluent{" "}
                <span className="text-gold font-semibold">NFC + QR Code</span>{" "}
                pour une compatibilité totale
              </span>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-card/30 border border-gold/20 rounded-2xl backdrop-blur-sm">
              <Lock className="w-4 h-4 text-gold" />
              <p className="text-gray-400 text-sm">
                Design personnalisé pour membres{" "}
                <span className="text-gold font-semibold">ZIVARA VIP</span>
              </p>
            </div>

            <a
              href="#contact"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-amber-500 text-background font-semibold rounded-2xl hover:scale-105 transition-transform"
            >
              <span>Créer ma carte</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
      />
    </SectionWrapper>
  );
}
