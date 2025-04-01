
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { MoveVertical, MoveHorizontal, CornerRightDown, Users } from 'lucide-react';

interface StyleAvatarProps {
  bodyType: string;
  personality: string;
}

const StyleAvatar = ({ bodyType, personality }: StyleAvatarProps) => {
  const [pose, setPose] = useState<'standing' | 'sitting' | 'walking'>('standing');
  const [avatarImage, setAvatarImage] = useState<string>('/images/avatars/neutral-standing.png');
  const [tip, setTip] = useState<string>('Stand tall with shoulders back and head high for a confident posture.');
  
  useEffect(() => {
    // Update avatar image based on pose and body type
    updateAvatarImage();
    // Update posture tip based on pose
    updatePostureTip();
  }, [pose, bodyType, personality]);
  
  const updateAvatarImage = () => {
    // In a real app, these would be actual images for different body types and poses
    const baseImagePath = '/images/avatars/';
    const imageMap: Record<string, Record<string, string>> = {
      hourglass: {
        standing: `${baseImagePath}hourglass-standing.png`,
        sitting: `${baseImagePath}hourglass-sitting.png`,
        walking: `${baseImagePath}hourglass-walking.png`,
      },
      pear: {
        standing: `${baseImagePath}pear-standing.png`,
        sitting: `${baseImagePath}pear-sitting.png`,
        walking: `${baseImagePath}pear-walking.png`,
      },
      apple: {
        standing: `${baseImagePath}apple-standing.png`,
        sitting: `${baseImagePath}apple-sitting.png`,
        walking: `${baseImagePath}apple-walking.png`,
      },
      rectangle: {
        standing: `${baseImagePath}rectangle-standing.png`,
        sitting: `${baseImagePath}rectangle-sitting.png`,
        walking: `${baseImagePath}rectangle-walking.png`,
      },
      // Fallback to neutral
      default: {
        standing: `${baseImagePath}neutral-standing.png`,
        sitting: `${baseImagePath}neutral-sitting.png`,
        walking: `${baseImagePath}neutral-walking.png`,
      },
    };
    
    // Use the correct image based on body type and pose, with fallback
    const bodyTypeImages = imageMap[bodyType] || imageMap.default;
    setAvatarImage(bodyTypeImages[pose] || imageMap.default[pose]);
  };
  
  const updatePostureTip = () => {
    // Generate posture tips based on pose and personality
    const tipsByPose: Record<string, string[]> = {
      standing: [
        'Stand tall with shoulders back and head high for a confident posture.',
        'Distribute weight evenly on both feet, slightly apart, for balanced standing.',
        'Keep your arms relaxed at your sides, not stiff or crossing your chest.',
        'Engage your core slightly to support your spine in a natural position.',
      ],
      sitting: [
        'Sit with your back straight and shoulders relaxed against the chair.',
        'Keep both feet flat on the floor rather than crossing your legs.',
        'Position yourself at the back of the chair with your lower back supported.',
        'Avoid hunching forward, especially when using electronic devices.',
      ],
      walking: [
        'Walk with purpose and confidence - head up, eyes forward.',
        'Let your arms swing naturally at your sides as you walk.',
        'Take comfortable strides that match your height and leg length.',
        'Land on your heel and roll through to your toes for a smooth gait.',
      ],
    };
    
    // For different personalities we might emphasize different aspects
    let tipIndex = 0;
    if (personality === 'creative') {
      tipIndex = 1;
    } else if (personality === 'minimalist') {
      tipIndex = 2;
    } else if (personality === 'dramatic') {
      tipIndex = 3;
    }
    
    setTip(tipsByPose[pose][tipIndex] || tipsByPose[pose][0]);
  };
  
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-indigo-950/30 dark:to-blue-950/30">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h4 className="font-medium text-lg">Your Style Avatar</h4>
          <p className="text-sm text-muted-foreground">
            Explore different poses and get personalized posture tips
          </p>
          
          <div className="relative w-64 h-64 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 rounded-full overflow-hidden my-4 border-4 border-white dark:border-gray-800 shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Fallback placeholder if avatarImage doesn't load */}
              <Users className="h-20 w-20 text-muted-foreground/30" />
            </div>
            
            {/* In a real app, replace with actual avatar images */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-gray-100/70 dark:to-gray-900/70">
              <img src={avatarImage} alt="Style avatar" className="max-w-full max-h-full object-contain" />
            </div>
            
            <Badge className="absolute top-4 right-4 bg-white/80 text-primary dark:bg-gray-900/80">
              {bodyType || 'Neutral'} Type
            </Badge>
          </div>
          
          <div className="w-full max-w-xs">
            <RadioGroup 
              value={pose} 
              onValueChange={(value) => setPose(value as 'standing' | 'sitting' | 'walking')}
              className="flex gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standing" id="standing" />
                <Label htmlFor="standing" className="flex items-center">
                  <MoveVertical className="h-4 w-4 mr-1" /> Standing
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sitting" id="sitting" />
                <Label htmlFor="sitting" className="flex items-center">
                  <CornerRightDown className="h-4 w-4 mr-1" /> Sitting
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="walking" id="walking" />
                <Label htmlFor="walking" className="flex items-center">
                  <MoveHorizontal className="h-4 w-4 mr-1" /> Walking
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg w-full">
            <p className="text-sm font-medium">Posture Tip:</p>
            <p className="text-sm mt-1">{tip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleAvatar;
