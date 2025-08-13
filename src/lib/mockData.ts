// Mock data for the fashion app
export interface MockWardrobeItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  price?: number;
  color?: string;
  brand?: string;
}

export const mockWardrobeItems: MockWardrobeItem[] = [
  // Tops
  {
    id: "top-1",
    name: "Classic White Button-Up",
    category: "Tops",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    price: 85,
    color: "White",
    brand: "COS"
  },
  {
    id: "top-2", 
    name: "Cashmere Sweater",
    category: "Tops",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    price: 120,
    color: "Beige",
    brand: "ARKET"
  },
  {
    id: "top-3",
    name: "Striped Long Sleeve",
    category: "Tops", 
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    price: 65,
    color: "Navy",
    brand: "& Other Stories"
  },
  {
    id: "top-4",
    name: "Silk Blouse",
    category: "Tops",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    price: 145,
    color: "Cream",
    brand: "GANNI"
  },

  // Bottoms
  {
    id: "bottom-1",
    name: "High-Waisted Jeans",
    category: "Bottoms",
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
    price: 95,
    color: "Blue",
    brand: "AGOLDE"
  },
  {
    id: "bottom-2",
    name: "Tailored Trousers",
    category: "Bottoms", 
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    price: 110,
    color: "Black",
    brand: "COS"
  },
  {
    id: "bottom-3",
    name: "Pleated Midi Skirt",
    category: "Bottoms",
    imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=400&h=400&fit=crop",
    price: 85,
    color: "Navy",
    brand: "& Other Stories"
  },
  {
    id: "bottom-4",
    name: "Wide-Leg Pants",
    category: "Bottoms",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    price: 125,
    color: "Olive",
    brand: "ARKET"
  },

  // Outerwear
  {
    id: "outer-1",
    name: "Wool Coat",
    category: "Outerwear",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    price: 285,
    color: "Camel",
    brand: "COS"
  },
  {
    id: "outer-2",
    name: "Leather Jacket",
    category: "Outerwear", 
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    price: 320,
    color: "Black",
    brand: "GANNI"
  },
  {
    id: "outer-3",
    name: "Denim Jacket",
    category: "Outerwear",
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
    price: 95,
    color: "Light Blue",
    brand: "AGOLDE"
  },
  {
    id: "outer-4",
    name: "Blazer",
    category: "Outerwear",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    price: 165,
    color: "Navy",
    brand: "& Other Stories"
  },

  // Footwear
  {
    id: "shoes-1",
    name: "White Sneakers",
    category: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    price: 125,
    color: "White",
    brand: "Veja"
  },
  {
    id: "shoes-2",
    name: "Ankle Boots",
    category: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    price: 185,
    color: "Black",
    brand: "Dr. Martens"
  },
  {
    id: "shoes-3",
    name: "Loafers",
    category: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
    price: 145,
    color: "Brown",
    brand: "COS"
  },
  {
    id: "shoes-4",
    name: "Heeled Sandals",
    category: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    price: 95,
    color: "Nude",
    brand: "& Other Stories"
  },

  // Accessories
  {
    id: "acc-1",
    name: "Silk Scarf",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
    price: 85,
    color: "Floral",
    brand: "GANNI"
  },
  {
    id: "acc-2",
    name: "Leather Belt",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    price: 65,
    color: "Black",
    brand: "COS"
  },
  {
    id: "acc-3",
    name: "Gold Watch",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    price: 225,
    color: "Gold",
    brand: "MVMT"
  },
  {
    id: "acc-4",
    name: "Canvas Tote",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    price: 45,
    color: "Natural",
    brand: "ARKET"
  }
];

// Mock weather data as fallback
export const mockWeatherData = {
  location: "New York",
  temperature: 22,
  condition: "partly cloudy",
  icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png",
  feelsLike: 24,
  humidity: 65,
  windSpeed: 8
};

// Mock product data for shopping integration
export const mockShoppingItems = [
  {
    id: "shop-1",
    name: "Minimalist Watch",
    price: 125,
    originalPrice: 160,
    rating: 4.8,
    category: "Accessories",
    store: "Nordstrom",
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop",
    inStock: true,
    discount: 22,
    url: "https://nordstrom.com"
  },
  {
    id: "shop-2", 
    name: "Cashmere Sweater",
    price: 89,
    originalPrice: 120,
    rating: 4.6,
    category: "Tops",
    store: "Everlane",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    inStock: true,
    discount: 26,
    url: "https://everlane.com"
  },
  {
    id: "shop-3",
    name: "Wide-Leg Trousers",
    price: 95,
    rating: 4.7,
    category: "Bottoms", 
    store: "& Other Stories",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop",
    inStock: false,
    url: "https://stories.com"
  },
  {
    id: "shop-4",
    name: "Leather Ankle Boots",
    price: 185,
    originalPrice: 220,
    rating: 4.9,
    category: "Footwear",
    store: "Dr. Martens", 
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop",
    inStock: true,
    discount: 16,
    url: "https://drmartens.com"
  }
];

// Mock trending outfits
export const mockTrendingOutfits = [
  {
    id: "trend-1",
    name: "Minimalist Chic",
    imageUrl: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=400&h=600&fit=crop",
    likes: 1243,
    tags: ["minimalist", "work", "elegant"],
    description: "Clean lines meet contemporary style",
    creator: "StyleCurator"
  },
  {
    id: "trend-2", 
    name: "Effortless Weekend",
    imageUrl: "https://images.unsplash.com/photo-1523268755815-fe7c372a0349?w=400&h=600&fit=crop",
    likes: 987,
    tags: ["casual", "comfort", "street"],
    description: "Relaxed yet put-together vibes",
    creator: "Fashionista23"
  },
  {
    id: "trend-3",
    name: "Power Dressing",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    likes: 1456,
    tags: ["professional", "bold", "confident"],
    description: "Command attention with confidence",
    creator: "BossLady"
  },
  {
    id: "trend-4",
    name: "Date Night Ready",
    imageUrl: "https://images.unsplash.com/photo-1589363460779-def9cad65bd4?w=400&h=600&fit=crop",
    likes: 892,
    tags: ["romantic", "elegant", "special"],
    description: "Romance meets sophistication",
    creator: "StyleGuru"
  }
];