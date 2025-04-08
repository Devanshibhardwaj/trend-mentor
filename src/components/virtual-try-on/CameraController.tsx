
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Camera, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface CameraControllerProps {
  cameraActive: boolean;
  activateCamera: () => Promise<void>;
  onResetToModel: () => void;
}

const CameraController = ({
  cameraActive,
  activateCamera,
  onResetToModel
}: CameraControllerProps) => {
  const handleActivateCamera = async () => {
    try {
      await activateCamera();
    } catch (error) {
      console.error('Failed to activate camera:', error);
      toast.error('Camera activation failed. Please check permissions.');
    }
  };

  return (
    <motion.div 
      className="flex justify-center space-x-4 mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {!cameraActive ? (
        <Button 
          onClick={handleActivateCamera} 
          variant="outline"
          className="group relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors rounded-md"></span>
          <Camera className="h-4 w-4 mr-2" />
          Try On Using Camera
        </Button>
      ) : (
        <Button 
          onClick={onResetToModel}
          variant="outline"
          className="group relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors rounded-md"></span>
          <RotateCw className="h-4 w-4 mr-2" />
          Back to 3D View
        </Button>
      )}
    </motion.div>
  );
};

export default CameraController;
