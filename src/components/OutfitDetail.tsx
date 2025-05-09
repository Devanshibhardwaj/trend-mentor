
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OutfitItem } from '@/lib/outfit-collections';
import { ExternalLink, ShoppingBag, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { toast } from 'sonner';

interface OutfitDetailProps {
  outfit: OutfitItem;
  index?: number;
}

const OutfitDetail = ({ outfit, index = 0 }: OutfitDetailProps) => {
  const [showShopLinks, setShowShopLinks] = useState(false);

  const handleSaveOutfit = () => {
    toast.success("Outfit saved to your favorites!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden"
    >
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
        {outfit.imageUrl && (
          <div className="relative h-64 overflow-hidden">
            <img 
              src={outfit.imageUrl} 
              alt={outfit.name} 
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
            />
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <Badge 
                variant="secondary" 
                className="capitalize bg-white/80 dark:bg-black/50 backdrop-blur-sm"
              >
                {outfit.gender}
              </Badge>
              <Badge 
                variant="secondary" 
                className="capitalize bg-white/80 dark:bg-black/50 backdrop-blur-sm"
              >
                {outfit.season}
              </Badge>
            </div>
          </div>
        )}
        
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium">{outfit.name}</h3>
            <Badge variant="outline" className="capitalize bg-primary/10">
              {outfit.vibe}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 capitalize">
            Perfect for: {outfit.occasion}
          </p>
          
          <div className="space-y-3">
            {outfit.top && (
              <div className="flex items-center justify-between">
                <span className="text-sm">Top:</span>
                <Badge variant="outline" className="font-normal capitalize">{outfit.top}</Badge>
              </div>
            )}
            
            {outfit.bottom && (
              <div className="flex items-center justify-between">
                <span className="text-sm">Bottom:</span>
                <Badge variant="outline" className="font-normal capitalize">{outfit.bottom}</Badge>
              </div>
            )}
            
            {outfit.footwear && (
              <div className="flex items-center justify-between">
                <span className="text-sm">Footwear:</span>
                <Badge variant="outline" className="font-normal capitalize">{outfit.footwear}</Badge>
              </div>
            )}
            
            {outfit.accessories && outfit.accessories.length > 0 && (
              <div className="flex items-start justify-between">
                <span className="text-sm">Accessories:</span>
                <div className="flex flex-wrap justify-end gap-1 max-w-[70%]">
                  {outfit.accessories.map((accessory, i) => (
                    <Badge key={i} variant="outline" className="font-normal capitalize">
                      {accessory}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-5 space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => setShowShopLinks(!showShopLinks)}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              {showShopLinks ? "Hide Shop Links" : "Show Shop Links"}
              {showShopLinks ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
            
            {showShopLinks && outfit.shopLinks && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 pt-2"
              >
                {outfit.shopLinks.top && (
                  <ShopLinkItem label="Top" url={outfit.shopLinks.top} />
                )}
                
                {outfit.shopLinks.bottom && (
                  <ShopLinkItem label="Bottom" url={outfit.shopLinks.bottom} />
                )}
                
                {outfit.shopLinks.footwear && (
                  <ShopLinkItem label="Footwear" url={outfit.shopLinks.footwear} />
                )}
                
                {outfit.shopLinks.outerwear && (
                  <ShopLinkItem label="Outerwear" url={outfit.shopLinks.outerwear} />
                )}
                
                {outfit.shopLinks.accessories && outfit.shopLinks.accessories.length > 0 && (
                  <>
                    <p className="text-xs text-muted-foreground mt-1">Accessories:</p>
                    {outfit.shopLinks.accessories.map((url, i) => (
                      <ShopLinkItem 
                        key={i}
                        label={outfit.accessories?.[i] || `Item ${i+1}`}
                        url={url}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            )}
            
            <Button 
              variant="default" 
              size="sm" 
              className="w-full"
              onClick={handleSaveOutfit}
            >
              Save This Look
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ShopLinkItem = ({ label, url }: { label: string; url: string }) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center justify-between p-2 text-sm bg-background rounded-md border hover:bg-accent/10 transition-colors"
  >
    <div className="flex items-center">
      <Tag className="h-3.5 w-3.5 mr-2 text-primary" />
      <span className="capitalize">{label}</span>
    </div>
    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
  </a>
);

export default OutfitDetail;
