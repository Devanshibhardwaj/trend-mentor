
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ShoppingBag, Star, Heart, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShoppingItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  category: string;
  url: string;
  store: 'myntra' | 'ajio' | 'amazon' | 'flipkart' | 'nykaa';
  inStock: boolean;
  isFavorite?: boolean;
}

interface ShoppingIntegrationProps {
  category?: string;
  maxPrice?: number;
  style?: string;
  onAddToWishlist?: (item: ShoppingItem) => void;
}

const ShoppingIntegration = ({ 
  category, 
  maxPrice = 5000, 
  style,
  onAddToWishlist 
}: ShoppingIntegrationProps) => {
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');

  // Mock shopping data - in real app this would come from APIs
  const shoppingItems: ShoppingItem[] = [
    {
      id: '1',
      name: 'Cotton Kurta Set',
      brand: 'Fabindia',
      price: 2499,
      originalPrice: 3199,
      rating: 4.3,
      reviews: 1250,
      imageUrl: '/api/placeholder/300/400',
      category: 'Ethnic',
      url: 'https://myntra.com/item1',
      store: 'myntra',
      inStock: true
    },
    {
      id: '2',
      name: 'Casual Cotton Shirt',
      brand: 'Allen Solly',
      price: 1299,
      originalPrice: 1899,
      rating: 4.1,
      reviews: 890,
      imageUrl: '/api/placeholder/300/400',
      category: 'Casual',
      url: 'https://ajio.com/item2',
      store: 'ajio',
      inStock: true
    },
    {
      id: '3',
      name: 'Denim Jacket',
      brand: 'Levi\'s',
      price: 4299,
      originalPrice: 5999,
      rating: 4.5,
      reviews: 2100,
      imageUrl: '/api/placeholder/300/400',
      category: 'Outerwear',
      url: 'https://amazon.in/item3',
      store: 'amazon',
      inStock: true
    }
  ];

  const priceRanges = [
    { label: 'All', value: 'all', max: Infinity },
    { label: 'Under ₹1000', value: 'under1000', max: 1000 },
    { label: '₹1000-₹3000', value: '1000-3000', max: 3000 },
    { label: '₹3000-₹5000', value: '3000-5000', max: 5000 },
    { label: 'Above ₹5000', value: 'above5000', max: Infinity }
  ];

  const stores = {
    myntra: { name: 'Myntra', color: 'bg-pink-100 text-pink-800' },
    ajio: { name: 'AJIO', color: 'bg-yellow-100 text-yellow-800' },
    amazon: { name: 'Amazon', color: 'bg-orange-100 text-orange-800' },
    flipkart: { name: 'Flipkart', color: 'bg-blue-100 text-blue-800' },
    nykaa: { name: 'Nykaa', color: 'bg-purple-100 text-purple-800' }
  };

  const filteredItems = shoppingItems.filter(item => {
    if (priceFilter === 'under1000' && item.price >= 1000) return false;
    if (priceFilter === '1000-3000' && (item.price < 1000 || item.price >= 3000)) return false;
    if (priceFilter === '3000-5000' && (item.price < 3000 || item.price >= 5000)) return false;
    if (priceFilter === 'above5000' && item.price < 5000) return false;
    return item.price <= maxPrice;
  });

  const handleAddToWishlist = (item: ShoppingItem) => {
    onAddToWishlist?.(item);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          Shop These Pieces
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Find similar items from top Indian fashion brands
        </p>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {priceRanges.map(range => (
            <Button
              key={range.value}
              variant={priceFilter === range.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPriceFilter(range.value)}
              className="whitespace-nowrap"
            >
              {range.label}
            </Button>
          ))}
        </div>

        {/* Shopping Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow border-0 bg-gradient-to-br from-white to-gray-50">
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className={stores[item.store].color}>
                      {stores[item.store].name}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={() => handleAddToWishlist(item)}
                    >
                      <Heart className={`h-4 w-4 ${item.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                  {item.originalPrice && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="destructive" className="text-xs">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{item.rating}</span>
                        <span className="text-xs text-muted-foreground">({item.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">₹{item.price.toLocaleString()}</span>
                        {item.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <Badge variant={item.inStock ? 'secondary' : 'destructive'} className="text-xs">
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </div>
                    
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(item.url, '_blank')}
                      disabled={!item.inStock}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No items found in your price range.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setPriceFilter('all')}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShoppingIntegration;
