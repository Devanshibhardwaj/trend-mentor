import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sparkles, Star, ArrowRight, Heart, Search } from "lucide-react";
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
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [feedback, setFeedback] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Sample outfit previews that will change periodically
  const heroImages = [
    "https://images.unsplash.com/photo-1523380677598-64d85d4f4030?q=80&w=2000",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=2000",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2000",
  ];

  const testimonials = [
    {
      quote: "I've never felt this confident in my outfit choices before!",
      name: "Alex Kim",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150"
    },
    {
      quote: "This AI stylist understands my vibe better than my friends do.",
      name: "Jordan Taylor",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
    },
    {
      quote: "Finally found my style identity after years of fashion confusion!",
      name: "Morgan Lee",
      role: "Graphic Designer",
      image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=150"
    }
  ];
  
  const brandLogos = [
    "https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=150",
    "https://images.unsplash.com/photo-1583744946564-b52d01a7f418?q=80&w=150",
    "https://images.unsplash.com/photo-1616740540792-3daec604777d?q=80&w=150",
    "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=150"
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
    
    // Rotate through testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
      clearInterval(testimonialInterval);
    };
  }, [testimonials.length]);

  // Calculate movement for parallax effect
  const calculateTransform = (depth: number) => {
    const moveX = (mousePosition.x - 0.5) * depth;
    const moveY = (mousePosition.y - 0.5) * depth;
    return `translate(${moveX}px, ${moveY}px)`;
  };

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
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
      {/* Dynamic background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${heroImages[0]})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0" style={{
          background: isLightTheme ? 
            'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,255,0.85) 100%)' : 
            'linear-gradient(135deg, rgba(20,20,40,0.95) 0%, rgba(20,20,40,0.85) 100%)'
        }}></div>
      </div>
      
      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Abstract shape 1 */}
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
              'linear-gradient(45deg, rgba(180,180,255,0.7), rgba(200,140,255,0.7))' : 
              'linear-gradient(45deg, rgba(80,80,180,0.7), rgba(140,80,200,0.7))',
            boxShadow: isLightTheme ? 
              '0 10px 30px rgba(180,180,255,0.3)' : 
              '0 10px 30px rgba(140,80,200,0.3)',
            filter: 'blur(1px)'
          }}
        />
        
        {/* Abstract shape 2 */}
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
              'linear-gradient(45deg, rgba(140,210,200,0.7), rgba(170,200,230,0.7))' : 
              'linear-gradient(45deg, rgba(60,130,120,0.7), rgba(60,100,170,0.7))',
            boxShadow: isLightTheme ? 
              '0 10px 30px rgba(140,210,200,0.3)' : 
              '0 10px 30px rgba(60,100,170,0.3)',
            filter: 'blur(2px)'
          }}
        />
        
        {/* Abstract shape 3 */}
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
              'linear-gradient(45deg, rgba(255,180,200,0.7), rgba(255,200,170,0.7))' : 
              'linear-gradient(45deg, rgba(180,80,110,0.7), rgba(180,90,80,0.7))',
            boxShadow: isLightTheme ? 
              '0 10px 30px rgba(255,180,200,0.3)' : 
              '0 10px 30px rgba(180,80,110,0.3)',
            filter: 'blur(1.5px)'
          }}
        />
        
        {/* Ambient lights */}
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-60 blur-3xl"
          style={{
            background: isLightTheme ? 
              'radial-gradient(circle, rgba(180,180,255,0.6) 0%, rgba(200,140,255,0) 70%)' : 
              'radial-gradient(circle, rgba(80,80,180,0.6) 0%, rgba(140,80,200,0) 70%)'
          }}
        />
        
        <div className="absolute top-40 -left-40 h-96 w-96 rounded-full opacity-60 blur-3xl"
          style={{
            background: isLightTheme ? 
              'radial-gradient(circle, rgba(140,210,200,0.6) 0%, rgba(170,200,230,0) 70%)' : 
              'radial-gradient(circle, rgba(60,130,120,0.6) 0%, rgba(60,100,170,0) 70%)'
          }}
        />
        
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full opacity-60 blur-3xl"
          style={{
            background: isLightTheme ? 
              'radial-gradient(circle, rgba(255,180,200,0.6) 0%, rgba(255,200,170,0) 70%)' : 
              'radial-gradient(circle, rgba(180,80,110,0.6) 0%, rgba(180,90,80,0) 70%)'
          }}
        />
      </div>
      
      <div className="container relative z-10">
        <div className="grid gap-12 items-center md:grid-cols-12">
          <div className="flex flex-col gap-8 text-center md:text-left md:col-span-6">
            <div className={cn(
              "space-y-6 transition-all duration-700 transform",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              {/* Premium Badge */}
              <motion.div 
                className={`inline-flex items-center gap-2 ${isLightTheme ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20' : 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20'} px-4 py-2 rounded-full backdrop-blur-sm mx-auto md:mx-0`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`${isLightTheme ? 'bg-gradient-to-r from-indigo-100 to-purple-100' : 'bg-gradient-to-r from-indigo-900 to-purple-900'} p-1.5 rounded-full relative overflow-hidden`}>
                  <Sparkles className={`h-4 w-4 ${isLightTheme ? 'text-indigo-500' : 'text-indigo-400'}`} />
                </div>
                <span className={`text-sm font-medium ${isLightTheme ? 'bg-gradient-to-r from-indigo-800 to-purple-800 bg-clip-text text-transparent' : 'bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent'}`}>
                  AI-Powered Fashion
                </span>
              </motion.div>
              
              <motion.h1 
                className={`font-bold text-4xl md:text-5xl lg:text-6xl leading-tight ${isLightTheme ? 'text-gray-800' : 'text-white'}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Your AI Stylist is Here — 
                <motion.span 
                  className="block relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  <motion.span 
                    className={`bg-gradient-to-r ${isLightTheme ? 'from-indigo-600 via-purple-500 to-teal-600' : 'from-indigo-400 via-purple-500 to-teal-400'} bg-clip-text text-transparent`}
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    Find Your Perfect Look
                  </motion.span>
                </motion.span>
              </motion.h1>

              <motion.p 
                className={`${isLightTheme ? 'text-gray-700' : 'text-white/70'} text-lg md:text-xl max-w-lg mx-auto md:mx-0`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                We help you discover, match, and shop outfits that reflect your unique vibe. From streetwear to formal, casual to couture—styled just for you.
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
              <Link to="/auth?tab=register">
                <Button className={`${isLightTheme ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'} rounded-lg px-6 py-6 text-base shadow-lg hover:shadow-xl hover:-translate-y-1 group transition-all duration-300 text-white`}>
                  <span className="relative overflow-hidden">
                    Get Started Now
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 opacity-100 group-hover:translate-x-1 transition-all" />
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="outline" className={`rounded-lg px-6 py-6 text-base border-2 ${isLightTheme ? 'border-indigo-300 hover:border-indigo-400 text-indigo-700 hover:bg-indigo-100/20' : 'border-indigo-500 hover:border-indigo-400 text-white hover:bg-white/10'} transition-all group`}>
                  <Search className={`h-4 w-4 mr-2 ${isLightTheme ? 'text-indigo-500' : 'text-indigo-400'} group-hover:scale-110 transition-transform`} />
                  Browse Styles
                </Button>
              </Link>
            </motion.div>
            
            {/* Trusted By Section */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <p className={`text-sm mb-4 ${isLightTheme ? 'text-gray-500' : 'text-gray-400'}`}>Loved by 10,000+ users</p>
              <div className="flex items-center justify-center md:justify-start space-x-6 opacity-70">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="h-10 w-16 bg-gray-100 rounded"
                    whileHover={{ scale: 1.05 }}
                    style={{
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage: `url(${brandLogos[i-1]})`
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Image Showcase */}
          <motion.div 
            className="md:col-span-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ transform: loaded ? calculateTransform(-15) : 'none' }}
          >
            <div className="grid grid-cols-10 gap-4">
              <div className="col-span-6 space-y-4">
                <motion.div 
                  className="overflow-hidden rounded-2xl aspect-[4/5] relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1523380677598-64d85d4f4030?q=80&w=1000" 
                    alt="Stylish outfit" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                    Modern Elegance
                  </div>
                </motion.div>
                <motion.div 
                  className="overflow-hidden rounded-2xl aspect-[3/2] relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000" 
                    alt="Stylish outfit" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                    Urban Casual
                  </div>
                </motion.div>
              </div>
              <div className="col-span-4 space-y-4">
                <motion.div 
                  className="overflow-hidden rounded-2xl aspect-[3/4] relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000" 
                    alt="Stylish outfit" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                    Street Style
                  </div>
                </motion.div>
                <motion.div 
                  className="overflow-hidden rounded-2xl aspect-[1/1] relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000" 
                    alt="Stylish outfit" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                    Evening Chic
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Testimonial Section */}
        <motion.div
          className="mt-24 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className={`absolute -top-10 left-1/2 -translate-x-1/2 text-6xl opacity-20 ${isLightTheme ? 'text-indigo-300' : 'text-indigo-700'}`}>
            "
          </div>
          <div className="max-w-3xl mx-auto text-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <p className={`text-xl md:text-2xl leading-relaxed ${isLightTheme ? 'text-gray-700' : 'text-white/80'}`}>
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="flex items-center justify-center space-x-4 mt-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={testimonials[activeTestimonial].image} 
                      alt={testimonials[activeTestimonial].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>{testimonials[activeTestimonial].name}</p>
                    <p className={`text-sm ${isLightTheme ? 'text-gray-500' : 'text-gray-400'}`}>{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeTestimonial ? 
                    (isLightTheme ? 'bg-indigo-500' : 'bg-indigo-400') : 
                    (isLightTheme ? 'bg-gray-300' : 'bg-gray-700')
                  }`}
                  onClick={() => setActiveTestimonial(i)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feedback button - fixed in the bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="icon" 
              className={`rounded-full h-12 w-12 shadow-lg shadow-black/20 ${
                isLightTheme 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
              }`}
            >
              <Heart className="h-5 w-5 text-white" />
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
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
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
