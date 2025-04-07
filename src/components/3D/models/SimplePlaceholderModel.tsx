
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
      toast.info("3D model placeholder is being displayed", {
        description: "This is a simple 3D object as a placeholder",
        duration: 3000,
      });
      
      return () => {
        // Cleanup
      };
    }, [url]);
    
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
