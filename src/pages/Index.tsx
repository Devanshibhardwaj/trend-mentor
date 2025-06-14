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
import ActiveFilterTags from '@/components/ActiveFilterTags';
import SavedOutfits from '@/components/SavedOutfits';
import StylingTips from '@/components/StylingTips';
import FeedbackSystem from '@/components/FeedbackSystem';
import PersonalizedSupport from '@/components/PersonalizedSupport';
import { useWeather } from '@/services/WeatherService';
import { Badge } from '@/components/ui/badge';
import { CloudSun, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import Tooltip from '@/components/CustomTooltip';
import { parsePrompt } from '@/utils/parsePrompt';

function Index() {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    mood: 'all',
    weather: 'all',
    budget: 100,
    style: 'all'
  });
  const [currentOutfitId, setCurrentOutfitId] = useState<string | null>(null);

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

    const parsedPrompt = parsePrompt(prompt);

    setFilters({
      mood: parsedPrompt.mood,
      style: parsedPrompt.style,
      weather: weatherData && getFashionWeather() === 'rainy' ? 'rainy' : 'sunny',
      budget: parsedPrompt.budget
    });

    document.getElementById('outfit-recommendations')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRemoveFilter = (filterKey: keyof FilterOptions) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: filterKey === 'budget' ? 100 : 'all'
    }));
  };

  const handleFeedbackSubmit = (feedback: any) => {
    console.log('Feedback received:', feedback);
    // Here you could send feedback to a backend or use it to improve recommendations
  };

  return (
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
                <Tooltip
                  content={
                    <div className="text-xs p-2 space-y-1">
                      <div><strong>Condition:</strong> {weatherData.condition}</div>
                      <div><strong>Temperature:</strong> {Math.round(weatherData.temperature)}°C</div>
                      <div><strong>Humidity:</strong> {weatherData.humidity}%</div>
                      <div><strong>Wind Speed:</strong> {weatherData.windSpeed} km/h</div>
                    </div>
                  }
                >
                  <Badge variant="outline" className="flex items-center gap-1 bg-white px-3 py-1">
                    <MapPin size={12} className="text-primary" />
                    <span>{weatherData.location}</span>
                    <span className="mx-1">|</span>
                    <img src={weatherData.icon} alt={weatherData.condition} className="w-4 h-4" />
                    <span>{Math.round(weatherData.temperature)}°C</span>
                  </Badge>
                </Tooltip>
              </div>
            )}
          </div>
        </section>

        {/* Personalized Support Section */}
        <section className="py-8">
          <div className="max-w-md mx-auto">
            <PersonalizedSupport filters={filters} />
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
          <ActiveFilterTags filters={filters} onRemoveFilter={handleRemoveFilter} />
          <FilterBar filters={filters} onChange={setFilters} />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <OutfitRecommendation 
                wardrobeItems={wardrobeItems} 
                isLoading={isLoading} 
                filters={filters}
                onOutfitGenerated={setCurrentOutfitId}
              />
            </div>
            <div className="space-y-6">
              <StylingTips filters={filters} />
              {currentOutfitId && (
                <FeedbackSystem 
                  outfitId={currentOutfitId}
                  onFeedbackSubmit={handleFeedbackSubmit}
                />
              )}
            </div>
          </div>
        </section>
        <section className="py-12" id="saved-outfits">
          <SavedOutfits />
        </section>
      </main>
      <Footer />
      <div className="pb-20">
        <StylistChat />
      </div>
    </div>
  );
}

export default Index;
