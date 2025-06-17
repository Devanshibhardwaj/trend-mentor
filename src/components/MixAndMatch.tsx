
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DndContext, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';
import { Shuffle, Save, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

interface MixAndMatchProps {
  wardrobeItems: WardrobeItem[];
  onSaveOutfit: (outfit: any) => void;
}

const MixAndMatch = ({ wardrobeItems, onSaveOutfit }: MixAndMatchProps) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, WardrobeItem>>({});
  const [availableItems, setAvailableItems] = useState(wardrobeItems);

  const categories = ['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories'];

  const categorizedItems = categories.reduce((acc, category) => {
    acc[category] = availableItems.filter(item => item.category === category);
    return acc;
  }, {} as Record<string, WardrobeItem[]>);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const draggedItem = availableItems.find(item => item.id === active.id);
    const targetCategory = over.id;
    
    if (draggedItem && categories.includes(targetCategory)) {
      setSelectedItems(prev => ({
        ...prev,
        [targetCategory]: draggedItem
      }));
      toast.success(`Added ${draggedItem.name} to ${targetCategory}!`);
    }
  };

  const randomizeOutfit = () => {
    const newOutfit: Record<string, WardrobeItem> = {};
    
    categories.forEach(category => {
      const categoryItems = categorizedItems[category];
      if (categoryItems.length > 0) {
        const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];
        newOutfit[category] = randomItem;
      }
    });
    
    setSelectedItems(newOutfit);
    toast.success('Created a random outfit for you!');
  };

  const saveCurrentOutfit = () => {
    const outfitItems = Object.values(selectedItems);
    if (outfitItems.length === 0) {
      toast.error('Please add some items to save the outfit');
      return;
    }
    
    const outfit = {
      name: 'Custom Mix & Match',
      items: outfitItems,
      occasion: 'custom'
    };
    
    onSaveOutfit(outfit);
    toast.success('Outfit saved to your lookbook!');
  };

  const clearOutfit = () => {
    setSelectedItems({});
    toast.info('Outfit cleared!');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shuffle className="h-5 w-5 text-primary" />
            Mix & Match Studio
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Drag items from your wardrobe to create custom outfits
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Button onClick={randomizeOutfit} variant="outline" size="sm">
              <Shuffle className="h-4 w-4 mr-2" />
              Random Outfit
            </Button>
            <Button onClick={saveCurrentOutfit} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Outfit
            </Button>
            <Button onClick={clearOutfit} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {/* Drop Zones */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              {categories.map(category => (
                <DropZone
                  key={category}
                  category={category}
                  item={selectedItems[category]}
                  onRemove={() => setSelectedItems(prev => {
                    const newItems = { ...prev };
                    delete newItems[category];
                    return newItems;
                  })}
                />
              ))}
            </div>

            {/* Available Items */}
            <div className="space-y-4">
              {categories.map(category => (
                <div key={category}>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    {category}
                    <Badge variant="outline" className="text-xs">
                      {categorizedItems[category].length}
                    </Badge>
                  </h4>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {categorizedItems[category].map(item => (
                      <DraggableItem key={item.id} item={item} />
                    ))}
                    {categorizedItems[category].length === 0 && (
                      <div className="text-xs text-muted-foreground py-4">
                        No {category.toLowerCase()} in your wardrobe
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </DndContext>
        </CardContent>
      </Card>
    </div>
  );
};

const DraggableItem = ({ item }: { item: WardrobeItem }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`w-20 h-20 rounded-lg overflow-hidden cursor-grab border-2 border-gray-200 hover:border-primary transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={item.imageUrl || 'https://placehold.co/80x80/e6e6e6/a6a6a6?text=No+Image'}
        alt={item.name}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </motion.div>
  );
};

const DropZone = ({ 
  category, 
  item, 
  onRemove 
}: { 
  category: string; 
  item?: WardrobeItem; 
  onRemove: () => void;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: category,
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-32 border-2 border-dashed rounded-lg p-2 transition-colors ${
        isOver ? 'border-primary bg-primary/5' : 'border-gray-300'
      }`}
    >
      <div className="text-xs font-medium text-center mb-1">{category}</div>
      {item ? (
        <div className="relative">
          <img
            src={item.imageUrl || 'https://placehold.co/100x100/e6e6e6/a6a6a6?text=No+Image'}
            alt={item.name}
            className="w-full h-20 object-cover rounded"
          />
          <button
            onClick={onRemove}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="h-20 bg-gray-50 rounded flex items-center justify-center text-xs text-muted-foreground">
          Drop here
        </div>
      )}
    </div>
  );
};

export default MixAndMatch;
