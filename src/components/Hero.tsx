
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/50 -z-10" />
      <div 
        className={cn(
          "absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] -z-10",
          "transition-opacity duration-1000",
          isLoaded ? "opacity-[0.03]" : "opacity-0"
        )} 
      />

      <div className="container px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className={cn("space-y-4", isLoaded ? "animate-fade-up" : "opacity-0")}>
              <p className="text-primary/80 text-sm md:text-base font-medium tracking-wider uppercase">
                AI-Powered Style Solutions
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Elevate Your Wardrobe with Intelligent Style
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-lg">
                Our AI analyzes your preferences, body type, and current trends to create personalized outfit recommendations that perfectly match your unique style.
              </p>
            </div>

            <div className={cn("flex flex-col sm:flex-row gap-4", isLoaded ? "animate-fade-up" : "opacity-0")} style={{ animationDelay: "0.2s" }}>
              <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 text-base">
                Get Recommendations
              </Button>
              <Button variant="outline" className="border-primary/20 hover:bg-secondary rounded-full px-8 py-6 text-base">
                Learn More
              </Button>
            </div>

            <div className={cn("pt-6", isLoaded ? "animate-fade-up" : "opacity-0")} style={{ animationDelay: "0.4s" }}>
              <p className="text-muted-foreground text-sm">
                Trusted by fashion enthusiasts worldwide
              </p>
              <div className="flex items-center gap-6 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-16 h-8 bg-muted rounded-md animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className={cn(
            "relative aspect-square max-w-lg mx-auto w-full rounded-2xl overflow-hidden",
            isLoaded ? "animate-fade-in" : "opacity-0"
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-transparent z-10" />
            <div className="w-full h-full bg-muted rounded-2xl overflow-hidden">
              {/* Placeholder for hero image */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-accent rounded-2xl animate-pulse">
                  <div className="w-full h-full flex items-center justify-center text-accent-foreground/30 text-lg font-medium">
                    Fashion Image
                  </div>
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
