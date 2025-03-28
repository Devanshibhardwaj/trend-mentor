import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Cloud, ChevronDown, Star, Wand2, Calendar } from "lucide-react";
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };
    
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Scroll to the features section when the user clicks the "Learn More" button
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate movement for parallax effect
  const calculateTransform = (depth: number) => {
    const moveX = (mousePosition.x - 0.5) * depth;
    const moveY = (mousePosition.y - 0.5) * depth;
    return `translate(${moveX}px, ${moveY}px)`;
  };

  return (
    <section 
      ref={heroRef} 
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background: "linear-gradient(135deg, #4338ca 0%, #3730a3 100%)"
      }}
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000')] bg-cover bg-center opacity-5"></div>
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-400/30 blur-3xl"></div>
        <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl"></div>
        
        {/* Animated light particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/40 animate-ping"
            style={{
              width: `${Math.random() * 12 + 4}px`,
              height: `${Math.random() * 12 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 8 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.7
            }}
          ></div>
        ))}
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-tl from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid gap-12 items-center md:grid-cols-2">
          <div className="flex flex-col gap-8 text-center md:text-left">
            <div className={cn(
              "space-y-6 transition-all duration-700 transform",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mx-auto md:mx-0">
                <div className="bg-indigo-500/20 p-1.5 rounded-full relative overflow-hidden group">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                </div>
                <span className="text-sm font-medium text-white/80">
                  AI-Powered Style Assistant
                </span>
              </div>
              
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
                Discover Your{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Perfect Style
                  </span>
                </span>{" "}
                with AI
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-md mx-auto md:mx-0">
                StyleSage AI analyzes your preferences and current trends to create
                personalized outfit recommendations that boost your confidence.
              </p>
            </div>
            
            <div className={cn(
              "flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 transition-all duration-700 delay-200 transform",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <Link to="/weather-styling">
                <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg px-6 py-6 text-base shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 group transition-all duration-300">
                  <Cloud className="h-4 w-4 group-hover:animate-bounce" />
                  <span className="relative overflow-hidden">
                    Today's Outfit Recommendation
                  </span>
                </Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button variant="outline" className="rounded-lg px-6 py-6 text-base border-white/20 text-white hover:bg-white/10 transition-all group">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  Create Your Style Profile
                </Button>
              </Link>
            </div>
            
            <div 
              className={cn(
                "flex justify-center md:justify-start transition-all duration-700 delay-500 opacity-0",
                loaded && "opacity-100"
              )}
            >
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 text-white/70 mt-4 hover:text-white hover:bg-white/10" 
                onClick={scrollToFeatures}
              >
                Learn how it works
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </Button>
            </div>
          </div>
          
          <div className={cn(
            "relative transition-all duration-1000 delay-500 transform",
            loaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          )}
            style={{ transform: loaded ? calculateTransform(-15) : 'none' }}
          >
            {/* Main feature image */}
            <div className="relative mx-auto md:mx-0 max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-blue-500/20 to-teal-500/30 rounded-2xl blur-2xl -z-10 transform rotate-6 scale-105"></div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1500"
                  alt="Stylish outfit recommendation"
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white font-medium">
                  AI Recommendation
                </div>
              </div>
            </div>
            
            {/* Floating elements with parallax effect */}
            <div 
              className="absolute -right-6 top-1/4 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 shadow-lg z-20 max-w-[140px] transform rotate-3 transition-transform duration-300 hover:rotate-0"
              style={{ transform: `${calculateTransform(-25)} rotate(3deg)` }}
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-500/20 rounded-full">
                  <Cloud className="h-4 w-4 text-blue-400" />
                </div>
                <p className="text-xs font-medium text-white">Weather-based styles</p>
              </div>
            </div>
            
            <div 
              className="absolute -left-6 bottom-1/4 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 shadow-lg z-20 max-w-[140px] transform -rotate-3 transition-transform duration-300 hover:rotate-0"
              style={{ transform: `${calculateTransform(-20)} rotate(-3deg)` }}
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-500/20 rounded-full">
                  <Calendar className="h-4 w-4 text-indigo-400" />
                </div>
                <p className="text-xs font-medium text-white">Event styling</p>
              </div>
            </div>
            
            <div 
              className="absolute right-1/4 -bottom-4 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 shadow-lg z-20 max-w-[140px] transform rotate-6 transition-transform duration-300 hover:rotate-0"
              style={{ transform: `${calculateTransform(-15)} rotate(6deg)` }}
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-teal-500/20 rounded-full">
                  <Wand2 className="h-4 w-4 text-teal-400" />
                </div>
                <p className="text-xs font-medium text-white">Smart style tips</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
