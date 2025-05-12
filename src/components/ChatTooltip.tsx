
import { useState, useEffect } from 'react';
import { Shirt, Calendar, CloudSun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface ChatTooltipProps {
  isVisible: boolean;
  onClose: () => void;
}

const ChatTooltip = ({ isVisible, onClose }: ChatTooltipProps) => {
  // Auto-close after 15 seconds if left open
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isVisible) {
      timer = setTimeout(() => {
        onClose();
      }, 15000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute bottom-20 right-4 w-[280px] z-40 sm:w-[320px] md:right-6"
        >
          <Card className="overflow-hidden border-primary/20 shadow-xl rounded-2xl">
            <div className="bg-primary p-3 text-white flex justify-between items-center">
              <h3 className="font-medium text-sm flex items-center gap-1.5">
                💬 Style Help
              </h3>
              <button 
                onClick={onClose}
                className="text-white hover:bg-primary-foreground/10 p-1 rounded-full transition-colors"
                aria-label="Close tooltip"
              >
                <X size={14} />
              </button>
            </div>
            
            <CardContent className="p-3 text-sm space-y-3 bg-white text-gray-800">
              <div className="flex items-start gap-2.5">
                <Shirt size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>Outfit ideas just for you</span>
              </div>
              
              <div className="flex items-start gap-2.5">
                <Calendar size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>Match your location/occasion</span>
              </div>
              
              <div className="flex items-start gap-2.5">
                <CloudSun size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>Weather-smart styles</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatTooltip;
