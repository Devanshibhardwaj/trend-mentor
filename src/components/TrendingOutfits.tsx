
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { trendingOutfits as allOutfits } from '@/lib/outfit-collections';
import { OutfitItem } from '@/lib/outfit-collections';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterOptions } from '@/components/FilterBar';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrendingOutfitsProps {
  filters?: FilterOptions;
}

const TrendingOutfits = ({ filters }: TrendingOutfitsProps) => {
  const [filteredOutfits, setFilteredOutfits] = useState<OutfitItem[]>(allOutfits);

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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOutfits.length > 0 ? (
          filteredOutfits.map((outfit, index) => (
            <motion.div
              key={outfit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={outfit.imageUrl}
                    alt={outfit.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge variant="secondary" className="bg-white/80 text-primary font-medium">
                      {outfit.gender}
                    </Badge>
                    <Badge className="bg-primary/80 text-white">
                      {outfit.season}
                    </Badge>
                  </div>
                </div>
                <CardContent className="flex-grow p-4">
                  <h3 className="font-bold text-lg mb-2">{outfit.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {outfit.occasion} · {outfit.vibe} vibe
                  </p>
                  
                  <div className="mt-4 space-y-1">
                    {outfit.top && (
                      <p className="text-sm flex justify-between">
                        <span className="font-medium">Top:</span> 
                        <span className="text-muted-foreground">{outfit.top}</span>
                      </p>
                    )}
                    {outfit.bottom && (
                      <p className="text-sm flex justify-between">
                        <span className="font-medium">Bottom:</span> 
                        <span className="text-muted-foreground">{outfit.bottom}</span>
                      </p>
                    )}
                    {outfit.footwear && (
                      <p className="text-sm flex justify-between">
                        <span className="font-medium">Footwear:</span> 
                        <span className="text-muted-foreground">{outfit.footwear}</span>
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link to={`/outfit/${outfit.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      See Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-3 py-8 text-center">
            <p className="text-muted-foreground">No outfits match your current filters. Try adjusting your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingOutfits;
