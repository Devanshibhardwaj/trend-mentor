
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Cloud, ChevronDown } from "lucide-react";
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Scroll to the features section when the user clicks the "Learn More" button
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/10 to-background py-24 md:py-32">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className={cn(
              "space-y-4 transition-all duration-700 transform",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <span className="text-sm font-medium uppercase tracking-wider bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Personalized Style AI</span>
              </div>
              
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
                Discover Your{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary/70 bg-clip-text text-transparent">
                  Perfect Style
                </span>{" "}
                with AI
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-md">
                StyleSage AI analyzes your preferences, body type, and current trends to create
                personalized outfit recommendations that boost your confidence.
              </p>
            </div>
            
            <div className={cn(
              "flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 delay-200 transform",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <Link to="/weather-styling">
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 text-base pulse-animation transition-all flex items-center gap-2 shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                  <Cloud className="h-4 w-4" />
                  Try Today's Outfit Recommendation
                </Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button variant="outline" className="rounded-full px-8 py-6 text-base flex items-center gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5">
                  <Zap className="h-4 w-4" />
                  Create Your Style Profile
                </Button>
              </Link>
            </div>
            
            <div 
              className={cn(
                "flex justify-center sm:justify-start transition-all duration-700 delay-500 opacity-0",
                loaded && "opacity-100"
              )}
            >
              <Button 
                variant="ghost" 
                className="flex items-center gap-1 text-muted-foreground mt-8 hover:text-primary hover:bg-transparent" 
                onClick={scrollToFeatures}
              >
                Learn how it works
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </Button>
            </div>
            
            <div className={cn(
              "grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-300 transform",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              {["Smart Recommendations", "Weather-Based", "Occasion Styling", "Color Analysis"].map((feature, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "bg-card rounded-lg p-3 text-center border border-border/40 transition-all duration-300",
                    "hover:border-primary/20 hover:bg-primary/5 hover:-translate-y-1 hover:shadow-md"
                  )}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <p className="text-sm font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className={cn(
            "relative transition-all duration-1000 delay-500 transform",
            loaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          )}>
            <div className="absolute -left-1/4 top-1/4 h-48 w-48 rounded-full bg-primary/10 blur-3xl filter" />
            <div className="absolute -bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-accent/10 blur-3xl filter" />
            
            {/* Replace the placeholder with a real image */}
            <div className="relative overflow-hidden rounded-2xl border border-border/50 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background/80 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
                alt="AI Style Recommendation"
                className="h-auto w-full object-cover z-0 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-black/40 text-white text-sm z-20">
                <div className="flex items-center justify-between">
                  <span>Daily outfit recommendation based on your style</span>
                  <Badge className="bg-white/20 hover:bg-white/30">AI-Powered</Badge>
                </div>
              </div>
            </div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute -right-4 -top-4 bg-card p-4 rounded-lg border border-border/50 shadow-lg rotate-6 z-20 max-w-[140px]">
              <p className="text-xs font-medium">Weather-based recommendations</p>
            </div>
            <div className="absolute -left-6 -bottom-6 bg-card p-4 rounded-lg border border-border/50 shadow-lg -rotate-3 z-20 max-w-[140px]">
              <p className="text-xs font-medium">Color coordination advice</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

// We need to import Badge
import { Badge } from '@/components/ui/badge';
