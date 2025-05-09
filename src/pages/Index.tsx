import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import VibesGallery from '@/components/VibesGallery';
import CTAFooter from '@/components/CTAFooter';
import Footer from '@/components/Footer';
import IntroAnimation from '@/components/IntroAnimation';
import OnboardingSequence from '@/components/OnboardingSequence';
import PersonalityQuiz, { UserPreferences } from '@/components/PersonalityQuiz';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import FashionIntroAnimation from '@/components/FashionIntroAnimation';
import StyleDnaScanner, { StylePreferences } from '@/components/StyleDnaScanner';
import { Star } from 'lucide-react';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showFashionIntro, setShowFashionIntro] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showStyleDnaScanner, setShowStyleDnaScanner] = useState(false);
  const [showPersonalityQuiz, setShowPersonalityQuiz] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [stylePreferences, setStylePreferences] = useState<StylePreferences | null>(null);
  
  useEffect(() => {
    const hasSeenFashionIntro = localStorage.getItem('hasSeenFashionIntro');
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    const hasCompletedDnaScan = localStorage.getItem('hasCompletedDnaScan');
    const hasCompletedQuiz = localStorage.getItem('hasCompletedQuiz');
    const savedPreferences = localStorage.getItem('userPreferences');
    const savedStylePreferences = localStorage.getItem('stylePreferences');
    
    if (savedPreferences) {
      try {
        setUserPreferences(JSON.parse(savedPreferences));
      } catch (e) {
        console.error("Error parsing saved preferences:", e);
      }
    }
    
    if (savedStylePreferences) {
      try {
        setStylePreferences(JSON.parse(savedStylePreferences));
      } catch (e) {
        console.error("Error parsing saved style preferences:", e);
      }
    }
    
    if (hasSeenFashionIntro) {
      setShowFashionIntro(false);
      
      if (hasSeenIntro) {
        setShowIntro(false);
        
        if (hasSeenOnboarding) {
          if (hasCompletedDnaScan) {
            if (hasCompletedQuiz) {
              setContentVisible(true);
            } else {
              setShowPersonalityQuiz(true);
            }
          } else {
            setShowStyleDnaScanner(true);
          }
        } else {
          setShowOnboarding(true);
        }
      } else {
        setShowIntro(true);
      }
    } else {
      document.body.style.overflow = 'hidden';
    }
    
    setLoaded(true);
  }, []);
  
  const handleFashionIntroComplete = () => {
    setShowFashionIntro(false);
    setShowIntro(true);
    localStorage.setItem('hasSeenFashionIntro', 'true');
  };
  
  const handleIntroComplete = () => {
    setShowIntro(false);
    localStorage.setItem('hasSeenIntro', 'true');
    // After intro, show onboarding
    setShowOnboarding(true);
  };
  
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // After onboarding, show style DNA scanner
    setShowStyleDnaScanner(true);
  };
  
  const handleStyleDnaScanComplete = (preferences: StylePreferences) => {
    setShowStyleDnaScanner(false);
    setStylePreferences(preferences);
    
    // Store style preferences
    localStorage.setItem('stylePreferences', JSON.stringify(preferences));
    localStorage.setItem('hasCompletedDnaScan', 'true');
    
    // After DNA scan, show personality quiz
    setShowPersonalityQuiz(true);
  };

  const handlePersonalityQuizComplete = (preferences: UserPreferences) => {
    setShowPersonalityQuiz(false);
    setContentVisible(true);
    setUserPreferences(preferences);
    
    // Store user preferences
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    localStorage.setItem('hasCompletedQuiz', 'true');
    
    document.body.style.overflow = '';
    
    // Combine style and personality data for a more personalized message
    const styleDescription = stylePreferences?.silhouette === 'structured' ? 'structured' : 
                            stylePreferences?.silhouette === 'flowing' ? 'flowing' : 'bold';
    
    toast.success("Welcome to Your Fashion Multiverse!", {
      description: `Your ${styleDescription} style profile has been created. Enjoy your personalized experience!`,
      duration: 5000,
    });
    
    // Apply any UX adjustments based on browsing speed preference
    applyUxPreferences(preferences);
  };

  const applyUxPreferences = (preferences: UserPreferences) => {
    // This function could apply various UX adjustments based on user preferences
    // For example, change animation speeds, adjust information density, etc.
    const root = document.documentElement;
    
    // Example: Adjust animation speeds based on browsing preference
    if (preferences.browsingSpeed === 'direct') {
      root.style.setProperty('--animation-speed', '0.2s');
    } else if (preferences.browsingSpeed === 'explorer') {
      root.style.setProperty('--animation-speed', '0.5s');
    } else {
      root.style.setProperty('--animation-speed', '0.3s');
    }
  };

  return (
    <>
      <AnimatePresence>
        {showFashionIntro && <FashionIntroAnimation onComplete={handleFashionIntroComplete} />}
      </AnimatePresence>
      
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      </AnimatePresence>
      
      <AnimatePresence>
        {showOnboarding && <OnboardingSequence onComplete={handleOnboardingComplete} />}
      </AnimatePresence>
      
      <AnimatePresence>
        {showStyleDnaScanner && (
          <StyleDnaScanner onComplete={handleStyleDnaScanComplete} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showPersonalityQuiz && (
          <PersonalityQuiz onComplete={handlePersonalityQuizComplete} />
        )}
      </AnimatePresence>
      
      <motion.div
        className="min-h-screen bg-background flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          
          {/* Personalized greeting if we have user preferences */}
          {userPreferences && (
            <motion.div 
              className="max-w-7xl mx-auto px-6 py-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-2">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {userPreferences.timePreference === 'early-bird' 
                      ? 'Good morning, early bird! We\'ve brightened things up for you.' 
                      : userPreferences.timePreference === 'night-owl'
                        ? 'Welcome, night owl! We\'ve set a more relaxing ambiance for you.'
                        : 'Welcome back to StyleSage!'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* How It Works Section */}
          <HowItWorks />
          
          {/* Vibes Gallery Section */}
          <VibesGallery />
          
          {/* CTA Footer Section */}
          <CTAFooter />
        </main>
        
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
