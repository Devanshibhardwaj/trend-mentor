
import { forwardRef, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { toast } from 'sonner';
import * as THREE from 'three';

interface SimplePlaceholderModelProps {
  url: string;
  autoRotate: boolean;
  [key: string]: any;
}

const SimplePlaceholderModel = forwardRef<THREE.Mesh, SimplePlaceholderModelProps>(
  ({ url, autoRotate, ...props }, ref) => {
    // Create a local ref if one wasn't passed in
    const localRef = useRef<THREE.Mesh>(null);
    const actualRef = (ref as React.MutableRefObject<THREE.Mesh>) || localRef;
    
    // Auto-rotate effect with proper null checking
    useFrame(() => {
      if (actualRef && actualRef.current) {
        if (autoRotate) {
          actualRef.current.rotation.y += 0.003;
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
      
      return () => {
        // Cleanup
      };
    }, []);
    
    // Create a simple colored box as placeholder
    try {
      return (
        <mesh
          ref={ref}
          {...props}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#f3a5c3" />
        </mesh>
      );
    } catch (error) {
      console.error("Error rendering placeholder model:", error);
      // Return an empty group as absolute fallback
      return <group />;
    }
  }
);

SimplePlaceholderModel.displayName = 'SimplePlaceholderModel';

export default SimplePlaceholderModel;
