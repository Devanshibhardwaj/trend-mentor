
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, View, Cube, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { motion } from 'framer-motion';
import ThreeDModelViewer from './ThreeDModelViewer';

interface WardrobeItemProps {
  item: {
    id: string;
    name: string;
    category: string;
    imageUrl: string;
  };
  onDelete?: (id: string) => void;
}

const WardrobeItem = ({ item, onDelete }: WardrobeItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [view3D, setView3D] = useState(false);

  const handleEdit = () => {
    toast.info(`Edit functionality for item: ${item.name}`);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      // Delete from Supabase
      const { error } = await supabase
        .from('wardrobe_items')
        .delete()
        .eq('id', item.id);
        
      if (error) {
        toast.error('Error deleting item: ' + error.message);
        return;
      }
      
      // Call the onDelete callback if provided
      if (onDelete) {
        onDelete(item.id);
      }
      
      toast.success(`${item.name} has been removed from your wardrobe`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  const toggle3DView = () => {
    setView3D(!view3D);
    if (!view3D) {
      toast.success("3D view activated", {
        description: "Drag to rotate, scroll to zoom",
        duration: 3000,
      });
    }
  };

  // Placeholder image if no image URL is provided
  const imageUrl = item.imageUrl || 'https://placehold.co/300x300/e6e6e6/a6a6a6?text=No+Image';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        className="overflow-hidden transition-all duration-300 h-full hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-square w-full bg-muted overflow-hidden relative">
          {view3D ? (
            <ThreeDModelViewer 
              modelUrl={imageUrl} 
              title={item.name}
              showControls={false}
              className="h-full"
            />
          ) : (
            <img 
              src={imageUrl} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          )}
          
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
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className={`h-9 w-9 rounded-full bg-white hover:bg-white/90 ${view3D ? 'text-primary' : 'text-slate-700'}`}
                onClick={toggle3DView}
              >
                <Cube className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <div className="absolute top-2 right-2">
            <Badge 
              variant="secondary" 
              className="bg-white/80 text-primary text-xs font-medium backdrop-blur-sm"
            >
              {item.category}
            </Badge>
          </div>
          
          {view3D && (
            <motion.div 
              className="absolute bottom-2 right-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge 
                variant="outline" 
                className="bg-primary/20 text-primary text-xs font-medium backdrop-blur-sm"
              >
                <Cube className="h-3 w-3 mr-1" /> 3D View
              </Badge>
            </motion.div>
          )}
        </div>
        
        <CardContent className="p-4">
          <motion.h3 
            className="font-medium line-clamp-1 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {item.name}
            {view3D && <Sparkles className="h-3 w-3 ml-2 text-primary" />}
          </motion.h3>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WardrobeItem;
