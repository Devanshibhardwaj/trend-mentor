
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, ArrowRight, SparklesIcon } from 'lucide-react';
import { toast } from 'sonner';

interface StyleDnaScannerProps {
  onComplete: (stylePrefs: StylePreferences) => void;
  onBack?: () => void;
}

export interface StylePreferences {
  silhouette: string;
  colorPalette: string;
  texture: string;
  occasion: string;
  energyLevel: string;
}

const StyleDnaScanner = ({ onComplete, onBack }: StyleDnaScannerProps) => {
  const [step, setStep] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  // Create audio element for scanning sound
  useEffect(() => {
    const audio = new Audio('/scan-sound.mp3');
    audio.volume = 0.3;
    audio.loop = false;
    setAudioElement(audio);
    
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);
  
  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) - 0.5,
          y: ((e.clientY - rect.top) / rect.height) - 0.5
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const questions = [
    {
      id: "style-intro",
      type: "intro",
      title: "Fashion DNA Scanner",
      description: "Let's decode your unique style profile through our advanced AI analysis"
    },
    {
      id: "silhouette",
      type: "visual-choice",
      question: "Select the silhouette that resonates with you",
      options: [
        {
          id: "structured",
          image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=500",
          label: "Structured & Defined",
          description: "Clean lines, tailored fit"
        },
        {
          id: "flowing",
          image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=500",
          label: "Flowing & Relaxed",
          description: "Loose, comfortable drape"
        },
        {
          id: "bold",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=500",
          label: "Bold & Statement",
          description: "Dramatic shapes, volume"
        }
      ]
    },
    {
      id: "colorPalette",
      type: "visual-choice",
      question: "Which color palette draws you in?",
      options: [
        {
          id: "neutrals",
          image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=500",
          label: "Neutrals & Earth Tones",
          description: "Timeless, grounded, versatile"
        },
        {
          id: "vibrant",
          image: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?q=80&w=500",
          label: "Vibrant & Bold",
          description: "Energetic, expressive, unique"
        },
        {
          id: "monochrome",
          image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=500",
          label: "Monochromatic & Sleek",
          description: "Sophisticated, focused, clean"
        }
      ]
    },
    {
      id: "texture",
      type: "visual-choice",
      question: "Touch is a sense often forgotten in fashion. What texture speaks to you?",
      options: [
        {
          id: "smooth",
          image: "https://images.unsplash.com/photo-1519568470290-c0c1fbfff16f?q=80&w=500",
          label: "Smooth & Sleek",
          description: "Silk, satin, polished surfaces"
        },
        {
          id: "textured",
          image: "https://images.unsplash.com/photo-1471666875520-c75081f42081?q=80&w=500",
          label: "Rich Texture",
          description: "Knits, embroidery, patterns"
        },
        {
          id: "contrast",
          image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=500",
          label: "Contrasting Materials",
          description: "Mix of textures and finishes"
        }
      ]
    },
    {
      id: "occasion",
      type: "visual-choice",
      question: "Where do you see your ideal style thriving?",
      options: [
        {
          id: "everyday",
          image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500",
          label: "Everyday Life",
          description: "Versatile, practical, comfortable"
        },
        {
          id: "professional",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=500",
          label: "Professional Settings",
          description: "Polished, authoritative, intentional"
        },
        {
          id: "social",
          image: "https://images.unsplash.com/photo-1470753937643-efeb931202a9?q=80&w=500",
          label: "Social Occasions",
          description: "Memorable, expressive, attention to detail"
        }
      ]
    },
    {
      id: "energyLevel",
      type: "visual-choice",
      question: "What energy level do you want your style to project?",
      options: [
        {
          id: "calm",
          image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?q=80&w=500",
          label: "Calm & Collected",
          description: "Understated, refined, peaceful"
        },
        {
          id: "balanced",
          image: "https://images.unsplash.com/photo-1593985807296-e34672f09ada?q=80&w=500",
          label: "Balanced & Harmonious",
          description: "Thoughtful, intentional, centered"
        },
        {
          id: "dynamic",
          image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=500",
          label: "Dynamic & Energetic",
          description: "Bold, powerful, attention-grabbing"
        }
      ]
    },
    {
      id: "result",
      type: "result",
      title: "DNA Sequencing Complete",
      description: "Your unique style profile has been compiled."
    }
  ];
  
  const currentQuestion = questions[step];
  
  const handleAnswer = (answerId: string) => {
    if (currentQuestion.type === "visual-choice") {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: answerId
      }));
      
      // Move to next question
      setTimeout(() => {
        setStep(prevStep => prevStep + 1);
      }, 500);
    }
  };
  
  const handleNext = () => {
    if (step === 0) {
      // Start DNA scanning animation
      setIsScanning(true);
      
      if (audioElement) {
        audioElement.play().catch(e => console.log('Audio play prevented:', e));
      }
      
      // Simulate DNA scanning progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        setScanProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setStep(1);
          }, 500);
        }
      }, 40);
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(prevStep => prevStep - 1);
    } else if (onBack) {
      onBack();
    }
  };
  
  const handleComplete = () => {
    // Compile the style preferences
    const stylePrefs: StylePreferences = {
      silhouette: answers.silhouette || "flowing",
      colorPalette: answers.colorPalette || "neutrals",
      texture: answers.texture || "smooth",
      occasion: answers.occasion || "everyday",
      energyLevel: answers.energyLevel || "balanced"
    };
    
    // Show success toast
    toast.success("Style DNA analysis complete!", { 
      description: "Your personalized fashion journey awaits"
    });
    
    // Pass results back to parent component
    onComplete(stylePrefs);
  };
  
  const isLightTheme = theme === "sunset" || theme === "forest" || theme === "system";
  
  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated background element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(120, 0, 255, 0.15), rgba(0, 0, 0, 0) 70%)`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            transition: 'background-position 0.1s ease-out'
          }}
        />
        
        {/* Grid overlay */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            backgroundSize: '40px 40px',
            backgroundImage: `
              linear-gradient(to right, rgba(120, 0, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(120, 0, 255, 0.05) 1px, transparent 1px)
            `,
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
          }}
        />
      </div>
      
      {/* Content container */}
      <div className="w-full max-w-4xl mx-4 z-20">
        <AnimatePresence mode="wait">
          {currentQuestion.type === "intro" && (
            <motion.div
              key="intro"
              className="bg-black/70 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <SparklesIcon className="h-10 w-10 text-white" />
                </motion.div>
                
                <motion.h2
                  className="text-3xl font-bold text-white mt-6 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentQuestion.title}
                </motion.h2>
                
                <motion.p
                  className="text-white/80 text-lg max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentQuestion.description}
                </motion.p>
              </div>
              
              {isScanning ? (
                <div className="relative mt-12 mb-6">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  
                  <div className="mt-4 text-center text-white/80">
                    Scanning DNA: {scanProgress}%
                  </div>
                  
                  {/* Animated scanning effect */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      left: ['0%', '100%'],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear"
                    }}
                  />
                </div>
              ) : (
                <Button
                  onClick={handleNext}
                  className="w-full md:w-auto px-8 py-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-lg font-medium text-lg mt-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  Begin DNA Scan
                </Button>
              )}
            </motion.div>
          )}
          
          {currentQuestion.type === "visual-choice" && (
            <motion.div
              key={`question-${currentQuestion.id}`}
              className="bg-black/70 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-6">
                <motion.h3
                  className="text-2xl font-medium text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {currentQuestion.question}
                </motion.h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    className={`relative rounded-lg overflow-hidden group ${
                      answers[currentQuestion.id] === option.id
                        ? 'ring-2 ring-fuchsia-500 ring-offset-2 ring-offset-black'
                        : 'ring-1 ring-white/10'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img 
                        src={option.image} 
                        alt={option.label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Hover overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"
                        whileHover={{ opacity: 0.9 }}
                      />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                        <h4 className="text-white font-medium text-lg">{option.label}</h4>
                        <p className="text-white/80 text-sm">{option.description}</p>
                      </div>
                      
                      {/* Selection indicator */}
                      {answers[currentQuestion.id] === option.id && (
                        <motion.div
                          className="absolute top-2 right-2 w-6 h-6 bg-fuchsia-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  className="text-white border-white/20"
                  onClick={handleBack}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                <div className="flex space-x-1">
                  {questions.slice(1, 6).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i === step - 1 ? 'bg-fuchsia-500' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {currentQuestion.type === "result" && (
            <motion.div
              key="result"
              className="bg-black/70 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* DNA helix animation */}
              <div className="relative h-40 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={`strand-${i}`}
                      className="absolute w-40 h-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                      initial={{
                        rotate: i * 18,
                        scaleX: 0
                      }}
                      animate={{
                        rotate: [i * 18, i * 18 + 360],
                        scaleX: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">{currentQuestion.title}</h2>
                <p className="text-white/80 text-lg mt-2">{currentQuestion.description}</p>
              </div>
              
              <div className="space-y-4 max-w-md mx-auto">
                <motion.div 
                  className="p-4 bg-white/5 rounded-lg border border-purple-500/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-center">
                    <h3 className="text-fuchsia-400 font-medium">Your Style DNA</h3>
                    <p className="text-white mt-1">
                      {answers.silhouette === 'structured' ? 'Precise & Structured' :
                       answers.silhouette === 'flowing' ? 'Fluid & Organic' : 
                       'Bold & Dramatic'}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="p-4 bg-white/5 rounded-lg border border-indigo-500/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-center">
                    <h3 className="text-indigo-400 font-medium">Your Color Profile</h3>
                    <p className="text-white mt-1">
                      {answers.colorPalette === 'neutrals' ? 'Sophisticated Neutrals' :
                       answers.colorPalette === 'vibrant' ? 'Vibrant Expression' :
                       'Striking Monochrome'}
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-8 text-center">
                <Button
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-lg font-medium px-8 py-6 text-lg hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all"
                >
                  Begin Your Style Journey
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StyleDnaScanner;
