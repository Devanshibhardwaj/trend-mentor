
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
  const meshRef = useRef<THREE.Mesh>(null);
  const { isValidModel, model, loadError } = useModelLoader(url || '');
  
  // Auto-rotate effect with safe null checking
  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.003;
    }
  });
  
  // If we can't load a real model, use our simple placeholder
  if (!isValidModel || loadError || !model) {
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
