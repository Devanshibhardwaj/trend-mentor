
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Cloud, Sun, Droplets, Wind, Loader2, Snowflake, CloudLightning } from 'lucide-react';
import OutfitCard from '@/components/OutfitCard';
import { toast } from 'sonner';
import ThreeDModelViewer from '@/components/3D/ThreeDModelViewer';

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

const weatherOutfitImages = {
  sunny: [
    '/images/outfits/sunny-casual.jpg',
    '/images/outfits/sunny-formal.jpg',
    '/images/outfits/sunny-beach.jpg'
  ],
  rainy: [
    '/images/outfits/rainy-casual.jpg',
    '/images/outfits/rainy-work.jpg',
    '/images/outfits/rainy-outdoor.jpg'
  ],
  cloudy: [
    '/images/outfits/cloudy-casual.jpg',
    '/images/outfits/cloudy-smart.jpg',
    '/images/outfits/cloudy-layered.jpg'
  ],
  windy: [
    '/images/outfits/windy-casual.jpg',
    '/images/outfits/windy-work.jpg',
    '/images/outfits/windy-outdoor.jpg'
  ],
  snowy: [
    '/images/outfits/winter-casual.jpg',
    '/images/outfits/winter-formal.jpg',
    '/images/outfits/winter-outdoor.jpg'
  ],
  stormy: [
    '/images/outfits/stormy-indoor.jpg',
    '/images/outfits/stormy-emergency.jpg',
    '/images/outfits/stormy-casual.jpg'
  ]
};

// 3D model URLs for different weather conditions
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

const WeatherBasedSuggestions = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [outfits, setOutfits] = useState<WeatherOutfit[]>([]);
  const [popularLocations] = useState([
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Mumbai', 'Dubai', 'Berlin'
  ]);
  
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
      generateOutfitRecommendations(randomCondition, randomTemp);
      setLoading(false);
      
      toast.success(`Weather data loaded for ${searchLocation}`);
    }, 1500);
  };
  
  const generateOutfitRecommendations = (condition: string, temperature: number) => {
    const recommendations: WeatherOutfit[] = [];
    const images = weatherOutfitImages[condition as keyof typeof weatherOutfitImages] || [];
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
        description: 'Swimwear with a light cover-up, sandals, and a sun hat. Don't forget sunscreen and a beach bag for your essentials.',
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
          // using a reverse geocoding service
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
                      onKeyDown={(e) => e.key === 'Enter' && fetchWeatherData()}
                    />
                  </div>
                  <Button onClick={() => fetchWeatherData()} disabled={loading}>
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
                
                {!weather && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Try one of these popular locations:</p>
                    <div className="flex flex-wrap gap-2">
                      {popularLocations.slice(0, 4).map((loc) => (
                        <Button 
                          key={loc} 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setLocation(loc);
                            fetchWeatherData(loc);
                          }}
                        >
                          {loc}
                        </Button>
                      ))}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={suggestPopularLocation}
                      >
                        Surprise Me
                      </Button>
                    </div>
                  </div>
                )}
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
                    
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-medium">Weather Summary</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {weather.condition === 'sunny' && weather.temperature > 25 && 
                          "Hot and sunny. Dress light and protect yourself from the sun."}
                        {weather.condition === 'sunny' && weather.temperature <= 25 && 
                          "Pleasant and sunny. Perfect for light layers that can be adjusted."}
                        {weather.condition === 'rainy' && 
                          "Rainy conditions. Waterproof clothing and proper footwear recommended."}
                        {weather.condition === 'cloudy' && 
                          "Cloudy skies. Prepare for changing conditions with adaptable layers."}
                        {weather.condition === 'windy' && 
                          "Windy weather. Wear secure clothing and avoid loose items."}
                        {weather.condition === 'snowy' && 
                          "Snowy conditions. Bundle up with insulated and waterproof layers."}
                        {weather.condition === 'stormy' && 
                          "Stormy weather. Consider staying indoors or wear protective gear if you must go out."}
                      </p>
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
          
          {weather && weather.condition && (
            <div className="mb-6">
              <Card className="bg-primary/5 p-4">
                <div className="flex items-center gap-3">
                  {weather.icon}
                  <div>
                    <h4 className="font-medium capitalize">{weather.condition} Weather Style Guide</h4>
                    <p className="text-sm text-muted-foreground">
                      {weather.condition === 'sunny' && "Prioritize breathable fabrics, light colors, and sun protection."}
                      {weather.condition === 'rainy' && "Focus on waterproof materials, secure footwear, and practical accessories."}
                      {weather.condition === 'cloudy' && "Prepare for changing conditions with versatile layers and neutral tones."}
                      {weather.condition === 'windy' && "Choose fitted styles, secure closures, and windproof outer layers."}
                      {weather.condition === 'snowy' && "Layer effectively, prioritize insulation, and protect extremities."}
                      {weather.condition === 'stormy' && "Safety first - high visibility, waterproof materials, and minimal accessories."}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfits.map((outfit, index) => (
              <div key={outfit.id} className="space-y-2">
                <OutfitCard
                  key={outfit.id}
                  index={index}
                  style={outfit.style}
                  occasion={outfit.occasion}
                  description={outfit.description}
                />
                
                {outfit.modelUrl && (
                  <div className="h-48 border rounded-md overflow-hidden">
                    <ThreeDModelViewer 
                      modelUrl={outfit.modelUrl} 
                      title={`${outfit.style} - ${outfit.occasion}`}
                      showControls={false}
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {weather && outfits.length > 0 && (
        <div className="p-4 bg-primary/5 rounded-lg mt-6">
          <h4 className="font-medium mb-2">Fashion Tips for {weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)} Weather</h4>
          <ul className="space-y-2 text-sm">
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
        </div>
      )}
    </div>
  );
};

export default WeatherBasedSuggestions;
