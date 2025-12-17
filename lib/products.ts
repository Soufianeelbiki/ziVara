export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  image: string
  sizes: string[]
  colors: { name: string; hex: string }[]
  inStock: boolean
  featured?: boolean
  new?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Royal Midnight Tuxedo",
    price: 12500,
    originalPrice: 15000,
    description:
      "Hand-crafted Italian wool tuxedo with silk lapels. Each piece is tailored by master craftsmen in Milan, featuring mother-of-pearl buttons and a signature ZIVARA lining.",
    category: "Evening Wear",
    image: "/luxury-black-tuxedo-suit-elegant-formal-wear.jpg",
    sizes: ["46", "48", "50", "52", "54"],
    colors: [
      { name: "Midnight Black", hex: "#0a0a0a" },
      { name: "Navy Royal", hex: "#1a1a4e" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Diamond Essence Gown",
    price: 28000,
    description:
      "Exclusive couture gown adorned with Swarovski crystals. Features a dramatic train and hand-sewn beading that takes over 200 hours to complete.",
    category: "Couture",
    image: "/luxury-evening-gown-crystal-elegant-black-dress.jpg",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Obsidian", hex: "#0d0d0d" },
      { name: "Champagne", hex: "#f7e7ce" },
    ],
    inStock: true,
    featured: true,
    new: true,
  },
  {
    id: "3",
    name: "Executive Prestige Suit",
    price: 8900,
    description:
      "Bespoke three-piece suit crafted from Super 180s wool. Perfect for the boardroom, featuring a custom-fitted silhouette and hand-stitched details.",
    category: "Business",
    image: "/luxury-navy-blue-business-suit-elegant-tailored.jpg",
    sizes: ["46", "48", "50", "52", "54", "56"],
    colors: [
      { name: "Navy", hex: "#1a237e" },
      { name: "Charcoal", hex: "#37474f" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    inStock: true,
  },
  {
    id: "4",
    name: "Cashmere Elite Overcoat",
    price: 15600,
    description:
      "100% Italian cashmere overcoat with silk lining. A timeless investment piece that combines warmth with unparalleled elegance.",
    category: "Outerwear",
    image: "/luxury-cashmere-overcoat-camel-elegant-coat.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Camel", hex: "#c19a6b" },
      { name: "Charcoal", hex: "#36454f" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Silk Riviera Shirt",
    price: 2400,
    description:
      "Pure mulberry silk shirt with mother-of-pearl buttons. Designed for resort elegance and sophisticated casual occasions.",
    category: "Shirts",
    image: "/luxury-white-silk-shirt-elegant-men-fashion.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Ivory", hex: "#fffff0" },
      { name: "Slate Blue", hex: "#6a5acd" },
      { name: "Blush", hex: "#de5d83" },
    ],
    inStock: true,
    new: true,
  },
  {
    id: "6",
    name: "Diamond Cufflinks Set",
    price: 45000,
    description:
      "18K white gold cufflinks set with VVS diamonds. Each pair is certified and comes in a handcrafted leather presentation box.",
    category: "Accessories",
    image: "/luxury-diamond-cufflinks-gold-elegant-accessories.jpg",
    sizes: ["One Size"],
    colors: [
      { name: "White Gold", hex: "#e8e8e8" },
      { name: "Rose Gold", hex: "#b76e79" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "7",
    name: "Velvet Opera Cape",
    price: 6800,
    description:
      "Hand-finished velvet cape with silk satin lining. A statement piece for galas, premieres, and exclusive events.",
    category: "Evening Wear",
    image: "/luxury-velvet-cape-elegant-black-formal-evening.jpg",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Burgundy", hex: "#722f37" },
      { name: "Midnight", hex: "#191970" },
    ],
    inStock: true,
  },
  {
    id: "8",
    name: "Bespoke Leather Loafers",
    price: 3200,
    description:
      "Hand-stitched Italian leather loafers with custom last. Each pair is molded to your foot for unparalleled comfort.",
    category: "Footwear",
    image: "/luxury-leather-loafers-elegant-brown-shoes.jpg",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Cognac", hex: "#834d18" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    inStock: true,
  },
]

export const categories = [
  "All",
  "Evening Wear",
  "Couture",
  "Business",
  "Outerwear",
  "Shirts",
  "Accessories",
  "Footwear",
]
