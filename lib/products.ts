export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  featured?: boolean;
  new?: boolean;
  tier?: "elite" | "prestige" | "royal";
  features?: string[];
}

// Main 3 Premium NFC Cards - The core offering
export const premiumCards: Product[] = [
  {
    id: "nfc-elite",
    name: "ZIVARA Elite",
    price: 199,
    originalPrice: 299,
    description:
      "La carte NFC intelligente pour les professionnels ambitieux. Partagez vos coordonnées, portfolio et réseaux sociaux d'un simple tap. QR code de secours intégré pour compatibilité universelle.",
    category: "NFC Premium",
    image: "/images/card-nfc-elite.svg",
    sizes: ["Standard 85x55mm"],
    colors: [
      { name: "Noir Mat", hex: "#0a0a0a" },
      { name: "Blanc Nacré", hex: "#f5f5f5" },
    ],
    inStock: true,
    featured: true,
    tier: "elite",
    features: [
      "Puce NFC haute fréquence",
      "QR Code personnalisé",
      "Page de profil digital",
      "Statistiques de partage",
      "50 cartes incluses",
    ],
  },
  {
    id: "nfc-prestige",
    name: "ZIVARA Prestige",
    price: 349,
    originalPrice: 449,
    description:
      "L'alliance parfaite du luxe et de la technologie. Carte métal brossé avec puce NFC intégrée, gravure laser de précision et finition or 24K. QR code élégamment dissimulé.",
    category: "NFC Premium",
    image: "/images/card-nfc-prestige.svg",
    sizes: ["Standard 85x55mm"],
    colors: [
      { name: "Titane Or", hex: "#d4af37" },
      { name: "Titane Noir", hex: "#1a1a1a" },
    ],
    inStock: true,
    featured: true,
    new: true,
    tier: "prestige",
    features: [
      "Métal titane véritable",
      "Puce NFC + QR Code",
      "Gravure laser précision",
      "Détails dorés 24K",
      "Dashboard analytics",
      "30 cartes incluses",
    ],
  },
  {
    id: "nfc-royal",
    name: "ZIVARA Royal",
    price: 599,
    originalPrice: 799,
    description:
      "L'ultime expression du prestige digital. Carte en or véritable 24K avec puce NFC premium, hologramme de sécurité et QR code gravé. Livrée dans un écrin luxueux.",
    category: "NFC Premium",
    image: "/images/card-nfc-royal.svg",
    sizes: ["Standard 85x55mm"],
    colors: [
      { name: "Or 24K", hex: "#d4af37" },
      { name: "Or Rose", hex: "#b76e79" },
    ],
    inStock: true,
    featured: true,
    new: true,
    tier: "royal",
    features: [
      "Or véritable 24 carats",
      "NFC ultra-performante",
      "QR Code gravé laser",
      "Hologramme sécurisé",
      "Écrin de présentation",
      "Conciergerie dédiée",
      "20 cartes incluses",
    ],
  },
];

export const products: Product[] = [
  ...premiumCards,
  {
    id: "4",
    name: "Carte Classique Mat",
    price: 89,
    description:
      "L'élégance sobre. Papier premium 400g, finition soft-touch, impression recto-verso HD. Pack de 200 cartes.",
    category: "Collection Classique",
    image: "/images/card-minimal.svg",
    sizes: ["Standard 85x55mm", "US 89x51mm"],
    colors: [
      { name: "Blanc Pur", hex: "#ffffff" },
      { name: "Noir Mat", hex: "#1a1a1a" },
    ],
    inStock: true,
  },
  {
    id: "5",
    name: "Carte Velours Premium",
    price: 149,
    description:
      "Toucher velours irrésistible. Pelliculage soft-touch premium avec vernis sélectif brillant. 100 cartes.",
    category: "Collection Tactile",
    image: "/images/card-velvet.svg",
    sizes: ["Standard 85x55mm"],
    colors: [
      { name: "Velours Noir", hex: "#0d0d0d" },
      { name: "Velours Marine", hex: "#1a237e" },
    ],
    inStock: true,
  },
  {
    id: "6",
    name: "Carte Dorée Luxe",
    price: 249,
    description:
      "Feuille d'or appliquée à chaud sur papier coton 500g. Embossage profond et bords dorés. 100 cartes.",
    category: "Collection Prestige",
    image: "/images/card-gold.svg",
    sizes: ["Standard 85x55mm"],
    colors: [
      { name: "Or sur Noir", hex: "#d4af37" },
      { name: "Or sur Marine", hex: "#1a1a4e" },
    ],
    inStock: true,
    featured: true,
  },
];

export const categories = [
  "Tous",
  "NFC Premium",
  "Collection Prestige",
  "Collection Tactile",
  "Collection Classique",
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "Tous") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.new);
}

export function getPremiumCards(): Product[] {
  return premiumCards;
}
