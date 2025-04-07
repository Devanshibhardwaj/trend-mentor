
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';

interface ControlsOverlayProps {
  title: string;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
}

const ControlsOverlay = ({ title, autoRotate, onToggleAutoRotate }: ControlsOverlayProps) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex space-x-2"
      >
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-background/80 backdrop-blur-sm"
          onClick={onToggleAutoRotate}
        >
          <RotateCw className={`h-4 w-4 mr-2 ${autoRotate ? 'text-primary' : ''}`} />
          {autoRotate ? 'Stop' : 'Auto Rotate'}
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs"
      >
        {title}
      </motion.div>
    </div>
  );
};

export default ControlsOverlay;
