import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RecommendationForm from '@/components/RecommendationForm';
import OutfitCard from '@/components/OutfitCard';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Cloud, Calendar, Map, ChevronRight, Heart, Sparkles, Star, Zap } from 'lucide-react';
import IntroAnimation from '@/components/IntroAnimation';
import { AnimatePresence, motion } from 'framer-motion';

const SAMPLE_OUTFITS = [
  {
    style: "Casual",
    occasion: "Everyday",
    description: "Light blue denim jacket over a white t-shirt, paired with black slim-fit jeans and white sneakers. Accessorize with a minimal watch.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=720"
  },
  {
    style: "Formal",
    occasion: "Work",
    description: "Navy blue tailored suit with a light blue button-up shirt. Brown leather Oxford shoes and a matching belt. Complete with a subtle patterned tie.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=720"
  },
  {
    style: "Traditional",
    occasion: "Festive",
    description: "Beautifully embroidered saree with modern styling, accessorized with minimal jewelry and a sleek handbag.",
    image: "https://images.unsplash.com/photo-1610021684483-b06d360338a6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=720"
  },
  {
    style: "Streetwear",
    occasion: "Weekend",
    description: "Oversized graphic tee layered with a flannel shirt, black cargo pants, and chunky sneakers. Add a beanie and silver chain accessories.",
    image: "https://images.unsplash.com/photo-1552573102-2b44b44d85b5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=720"
  },
  {
    style: "Minimalist",
    occasion: "Date Night",
    description: "Black turtleneck sweater with charcoal grey trousers. Black Chelsea boots and a sleek silver watch. No patterns, just clean lines and monochrome colors.",
    image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=720"
  },
  {
    style: "Bohemian",
    occasion: "Festival",
    description: "Flowy floral maxi dress or wide-leg pants with a loose peasant top. Layer with a fringe vest and add leather sandals and layered jewelry.",
    image: "https://images.unsplash.com/photo-1503146234394-631200675614?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=720"
  }
];

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [likedOutfits, setLikedOutfits] = useState<{[key: number]: boolean}>({});
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro) {
      setShowIntro(false);
      setContentVisible(true);
    } else {
      document.body.style.overflow = 'hidden';
    }
    
    setLoaded(true);
  }, []);
  
  const handleIntroComplete = () => {
    document.body.style.overflow = '';
    setShowIntro(false);
    
    localStorage.setItem('hasSeenIntro', 'true');
    
    setTimeout(() => {
      setContentVisible(true);
    }, 300);
  };

  const toggleLike = (index: number) => {
    setLikedOutfits(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      </AnimatePresence>
      
      <motion.div
        className="min-h-screen bg-background flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          
          <section id="features" className="py-20 px-6 md:px-10 bg-gradient-to-b from-secondary/30 to-background">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <p className="text-primary/80 text-sm md:text-base font-medium tracking-wider uppercase">
                  Why Choose Us
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Intelligent Style Solutions
                  </span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our AI-powered platform analyzes thousands of data points to deliver personalized style recommendations.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {
                    icon: <Sparkles className="h-6 w-6 text-primary" />,
                    title: "AI-Powered Recommendations",
                    description: "Our advanced algorithms analyze your preferences and style to suggest perfect outfit combinations."
                  },
                  {
                    icon: <Star className="h-6 w-6 text-primary" />,
                    title: "Personalized Style Profile",
                    description: "Create your unique style profile and get recommendations tailored to your body type and preferences."
                  },
                  {
                    icon: <Zap className="h-6 w-6 text-primary" />,
                    title: "Trend Analysis",
                    description: "Stay ahead of fashion trends with our AI that constantly analyzes the latest styles and seasonal changes."
                  }
                ].map((feature, i) => (
                  <div 
                    key={i}
                    className={`p-6 rounded-xl bg-card border border-border/50 hover:border-primary/20 space-y-4 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl ${
                      loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          <section className="py-20 px-6 md:px-10 bg-gradient-to-br from-background via-primary/5 to-background">
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
                      <Button className="bg-primary hover:bg-primary/90 rounded-full px-6 py-2 text-base transition-all flex items-center gap-2 group">
                        Find Today's Perfect Outfit
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-xl relative overflow-hidden">
                  <div className="aspect-[4/3] rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1536593998369-f0d25ed0fb1d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200" 
                      alt="Weather-based outfit recommendation" 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                      <div className="flex flex-col items-center">
                        <Cloud className="h-6 w-6 text-primary mb-1" />
                        <span className="text-xs font-medium">72°F</span>
                        <span className="text-xs">Sunny</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section id="how-it-works" className="py-20 px-6 md:px-10 bg-gradient-to-t from-secondary/20 to-background">
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
                <div className="hidden md:block absolute top-16 left-[calc(16.67%-8px)] right-[calc(16.67%-8px)] h-0.5 bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20" />
                
                {[
                  {
                    step: "01",
                    title: "Create Your Profile",
                    description: "Answer questions about your style preferences, body type, and wardrobe needs.",
                    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
                  },
                  {
                    step: "02",
                    title: "AI Analysis",
                    description: "Our AI analyzes your inputs alongside fashion trends and style principles.",
                    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
                  },
                  {
                    step: "03",
                    title: "Get Recommendations",
                    description: "Receive personalized outfit suggestions tailored to your unique style.",
                    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
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
                      <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10 relative shadow-lg">
                        <span className="font-bold">{step.step}</span>
                      </div>
                    </div>
                    <div className="rounded-xl overflow-hidden aspect-square mb-4">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <h3 className="text-xl font-medium">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          <RecommendationForm />
          
          <section className="py-20 px-6 md:px-10 bg-gradient-to-b from-secondary/30 to-background">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <p className="text-primary/80 text-sm md:text-base font-medium tracking-wider uppercase">
                  Style Showcase
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Curated Outfit Examples
                  </span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore some of our AI-generated outfit recommendations.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {SAMPLE_OUTFITS.map((outfit, index) => (
                  <div 
                    key={index} 
                    className={`overflow-hidden transition-all duration-500 bg-card text-card-foreground rounded-lg shadow-lg hover:shadow-xl card-hover ${
                      loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <img 
                        src={outfit.image} 
                        alt={`${outfit.style} outfit for ${outfit.occasion}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <div className="bg-white/90 dark:bg-black/70 text-primary dark:text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                          {outfit.style}
                        </div>
                        <div className="bg-white/90 dark:bg-black/70 text-primary dark:text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                          {outfit.occasion}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2">{outfit.style} • {outfit.occasion}</h3>
                      <p className="text-muted-foreground text-sm">{outfit.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full flex items-center gap-1"
                          onClick={() => toggleLike(index)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${likedOutfits[index] ? 'fill-primary text-primary' : ''} transition-all`} 
                          />
                          {likedOutfits[index] ? 'Saved' : 'Save'}
                        </Button>
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
      </motion.div>
    </>
  );
};

export default Index;
