
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Cloud, ChevronDown, MessageCircle, Shirt, Wand, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from 'framer-motion';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [feedback, setFeedback] = useState("");
  const [weather, setWeather] = useState({ temp: '72°F', condition: 'Sunny' });
  const [outfitPreview, setOutfitPreview] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Sample outfit previews that will change periodically
  const outfitPreviews = [
    "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1500",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1500",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1500",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1500"
  ];
  
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
    
    // Simulate weather updates based on time of day
    const hour = new Date().getHours();
    if (hour < 6) {
      setWeather({ temp: '62°F', condition: 'Clear' });
    } else if (hour < 12) {
      setWeather({ temp: '68°F', condition: 'Sunny' });
    } else if (hour < 18) {
      setWeather({ temp: '74°F', condition: 'Partly Cloudy' });
    } else {
      setWeather({ temp: '66°F', condition: 'Clear Night' });
    }
    
    // Periodically change outfit preview
    const outfitInterval = setInterval(() => {
      setOutfitPreview(prev => (prev + 1) % outfitPreviews.length);
    }, 5000);
    
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
      clearInterval(outfitInterval);
    };
  }, [outfitPreviews.length]);

  // Calculate movement for parallax effect
  const calculateTransform = (depth: number) => {
    const moveX = (mousePosition.x - 0.5) * depth;
    const moveY = (mousePosition.y - 0.5) * depth;
    return `translate(${moveX}px, ${moveY}px)`;
  };

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", feedback);
    toast({
      title: "Feedback Received",
      description: "Thank you for your feedback!",
    });
    setFeedback("");
  };

  // Apply different background styles based on theme
  const isLightTheme = theme === "sunset" || theme === "forest" || theme === "system";

  return (
    <section 
      ref={heroRef} 
      className="relative overflow-hidden py-20 lg:py-28"
    >
      {/* Dynamic background with cinemagraph effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: isLightTheme ? 
            'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000)' : 
            'url(https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000)'
        }}
      >
        <div className="absolute inset-0 backdrop-blur-sm" style={{
          background: isLightTheme ? 
            'linear-gradient(135deg, rgba(255,246,235,0.95) 0%, rgba(255,249,240,0.85) 100%)' : 
            'linear-gradient(135deg, rgba(18,18,18,0.95) 0%, rgba(0,0,0,0.85) 100%)'
        }}></div>
      </div>
      
      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating fashion elements */}
        <motion.div 
          className="absolute top-[10%] left-[5%] w-16 h-16 rounded-full"
          animate={{ 
            y: [0, -20, 0], 
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          style={{
            background: isLightTheme ? 
              'linear-gradient(45deg, rgba(255,190,111,0.7), rgba(255,121,154,0.7))' : 
              'linear-gradient(45deg, rgba(60,60,100,0.7), rgba(120,60,180,0.7))',
            boxShadow: isLightTheme ? 
              '0 10px 30px rgba(255,121,154,0.3)' : 
              '0 10px 30px rgba(120,60,180,0.3)',
            filter: 'blur(1px)'
          }}
        />
        
        <motion.div 
          className="absolute top-[30%] right-[8%] w-24 h-24 rounded-full"
          animate={{ 
            y: [0, 30, 0], 
            rotate: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          style={{
            background: isLightTheme ? 
              'linear-gradient(45deg, rgba(255,170,159,0.7), rgba(255,215,148,0.7))' : 
              'linear-gradient(45deg, rgba(80,70,120,0.7), rgba(60,130,190,0.7))',
            boxShadow: isLightTheme ? 
              '0 10px 30px rgba(255,170,159,0.3)' : 
              '0 10px 30px rgba(60,130,190,0.3)',
            filter: 'blur(2px)'
          }}
        />
        
        <motion.div 
          className="absolute bottom-[20%] left-[15%] w-20 h-20 rounded-full"
          animate={{ 
            y: [0, -25, 0], 
            rotate: [0, 20, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ 
            duration: 7,
            delay: 2,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          style={{
            background: isLightTheme ? 
              'linear-gradient(45deg, rgba(159,255,203,0.7), rgba(148,229,255,0.7))' : 
              'linear-gradient(45deg, rgba(90,50,130,0.7), rgba(140,80,170,0.7))',
            boxShadow: isLightTheme ? 
              '0 10px 30px rgba(148,229,255,0.3)' : 
              '0 10px 30px rgba(140,80,170,0.3)',
            filter: 'blur(1.5px)'
          }}
        />
        
        {/* Ambient lights */}
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-60 blur-3xl"
          style={{
            background: isLightTheme ? 
              'radial-gradient(circle, rgba(255,190,111,0.6) 0%, rgba(255,121,154,0) 70%)' : 
              'radial-gradient(circle, rgba(120,60,180,0.6) 0%, rgba(60,60,100,0) 70%)'
          }}
        />
        
        <div className="absolute top-40 -left-40 h-96 w-96 rounded-full opacity-60 blur-3xl"
          style={{
            background: isLightTheme ? 
              'radial-gradient(circle, rgba(255,215,148,0.6) 0%, rgba(255,170,159,0) 70%)' : 
              'radial-gradient(circle, rgba(60,130,190,0.6) 0%, rgba(80,70,120,0) 70%)'
          }}
        />
        
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full opacity-60 blur-3xl"
          style={{
            background: isLightTheme ? 
              'radial-gradient(circle, rgba(148,229,255,0.6) 0%, rgba(159,255,203,0) 70%)' : 
              'radial-gradient(circle, rgba(140,80,170,0.6) 0%, rgba(90,50,130,0) 70%)'
          }}
        />
        
        {/* Animated stars/sparkles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: isLightTheme ? 'rgba(255,190,111,0.8)' : 'rgba(255,255,255,0.8)',
              boxShadow: isLightTheme ? 
                '0 0 8px 2px rgba(255,190,111,0.5)' : 
                '0 0 8px 2px rgba(255,255,255,0.5)'
            }}
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      <div className="container relative z-10">
        <div className="grid gap-12 items-center md:grid-cols-2">
          <div className="flex flex-col gap-8 text-center md:text-left">
            <div className={cn(
              "space-y-6 transition-all duration-700 transform",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              {/* Premium Badge */}
              <motion.div 
                className={`inline-flex items-center gap-2 ${isLightTheme ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20' : 'bg-gradient-to-r from-purple-500/20 to-blue-500/20'} px-4 py-2 rounded-full backdrop-blur-sm mx-auto md:mx-0`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`${isLightTheme ? 'bg-gradient-to-r from-orange-100 to-pink-100' : 'bg-gradient-to-r from-purple-900 to-blue-900'} p-1.5 rounded-full relative overflow-hidden`}>
                  <Shirt className={`h-4 w-4 ${isLightTheme ? 'text-orange-500' : 'text-purple-400'}`} />
                </div>
                <span className={`text-sm font-medium ${isLightTheme ? 'bg-gradient-to-r from-orange-800 to-pink-800 bg-clip-text text-transparent' : 'bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent'}`}>
                  AI-Powered Style Evolution
                </span>
              </motion.div>
              
              <motion.h1 
                className={`font-bold text-4xl md:text-5xl lg:text-6xl leading-tight ${isLightTheme ? 'text-gray-800' : 'text-white'}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Your Style, 
                <motion.span 
                  className="block relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  <motion.span 
                    className={`bg-gradient-to-r ${isLightTheme ? 'from-orange-600 via-pink-500 to-purple-600' : 'from-purple-400 via-blue-500 to-teal-400'} bg-clip-text text-transparent`}
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    Elevated by AI
                  </motion.span>
                </motion.span>
              </motion.h1>

              {/* Dynamic tagline */}
              <motion.p 
                className={`${isLightTheme ? 'text-gray-700 text-xl font-semibold' : 'text-white/90 text-xl font-semibold'} max-w-md mx-auto md:mx-0`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Your Personal Stylist for Every Moment
              </motion.p>

              <motion.p 
                className={`${isLightTheme ? 'text-gray-700' : 'text-white/70'} text-base md:text-lg max-w-md mx-auto md:mx-0`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                StyleSage AI learns your preferences and adapts to your evolving taste, creating personalized looks that express your unique identity.
              </motion.p>
            </div>
            
            <motion.div 
              className={cn(
                "flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 transition-all"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Link to="/weather-styling">
                <Button className={`${isLightTheme ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'} rounded-lg px-6 py-6 text-base shadow-lg hover:shadow-xl hover:-translate-y-1 group transition-all duration-300 text-white`}>
                  <Wand className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                  <span className="relative overflow-hidden">
                    Style Me Now
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button variant="outline" className={`rounded-lg px-6 py-6 text-base border-2 ${isLightTheme ? 'border-orange-300 hover:border-orange-400 text-orange-700 hover:bg-orange-100/20' : 'border-purple-500 hover:border-purple-400 text-white hover:bg-white/10'} transition-all group`}>
                  <Sparkles className={`h-4 w-4 mr-2 ${isLightTheme ? 'text-orange-500' : 'text-purple-400'} group-hover:scale-110 transition-transform`} />
                  Get My Vibe
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Button 
                variant="ghost" 
                className={`flex items-center gap-2 ${isLightTheme ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50' : 'text-white/70 hover:text-white hover:bg-white/10'} mt-4`}
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                See the magic
                <motion.div
                  animate={{
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                  }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ transform: loaded ? calculateTransform(-15) : 'none' }}
          >
            {/* Premium showcase visualization */}
            <div className="relative mx-auto md:mx-0 max-w-md">
              <motion.div 
                className="absolute -top-4 -left-4 z-30 px-4 py-2 rounded-lg shadow-lg"
                initial={{ x: -20, rotate: -6, opacity: 0 }}
                animate={{ x: 0, rotate: -6, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                style={{
                  background: isLightTheme ? 
                    'linear-gradient(45deg, #ff7e5f, #feb47b)' : 
                    'linear-gradient(45deg, #4776E6, #8E54E9)'
                }}
              >
                <span className="font-bold text-sm text-white">Live Style Preview</span>
              </motion.div>
              
              {/* Fashion Preview Card with Animation */}
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0px 10px 30px rgba(0, 0, 0, 0.1)',
                      '0px 20px 40px rgba(0, 0, 0, 0.2)',
                      '0px 10px 30px rgba(0, 0, 0, 0.1)'
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                ></motion.div>
                
                <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                  <motion.div
                    className="relative"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                  >
                    <motion.img
                      key={outfitPreview}
                      src={outfitPreviews[outfitPreview]}
                      alt="Stylish outfit recommendation"
                      className="w-full h-auto object-cover aspect-[3/4]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute top-4 right-4 px-3 py-2 rounded-full text-xs text-white font-medium flex items-center gap-2"
                    style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(8px)'
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Cloud className="h-3 w-3" />
                    <span>{weather.temp} • {weather.condition}</span>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Interactive floating elements with parallax effect */}
            <motion.div 
              className="absolute -right-6 top-1/4 backdrop-blur-xl p-4 rounded-lg shadow-lg z-20 max-w-[140px]"
              style={{ 
                transform: `${calculateTransform(-25)} rotate(3deg)`,
                background: isLightTheme ? 
                  'rgba(255, 255, 255, 0.7)' : 
                  'rgba(30, 30, 40, 0.7)',
                border: isLightTheme ?
                  '1px solid rgba(255, 255, 255, 0.3)' :
                  '1px solid rgba(255, 255, 255, 0.1)'
              }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${isLightTheme ? 'bg-orange-100' : 'bg-gray-800'}`}>
                  <Cloud className={`h-4 w-4 ${isLightTheme ? 'text-orange-500' : 'text-blue-400'}`} />
                </div>
                <p className={`text-xs font-medium ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>Weather-responsive styles</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -left-6 bottom-1/4 backdrop-blur-xl p-4 rounded-lg shadow-lg z-20 max-w-[140px]"
              style={{ 
                transform: `${calculateTransform(-20)} rotate(-3deg)`,
                background: isLightTheme ? 
                  'rgba(255, 255, 255, 0.7)' : 
                  'rgba(30, 30, 40, 0.7)',
                border: isLightTheme ?
                  '1px solid rgba(255, 255, 255, 0.3)' :
                  '1px solid rgba(255, 255, 255, 0.1)'
              }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${isLightTheme ? 'bg-orange-100' : 'bg-gray-800'}`}>
                  <Sparkles className={`h-4 w-4 ${isLightTheme ? 'text-orange-500' : 'text-purple-400'}`} />
                </div>
                <p className={`text-xs font-medium ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>AI-curated selection</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute right-1/4 -bottom-4 backdrop-blur-xl p-4 rounded-lg shadow-lg z-20 max-w-[140px]"
              style={{ 
                transform: `${calculateTransform(-15)} rotate(6deg)`,
                background: isLightTheme ? 
                  'rgba(255, 255, 255, 0.7)' : 
                  'rgba(30, 30, 40, 0.7)',
                border: isLightTheme ?
                  '1px solid rgba(255, 255, 255, 0.3)' :
                  '1px solid rgba(255, 255, 255, 0.1)'
              }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${isLightTheme ? 'bg-orange-100' : 'bg-gray-800'}`}>
                  <Zap className={`h-4 w-4 ${isLightTheme ? 'text-orange-500' : 'text-yellow-400'}`} />
                </div>
                <p className={`text-xs font-medium ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>Express your unique style</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Feedback button - fixed in the bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="icon" 
              className={`rounded-full h-12 w-12 shadow-lg shadow-black/20 ${
                isLightTheme 
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
              }`}
            >
              <MessageCircle className="h-5 w-5 text-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Send Feedback</DialogTitle>
              <DialogDescription>
                We'd love to hear your thoughts about our service.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Share your feedback with us..."
                className="min-h-[120px]"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button 
                className={`w-full ${
                  isLightTheme 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                } text-white`}
                onClick={handleFeedbackSubmit}
                disabled={!feedback.trim()}
              >
                Submit Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Hero;
