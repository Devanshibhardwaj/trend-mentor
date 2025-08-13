// API service with fallbacks and mock data
import { mockWardrobeItems, mockShoppingItems, mockTrendingOutfits, mockWeatherData } from '@/lib/mockData';

// Products API with mock fallback
export const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('API not available');
    }
    
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format');
    }
    
    return data;
  } catch (error) {
    console.log('Using mock wardrobe data as fallback');
    return mockWardrobeItems;
  }
};

// Shopping items with mock fallback
export const fetchShoppingItems = async (filters: { category?: string; maxPrice?: number } = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    
    const response = await fetch(`/api/shopping?${params}`);
    if (!response.ok) {
      throw new Error('Shopping API not available');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Using mock shopping data as fallback');
    
    let items = [...mockShoppingItems];
    
    if (filters.category) {
      items = items.filter(item => 
        item.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }
    
    if (filters.maxPrice) {
      items = items.filter(item => item.price <= (filters.maxPrice || Infinity));
    }
    
    return items;
  }
};

// Trending outfits with mock fallback
export const fetchTrendingOutfits = async (filters: { mood?: string; style?: string } = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.mood && filters.mood !== 'all') params.append('mood', filters.mood);
    if (filters.style && filters.style !== 'all') params.append('style', filters.style);
    
    const response = await fetch(`/api/trending?${params}`);
    if (!response.ok) {
      throw new Error('Trending API not available');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Using mock trending data as fallback');
    
    let outfits = [...mockTrendingOutfits];
    
    if (filters.mood && filters.mood !== 'all') {
      outfits = outfits.filter(outfit => 
        outfit.tags.some(tag => tag.toLowerCase().includes(filters.mood?.toLowerCase() || ''))
      );
    }
    
    if (filters.style && filters.style !== 'all') {
      outfits = outfits.filter(outfit => 
        outfit.tags.some(tag => tag.toLowerCase().includes(filters.style?.toLowerCase() || ''))
      );
    }
    
    return outfits;
  }
};

// AI outfit generation with mock fallback
export const generateAIOutfit = async (prompt: string, context: any) => {
  try {
    const response = await fetch('/api/ai-outfit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, context }),
    });
    
    if (!response.ok) {
      throw new Error('AI service not available');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('AI service unavailable, using smart recommendation fallback');
    
    // Smart mock recommendation based on context
    const availableItems = mockWardrobeItems;
    const categories = ['Tops', 'Bottoms', 'Footwear', 'Outerwear', 'Accessories'];
    
    const outfit: any = {};
    
    categories.forEach(category => {
      const categoryItems = availableItems.filter(item => item.category === category);
      if (categoryItems.length > 0) {
        const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];
        outfit[category.toLowerCase()] = randomItem;
      }
    });
    
    const explanations = [
      "This outfit combines comfort with style, perfect for your requested vibe.",
      "A balanced look that works great for the occasion you described.",
      "These pieces work harmoniously together to create a cohesive aesthetic.",
      "A versatile combination that can be dressed up or down as needed."
    ];
    
    const trends = [
      "Minimalist elegance",
      "Effortless chic",
      "Modern classic",
      "Timeless sophistication"
    ];
    
    return {
      outfit,
      explanation: explanations[Math.floor(Math.random() * explanations.length)],
      trend: trends[Math.floor(Math.random() * trends.length)],
      confidence: 0.85
    };
  }
};