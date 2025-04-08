
import { forwardRef, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { toast } from 'sonner';
import * as THREE from 'three';

interface SimplePlaceholderModelProps {
  url: string;
  autoRotate: boolean;
  color?: string;
  [key: string]: any;
}

// Update the type to accept either Mesh or Group
const SimplePlaceholderModel = forwardRef<THREE.Mesh | THREE.Group, SimplePlaceholderModelProps>(
  ({ url, autoRotate, color = "#f3a5c3", ...props }, ref) => {
    // Create a local ref if one wasn't passed in
    const localRef = useRef<THREE.Mesh>(null);
    
    // Fix the ref handling to properly work with forwardRef
    useFrame(() => {
      if (autoRotate) {
        if (localRef.current) {
          localRef.current.rotation.y += 0.01;
        }
        
        // If external ref is provided, also apply rotation there
        if (ref && typeof ref === 'object' && ref.current) {
          ref.current.rotation.y += 0.01;
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
