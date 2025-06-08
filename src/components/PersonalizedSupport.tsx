
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, Coffee, Moon, Sun, Star } from 'lucide-react';
import { toast } from 'sonner';

interface PersonalizedSupportProps {
  userName?: string;
  filters?: any;
}

const PersonalizedSupport = ({ userName = "Beautiful", filters }: PersonalizedSupportProps) => {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [showEncouragement, setShowEncouragement] = useState(false);

  const encouragementMessages = [
    "You have incredible style intuition! Trust yourself.",
    "Every outfit is a chance to express your unique personality.",
    "Confidence looks amazing on you - own it!",
    "Your style journey is uniquely yours, and that's beautiful.",
    "You're not just getting dressed - you're telling your story.",
    "Style isn't about perfection, it's about expressing who you are.",
    "You deserve to feel amazing in everything you wear."
  ];

  const getPersonalizedGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = '';
    let icon = <Sun className="h-4 w-4" />;

    if (hour < 12) {
      timeGreeting = 'Good morning';
      icon = <Sun className="h-4 w-4" />;
    } else if (hour < 17) {
      timeGreeting = 'Good afternoon';
      icon = <Coffee className="h-4 w-4" />;
    } else {
      timeGreeting = 'Good evening';
      icon = <Moon className="h-4 w-4" />;
    }

    return { timeGreeting, icon };
  };

  const getStyleCompliment = () => {
    const compliments = [
      "I love how thoughtful you are about your style choices!",
      "Your attention to detail in outfit planning is inspiring!",
      "You have such a great eye for putting looks together!",
      "The way you consider mood and weather shows real style wisdom!",
      "Your openness to trying new combinations is wonderful!"
    ];

    return compliments[Math.floor(Math.random() * compliments.length)];
  };

  const getContextualMessage = () => {
    if (filters?.mood === 'work') {
      return "You're going to absolutely nail that professional look today! Remember, confidence is your secret weapon in any boardroom.";
    }
    if (filters?.mood === 'date') {
      return "Date night vibes! You're going to look stunning. The most attractive thing you can wear is your authentic self.";
    }
    if (filters?.mood === 'chill') {
      return "Comfort meets style - that's the perfect combination! You deserve to feel amazing even on the most relaxed days.";
    }
    return "Whatever the occasion, you've got this! Your style choices reflect your amazing personality.";
  };

  const showRandomEncouragement = () => {
    const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
    setCurrentMessage(randomMessage);
    setShowEncouragement(true);
    toast.success(randomMessage, {
      duration: 5000,
      icon: <Heart className="h-4 w-4 text-pink-500" />
    });
  };

  useEffect(() => {
    // Show personalized message after a delay
    const timer = setTimeout(() => {
      setCurrentMessage(getContextualMessage());
    }, 2000);

    return () => clearTimeout(timer);
  }, [filters]);

  const { timeGreeting, icon } = getPersonalizedGreeting();

  return (
    <div className="space-y-4">
      {/* Personalized Greeting */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <span className="font-medium">{timeGreeting}, {userName}!</span>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            {getStyleCompliment()}
          </p>
        </CardContent>
      </Card>

      {/* Contextual Support Message */}
      {currentMessage && (
        <Card className="border-pink-200 bg-pink-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-pink-100 rounded-full">
                <Heart className="h-4 w-4 text-pink-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-pink-800">{currentMessage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Style Confidence Booster */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm mb-1">Need a confidence boost?</h4>
              <p className="text-xs text-muted-foreground">
                Sometimes we all need a little reminder of how amazing we are!
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={showRandomEncouragement}
              className="flex items-center gap-1"
            >
              <Star className="h-3 w-3" />
              Inspire me
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Style Journey Tracker */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium text-sm mb-3">Your Style Journey</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Heart className="h-3 w-3 mr-1" />
                Style Explorer
              </Badge>
              <span className="text-xs text-muted-foreground">
                You love trying new combinations!
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Weather Wise
              </Badge>
              <span className="text-xs text-muted-foreground">
                You always dress for the occasion
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedSupport;
