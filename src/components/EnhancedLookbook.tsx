
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, Trash2, ChevronLeft, ChevronRight, Grid3X3, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface SavedOutfit {
  id: string;
  name: string;
  occasion: string;
  items: Array<{
    id: string;
    name: string;
    category: string;
    imageUrl: string;
  }>;
  savedAt: string;
  likes?: number;
  isLiked?: boolean;
}

interface EnhancedLookbookProps {
  savedOutfits: SavedOutfit[];
  onRemoveOutfit: (id: string) => void;
  onLikeOutfit: (id: string) => void;
}

const EnhancedLookbook = ({ savedOutfits, onRemoveOutfit, onLikeOutfit }: EnhancedLookbookProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'swipe'>('grid');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<string>('all');

  const occasions = ['all', ...new Set(savedOutfits.map(outfit => outfit.occasion))];
  
  const filteredOutfits = filter === 'all' 
    ? savedOutfits 
    : savedOutfits.filter(outfit => outfit.occasion === filter);

  const nextOutfit = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredOutfits.length);
  };

  const prevOutfit = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredOutfits.length) % filteredOutfits.length);
  };

  const shareOutfit = (outfit: SavedOutfit) => {
    if (navigator.share) {
      navigator.share({
        title: outfit.name,
        text: `Check out this ${outfit.occasion} outfit!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${outfit.name} - ${window.location.href}`);
      toast.success('Outfit link copied to clipboard!');
    }
  };

  if (savedOutfits.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Your Digital Lookbook</h2>
        <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Start Your Style Journey</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Save your favorite outfit combinations to build your personal lookbook. Every great style story starts with one perfect look.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Your Digital Lookbook</h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'swipe' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('swipe')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {occasions.map(occasion => (
          <Button
            key={occasion}
            variant={filter === occasion ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(occasion)}
            className="capitalize whitespace-nowrap"
          >
            {occasion}
          </Button>
        ))}
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredOutfits.map((outfit, index) => (
              <motion.div
                key={outfit.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
              >
                <LookbookCard
                  outfit={outfit}
                  onRemove={() => onRemoveOutfit(outfit.id)}
                  onLike={() => onLikeOutfit(outfit.id)}
                  onShare={() => shareOutfit(outfit)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="relative max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <LookbookCard
                outfit={filteredOutfits[currentIndex]}
                onRemove={() => onRemoveOutfit(filteredOutfits[currentIndex].id)}
                onLike={() => onLikeOutfit(filteredOutfits[currentIndex].id)}
                onShare={() => shareOutfit(filteredOutfits[currentIndex])}
              />
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" size="sm" onClick={prevOutfit}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {filteredOutfits.length}
            </span>
            <Button variant="outline" size="sm" onClick={nextOutfit}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const LookbookCard = ({ 
  outfit, 
  onRemove, 
  onLike, 
  onShare 
}: { 
  outfit: SavedOutfit;
  onRemove: () => void;
  onLike: () => void;
  onShare: () => void;
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-0">
        <div className="relative">
          <div className="grid grid-cols-2 gap-1 h-48">
            {outfit.items.slice(0, 4).map((item, index) => (
              <div key={index} className="relative overflow-hidden">
                <img
                  src={item.imageUrl || 'https://placehold.co/150x150/e6e6e6/a6a6a6?text=No+Image'}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1">
                  <Badge variant="secondary" className="text-xs px-1 py-0 bg-white/80">
                    {item.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={onLike}
            >
              <Heart className={`h-4 w-4 ${outfit.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={onShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-sm">{outfit.name}</h4>
              <Badge variant="outline" className="text-xs mt-1 capitalize">
                {outfit.occasion}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Saved {new Date(outfit.savedAt).toLocaleDateString()}</span>
            {outfit.likes && (
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {outfit.likes}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedLookbook;
