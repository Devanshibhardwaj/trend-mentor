
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { trendingOutfits, OutfitItem } from '@/lib/outfit-collections';
import OutfitDetail from './OutfitDetail';
import { Sparkles, Filter } from 'lucide-react';

const filterOptions = {
  gender: ["all", "male", "female", "unisex"],
  season: ["all", "spring", "summer", "fall", "winter"],
  occasion: ["all", "casual", "work", "travel", "party", "sport"]
};

const TrendingOutfits = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    gender: "all",
    season: "all",
    occasion: "all"
  });
  
  const handleFilterChange = (category: string, value: string) => {
    setFilters(prev => ({ ...prev, [category]: value }));
  };
  
  const filteredOutfits = trendingOutfits.filter(outfit => {
    return (
      (filters.gender === "all" || outfit.gender === filters.gender) &&
      (filters.season === "all" || outfit.season === filters.season) &&
      (filters.occasion === "all" || outfit.occasion === filters.occasion)
    );
  });
  
  return (
    <Card className="overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl">
      <CardContent className="p-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-2">
            Trending Looks
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Discover the latest fashion trends curated for every style and occasion.
          </p>
        </motion.div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Looks</TabsTrigger>
              <TabsTrigger value="male">Men</TabsTrigger>
              <TabsTrigger value="female">Women</TabsTrigger>
              <TabsTrigger value="unisex">Unisex</TabsTrigger>
            </TabsList>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setFilters({ gender: "all", season: "all", occasion: "all" })}
            >
              <Filter className="h-4 w-4" />
              Reset Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium">Gender</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {filterOptions.gender.map((option) => (
                  <Button
                    key={option}
                    variant={filters.gender === option ? "default" : "outline"}
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => handleFilterChange("gender", option)}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Season</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {filterOptions.season.map((option) => (
                  <Button
                    key={option}
                    variant={filters.season === option ? "default" : "outline"}
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => handleFilterChange("season", option)}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Occasion</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {filterOptions.occasion.map((option) => (
                  <Button
                    key={option}
                    variant={filters.occasion === option ? "default" : "outline"}
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => handleFilterChange("occasion", option)}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <OutfitGrid outfits={filteredOutfits} />
          </TabsContent>
          
          <TabsContent value="male" className="mt-0">
            <OutfitGrid outfits={filteredOutfits.filter(o => o.gender === "male")} />
          </TabsContent>
          
          <TabsContent value="female" className="mt-0">
            <OutfitGrid outfits={filteredOutfits.filter(o => o.gender === "female")} />
          </TabsContent>
          
          <TabsContent value="unisex" className="mt-0">
            <OutfitGrid outfits={filteredOutfits.filter(o => o.gender === "unisex")} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const OutfitGrid = ({ outfits }: { outfits: OutfitItem[] }) => {
  if (outfits.length === 0) {
    return (
      <div className="text-center p-10">
        <p className="text-muted-foreground">No outfits match your filters. Try different combinations.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {outfits.map((outfit, index) => (
        <OutfitDetail key={outfit.id} outfit={outfit} index={index} />
      ))}
    </div>
  );
};

export default TrendingOutfits;
