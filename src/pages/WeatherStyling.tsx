
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Cloud, Sun, Droplets, Wind, Loader2, Snowflake, CloudLightning } from 'lucide-react';
import { outfitImages } from '@/lib/outfit-data';

// Import our new cosmic components
import CosmicBackground from '@/components/cosmos/CosmicBackground';
import ConstellationOutfit from '@/components/cosmos/ConstellationOutfit';
import CosmicNavigation from '@/components/cosmos/CosmicNavigation';
import CosmicSearch from '@/components/cosmos/CosmicSearch';
import CosmicWeatherDisplay from '@/components/cosmos/CosmicWeatherDisplay';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: React.ReactNode;
}

interface WeatherOutfit {
  id: string;
  style: string;
  occasion: string;
  description: string;
  imageUrl?: string;
  modelUrl?: string;
}

const weatherIcons = {
  sunny: <Sun className="h-6 w-6 text-yellow-500" />,
  rainy: <Droplets className="h-6 w-6 text-blue-500" />,
  cloudy: <Cloud className="h-6 w-6 text-gray-500" />,
  windy: <Wind className="h-6 w-6 text-blue-300" />,
  snowy: <Snowflake className="h-6 w-6 text-blue-200" />,
  stormy: <CloudLightning className="h-6 w-6 text-purple-500" />
};

// Model URLs for different weather conditions
const weatherModelUrls = {
  sunny: [
    '/models/summer-dress.glb',
    '/models/light-outfit.glb',
    '/models/sun-hat.glb'
  ],
  rainy: [
    '/models/raincoat.glb',
    '/models/umbrella.glb',
    '/models/water-boots.glb'
  ],
  cloudy: [
    '/models/light-jacket.glb',
    '/models/sweater.glb',
    '/models/casual-outfit.glb'
  ],
  windy: [
    '/models/windbreaker.glb',
    '/models/scarf.glb',
    '/models/structured-coat.glb'
  ],
  snowy: [
    '/models/winter-coat.glb',
    '/models/snow-boots.glb',
    '/models/thermal-outfit.glb'
  ],
  stormy: [
    '/models/emergency-kit.glb',
    '/models/heavy-duty-coat.glb',
    '/models/waterproof-outfit.glb'
  ]
};

