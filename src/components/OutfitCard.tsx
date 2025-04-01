
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, Eye, Sparkles, ThumbsUp, Bookmark, ShoppingBag, Star, DollarSign, ExternalLink, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShoppingOption {
  name: string;
  url: string;
  price: number;
  rating: number;
}

interface OutfitCardProps {
  index: number;
  style: string;
  occasion: string;
  description: string;
  image?: string;
  className?: string;
  shoppingOptions?: ShoppingOption[];
}

const getIndianShoppingOptions = (priceRange: string): ShoppingOption[] => {
  const options: Record<string, ShoppingOption[]> = {
    budget: [
      { name: "Myntra", url: "https://www.myntra.com", price: 999, rating: 4.1 },
      { name: "Ajio", url: "https://www.ajio.com", price: 799, rating: 4.0 },
      { name: "Flipkart", url: "https://www.flipkart.com", price: 699, rating: 3.9 }
    ],
    midRange: [
      { name: "Westside", url: "https://www.westside.com", price: 1999, rating: 4.3 },
      { name: "Lifestyle", url: "https://www.lifestylestores.com", price: 2499, rating: 4.2 },
      { name: "Shoppers Stop", url: "https://www.shoppersstop.com", price: 2799, rating: 4.4 }
    ],
    premium: [
      { name: "Tata CLiQ Luxury", url: "https://luxury.tatacliq.com", price: 4999, rating: 4.7 },
      { name: "Nykaa Fashion", url: "https://www.nykaafashion.com", price: 3999, rating: 4.5 },
      { name: "Reliance AJIO Luxe", url: "https://luxe.ajio.com", price: 5499, rating: 4.6 }
    ],
    luxury: [
      { name: "Darveys", url: "https://www.darveys.com", price: 9999, rating: 4.8 },
      { name: "Elitify", url: "https://www.elitify.com", price: 12999, rating: 4.7 },
      { name: "The Collective", url: "https://www.thecollective.in", price: 15999, rating: 4.9 }
    ]
  };
  
  return options[priceRange] || options.midRange;
};

const OutfitCard = ({ 
  index, 
  style, 
  occasion, 
  description, 
  image, 
  className
}: OutfitCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [priceRange, setPriceRange] = useState("midRange");
  const [shoppingOptions, setShoppingOptions] = useState(getIndianShoppingOptions("midRange"));
  const isMobile = useIsMobile();
  
  // Animation and visibility
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  // Update shopping options when price range changes
  useEffect(() => {
    setShoppingOptions(getIndianShoppingOptions(priceRange));
  }, [priceRange]);

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

  const handleRating = (value: number) => {
    setRating(value);
    setFeedbackSubmitted(true);
    toast.success("Thank you for your feedback!", {
      icon: <Star className="h-4 w-4 text-yellow-500" />,
      description: `You rated this outfit ${value} stars`
    });
  };

  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);
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
          <Badge className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white text-xs font-medium shadow-md">
            {style}
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-xs font-medium shadow-md">
            {occasion}
          </Badge>
        </div>
        
        {/* Featured badge if it's one of the first 2 items */}
        {index < 2 && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-medium shadow-sm flex items-center gap-1 px-3 animate-pulse">
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
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="sm"
              className="rounded-full px-5 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg"
              onClick={handleExpand}
            >
              <Eye className="h-4 w-4 mr-2" />
              <span>Quick View</span>
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="rounded-full px-5 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  <span>Shop</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Shop This Look</DialogTitle>
                  <DialogDescription>
                    Find this {style} outfit for {occasion} at these retailers
                  </DialogDescription>
                </DialogHeader>

                <div className="my-4">
                  <Select value={priceRange} onValueChange={handlePriceRangeChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget (Under ₹1,000)</SelectItem>
                      <SelectItem value="midRange">Mid-Range (₹1,000 - ₹3,000)</SelectItem>
                      <SelectItem value="premium">Premium (₹3,000 - ₹8,000)</SelectItem>
                      <SelectItem value="luxury">Luxury (Above ₹8,000)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 my-4">
                  {shoppingOptions.map((option, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors">
                      <div className="flex flex-col">
                        <span className="font-medium">{option.name}</span>
                        <div className="flex items-center gap-1 mt-1">
                          <IndianRupee className="h-3 w-3 text-green-500" />
                          <span className="text-sm text-muted-foreground">{option.price.toLocaleString('en-IN')}</span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star} 
                                className={`h-3 w-3 ${star <= option.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <a 
                        href={option.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center text-sm font-medium h-9 rounded-md px-3 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Visit <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
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
        
        {/* Rating component */}
        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2">
            {feedbackSubmitted ? "Thank you for your feedback!" : "Rate this outfit:"}
          </p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <TooltipProvider key={star}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className={`focus:outline-none ${feedbackSubmitted && star > rating ? "opacity-50" : ""}`}
                      onClick={() => !feedbackSubmitted && handleRating(star)}
                      disabled={feedbackSubmitted}
                    >
                      <Star
                        className={`h-5 w-5 transition-all ${
                          star <= rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                        } ${!feedbackSubmitted && "hover:text-yellow-500 hover:scale-110"}`}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{star} star{star !== 1 ? "s" : ""}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
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
        
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full flex items-center gap-1 px-3 shadow-sm hover:shadow border-primary/20 hover:border-primary/50"
            >
              <ShoppingBag className="h-4 w-4 text-primary" />
              <span>Shop Now</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Shop This Look</DialogTitle>
              <DialogDescription>
                Find this {style} outfit for {occasion} at these retailers
              </DialogDescription>
            </DialogHeader>

            <div className="my-4">
              <Select value={priceRange} onValueChange={handlePriceRangeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget (Under ₹1,000)</SelectItem>
                  <SelectItem value="midRange">Mid-Range (₹1,000 - ₹3,000)</SelectItem>
                  <SelectItem value="premium">Premium (₹3,000 - ₹8,000)</SelectItem>
                  <SelectItem value="luxury">Luxury (Above ₹8,000)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 my-4">
              {shoppingOptions.map((option, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors">
                  <div className="flex flex-col">
                    <span className="font-medium">{option.name}</span>
                    <div className="flex items-center gap-1 mt-1">
                      <IndianRupee className="h-3 w-3 text-green-500" />
                      <span className="text-sm text-muted-foreground">{option.price.toLocaleString('en-IN')}</span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className={`h-3 w-3 ${star <= option.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <a 
                    href={option.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-sm font-medium h-9 rounded-md px-3 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Visit <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
        
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
