
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '@/services/WeatherService';

interface SmartPromptBarProps {
  onPromptSubmit: (prompt: string) => void;
  className?: string;
}

const SmartPromptBar = ({ onPromptSubmit, className }: SmartPromptBarProps) => {
  const [prompt, setPrompt] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { weatherData } = useWeather();
  
  // Example prompt suggestions
  const getPromptSuggestions = () => {
    const baseSuggestions = [
      "Style me for a weekend brunch",
      "Office look with a pop of color",
      "Casual date night outfit",
      "Festival vibes under ₹3000",
    ];
    
    // Add weather-specific suggestions if we have weather data
    if (weatherData) {
      const temp = Math.round(weatherData.temperature);
      const condition = weatherData.condition.toLowerCase();
      
      if (condition.includes('rain')) {
        baseSuggestions.push(`Rainy day outfit in ${weatherData.location}`);
      } else if (temp > 30) {
        baseSuggestions.push(`Hot weather look for ${temp}°C in ${weatherData.location}`);
      } else if (temp < 15) {
        baseSuggestions.push(`Layered outfit for ${temp}°C in ${weatherData.location}`);
      } else {
        baseSuggestions.push(`Weather-appropriate outfit for ${weatherData.location}`);
      }
    }
    
    return baseSuggestions;
  };

  const handleFocus = () => {
    setIsExpanded(true);
    setSuggestions(getPromptSuggestions());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onPromptSubmit(prompt.trim());
      setPrompt('');
      setIsExpanded(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onPromptSubmit(suggestion);
    setPrompt('');
    setIsExpanded(false);
  };

  return (
    <Card className={`${className} relative shadow-md`}>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex items-center p-2 relative">
          <Search className="w-5 h-5 text-muted-foreground ml-2 mr-1" />
          <input
            type="text"
            className="flex-1 border-none outline-none bg-transparent px-2 py-2"
            placeholder="Style me for..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={handleFocus}
          />
          <Button 
            type="submit" 
            size="sm"
            className="flex gap-1"
            disabled={!prompt.trim()}
          >
            <Sparkles size={16} />
            <span className="hidden sm:inline">Generate</span>
          </Button>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-2 border-t pt-3">
                <p className="text-xs text-muted-foreground mb-2 px-2">Try asking for:</p>
                <div className="flex flex-wrap gap-2 pb-1">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Card>
  );
};

export default SmartPromptBar;
