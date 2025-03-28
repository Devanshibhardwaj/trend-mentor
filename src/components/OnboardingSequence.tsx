
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  AlignJustify, 
  Layout, 
  MagicWand, 
  Search, 
  ShoppingBag, 
  Sparkles, 
  UserCircle2, 
  Zap 
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface OnboardingSequenceProps {
  onComplete: () => void;
}

const OnboardingSequence = ({ onComplete }: OnboardingSequenceProps) => {
  const [step, setStep] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkip(true);
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const steps = [
    {
      title: "Welcome to StyleSage",
      description: "Your personal AI-powered fashion assistant",
      icon: <Sparkles className="h-12 w-12 text-white" />,
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1600"
    },
    {
      title: "Change Your Theme",
      description: "Choose from fun, elegant, playful, or cosmic themes to match your mood",
      icon: <MagicWand className="h-12 w-12 text-white" />,
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1600"
    },
    {
      title: "Shop Smart",
      description: "Find the best prices and recommendations for your style preferences",
      icon: <ShoppingBag className="h-12 w-12 text-white" />,
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1600"
    },
    {
      title: "Personalized Outfits",
      description: "Get AI-generated outfit recommendations based on weather, occasion, and your style",
      icon: <Zap className="h-12 w-12 text-white" />,
      image: "https://images.unsplash.com/photo-1614771637369-ea5a465f8d82?q=80&w=1600"
    },
    {
      title: "Explore Features",
      description: "Use the navigation menu to discover all our features",
      icon: <AlignJustify className="h-12 w-12 text-white" />,
      image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1600"
    },
    {
      title: "Ready to Begin?",
      description: "Let's start your style journey!",
      icon: <Layout className="h-12 w-12 text-white" />,
      image: "https://images.unsplash.com/photo-1522682178963-7e3515e7e1af?q=80&w=1600"
    }
  ];
  
  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(prevStep => prevStep + 1);
    } else {
      handleComplete();
    }
  };
  
  const prevStep = () => {
    if (step > 0) {
      setStep(prevStep => prevStep - 1);
    }
  };
  
  const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    onComplete();
  };
  
  const getThemeClass = () => {
    switch(theme) {
      case "fun": return "from-blue-600 to-blue-400";
      case "elegant": return "from-indigo-600 to-indigo-400";
      case "playful": return "from-pink-600 to-pink-400";
      case "cosmic": return "from-purple-600 to-purple-400";
      default: return "from-blue-600 to-blue-400";
    }
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="absolute inset-0 opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.3 }}
      >
        <img 
          src={steps[step].image} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>
      
      <div className="relative z-10 max-w-md w-full mx-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-black/80 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <div className="text-center mb-8">
              <motion.div 
                className={`mx-auto w-20 h-20 mb-6 rounded-full bg-gradient-to-br ${getThemeClass()} flex items-center justify-center`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                {steps[step].icon}
              </motion.div>
              
              <motion.h2 
                className="text-2xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {steps[step].title}
              </motion.h2>
              
              <motion.p 
                className="text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {steps[step].description}
              </motion.p>
            </div>
            
            {step === 1 && (
              <motion.div 
                className="grid grid-cols-2 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-4 rounded-lg text-center">
                  <span className="text-white font-medium">Fun</span>
                </div>
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-400 p-4 rounded-lg text-center">
                  <span className="text-white font-medium">Elegant</span>
                </div>
                <div className="bg-gradient-to-br from-pink-600 to-pink-400 p-4 rounded-lg text-center">
                  <span className="text-white font-medium">Playful</span>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-400 p-4 rounded-lg text-center">
                  <span className="text-white font-medium">Cosmic</span>
                </div>
              </motion.div>
            )}
            
            {step === 3 && (
              <motion.div 
                className="flex justify-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                    <UserCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white/80 text-xs">Profile</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mb-2">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white/80 text-xs">Explore</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-2">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white/80 text-xs">Recommendations</span>
                </div>
              </motion.div>
            )}
            
            <div className="flex items-center justify-between mt-6">
              <Button 
                variant="ghost" 
                onClick={prevStep} 
                disabled={step === 0}
                className="text-white hover:bg-white/10"
              >
                Back
              </Button>
              
              <div className="flex space-x-1">
                {steps.map((_, i) => (
                  <div 
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === step ? 'bg-primary w-4' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              
              <Button 
                onClick={nextStep}
                className="theme-button"
              >
                {step < steps.length - 1 ? 'Next' : 'Start!'}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {showSkip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-4 right-4"
          >
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleComplete}
              className="text-white hover:bg-white/10"
            >
              Skip Tour
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default OnboardingSequence;
