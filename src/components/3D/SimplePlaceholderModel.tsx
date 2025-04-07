
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { toast } from 'sonner';

interface SimplePlaceholderModelProps {
  url: string;
  [key: string]: any;
}

const SimplePlaceholderModel = ({ url, ...props }: SimplePlaceholderModelProps) => {
  const meshRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Auto-rotate effect
  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.003;
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
      ref={meshRef}
      {...props}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#f3a5c3" />
    </mesh>
  );
};

export default SimplePlaceholderModel;
