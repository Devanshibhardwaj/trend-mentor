
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface SavedLooksProps {
  onTryOnClick: () => void;
}

const SavedLooks = ({ onTryOnClick }: SavedLooksProps) => {
  return (
    <motion.div 
      className="text-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <RefreshCw className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No Saved Looks Yet</h3>
      <p className="text-muted-foreground mt-2 mb-6">
        Try on some outfits and save your favorites to see them here.
      </p>
      <Button onClick={onTryOnClick}>
        Start Virtual Try-On
      </Button>
    </motion.div>
  );
};

export default SavedLooks;
