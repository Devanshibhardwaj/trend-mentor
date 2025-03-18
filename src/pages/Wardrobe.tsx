
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ClothingUploader from '@/components/ClothingUploader';
import WardrobeItem from '@/components/WardrobeItem';
import OutfitRecommendation from '@/components/OutfitRecommendation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface WardrobeItemType {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

const Wardrobe = () => {
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItemType[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to access your wardrobe');
      navigate('/auth');
      return;
    }
    
    fetchWardrobeItems();
  }, [user, navigate]);

  const fetchWardrobeItems = async () => {
    try {
      setLoading(true);
      
      if (!user) {
        setWardrobeItems([]);
        setLoading(false);
        return;
      }
      
      // Fetch wardrobe items from Supabase
      const { data, error } = await supabase
        .from('wardrobe_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching wardrobe items:', error);
        toast.error('Failed to load your wardrobe items');
        setWardrobeItems([]);
      } else {
        // Map the data to the expected format
        const formattedItems: WardrobeItemType[] = data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          imageUrl: item.image_url || '',
        }));
        
        setWardrobeItems(formattedItems);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = (newItem: WardrobeItemType) => {
    setWardrobeItems([newItem, ...wardrobeItems]);
  };

  const handleDeleteItem = (itemId: string) => {
    setWardrobeItems(wardrobeItems.filter(item => item.id !== itemId));
  };

  const filteredItems = activeCategory === 'All' 
    ? wardrobeItems 
    : wardrobeItems.filter(item => item.category === activeCategory);

  const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories'];

  if (!user) {
    return null; // This will prevent flash of content before redirect
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
              
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    No items found in this category. Upload some clothes to get started!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredItems.map(item => (
                    <WardrobeItem 
                      key={item.id} 
                      item={item} 
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
          
          <div className="lg:col-span-1">
            <OutfitRecommendation 
              wardrobeItems={wardrobeItems}
              isLoading={loading}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wardrobe;
