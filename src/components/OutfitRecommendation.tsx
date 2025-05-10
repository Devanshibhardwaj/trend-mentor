import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, Sparkles, Smile } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { generateOutfitRecommendation, generateAdvancedOutfitRecommendation } from '@/utils/outfitRecommendation';
import MoodBasedOutfits, { MoodData } from '@/components/MoodBasedOutfits';
import { FilterOptions } from '@/components/FilterBar';

interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

interface OutfitRecommendationProps {
  wardrobeItems: WardrobeItem[];
  isLoading: boolean;
  filters?: FilterOptions;
}

interface Outfit {
  top?: WardrobeItem;
  bottom?: WardrobeItem;
  outerwear?: WardrobeItem;
  footwear?: WardrobeItem;
  accessories?: WardrobeItem;
}

// Sample outfit images for different categories and occasions
const outfitImages = {
  casual: [
    '/images/outfits/casual-1.jpg',
    '/images/outfits/casual-2.jpg',
    '/images/outfits/casual-3.jpg',
  ],
  formal: [
    '/images/outfits/formal-1.jpg',
    '/images/outfits/formal-2.jpg',
    '/images/outfits/formal-3.jpg',
  ],
  business: [
    '/images/outfits/business-1.jpg',
    '/images/outfits/business-2.jpg',
    '/images/outfits/business-3.jpg',
  ],
  sports: [
    '/images/outfits/sports-1.jpg',
    '/images/outfits/sports-2.jpg',
    '/images/outfits/sports-3.jpg',
  ],
  party: [
    '/images/outfits/party-1.jpg',
    '/images/outfits/party-2.jpg',
    '/images/outfits/party-3.jpg',
  ],
  default: '/images/outfits/default-outfit.jpg'
};

// Function to get a random image for an occasion
const getRandomOutfitImage = (occasion: string) => {
  const images = outfitImages[occasion as keyof typeof outfitImages] || outfitImages.default;
  if (Array.isArray(images)) {
    return images[Math.floor(Math.random() * images.length)];
  }
  return images;
};

