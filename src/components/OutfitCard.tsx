
import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface OutfitCardProps {
  index: number;
  style: string;
  occasion: string;
  description: string;
  className?: string;
}

const OutfitCard = ({ index, style, occasion, description, className }: OutfitCardProps) => {
  const [liked, setLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // This would normally have an intersection observer
  useState(() => {
    setTimeout(() => setIsVisible(true), index * 150);
  });

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      toast.success("Added to favorites");
    } else {
      toast.success("Removed from favorites");
    }
  };

  const handleShare = () => {
    toast.success("Outfit shared to clipboard");
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-500 transform h-full",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
      className
    )}>
      <div className="relative aspect-[3/4] w-full bg-muted overflow-hidden">
        <div className="w-full h-full bg-accent/30 flex items-center justify-center">
          <div className="text-accent-foreground/30 text-sm">Outfit {index + 1}</div>
        </div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-white/80 text-primary text-xs font-medium">
            {style}
          </Badge>
          <Badge variant="secondary" className="bg-white/80 text-primary text-xs font-medium">
            {occasion}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-9 w-9"
          onClick={handleLike}
        >
          <Heart className={cn("h-5 w-5 transition-colors", liked ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-9 w-9"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5 text-muted-foreground" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OutfitCard;
