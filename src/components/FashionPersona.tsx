
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { FilterOptions } from '@/components/FilterBar';

interface FashionPersonaProps {
  filters: FilterOptions;
  prompt?: string;
  mood?: string;
}

interface PersonaData {
  name: string;
  description: string;
  traits: string[];
  colors: string[];
  icon: React.ReactNode;
  gradient: string;
}

const FashionPersona = ({ filters, prompt, mood }: FashionPersonaProps) => {
  const [persona, setPersona] = useState<PersonaData | null>(null);

  const personas: Record<string, PersonaData> = {
    'minimal-muse': {
      name: 'Minimal Muse',
      description: 'Clean lines, timeless pieces, effortless sophistication',
      traits: ['Refined', 'Timeless', 'Sophisticated'],
      colors: ['Neutral', 'Monochrome', 'Earth tones'],
      icon: <Star className="h-5 w-5" />,
      gradient: 'from-gray-400 to-gray-600'
    },
    'bold-street-rebel': {
      name: 'Bold Street Rebel',
      description: 'Edgy combinations, statement pieces, urban confidence',
      traits: ['Edgy', 'Confident', 'Trendsetting'],
      colors: ['Bold', 'Contrasting', 'Neon accents'],
      icon: <Sparkles className="h-5 w-5" />,
      gradient: 'from-purple-500 to-pink-600'
    },
    'ethnic-elegance': {
      name: 'Ethnic Elegance',
      description: 'Traditional with a modern twist, cultural pride',
      traits: ['Cultural', 'Elegant', 'Heritage'],
      colors: ['Rich jewel tones', 'Gold accents', 'Traditional'],
      icon: <Heart className="h-5 w-5" />,
      gradient: 'from-orange-400 to-red-600'
    },
    'work-warrior': {
      name: 'Work Warrior',
      description: 'Professional power, polished presence, success-minded',
      traits: ['Professional', 'Powerful', 'Polished'],
      colors: ['Navy', 'Charcoal', 'Crisp whites'],
      icon: <Star className="h-5 w-5" />,
      gradient: 'from-blue-600 to-indigo-700'
    },
    'date-night-diva': {
      name: 'Date Night Diva',
      description: 'Romantic allure, charming confidence, irresistible style',
      traits: ['Romantic', 'Charming', 'Alluring'],
      colors: ['Soft pastels', 'Romantic hues', 'Elegant tones'],
      icon: <Heart className="h-5 w-5" />,
      gradient: 'from-pink-400 to-rose-600'
    },
    'chill-vibes': {
      name: 'Chill Vibes',
      description: 'Relaxed comfort, easy-going style, effortless cool',
      traits: ['Relaxed', 'Comfortable', 'Easy-going'],
      colors: ['Soft blues', 'Pastels', 'Comfortable neutrals'],
      icon: <Sparkles className="h-5 w-5" />,
      gradient: 'from-blue-300 to-teal-400'
    }
  };

  useEffect(() => {
    const determinePersona = () => {
      let personaKey = 'minimal-muse'; // default

      // Determine based on filters and mood
      if (filters.style === 'minimal') {
        personaKey = 'minimal-muse';
      } else if (filters.style === 'street') {
        personaKey = 'bold-street-rebel';
      } else if (filters.style === 'ethnic') {
        personaKey = 'ethnic-elegance';
      } else if (filters.mood === 'work') {
        personaKey = 'work-warrior';
      } else if (filters.mood === 'date') {
        personaKey = 'date-night-diva';
      } else if (filters.mood === 'chill') {
        personaKey = 'chill-vibes';
      }

      // Override with prompt analysis if available
      if (prompt) {
        const lowerPrompt = prompt.toLowerCase();
        if (lowerPrompt.includes('minimal') || lowerPrompt.includes('clean')) {
          personaKey = 'minimal-muse';
        } else if (lowerPrompt.includes('bold') || lowerPrompt.includes('edgy') || lowerPrompt.includes('street')) {
          personaKey = 'bold-street-rebel';
        } else if (lowerPrompt.includes('ethnic') || lowerPrompt.includes('traditional') || lowerPrompt.includes('cultural')) {
          personaKey = 'ethnic-elegance';
        } else if (lowerPrompt.includes('work') || lowerPrompt.includes('office') || lowerPrompt.includes('professional')) {
          personaKey = 'work-warrior';
        } else if (lowerPrompt.includes('date') || lowerPrompt.includes('romantic')) {
          personaKey = 'date-night-diva';
        } else if (lowerPrompt.includes('chill') || lowerPrompt.includes('relaxed') || lowerPrompt.includes('casual')) {
          personaKey = 'chill-vibes';
        }
      }

      setPersona(personas[personaKey]);
    };

    determinePersona();
  }, [filters, prompt, mood]);

  if (!persona) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className={`bg-gradient-to-r ${persona.gradient} p-1`}>
          <CardContent className="bg-white m-0 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full bg-gradient-to-r ${persona.gradient} text-white`}>
                  {persona.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{persona.name}</h3>
                  <p className="text-sm text-gray-600">{persona.description}</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Your Style Traits</h4>
                <div className="flex flex-wrap gap-2">
                  {persona.traits.map((trait, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Perfect Color Palette</h4>
                <div className="flex flex-wrap gap-2">
                  {persona.colors.map((color, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default FashionPersona;
