
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Cloud, Sun, Droplets, Wind, Loader2 } from 'lucide-react';
import OutfitCard from '@/components/OutfitCard';
import { toast } from 'sonner';

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
}

const WeatherBasedSuggestions = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [outfits, setOutfits] = useState<WeatherOutfit[]>([]);
  
  // This would normally use a real weather API
  const fetchWeatherData = () => {
    if (!location.trim()) {
      toast.error('Please enter a location');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const weatherConditions = ['sunny', 'rainy', 'cloudy', 'windy', 'snowy'];
      const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      const randomTemp = Math.floor(Math.random() * 35) + 5; // 5-40°C
      
      const weatherIcons = {
        sunny: <Sun className="h-6 w-6 text-yellow-500" />,
        rainy: <Droplets className="h-6 w-6 text-blue-500" />,
        cloudy: <Cloud className="h-6 w-6 text-gray-500" />,
        windy: <Wind className="h-6 w-6 text-blue-300" />,
        snowy: <Cloud className="h-6 w-6 text-blue-200" />,
      };
      
      const weatherData: WeatherData = {
        location: location,
        temperature: randomTemp,
        condition: randomCondition,
        humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
        windSpeed: Math.floor(Math.random() * 30) + 5, // 5-35 km/h
        icon: weatherIcons[randomCondition as keyof typeof weatherIcons]
      };
      
      setWeather(weatherData);
      generateOutfitRecommendations(randomCondition, randomTemp);
      setLoading(false);
    }, 1500);
  };
  
  const generateOutfitRecommendations = (condition: string, temperature: number) => {
    const recommendations: WeatherOutfit[] = [];
    
    if (condition === 'sunny' && temperature > 25) {
      recommendations.push({
        id: '1',
        style: 'Summer',
        occasion: 'Casual',
        description: 'Light cotton t-shirt in a breathable fabric, paired with shorts or a breezy skirt. Add sunglasses and a wide-brimmed hat for sun protection.'
      });
      recommendations.push({
        id: '2',
        style: 'Summer',
        occasion: 'Smart Casual',
        description: 'Linen shirt or blouse with lightweight chinos or a maxi dress. Leather sandals and minimal jewelry for a polished warm-weather look.'
      });
    } else if (condition === 'rainy') {
      recommendations.push({
        id: '3',
        style: 'Rainy Day',
        occasion: 'Casual',
        description: 'Water-resistant jacket or raincoat over a comfortable sweater, paired with jeans and waterproof boots or shoes. Add an umbrella!'
      });
      recommendations.push({
        id: '4',
        style: 'Rainy Day',
        occasion: 'Work',
        description: "Trench coat over business attire, with water-resistant footwear. Carry a compact umbrella and choose dark colors that won't show water spots."
      });
    } else if (condition === 'cloudy' || (condition === 'sunny' && temperature < 20)) {
      recommendations.push({
        id: '5',
        style: 'Spring/Fall',
        occasion: 'Casual',
        description: 'Light sweater or cardigan with jeans or casual pants. Layer with a scarf or light jacket that can be removed if the sun comes out.'
      });
      recommendations.push({
        id: '6',
        style: 'Spring/Fall',
        occasion: 'Smart Casual',
        description: 'Button-up shirt or blouse with a light blazer or sweater. Pair with chinos or a skirt, and add loafers or ankle boots.'
      });
    } else if (condition === 'windy') {
      recommendations.push({
        id: '7',
        style: 'Windy Day',
        occasion: 'Casual',
        description: 'Windbreaker or medium-weight jacket with secure closures. Layer with a sweater and wear pants rather than loose skirts. Add a beanie or cap.'
      });
      recommendations.push({
        id: '8',
        style: 'Windy Day',
        occasion: 'Work',
        description: "Structured blazer or jacket that won't blow open, with pants or a pencil skirt. Choose heavier fabrics and avoid loose scarves or accessories."
      });
    } else if (condition === 'snowy' || temperature < 5) {
      recommendations.push({
        id: '9',
        style: 'Winter',
        occasion: 'Casual',
        description: 'Insulated parka or heavy coat with multiple warm layers underneath. Thermal pants or jeans, winter boots, hat, gloves, and a scarf.'
      });
      recommendations.push({
        id: '10',
        style: 'Winter',
        occasion: 'Formal',
        description: 'Wool overcoat with a suit or dress, thermal undergarments for extra warmth, and water-resistant formal shoes. Add elegant winter accessories.'
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
          // using a reverse geocoding service
          setLocation("Current Location");
          setLoading(false);
          fetchWeatherData();
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
  
  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Weather-Based Outfit Suggestions</h3>
                <p className="text-muted-foreground">
                  Get outfit recommendations tailored to your local weather conditions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow">
                    <Label htmlFor="location" className="sr-only">Enter your location</Label>
                    <Input
                      id="location"
                      placeholder="Enter your city or zip code"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <Button onClick={fetchWeatherData} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Checking weather...
                      </>
                    ) : (
                      'Get Recommendations'
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleLocationDetection} disabled={loading}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Detect
                  </Button>
                </div>
              </div>
            </div>
            
            {weather && (
              <div>
                <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{weather.location}</h4>
                        <p className="text-3xl font-semibold mt-2">{weather.temperature}°C</p>
                        <p className="text-muted-foreground capitalize">{weather.condition}</p>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-full">
                        {weather.icon}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-muted-foreground">Humidity: {weather.humidity}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4 text-blue-300" />
                        <span className="text-muted-foreground">Wind: {weather.windSpeed} km/h</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {outfits.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-6">Recommended Outfits for Today's Weather</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfits.map((outfit, index) => (
              <OutfitCard
                key={outfit.id}
                index={index}
                style={outfit.style}
                occasion={outfit.occasion}
                description={outfit.description}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherBasedSuggestions;
