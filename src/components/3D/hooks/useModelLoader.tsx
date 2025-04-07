
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { toast } from 'sonner';
import { GLTF } from 'three-stdlib';
import { ObjectMap } from '@react-three/fiber';

export const useModelLoader = (url: string) => {
  const [loadError, setLoadError] = useState(false);
  const [model, setModel] = useState<THREE.Group | null>(null);
  
  // Determine if URL is a valid 3D model
  const isValidModel = url.endsWith('.glb') || url.endsWith('.gltf');
  
  // Use the useGLTF hook at component level, not inside useEffect
  // This will return undefined for non-GLB/GLTF files
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
  }, [url, isValidModel, gltfResult]);
  
  return { isValidModel, model, loadError };
};
