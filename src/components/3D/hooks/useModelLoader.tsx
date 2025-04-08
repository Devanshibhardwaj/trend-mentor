
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { toast } from 'sonner';

export const useModelLoader = (url: string) => {
  const [loadError, setLoadError] = useState(false);
  const [model, setModel] = useState<THREE.Group | null>(null);
  
  // Determine if URL is a valid 3D model (only GLB and GLTF are supported)
  const isValidModel = url?.toLowerCase?.()?.endsWith('.glb') || url?.toLowerCase?.()?.endsWith('.gltf') || false;
  
  // We'll use a placeholder image for non-3D model URLs
  // We disable the GLTF loader for non-3D models to prevent errors
  const gltfResult = isValidModel ? useGLTF(url, true) : null;
  
  useEffect(() => {
    // Reset state when URL changes
    setLoadError(false);
    setModel(null);
    
    // Skip processing for non-3D models
    if (!isValidModel) {
      console.log("Not a valid 3D model format:", url);
      return;
    }
    
    try {
      // Check if gltfResult is valid
      if (!gltfResult) {
        console.error("GLTF result is null");
        setLoadError(true);
        return;
      }
      
      // Safe way to access the scene property
      if (typeof gltfResult === 'object' && gltfResult !== null && 'scene' in gltfResult) {
        const scene = gltfResult.scene;
        
        if (scene) {
          // Create a deep clone to avoid reference issues
          setModel(scene.clone());
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
