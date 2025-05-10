
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OutfitItem } from "@/lib/outfit-collections";
import { motion } from "framer-motion";
import { Layers, Store, Info } from "lucide-react";
import ProductCard from './ProductCard';

interface OutfitDetailProps {
  outfit: OutfitItem;
  index: number;
}

const OutfitDetail = ({ outfit, index }: OutfitDetailProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const outfitItems = [
    { name: "Top", value: outfit.top },
    { name: "Bottom", value: outfit.bottom },
    { name: "Footwear", value: outfit.footwear },
    { name: "Outerwear", value: outfit.outerwear },
  ].filter((item) => item.value);

  const hasProducts = outfit.products && (
    outfit.products.top || 
    outfit.products.bottom || 
    outfit.products.footwear || 
    outfit.products.outerwear || 
    (outfit.products.accessories && outfit.products.accessories.length > 0)
  );

  const staggeredAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.3,
      delay: index * 0.1
    }
  };

  return (
    <>
      <motion.div 
        {...staggeredAnimation} 
        className="relative overflow-hidden group"
      >
        <Card className="overflow-hidden h-full flex flex-col">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={outfit.imageUrl || `https://source.unsplash.com/random/300x200/?${outfit.vibe},${outfit.occasion}`}
              alt={outfit.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3">
              <Badge variant="outline" className="bg-white/20 text-white backdrop-blur-sm mr-2">
                {outfit.vibe}
              </Badge>
              <Badge variant="outline" className="bg-white/20 text-white backdrop-blur-sm">
                {outfit.occasion}
              </Badge>
            </div>
          </div>
          
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-lg font-medium">{outfit.name}</CardTitle>
          </CardHeader>
          
          <CardContent className="flex-grow px-4 pb-4">
            <div className="flex flex-wrap gap-2">
              {outfitItems.map((item) => (
                <Badge key={`${outfit.id}-${item.name}`} variant="secondary" className="font-normal">
                  {item.name}: {item.value}
                </Badge>
              ))}
              
              {outfit.accessories && outfit.accessories.length > 0 && (
                <Badge variant="secondary" className="font-normal">
                  Accessories: {outfit.accessories.length}
                </Badge>
              )}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsOpen(true)}
                className="gap-1.5"
              >
                <Info className="h-3.5 w-3.5" /> Details
              </Button>
              
              {hasProducts && (
                <Badge 
                  variant="default" 
                  className="gap-1 cursor-pointer hover:bg-primary/90"
                  onClick={() => setIsOpen(true)}
                >
                  <Store className="h-3 w-3" />
                  Shop Look
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{outfit.name}</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="items">
            <TabsList className="w-full">
              <TabsTrigger value="items" className="flex-1">
                <Layers className="h-4 w-4 mr-1.5" /> Outfit Items
              </TabsTrigger>
              {hasProducts && (
                <TabsTrigger value="shop" className="flex-1">
                  <Store className="h-4 w-4 mr-1.5" /> Shop This Look
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="items" className="mt-4">
              <div className="grid gap-4">
                {outfitItems.map((item) => (
                  item.value && (
                    <div key={item.name} className="flex items-center gap-2">
                      <Badge variant="outline" className="font-normal">{item.name}</Badge>
                      <span>{item.value}</span>
                    </div>
                  )
                ))}
                
                {outfit.accessories && outfit.accessories.length > 0 && (
                  <div>
                    <Badge variant="outline" className="font-normal mb-2">Accessories</Badge>
                    <ul className="list-disc list-inside ml-1 space-y-1">
                      {outfit.accessories.map((accessory, i) => (
                        <li key={`accessory-${i}`} className="text-sm">{accessory}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    {`This ${outfit.vibe} outfit is perfect for ${outfit.occasion} occasions during ${outfit.season} season.`}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {hasProducts && (
              <TabsContent value="shop" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {outfit.products?.top && (
                    <ProductCard product={outfit.products.top} category="Top" />
                  )}
                  {outfit.products?.bottom && (
                    <ProductCard product={outfit.products.bottom} category="Bottom" />
                  )}
                  {outfit.products?.footwear && (
                    <ProductCard product={outfit.products.footwear} category="Footwear" />
                  )}
                  {outfit.products?.outerwear && (
                    <ProductCard product={outfit.products.outerwear} category="Outerwear" />
                  )}
                </div>
                
                {outfit.products?.accessories && outfit.products.accessories.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Accessories</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {outfit.products.accessories.map((product) => (
                        <ProductCard key={product.id} product={product} category="Accessory" />
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OutfitDetail;
