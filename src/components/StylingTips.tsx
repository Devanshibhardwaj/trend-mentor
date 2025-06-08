
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Users, Calendar, Sparkles, Heart } from 'lucide-react';
import { FilterOptions } from '@/components/FilterBar';

interface StylingTipsProps {
  filters?: FilterOptions;
  outfit?: any;
}

interface StylingTip {
  id: string;
  category: 'body-type' | 'occasion' | 'color' | 'styling' | 'confidence';
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const StylingTips = ({ filters, outfit }: StylingTipsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getPersonalizedTips = (): StylingTip[] => {
    const baseTips: StylingTip[] = [
      {
        id: '1',
        category: 'styling',
        title: 'Layer with Confidence',
        description: 'Add a structured blazer over casual pieces to instantly elevate your look. Perfect for transitioning from day to evening.',
        icon: <Sparkles className="h-4 w-4" />,
        tags: ['versatile', 'professional', 'layering']
      },
      {
        id: '2',
        category: 'color',
        title: 'Color Psychology',
        description: 'Blue tones convey trust and reliability - perfect for work meetings. Red adds energy and confidence for social events.',
        icon: <Heart className="h-4 w-4" />,
        tags: ['psychology', 'mood', 'color-theory']
      },
      {
        id: '3',
        category: 'body-type',
        title: 'Flattering Silhouettes',
        description: 'High-waisted bottoms create an elongated leg line. Pair with tucked-in tops to define your waist beautifully.',
        icon: <Users className="h-4 w-4" />,
        tags: ['silhouette', 'proportions', 'flattering']
      },
      {
        id: '4',
        category: 'occasion',
        title: 'Occasion Mastery',
        description: 'For casual outings, balance comfortable pieces with one elevated element - like statement earrings with jeans and a tee.',
        icon: <Calendar className="h-4 w-4" />,
        tags: ['casual', 'balance', 'accessories']
      },
      {
        id: '5',
        category: 'confidence',
        title: 'Your Personal Style Mantra',
        description: 'Confidence is your best accessory. Wear what makes YOU feel amazing - that energy will shine through any outfit.',
        icon: <Lightbulb className="h-4 w-4" />,
        tags: ['confidence', 'personal-style', 'mindset']
      }
    ];

    // Add contextual tips based on filters
    const contextualTips: StylingTip[] = [];

    if (filters?.mood === 'work') {
      contextualTips.push({
        id: 'work-1',
        category: 'occasion',
        title: 'Professional Polish',
        description: 'Choose one statement piece - a bold necklace or structured handbag - to add personality to professional attire.',
        icon: <Calendar className="h-4 w-4" />,
        tags: ['professional', 'work', 'statement']
      });
    }

    if (filters?.mood === 'date') {
      contextualTips.push({
        id: 'date-1',
        category: 'confidence',
        title: 'Date Night Confidence',
        description: 'Choose an outfit that makes you feel like the best version of yourself. Comfort and confidence are irresistibly attractive.',
        icon: <Heart className="h-4 w-4" />,
        tags: ['date', 'confidence', 'comfort']
      });
    }

    if (filters?.style === 'minimal') {
      contextualTips.push({
        id: 'minimal-1',
        category: 'styling',
        title: 'Minimalist Magic',
        description: 'In minimalism, fit is everything. Invest in well-tailored basics in neutral tones for effortless sophistication.',
        icon: <Sparkles className="h-4 w-4" />,
        tags: ['minimal', 'tailoring', 'neutrals']
      });
    }

    return [...baseTips, ...contextualTips];
  };

  const tips = getPersonalizedTips();
  const categories = [
    { value: 'all', label: 'All Tips', icon: <Sparkles className="h-4 w-4" /> },
    { value: 'styling', label: 'Styling', icon: <Sparkles className="h-4 w-4" /> },
    { value: 'color', label: 'Colors', icon: <Heart className="h-4 w-4" /> },
    { value: 'occasion', label: 'Occasions', icon: <Calendar className="h-4 w-4" /> },
    { value: 'confidence', label: 'Confidence', icon: <Lightbulb className="h-4 w-4" /> }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Personal Styling Tips
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Curated advice to help you look and feel your absolute best
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className="flex items-center gap-1"
            >
              {category.icon}
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-4">
          {filteredTips.map(tip => (
            <div key={tip.id} className="p-4 border rounded-lg hover:bg-muted/20 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {tip.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StylingTips;
