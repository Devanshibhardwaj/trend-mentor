
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { toast } from 'sonner';
import SimplePlaceholderModel from './SimplePlaceholderModel';

interface DressModelProps {
  url: string;
  [key: string]: any;
}

const DressModel = ({ url, ...props }: DressModelProps) => {
  const meshRef = useRef(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Only attempt to load the model if we have a proper 3D model URL (not an image)
  const is3DModelURL = url.endsWith('.glb') || url.endsWith('.gltf');
  
  // Auto-rotate effect
  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.003;
    }
  });
  
  useEffect(() => {
    // Notify user about the placeholder
    if (!is3DModelURL) {
      toast.info("Using placeholder 3D model", {
        description: "This is a visualization only, not the actual item",
        duration: 3000,
      });
    }
  }, [is3DModelURL, url]);
  
  // If we can't load a real model, use our simple placeholder
  if (!is3DModelURL || loadFailed) {
    return <SimplePlaceholderModel ref={meshRef} url={url} {...props} />;
  }
  
  // Attempt to load the actual 3D model
  try {
    // Properly handle the GLTF type which can be a single object or an array
    const gltfResult = useGLTF(url);
    
    // Safe way to access the scene property regardless of return type
    let scene = null;
    if (Array.isArray(gltfResult)) {
      // If it's an array, take the first item's scene
      scene = gltfResult[0]?.scene;
    } else {
      // If it's a single object
      scene = gltfResult.scene;
    }
    
    if (!scene) {
      console.error("Failed to load 3D model scene");
      return <SimplePlaceholderModel ref={meshRef} url={url} {...props} />;
    }
    
    return (
      <primitive 
        ref={meshRef} 
        object={scene} 
        scale={1.5} 
        {...props} 
      />
    );
  } catch (error) {
    console.error("Failed to load 3D model:", error);
    setLoadFailed(true);
    return <SimplePlaceholderModel ref={meshRef} url={url} {...props} />;
  }
};

export default DressModel;
