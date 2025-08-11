import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, Wand2, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Luxury background with subtle animation */}
      <div className="absolute inset-0 luxury-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.05)_0%,transparent_50%)]" />
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-16 w-24 h-24 bg-accent/10 rounded-full blur-lg animate-float-slow" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Fashion badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Palette className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Fashion Intelligence</span>
          </motion.div>

          {/* Main heading with fashion typography */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-foreground mb-6">
            Style
            <span className="relative inline-block mx-3">
              <span className="relative z-10 font-normal italic">Sage</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 -skew-x-12 rounded"></span>
            </span>
            AI
          </h1>

          {/* Elegant subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto mb-8">
            Your personal AI stylist creating 
            <span className="relative inline-block mx-2">
              <span className="text-primary font-medium">curated looks</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/30"></span>
            </span>
            tailored to your unique style DNA
          </p>

          {/* CTA buttons with luxury styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button 
              size="lg" 
              className="fashion-button group relative overflow-hidden min-w-[200px]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Create My Style
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transition-transform duration-300 group-hover:scale-110"></div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="min-w-[200px] border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Explore Looks
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            onClick={scrollToFeatures}
            className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-sm font-medium">Discover More</span>
            <ChevronDown className="h-5 w-5 animate-bounce group-hover:scale-110 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23000'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grain)'/%3E%3C/svg%3E")`
        }} />
      </div>
    </section>
  );
}