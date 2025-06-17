
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
import FashionPersona from '@/components/FashionPersona';
import MoodScannerBar from '@/components/MoodScannerBar';
import MixAndMatch from '@/components/MixAndMatch';
import EnhancedLookbook from '@/components/EnhancedLookbook';
import ShoppingIntegration from '@/components/ShoppingIntegration';
import { useWeather } from '@/services/WeatherService';
import { Badge } from '@/components/ui/badge';
import { CloudSun, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import Tooltip from '@/components/CustomTooltip';
import { parsePrompt } from '@/utils/parsePrompt';
import { motion } from 'framer-motion';

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
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [lastPrompt, setLastPrompt] = useState<string>('');
  const [savedOutfits, setSavedOutfits] = useState<any[]>([]);

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
    loadSavedOutfits();
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

  const loadSavedOutfits = () => {
    try {
      const saved = localStorage.getItem('savedOutfits');
      if (saved) {
        setSavedOutfits(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved outfits:', error);
    }
  };

  const handlePromptSubmit = (prompt: string) => {
    setLastPrompt(prompt);
    toast.success("✨ Creating your perfect look...", {
      description: "Our AI stylist is curating something amazing for you!"
    });

    const parsedPrompt = parsePrompt(prompt);

    setFilters({
      mood: parsedPrompt.mood,
      style: parsedPrompt.style,
      weather: weatherData && getFashionWeather() === 'rainy' ? 'rainy' : 'sunny',
      budget: parsedPrompt.budget
    });

    document.getElementById('outfit-recommendations')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMoodSelect = (mood: string, emoji: string) => {
    setSelectedMood(mood);
    
    // Map mood to filter mood
    let filterMood: FilterOptions['mood'] = 'all';
    if (mood === 'professional') filterMood = 'work';
    else if (mood === 'romantic') filterMood = 'date';
    else if (mood === 'relaxed') filterMood = 'chill';
    
    setFilters(prev => ({ ...prev, mood: filterMood }));
    
    toast.success(`${emoji} Perfect! Styling for your ${mood} mood`, {
      description: "Let's create something that matches your vibe!"
    });
  };

  const handleRemoveFilter = (filterKey: keyof FilterOptions) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: filterKey === 'budget' ? 100 : 'all'
    }));
  };

  const handleFeedbackSubmit = (feedback: any) => {
    console.log('Feedback received:', feedback);
    toast.success("Thanks for your feedback! 💝", {
      description: "We're learning your style to improve future recommendations."
    });
  };

  const handleSaveOutfit = (outfit: any) => {
    const newOutfit = {
      ...outfit,
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };
    
    const updatedOutfits = [...savedOutfits, newOutfit];
    setSavedOutfits(updatedOutfits);
    localStorage.setItem('savedOutfits', JSON.stringify(updatedOutfits));
  };

  const handleRemoveOutfit = (id: string) => {
    const updatedOutfits = savedOutfits.filter(outfit => outfit.id !== id);
    setSavedOutfits(updatedOutfits);
    localStorage.setItem('savedOutfits', JSON.stringify(updatedOutfits));
  };

  const handleLikeOutfit = (id: string) => {
    const updatedOutfits = savedOutfits.map(outfit => 
      outfit.id === id 
        ? { 
            ...outfit, 
            isLiked: !outfit.isLiked,
            likes: outfit.isLiked ? (outfit.likes || 0) - 1 : (outfit.likes || 0) + 1
          }
        : outfit
    );
    setSavedOutfits(updatedOutfits);
    localStorage.setItem('savedOutfits', JSON.stringify(updatedOutfits));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar />
      <StepGuide />
      <main className="container mx-auto px-4">
        <motion.section 
          className="py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
                  <Badge variant="outline" className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 shadow-sm">
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
        </motion.section>

        {/* Mood Scanner */}
        <motion.section 
          className="py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <MoodScannerBar onMoodSelect={handleMoodSelect} selectedMood={selectedMood} />
          </div>
        </motion.section>

        {/* Fashion Persona */}
        {(selectedMood || lastPrompt || filters.mood !== 'all' || filters.style !== 'all') && (
          <motion.section 
            className="py-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="max-w-4xl mx-auto">
              <FashionPersona filters={filters} prompt={lastPrompt} mood={selectedMood} />
            </div>
          </motion.section>
        )}

        {/* Personalized Support Section */}
        <motion.section 
          className="py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-md mx-auto">
            <PersonalizedSupport filters={filters} />
          </div>
        </motion.section>

        <motion.section 
          className="py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <HowItWorks />
        </motion.section>

        <motion.section 
          className="py-12" 
          id="trending-looks"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Trending Looks</h2>
          <FilterBar filters={filters} onChange={setFilters} />
          <TrendingOutfits filters={filters} />
        </motion.section>

        <motion.section 
          className="py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <VibesGallery />
        </motion.section>

        <motion.section 
          className="py-12" 
          id="outfit-recommendations"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6">AI Outfit Recommendations</h2>
          <ActiveFilterTags filters={filters} onRemoveFilter={handleRemoveFilter} />
          <FilterBar filters={filters} onChange={setFilters} />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <OutfitRecommendation 
                wardrobeItems={wardrobeItems} 
                isLoading={isLoading} 
                filters={filters}
                onOutfitGenerated={setCurrentOutfitId}
              />
              <ShoppingIntegration 
                maxPrice={filters.budget}
                style={filters.style}
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
        </motion.section>

        {/* Mix & Match Section */}
        <motion.section 
          className="py-12" 
          id="mix-match"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h2 className="text-3xl font-bold mb-6">Mix & Match Studio</h2>
          <MixAndMatch 
            wardrobeItems={wardrobeItems}
            onSaveOutfit={handleSaveOutfit}
          />
        </motion.section>

        <motion.section 
          className="py-12" 
          id="saved-outfits"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <EnhancedLookbook
            savedOutfits={savedOutfits}
            onRemoveOutfit={handleRemoveOutfit}
            onLikeOutfit={handleLikeOutfit}
          />
        </motion.section>
      </main>
      <Footer />
      <div className="pb-20">
        <StylistChat />
      </div>
    </div>
  );
}

export default Index;