const OutfitRecommendation = ({ wardrobeItems, isLoading, filters }: OutfitRecommendationProps) => {
  const [generatingOutfit, setGeneratingOutfit] = useState(false);
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [occasion, setOccasion] = useState<string>("casual");
  const [outfitImage, setOutfitImage] = useState<string | null>(null);
  const [useAI, setUseAI] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [aiTrend, setAiTrend] = useState<string | null>(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodData | null>(null);

  const occasionOptions = [
    { value: "casual", label: "Casual" },
    { value: "formal", label: "Formal" },
    { value: "business", label: "Business" },
    { value: "sports", label: "Sports" },
    { value: "party", label: "Party" }
  ];

  // Apply filters to the occasion if needed
  useEffect(() => {
    if (filters) {
      if (filters.mood === 'work') {
        setOccasion("business");
      } else if (filters.mood === 'date') {
        setOccasion("party");
      } else if (filters.mood === 'chill') {
        setOccasion("casual");
      }
    }
  }, [filters]);

  const generateOutfit = async () => {
    if (wardrobeItems.length < 2) {
      toast.error("Add more items to your wardrobe to get recommendations");
      return;
    }

    setGeneratingOutfit(true);
    setAiExplanation(null);
    setAiTrend(null);
    
    try {
      if (useAI) {
        await generateAIOutfit();
      } else {
        await generateBasicOutfit();
      }
      
      // Set a random outfit image based on occasion
      setOutfitImage(getRandomOutfitImage(occasion));
      
      toast.success("Outfit generated successfully!");
    } catch (error) {
      console.error("Error generating outfit:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate outfit");
      setOutfit(null);
      setOutfitImage(null);
    } finally {
      setGeneratingOutfit(false);
    }
  };

  const generateAIOutfit = async () => {
    try {
      // Use our local AI recommendation system
      toast.info("Generating outfit with local AI model...");
      
      // Combine mood context with filters
      const moodContext = {
        mood: currentMood?.mood || filters?.mood || 'casual',
        energyLevel: currentMood?.energyLevel || 'medium',
        vibe: currentMood?.vibe || filters?.style || 'casual',
        weather: filters?.weather || 'all',
        budget: filters?.budget || 500
      };
      
      const result = await generateAdvancedOutfitRecommendation(wardrobeItems, occasion, moodContext);
      
      if (!result || !result.outfit) {
        throw new Error("AI could not generate a recommendation");
      }

      // Convert AI response to outfit structure
      const newOutfit: Outfit = {};
      const categories = ['top', 'bottom', 'outerwear', 'footwear', 'accessories'];
      
      categories.forEach(category => {
        if (result.outfit[category as keyof typeof result.outfit]) {
          const itemId = result.outfit[category as keyof typeof result.outfit]?.id;
          const item = itemId ? wardrobeItems.find(item => item.id === itemId) : undefined;
          
          if (item) {
            newOutfit[category as keyof Outfit] = item;
          }
        }
      });

      // Save explanation and trend if provided
      if (result.explanation) {
        setAiExplanation(result.explanation);
      }
      
      if (result.trend) {
        setAiTrend(result.trend);
      }
      
      setOutfit(newOutfit);
      
      // Save recommendation to database if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const outfitItems = Object.values(newOutfit).filter(Boolean);
        const outfitName = `AI ${occasion.charAt(0).toUpperCase() + occasion.slice(1)} outfit`;
        
        await supabase.from('outfit_recommendations').insert({
          user_id: user.id,
          name: outfitName,
          occasion: occasion,
          items: outfitItems,
          is_ai_generated: true,
          description: result.explanation || `An AI-generated ${occasion} outfit`
        });
      }
    } catch (error) {
      console.error("Error in AI outfit generation:", error);
      throw error;
    }
  };
  
  const generateBasicOutfit = async () => {
    try {
      // Group items by category
      const categorizedItems: Record<string, WardrobeItem[]> = {};
      
      wardrobeItems.forEach(item => {
        if (!categorizedItems[item.category]) {
          categorizedItems[item.category] = [];
        }
        categorizedItems[item.category].push(item);
      });

      // Create outfit based on occasion and available items
      const newOutfit: Outfit = {};
      
      // Apply filters for more targeted outfit selection
      const stylePreference = filters?.style || 'all';
      const weatherPreference = filters?.weather || 'all';
      const budgetLimit = filters?.budget || 500;
      
      // Simple rule-based selection for different occasions
      if (occasion === "casual") {
        // For casual: prefer t-shirts, jeans, sneakers
        newOutfit.top = getRandomItem(categorizedItems["Tops"], "t-shirt", "shirt");
        newOutfit.bottom = getRandomItem(categorizedItems["Bottoms"], "jeans", "shorts");
        newOutfit.footwear = getRandomItem(categorizedItems["Footwear"], "sneakers", "sandals");
        newOutfit.outerwear = getRandomItem(categorizedItems["Outerwear"], "jacket", "hoodie");
      } else if (occasion === "formal") {
        // For formal: prefer dress shirts, suits, dress shoes
        newOutfit.top = getRandomItem(categorizedItems["Tops"], "dress shirt", "blouse");
        newOutfit.bottom = getRandomItem(categorizedItems["Bottoms"], "slacks", "dress pants");
        newOutfit.footwear = getRandomItem(categorizedItems["Footwear"], "dress shoes", "heels");
        newOutfit.outerwear = getRandomItem(categorizedItems["Outerwear"], "blazer", "suit jacket");
      } else if (occasion === "business") {
        // For business: smart casual items
        newOutfit.top = getRandomItem(categorizedItems["Tops"], "blouse", "button up");
        newOutfit.bottom = getRandomItem(categorizedItems["Bottoms"], "slacks", "skirt");
        newOutfit.footwear = getRandomItem(categorizedItems["Footwear"], "loafers", "flats");
        newOutfit.outerwear = getRandomItem(categorizedItems["Outerwear"], "cardigan", "blazer");
      } else if (occasion === "sports") {
        // For sports: athletic wear
        newOutfit.top = getRandomItem(categorizedItems["Tops"], "jersey", "t-shirt");
        newOutfit.bottom = getRandomItem(categorizedItems["Bottoms"], "shorts", "joggers");
        newOutfit.footwear = getRandomItem(categorizedItems["Footwear"], "sneakers", "running shoes");
        newOutfit.outerwear = getRandomItem(categorizedItems["Outerwear"], "track jacket", "windbreaker");
      } else if (occasion === "party") {
        // For party: dressier items
        newOutfit.top = getRandomItem(categorizedItems["Tops"], "blouse", "dress shirt");
        newOutfit.bottom = getRandomItem(categorizedItems["Bottoms"], "dress pants", "skirt");
        newOutfit.footwear = getRandomItem(categorizedItems["Footwear"], "heels", "dress shoes");
        newOutfit.accessories = getRandomItem(categorizedItems["Accessories"]);
      }
      
      // Apply weather-based filtering
      if (weatherPreference === 'rainy') {
        // Prefer water-resistant items for rainy weather
        newOutfit.outerwear = getRandomItem(categorizedItems["Outerwear"], "raincoat", "waterproof");
        newOutfit.footwear = getRandomItem(categorizedItems["Footwear"], "boots", "waterproof");
      } else if (weatherPreference === 'sunny') {
        // Prefer lighter items for sunny weather
        newOutfit.top = getRandomItem(categorizedItems["Tops"], "t-shirt", "tank");
        newOutfit.outerwear = null; // No need for outerwear in sunny weather
      }
      
      // Fill in any missing categories with random items from that category
      if (!newOutfit.top && categorizedItems["Tops"]) {
        newOutfit.top = getRandomItem(categorizedItems["Tops"]);
      }
      if (!newOutfit.bottom && categorizedItems["Bottoms"]) {
        newOutfit.bottom = getRandomItem(categorizedItems["Bottoms"]);
      }
      if (!newOutfit.outerwear && categorizedItems["Outerwear"]) {
        newOutfit.outerwear = getRandomItem(categorizedItems["Outerwear"]);
      }
      if (!newOutfit.footwear && categorizedItems["Footwear"]) {
        newOutfit.footwear = getRandomItem(categorizedItems["Footwear"]);
      }
      if (!newOutfit.accessories && categorizedItems["Accessories"]) {
        newOutfit.accessories = getRandomItem(categorizedItems["Accessories"]);
      }
      
      // Budget filtering: Remove any items that exceed budget
      Object.entries(newOutfit).forEach(([category, item]) => {
        if (item && 'price' in item && item.price > budgetLimit) {
          newOutfit[category as keyof Outfit] = undefined;
        }
      });
      
      // Check if we have at least 2 items to make an outfit
      const outfitItemCount = Object.values(newOutfit).filter(Boolean).length;
      if (outfitItemCount < 2) {
        throw new Error("Not enough variety in your wardrobe to create an outfit");
      }
      
      setOutfit(newOutfit);
      
      // Save recommendation to database if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const outfitItems = Object.values(newOutfit).filter(Boolean);
        const outfitName = `${occasion.charAt(0).toUpperCase() + occasion.slice(1)} outfit`;
        
        await supabase.from('outfit_recommendations').insert({
          user_id: user.id,
          name: outfitName,
          occasion: occasion,
          items: outfitItems,
          is_ai_generated: false,
          description: `A ${occasion} outfit created from your wardrobe items`
        });
      }
    } catch (error) {
      console.error("Error in basic outfit generation:", error);
      throw error;
    }
  };
  
  // Helper function to get a random item from a category, with preference for keywords
  const getRandomItem = (items?: WardrobeItem[], ...preferredKeywords: string[]) => {
    if (!items || items.length === 0) return undefined;
    
    // First try to find items matching preferred keywords
    if (preferredKeywords.length > 0) {
      const matchingItems = items.filter(item => 
        preferredKeywords.some(keyword => 
          item.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      
      if (matchingItems.length > 0) {
        return matchingItems[Math.floor(Math.random() * matchingItems.length)];
      }
    }
    
    // If no matching items found, pick a random one
    return items[Math.floor(Math.random() * items.length)];
  };

  const handleOccasionChange = (newOccasion: string) => {
    setOccasion(newOccasion);
    setOutfit(null); // Reset outfit when occasion changes
    setOutfitImage(null); // Reset outfit image when occasion changes
    setAiExplanation(null);
    setAiTrend(null);
  };
  
  const handleMoodSelected = (moodData: MoodData) => {
    setCurrentMood(moodData);
    setShowMoodSelector(false);
    
    // Adjust the occasion based on mood/vibe if appropriate
    if (moodData.vibe === 'elegant') {
      setOccasion('formal');
    } else if (moodData.vibe === 'casual') {
      setOccasion('casual');
    } else if (moodData.vibe === 'playful') {
      setOccasion('party');
    }
    
    // Automatically generate an outfit with the new mood
    setTimeout(() => {
      setUseAI(true);
      generateOutfit();
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col space-y-4 p-6 border rounded-lg bg-card">
        <div className="h-6 bg-muted rounded w-1/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
        <div className="h-10 bg-muted rounded"></div>
      </div>
    );
  }

  if (showMoodSelector) {
    return <MoodBasedOutfits onSelectMood={handleMoodSelected} />;
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Outfit Recommendations</h3>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="ai-mode" 
              checked={useAI}
              onCheckedChange={setUseAI}
            />
            <Label htmlFor="ai-mode" className="flex items-center cursor-pointer">
              <span>AI Mode</span>
              {useAI && <Sparkles className="h-4 w-4 ml-1 text-yellow-400" />}
            </Label>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => setShowMoodSelector(true)}
          >
            <Smile className="h-4 w-4" />
            <span>Mood</span>
            {currentMood && (
              <Badge variant="outline" className="ml-1 text-xs">
                {currentMood.mood}
              </Badge>
            )}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {occasionOptions.map(opt => (
            <Button
              key={opt.value}
              variant={occasion === opt.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleOccasionChange(opt.value)}
              className="capitalize"
            >
              {opt.label}
            </Button>
          ))}
        </div>
        
        {filters && (
          <div className="p-4 bg-primary/5 rounded-lg mt-4 mb-4">
            <h5 className="font-medium">Active filters</h5>
            <div className="flex flex-wrap gap-1 mt-2">
              {filters.mood !== 'all' && (
                <Badge variant="outline">Mood: {filters.mood}</Badge>
              )}
              {filters.weather !== 'all' && (
                <Badge variant="outline">Weather: {filters.weather}</Badge>
              )}
              {filters.style !== 'all' && (
                <Badge variant="outline">Style: {filters.style}</Badge>
              )}
              <Badge variant="outline">Budget: ${filters.budget}</Badge>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <Button 
            onClick={generateOutfit} 
            disabled={generatingOutfit || wardrobeItems.length < 2}
            className="w-full gap-2"
          >
            {generatingOutfit ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {useAI ? "AI is thinking..." : "Generating..."}
              </>
            ) : (
              <>
                {useAI ? (
                  <Sparkles className="h-4 w-4" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {useAI ? "Generate AI Outfit" : "Generate Outfit"}
              </>
            )}
          </Button>
        </div>
        
        {currentMood && (
          <div className="p-4 bg-primary/5 rounded-lg mt-4">
            <h5 className="font-medium flex items-center">
              <Smile className="h-4 w-4 mr-2" /> 
              Based on your mood
            </h5>
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline">{currentMood.mood}</Badge>
              <Badge variant="outline">{currentMood.vibe}</Badge>
              <Badge variant="outline">{currentMood.energyLevel} energy</Badge>
            </div>
          </div>
        )}
        
        {outfit && (
          <div className="space-y-4 mt-4">
            <h4 className="font-medium text-md">Your {occasion} outfit:</h4>
            
            {outfitImage && (
              <div className="overflow-hidden rounded-lg mb-4">
                <img 
                  src={outfitImage} 
                  alt={`Complete ${occasion} outfit`}
                  className="w-full object-cover h-64" 
                />
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              {outfit.top && (
                <OutfitItem item={outfit.top} category="Top" />
              )}
              
              {outfit.bottom && (
                <OutfitItem item={outfit.bottom} category="Bottom" />
              )}
              
              {outfit.outerwear && (
                <OutfitItem item={outfit.outerwear} category="Outerwear" />
              )}
              
              {outfit.footwear && (
                <OutfitItem item={outfit.footwear} category="Footwear" />
              )}
              
              {outfit.accessories && (
                <OutfitItem item={outfit.accessories} category="Accessories" />
              )}
            </div>
            
            {useAI && aiExplanation && (
              <div className="p-4 bg-primary/5 rounded-lg mt-4">
                <h5 className="font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-yellow-400" /> 
                  AI Styling Notes
                </h5>
                <p className="text-sm mt-2">{aiExplanation}</p>
                
                {aiTrend && (
                  <div className="mt-2">
                    <Badge variant="outline" className="bg-primary/10">
                      {aiTrend}
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {!outfit && wardrobeItems.length < 2 && (
          <div className="text-center py-4 text-muted-foreground">
            <p>Add at least two items to your wardrobe to get outfit recommendations.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const OutfitItem = ({ item, category }: { item: WardrobeItem, category: string }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="aspect-square relative">
        <img 
          src={item.imageUrl || 'https://placehold.co/300x300/e6e6e6/a6a6a6?text=No+Image'} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/80 text-primary text-xs font-medium">
            {category}
          </Badge>
        </div>
      </div>
      <div className="p-2">
        <p className="text-sm font-medium truncate">{item.name}</p>
      </div>
    </div>
  );
};

export default OutfitRecommendation;
