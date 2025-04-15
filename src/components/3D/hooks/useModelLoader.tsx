
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { toast } from 'sonner';
import * as THREE from 'three';

export const useModelLoader = (url: string) => {
  const [loadError, setLoadError] = useState(false);
  const [model, setModel] = useState<THREE.Group | null>(null);
  
  // Safely check if URL is defined and a valid 3D model format
  const safeUrl = url || '';
  const isValidModel = Boolean(
    safeUrl && 
    typeof safeUrl === 'string' && 
    (safeUrl.toLowerCase().endsWith('.glb') || safeUrl.toLowerCase().endsWith('.gltf'))
  );
  
  // We'll use a placeholder for non-3D model URLs
  // We disable the GLTF loader for non-3D models to prevent errors
  const gltfResult = isValidModel ? useGLTF(safeUrl, true) : null;
  
  useEffect(() => {
    // Reset state when URL changes
    setLoadError(false);
    setModel(null);
    
    // Skip processing for non-3D models
    if (!isValidModel) {
      console.log("Not a valid 3D model format:", safeUrl);
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
      if (gltfResult && typeof gltfResult === 'object' && gltfResult !== null && 'scene' in gltfResult) {
        const scene = gltfResult.scene;
        
        if (scene && scene instanceof THREE.Object3D) {
          // Create a deep clone to avoid reference issues
          const clonedModel = scene.clone();
          if (clonedModel) {
            setModel(clonedModel);
          } else {
            console.error("Failed to clone model scene");
            setLoadError(true);
          }
        } else {
          console.error("Model scene is undefined or not a valid Object3D");
          setLoadError(true);
        }
      } else {
        console.error("Invalid GLTF result format:", gltfResult);
        setLoadError(true);
      }
    } catch (error) {
      console.error("Failed to load 3D model:", error);
      setLoadError(true);
      
      // Show toast only when there's a loading error for a valid 3D model format
      try {
        toast.error("Failed to load 3D model", {
          description: "Falling back to placeholder model",
          duration: 3000,
        });
      } catch (toastError) {
        console.error("Toast error:", toastError);
      }
    }
  }, [safeUrl, isValidModel, gltfResult]);
  
  return { isValidModel, model, loadError };
};
