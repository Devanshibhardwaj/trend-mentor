
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface FallbackImageProps {
  modelUrl: string;
  title: string;
  onRetry: () => void;
  className?: string;
}

const FallbackImage = ({ modelUrl, title, onRetry, className = "" }: FallbackImageProps) => {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-muted ${className}`}>
      <img 
        src={modelUrl} 
        alt={title}
        className="w-full h-full object-contain"
      />
      <div className="absolute bottom-4 right-4">
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-background/80 backdrop-blur-sm"
          onClick={onRetry}
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Try 3D Again
        </Button>
      </div>
    </div>
  );
};

export default FallbackImage;
