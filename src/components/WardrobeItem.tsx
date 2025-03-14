
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface WardrobeItemProps {
  item: {
    id: string;
    name: string;
    category: string;
    imageUrl: string;
  };
}

const WardrobeItem = ({ item }: WardrobeItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = () => {
    toast.info(`Edit functionality for item: ${item.name}`);
  };

  const handleDelete = () => {
    toast.success(`${item.name} has been removed from your wardrobe`);
  };

  // Placeholder image if no image URL is provided
  const imageUrl = item.imageUrl || 'https://placehold.co/300x300/e6e6e6/a6a6a6?text=No+Image';

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square w-full bg-muted overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-2 transition-opacity duration-200 opacity-100">
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9 rounded-full bg-white text-primary hover:bg-white/90"
              onClick={handleEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9 rounded-full bg-white text-destructive hover:bg-white/90"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/80 text-primary text-xs font-medium">
            {item.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{item.name}</h3>
      </CardContent>
    </Card>
  );
};

export default WardrobeItem;
