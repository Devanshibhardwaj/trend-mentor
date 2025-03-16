
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RecommendationForm from '@/components/RecommendationForm';
import OutfitCard from '@/components/OutfitCard';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Cloud, Calendar, Map } from 'lucide-react';

// Sample outfit data with images
const SAMPLE_OUTFITS = [
  {
    style: "Casual",
    occasion: "Everyday",
    description: "Light blue denim jacket over a white t-shirt, paired with black slim-fit jeans and white sneakers. Accessorize with a minimal watch.",
    image: "/outfit-casual.jpg"
  },
  {
    style: "Formal",
    occasion: "Work",
    description: "Navy blue tailored suit with a light blue button-up shirt. Brown leather Oxford shoes and a matching belt. Complete with a subtle patterned tie.",
    image: "/outfit-formal.jpg"
  },
  {
    style: "Traditional",
    occasion: "Festive",
    description: "Beautifully embroidered saree with modern styling, accessorized with minimal jewelry and a sleek handbag.",
    image: "/outfit-traditional.jpg"
  },
  {
    style: "Streetwear",
    occasion: "Weekend",
    description: "Oversized graphic tee layered with a flannel shirt, black cargo pants, and chunky sneakers. Add a beanie and silver chain accessories.",
    image: "/outfit-streetwear.jpg"
  },
  {
    style: "Minimalist",
    occasion: "Date Night",
    description: "Black turtleneck sweater with charcoal grey trousers. Black Chelsea boots and a sleek silver watch. No patterns, just clean lines and monochrome colors.",
    image: "/outfit-minimalist.jpg"
  },
  {
    style: "Bohemian",
    occasion: "Festival",
    description: "Flowy floral maxi dress or wide-leg pants with a loose peasant top. Layer with a fringe vest and add leather sandals and layered jewelry.",
    image: "/outfit-bohemian.jpg"
  }
];

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Features Section */}
        <section id="features" className="py-20 px-6 md:px-10 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-primary/80 text-sm md:text-base font-medium tracking-wider uppercase">
                Why Choose Us
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Intelligent Style Solutions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform analyzes thousands of data points to deliver personalized style recommendations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "AI-Powered Recommendations",
                  description: "Our advanced algorithms analyze your preferences and style to suggest perfect outfit combinations."
                },
                {
                  title: "Personalized Style Profile",
                  description: "Create your unique style profile and get recommendations tailored to your body type and preferences."
                },
                {
                  title: "Trend Analysis",
                  description: "Stay ahead of fashion trends with our AI that constantly analyzes the latest styles and seasonal changes."
                }
              ].map((feature, i) => (
                <div 
                  key={i}
                  className={`space-y-4 transition-all duration-700 ${
                    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary/20" />
                  </div>
                  <h3 className="text-xl font-medium">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* What to Wear Today Feature */}
        <section className="py-20 px-6 md:px-10 bg-primary/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-block p-2 bg-primary/10 rounded-lg">
                  <Cloud className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">What to Wear Today?</h2>
                <p className="text-muted-foreground">
                  Our smart outfit recommendation system adapts to real-time weather conditions, 
                  upcoming events, and local trends to suggest the perfect outfit for every day.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg mt-0.5">
                      <Cloud className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Weather-Based Suggestions</h3>
                      <p className="text-sm text-muted-foreground">Get outfit recommendations tailored to today's weather forecast</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg mt-0.5">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Event-Appropriate Styling</h3>
                      <p className="text-sm text-muted-foreground">Perfect outfits for work, parties, casual outings, or special events</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg mt-0.5">
                      <Map className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Regional Style Trends</h3>
                      <p className="text-sm text-muted-foreground">Location-specific recommendations including ethnic and cultural styles</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Link to="/weather-styling">
                    <Button className="bg-primary hover:bg-primary/90 rounded-full px-6 py-2 text-base transition-all">
                      Find Today's Perfect Outfit
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-xl">
                <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="text-muted-foreground">Weather feature preview</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-primary/80 text-sm md:text-base font-medium tracking-wider uppercase">
                The Process
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get personalized outfit recommendations in three simple steps.
              </p>
            </div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
              {/* Line connector (desktop only) */}
              <div className="hidden md:block absolute top-16 left-[calc(16.67%-8px)] right-[calc(16.67%-8px)] h-0.5 bg-border" />
              
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description: "Answer questions about your style preferences, body type, and wardrobe needs."
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  description: "Our AI analyzes your inputs alongside fashion trends and style principles."
                },
                {
                  step: "03",
                  title: "Get Recommendations",
                  description: "Receive personalized outfit suggestions tailored to your unique style."
                }
              ].map((step, i) => (
                <div 
                  key={i}
                  className={`space-y-6 transition-all duration-700 ${
                    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10 relative">
                      <span className="font-medium">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <RecommendationForm />
        
        {/* Sample Outfit Recommendations */}
        <section className="py-20 px-6 md:px-10 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-primary/80 text-sm md:text-base font-medium tracking-wider uppercase">
                Style Showcase
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Curated Outfit Examples
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore some of our AI-generated outfit recommendations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {SAMPLE_OUTFITS.map((outfit, index) => (
                <div 
                  key={index} 
                  className={`overflow-hidden transition-all duration-300 bg-card text-card-foreground rounded-lg shadow-md card-hover ${
                    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <img 
                      src={outfit.image} 
                      alt={`${outfit.style} outfit for ${outfit.occasion}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <div className="bg-white/90 text-primary text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                        {outfit.style}
                      </div>
                      <div className="bg-white/90 text-primary text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                        {outfit.occasion}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">{outfit.style} • {outfit.occasion}</h3>
                    <p className="text-muted-foreground text-sm">{outfit.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <Button variant="outline" size="sm" className="rounded-full">Save</Button>
                      <Button variant="ghost" size="sm" className="rounded-full">Share</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
