"use client";

import { useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  Check,
  Heart,
  Sparkles,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Wifi,
  QrCode,
  Crown,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();

  // 3D Image tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  // Generate fake gallery images
  const galleryImages = useMemo(() => {
    if (!product) return [];
    return [product.image, product.image, product.image, product.image];
  }, [product]);

  if (!product) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setSelectedSize("");
      setSelectedColor("");
      setQuantity(1);
    }, 1500);
  };

  const canAddToCart = selectedSize && selectedColor && product.inStock;

  // Feature benefits
  const benefits = [
    { icon: Truck, text: "Livraison express 72h" },
    { icon: RefreshCw, text: "Revision illimitee" },
    { icon: Shield, text: "Garantie qualite" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Premium Backdrop with particles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 overflow-hidden"
          >
            {/* Subtle floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gold/10"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full max-w-6xl max-h-full overflow-auto bg-card rounded-2xl sm:rounded-3xl border border-gold/20 shadow-2xl shadow-gold/5 pointer-events-auto">
              {/* Decorative corner accents - hidden on mobile */}
              <div className="absolute top-0 left-0 w-20 sm:w-32 h-20 sm:h-32 border-l-2 border-t-2 border-gold/30 rounded-tl-2xl sm:rounded-tl-3xl pointer-events-none hidden sm:block" />
              <div className="absolute bottom-0 right-0 w-20 sm:w-32 h-20 sm:h-32 border-r-2 border-b-2 border-gold/30 rounded-br-2xl sm:rounded-br-3xl pointer-events-none hidden sm:block" />

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 p-2 sm:p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-gold/50 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              {/* Like Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setLiked(!liked)}
                className="absolute top-3 right-12 sm:top-6 sm:right-20 z-20 p-2 sm:p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-gold/50 transition-colors"
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    liked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </motion.button>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Gallery Section */}
                <div className="relative p-4 sm:p-6 md:p-8 flex flex-col">
                  {/* Main Image with 3D tilt */}
                  <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                    }}
                    className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-muted/30 cursor-grab active:cursor-grabbing"
                  >
                    <motion.div
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${galleryImages[activeImage]}')`,
                      }}
                    />

                    {/* Shine overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 50%, rgba(212,175,55,0.05) 100%)",
                      }}
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.tier && (
                        <motion.span
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="px-4 py-1.5 bg-gradient-to-r from-gold to-amber-500 text-background text-xs tracking-wider rounded-full flex items-center gap-1.5 font-semibold uppercase"
                        >
                          <Crown className="w-3 h-3" />
                          {product.tier}
                        </motion.span>
                      )}
                      {product.new && (
                        <motion.span
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="px-4 py-1.5 bg-accent text-accent-foreground text-xs tracking-wider rounded-full flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3 h-3" />
                          NOUVEAUTÉ
                        </motion.span>
                      )}
                      {product.featured && !product.tier && (
                        <motion.span
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="px-4 py-1.5 bg-gradient-to-r from-gold to-amber-500 text-background text-xs tracking-wider rounded-full flex items-center gap-1.5 font-semibold"
                        >
                          <Star className="w-3 h-3" />
                          EXCLUSIF
                        </motion.span>
                      )}
                    </div>

                    {/* NFC + QR badges for premium cards */}
                    {product.tier && (
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <motion.span
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.35 }}
                          className="px-3 py-1.5 bg-blue-500/20 backdrop-blur-sm text-blue-300 text-xs tracking-wider rounded-full flex items-center gap-1.5 border border-blue-500/30"
                        >
                          <Wifi className="w-3 h-3" />
                          NFC
                        </motion.span>
                        <motion.span
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="px-3 py-1.5 bg-purple-500/20 backdrop-blur-sm text-purple-300 text-xs tracking-wider rounded-full flex items-center gap-1.5 border border-purple-500/30"
                        >
                          <QrCode className="w-3 h-3" />
                          QR
                        </motion.span>
                      </div>
                    )}
                  </motion.div>

                  {/* Thumbnail Gallery */}
                  <div className="flex gap-3 mt-4 justify-center">
                    {galleryImages.map((img, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveImage(i)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImage === i
                            ? "border-gold"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${img}')` }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 md:p-8 flex flex-col border-l border-border/50">
                  {/* Category & Name */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
                      {product.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                      {product.name}
                    </h2>
                  </motion.div>

                  {/* Rating placeholder */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-2 mt-3"
                  >
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4
                              ? "fill-gold text-gold"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      (47 avis)
                    </span>
                  </motion.div>

                  {/* Price */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-baseline gap-3 mt-4"
                  >
                    <span className="text-3xl font-bold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full font-medium">
                          -
                          {Math.round(
                            (1 - product.price / product.originalPrice) * 100
                          )}
                          %
                        </span>
                      </>
                    )}
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="text-muted-foreground text-sm mt-4 leading-relaxed"
                  >
                    {product.description}
                  </motion.p>

                  {/* Features list for NFC cards */}
                  {product.features && product.features.length > 0 && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.28 }}
                      className="mt-4 p-4 rounded-xl bg-gradient-to-br from-gold/5 to-transparent border border-gold/20"
                    >
                      <h4 className="text-xs font-semibold text-gold tracking-wider mb-3 flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        INCLUS DANS CETTE OFFRE
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            className="flex items-center gap-2"
                          >
                            <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-gold" />
                            </div>
                            <span className="text-sm text-foreground">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent my-5" />

                  {/* Size Selection */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-foreground tracking-wider">
                        FORMAT
                      </label>
                      <button className="text-xs text-gold hover:underline">
                        Guide des formats
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.sizes.map((size, i) => (
                        <motion.button
                          key={size}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.35 + i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSize(size)}
                          className={`relative px-4 py-2.5 rounded-lg border transition-all overflow-hidden ${
                            selectedSize === size
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-border hover:border-gold/50 text-foreground"
                          }`}
                        >
                          {selectedSize === size && (
                            <motion.div
                              layoutId="sizeSelector"
                              className="absolute inset-0 bg-gold/10"
                              transition={{ type: "spring", damping: 20 }}
                            />
                          )}
                          <span className="relative text-sm font-medium">
                            {size}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Color Selection */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-5"
                  >
                    <label className="text-xs font-semibold text-foreground tracking-wider">
                      FINITION{" "}
                      {selectedColor && (
                        <span className="text-gold ml-2">
                          — {selectedColor}
                        </span>
                      )}
                    </label>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {product.colors.map((color, i) => (
                        <motion.button
                          key={color.name}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.45 + i * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedColor(color.name)}
                          className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                            selectedColor === color.name
                              ? "border-gold scale-110"
                              : "border-transparent hover:border-gold/50"
                          }`}
                        >
                          <div
                            className="absolute inset-1 rounded-full"
                            style={{ backgroundColor: color.hex }}
                          />
                          {selectedColor === color.name && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-white drop-shadow-lg" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Quantity */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-5"
                  >
                    <label className="text-xs font-semibold text-foreground tracking-wider">
                      QUANTITÉ
                    </label>
                    <div className="flex items-center gap-1 mt-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 rounded-lg border border-border hover:border-gold/50 hover:bg-gold/5 transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <div className="w-16 text-center">
                        <motion.span
                          key={quantity}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-xl font-bold"
                        >
                          {quantity}
                        </motion.span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 rounded-lg border border-border hover:border-gold/50 hover:bg-gold/5 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Add to Cart Button */}
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    whileHover={{
                      scale: canAddToCart ? 1.02 : 1,
                      y: canAddToCart ? -2 : 0,
                    }}
                    whileTap={{ scale: canAddToCart ? 0.98 : 1 }}
                    onClick={handleAddToCart}
                    disabled={!canAddToCart}
                    className={`relative mt-6 py-4 px-8 rounded-xl font-semibold tracking-wider flex items-center justify-center gap-3 transition-all overflow-hidden ${
                      added
                        ? "bg-green-500 text-white"
                        : canAddToCart
                        ? "bg-gradient-to-r from-gold to-amber-500 text-background hover:shadow-lg hover:shadow-gold/25"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {/* Animated shine on button */}
                    {canAddToCart && !added && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                    )}
                    <span className="relative flex items-center gap-3">
                      {added ? (
                        <>
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", damping: 10 }}
                          >
                            <Check className="w-5 h-5" />
                          </motion.div>
                          COMMANDE AJOUTÉE
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-5 h-5" />
                          {canAddToCart
                            ? `COMMANDER • ${formatPrice(
                                product.price * quantity
                              )}`
                            : "CHOISIR LES OPTIONS"}
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* Benefits */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-4 mt-6"
                  >
                    {benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-muted-foreground text-xs"
                      >
                        <benefit.icon className="w-4 h-4 text-gold" />
                        <span>{benefit.text}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
