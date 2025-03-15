
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-secondary/30 py-24 md:py-32">
      <div className="container relative z-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
                AI-Powered Style Recommendations
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Revolutionize your wardrobe with our AI-driven platform. Get personalized outfit
                suggestions tailored to your unique style, mood, and the weather.
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <Link to="/weather-styling">
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 text-base transition-all">
                  Get Your Outfit Recommendation Now
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" className="rounded-full px-8 py-6 text-base">
                  Create an Account
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-1/4 top-1/4 h-48 w-48 rounded-full bg-primary/20 blur-xl filter" />
            <div className="absolute -bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-accent/20 blur-xl filter" />
            <div className="relative overflow-hidden rounded-xl">
              <img
                src="/placeholder-image.svg"
                alt="Placeholder Image"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
