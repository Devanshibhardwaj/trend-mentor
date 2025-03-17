
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, Eye, Sparkles, ThumbsUp } from 'lucide-react';
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
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  
  // Animation and visibility
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      toast.success("Added to favorites", {
        icon: <Heart className="h-4 w-4 text-red-500" />,
        description: "This outfit has been saved to your favorites"
      });
    } else {
      toast.success("Removed from favorites", {
        icon: <Heart className="h-4 w-4" />,
        description: "This outfit has been removed from your favorites"
      });
    }
  };

  const handleShare = () => {
    toast.success("Outfit shared!", {
      icon: <Share2 className="h-4 w-4" />,
      description: "Link copied to clipboard"
    });
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-500 h-full",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        isHovered ? "shadow-lg scale-[1.02]" : "shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden group">
        {image ? (
          <img 
            src={image} 
            alt={`${style} outfit for ${occasion}`}
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              isHovered ? "scale-110" : "scale-100"
            )}
          />
        ) : (
          <div className="w-full h-full bg-accent/30 flex items-center justify-center">
            <div className="text-accent-foreground/30 text-sm">Outfit {index + 1}</div>
          </div>
        )}
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className="bg-primary text-primary-foreground text-xs font-medium shadow-sm">
            {style}
          </Badge>
          <Badge className="bg-secondary text-secondary-foreground text-xs font-medium shadow-sm">
            {occasion}
          </Badge>
        </div>
        
        {/* Featured badge if it's one of the first 2 items */}
        {index < 2 && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-yellow-500/90 text-black text-xs font-medium shadow-sm flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Featured
            </Badge>
          </div>
        )}
        
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
        <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
          {style} <span className="text-muted-foreground">•</span> {occasion}
          {index < 2 && <ThumbsUp className="h-4 w-4 text-yellow-500" />}
        </h3>
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
          className={cn(
            "rounded-full h-10 w-10 btn-mobile transition-colors",
            liked && "bg-red-500/10"
          )}
          onClick={handleLike}
        >
          <Heart className={cn(
            "h-5 w-5 transition-all", 
            liked ? "fill-red-500 text-red-500 scale-110" : "text-muted-foreground"
          )} />
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
