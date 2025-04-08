
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface CameraViewProps {
  cameraActive: boolean;
  videoStream: MediaStream | null;
  selectedOutfit: number | null;
  outfitName: string;
  activeFilter: string;
  brightness: number;
  contrast: number;
  saturation: number;
  showAccessories: boolean;
  selectedAccessory: string | null;
  onCapture: () => void;
  onStopCamera: () => void;
}

const CameraView = ({
  cameraActive,
  videoStream,
  selectedOutfit,
  outfitName,
  activeFilter,
  brightness,
  contrast,
  saturation,
  showAccessories,
  selectedAccessory,
  onCapture,
  onStopCamera
}: CameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (cameraActive && videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play();
      };
    }
  }, [cameraActive, videoStream]);

  useEffect(() => {
    if (cameraActive && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      const renderFrame = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          // Set canvas dimensions to match video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          // Draw the video frame
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Apply filters
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Apply brightness, contrast, saturation
          for (let i = 0; i < data.length; i += 4) {
            // Apply brightness
            const brightnessAdjust = brightness / 100;
            data[i] = Math.min(255, Math.max(0, data[i] * brightnessAdjust));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * brightnessAdjust));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * brightnessAdjust));
            
            // Apply filter effects
            switch (activeFilter) {
              case 'grayscale':
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
                break;
              case 'sepia':
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
                data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
                data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
                break;
              case 'cool':
                data[i + 2] = Math.min(255, data[i + 2] * 1.2); // Boost blue
                break;
              case 'warm':
                data[i] = Math.min(255, data[i] * 1.2); // Boost red
                break;
              case 'vintage':
                data[i] = Math.min(255, data[i] * 1.1);
                data[i + 1] = Math.min(255, data[i + 1] * 0.9);
                data[i + 2] = Math.min(255, data[i + 2] * 0.8);
                break;
            }
            
            // Apply contrast
            const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
            data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
            data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
            data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
            
            // Apply saturation
            const satFactor = saturation / 100;
            const gray = 0.2989 * data[i] + 0.5870 * data[i + 1] + 0.1140 * data[i + 2];
            data[i] = Math.min(255, Math.max(0, gray + satFactor * (data[i] - gray)));
            data[i + 1] = Math.min(255, Math.max(0, gray + satFactor * (data[i + 1] - gray)));
            data[i + 2] = Math.min(255, Math.max(0, gray + satFactor * (data[i + 2] - gray)));
          }
          
          ctx.putImageData(imageData, 0, 0);
          
          // Draw accessories if enabled
          if (showAccessories && selectedAccessory) {
            // Here we would position accessories based on face detection
            // For demo, just position in center
            ctx.font = '100px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.textAlign = 'center';
            
            // Simple accessory placement - in a real app, you'd use face detection
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 3;
            
            if (selectedAccessory === 'Sunglasses') {
              ctx.fillText('🕶️', centerX, centerY);
            } else if (selectedAccessory === 'Crown') {
              ctx.fillText('👑', centerX, centerY - 50);
            } else if (selectedAccessory === 'Earrings') {
              ctx.fillText('💎', centerX - 100, centerY);
              ctx.fillText('💎', centerX + 100, centerY);
            } else if (selectedAccessory === 'Necklace') {
              ctx.fillText('📿', centerX, centerY + 100);
            }
          }
        }
        requestAnimationFrame(renderFrame);
      };
      
      renderFrame();
    }
  }, [cameraActive, activeFilter, brightness, contrast, saturation, showAccessories, selectedAccessory]);

  return (
    <div className="aspect-video bg-black relative overflow-hidden">
      {/* Hidden video element for capturing camera feed */}
      <video 
        ref={videoRef}
        autoPlay 
        playsInline 
        muted
        className="hidden"
      ></video>
      
      {/* Canvas for displaying processed video with filters/accessories */}
      <canvas 
        ref={canvasRef}
        className="w-full h-full object-cover"
      ></canvas>
      
      <motion.div 
        className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-md px-3 py-1 text-sm"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center">
          <Sparkles className="h-3 w-3 mr-1 text-primary" />
          Trying: {outfitName || "Select an outfit"}
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button variant="secondary" onClick={onStopCamera}>
          Stop Camera
        </Button>
        <Button 
          onClick={onCapture} 
          disabled={!selectedOutfit}
          className="bg-primary/90 hover:bg-primary"
        >
          Capture Try-On
        </Button>
      </motion.div>
    </div>
  );
};

export default CameraView;
