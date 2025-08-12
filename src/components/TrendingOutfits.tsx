
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { trendingOutfits as allOutfits } from '@/lib/outfit-collections';
import { OutfitItem } from '@/lib/outfit-collections';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterOptions } from '@/components/FilterBar';
import { ArrowRight, Heart, Star, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGestures } from '@/hooks/useGestures';
import { useToast } from '@/hooks/use-toast';

interface TrendingOutfitsProps {
  filters?: FilterOptions;
}

const TrendingOutfits = ({ filters }: TrendingOutfitsProps) => {
  const [filteredOutfits, setFilteredOutfits] = useState<OutfitItem[]>(allOutfits);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
  const { toast } = useToast();

  const gestureRef = useGestures({
    onSwipeLeft: () => {
      if (currentOutfitIndex < filteredOutfits.length - 1) {
        setCurrentOutfitIndex(prev => prev + 1);
      }
    },
    onSwipeRight: () => {
      if (currentOutfitIndex > 0) {
        setCurrentOutfitIndex(prev => prev - 1);
      }
    },
    threshold: 50
  });

  const toggleFavorite = (outfitId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(outfitId)) {
      newFavorites.delete(outfitId);
      toast({
        title: "Removed from favorites",
        description: "Outfit removed from your favorites",
      });
    } else {
      newFavorites.add(outfitId);
      toast({
        title: "Added to favorites ❤️",
        description: "Outfit saved to your favorites",
      });
    }
    setFavorites(newFavorites);
  };

  const shareOutfit = (outfit: OutfitItem) => {
    if (navigator.share) {
      navigator.share({
        title: outfit.name,
        text: `Check out this ${outfit.vibe} outfit for ${outfit.occasion}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Outfit link copied to clipboard",
      });
    }
  };

  useEffect(() => {
    if (!filters) {
      setFilteredOutfits(allOutfits);
      return;
    }

    let filtered = [...allOutfits];

    // Filter by mood
    if (filters.mood !== 'all') {
      filtered = filtered.filter(outfit => {
        if (filters.mood === 'chill' && ['casual', 'comfortable', 'cozy', 'boho'].includes(outfit.vibe)) return true;
        if (filters.mood === 'work' && ['professional', 'business', 'formal', 'minimalist'].includes(outfit.vibe)) return true;
        if (filters.mood === 'date' && ['elegant', 'glamorous', 'stylish', 'evening'].includes(outfit.vibe)) return true;
        return false;
      });
    }

    // Filter by weather
    if (filters.weather !== 'all') {
      filtered = filtered.filter(outfit => {
        if (filters.weather === 'sunny' && ['summer', 'spring'].includes(outfit.season)) return true;
        if (filters.weather === 'rainy' && ['fall', 'winter'].includes(outfit.season)) return true;
        return outfit.season === 'all'; // Always include 'all seasons' outfits
      });
    }

    // Filter by style
    if (filters.style !== 'all') {
      filtered = filtered.filter(outfit => {
        if (filters.style === 'minimal' && ['minimalist', 'casual', 'professional'].includes(outfit.vibe)) return true;
        if (filters.style === 'street' && ['grunge', 'casual', 'edgy'].includes(outfit.vibe)) return true;
        if (filters.style === 'ethnic' && ['boho', 'vintage', 'artistic'].includes(outfit.vibe)) return true;
        return false;
      });
    }

    // Filter by budget (using product info if available)
    if (filters.budget < 500) {
      filtered = filtered.filter(outfit => {
        // If we have product info, check if any product exceeds budget
        if (outfit.products) {
          const products = [
            outfit.products.top,
            outfit.products.bottom,
            outfit.products.footwear,
            outfit.products.outerwear,
            ...(outfit.products.accessories || [])
          ].filter(Boolean);
          
          // If no products or all products within budget
          return products.length === 0 || !products.some(p => p && p.price > filters.budget);
        }
        return true; // Include outfits with no product info
      });
    }

    setFilteredOutfits(filtered);
  }, [filters]);

  return (
    <div ref={gestureRef as any}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOutfits.length > 0 ? (
          filteredOutfits.map((outfit, index) => (
            <motion.div
              key={outfit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={outfit.imageUrl}
                    alt={outfit.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0 bg-white/90 hover:bg-white shadow-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(outfit.id.toString());
                      }}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          favorites.has(outfit.id.toString()) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0 bg-white/90 hover:bg-white shadow-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        shareOutfit(outfit);
                      }}
                    >
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 text-primary font-medium shadow-sm">
                      {outfit.gender}
                    </Badge>
                    <Badge className="bg-primary/90 text-white shadow-sm">
                      {outfit.season}
                    </Badge>
                  </div>

                  {/* Rating Overlay */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">4.8</span>
                  </div>
                </div>

                <CardContent className="flex-grow p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg mb-1 line-clamp-2">{outfit.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {outfit.occasion} · {outfit.vibe} vibe
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {outfit.top && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-primary">Top:</span> 
                        <span className="text-muted-foreground truncate ml-2">{outfit.top}</span>
                      </div>
                    )}
                    {outfit.bottom && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-primary">Bottom:</span> 
                        <span className="text-muted-foreground truncate ml-2">{outfit.bottom}</span>
                      </div>
                    )}
                    {outfit.footwear && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-primary">Footwear:</span> 
                        <span className="text-muted-foreground truncate ml-2">{outfit.footwear}</span>
                      </div>
                    )}
                  </div>

                  {/* Price Range (if available) */}
                  <div className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">From ₹2,500</span>
                    <span className="ml-2">Complete look</span>
                  </div>
                </CardContent>

                <CardFooter className="p-5 pt-0 space-y-2">
                  <Link to={`/outfit/${outfit.id}`} className="w-full">
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      See Details & Shop
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      Try Virtual
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Similar Looks
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-3 py-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No outfits found</h3>
              <p className="text-muted-foreground mb-4">
                No outfits match your current filters. Try adjusting your criteria or explore our trending collection.
              </p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingOutfits;
