
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { 
  MessageCircle, 
  Send, 
  X, 
  Sparkles, 
  Shirt, 
  MapPin, 
  Thermometer,
  RefreshCw 
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAdvancedOutfitRecommendation } from '@/utils/outfitRecommendation';
import { outfitImages } from '@/lib/outfit-data';

interface Message {
  id: string;
  isUser: boolean;
  text: string;
  options?: string[];
}

interface ChatOutfit {
  name: string;
  description: string;
  imageUrl: string;
  items: {
    top?: { name: string; };
    bottom?: { name: string; };
    outerwear?: { name: string; };
    footwear?: { name: string; };
    accessories?: { name: string; };
  };
}

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  isUser: false,
  text: "Hi! I'm your personal stylist. What's your vibe today?",
  options: ['Happy', 'Relaxed', 'Confident', 'Creative']
};

const QUESTIONS: Message[] = [
  {
    id: 'where',
    isUser: false,
    text: "Where are you headed today?",
    options: ['Work', 'Date', 'Casual outing', 'Party', 'Staying in']
  },
  {
    id: 'weather',
    isUser: false,
    text: "How's the weather like?",
    options: ['Hot', 'Warm', 'Cool', 'Cold', 'Rainy']
  },
  {
    id: 'style',
    isUser: false,
    text: "Any particular style preference?",
    options: ['Casual', 'Formal', 'Minimalist', 'Bold', 'Vintage', 'Whatever looks good!']
  }
];

const StylistChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [chatData, setChatData] = useState<Record<string, string>>({});
  const [outfits, setOutfits] = useState<ChatOutfit[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset chat when opening
      setMessages([INITIAL_MESSAGE]);
      setCurrentQuestion(0);
      setChatData({});
      setOutfits([]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    // Add user message to chat
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      isUser: true,
      text: text
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    // Update chat data based on current question
    if (currentQuestion === 0) {
      setChatData(prev => ({ ...prev, mood: text.toLowerCase() }));
    } else if (currentQuestion === 1) {
      setChatData(prev => ({ ...prev, occasion: text.toLowerCase() }));
    } else if (currentQuestion === 2) {
      setChatData(prev => ({ ...prev, weather: text.toLowerCase() }));
    } else if (currentQuestion === 3) {
      setChatData(prev => ({ ...prev, style: text.toLowerCase() }));
    }
    
    // If we still have questions, ask the next one
    if (currentQuestion < QUESTIONS.length) {
      setTimeout(() => {
        setMessages(prev => [...prev, QUESTIONS[currentQuestion]]);
        setCurrentQuestion(prev => prev + 1);
      }, 800);
    } else {
      // We've asked all questions, generate outfits
      generateOutfits(text);
    }
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  const mapWeatherToSeason = (weather: string): string => {
    switch (weather.toLowerCase()) {
      case 'hot': 
      case 'warm': 
        return 'summer';
      case 'cool':
        return 'spring';  
      case 'cold':
        return 'winter';
      case 'rainy':
        return 'rainy';
      default:
        return 'all';
    }
  };

  const mapMoodToVibe = (mood: string): string => {
    switch (mood.toLowerCase()) {
      case 'happy': return 'playful';
      case 'relaxed': return 'comfortable';
      case 'confident': return 'bold';
      case 'creative': return 'artistic';
      default: return 'casual';
    }
  };

  const getRandomImage = (data: { [key: string]: string[] }, key: string): string => {
    const imageCategory = data[key];
    if (!imageCategory || !Array.isArray(imageCategory) || imageCategory.length === 0) {
      return data.casual?.[0] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800';
    }
    return imageCategory[Math.floor(Math.random() * imageCategory.length)];
  };

  const generateOutfits = async (stylePreference: string) => {
    setIsGenerating(true);
    
    try {
      // Send a "thinking" message
      const thinkingMessage: Message = {
        id: 'thinking',
        isUser: false,
        text: "Let me put together some outfits for you..."
      };
      setMessages(prev => [...prev, thinkingMessage]);
      
      // Map chat data to parameters for our recommendation system
      const occasion = chatData.occasion || 'casual';
      const mood = chatData.mood || 'happy';
      const weather = chatData.weather || 'warm';
      const style = stylePreference.toLowerCase() !== 'whatever looks good!' 
                  ? stylePreference.toLowerCase() 
                  : 'casual';
      
      // Convert weather to season for the algorithm
      const season = mapWeatherToSeason(weather);
      const vibe = mapMoodToVibe(mood);
      
      // Create mood context for the recommendation system
      const moodContext = {
        mood: mood,
        energyLevel: mood === 'relaxed' ? 'low' : mood === 'confident' ? 'high' : 'medium',
        vibe: vibe,
        weather: season
      };
      
      // Generate outfit recommendations (we'll create 3)
      const result1 = await generateAdvancedOutfitRecommendation([], occasion, moodContext);
      const result2 = await generateAdvancedOutfitRecommendation([], occasion, moodContext);
      const result3 = await generateAdvancedOutfitRecommendation([], occasion, moodContext);
      
      // Create chat outfits
      const chatOutfits: ChatOutfit[] = [
        {
          name: `${vibe.charAt(0).toUpperCase() + vibe.slice(1)} ${occasion} Look`,
          description: result1.explanation || `A ${vibe} outfit perfect for ${occasion} occasions.`,
          imageUrl: getRandomImage(outfitImages.occasion, occasion) || 
                   getRandomImage(outfitImages.mood, mood) ||
                   getRandomImage(outfitImages.weather, weather === 'rainy' ? 'rainy' : 'sunny'),
          items: result1.outfit
        },
        {
          name: `${style.charAt(0).toUpperCase() + style.slice(1)} ${occasion} Outfit`,
          description: result2.explanation || `A stylish ${style} outfit for your ${occasion} plans.`,
          imageUrl: getRandomImage(outfitImages.occasion, occasion) || 
                   getRandomImage(outfitImages.mood, mood) ||
                   getRandomImage(outfitImages.weather, weather === 'rainy' ? 'rainy' : 'sunny'),
          items: result2.outfit
        },
        {
          name: `${weather.charAt(0).toUpperCase() + weather.slice(1)}-Weather ${occasion} Ensemble`,
          description: result3.explanation || `An outfit suitable for ${weather} weather during your ${occasion} activities.`,
          imageUrl: getRandomImage(outfitImages.weather, weather === 'rainy' ? 'rainy' : 'sunny') ||
                   getRandomImage(outfitImages.occasion, occasion) ||
                   getRandomImage(outfitImages.mood, mood),
          items: result3.outfit
        }
      ];
      
      setOutfits(chatOutfits);
      
      // Replace the "thinking" message with the results
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== 'thinking');
        return [...filtered, {
          id: 'results',
          isUser: false,
          text: `Here are ${chatOutfits.length} outfits I've put together based on your preferences:`,
        }];
      });
      
    } catch (error) {
      console.error("Error generating outfits:", error);
      toast.error("Couldn't generate outfits. Please try again.");
      
      // Replace the "thinking" message with an error
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== 'thinking');
        return [...filtered, {
          id: 'error',
          isUser: false,
          text: "I'm having trouble putting outfits together right now. Let's try again?",
          options: ['Start over']
        }];
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartOver = () => {
    setMessages([INITIAL_MESSAGE]);
    setCurrentQuestion(0);
    setChatData({});
    setOutfits([]);
  };

  return (
    <>
      {/* Chat button */}
      <Button 
        onClick={toggleChat}
        className="fixed right-4 bottom-4 rounded-full w-14 h-14 shadow-lg z-50 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed right-4 bottom-20 w-[350px] sm:w-[450px] max-h-[600px] z-50"
          >
            <Card className="shadow-lg border-primary/20 overflow-hidden">
              <div className="bg-primary p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} />
                  <h3 className="font-semibold">Personal Stylist</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleStartOver()}
                  className="text-white hover:text-white hover:bg-primary/80"
                >
                  <RefreshCw size={16} />
                </Button>
              </div>
              <CardContent className="p-0">
                <div className="h-[400px] overflow-y-auto p-4 bg-muted/30">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`mb-4 ${message.isUser ? 'flex justify-end' : ''}`}
                    >
                      <div 
                        className={`rounded-lg p-3 max-w-[80%] ${
                          message.isUser 
                            ? 'bg-primary text-white' 
                            : 'bg-muted'
                        }`}
                      >
                        <p>{message.text}</p>
                        {message.options && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.options.map(option => (
                              <Button
                                key={option}
                                variant="outline"
                                size="sm"
                                onClick={() => handleOptionClick(option)}
                                className="text-xs"
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Outfits display */}
                  {outfits.length > 0 && (
                    <div className="mb-4">
                      <div className="space-y-4">
                        {outfits.map((outfit, index) => (
                          <div key={index} className="bg-card rounded-lg overflow-hidden shadow-md">
                            <div className="aspect-[16/9] relative">
                              <img 
                                src={outfit.imageUrl}
                                alt={outfit.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3 space-y-2">
                              <h4 className="font-medium text-sm">{outfit.name}</h4>
                              <p className="text-xs text-muted-foreground">{outfit.description}</p>
                              <div className="text-xs space-y-1">
                                {outfit.items.top && (
                                  <p>👕 Top: {outfit.items.top.name}</p>
                                )}
                                {outfit.items.bottom && (
                                  <p>👖 Bottom: {outfit.items.bottom.name}</p>
                                )}
                                {outfit.items.outerwear && (
                                  <p>🧥 Outerwear: {outfit.items.outerwear.name}</p>
                                )}
                                {outfit.items.footwear && (
                                  <p>👞 Footwear: {outfit.items.footwear.name}</p>
                                )}
                                {outfit.items.accessories && (
                                  <p>✨ Accessories: {outfit.items.accessories.name}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleStartOver}
                          className="w-full"
                        >
                          Get more outfit suggestions
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {isGenerating && (
                    <div className="flex justify-center my-4">
                      <div className="flex items-center space-x-2 bg-muted p-2 px-4 rounded-full text-sm">
                        <div className="animate-pulse">⋯</div>
                        <span>Putting together outfits...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <CardFooter className="p-3 border-t">
                <form 
                  className="flex w-full"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (inputValue.trim()) {
                      handleSendMessage(inputValue.trim());
                    }
                  }}
                >
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your response..."
                    className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button 
                    type="submit" 
                    className="rounded-l-none"
                    disabled={!inputValue.trim() || isGenerating}
                  >
                    <Send size={18} />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chat features overview - appears when chat is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed right-4 bottom-20 w-[250px] z-40"
          >
            <Card className="shadow-md">
              <CardContent className="p-3 text-xs">
                <h4 className="font-semibold flex items-center gap-1 mb-2">
                  <MessageCircle size={14} />
                  <span>Ask me about your style</span>
                </h4>
                <div className="space-y-1 text-muted-foreground">
                  <p className="flex items-center gap-1">
                    <Shirt size={12} /> 
                    <span>Get personalized outfits</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <MapPin size={12} /> 
                    <span>Based on your occasion</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <Thermometer size={12} /> 
                    <span>Weather-appropriate styles</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StylistChat;
