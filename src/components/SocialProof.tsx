import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, Heart, TrendingUp, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  outfit: string;
  timeAgo: string;
  verified: boolean;
}

interface SocialProofProps {
  variant?: 'compact' | 'detailed' | 'floating';
  className?: string;
}

const SocialProof = ({ variant = 'compact', className = '' }: SocialProofProps) => {
  const [currentReview, setCurrentReview] = useState(0);
  const [stats, setStats] = useState({
    totalUsers: 25000,
    outfitsCreated: 150000,
    avgRating: 4.8,
    trendsFollowed: 1200
  });

  const reviews: Review[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b098?w=150',
      rating: 5,
      comment: 'Found my perfect work wardrobe! The AI suggestions are spot-on.',
      outfit: 'Professional Chic Look',
      timeAgo: '2 hours ago',
      verified: true
    },
    {
      id: '2', 
      name: 'Arjun Patel',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5,
      comment: 'Never knew I could look this good! Thanks StyleSage ✨',
      outfit: 'Weekend Casual Vibe',
      timeAgo: '5 hours ago',
      verified: true
    },
    {
      id: '3',
      name: 'Sneha Reddy',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 4,
      comment: 'Love the weather-based suggestions. So practical!',
      outfit: 'Monsoon Ready Style',
      timeAgo: '1 day ago',
      verified: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (variant === 'floating') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed bottom-4 right-4 z-40 ${className}`}
      >
        <Card className="w-80 bg-background/95 backdrop-blur-sm border shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">
                Live Activity
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Sarah M.</span> just created 
              a stunning date night look in Mumbai
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                2 minutes ago
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Loved by Fashion Enthusiasts</h3>
          <p className="text-muted-foreground">Join thousands creating their perfect style</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{stats.totalUsers.toLocaleString()}+</div>
            <div className="text-sm text-muted-foreground">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{stats.outfitsCreated.toLocaleString()}+</div>
            <div className="text-sm text-muted-foreground">Outfits Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{stats.avgRating}</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{stats.trendsFollowed}+</div>
            <div className="text-sm text-muted-foreground">Trends Followed</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className="h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{review.name}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Quote className="h-4 w-4 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                <div className="text-xs text-muted-foreground">
                  {review.outfit} • {review.timeAgo}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Compact variant
  return (
    <div className={`flex items-center justify-center gap-8 py-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium">{stats.totalUsers.toLocaleString()}+ users</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="text-sm font-medium">{stats.avgRating} rating</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentReview}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex items-center gap-2"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={reviews[currentReview].avatar} alt={reviews[currentReview].name} />
            <AvatarFallback>{reviews[currentReview].name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            "{reviews[currentReview].comment.slice(0, 50)}..."
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SocialProof;