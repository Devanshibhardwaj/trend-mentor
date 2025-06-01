
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck, Trash2 } from 'lucide-react';
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
}

const SavedOutfits = () => {
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);

  useEffect(() => {
    loadSavedOutfits();
  }, []);

  const loadSavedOutfits = () => {
    try {
      const saved = localStorage.getItem('savedOutfits');
      if (saved) {
        setSavedOutfits(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved outfits:', error);
    }
  };

  const removeSavedOutfit = (outfitId: string) => {
    try {
      const updatedOutfits = savedOutfits.filter(outfit => outfit.id !== outfitId);
      setSavedOutfits(updatedOutfits);
      localStorage.setItem('savedOutfits', JSON.stringify(updatedOutfits));
      toast.success('Outfit removed from saved looks');
    } catch (error) {
      console.error('Error removing saved outfit:', error);
      toast.error('Failed to remove outfit');
    }
  };

  if (savedOutfits.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Your Saved Looks</h2>
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Saved Looks Yet</h3>
            <p className="text-muted-foreground">
              Save your favorite outfit recommendations to see them here
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Your Saved Looks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedOutfits.map((outfit) => (
          <Card key={outfit.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-sm">{outfit.name}</h4>
                  <Badge variant="outline" className="text-xs mt-1">
                    {outfit.occasion}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSavedOutfit(outfit.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                {outfit.items.slice(0, 4).map((item, index) => (
                  <div key={index} className="aspect-square relative">
                    <img
                      src={item.imageUrl || 'https://placehold.co/150x150/e6e6e6/a6a6a6?text=No+Image'}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute bottom-1 right-1">
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-xs text-muted-foreground">
                Saved {new Date(outfit.savedAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedOutfits;
