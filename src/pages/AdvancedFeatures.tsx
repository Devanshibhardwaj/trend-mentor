
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ColorMatchingTool from '@/components/ColorMatchingTool';
import WeatherBasedSuggestions from '@/components/WeatherBasedSuggestions';
import OccasionStyling from '@/components/OccasionStyling';
import StyleEvolutionTracker from '@/components/StyleEvolutionTracker';
import { Camera, CloudSun, Palette, Calendar, TrendingUp, Menu, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import OutfitCard from '@/components/OutfitCard';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample outfit data
const sampleOutfits = [
  {
    style: "Casual",
    occasion: "Weekend",
    description: "Light blue denim jacket over a white tee, paired with dark wash jeans and white sneakers. Perfect for a relaxed weekend outing."
  },
  {
    style: "Professional",
    occasion: "Office",
    description: "Navy blue tailored blazer with a light blue button-up shirt, charcoal gray trousers, and brown leather Oxford shoes."
  },
  {
    style: "Smart Casual",
    occasion: "Dinner",
    description: "Burgundy chinos paired with a crisp white shirt, navy blue knit blazer, and brown loafers for an elegant dinner look."
  },
  {
    style: "Athletic",
    occasion: "Workout",
    description: "Black performance t-shirt with moisture-wicking fabric, paired with gray running shorts and athletic shoes."
  }
];

// Sample color palette data
const colorPalettes = [
  { primary: "#2D4059", secondary: "#EA5455", accent: "#F07B3F", neutral: "#FFD460", name: "Sunset" },
  { primary: "#5C6BC0", secondary: "#26C6DA", accent: "#FFB74D", neutral: "#F5F5F5", name: "Ocean" },
  { primary: "#43A047", secondary: "#FDD835", accent: "#FF5722", neutral: "#EEEEEE", name: "Nature" },
  { primary: "#6A1B9A", secondary: "#26A69A", accent: "#EC407A", neutral: "#F5F5F5", name: "Berry" },
];

// Sample weather data
const weatherData = [
  { location: "New York", temperature: "12°C", condition: "Cloudy", recommendation: "Light jacket, scarf, and closed shoes" },
  { location: "Miami", temperature: "28°C", condition: "Sunny", recommendation: "Light cotton shirt, shorts, and sunglasses" },
  { location: "London", temperature: "9°C", condition: "Rainy", recommendation: "Waterproof jacket, umbrella, and water-resistant footwear" },
  { location: "Tokyo", temperature: "21°C", condition: "Partly Cloudy", recommendation: "Light sweater, jeans, and comfortable sneakers" },
];

// Sample occasion data
const occasionData = [
  { type: "Wedding", formality: "Formal", season: "Summer", recommendation: "Light linen suit in beige or pastel colors, with loafers" },
  { type: "Job Interview", formality: "Business", season: "Any", recommendation: "Navy or charcoal suit, crisp white shirt, and minimal accessories" },
  { type: "First Date", formality: "Smart Casual", season: "Spring", recommendation: "Well-fitted jeans, button-up shirt, and clean sneakers or chelsea boots" },
  { type: "Beach Party", formality: "Casual", season: "Summer", recommendation: "Linen shirt, tailored shorts, and leather sandals" },
];

const AdvancedFeatures = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("color-matching");
  
  // Auto-animate content into view
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className={`flex-grow container mx-auto px-4 py-6 md:py-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Advanced Style Features</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Explore our AI-powered tools to elevate your style experience with personalized recommendations.
          </p>
        </div>
        
        {isMobile ? (
          // Mobile version with drawer
          <div className="space-y-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex justify-between items-center py-6">
                  <span className="flex items-center gap-2">
                    {activeTab === "color-matching" && <Palette className="h-4 w-4" />}
                    {activeTab === "weather-based" && <CloudSun className="h-4 w-4" />}
                    {activeTab === "occasion-styling" && <Calendar className="h-4 w-4" />}
                    {activeTab === "style-evolution" && <TrendingUp className="h-4 w-4" />}
                    {activeTab === "virtual-try-on" && <Camera className="h-4 w-4" />}
                    {activeTab === "color-matching" && "Color Matching"}
                    {activeTab === "weather-based" && "Weather Suggestions"}
                    {activeTab === "occasion-styling" && "Occasion Styling"}
                    {activeTab === "style-evolution" && "Style Evolution"}
                    {activeTab === "virtual-try-on" && "Virtual Try-On"}
                  </span>
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl">
                <div className="grid gap-4 py-4">
                  <button 
                    className={`flex items-center gap-2 p-3 rounded-lg ${activeTab === "color-matching" ? "bg-primary/10" : ""}`}
                    onClick={() => {
                      setActiveTab("color-matching");
                    }}
                  >
                    <Palette className="h-5 w-5" />
                    <span>Color Matching</span>
                    {activeTab === "color-matching" && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </button>
                  
                  <button 
                    className={`flex items-center gap-2 p-3 rounded-lg ${activeTab === "weather-based" ? "bg-primary/10" : ""}`}
                    onClick={() => {
                      setActiveTab("weather-based");
                    }}
                  >
                    <CloudSun className="h-5 w-5" />
                    <span>Weather Suggestions</span>
                    {activeTab === "weather-based" && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </button>
                  
                  <button 
                    className={`flex items-center gap-2 p-3 rounded-lg ${activeTab === "occasion-styling" ? "bg-primary/10" : ""}`}
                    onClick={() => {
                      setActiveTab("occasion-styling");
                    }}
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Occasion Styling</span>
                    {activeTab === "occasion-styling" && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </button>
                  
                  <button 
                    className={`flex items-center gap-2 p-3 rounded-lg ${activeTab === "style-evolution" ? "bg-primary/10" : ""}`}
                    onClick={() => {
                      setActiveTab("style-evolution");
                    }}
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span>Style Evolution</span>
                    {activeTab === "style-evolution" && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </button>
                  
                  <button 
                    className={`flex items-center gap-2 p-3 rounded-lg ${activeTab === "virtual-try-on" ? "bg-primary/10" : ""}`}
                    onClick={() => {
                      setActiveTab("virtual-try-on");
                    }}
                  >
                    <Camera className="h-5 w-5" />
                    <span>Virtual Try-On</span>
                    {activeTab === "virtual-try-on" && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </button>
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="pt-4">
              {activeTab === "color-matching" && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Trending Color Palettes</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {colorPalettes.map((palette, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden card-hover">
                          <div className="h-16 grid grid-cols-4">
                            <div style={{ backgroundColor: palette.primary }}></div>
                            <div style={{ backgroundColor: palette.secondary }}></div>
                            <div style={{ backgroundColor: palette.accent }}></div>
                            <div style={{ backgroundColor: palette.neutral }}></div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium">{palette.name} Palette</h3>
                            <div className="grid grid-cols-4 gap-1 mt-2 text-xs">
                              <div className="text-center">{palette.primary}</div>
                              <div className="text-center">{palette.secondary}</div>
                              <div className="text-center">{palette.accent}</div>
                              <div className="text-center">{palette.neutral}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ColorMatchingTool />
                </div>
              )}
              
              {activeTab === "weather-based" && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Weather-based Suggestions</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {weatherData.map((location, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden card-hover">
                          <div className="h-24 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-700/30 flex items-center justify-center">
                            <CloudSun className="h-12 w-12 text-blue-500 dark:text-blue-300" />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium">{location.location}</h3>
                            <div className="flex justify-between mt-2">
                              <span>{location.temperature}</span>
                              <span>{location.condition}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{location.recommendation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <WeatherBasedSuggestions />
                </div>
              )}
              
              {activeTab === "occasion-styling" && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Occasion-based Style Guide</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {occasionData.map((occasion, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden card-hover">
                          <div className="h-24 bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-purple-900/30 dark:to-indigo-700/30 flex items-center justify-center">
                            <Calendar className="h-12 w-12 text-purple-500 dark:text-purple-300" />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium">{occasion.type}</h3>
                            <div className="flex justify-between mt-2 text-sm">
                              <span>{occasion.formality}</span>
                              <span>{occasion.season}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{occasion.recommendation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <OccasionStyling />
                </div>
              )}
              
              {activeTab === "style-evolution" && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Your Style Journey</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                      <h3 className="font-medium mb-4">Trending Outfit Inspirations</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {sampleOutfits.map((outfit, index) => (
                          <OutfitCard 
                            key={index}
                            index={index}
                            style={outfit.style}
                            occasion={outfit.occasion}
                            description={outfit.description}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <StyleEvolutionTracker />
                </div>
              )}
              
              {activeTab === "virtual-try-on" && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Virtual Try-On Experience</h3>
                  <p className="text-muted-foreground mb-6 text-sm">
                    See how outfits look on you using our augmented reality technology.
                  </p>
                  <div className="aspect-video max-w-lg mx-auto bg-gradient-to-br from-pink-100 to-purple-200 dark:from-pink-900/20 dark:to-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center p-6">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-primary" />
                      <p className="text-sm text-muted-foreground">Your virtual fitting room</p>
                    </div>
                  </div>
                  <Button size="lg" className="w-full py-6" onClick={() => navigate('/virtual-try-on')}>
                    Go to Virtual Try-On
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Desktop version with tabs
          <Tabs defaultValue="color-matching" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-5 gap-2 p-1">
                <TabsTrigger value="color-matching" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span>Color Matching</span>
                </TabsTrigger>
                <TabsTrigger value="weather-based" className="flex items-center gap-2">
                  <CloudSun className="h-4 w-4" />
                  <span>Weather Suggestions</span>
                </TabsTrigger>
                <TabsTrigger value="occasion-styling" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Occasion Styling</span>
                </TabsTrigger>
                <TabsTrigger value="style-evolution" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Style Evolution</span>
                </TabsTrigger>
                <TabsTrigger value="virtual-try-on" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  <span>Virtual Try-On</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="color-matching" className="pt-6 animate-fade-in">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Trending Color Palettes</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {colorPalettes.map((palette, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden card-hover">
                      <div className="h-20 grid grid-cols-4">
                        <div style={{ backgroundColor: palette.primary }}></div>
                        <div style={{ backgroundColor: palette.secondary }}></div>
                        <div style={{ backgroundColor: palette.accent }}></div>
                        <div style={{ backgroundColor: palette.neutral }}></div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{palette.name} Palette</h3>
                        <div className="grid grid-cols-4 gap-1 mt-2 text-xs">
                          <div className="text-center">{palette.primary}</div>
                          <div className="text-center">{palette.secondary}</div>
                          <div className="text-center">{palette.accent}</div>
                          <div className="text-center">{palette.neutral}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ColorMatchingTool />
            </TabsContent>
            
            <TabsContent value="weather-based" className="pt-6 animate-fade-in">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Weather-based Suggestions</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {weatherData.map((location, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden card-hover">
                      <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-700/30 flex items-center justify-center">
                        <CloudSun className="h-16 w-16 text-blue-500 dark:text-blue-300" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{location.location}</h3>
                        <div className="flex justify-between mt-2">
                          <span>{location.temperature}</span>
                          <span>{location.condition}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{location.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <WeatherBasedSuggestions />
            </TabsContent>
            
            <TabsContent value="occasion-styling" className="pt-6 animate-fade-in">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Occasion-based Style Guide</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {occasionData.map((occasion, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden card-hover">
                      <div className="h-32 bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-purple-900/30 dark:to-indigo-700/30 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-purple-500 dark:text-purple-300" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{occasion.type}</h3>
                        <div className="flex justify-between mt-2 text-sm">
                          <span>{occasion.formality}</span>
                          <span>{occasion.season}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{occasion.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <OccasionStyling />
            </TabsContent>
            
            <TabsContent value="style-evolution" className="pt-6 animate-fade-in">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Style Journey</h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="font-medium mb-4">Trending Outfit Inspirations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {sampleOutfits.map((outfit, index) => (
                      <OutfitCard 
                        key={index}
                        index={index}
                        style={outfit.style}
                        occasion={outfit.occasion}
                        description={outfit.description}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <StyleEvolutionTracker />
            </TabsContent>
            
            <TabsContent value="virtual-try-on" className="pt-6 animate-fade-in">
              <div className="text-center py-12 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Virtual Try-On Experience</h3>
                <p className="text-muted-foreground mb-6">
                  See how outfits look on you using our augmented reality technology. Use your camera to virtually try on recommended looks.
                </p>
                <div className="aspect-video max-w-lg mx-auto bg-gradient-to-br from-pink-100 to-purple-200 dark:from-pink-900/20 dark:to-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center p-6">
                    <Camera className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <p className="text-sm text-muted-foreground">Your virtual fitting room</p>
                  </div>
                </div>
                <Button size="lg" onClick={() => navigate('/virtual-try-on')}>
                  Go to Virtual Try-On
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AdvancedFeatures;
