
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { FastForward, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface PersonalityQuizProps {
  onComplete: (preferences: UserPreferences) => void;
}

export interface UserPreferences {
  timePreference: 'early-bird' | 'night-owl' | 'balanced';
  stylePreference: 'minimalist' | 'expressive' | 'classic';
  colorPreference: 'vibrant' | 'neutral' | 'pastel';
  browsingSpeed: 'explorer' | 'direct' | 'balanced';
}

interface Question {
  id: string;
  question: string;
  options: {
    label: string;
    value: string;
    description: string;
    emoji: string;
  }[];
}

const PersonalityQuiz = ({ onComplete }: PersonalityQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSkip, setShowSkip] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setTheme } = useTheme();
  
  // Define our personality questions
  const questions: Question[] = [
    {
      id: "timePreference",
      question: "Are you an early bird or a night owl?",
      options: [
        { label: "Early Bird", value: "early-bird", description: "I rise with the sun", emoji: "🌅" },
        { label: "Night Owl", value: "night-owl", description: "I come alive after dark", emoji: "🌙" },
        { label: "Somewhere in between", value: "balanced", description: "I enjoy both dawn and dusk", emoji: "⏱️" }
      ]
    },
    {
      id: "stylePreference",
      question: "How would you describe your personal style?",
      options: [
        { label: "Minimalist", value: "minimalist", description: "Clean, simple, functional", emoji: "✨" },
        { label: "Expressive", value: "expressive", description: "Bold, creative, unique", emoji: "🎨" },
        { label: "Classic", value: "classic", description: "Timeless, elegant, refined", emoji: "👔" }
      ]
    },
    {
      id: "colorPreference",
      question: "Which color palette speaks to you?",
      options: [
        { label: "Vibrant", value: "vibrant", description: "Bold, energetic colors", emoji: "🌈" },
        { label: "Neutral", value: "neutral", description: "Earthy, subdued tones", emoji: "🤎" },
        { label: "Pastel", value: "pastel", description: "Soft, gentle hues", emoji: "🍦" }
      ]
    },
    {
      id: "browsingSpeed",
      question: "When exploring a fashion site, you prefer to:",
      options: [
        { label: "Take my time", value: "explorer", description: "I enjoy discovering new things", emoji: "🔍" },
        { label: "Get what I need quickly", value: "direct", description: "I know exactly what I want", emoji: "🏃‍♂️" },
        { label: "Mix of both", value: "balanced", description: "Depends on my mood", emoji: "⚖️" }
      ]
    }
  ];
  
  // Show skip button after a delay
  useState(() => {
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  });
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswer = (answer: string) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
    
    // Move to next question or complete
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Process answers and complete onboarding
        completeQuiz();
      }
      setIsTransitioning(false);
    }, 500);
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };
  
  const skipQuiz = () => {
    // Use default preferences when skipped
    const defaultPreferences: UserPreferences = {
      timePreference: 'balanced',
      stylePreference: 'classic',
      colorPreference: 'vibrant',
      browsingSpeed: 'balanced'
    };
    
    onComplete(defaultPreferences);
    toast("Using default style preferences");
  };
  
  const completeQuiz = () => {
    // Analyze the answers to generate user preferences
    const preferences: UserPreferences = {
      timePreference: (answers.timePreference as 'early-bird' | 'night-owl' | 'balanced') || 'balanced',
      stylePreference: (answers.stylePreference as 'minimalist' | 'expressive' | 'classic') || 'classic',
      colorPreference: (answers.colorPreference as 'vibrant' | 'neutral' | 'pastel') || 'vibrant',
      browsingSpeed: (answers.browsingSpeed as 'explorer' | 'direct' | 'balanced') || 'balanced'
    };
    
    // Set appropriate theme based on preferences
    if (preferences.timePreference === 'night-owl') {
      setTheme('galaxy');
    } else if (preferences.timePreference === 'early-bird') {
      setTheme('sunset');
    } else if (preferences.stylePreference === 'minimalist') {
      setTheme('nautical');
    } else if (preferences.stylePreference === 'expressive') {
      setTheme('forest');
    }
    
    // Notify user about personalization
    toast.success(
      "Your personalized experience is ready!", 
      { description: "We've customized StyleSage based on your preferences" }
    );
    
    // Complete the onboarding
    onComplete(preferences);
  };
  
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {showSkip && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 right-4"
        >
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={skipQuiz}
            className="text-white/70 hover:text-white hover:bg-white/10 gap-1"
          >
            Skip <FastForward className="h-3 w-3" />
          </Button>
        </motion.div>
      )}
      
      <motion.div 
        className="relative w-full max-w-lg mx-4 bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-indigo-500/20 shadow-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 rounded-t-2xl overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-500"
            initial={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="flex justify-center mb-6">
          <motion.div 
            className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </motion.div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              {currentQuestion.question}
            </h2>
            
            <div className="space-y-4 mt-8">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  className={`w-full p-4 rounded-lg border flex items-center justify-between
                    ${answers[currentQuestion.id] === option.value 
                      ? 'bg-indigo-600/30 border-indigo-500' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                    } transition-all duration-200`}
                  onClick={() => handleAnswer(option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center text-left">
                    <span className="text-xl mr-3">{option.emoji}</span>
                    <div>
                      <div className="text-white font-medium">{option.label}</div>
                      <div className="text-white/60 text-sm">{option.description}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-between mt-8">
          <Button
            variant="ghost"
            disabled={currentQuestionIndex === 0 || isTransitioning}
            onClick={goToPreviousQuestion}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex space-x-1">
            {questions.map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentQuestionIndex ? 'bg-indigo-500 w-4' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          
          <div className="w-20">
            {/* Spacer to balance the layout */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PersonalityQuiz;