const WeatherStyling = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [outfits, setOutfits] = useState<WeatherOutfit[]>([]);
  const [popularLocations] = useState([
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Mumbai', 'Dubai', 'Berlin'
  ]);
  const [activeWeatherTab, setActiveWeatherTab] = useState<string | null>(null);
  const [pageTransitionComplete, setPageTransitionComplete] = useState(false);

  // Show page transition effect on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageTransitionComplete(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // This would normally use a real weather API
  const fetchWeatherData = (locationName = '') => {
    const searchLocation = locationName || location;
    
    if (!searchLocation.trim()) {
      toast.error('Please enter a location');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const weatherConditions = ['sunny', 'rainy', 'cloudy', 'windy', 'snowy', 'stormy'];
      const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      const randomTemp = Math.floor(Math.random() * 35) + 5; // 5-40°C
      
      const weatherData: WeatherData = {
        location: searchLocation,
        temperature: randomTemp,
        condition: randomCondition,
        humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
        windSpeed: Math.floor(Math.random() * 30) + 5, // 5-35 km/h
        icon: weatherIcons[randomCondition as keyof typeof weatherIcons] || weatherIcons.cloudy
      };
      
      setWeather(weatherData);
      setActiveWeatherTab(randomCondition);
      generateOutfitRecommendations(randomCondition, randomTemp);
      setLoading(false);
      
      toast.success(`Weather data loaded for ${searchLocation}`);
    }, 1500);
  };
  
  const generateOutfitRecommendations = (condition: string, temperature: number) => {
    const recommendations: WeatherOutfit[] = [];
    const images = outfitImages.weather[condition as keyof typeof outfitImages.weather] || [];
    const models = weatherModelUrls[condition as keyof typeof weatherModelUrls] || [];
    
    // Always add some basic recommendations based on weather condition
    if (condition === 'sunny' && temperature > 25) {
      recommendations.push({
        id: '1',
        style: 'Summer',
        occasion: 'Casual',
        description: 'Light cotton t-shirt in a breathable fabric, paired with shorts or a breezy skirt. Add sunglasses and a wide-brimmed hat for sun protection.',
        imageUrl: images[0],
        modelUrl: models[0]
      });
      recommendations.push({
        id: '2',
        style: 'Summer',
        occasion: 'Smart Casual',
        description: 'Linen shirt or blouse with lightweight chinos or a maxi dress. Leather sandals and minimal jewelry for a polished warm-weather look.',
        imageUrl: images[1],
        modelUrl: models[1]
      });
      recommendations.push({
        id: '3',
        style: 'Summer',
        occasion: 'Beach',
        description: "Swimwear with a light cover-up, sandals, and a sun hat. Don't forget sunscreen and a beach bag for your essentials.",
        imageUrl: images[2],
        modelUrl: models[2]
      });
    } else if (condition === 'rainy') {
      recommendations.push({
        id: '4',
        style: 'Rainy Day',
        occasion: 'Casual',
        description: 'Water-resistant jacket or raincoat over a comfortable sweater, paired with jeans and waterproof boots or shoes. Add an umbrella!',
        imageUrl: images[0],
        modelUrl: models[0]
      });
      recommendations.push({
        id: '5',
        style: 'Rainy Day',
        occasion: 'Work',
        description: "Trench coat over business attire, with water-resistant footwear. Carry a compact umbrella and choose dark colors that won't show water spots.",
        imageUrl: images[1],
        modelUrl: models[1]
      });
      recommendations.push({
        id: '6',
        style: 'Rainy Day',
        occasion: 'Outdoor Activities',
        description: 'Full waterproof outfit with a breathable rain jacket, waterproof pants, and sturdy boots. Consider moisture-wicking base layers.',
        imageUrl: images[2],
        modelUrl: models[2]
      });
    } else if (condition === 'cloudy' || (condition === 'sunny' && temperature < 20)) {
      recommendations.push({
        id: '7',
        style: 'Spring/Fall',
        occasion: 'Casual',
        description: 'Light sweater or cardigan with jeans or casual pants. Layer with a scarf or light jacket that can be removed if the sun comes out.',
        imageUrl: images[0],
        modelUrl: models[0]
      });
      recommendations.push({
        id: '8',
        style: 'Spring/Fall',
        occasion: 'Smart Casual',
        description: 'Button-up shirt or blouse with a light blazer or sweater. Pair with chinos or a skirt, and add loafers or ankle boots.',
        imageUrl: images[1],
        modelUrl: models[1]
      });
      recommendations.push({
        id: '9',
        style: 'Spring/Fall',
        occasion: 'Layered Look',
        description: 'Multiple light layers: t-shirt, button-up, and a light jacket or sweater. Easy to adjust as the temperature changes throughout the day.',
        imageUrl: images[2],
        modelUrl: models[2]
      });
    } else if (condition === 'windy') {
      recommendations.push({
        id: '10',
        style: 'Windy Day',
        occasion: 'Casual',
        description: 'Windbreaker or medium-weight jacket with secure closures. Layer with a sweater and wear pants rather than loose skirts. Add a beanie or cap.',
        imageUrl: images[0],
        modelUrl: models[0]
      });
      recommendations.push({
        id: '11',
        style: 'Windy Day',
        occasion: 'Work',
        description: "Structured blazer or jacket that won't blow open, with pants or a pencil skirt. Choose heavier fabrics and avoid loose scarves or accessories.",
        imageUrl: images[1],
        modelUrl: models[1]
      });
      recommendations.push({
        id: '12',
        style: 'Windy Day',
        occasion: 'Outdoor',
        description: 'Windproof jacket with a hood, thermal layers underneath, and sturdy footwear. Secure any headwear and consider wind-resistant accessories.',
        imageUrl: images[2],
        modelUrl: models[2]
      });
    } else if (condition === 'snowy' || temperature < 5) {
      recommendations.push({
        id: '13',
        style: 'Winter',
        occasion: 'Casual',
        description: 'Insulated parka or heavy coat with multiple warm layers underneath. Thermal pants or jeans, winter boots, hat, gloves, and a scarf.',
        imageUrl: images[0],
        modelUrl: models[0]
      });
      recommendations.push({
        id: '14',
        style: 'Winter',
        occasion: 'Formal',
        description: 'Wool overcoat with a suit or dress, thermal undergarments for extra warmth, and water-resistant formal shoes. Add elegant winter accessories.',
        imageUrl: images[1],
        modelUrl: models[1]
      });
      recommendations.push({
        id: '15',
        style: 'Winter',
        occasion: 'Snow Activities',
        description: 'Technical snow gear including waterproof and insulated jacket and pants, moisture-wicking base layers, insulated boots, and snow accessories.',
        imageUrl: images[2],
        modelUrl: models[2]
      });
    } else if (condition === 'stormy') {
      recommendations.push({
        id: '16',
        style: 'Stormy Weather',
        occasion: 'Indoor',
        description: 'Comfortable loungewear or casual clothing for staying inside. Have a warm blanket and a backup light source ready.',
        imageUrl: images[0],
        modelUrl: models[0]
      });
      recommendations.push({
        id: '17',
        style: 'Stormy Weather',
        occasion: 'Emergency',
        description: 'Heavy-duty waterproof clothing, sturdy boots, and a waterproof bag for essentials. Consider high-visibility elements if going out is absolutely necessary.',
        imageUrl: images[1],
        modelUrl: models[1]
      });
      recommendations.push({
        id: '18',
        style: 'Stormy Weather',
        occasion: 'Casual',
        description: 'Full coverage waterproof outfit with hood, water-resistant footwear, and minimal accessories. Avoid metal items during lightning.',
        imageUrl: images[2],
        modelUrl: models[2]
      });
    }
    
    setOutfits(recommendations);
  };
  
  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would convert coordinates to a location name
          setLocation("Current Location");
          setLoading(false);
          fetchWeatherData("Current Location");
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Could not detect your location. Please enter it manually.");
          setLoading(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };
  
  // Suggestion to try a popular location
  const suggestPopularLocation = () => {
    const randomLocation = popularLocations[Math.floor(Math.random() * popularLocations.length)];
    setLocation(randomLocation);
    fetchWeatherData(randomLocation);
  };
  
  // Handle weather tab selection
  const handleWeatherSelect = (weatherType: string) => {
    setActiveWeatherTab(weatherType);
    
    // If we already have weather data, update outfits based on the selected weather type
    if (weather) {
      const tempWeather = { ...weather, condition: weatherType };
      setWeather(tempWeather);
      generateOutfitRecommendations(weatherType, weather.temperature);
    }
    // Otherwise, suggest searching for a location
    else {
      toast.info("Enter a location to get personalized weather-based recommendations");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Cosmic background */}
      <CosmicBackground weatherCondition={weather?.condition} />
      
      {/* Header */}
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow py-12 px-6 md:px-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Page entrance animation */}
          <motion.div
            className="text-center mb-12 space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Fashion Cosmos
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-2xl mx-auto text-white/80"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Discover your stellar style in an ever-changing universe
            </motion.p>
          </motion.div>
          
          {/* Weather search section */}
          <motion.div 
            className="mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <CosmicSearch
              value={location}
              onChange={setLocation}
              onSearch={fetchWeatherData}
              onLocationDetect={handleLocationDetection}
              popularLocations={popularLocations}
              loading={loading}
            />
          </motion.div>
          
          {/* Cosmic Navigation */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: pageTransitionComplete ? 1 : 0, y: pageTransitionComplete ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <CosmicNavigation 
              activeWeather={activeWeatherTab} 
              onSelectWeather={handleWeatherSelect} 
            />
          </motion.div>
          
          {/* Weather display and outfit grid */}
          {weather && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Weather data display */}
              <div className="md:col-span-1">
                <CosmicWeatherDisplay weather={weather} />
                
                {/* Fashion guide */}
                <motion.div 
                  className="mt-6 p-4 backdrop-blur-sm border border-white/10 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {weather.icon}
                    <h4 className="font-medium capitalize">{weather.condition} Weather Style Guide</h4>
                  </div>
                  
                  <p className="text-sm text-white/70">
                    {weather.condition === 'sunny' && "Prioritize breathable fabrics, light colors, and sun protection."}
                    {weather.condition === 'rainy' && "Focus on waterproof materials, secure footwear, and practical accessories."}
                    {weather.condition === 'cloudy' && "Prepare for changing conditions with versatile layers and neutral tones."}
                    {weather.condition === 'windy' && "Choose fitted styles, secure closures, and windproof outer layers."}
                    {weather.condition === 'snowy' && "Layer effectively, prioritize insulation, and protect extremities."}
                    {weather.condition === 'stormy' && "Safety first - high visibility, waterproof materials, and minimal accessories."}
                  </p>
                </motion.div>
              </div>
              
              {/* Constellation outfit grid */}
              <div className="md:col-span-2">
                <motion.h3 
                  className="text-xl font-medium mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Cosmic Style Constellations
                </motion.h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {outfits.map((outfit, index) => (
                    <ConstellationOutfit
                      key={outfit.id}
                      id={outfit.id}
                      style={outfit.style}
                      occasion={outfit.occasion}
                      description={outfit.description}
                      imageUrl={outfit.imageUrl}
                      modelUrl={outfit.modelUrl}
                      index={index}
                    />
                  ))}
                </div>
                
                {/* Fashion tips */}
                {outfits.length > 0 && (
                  <motion.div 
                    className="p-4 backdrop-blur-sm border border-white/10 rounded-lg mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <h4 className="font-medium mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      Celestial Fashion Tips
                    </h4>
                    
                    <ul className="space-y-2 text-sm text-white/80">
                      {weather.condition === 'sunny' && (
                        <>
                          <li>• Choose light-colored clothing to reflect sunlight rather than absorb it</li>
                          <li>• Natural fabrics like cotton and linen are more breathable in hot weather</li>
                          <li>• Don't forget UV protection accessories like sunglasses and wide-brimmed hats</li>
                          <li>• Consider UPF-rated clothing for extended outdoor activities</li>
                        </>
                      )}
                      {weather.condition === 'rainy' && (
                        <>
                          <li>• Select waterproof fabrics rather than just water-resistant ones for heavy rain</li>
                          <li>• Choose quick-drying synthetic materials for layers underneath</li>
                          <li>• Avoid suede and leather footwear which can be damaged by water</li>
                          <li>• Consider rain pants for complete protection during extended outdoor time</li>
                        </>
                      )}
                      {weather.condition === 'cloudy' && (
                        <>
                          <li>• Layer clothing so you can adjust as temperatures fluctuate</li>
                          <li>• Keep a light jacket or cardigan handy for sudden temperature drops</li>
                          <li>• Choose versatile pieces that work well in multiple outfit combinations</li>
                          <li>• Opt for moisture-wicking fabrics if there's a chance of light rain</li>
                        </>
                      )}
                      {weather.condition === 'windy' && (
                        <>
                          <li>• Choose fitted clothing over loose garments that can catch the wind</li>
                          <li>• Wear layers with a windproof outer shell to maintain body heat</li>
                          <li>• Secure accessories like hats and scarves, or choose styles that won't blow away</li>
                          <li>• Consider windproof fabrics for maximum comfort</li>
                        </>
                      )}
                      {weather.condition === 'snowy' && (
                        <>
                          <li>• Layer starting with a moisture-wicking base, insulating middle, and waterproof outer shell</li>
                          <li>• Choose waterproof boots with good traction for snow and ice</li>
                          <li>• Don't forget insulated accessories for extremities (hands, ears, head)</li>
                          <li>• Consider thermal or heated clothing for extreme cold</li>
                        </>
                      )}
                      {weather.condition === 'stormy' && (
                        <>
                          <li>• Prioritize full waterproof protection with sealed seams</li>
                          <li>• Choose clothing with reflective elements if visibility is poor</li>
                          <li>• Avoid metal accessories during lightning storms</li>
                          <li>• Have a waterproof bag to protect electronics and valuables</li>
                        </>
                      )}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Initial state prompt */}
          {!weather && !loading && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: pageTransitionComplete ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="text-xl text-white/70 mb-6">
                Enter a location or select a weather type to begin your cosmic style journey
              </p>
              <motion.button
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20"
                onClick={suggestPopularLocation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discover a Random Location
              </motion.button>
            </motion.div>
          )}
          
          {/* Loading state */}
          {loading && (
            <div className="flex justify-center py-20">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="relative w-16 h-16"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 -ml-1 w-2 h-2 rounded-full bg-blue-400"></div>
                  <div className="absolute top-1/2 right-0 -mt-1 w-2 h-2 rounded-full bg-purple-400"></div>
                  <div className="absolute bottom-0 left-1/2 -ml-1 w-2 h-2 rounded-full bg-green-400"></div>
                  <div className="absolute top-1/2 left-0 -mt-1 w-2 h-2 rounded-full bg-yellow-400"></div>
                </motion.div>
                <p className="mt-4 text-white/80">Exploring the fashion cosmos...</p>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WeatherStyling;
