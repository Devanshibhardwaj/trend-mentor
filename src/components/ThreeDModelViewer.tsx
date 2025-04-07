
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, PresentationControls } from '@react-three/drei';
import { Mesh } from 'three';
import { Button } from '@/components/ui/button';
import { RefreshCw, RotateCw, Move, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from 'sonner';

// Sample model for demonstration
const DressModel = ({ url, ...props }: { url: string }) => {
  const meshRef = useRef<Mesh>(null);
  const { scene } = useGLTF('/placeholder.svg'); // Placeholder until real model
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Auto-rotate effect
  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.003;
    }
  });
  
  useEffect(() => {
    // Would normally load the model from url
    toast.info("3D model placeholder is being displayed", {
      description: "Real models would be loaded from actual files",
      duration: 3000,
    });
    
    return () => {
      // Cleanup
    };
  }, [url]);
  
  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      scale={1.5} 
      {...props} 
    />
  );
};

interface ThreeDModelViewerProps {
  modelUrl?: string;
  title?: string;
  showControls?: boolean;
  className?: string;
}

const ThreeDModelViewer = ({ 
  modelUrl = "/lovable-uploads/29e68d4d-0754-4c2c-b1af-217373bb4050.png", 
  title = "3D Model Viewer",
  showControls = true,
  className = ""
}: ThreeDModelViewerProps) => {
  const { theme } = useTheme();
  const [autoRotate, setAutoRotate] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  
  // Different environment colors based on theme
  const getEnvironmentPreset = () => {
    switch (theme) {
      case 'elegant': return 'city';
      case 'vibrant': return 'sunset';
      case 'playful': return 'park';
      case 'cosmic': return 'night';
      default: return 'studio';
    }
  };
  
  // Hide instructions after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Fallback for non-3D models - show image instead
  const [modelFailed, setModelFailed] = useState(false);
  
  if (modelFailed) {
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
            onClick={() => setModelFailed(false)}
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Try 3D Again
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* 3D Canvas */}
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ fov: 45 }}
        className="touch-none"
      >
        <color attach="background" args={[theme === 'elegant' ? '#f8f9fa' : theme === 'cosmic' ? '#13111c' : '#ffffff']} />
        
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, -Math.PI / 4, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Stage environment={getEnvironmentPreset()} preset="soft" intensity={0.5}>
            <DressModel url={modelUrl} />
          </Stage>
        </PresentationControls>
        
        <OrbitControls 
          autoRotate={autoRotate}
          autoRotateSpeed={3}
          enableZoom={true}
          enablePan={true}
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
      
      {/* Interactive controls overlay */}
      {showControls && (
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
              onClick={() => setAutoRotate(!autoRotate)}
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
      )}
      
      {/* Tutorial overlay */}
      {showInstructions && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/40 backdrop-blur-sm flex flex-col items-center justify-center"
          onClick={() => setShowInstructions(false)}
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
            <Button variant="default" size="sm" className="mt-2" onClick={() => setShowInstructions(false)}>
              Got it
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ThreeDModelViewer;
