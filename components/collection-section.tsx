"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Crown, Gem, Sparkles, Leaf, Star, CreditCard } from "lucide-react";

const collections = [
  {
    title: "Collection Prestige",
    description: "Or 24K, argent et metal titane",
    icon: Crown,
    gradient: "from-amber-500/20 via-yellow-500/10 to-amber-500/20",
    accent: "text-amber-400",
    borderColor: "border-amber-400/30",
  },
  {
    title: "Collection Avant-Garde",
    description: "Cristal, holographique et NFC",
    icon: Gem,
    gradient: "from-purple-500/20 via-pink-500/10 to-purple-500/20",
    accent: "text-purple-400",
    borderColor: "border-purple-400/30",
  },
  {
    title: "Collection Tactile",
    description: "Velours, cuir et double couche",
    icon: Sparkles,
    gradient: "from-blue-500/20 via-cyan-500/10 to-blue-500/20",
    accent: "text-blue-400",
    borderColor: "border-blue-400/30",
  },
  {
    title: "Collection Nature",
    description: "Bois noble et materiaux eco-luxe",
    icon: Leaf,
    gradient: "from-emerald-500/20 via-green-500/10 to-emerald-500/20",
    accent: "text-emerald-400",
    borderColor: "border-emerald-400/30",
  },
];

export function CollectionSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="py-32 px-6 bg-gradient-to-b from-background via-[#0a0a12] to-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-gold text-sm tracking-[0.3em] uppercase mb-4">
            <Star className="w-4 h-4" />
            Nos Collections
            <Star className="w-4 h-4" />
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-4 text-balance">
            Trouvez votre <span className="text-gold">style</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Chaque collection a ete pensee pour repondre a vos besoins
            specifiques. Du classique au futuriste, trouvez la carte qui vous
            ressemble.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((item, index) => (
            <CollectionCard
              key={item.title}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({
  item,
  index,
  isInView,
}: {
  item: (typeof collections)[0];
  index: number;
  isInView: boolean;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      whileHover={{
        scale: 1.03,
        rotateY: 5,
        rotateX: -3,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group relative overflow-hidden rounded-2xl aspect-[85/55] cursor-pointer border border-white/10 hover:border-gold/30 transition-colors duration-500"
    >
      {/* Business card ratio background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div className="absolute inset-0 bg-[#0a0a12]/80" />

      {/* Card shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.7 }}
      />

      {/* Business card decorative elements */}
      <div className="absolute inset-0 opacity-10">
        {/* Card corners */}
        <div className="absolute top-3 left-3 w-8 h-8 border-l border-t border-white/30" />
        <div className="absolute top-3 right-3 w-8 h-8 border-r border-t border-white/30" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-l border-b border-white/30" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-r border-b border-white/30" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-6">
        {/* Icon styled as embossed logo */}
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border ${item.borderColor} flex items-center justify-center ${item.accent} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-gold transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-400 text-sm">{item.description}</p>

          <div className="mt-4 flex items-center gap-2 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <CreditCard className="w-4 h-4" />
            <span>Découvrir</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>

      {/* Gold accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}
