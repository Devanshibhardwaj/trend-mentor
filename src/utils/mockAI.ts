// Mock AI service for outfit recommendations
import { mockWardrobeItems } from '@/lib/mockData';

export interface MockAIResponse {
  outfit: {
    top?: any;
    bottom?: any;
    outerwear?: any;
    footwear?: any;
    accessories?: any;
  };
  explanation: string;
  trend: string;
  confidence: number;
}

const styleDescriptions = {
  casual: "relaxed and comfortable pieces that work great for everyday activities",
  formal: "sophisticated and elegant items perfect for professional or special occasions",
  business: "polished and professional pieces that command respect in work environments",
  sports: "functional and comfortable athletic wear designed for movement and performance",
  party: "eye-catching and stylish pieces that make a statement for social events"
};

const trendNames = [
  "Effortless Minimalism",
  "Contemporary Classic", 
  "Urban Sophistication",
  "Timeless Elegance",
  "Modern Edge",
  "Refined Casual",
  "Polished Comfort",
  "Elevated Basics"
];

const explanationTemplates = [
  "This combination creates a balanced look with {style} that perfectly matches your mood and the occasion.",
  "I've selected {style} to create a cohesive outfit that feels both comfortable and stylish for your needs.",
  "This outfit brings together {style} with a modern twist, ideal for the vibe you're going for.",
  "The pieces work harmoniously to deliver {style} that transitions seamlessly from day to night."
];

export const generateMockAIRecommendation = async (
  items: any[],
  occasion: string,
  context: any = {}
): Promise<MockAIResponse> => {
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Use provided items or fallback to mock data
  const availableItems = items.length > 0 ? items : mockWardrobeItems;
  
  // Categorize items
  const categorizedItems: Record<string, any[]> = {};
  availableItems.forEach(item => {
    const category = item.category.toLowerCase();
    if (!categorizedItems[category]) {
      categorizedItems[category] = [];
    }
    categorizedItems[category].push(item);
  });
  
  // Smart selection based on occasion and context
  const outfit: any = {};
  
  // Occasion-specific selection logic
  if (occasion === 'casual') {
    outfit.top = selectBestItem(categorizedItems['tops'], ['t-shirt', 'casual', 'comfortable']);
    outfit.bottom = selectBestItem(categorizedItems['bottoms'], ['jeans', 'casual', 'comfortable']);
    outfit.footwear = selectBestItem(categorizedItems['footwear'], ['sneakers', 'casual', 'comfortable']);
  } else if (occasion === 'formal') {
    outfit.top = selectBestItem(categorizedItems['tops'], ['shirt', 'blouse', 'formal', 'elegant']);
    outfit.bottom = selectBestItem(categorizedItems['bottoms'], ['pants', 'slacks', 'formal', 'dress']);
    outfit.footwear = selectBestItem(categorizedItems['footwear'], ['dress', 'formal', 'elegant']);
    outfit.outerwear = selectBestItem(categorizedItems['outerwear'], ['blazer', 'jacket', 'formal']);
  } else if (occasion === 'business') {
    outfit.top = selectBestItem(categorizedItems['tops'], ['shirt', 'blouse', 'professional']);
    outfit.bottom = selectBestItem(categorizedItems['bottoms'], ['pants', 'slacks', 'professional']);
    outfit.footwear = selectBestItem(categorizedItems['footwear'], ['loafers', 'professional', 'dress']);
    outfit.outerwear = selectBestItem(categorizedItems['outerwear'], ['blazer', 'cardigan', 'professional']);
  } else {
    // Default to random selection
    outfit.top = selectRandomItem(categorizedItems['tops']);
    outfit.bottom = selectRandomItem(categorizedItems['bottoms']);
    outfit.footwear = selectRandomItem(categorizedItems['footwear']);
  }
  
  // Always try to add accessories if available
  outfit.accessories = selectRandomItem(categorizedItems['accessories']);
  
  // Weather-based adjustments
  if (context.weather === 'rainy') {
    outfit.outerwear = selectBestItem(categorizedItems['outerwear'], ['coat', 'jacket', 'waterproof']) ||
                      selectRandomItem(categorizedItems['outerwear']);
  } else if (context.weather === 'sunny') {
    // Remove outerwear for sunny weather unless it's formal
    if (occasion !== 'formal' && occasion !== 'business') {
      delete outfit.outerwear;
    }
  }
  
  // Generate explanation
  const styleDesc = styleDescriptions[occasion as keyof typeof styleDescriptions] || 
                   styleDescriptions.casual;
  const explanation = explanationTemplates[Math.floor(Math.random() * explanationTemplates.length)]
    .replace('{style}', styleDesc);
  
  // Select random trend name
  const trend = trendNames[Math.floor(Math.random() * trendNames.length)];
  
  // Calculate confidence based on how many items we found
  const itemCount = Object.keys(outfit).filter(key => outfit[key]).length;
  const confidence = Math.min(0.95, 0.6 + (itemCount * 0.1));
  
  return {
    outfit,
    explanation,
    trend,
    confidence
  };
};

// Helper function to select best matching item based on keywords
function selectBestItem(items?: any[], keywords: string[] = []): any | undefined {
  if (!items || items.length === 0) return undefined;
  
  if (keywords.length === 0) {
    return items[Math.floor(Math.random() * items.length)];
  }
  
  // Find items that match keywords
  const matchingItems = items.filter(item =>
    keywords.some(keyword =>
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword)
    )
  );
  
  if (matchingItems.length > 0) {
    return matchingItems[Math.floor(Math.random() * matchingItems.length)];
  }
  
  // Fallback to random item
  return items[Math.floor(Math.random() * items.length)];
}

// Helper function to select random item
function selectRandomItem(items?: any[]): any | undefined {
  if (!items || items.length === 0) return undefined;
  return items[Math.floor(Math.random() * items.length)];
}