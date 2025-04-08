
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PresentationControls } from '@react-three/drei';
import { useTheme } from "@/contexts/ThemeContext";
import DressModel from './models/DressModel';
import InstructionsOverlay from './overlays/InstructionsOverlay';
import ControlsOverlay from './overlays/ControlsOverlay';
import FallbackImage from './fallbacks/FallbackImage';
import { ErrorBoundary } from 'react-error-boundary';

interface ThreeDModelViewerProps {
  modelUrl?: string;
  title?: string;
  showControls?: boolean;
  className?: string;
}

const ThreeDModelViewer = ({ 
  modelUrl = "/placeholder.svg", 
  title = "3D Model Viewer",
  showControls = true,
  className = ""
}: ThreeDModelViewerProps) => {
  const { theme } = useTheme();
  const [autoRotate, setAutoRotate] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const [modelFailed, setModelFailed] = useState(false);
  
  // Different environment presets based on theme
  const getEnvironmentPreset = () => {
    if (!theme) return 'studio';
    
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
    console.log("Toggling auto rotation:", !autoRotate);
    setAutoRotate(!autoRotate);
  };
  
  // Handle Canvas errors
  const handleCanvasError = (error: any) => {
    console.error("Canvas rendering failed", error);
    setModelFailed(true);
  };

  // Error fallback component
  const ErrorFallback = () => {
    return (
      <FallbackImage 
        modelUrl={modelUrl} 
        title={title}
        onRetry={() => setModelFailed(false)}
        className={className}
      />
    );
  };
  
  // Fallback for non-3D models - show image instead
  if (modelFailed) {
    return (
      <FallbackImage 
        modelUrl={modelUrl} 
        title={title}
        onRetry={() => setModelFailed(false)}
        className={className}
      />
    );
  }
  
  return (
    <div className={`relative overflow-hidden rounded-lg ${className || ''}`}>
      {/* 3D Canvas with error boundary */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          camera={{ fov: 45 }}
          className="touch-none"
          onCreated={(state) => {
            // Ensure renderer exists
            if (!state || !state.gl) {
              console.error("WebGL renderer not available");
              setModelFailed(true);
            }
          }}
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
                <DressModel url={modelUrl || ''} autoRotate={autoRotate} />
              </Stage>
            </PresentationControls>
            
            <OrbitControls 
              autoRotate={autoRotate}
              autoRotateSpeed={5} // Increased from 3 to 5 for better visibility
              enableZoom={true}
              enablePan={true}
              dampingFactor={0.05}
              minDistance={3}
              maxDistance={10}
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      
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
