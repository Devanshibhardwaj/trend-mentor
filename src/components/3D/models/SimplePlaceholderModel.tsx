
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { toast } from 'sonner';
import * as THREE from 'three';

interface SimplePlaceholderModelProps {
  url: string;
  autoRotate: boolean;
  hoverRotate?: boolean;
  color?: string;
  wireframe?: boolean;
  detail?: number;
  pulsate?: boolean;
  [key: string]: any;
}

// Update the type to accept either Mesh or Group
const SimplePlaceholderModel = forwardRef<THREE.Mesh | THREE.Group, SimplePlaceholderModelProps>(
  ({ url, autoRotate, hoverRotate = false, color = "#f3a5c3", wireframe = false, detail = 1, pulsate = false, ...props }, ref) => {
    // Create a local ref if one wasn't passed in
    const localRef = useRef<THREE.Mesh>(null);
    const [scale, setScale] = useState(1);
    const [hovered, setHovered] = useState(false);
    
    // Enhanced rotation with hover support
    useFrame((state, delta) => {
      if (autoRotate || (hoverRotate && hovered)) {
        const rotationSpeed = hovered ? 0.03 : 0.01;
        
        if (localRef.current) {
          localRef.current.rotation.y += rotationSpeed;
        }
        
        // If external ref is provided, also apply rotation there
        if (ref && typeof ref === 'object' && ref.current) {
          ref.current.rotation.y += rotationSpeed;
        }
      }
      
      // Add pulsating effect if enabled
      if (pulsate && localRef.current) {
        const pulsateSpeed = 0.5;
        const pulsateAmount = 0.1;
        const newScale = 1 + Math.sin(state.clock.elapsedTime * pulsateSpeed) * pulsateAmount;
        setScale(newScale);
        localRef.current.scale.setScalar(newScale);
      }
    });
    
    useEffect(() => {
      // Notify once about the placeholder
      const toastId = "placeholder-model";
      try {
        toast.info("Using placeholder 3D model", {
          id: toastId,
          description: "This is a simplified visualization",
          duration: 3000,
        });
      } catch (error) {
        console.error("Toast error:", error);
      }
    }, []);
    
    // Generate a unique color based on URL if none provided
    const derivedColor = color || (() => {
      const hash = url.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      return `hsl(${Math.abs(hash) % 360}, 70%, 60%)`;
    })();
    
    // Choose a more interesting geometry based on URL
    const getGeometry = () => {
      // Use URL to deterministically choose a geometry
      const urlHash = url.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + acc;
      }, 0);
      
      const geometryType = urlHash % 7; // Extended to 7 different geometry types
      
      switch(geometryType) {
        case 0:
          return <dodecahedronGeometry args={[1, detail]} />;
        case 1:
          return <octahedronGeometry args={[1, detail]} />;
        case 2:
          return <icosahedronGeometry args={[1, detail]} />;
        case 3:
          return <torusKnotGeometry args={[0.7, 0.3, 64, 16]} />;
        case 4:
          return <sphereGeometry args={[1, 32, 32]} />;
        case 5:
          return <coneGeometry args={[1, 2, 32]} />;
        default:
          return <boxGeometry args={[1, 1, 1]} />;
      }
    };
    
    return (
      <mesh
        ref={localRef}
        {...props}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getGeometry()}
        <meshStandardMaterial 
          color={hovered ? new THREE.Color(derivedColor).offsetHSL(0, 0.1, 0.2).getStyle() : derivedColor} 
          wireframe={wireframe}
          roughness={0.3}
          metalness={0.6}
          emissive={hovered ? derivedColor : undefined}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
    );
  }
);

SimplePlaceholderModel.displayName = 'SimplePlaceholderModel';

export default SimplePlaceholderModel;
