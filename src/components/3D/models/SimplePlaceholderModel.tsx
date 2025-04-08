
import { forwardRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { toast } from 'sonner';

interface SimplePlaceholderModelProps {
  url: string;
  autoRotate: boolean;
  [key: string]: any;
}

const SimplePlaceholderModel = forwardRef<THREE.Mesh, SimplePlaceholderModelProps>(
  ({ url, autoRotate, ...props }, ref) => {
    // Auto-rotate effect
    useFrame(() => {
      if (ref && 'current' in ref && ref.current && autoRotate) {
        ref.current.rotation.y += 0.003;
      }
    });
    
    useEffect(() => {
      // Notify once about the placeholder
      const toastId = "placeholder-model";
      toast.info("Using placeholder 3D model", {
        id: toastId,
        description: "This is a simplified visualization",
        duration: 3000,
      });
      
      return () => {
        // Cleanup
      };
    }, []);
    
    // Create a simple colored box as placeholder
    return (
      <mesh
        ref={ref}
        {...props}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f3a5c3" />
      </mesh>
    );
  }
);

SimplePlaceholderModel.displayName = 'SimplePlaceholderModel';

export default SimplePlaceholderModel;
