import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import VibesGallery from '@/components/VibesGallery';
import OutfitRecommendation from '@/components/OutfitRecommendation';
import Footer from '@/components/Footer';
import TrendingOutfits from '@/components/TrendingOutfits';
import StepGuide from '@/components/StepGuide';
import FilterBar, { FilterOptions } from '@/components/FilterBar';
import StylistChat from '@/components/StylistChat';
import SmartPromptBar from '@/components/SmartPromptBar';
import { useWeather } from '@/services/WeatherService';
import { Badge } from '@/components/ui/badge';
import { CloudSun, MapPin } from 'lucide-react';
import { toast } from 'sonner';

function Index() {
  // Create empty wardrobeItems array for homepage display
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    mood: 'all',
    weather: 'all',
    budget: 100,
    style: 'all'
  });
  
  // Use our weather hook
  const { weatherData, isLoading: isLoadingWeather, loadWeatherData, getFashionWeather } = useWeather();

  useEffect(() => {
    async function fetchWardrobe() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/products'); // Flipkart, Amazon, or mock data
        const data = await res.json();
        setWardrobeItems(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Use empty array if fetch fails
      } finally {
        setIsLoading(false);
      }
    }
    fetchWardrobe();
    
    // Load weather data when page loads
    loadWeatherData();
  }, []);
  
  // Update filters based on weather when weather data is loaded
  useEffect(() => {
    if (weatherData) {
      const weatherType = getFashionWeather();
      
      // Map weather condition to our filter options
      let weatherFilter: "sunny" | "rainy" | "all" = 'all';
      if (['rainy', 'cold'].includes(weatherType)) {
        weatherFilter = 'rainy';
      } else if (['hot', 'warm', 'sunny'].includes(weatherType)) {
        weatherFilter = 'sunny';
      }
      
      setFilters(prev => ({
        ...prev,
        weather: weatherFilter
      }));
      
      toast.info(`Showing outfits for ${weatherType} weather in ${weatherData.location}`, {
        duration: 4000,
        icon: <CloudSun size={18} />,
      });
    }
  }, [weatherData]);
  
  // Handle smart prompt submission
  const handlePromptSubmit = (prompt: string) => {
    toast.success("Generating personalized recommendations...");
    
    // Parse natural language prompt to extract filters
    // This is a simple implementation - in a real app, this would use NLP
    const promptLower = prompt.toLowerCase();
    
    // Extract mood
    let mood: "all" | "work" | "date" | "chill" = 'all';
    if (promptLower.includes('work') || promptLower.includes('office')) {
      mood = 'work';
    } else if (promptLower.includes('date') || promptLower.includes('party')) {
      mood = 'date';
    } else if (promptLower.includes('casual') || promptLower.includes('relax') || promptLower.includes('chill')) {
      mood = 'chill';
    }
    
    // Extract style
    let style: "all" | "minimal" | "street" | "ethnic" = 'all';
    if (promptLower.includes('minimal') || promptLower.includes('clean')) {
      style = 'minimal';
    } else if (promptLower.includes('street') || promptLower.includes('urban')) {
      style = 'street';
    } else if (promptLower.includes('ethnic') || promptLower.includes('traditional')) {
      style = 'ethnic';
    }
    
    // Extract budget
    let budget = 100;
    const budgetMatch = promptLower.match(/(\d+)k|₹(\d+)/);
    if (budgetMatch) {
      if (budgetMatch[1]) {
        // Handle "5k" format
        budget = parseInt(budgetMatch[1]) * 1000;
      } else if (budgetMatch[2]) {
        // Handle "₹5000" format
        budget = parseInt(budgetMatch[2]);
      }
    }
    
    // Update filters
    setFilters({
      mood,
      style,
      weather: weatherData && getFashionWeather() === 'rainy' ? 'rainy' : 'sunny',
      budget
    });
    
    // Scroll to outfit recommendations
    document.getElementById('outfit-recommendations')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <StepGuide />
      
      <main className="container mx-auto px-4">
        <section className="py-12">
          <Hero />
          
          {/* Smart prompt bar */}
          <div className="mt-8">
            <SmartPromptBar 
              onPromptSubmit={handlePromptSubmit} 
              className="max-w-3xl mx-auto"
            />
            
            {/* Weather display */}
            {weatherData && (
              <div className="max-w-3xl mx-auto mt-4 flex justify-end">
                <Badge 
                  variant="outline" 
                  className="flex items-center gap-1 bg-white"
                >
                  <MapPin size={12} className="text-primary" />
                  <span>{weatherData.location}</span>
                  <span className="mx-1">|</span>
                  <img 
                    src={weatherData.icon} 
                    alt={weatherData.condition} 
                    className="w-4 h-4" 
                  />
                  <span>{Math.round(weatherData.temperature)}°C</span>
                </Badge>
              </div>
            )}
          </div>
        </section>
        
        <section className="py-12">
          <HowItWorks />
        </section>
        
        <section className="py-12" id="trending-looks">
          <h2 className="text-3xl font-bold mb-6">Trending Looks</h2>
          <FilterBar filters={filters} onChange={setFilters} />
          <TrendingOutfits filters={filters} />
        </section>
        
        <section className="py-12">
          <VibesGallery />
        </section>
        
        <section className="py-12" id="outfit-recommendations">
          <h2 className="text-3xl font-bold mb-6">Outfit Recommendations</h2>
          <FilterBar filters={filters} onChange={setFilters} />
          <OutfitRecommendation 
            wardrobeItems={wardrobeItems} 
            isLoading={isLoading}
            filters={filters}
          />
        </section>
      </main>
      
      <Footer />
      
      {/* Add the Stylist Chat component */}
      <StylistChat />
    </div>
  );
}

export default Index;
