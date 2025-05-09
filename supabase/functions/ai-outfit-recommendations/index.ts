
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Current fashion trends
const fashionTrends = [
  "Monochromatic outfits with one pop of color",
  "Smart casual combinations",
  "Sustainable and versatile pieces that can be mixed and matched",
  "Relaxed fits combined with structured pieces",
  "Neutral tones with bold accessories",
  "Vintage-inspired modern outfits",
  "Athleisure with a formal twist",
  "Statement oversized pieces balanced with fitted items",
  "Elevated basics with luxury touches",
  "Unexpected color combinations that complement each other"
];

// Add mood-based style descriptions
const moodStyles = {
  happy: {
    description: "Uplifting pieces that reflect your positive energy",
    colors: ["yellow", "orange", "bright blue", "coral"],
    patterns: ["cheerful", "sunny", "playful"]
  },
  relaxed: {
    description: "Comfortable and easygoing items that help maintain your calm state",
    colors: ["soft blue", "sage green", "lavender", "neutral"],
    patterns: ["subtle", "simple", "uncluttered"]
  },
  confident: {
    description: "Bold, structured pieces that enhance your powerful presence",
    colors: ["red", "deep blue", "black", "emerald"],
    patterns: ["structured", "defined", "intentional"]
  },
  professional: {
    description: "Polished, tailored items that convey competence and authority",
    colors: ["navy", "charcoal", "burgundy", "ivory"],
    patterns: ["minimal", "classic", "refined"]
  },
  creative: {
    description: "Expressive items that showcase your artistic personality",
    colors: ["mixed", "vibrant", "unexpected", "multicolor"],
    patterns: ["artistic", "eclectic", "unconventional"]
  },
  nightlife: {
    description: "Eye-catching statement pieces that shine after dark",
    colors: ["metallic", "black", "jewel tones", "shimmer"],
    patterns: ["bold", "dramatic", "textured"]
  }
};

