
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OutfitCard from '@/components/OutfitCard';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Heart, Settings, ShoppingBag, User, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SavedOutfit {
  id: string;
  style: string;
  occasion: string;
  description: string;
  created_at: string;
}

const Profile = () => {
  const { user, deleteAccount } = useAuth();
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // This would fetch actual saved outfits from Supabase in a real implementation
  useEffect(() => {
    // Redirect if not signed in
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // Simulate loading saved outfits
    setLoading(true);
    setTimeout(() => {
      const dummySavedOutfits = [
        {
          id: '1',
          style: 'Casual',
          occasion: 'Weekend',
          description: 'Light blue denim jacket over a white t-shirt, paired with black slim-fit jeans and white sneakers.',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          style: 'Formal',
          occasion: 'Business Meeting',
          description: 'Navy blue tailored suit with a light blue button-up shirt. Brown leather Oxford shoes and a matching belt.',
          created_at: new Date().toISOString()
        },
      ];
      setSavedOutfits(dummySavedOutfits);
      setLoading(false);
    }, 1000);
  }, [user, navigate]);

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      const { error } = await deleteAccount();
      if (error) {
        throw error;
      }
      toast.success('Your account has been deleted successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(`Failed to delete account: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="py-12 text-center">
              <div className="mb-4 flex justify-center">
                <User className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Sign In Required</h2>
              <p className="text-muted-foreground mb-6">
                Please sign in to view your profile and saved outfits.
              </p>
              <Button asChild>
                <a href="/auth">Sign In</a>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-2xl bg-primary/10">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-medium">{user.email?.split('@')[0]}</h2>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
                
                <div className="mt-8 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    Saved Outfits
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/wardrobe')}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    My Wardrobe
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Preferences
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full justify-start mt-8">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isDeleting ? 'Deleting...' : 'Delete Account'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="saved" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="saved">Saved Outfits</TabsTrigger>
                <TabsTrigger value="wardrobe">My Wardrobe</TabsTrigger>
                <TabsTrigger value="preferences">Style Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="saved">
                <h3 className="text-xl font-medium mb-6">Your Saved Outfits</h3>
                
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((n) => (
                      <Card key={n} className="animate-pulse">
                        <div className="aspect-[3/4] bg-muted"></div>
                        <CardContent className="p-4">
                          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : savedOutfits.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedOutfits.map((outfit, index) => (
                      <OutfitCard
                        key={outfit.id}
                        index={index}
                        style={outfit.style}
                        occasion={outfit.occasion}
                        description={outfit.description}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h4 className="text-lg font-medium mb-2">No saved outfits yet</h4>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Browse outfit recommendations and save your favorites to see them here.
                    </p>
                    <Button asChild>
                      <a href="/">Explore Outfits</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="wardrobe">
                <h3 className="text-xl font-medium mb-6">Your Wardrobe</h3>
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h4 className="text-lg font-medium mb-2">Start Building Your Wardrobe</h4>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Add items you already own to get personalized outfit recommendations.
                  </p>
                  <Button asChild>
                    <a href="/wardrobe">Go to My Wardrobe</a>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="preferences">
                <h3 className="text-xl font-medium mb-6">Style Preferences</h3>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6">
                      Set your style preferences to get more personalized outfit recommendations.
                    </p>
                    <Button>Update Preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
