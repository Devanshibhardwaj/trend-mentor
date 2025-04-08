
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useModelLoader } from '../hooks/useModelLoader';
import SimplePlaceholderModel from './SimplePlaceholderModel';
import * as THREE from 'three';

interface DressModelProps {
  url: string;
  autoRotate: boolean;
  [key: string]: any;
}

const DressModel = ({ url, autoRotate, ...props }: DressModelProps) => {
  const meshRef = useRef<THREE.Mesh | THREE.Group | null>(null);
  const { isValidModel, model, loadError } = useModelLoader(url || '');
  
  // Auto-rotate effect with safe null checking
  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.01; // Increased rotation speed for better visibility
    }
  });
  
  // If we're loading a 2D image (not a 3D model), use a textured placeholder
  if (!isValidModel) {
    // For non-3D model URLs, create a colored box with a different color based on URL
    const colorHash = url.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const color = `hsl(${Math.abs(colorHash) % 360}, 70%, 80%)`;
    
    return (
      <SimplePlaceholderModel 
        ref={meshRef} 
        url={url || ''} 
        autoRotate={Boolean(autoRotate)} 
        color={color}
        {...props} 
      />
    );
  }
  
  // If there's an error loading the model, use our simple placeholder
  if (loadError || !model) {
    console.log("Using placeholder model due to load error or missing model");
    return (
      <SimplePlaceholderModel 
        ref={meshRef} 
        url={url || ''} 
        autoRotate={Boolean(autoRotate)} 
        {...props} 
      />
    );
  }
  
  // If we have a valid model, safely clone it before rendering
  try {
    // Create a deep clone to avoid manipulation of shared objects
    const safeModel = model.clone();
    
    // Check if the clone was successful
    if (!safeModel) {
      console.error("Failed to clone model");
      return (
        <SimplePlaceholderModel 
          ref={meshRef} 
          url={url || ''} 
          autoRotate={Boolean(autoRotate)} 
          {...props} 
        />
      );
    }
    
    // Return the cloned model
    return (
      <primitive 
        ref={meshRef} 
        object={safeModel} 
        scale={1.5} 
        {...props} 
      />
    );
  } catch (error) {
    console.error("Error cloning model:", error);
    // Fallback to placeholder on any error
    return (
      <SimplePlaceholderModel 
        ref={meshRef} 
        url={url || ''} 
        autoRotate={Boolean(autoRotate)} 
        {...props} 
      />
    );
  }
};

export default DressModel;