// Color palette recommendations based on preference
const colorPalettes = {
  neutral: ["beige", "gray", "taupe", "ivory", "sand"],
  warm: ["terracotta", "rust", "amber", "coral", "burgundy"],
  cool: ["navy", "slate blue", "teal", "emerald", "lavender"],
  vibrant: ["magenta", "emerald", "cobalt", "tangerine", "violet"]
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { wardrobeItems, occasion, moodContext } = await req.json();
    
    if (!wardrobeItems || !Array.isArray(wardrobeItems) || wardrobeItems.length < 2) {
      return new Response(
        JSON.stringify({ error: 'You need at least 2 wardrobe items to generate an outfit' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Format wardrobe items for processing
    const itemsByCategory: Record<string, any[]> = {};
    wardrobeItems.forEach(item => {
      if (!itemsByCategory[item.category]) {
        itemsByCategory[item.category] = [];
      }
      itemsByCategory[item.category].push(item);
    });

    // Rule-based outfit generation
    const outfit: Record<string, { id: string; name: string }> = {};
    let usedItems = new Set<string>();
    
    // Helper function to select items
    const selectItemForCategory = (category: string, keywords: string[] = []) => {
      if (!itemsByCategory[category] || itemsByCategory[category].length === 0) {
        return null;
      }
      
      // Try to find items matching keywords first
      if (keywords.length > 0) {
        const matchingItems = itemsByCategory[category].filter(
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
      const availableItems = itemsByCategory[category].filter(item => !usedItems.has(item.id));
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
    
    if (occasion === 'casual') {
      occasionKeywords = {
        'Tops': ['t-shirt', 'casual', 'cotton', 'comfortable'],
        'Bottoms': ['jeans', 'shorts', 'casual'],
        'Outerwear': ['jacket', 'hoodie', 'cardigan'],
        'Footwear': ['sneakers', 'casual', 'comfortable'],
        'Accessories': ['casual', 'everyday']
      };
      explanation = "This casual outfit combines comfort with style, perfect for everyday activities. The pieces work well together with a relaxed aesthetic that follows the trend of versatile, mix-and-match pieces.";
    } else if (occasion === 'formal') {
      occasionKeywords = {
        'Tops': ['dress shirt', 'blouse', 'formal', 'elegant'],
        'Bottoms': ['slacks', 'dress pants', 'skirt', 'formal'],
        'Outerwear': ['blazer', 'suit jacket', 'formal'],
        'Footwear': ['dress shoes', 'heels', 'formal'],
        'Accessories': ['elegant', 'refined', 'formal']
      };
      explanation = "This formal outfit presents a polished and sophisticated look appropriate for professional or dressy occasions. The combination exudes elegance and follows the trend of structured pieces with refined silhouettes.";
    } else if (occasion === 'business') {
      occasionKeywords = {
        'Tops': ['blouse', 'button up', 'professional'],
        'Bottoms': ['slacks', 'trousers', 'skirt', 'professional'],
        'Outerwear': ['blazer', 'cardigan', 'professional'],
        'Footwear': ['loafers', 'flats', 'professional'],
        'Accessories': ['professional', 'business']
      };
      explanation = "This business outfit balances professionalism with comfort, ideal for workplace environments. The look is smart and put-together while still being practical, following the trend of smart casual combinations.";
    } else if (occasion === 'party') {
      occasionKeywords = {
        'Tops': ['party', 'dressy', 'evening', 'going out'],
        'Bottoms': ['dressy', 'evening', 'going out'],
        'Outerwear': ['dressy', 'evening', 'jacket', 'stylish'],
        'Footwear': ['heels', 'dress shoes', 'dressy'],
        'Accessories': ['statement', 'dressy', 'evening']
      };
      explanation = "This party outfit creates a fun and eye-catching look for social events. The combination is stylish and festive, incorporating the trend of monochromatic outfits with one pop of color for visual interest.";
    } else if (occasion === 'sports') {
      occasionKeywords = {
        'Tops': ['athletic', 'sporty', 'jersey', 'workout'],
        'Bottoms': ['athletic', 'sporty', 'shorts', 'leggings'],
        'Outerwear': ['track jacket', 'windbreaker', 'athletic'],
        'Footwear': ['sneakers', 'running shoes', 'athletic'],
        'Accessories': ['sporty', 'athletic', 'functional']
      };
      explanation = "This sports outfit prioritizes functionality and comfort while maintaining style. The athletic pieces work together for an active lifestyle, following the trend of athleisure with versatile performance features.";
    }

    // Enhance with mood-based recommendations if provided
    if (moodContext) {
      const { mood, energyLevel, vibe, colorPreference } = moodContext;
      
      // Add mood-specific keywords and adjust explanation
      if (mood && moodStyles[mood as keyof typeof moodStyles]) {
        const moodStyle = moodStyles[mood as keyof typeof moodStyles];
        
        // Add mood-related keywords to each category
        Object.keys(occasionKeywords).forEach(category => {
          // Add color keywords based on mood
          occasionKeywords[category] = [
            ...occasionKeywords[category],
            ...moodStyle.colors
          ];
          
          // Add pattern keywords based on mood
          occasionKeywords[category] = [
            ...occasionKeywords[category],
            ...moodStyle.patterns
          ];
        });
        
        // Add color preference if provided
        if (colorPreference && colorPalettes[colorPreference as keyof typeof colorPalettes]) {
          const preferredColors = colorPalettes[colorPreference as keyof typeof colorPalettes];
          
          Object.keys(occasionKeywords).forEach(category => {
            occasionKeywords[category] = [
              ...occasionKeywords[category],
              ...preferredColors
            ];
          });
        }
        
        // Enhance explanation with mood context
        explanation = `This ${occasion} outfit is curated for your ${mood} mood with ${moodStyle.description}. `;
        
        // Add energy level context
        if (energyLevel === 'low') {
          explanation += `The subtle, understated pieces maintain comfort while still looking put-together. `;
        } else if (energyLevel === 'medium') {
          explanation += `The balanced proportions and thoughtful details create a harmonious look. `;
        } else if (energyLevel === 'high') {
          explanation += `The bold elements and eye-catching details help you stand out while staying true to your style. `;
        }
        
        // Add vibe context
        if (vibe === 'casual') {
          explanation += `The casual, effortless vibe keeps you comfortable and confident.`;
        } else if (vibe === 'elegant') {
          explanation += `The refined, sophisticated touches elevate your look.`;
        } else if (vibe === 'playful') {
          explanation += `The fun, expressive elements showcase your personality.`;
        } else if (vibe === 'minimalist') {
          explanation += `The clean lines and thoughtful simplicity create an intentional aesthetic.`;
        }
        
        // Add color preference context if provided
        if (colorPreference) {
          explanation += ` We've incorporated a ${colorPreference} color palette to enhance your personal style.`;
        }
      }
    }
    
    // Map wardrobe categories to API categories
    const categoryMap: Record<string, string> = {
      'Tops': 'top',
      'Bottoms': 'bottom',
      'Outerwear': 'outerwear',
      'Footwear': 'footwear',
      'Accessories': 'accessories'
    };
    
    // Create the outfit with our occasion-specific keywords
    Object.entries(occasionKeywords).forEach(([category, keywords]) => {
      const item = selectItemForCategory(category, keywords);
      if (item) {
        const apiCategory = categoryMap[category] || category.toLowerCase();
        outfit[apiCategory] = item;
      }
    });
    
    // Select a random fashion trend
    const trend = fashionTrends[Math.floor(Math.random() * fashionTrends.length)];
    
    // Return the recommendation
    return new Response(
      JSON.stringify({
        outfit,
        explanation,
        trend,
        success: true,
        message: "Personalized outfit created based on your mood and style preferences"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in AI outfit recommendation function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
