
export interface ShopLinks {
  top?: string;
  bottom?: string;
  footwear?: string;
  outerwear?: string;
  accessories?: string[];
}

export interface OutfitItem {
  id: number;
  name: string;
  gender: "male" | "female" | "unisex";
  vibe: string;
  season: "spring" | "summer" | "fall" | "winter" | "all";
  occasion: string;
  top?: string;
  bottom?: string;
  footwear?: string;
  outerwear?: string;
  accessories?: string[];
  shopLinks?: ShopLinks;
  imageUrl?: string;
}

// Collection of trending outfits with shop links
export const trendingOutfits: OutfitItem[] = [
  {
    id: 1,
    name: "Grunge Look 1",
    gender: "male",
    vibe: "grunge",
    season: "spring",
    occasion: "travel",
    top: "oversized t-shirt",
    bottom: "cargo pants",
    accessories: [
      "canvas tote",
      "round sunglasses",
      "leather belt"
    ],
    shopLinks: {
      top: "https://shop.com/oversized-t-shirt",
      bottom: "https://shop.com/cargo-pants",
      accessories: [
        "https://shop.com/canvas-tote",
        "https://shop.com/round-sunglasses",
        "https://shop.com/leather-belt"
      ]
    },
    imageUrl: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=500"
  },
  {
    id: 2,
    name: "Boho Summer Look",
    gender: "female",
    vibe: "boho",
    season: "summer",
    occasion: "casual",
    top: "crochet top",
    bottom: "flared jeans",
    accessories: [
      "straw hat",
      "layered necklaces",
      "macramé tote"
    ],
    shopLinks: {
      top: "https://shop.com/crochet-top",
      bottom: "https://shop.com/flared-jeans",
      accessories: [
        "https://shop.com/straw-hat",
        "https://shop.com/layered-necklaces",
        "https://shop.com/macrame-tote"
      ]
    },
    imageUrl: "https://images.unsplash.com/photo-1586078130702-d208859b6223?q=80&w=500"
  },
  {
    id: 3,
    name: "Minimalist Office Look",
    gender: "unisex",
    vibe: "minimalist",
    season: "all",
    occasion: "work",
    top: "white button-down shirt",
    bottom: "black tailored pants",
    footwear: "leather loafers",
    accessories: [
      "sleek watch",
      "slim wallet"
    ],
    shopLinks: {
      top: "https://shop.com/white-button-down",
      bottom: "https://shop.com/black-tailored-pants",
      footwear: "https://shop.com/leather-loafers",
      accessories: [
        "https://shop.com/sleek-watch",
        "https://shop.com/slim-wallet"
      ]
    },
    imageUrl: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=500"
  }
];

// Map moods to relevant outfit vibes
export const moodToVibeMap: Record<string, string[]> = {
  happy: ["colorful", "playful", "bright", "casual", "beach"],
  confident: ["bold", "stylish", "elegant", "formal", "power"],
  relaxed: ["comfortable", "cozy", "loungewear", "casual", "oversized"],
  professional: ["business", "formal", "tailored", "minimalist", "office"],
  creative: ["artistic", "eclectic", "boho", "vintage", "grunge"],
  nightlife: ["edgy", "party", "glamorous", "statement", "evening"]
};

// Get outfits matching a mood
export const getOutfitsByMood = (mood: string): OutfitItem[] => {
  const vibes = moodToVibeMap[mood] || [];
  return trendingOutfits.filter(outfit => 
    vibes.some(vibe => outfit.vibe.includes(vibe) || outfit.occasion.includes(vibe))
  );
};
