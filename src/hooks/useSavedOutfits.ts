
import { useState, useEffect } from 'react';
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

interface OutfitToSave {
  name: string;
  occasion: string;
  items: Array<{
    id: string;
    name: string;
    category: string;
    imageUrl: string;
  }>;
}

export const useSavedOutfits = () => {
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

  const saveOutfit = (outfit: OutfitToSave) => {
    try {
      const newOutfit: SavedOutfit = {
        id: Date.now().toString(),
        ...outfit,
        savedAt: new Date().toISOString()
      };

      const updatedOutfits = [...savedOutfits, newOutfit];
      setSavedOutfits(updatedOutfits);
      localStorage.setItem('savedOutfits', JSON.stringify(updatedOutfits));
      toast.success('Outfit saved to your looks!');
      return true;
    } catch (error) {
      console.error('Error saving outfit:', error);
      toast.error('Failed to save outfit');
      return false;
    }
  };

  const isOutfitSaved = (outfitItems: Array<{ id: string }>) => {
    const itemIds = outfitItems.map(item => item.id).sort().join(',');
    return savedOutfits.some(saved => {
      const savedItemIds = saved.items.map(item => item.id).sort().join(',');
      return savedItemIds === itemIds;
    });
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

  return {
    savedOutfits,
    saveOutfit,
    isOutfitSaved,
    removeSavedOutfit,
    loadSavedOutfits
  };
};
