
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CloudSun, MapPin } from 'lucide-react';
import { toast } from 'sonner';

function Index() {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    mood: 'all',
    weather: 'all',
    budget: 100,
    style: 'all'
  });

  const { weatherData, isLoading: isLoadingWeather, loadWeatherData, getFashionWeather } = useWeather();

  useEffect(() => {
    async function fetchWardrobe() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setWardrobeItems(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWardrobe();
    loadWeatherData();
  }, []);

  useEffect(() => {
    if (weatherData) {
      const weatherType = getFashionWeather();
      let weatherFilter: "sunny" | "rainy" | "all" = 'all';
      if (['rainy', 'cold'].includes(weatherType)) {
        weatherFilter = 'rainy';
      } else if (['hot', 'warm', 'sunny'].includes(weatherType)) {
        weatherFilter = 'sunny';
      }
      setFilters(prev => ({ ...prev, weather: weatherFilter }));
      toast.info(`Showing outfits for ${weatherType} weather in ${weatherData.location}`, {
        duration: 4000,
        icon: <CloudSun size={18} />,
      });
    }
  }, [weatherData]);

  const handlePromptSubmit = (prompt: string) => {
    toast.success("Generating personalized recommendations...");
    const promptLower = prompt.toLowerCase();
    let mood: "all" | "work" | "date" | "chill" = 'all';
    if (promptLower.includes('work') || promptLower.includes('office')) {
      mood = 'work';
    } else if (promptLower.includes('date') || promptLower.includes('party')) {
      mood = 'date';
    } else if (promptLower.includes('casual') || promptLower.includes('relax') || promptLower.includes('chill')) {
      mood = 'chill';
    }
    let style: "all" | "minimal" | "street" | "ethnic" = 'all';
    if (promptLower.includes('minimal') || promptLower.includes('clean')) {
      style = 'minimal';
    } else if (promptLower.includes('street') || promptLower.includes('urban')) {
      style = 'street';
    } else if (promptLower.includes('ethnic') || promptLower.includes('traditional')) {
      style = 'ethnic';
    }
    let budget = 100;
    const budgetMatch = promptLower.match(/(\d+)k|₹(\d+)/);
    if (budgetMatch) {
      if (budgetMatch[1]) {
        budget = parseInt(budgetMatch[1]) * 1000;
      } else if (budgetMatch[2]) {
        budget = parseInt(budgetMatch[2]);
      }
    }
    setFilters({
      mood,
      style,
      weather: weatherData && getFashionWeather() === 'rainy' ? 'rainy' : 'sunny',
      budget
    });
    document.getElementById('outfit-recommendations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen">
        <Navbar />
        <StepGuide />
        <main className="container mx-auto px-4">
          <section className="py-12">
            <Hero />
            <div className="mt-8">
              <SmartPromptBar onPromptSubmit={handlePromptSubmit} className="max-w-3xl mx-auto" />
              {weatherData && (
                <div className="max-w-3xl mx-auto mt-4 flex justify-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-pointer">
                        <Badge variant="outline" className="flex items-center gap-1 bg-white px-3 py-1">
                          <MapPin size={12} className="text-primary" />
                          <span>{weatherData.location}</span>
                          <span className="mx-1">|</span>
                          <img src={weatherData.icon} alt={weatherData.condition} className="w-4 h-4" />
                          <span>{Math.round(weatherData.temperature)}°C</span>
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-3">
                      <div className="text-xs space-y-1">
                        <div><strong>Condition:</strong> {weatherData.condition}</div>
                        <div><strong>Temperature:</strong> {Math.round(weatherData.temperature)}°C</div>
                        <div><strong>Humidity:</strong> {weatherData.humidity}%</div>
                        <div><strong>Wind Speed:</strong> {weatherData.windSpeed} km/h</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
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
            <OutfitRecommendation wardrobeItems={wardrobeItems} isLoading={isLoading} filters={filters} />
          </section>
        </main>
        <Footer />
        <div className="pb-20">
          <StylistChat />
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Index;
