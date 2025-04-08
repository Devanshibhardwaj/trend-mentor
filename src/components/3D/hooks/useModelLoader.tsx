
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { toast } from 'sonner';

export const useModelLoader = (url: string) => {
  const [loadError, setLoadError] = useState(false);
  const [model, setModel] = useState<THREE.Group | null>(null);
  
  // Determine if URL is a valid 3D model
  const isValidModel = url.endsWith('.glb') || url.endsWith('.gltf');
  
  // Use the useGLTF hook only for valid models
  // This hook must be called at the component level, not conditionally
  const gltfResult = isValidModel ? useGLTF(url) : null;
  
  useEffect(() => {
    // Reset state when URL changes
    setLoadError(false);
    setModel(null);
    
    // Notify user about the placeholder if not a valid model
    if (!isValidModel) {
      toast.info("Using placeholder 3D model", {
        description: "This is a visualization only, not the actual item",
        duration: 3000,
      });
      return;
    }
    
    // Process the model from the useGLTF hook result
    try {
      if (!gltfResult) {
        throw new Error("Failed to load 3D model");
      }
      
      // Safe way to access the scene property
      if (gltfResult && typeof gltfResult === 'object' && 'scene' in gltfResult) {
        const scene = gltfResult.scene;
        
        if (scene) {
          setModel(scene);
        } else {
          console.error("Model scene is undefined");
          setLoadError(true);
        }
      } else {
        console.error("Invalid GLTF result format");
        setLoadError(true);
      }
    } catch (error) {
      console.error("Failed to load 3D model:", error);
      setLoadError(true);
    }
  }, [url, isValidModel, gltfResult]);
  
  return { isValidModel, model, loadError };
};
