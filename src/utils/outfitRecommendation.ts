
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to use browser cache when available
env.useBrowserCache = true;

interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

interface OutfitRecommendationResult {
  outfit: {
    top?: { id: string; name: string };
    bottom?: { id: string; name: string };
    outerwear?: { id: string; name: string };
    footwear?: { id: string; name: string };
    accessories?: { id: string; name: string };
  };
  explanation: string;
  trend: string;
}

interface MoodContext {
  mood: string;
  energyLevel: 'low' | 'medium' | 'high';
  vibe: string;
  colorPreference?: string;
}

// Categories map for matching model outputs to wardrobe categories
const categoryMap: Record<string, string> = {
  'tops': 'Tops',
  'top': 'Tops',
  'shirt': 'Tops',
  'blouse': 'Tops',
  't-shirt': 'Tops',
  'bottom': 'Bottoms',
  'bottoms': 'Bottoms',
  'pants': 'Bottoms',
  'jeans': 'Bottoms',
  'skirt': 'Bottoms',
  'shorts': 'Bottoms',
  'outerwear': 'Outerwear',
  'jacket': 'Outerwear',
  'coat': 'Outerwear',
  'sweater': 'Outerwear',
  'cardigan': 'Outerwear',
  'hoodie': 'Outerwear',
  'footwear': 'Footwear',
  'shoes': 'Footwear',
  'boots': 'Footwear',
  'sneakers': 'Footwear',
  'heels': 'Footwear',
  'accessories': 'Accessories',
  'accessory': 'Accessories',
  'jewelry': 'Accessories',
  'hat': 'Accessories',
  'scarf': 'Accessories',
  'bag': 'Accessories',
};

// Current fashion trends for the basic rule-based model
const fashionTrends = [
  "Monochromatic outfits with one pop of color",
  "Smart casual combinations",
  "Sustainable and versatile pieces that can be mixed and matched",
  "Relaxed fits combined with structured pieces",
  "Neutral tones with bold accessories",
  "Vintage-inspired modern outfits",
  "Athleisure with a formal twist"
];

// Mood-based style descriptions to enhance explanations
const moodStyleMap: Record<string, Record<string, string>> = {
  happy: {
    low: "light, comfortable pieces with subtle pops of color",
    medium: "bright, cheerful pieces with balanced proportions",
    high: "vibrant colors and bold, statement pieces"
  },
  relaxed: {
    low: "soft, loose-fitting fabrics in neutral tones",
    medium: "comfortable layers with gentle textures",
    high: "flowy silhouettes in soothing colors"
  },
  confident: {
    low: "well-tailored basics with clean lines",
    medium: "structured pieces with intentional details",
    high: "bold silhouettes and eye-catching accents"
  },
  creative: {
    low: "interesting textures and subtle pattern mixing",
    medium: "playful proportions and artistic elements",
    high: "unexpected combinations and artistic statement pieces"
  }
};

/**
 * Get image embeddings using a vision model
 */
export const getImageEmbeddings = async (imageUrl: string) => {
  try {
    // Load the feature extraction pipeline with a vision model
    const extractor = await pipeline(
      'feature-extraction',
      'Xenova/clip-vit-base-patch32',
      { device: 'cpu' } // Use CPU for wider compatibility
    );

    // Get embeddings
    const result = await extractor(imageUrl, { pooling: 'mean' });
    return result;
  } catch (error) {
    console.error('Error getting image embeddings:', error);
    return null;
  }
};

/**
 * Classify clothing items based on image features
 * This is a simplified version that uses basic rules
 */
const classifyClothingItems = (items: WardrobeItem[]) => {
  // Group items by their categories
  const categorizedItems: Record<string, WardrobeItem[]> = {};
  
  items.forEach(item => {
    if (!categorizedItems[item.category]) {
      categorizedItems[item.category] = [];
    }
    categorizedItems[item.category].push(item);
  });
  
  return categorizedItems;
};

/**
 * Generate a recommendation based on the current occasion and available items
 */
