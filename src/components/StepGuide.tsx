
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  CheckCircle2, 
  Upload, 
  Sparkles, 
  Cloud, 
  Palette, 
  ShoppingBag,
  Calendar,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    title: "Welcome to StyleSage!",
    description: "We're excited to help you discover your perfect style. Let's take a quick tour of what you can do here.",
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
  },
  {
    title: "Upload Your Wardrobe",
    description: "Start by adding items from your wardrobe. This helps our AI understand your style preferences and create better recommendations.",
    icon: <Upload className="h-8 w-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
  },
  {
    title: "Get Weather-Based Recommendations",
    description: "StyleSage checks the local weather and suggests perfect outfits for the day. Never be under or overdressed again!",
    icon: <Cloud className="h-8 w-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
  },
  {
    title: "Explore Color Matching",
    description: "Our color analysis tool helps you create harmonious outfits. Discover complementary colors that enhance your look.",
    icon: <Palette className="h-8 w-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1473621038790-b778b4750efe?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
  },
  {
    title: "Occasion-Based Styling",
    description: "Whether it's a job interview, date night, or casual outing, get tailored recommendations for every occasion.",
    icon: <Calendar className="h-8 w-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1593814681685-5fe3499324e5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
  },
  {
    title: "You're All Set!",
    description: "You're ready to explore StyleSage. Feel free to visit the Help section if you have any questions.",
    icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
  }
];

const StepGuide = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Show the guide when the user logs in
  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('hasSeenGuide');
    
    if (user && !hasSeenGuide) {
      // Wait a bit before showing the guide for better UX
      const timer = setTimeout(() => {
        setShowGuide(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [user]);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      handleClose();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };
  
  const handleClose = () => {
    setShowGuide(false);
    localStorage.setItem('hasSeenGuide', 'true');
    toast({
      title: "Tutorial completed!",
      description: "You can find more help in the Settings menu if needed.",
    });
  };
  
  const handleSkip = () => {
    handleClose();
    toast({
      title: "Tutorial skipped",
      description: "You can find it again in the Settings menu.",
    });
  };
  
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  return (
    <Dialog open={showGuide} onOpenChange={setShowGuide}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-card">
        <div className="relative w-full h-[200px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
          <img 
            src={currentStepData.image} 
            alt={currentStepData.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute top-4 right-4 z-20">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSkip}
              className="text-white hover:bg-white/20"
            >
              Skip
            </Button>
          </div>
        </div>
        
        <DialogHeader className="px-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              {currentStepData.icon}
            </div>
            <DialogTitle className="text-2xl">{currentStepData.title}</DialogTitle>
          </div>
          <DialogDescription className="text-base mt-2">
            {currentStepData.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 py-4">
          <div className="w-full bg-secondary h-1 rounded-full">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        
        <DialogFooter className="px-6 pb-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          
          <Button onClick={handleNext} className="gap-2">
            {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StepGuide;
