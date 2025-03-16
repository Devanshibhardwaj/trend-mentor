
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface OutfitCardProps {
  index: number;
  style: string;
  occasion: string;
  description: string;
  image?: string;
  className?: string;
}

const OutfitCard = ({ index, style, occasion, description, image, className }: OutfitCardProps) => {
  const [liked, setLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  // Animation and visibility
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

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

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 h-full card-hover",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      className
    )}>
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={`${style} outfit for ${occasion}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-accent/30 flex items-center justify-center">
            <div className="text-accent-foreground/30 text-sm">Outfit {index + 1}</div>
          </div>
        )}
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-white/90 text-primary text-xs font-medium shadow-sm">
            {style}
          </Badge>
          <Badge variant="secondary" className="bg-white/90 text-primary text-xs font-medium shadow-sm">
            {occasion}
          </Badge>
        </div>
        
        {/* Quick view overlay on hover/tap */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-200",
            isMobile ? "active:opacity-100" : "group-hover:opacity-100"
          )}
        >
          <Button 
            variant="secondary" 
            size="sm"
            className="rounded-full px-4"
            onClick={handleExpand}
          >
            <Eye className="h-4 w-4 mr-2" />
            <span>Quick View</span>
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <p className={cn(
          "text-sm text-muted-foreground transition-all duration-300",
          isExpanded ? "line-clamp-none" : "line-clamp-3"
        )}>
          {description}
        </p>
        {description.length > 120 && (
          <button 
            onClick={handleExpand} 
            className="text-xs text-primary font-medium mt-2 hover:underline focus:outline-none focus-visible"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-10 w-10 btn-mobile"
          onClick={handleLike}
        >
          <Heart className={cn("h-5 w-5 transition-colors", liked ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
          <span className="sr-only">{liked ? "Unlike" : "Like"}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-10 w-10 btn-mobile"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OutfitCard;