export const generateOutfitRecommendation = async (
  wardrobeItems: WardrobeItem[],
  occasion: string,
  moodContext?: MoodContext
): Promise<OutfitRecommendationResult> => {
  try {
    // Start by classifying the items
    const categorizedItems = classifyClothingItems(wardrobeItems);
    
    // Rule-based outfit generation
    const outfit: Record<string, { id: string; name: string }> = {};
    let usedItems = new Set<string>();
    
    // Helper function to select items
    const selectItemForCategory = (category: string, keywords: string[] = []) => {
      if (!categorizedItems[category] || categorizedItems[category].length === 0) {
        return null;
      }
      
      // Try to find items matching keywords first
      if (keywords.length > 0) {
        const matchingItems = categorizedItems[category].filter(
          item => keywords.some(keyword => 
            item.name.toLowerCase().includes(keyword.toLowerCase()) && 
            !usedItems.has(item.id)
          )
        );
        
        if (matchingItems.length > 0) {
          const selectedItem = matchingItems[Math.floor(Math.random() * matchingItems.length)];
          usedItems.add(selectedItem.id);
          return { id: selectedItem.id, name: selectedItem.name };
        }
      }
      
      // If no matching items or no keywords provided, pick a random one
      const availableItems = categorizedItems[category].filter(item => !usedItems.has(item.id));
      if (availableItems.length > 0) {
        const selectedItem = availableItems[Math.floor(Math.random() * availableItems.length)];
        usedItems.add(selectedItem.id);
        return { id: selectedItem.id, name: selectedItem.name };
      }
      
      return null;
    };
    
    // Create outfit based on occasion
    let occasionKeywords: Record<string, string[]> = {};
    let explanation = '';
    
    // Basic occasion-based preferences
    if (occasion === 'casual') {
      occasionKeywords = {
        'Tops': ['t-shirt', 'casual', 'cotton', 'comfortable'],
        'Bottoms': ['jeans', 'shorts', 'casual'],
        'Outerwear': ['jacket', 'hoodie', 'cardigan'],
        'Footwear': ['sneakers', 'casual', 'comfortable'],
        'Accessories': ['casual', 'everyday']
      };
      explanation = "This casual outfit combines comfort with style, perfect for everyday activities. The pieces work well together with a relaxed aesthetic.";
    } else if (occasion === 'formal') {
      occasionKeywords = {
        'Tops': ['dress shirt', 'blouse', 'formal', 'elegant'],
        'Bottoms': ['slacks', 'dress pants', 'skirt', 'formal'],
        'Outerwear': ['blazer', 'suit jacket', 'formal'],
        'Footwear': ['dress shoes', 'heels', 'formal'],
        'Accessories': ['elegant', 'refined', 'formal']
      };
      explanation = "This formal outfit presents a polished and sophisticated look appropriate for professional or dressy occasions. The combination exudes elegance and attention to detail.";
    } else if (occasion === 'business') {
      occasionKeywords = {
        'Tops': ['blouse', 'button up', 'professional'],
        'Bottoms': ['slacks', 'trousers', 'skirt', 'professional'],
        'Outerwear': ['blazer', 'cardigan', 'professional'],
        'Footwear': ['loafers', 'flats', 'professional'],
        'Accessories': ['professional', 'business']
      };
      explanation = "This business outfit balances professionalism with comfort, ideal for workplace environments. The look is smart and put-together while still being practical.";
    } else if (occasion === 'party') {
      occasionKeywords = {
        'Tops': ['party', 'dressy', 'evening', 'going out'],
        'Bottoms': ['dressy', 'evening', 'going out'],
        'Outerwear': ['dressy', 'evening', 'jacket', 'stylish'],
        'Footwear': ['heels', 'dress shoes', 'dressy'],
        'Accessories': ['statement', 'dressy', 'evening']
      };
      explanation = "This party outfit creates a fun and eye-catching look for social events. The combination is stylish and festive, perfect for celebrating.";
    } else if (occasion === 'sports') {
      occasionKeywords = {
        'Tops': ['athletic', 'sporty', 'jersey', 'workout'],
        'Bottoms': ['athletic', 'sporty', 'shorts', 'leggings'],
        'Outerwear': ['track jacket', 'windbreaker', 'athletic'],
        'Footwear': ['sneakers', 'running shoes', 'athletic'],
        'Accessories': ['sporty', 'athletic', 'functional']
      };
      explanation = "This sports outfit prioritizes functionality and comfort while maintaining style. The athletic pieces work together for an active lifestyle.";
    }
    
    // Enhance with mood-based preferences if provided
    if (moodContext) {
      const { mood, energyLevel, vibe } = moodContext;
      
      // Add mood-specific keywords
      if (mood === 'happy') {
        occasionKeywords['Tops'] = [...(occasionKeywords['Tops'] || []), 'bright', 'colorful', 'yellow'];
      } else if (mood === 'relaxed') {
        occasionKeywords['Tops'] = [...(occasionKeywords['Tops'] || []), 'soft', 'comfortable', 'blue'];
        occasionKeywords['Bottoms'] = [...(occasionKeywords['Bottoms'] || []), 'loose', 'comfortable'];
      } else if (mood === 'confident') {
        occasionKeywords['Tops'] = [...(occasionKeywords['Tops'] || []), 'structured', 'bold', 'red'];
      } else if (mood === 'creative') {
        occasionKeywords['Tops'] = [...(occasionKeywords['Tops'] || []), 'pattern', 'unique', 'artistic'];
        occasionKeywords['Accessories'] = [...(occasionKeywords['Accessories'] || []), 'statement', 'unique'];
      }
      
      // Add vibe-specific keywords
      if (vibe === 'minimalist') {
        occasionKeywords['Tops'] = [...(occasionKeywords['Tops'] || []), 'clean', 'simple', 'basic'];
        occasionKeywords['Bottoms'] = [...(occasionKeywords['Bottoms'] || []), 'clean', 'simple'];
      } else if (vibe === 'elegant') {
        occasionKeywords['Tops'] = [...(occasionKeywords['Tops'] || []), 'sophisticated', 'refined'];
        occasionKeywords['Footwear'] = [...(occasionKeywords['Footwear'] || []), 'polished', 'refined'];
      } else if (vibe === 'playful') {
        occasionKeywords['Tops'] = [...(occasionKeywords['Tops'] || []), 'fun', 'colorful'];
        occasionKeywords['Accessories'] = [...(occasionKeywords['Accessories'] || []), 'fun', 'playful'];
      }
      
      // Enhance explanation with mood context
      const moodStyle = moodStyleMap[mood]?.[energyLevel] || '';
      if (moodStyle) {
        explanation = `This outfit reflects your ${mood} mood with ${moodStyle}. It's perfect for a ${vibe} ${occasion} look that will make you feel confident and authentic.`;
      }
    }
    
    // Create the outfit with our occasion-specific keywords
    Object.entries(occasionKeywords).forEach(([category, keywords]) => {
      const item = selectItemForCategory(category, keywords);
      if (item) {
        // Convert from wardrobe category (e.g., "Tops") to API format (e.g., "top")
        const apiCategory = category === 'Tops' ? 'top' : 
                            category === 'Bottoms' ? 'bottom' : 
                            category === 'Outerwear' ? 'outerwear' : 
                            category === 'Footwear' ? 'footwear' : 
                            category === 'Accessories' ? 'accessories' : category.toLowerCase();
        
        outfit[apiCategory] = item;
      }
    });
    
    // Select a random fashion trend
    const trend = fashionTrends[Math.floor(Math.random() * fashionTrends.length)];
    
    // Return formatted output
    return {
      outfit,
      explanation,
      trend
    };
  } catch (error) {
    console.error("Error generating outfit recommendation:", error);
    throw new Error("Failed to generate outfit recommendation");
  }
};

/**
 * Generate an AI-powered outfit recommendation (more advanced)
 * This is a placeholder for future implementation with more advanced models
 */
export const generateAdvancedOutfitRecommendation = async (
  wardrobeItems: WardrobeItem[],
  occasion: string,
  moodContext?: MoodContext
): Promise<OutfitRecommendationResult> => {
  // For now, we'll use the same implementation as the basic version
  // but with the mood context passed through
  return generateOutfitRecommendation(wardrobeItems, occasion, moodContext);
};

