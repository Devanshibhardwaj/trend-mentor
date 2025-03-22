
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, Eye, Sparkles, ThumbsUp, Bookmark } from 'lucide-react';
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
  const [saved, setSaved] = useState(false);
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

  const handleSave = () => {
    setSaved(!saved);
    if (!saved) {
      toast.success("Outfit saved", {
        icon: <Bookmark className="h-4 w-4 text-blue-500" />,
        description: "This outfit has been saved to your collection"
      });
    } else {
      toast.success("Outfit removed", {
        icon: <Bookmark className="h-4 w-4" />,
        description: "This outfit has been removed from your collection"
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
        "overflow-hidden transition-all duration-500 h-full hover-3d",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        isHovered ? "shadow-xl" : "shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden group">
        {image ? (
          <div className="image-hover w-full h-full">
            <img 
              src={image} 
              alt={`${style} outfit for ${occasion}`}
              className={cn(
                "w-full h-full object-cover transition-all duration-700",
                isHovered ? "scale-105" : "scale-100"
              )}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Outfit {index + 1}</div>
          </div>
        )}
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className="bg-indigo-500/90 hover:bg-indigo-600/90 text-white text-xs font-medium shadow-md">
            {style}
          </Badge>
          <Badge className="bg-blue-500/90 hover:bg-blue-600/90 text-white text-xs font-medium shadow-md">
            {occasion}
          </Badge>
        </div>
        
        {/* Featured badge if it's one of the first 2 items */}
        {index < 2 && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-medium shadow-sm flex items-center gap-1 px-3">
              <Sparkles className="h-3 w-3" />
              Featured
            </Badge>
          </div>
        )}
        
        {/* Quick view overlay on hover/tap */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-6 opacity-0 transition-opacity duration-300",
            isMobile ? "active:opacity-100" : "group-hover:opacity-100"
          )}
        >
          <Button 
            variant="secondary" 
            size="sm"
            className="rounded-full px-5 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg"
            onClick={handleExpand}
          >
            <Eye className="h-4 w-4 mr-2" />
            <span>Quick View</span>
          </Button>
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          {style} <span className="text-muted-foreground/40">•</span> {occasion}
          {index < 2 && <ThumbsUp className="h-4 w-4 text-yellow-500 ml-1" />}
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
            className="text-xs text-indigo-500 dark:text-indigo-400 font-medium mt-2 hover:underline focus:outline-none focus-visible"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full h-9 w-9 transition-colors",
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
            className={cn(
              "rounded-full h-9 w-9 transition-colors",
              saved && "bg-blue-500/10"
            )}
            onClick={handleSave}
          >
            <Bookmark className={cn(
              "h-5 w-5 transition-all", 
              saved ? "fill-blue-500 text-blue-500 scale-110" : "text-muted-foreground"
            )} />
            <span className="sr-only">{saved ? "Unsave" : "Save"}</span>
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-9 w-9"
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
