"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Crown,
  Gem,
  Sparkles,
  Heart,
  Plus,
  Star,
  Zap,
  CreditCard,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useState, useCallback, memo, useMemo } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
  onSelect: () => void;
}

// Get rarity level based on price - adjusted for business card pricing
function getRarityLevel(price: number) {
  if (price >= 400)
    return {
      label: "Prestige",
      gradient: "from-amber-400 via-yellow-300 to-amber-400",
      icon: Crown,
      glow: "rgba(251,191,36,0.4)",
      border: "border-amber-400/40",
    };
  if (price >= 250)
    return {
      label: "Premium",
      gradient: "from-purple-400 via-fuchsia-400 to-purple-400",
      icon: Gem,
      glow: "rgba(192,132,252,0.3)",
      border: "border-purple-400/40",
    };
  if (price >= 150)
    return {
      label: "Elite",
      gradient: "from-blue-400 via-cyan-400 to-blue-400",
      icon: Star,
      glow: "rgba(96,165,250,0.3)",
      border: "border-blue-400/40",
    };
  return {
    label: "Classique",
    gradient: "from-emerald-400 via-teal-400 to-emerald-400",
    icon: Sparkles,
    glow: "rgba(52,211,153,0.25)",
    border: "border-emerald-400/30",
  };
}

export const ProductCard = memo(function ProductCard({
  product,
  index,
  onSelect,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleLikeToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  }, []);

  const rarity = useMemo(() => getRarityLevel(product.price), [product.price]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.3), // Cap delay to prevent long waits
      }}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card container with card-flip perspective */}
      <motion.div
        className={`relative bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-black/90 backdrop-blur-sm rounded-2xl overflow-hidden border ${rarity.border} transition-all duration-300`}
        style={{
          boxShadow: isHovered
            ? `0 20px 40px -15px ${rarity.glow}`
            : "0 10px 30px -15px rgba(0,0,0,0.5)",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        whileHover={{
          scale: 1.02,
          rotateY: 2,
          rotateX: -2,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Rarity Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div
            className={`px-3 py-1.5 bg-gradient-to-r ${rarity.gradient} rounded-full flex items-center gap-1.5 shadow-lg`}
          >
            <rarity.icon className="w-3 h-3 text-background" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-background">
              {rarity.label}
            </span>
          </div>
        </div>

        {/* Top right badges */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {/* Like button */}
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 ${
              isLiked
                ? "bg-red-500 text-white shadow-lg shadow-red-500/40"
                : "bg-black/40 text-white/70 hover:text-red-400 hover:bg-black/60"
            }`}
            onClick={handleLikeToggle}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>

          {/* New badge */}
          {product.new && (
            <span className="px-2.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[9px] tracking-wider rounded-full font-bold text-center shadow-lg">
              <span className="flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" />
                NEW
              </span>
            </span>
          )}

          {/* VIP badge */}
          {product.featured && (
            <span className="px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] tracking-wider rounded-full font-bold text-center flex items-center gap-1 shadow-lg">
              <Crown className="w-2.5 h-2.5" />
              VIP
            </span>
          )}
        </div>

        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Image */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            style={{ backgroundImage: `url('${product.image}')` }}
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

          {/* Shine effect on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transition-transform duration-700 ${
              isHovered ? "translate-x-[200%]" : "-translate-x-[200%]"
            }`}
          />

          {/* Quick actions on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-center pb-6 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex gap-3">
              <button
                onClick={onSelect}
                className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/20 flex items-center gap-2 text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                <span>Aperçu</span>
              </button>
              <button
                onClick={onSelect}
                className={`px-4 py-2.5 rounded-xl bg-gradient-to-r ${rarity.gradient} text-gray-900 font-semibold flex items-center gap-2 text-sm shadow-lg`}
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 relative">
          {/* Category and Name */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-gold inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {product.category}
              </span>
              <h3 className="text-base font-serif font-semibold text-white mt-1.5 group-hover:text-gold transition-colors duration-300 line-clamp-1">
                {product.name}
              </h3>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2.5">
            <span className="text-xl font-serif font-bold text-gold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Options - now Finishes for business cards */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <div className="flex gap-2">
              {product.colors.slice(0, 4).map((color, i) => (
                <div
                  key={color.name}
                  className="w-6 h-6 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: `0 2px 8px ${color.hex}40`,
                  }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-gray-500 self-center ml-1">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[9px] tracking-wider uppercase font-medium text-gold/80">
                Edition limitee
              </span>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent transition-transform duration-300 origin-center ${
            isHovered ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </motion.div>
    </motion.div>
  );
});
