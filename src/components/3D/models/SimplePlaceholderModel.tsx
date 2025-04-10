
import { forwardRef, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { toast } from 'sonner';
import * as THREE from 'three';

interface SimplePlaceholderModelProps {
  url: string;
  autoRotate: boolean;
  hoverRotate?: boolean;
  color?: string;
  [key: string]: any;
}

// Update the type to accept either Mesh or Group
const SimplePlaceholderModel = forwardRef<THREE.Mesh | THREE.Group, SimplePlaceholderModelProps>(
  ({ url, autoRotate, hoverRotate = false, color = "#f3a5c3", ...props }, ref) => {
    // Create a local ref if one wasn't passed in
    const localRef = useRef<THREE.Mesh>(null);
    
    // Enhanced rotation with hover support
    useFrame(() => {
      if (autoRotate || hoverRotate) {
        const rotationSpeed = hoverRotate ? 0.03 : 0.01;
        
        if (localRef.current) {
          localRef.current.rotation.y += rotationSpeed;
        }
        
        // If external ref is provided, also apply rotation there
        if (ref && typeof ref === 'object' && ref.current) {
          ref.current.rotation.y += rotationSpeed;
        }
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
    
    return (
      <mesh
        ref={localRef}
        {...props}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
);

SimplePlaceholderModel.displayName = 'SimplePlaceholderModel';

export default SimplePlaceholderModel;
