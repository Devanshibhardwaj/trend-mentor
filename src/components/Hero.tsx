
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Cloud } from "lucide-react";
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-secondary/10 py-24 md:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className={cn(
              "space-y-2 transition-all duration-700 transform",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium uppercase tracking-wider">Personalized Style AI</span>
              </div>
              
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
                AI-Powered{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Style
                </span>{" "}
                Recommendations
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-md">
                Revolutionize your wardrobe with our AI-driven platform. Get personalized outfit
                suggestions tailored to your unique style, mood, and confidence needs.
              </p>
            </div>
            
            <div className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-200 transform",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <Link to="/weather-styling">
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 text-base pulse-animation transition-all flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  Get Your Outfit Recommendation
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" className="rounded-full px-8 py-6 text-base flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Create an Account
                </Button>
              </Link>
            </div>
            
            <div className={cn(
              "mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-300 transform",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              {["Style Tips", "Mood Styling", "Weather-Based", "Confidence Boost"].map((feature, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "bg-background rounded-lg p-3 text-center border border-border/40 transition-all duration-300",
                    "hover:border-primary/20 hover:bg-primary/5"
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
            <div className="relative overflow-hidden rounded-2xl border border-border/50 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background/80 z-10"></div>
              <img
                src="/placeholder.svg"
                alt="Style Recommendation"
                className="h-auto w-full object-cover z-0 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm bg-black/30 text-white text-sm z-20">
                <div className="flex items-center justify-between">
                  <span>Style recommendation powered by AI</span>
                  <Badge className="bg-white/20 hover:bg-white/30">New</Badge>
                </div>
              </div>
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
