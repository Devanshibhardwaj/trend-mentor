
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PresentationControls } from '@react-three/drei';
import { useTheme } from "@/contexts/ThemeContext";
import DressModel from './models/DressModel';
import InstructionsOverlay from './overlays/InstructionsOverlay';
import ControlsOverlay from './overlays/ControlsOverlay';
import FallbackImage from './fallbacks/FallbackImage';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'framer-motion';

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
  const [isHovered, setIsHovered] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [modelFailed, setModelFailed] = useState(false);
  
  // Different environment presets based on theme
  const getEnvironmentPreset = () => {
    if (!theme) return 'studio';
    
    switch (theme) {
      case 'nautical': return 'city';
      case 'sunset': return 'sunset';
      case 'forest': return 'park';
      case 'galaxy': return 'night';
      case 'system': return 'studio';
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

  // Mouse hover handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
    console.log("Model hovered");
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    console.log("Model hover ended");
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
    <motion.div 
      className={`relative overflow-hidden rounded-lg shadow-md ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
        translateY: -3 
      }}
    >
      {/* Elegant frame */}
      <div className="absolute inset-0 border border-luxury-gold-200/30 rounded-lg pointer-events-none z-10" />
      
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
          <color attach="background" args={[theme === 'nautical' ? '#fcfbf9' : theme === 'galaxy' ? '#13111c' : '#ffffff']} />
          
          <Suspense fallback={null}>
            <PresentationControls
              global
              zoom={0.8}
              rotation={[0, -Math.PI / 4, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <Stage environment={getEnvironmentPreset()} preset="soft" intensity={0.5}>
                <DressModel 
                  url={modelUrl || ''} 
                  autoRotate={autoRotate}
                  hoverRotate={isHovered && !autoRotate} 
                />
              </Stage>
            </PresentationControls>
            
            <OrbitControls 
              autoRotate={autoRotate || (isHovered && !autoRotate)}
              autoRotateSpeed={isHovered ? 8 : 5} // Faster rotation on hover
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
    </motion.div>
  );
};

export default ThreeDModelViewer;
