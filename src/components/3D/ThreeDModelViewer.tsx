
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PresentationControls } from '@react-three/drei';
import { useTheme } from "@/contexts/ThemeContext";
import DressModel from './models/DressModel';
import InstructionsOverlay from './overlays/InstructionsOverlay';
import ControlsOverlay from './overlays/ControlsOverlay';
import FallbackImage from './fallbacks/FallbackImage';

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
  const [modelFailed, setModelFailed] = useState(false);
  const [canvasError, setCanvasError] = useState(false);
  
  // Different environment presets based on theme
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
  
  // Handle toggle auto rotation
  const handleToggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };
  
  // Error boundary for Canvas
  const handleCanvasError = (error: Error) => {
    console.error("Canvas error:", error);
    setCanvasError(true);
    setModelFailed(true);
  };
  
  // Fallback for non-3D models - show image instead
  if (modelFailed || canvasError) {
    return (
      <FallbackImage 
        modelUrl={modelUrl} 
        title={title}
        onRetry={() => {
          setModelFailed(false);
          setCanvasError(false);
        }}
        className={className}
      />
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
        onError={handleCanvasError}
      >
        <color attach="background" args={[theme === 'elegant' ? '#f8f9fa' : theme === 'cosmic' ? '#13111c' : '#ffffff']} />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Stage environment={getEnvironmentPreset()} preset="soft" intensity={0.5}>
              <DressModel url={modelUrl} autoRotate={autoRotate} />
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
        </Suspense>
      </Canvas>
      
      {/* Interactive controls overlay */}
      {showControls && (
        <ControlsOverlay 
          title={title}
          autoRotate={autoRotate}
          onToggleAutoRotate={handleToggleAutoRotate}
        />
      )}
      
      {/* Tutorial overlay */}
      {showInstructions && (
        <InstructionsOverlay onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
};

export default ThreeDModelViewer;
