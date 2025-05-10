
import { useState } from 'react';
import { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  category?: string;
}

const ProductCard = ({ product, category }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const goToPrevious = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const goToNext = () => {
    setCurrentImageIndex(prev => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleProductClick = () => {
    window.open(product.productUrl, '_blank');
  };
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square">
        {product.images.length > 1 && (
          <>
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 rounded-full w-8 h-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 rounded-full w-8 h-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        
        <img 
          src={product.images[currentImageIndex]} 
          alt={product.title}
          className="object-cover w-full h-full cursor-pointer"
          onClick={handleProductClick}
        />
        
        {category && (
          <Badge className="absolute top-2 right-2 bg-white/80 text-primary">
            {category}
          </Badge>
        )}
        
        <Badge className="absolute bottom-2 left-2 bg-primary text-white">
          ${product.price.toFixed(2)}
        </Badge>
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
          <h3 className="font-medium leading-tight">{product.title}</h3>
          <p className="text-sm line-clamp-2 mt-2 text-muted-foreground">{product.description}</p>
        </div>
        
        <Button 
          variant="outline"
          size="sm" 
          className="w-full mt-4 flex items-center justify-center gap-2"
          onClick={handleProductClick}
        >
          <ExternalLink className="h-3 w-3" />
          Shop Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
