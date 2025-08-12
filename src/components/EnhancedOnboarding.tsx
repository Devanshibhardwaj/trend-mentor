import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  User, 
  Palette, 
  ShoppingBag, 
  Target, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  MapPin,
  Calendar,
  Heart,
  Zap,
  Crown,
  Coffee
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserPreferences {
  name: string;
  age: number;
  location: string;
  bodyType: string;
  stylePersonality: string[];
  budget: number;
  occasions: string[];
  colors: string[];
  brands: string[];
  lifestyle: string;
  goals: string[];
}

interface EnhancedOnboardingProps {
  onComplete: (preferences: UserPreferences) => void;
}

const EnhancedOnboarding = ({ onComplete }: EnhancedOnboardingProps) => {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({});
  const { toast } = useToast();

  const totalSteps = 8;

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to StyleSage! ✨',
      subtitle: 'Let\'s create your perfect style profile',
      icon: <Sparkles className="h-8 w-8" />,
      component: WelcomeStep
    },
    {
      id: 'personal',
      title: 'Tell us about yourself',
      subtitle: 'Basic information to personalize your experience',
      icon: <User className="h-8 w-8" />,
      component: PersonalStep
    },
    {
      id: 'body-type',
      title: 'Your Body Type',
      subtitle: 'Help us recommend the most flattering styles',
      icon: <Target className="h-8 w-8" />,
      component: BodyTypeStep
    },
    {
      id: 'style-personality',
      title: 'Style Personality',
      subtitle: 'What describes your fashion sense?',
      icon: <Palette className="h-8 w-8" />,
      component: StylePersonalityStep
    },
    {
      id: 'budget',
      title: 'Budget Preferences',
      subtitle: 'Set your comfort zone for shopping',
      icon: <ShoppingBag className="h-8 w-8" />,
      component: BudgetStep
    },
    {
      id: 'occasions',
      title: 'Occasions & Lifestyle',
      subtitle: 'When do you need outfit inspiration?',
      icon: <Calendar className="h-8 w-8" />,
      component: OccasionsStep
    },
    {
      id: 'colors',
      title: 'Color Preferences',
      subtitle: 'Your favorite colors and combinations',
      icon: <Heart className="h-8 w-8" />,
      component: ColorsStep
    },
    {
      id: 'complete',
      title: 'You\'re all set! 🎉',
      subtitle: 'Your style profile is ready',
      icon: <Crown className="h-8 w-8" />,
      component: CompleteStep
    }
  ];

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const handleComplete = () => {
    const completePreferences: UserPreferences = {
      name: preferences.name || 'Fashion Lover',
      age: preferences.age || 25,
      location: preferences.location || 'India',
      bodyType: preferences.bodyType || 'Regular',
      stylePersonality: preferences.stylePersonality || ['Casual'],
      budget: preferences.budget || 5000,
      occasions: preferences.occasions || ['Casual'],
      colors: preferences.colors || ['Black', 'White'],
      brands: preferences.brands || [],
      lifestyle: preferences.lifestyle || 'Balanced',
      goals: preferences.goals || ['Look good']
    };

    localStorage.setItem('userPreferences', JSON.stringify(completePreferences));
    localStorage.setItem('hasCompletedOnboarding', 'true');
    
    toast({
      title: "Profile Complete! 🎉",
      description: "Your personalized style journey begins now",
    });

    onComplete(completePreferences);
  };

  function WelcomeStep() {
    return (
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white"
        >
          <Sparkles className="h-12 w-12" />
        </motion.div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome to StyleSage</h1>
          <p className="text-muted-foreground">
            Your AI-powered personal stylist that learns your unique style and helps you look amazing every day.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Zap className="h-6 w-6 text-primary mb-2" />
            <div className="text-sm font-medium">AI-Powered</div>
            <div className="text-xs text-muted-foreground">Smart recommendations</div>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Heart className="h-6 w-6 text-primary mb-2" />
            <div className="text-sm font-medium">Personalized</div>
            <div className="text-xs text-muted-foreground">Just for you</div>
          </div>
        </div>
      </div>
    );
  }

  function PersonalStep() {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">What should we call you?</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={preferences.name || ''}
              onChange={(e) => updatePreferences({ name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="age">Age range</Label>
            <RadioGroup
              value={preferences.age?.toString() || ''}
              onValueChange={(value) => updatePreferences({ age: parseInt(value) })}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="20" id="age-20" />
                <Label htmlFor="age-20">16-25</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30" id="age-30" />
                <Label htmlFor="age-30">26-35</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="40" id="age-40" />
                <Label htmlFor="age-40">36-45</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="50" id="age-50" />
                <Label htmlFor="age-50">45+</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="location">Location (for weather-based suggestions)</Label>
            <Input
              id="location"
              placeholder="e.g., Mumbai, Delhi, Bangalore"
              value={preferences.location || ''}
              onChange={(e) => updatePreferences({ location: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    );
  }

  function BodyTypeStep() {
    const bodyTypes = [
      { id: 'pear', label: 'Pear', description: 'Wider hips, narrower shoulders' },
      { id: 'apple', label: 'Apple', description: 'Fuller midsection' },
      { id: 'hourglass', label: 'Hourglass', description: 'Balanced hips and shoulders' },
      { id: 'rectangle', label: 'Rectangle', description: 'Similar measurements all around' },
      { id: 'triangle', label: 'Triangle', description: 'Broader shoulders, narrower hips' }
    ];

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This helps us recommend styles that flatter your body shape. Choose what feels right for you.
        </p>
        <RadioGroup
          value={preferences.bodyType || ''}
          onValueChange={(value) => updatePreferences({ bodyType: value })}
          className="space-y-3"
        >
          {bodyTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent">
              <RadioGroupItem value={type.id} id={type.id} />
              <div className="flex-1">
                <Label htmlFor={type.id} className="font-medium">{type.label}</Label>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  function StylePersonalityStep() {
    const personalities = [
      { id: 'classic', label: 'Classic', icon: '👔', description: 'Timeless, elegant pieces' },
      { id: 'trendy', label: 'Trendy', icon: '✨', description: 'Latest fashion trends' },
      { id: 'bohemian', label: 'Bohemian', icon: '🌸', description: 'Free-spirited, artistic' },
      { id: 'minimalist', label: 'Minimalist', icon: '⚪', description: 'Clean, simple lines' },
      { id: 'edgy', label: 'Edgy', icon: '🖤', description: 'Bold, unconventional' },
      { id: 'romantic', label: 'Romantic', icon: '💕', description: 'Soft, feminine touches' }
    ];

    const selectedPersonalities = preferences.stylePersonality || [];

    const togglePersonality = (id: string) => {
      const current = selectedPersonalities;
      const updated = current.includes(id)
        ? current.filter(p => p !== id)
        : [...current, id];
      updatePreferences({ stylePersonality: updated });
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Select all that describe your style (you can choose multiple):
        </p>
        <div className="grid grid-cols-2 gap-3">
          {personalities.map((personality) => (
            <div
              key={personality.id}
              onClick={() => togglePersonality(personality.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedPersonalities.includes(personality.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{personality.icon}</div>
                <div className="font-medium text-sm">{personality.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{personality.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function BudgetStep() {
    const budget = preferences.budget || 5000;

    return (
      <div className="space-y-6">
        <div>
          <Label>Monthly fashion budget (₹)</Label>
          <div className="mt-4 space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">₹{budget.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
            <Slider
              value={[budget]}
              onValueChange={(value) => updatePreferences({ budget: value[0] })}
              max={20000}
              min={1000}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹1,000</span>
              <span>₹20,000+</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-primary/5">
          <div className="text-sm font-medium mb-2">Budget Tip</div>
          <div className="text-sm text-muted-foreground">
            We'll help you find amazing pieces within your budget and suggest investment pieces worth splurging on.
          </div>
        </div>
      </div>
    );
  }

  function OccasionsStep() {
    const occasions = [
      { id: 'work', label: 'Work/Office', icon: '💼' },
      { id: 'casual', label: 'Casual Daily', icon: '👕' },
      { id: 'party', label: 'Parties/Events', icon: '🎉' },
      { id: 'date', label: 'Date Nights', icon: '💕' },
      { id: 'travel', label: 'Travel', icon: '✈️' },
      { id: 'workout', label: 'Workout/Gym', icon: '💪' },
      { id: 'formal', label: 'Formal Events', icon: '🎭' },
      { id: 'wedding', label: 'Weddings', icon: '💒' }
    ];

    const selectedOccasions = preferences.occasions || [];

    const toggleOccasion = (id: string) => {
      const current = selectedOccasions;
      const updated = current.includes(id)
        ? current.filter(o => o !== id)
        : [...current, id];
      updatePreferences({ occasions: updated });
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          What occasions do you dress for most often?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {occasions.map((occasion) => (
            <div
              key={occasion.id}
              onClick={() => toggleOccasion(occasion.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedOccasions.includes(occasion.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{occasion.icon}</span>
                <span className="text-sm font-medium">{occasion.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function ColorsStep() {
    const colors = [
      { id: 'black', label: 'Black', color: 'bg-black' },
      { id: 'white', label: 'White', color: 'bg-white border border-gray-300' },
      { id: 'navy', label: 'Navy', color: 'bg-navy-600' },
      { id: 'red', label: 'Red', color: 'bg-red-500' },
      { id: 'pink', label: 'Pink', color: 'bg-pink-400' },
      { id: 'blue', label: 'Blue', color: 'bg-blue-500' },
      { id: 'green', label: 'Green', color: 'bg-green-500' },
      { id: 'yellow', label: 'Yellow', color: 'bg-yellow-400' },
      { id: 'purple', label: 'Purple', color: 'bg-purple-500' },
      { id: 'brown', label: 'Brown', color: 'bg-amber-700' },
      { id: 'gray', label: 'Gray', color: 'bg-gray-500' },
      { id: 'beige', label: 'Beige', color: 'bg-amber-100' }
    ];

    const selectedColors = preferences.colors || [];

    const toggleColor = (id: string) => {
      const current = selectedColors;
      const updated = current.includes(id)
        ? current.filter(c => c !== id)
        : [...current, id];
      updatePreferences({ colors: updated });
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Which colors do you love wearing?
        </p>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((color) => (
            <div
              key={color.id}
              onClick={() => toggleColor(color.id)}
              className={`relative p-2 rounded-lg cursor-pointer transition-all ${
                selectedColors.includes(color.id)
                  ? 'ring-2 ring-primary'
                  : 'hover:ring-1 hover:ring-primary/50'
              }`}
            >
              <div className={`w-full h-12 rounded-md ${color.color} mb-2`} />
              <div className="text-xs font-medium text-center">{color.label}</div>
              {selectedColors.includes(color.id) && (
                <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function CompleteStep() {
    return (
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white"
        >
          <Crown className="h-12 w-12" />
        </motion.div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile Complete! 🎉</h1>
          <p className="text-muted-foreground">
            Your personalized style profile is ready. We'll now curate recommendations just for you!
          </p>
        </div>

        <div className="space-y-3 text-left">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Personalized recommendations</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Style challenges & achievements</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">AI-powered outfit suggestions</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStep = steps[step];
  const CurrentComponent = currentStep.component;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Step {step + 1} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(((step + 1) / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground"
            >
              {currentStep.icon}
            </motion.div>
            <h2 className="text-xl font-bold mb-1">{currentStep.title}</h2>
            <p className="text-sm text-muted-foreground">{currentStep.subtitle}</p>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <CurrentComponent />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {step === totalSteps - 1 ? (
              <Button onClick={handleComplete} className="flex items-center gap-2">
                Get Started
                <Sparkles className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={nextStep} className="flex items-center gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedOnboarding;