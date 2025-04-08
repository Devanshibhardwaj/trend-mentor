
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Info } from 'lucide-react';
import { toast } from 'sonner';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

interface Outfit {
  id: number;
  name: string;
  image: string;
  description?: string;
  is3D: boolean;
}

interface OutfitSelectorProps {
  outfits: Outfit[];
  selectedOutfit: number | null;
  onSelectOutfit: (id: number, image: string) => void;
}

const OutfitSelector = ({
  outfits,
  selectedOutfit,
  onSelectOutfit
}: OutfitSelectorProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Select an Outfit</h3>
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {outfits.map((outfit) => (
          <motion.div key={outfit.id} variants={itemVariants}>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedOutfit === outfit.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => onSelectOutfit(outfit.id, outfit.image)}
                >
                  <CardContent className="p-3 flex items-center space-x-3">
                    <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0 relative">
                      <img 
                        src={outfit.image} 
                        alt={outfit.name} 
                        className="w-full h-full object-cover"
                      />
                      {outfit.is3D && (
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs px-1 rounded-bl">
                          3D
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center">
                        {outfit.name}
                        {outfit.description && (
                          <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                        )}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {outfit.is3D ? "Interactive 3D model" : "Click to try on"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              {outfit.description && (
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{outfit.name}</h4>
                    <p className="text-sm text-muted-foreground">{outfit.description}</p>
                    {outfit.is3D && (
                      <p className="text-xs text-primary">Hover and drag to rotate the 3D model</p>
                    )}
                  </div>
                </HoverCardContent>
              )}
            </HoverCard>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-6"
        variants={itemVariants}
      >
        <Button 
          variant="outline" 
          className="w-full group relative overflow-hidden"
          onClick={() => toast.success("Upload your own outfit feature coming soon!")}
        >
          <span className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors rounded-md"></span>
          <Upload className="h-4 w-4 mr-2" />
          Upload Your Own
        </Button>
      </motion.div>
    </div>
  );
};

export default OutfitSelector;
