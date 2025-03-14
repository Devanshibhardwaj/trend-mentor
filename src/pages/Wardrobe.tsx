
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ClothingUploader from '@/components/ClothingUploader';
import WardrobeItem from '@/components/WardrobeItem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

// Temporary mock data for development
const MOCK_WARDROBE_ITEMS = [
  { id: '1', name: 'Blue denim jacket', category: 'Outerwear', imageUrl: '' },
  { id: '2', name: 'White t-shirt', category: 'Tops', imageUrl: '' },
  { id: '3', name: 'Black jeans', category: 'Bottoms', imageUrl: '' },
  { id: '4', name: 'Leather boots', category: 'Footwear', imageUrl: '' },
];

const Wardrobe = () => {
  const [wardrobeItems, setWardrobeItems] = useState(MOCK_WARDROBE_ITEMS);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleAddItem = (newItem: { id: string; name: string; category: string; imageUrl: string }) => {
    setWardrobeItems([...wardrobeItems, newItem]);
    toast.success('Item added to your wardrobe!');
  };

  const filteredItems = activeCategory === 'All' 
    ? wardrobeItems 
    : wardrobeItems.filter(item => item.category === activeCategory);

  const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories'];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-2">My Wardrobe</h1>
          <p className="text-muted-foreground mb-6">
            Upload and manage your clothing items to get personalized outfit recommendations.
          </p>
          
          <ClothingUploader onAddItem={handleAddItem} />
        </section>
        
        <Separator className="my-8" />
        
        <section>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No items found in this category. Upload some clothes to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <WardrobeItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wardrobe;
