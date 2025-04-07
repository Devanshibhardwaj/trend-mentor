
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Move, ZoomIn } from 'lucide-react';

interface InstructionsOverlayProps {
  onClose: () => void;
}

const InstructionsOverlay = ({ onClose }: InstructionsOverlayProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-background/40 backdrop-blur-sm flex flex-col items-center justify-center"
      onClick={onClose}
    >
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-xs text-center">
        <h3 className="font-bold text-lg mb-4">Interactive 3D View</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col items-center">
            <Move className="h-8 w-8 mb-2 text-primary" />
            <p className="text-sm">Drag to rotate</p>
          </div>
          <div className="flex flex-col items-center">
            <ZoomIn className="h-8 w-8 mb-2 text-primary" />
            <p className="text-sm">Scroll to zoom</p>
          </div>
        </div>
        <Button variant="default" size="sm" className="mt-2" onClick={onClose}>
          Got it
        </Button>
      </div>
    </motion.div>
  );
};

export default InstructionsOverlay;
