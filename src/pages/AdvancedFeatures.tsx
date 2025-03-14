
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ColorMatchingTool from '@/components/ColorMatchingTool';
import WeatherBasedSuggestions from '@/components/WeatherBasedSuggestions';
import OccasionStyling from '@/components/OccasionStyling';
import StyleEvolutionTracker from '@/components/StyleEvolutionTracker';
import { Camera, CloudSun, Palette, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdvancedFeatures = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2">Advanced Style Features</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our AI-powered tools to elevate your style experience with personalized recommendations.
          </p>
        </div>
        
        <Tabs defaultValue="color-matching" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="color-matching" className="flex items-center">
                <Palette className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Color Matching</span>
                <span className="md:hidden">Color</span>
              </TabsTrigger>
              <TabsTrigger value="weather-based" className="flex items-center">
                <CloudSun className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Weather Suggestions</span>
                <span className="md:hidden">Weather</span>
              </TabsTrigger>
              <TabsTrigger value="occasion-styling" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Occasion Styling</span>
                <span className="md:hidden">Occasion</span>
              </TabsTrigger>
              <TabsTrigger value="style-evolution" className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Style Evolution</span>
                <span className="md:hidden">Evolution</span>
              </TabsTrigger>
              <TabsTrigger value="virtual-try-on" className="flex items-center">
                <Camera className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Virtual Try-On</span>
                <span className="md:hidden">Try-On</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="color-matching" className="pt-6">
            <ColorMatchingTool />
          </TabsContent>
          
          <TabsContent value="weather-based" className="pt-6">
            <WeatherBasedSuggestions />
          </TabsContent>
          
          <TabsContent value="occasion-styling" className="pt-6">
            <OccasionStyling />
          </TabsContent>
          
          <TabsContent value="style-evolution" className="pt-6">
            <StyleEvolutionTracker />
          </TabsContent>
          
          <TabsContent value="virtual-try-on" className="pt-6">
            <div className="text-center py-12 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Virtual Try-On Experience</h3>
              <p className="text-muted-foreground mb-6">
                See how outfits look on you using our augmented reality technology. Use your camera to virtually try on recommended looks.
              </p>
              <Button size="lg" onClick={() => navigate('/virtual-try-on')}>
                Go to Virtual Try-On
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdvancedFeatures;
