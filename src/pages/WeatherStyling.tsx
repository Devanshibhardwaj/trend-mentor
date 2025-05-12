
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
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [activeWeather, setActiveWeather] = useState<string | null>('sunny');
  const [popularLocations] = useState<string[]>(['New York', 'London', 'Tokyo', 'Paris', 'Sydney']);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // Simulate fetching weather data
      const simulatedWeather: WeatherData = {
        location: 'New York',
        temperature: 23,
        condition: 'sunny',
        humidity: 40,
        windSpeed: 10,
        icon: weatherIcons['sunny']
      };
      setTimeout(() => {
        setWeatherData(simulatedWeather);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to fetch weather data.');
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    toast(`Searching for ${value}...`);
    // In a real app, this would trigger a weather API call
    fetchWeather();
  };

  const handleLocationDetect = () => {
    toast('Detecting your location...');
    // In a real app, this would use geolocation API
    fetchWeather();
  };

  const handleSelectWeather = (weather: string) => {
    setActiveWeather(weather);
    toast(`Selected ${weather} weather condition`);
    // In a real app, this could trigger outfit recommendations for this weather
  };

  const getModelUrls = (condition: string): string[] => {
    return weatherModelUrls[condition as keyof typeof weatherModelUrls] || [];
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <CosmicBackground />
      <Navbar />
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <CosmicSearch 
          value={searchValue} 
          onChange={setSearchValue} 
          onSearch={handleSearch} 
          onLocationDetect={handleLocationDetect} 
          popularLocations={popularLocations}
          loading={loading}
        />
        
        <div className="mt-6">
          <CosmicNavigation 
            activeWeather={activeWeather} 
            onSelectWeather={handleSelectWeather} 
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-16">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 mt-10">{error}</p>
        ) : weatherData ? (
          <>
            <div className="mt-6">
              <CosmicWeatherDisplay weather={weatherData} />
            </div>
            <h2 className="mt-10 text-xl font-bold text-center">Recommended Outfits</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getModelUrls(weatherData.condition).map((modelUrl, index) => (
                <ConstellationOutfit
                  key={index}
                  id={`outfit-${index}`}
                  style={`Style ${index + 1}`}
                  occasion={`${weatherData.condition.charAt(0).toUpperCase() + weatherData.condition.slice(1)} Weather`}
                  description={`Perfect for ${weatherData.condition} weather in ${weatherData.location}`}
                  modelUrl={modelUrl}
                  index={index}
                />
              ))}
            </div>
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default WeatherStyling;
