
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface FeedbackSystemProps {
  outfitId?: string;
  onFeedbackSubmit?: (feedback: FeedbackData) => void;
}

interface FeedbackData {
  rating: number;
  helpful: boolean | null;
  tags: string[];
  comment: string;
  outfitId?: string;
}

const FeedbackSystem = ({ outfitId, onFeedbackSubmit }: FeedbackSystemProps) => {
  const [rating, setRating] = useState<number>(0);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const feedbackTags = [
    'Perfect fit',
    'Love the style',
    'Great for occasion',
    'Colors work well',
    'Feels confident',
    'Easy to wear',
    'Unique combination',
    'Comfortable',
    'Weather appropriate',
    'Budget friendly'
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    const feedbackData: FeedbackData = {
      rating,
      helpful,
      tags: selectedTags,
      comment,
      outfitId
    };

    // Save to localStorage for now
    const existingFeedback = JSON.parse(localStorage.getItem('outfitFeedback') || '[]');
    const newFeedback = [...existingFeedback, { ...feedbackData, timestamp: new Date().toISOString() }];
    localStorage.setItem('outfitFeedback', JSON.stringify(newFeedback));

    if (onFeedbackSubmit) {
      onFeedbackSubmit(feedbackData);
    }

    setSubmitted(true);
    toast.success("Thank you for your feedback! This helps us improve your styling experience.");
  };

  const isValid = rating > 0 && helpful !== null;

  if (submitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-medium text-green-800 mb-2">Thank you for your feedback!</h4>
          <p className="text-sm text-green-600">
            Your input helps us understand your style better and improve future recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          How did we do?
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Your feedback helps us learn your style and improve future recommendations
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Star Rating */}
        <div>
          <label className="text-sm font-medium mb-2 block">Rate this outfit recommendation</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star 
                  className={`h-6 w-6 ${
                    star <= rating 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Helpful Vote */}
        <div>
          <label className="text-sm font-medium mb-2 block">Was this recommendation helpful?</label>
          <div className="flex gap-2">
            <Button
              variant={helpful === true ? "default" : "outline"}
              size="sm"
              onClick={() => setHelpful(true)}
              className="flex items-center gap-1"
            >
              <ThumbsUp className="h-4 w-4" />
              Yes
            </Button>
            <Button
              variant={helpful === false ? "default" : "outline"}
              size="sm"
              onClick={() => setHelpful(false)}
              className="flex items-center gap-1"
            >
              <ThumbsDown className="h-4 w-4" />
              No
            </Button>
          </div>
        </div>

        {/* Feedback Tags */}
        <div>
          <label className="text-sm font-medium mb-2 block">What did you love about this outfit? (Optional)</label>
          <div className="flex flex-wrap gap-2">
            {feedbackTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="text-sm font-medium mb-2 block">Additional thoughts (Optional)</label>
          <Textarea
            placeholder="Tell us more about what you liked or how we could improve..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full"
        >
          Submit Feedback
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeedbackSystem;
