
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { toast } from 'sonner';

export const useModelLoader = (url: string) => {
  const [loadError, setLoadError] = useState(false);
  const [model, setModel] = useState(null);
  
  // Determine if URL is a valid 3D model
  const isValidModel = url.endsWith('.glb') || url.endsWith('.gltf');
  
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
    
    // Attempt to load the model
    try {
      // Properly handle the GLTF type
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
        setLoadError(true);
        return;
      }
      
      setModel(scene);
    } catch (error) {
      console.error("Failed to load 3D model:", error);
      setLoadError(true);
    }
  }, [url, isValidModel]);
  
  return { isValidModel, model, loadError };
};
