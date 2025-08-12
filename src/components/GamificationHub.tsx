import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Gift, 
  Crown, 
  Flame,
  Calendar,
  Award,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  deadline: Date;
  reward: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
}

interface GamificationHubProps {
  compact?: boolean;
  className?: string;
}

const GamificationHub = ({ compact = false, className = '' }: GamificationHubProps) => {
  const { toast } = useToast();
  const [userLevel, setUserLevel] = useState(5);
  const [userXP, setUserXP] = useState(750);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);

  const xpToNextLevel = 1000;
  const xpProgress = (userXP / xpToNextLevel) * 100;

  const achievements: Achievement[] = [
    {
      id: 'first-outfit',
      title: 'Style Starter',
      description: 'Create your first outfit',
      icon: <Sparkles className="h-5 w-5" />,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      points: 50,
      rarity: 'common'
    },
    {
      id: 'week-streak',
      title: 'Fashion Devotee',
      description: 'Use the app for 7 consecutive days',
      icon: <Flame className="h-5 w-5" />,
      progress: 7,
      maxProgress: 7,
      unlocked: true,
      points: 200,
      rarity: 'rare'
    },
    {
      id: 'trendsetter',
      title: 'Trendsetter',
      description: 'Create 25 unique outfits',
      icon: <Crown className="h-5 w-5" />,
      progress: 18,
      maxProgress: 25,
      unlocked: false,
      points: 500,
      rarity: 'epic'
    },
    {
      id: 'style-master',
      title: 'Style Master',
      description: 'Reach level 10',
      icon: <Trophy className="h-5 w-5" />,
      progress: 5,
      maxProgress: 10,
      unlocked: false,
      points: 1000,
      rarity: 'legendary'
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 'daily-style',
      title: 'Daily Style Challenge',
      description: 'Create 3 outfits today',
      icon: <Target className="h-5 w-5" />,
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
      reward: 100,
      progress: 1,
      maxProgress: 3,
      completed: false
    },
    {
      id: 'color-challenge',
      title: 'Rainbow Week',
      description: 'Use 7 different colors this week',
      icon: <Star className="h-5 w-5" />,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      reward: 250,
      progress: 3,
      maxProgress: 7,
      completed: false
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const unlockAchievement = (achievement: Achievement) => {
    setShowAchievement(achievement);
    setUserXP(prev => prev + achievement.points);
    
    toast({
      title: "Achievement Unlocked! 🎉",
      description: `You earned ${achievement.points} XP for "${achievement.title}"`,
    });

    setTimeout(() => setShowAchievement(null), 3000);
  };

  const formatTimeLeft = (deadline: Date) => {
    const diff = deadline.getTime() - Date.now();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      return `${Math.floor(hours / 24)}d ${hours % 24}h`;
    }
    return `${hours}h ${minutes}m`;
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
            {userLevel}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">Level {userLevel}</div>
            <Progress value={xpProgress} className="h-1 w-16" />
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Flame className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-medium">{currentStreak}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium">{achievements.filter(a => a.unlocked).length}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed top-4 right-4 z-50"
          >
            <Card className="w-80 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                    {showAchievement.icon}
                  </div>
                  <div>
                    <div className="font-bold">Achievement Unlocked!</div>
                    <div className="text-sm opacity-90">{showAchievement.title}</div>
                    <div className="text-xs opacity-75">+{showAchievement.points} XP</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-2 rounded-full bg-primary text-primary-foreground text-xl font-bold">
                {userLevel}
              </div>
              <div className="text-sm font-medium">Level {userLevel}</div>
              <Progress value={xpProgress} className="h-2 mt-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {userXP}/{xpToNextLevel} XP
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-2 rounded-full bg-orange-100 text-orange-600">
                <Flame className="h-8 w-8" />
              </div>
              <div className="text-sm font-medium">{currentStreak} Day Streak</div>
              <div className="text-xs text-muted-foreground mt-1">Keep it up!</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-2 rounded-full bg-yellow-100 text-yellow-600">
                <Trophy className="h-8 w-8" />
              </div>
              <div className="text-sm font-medium">{achievements.filter(a => a.unlocked).length} Achievements</div>
              <div className="text-xs text-muted-foreground mt-1">
                {achievements.length - achievements.filter(a => a.unlocked).length} remaining
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Daily Challenges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="flex items-center gap-4 p-3 rounded-lg border">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                {challenge.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{challenge.title}</span>
                  <Badge variant="outline" className="text-xs">
                    +{challenge.reward} XP
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {challenge.description}
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(challenge.progress / challenge.maxProgress) * 100} 
                    className="h-2 flex-1" 
                  />
                  <span className="text-xs text-muted-foreground">
                    {challenge.progress}/{challenge.maxProgress}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatTimeLeft(challenge.deadline)} remaining
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    achievement.unlocked 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{achievement.title}</span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getRarityColor(achievement.rarity)}`}
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.description}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-primary">
                    +{achievement.points} XP
                  </div>
                </div>
                
                {!achievement.unlocked && (
                  <div className="space-y-1">
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-2" 
                    />
                    <div className="text-xs text-muted-foreground">
                      {achievement.progress}/{achievement.maxProgress}
                    </div>
                  </div>
                )}
                
                {achievement.unlocked && (
                  <div className="text-sm font-medium text-green-600">
                    ✓ Unlocked
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationHub;