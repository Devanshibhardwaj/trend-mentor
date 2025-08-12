import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  Star, 
  ExternalLink,
  TrendingUp,
  Zap,
  Crown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  available: boolean;
  similarOptions?: number;
}

interface ShopThisLookProps {
  outfitId: string;
  products: Product[];
  totalPrice?: number;
  discountedPrice?: number;
  className?: string;
}

const ShopThisLook = ({ 
  outfitId, 
  products, 
  totalPrice, 
  discountedPrice,
  className = '' 
}: ShopThisLookProps) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
      toast({
        title: "Removed from wishlist",
        description: "Item removed from your favorites",
      });
    } else {
      newFavorites.add(productId);
      toast({
        title: "Added to wishlist ❤️",
        description: "Item saved to your favorites",
      });
    }
    setFavorites(newFavorites);
  };

  const addToCart = (product: Product) => {
    if (!product.available) return;
    
    const newCart = new Set(addedToCart);
    newCart.add(product.id);
    setAddedToCart(newCart);
    
    toast({
      title: "Added to cart! 🛍️",
      description: `${product.name} added to your shopping cart`,
    });
  };

  const shopCompleteOutfit = () => {
    const availableProducts = products.filter(p => p.available);
    availableProducts.forEach(product => {
      addToCart(product);
    });
    
    toast({
      title: "Complete outfit added! 🎉",
      description: `${availableProducts.length} items added to your cart`,
    });
  };

  const shareOutfit = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this amazing outfit!',
        text: 'I found this perfect look on StyleSage',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Outfit link copied to clipboard",
      });
    }
  };

  const calculateSavings = () => {
    if (!totalPrice || !discountedPrice) return 0;
    return totalPrice - discountedPrice;
  };

  const savings = calculateSavings();
  const savingsPercentage = totalPrice ? Math.round((savings / totalPrice) * 100) : 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Total Price */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shop This Look
            </CardTitle>
            <Button variant="outline" size="sm" onClick={shareOutfit}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold">
                ₹{(discountedPrice || totalPrice || 0).toLocaleString()}
              </div>
              {savings > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{totalPrice?.toLocaleString()}
                  </span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Save ₹{savings.toLocaleString()} ({savingsPercentage}%)
                  </Badge>
                </div>
              )}
            </div>
            <Button onClick={shopCompleteOutfit} size="lg" className="gap-2">
              <Crown className="h-4 w-4" />
              Shop Complete Look
            </Button>
          </div>
          
          {savings > 0 && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>Limited time offer - Save big on this complete outfit!</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Individual Products */}
      <div className="grid gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${!product.available ? 'opacity-60' : ''}`}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    {!product.available && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {product.category}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(product.id)}
                        className="p-1"
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            favorites.has(product.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-muted-foreground'
                          }`}
                        />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${
                              i < product.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {product.similarOptions && (
                          <Button variant="outline" size="sm" className="text-xs">
                            {product.similarOptions}+ similar
                          </Button>
                        )}
                        
                        <AnimatePresence mode="wait">
                          {addedToCart.has(product.id) ? (
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0.8 }}
                            >
                              <Button size="sm" variant="outline" disabled>
                                ✓ Added
                              </Button>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0.8 }}
                            >
                              <Button
                                size="sm"
                                onClick={() => addToCart(product)}
                                disabled={!product.available}
                              >
                                Add to Cart
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Alternative Shopping Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5" />
            More Shopping Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <ExternalLink className="h-4 w-4 mr-2" />
            Find Similar Items on Myntra
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <ExternalLink className="h-4 w-4 mr-2" />
            Browse Alternatives on AJIO
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <ExternalLink className="h-4 w-4 mr-2" />
            Compare Prices Across Platforms
          </Button>
        </CardContent>
      </Card>

      {/* Style Tips */}
      <Card className="bg-accent/50">
        <CardContent className="p-4">
          <h4 className="font-medium text-sm mb-2">💡 Styling Tips</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Mix textures for visual interest</li>
            <li>• Add a statement accessory to elevate the look</li>
            <li>• Layer pieces for transitional weather</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopThisLook;