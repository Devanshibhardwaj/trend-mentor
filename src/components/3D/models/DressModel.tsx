
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useModelLoader } from '../hooks/useModelLoader';
import SimplePlaceholderModel from './SimplePlaceholderModel';
import * as THREE from 'three';

interface DressModelProps {
  url: string;
  autoRotate: boolean;
  hoverRotate?: boolean;
  wireframe?: boolean;
  detail?: number;
  [key: string]: any;
}

const DressModel = ({ 
  url, 
  autoRotate, 
  hoverRotate = false, 
  wireframe = false,
  detail = 2,
  ...props 
}: DressModelProps) => {
  // Correctly typed ref that can handle both Mesh and Group objects
  const modelRef = useRef<THREE.Mesh | THREE.Group | null>(null);
  const { isValidModel, model, loadError } = useModelLoader(url || '');
  const [isHovered, setIsHovered] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.015);
  
  // Enhanced auto-rotate effect with more consistent rotation and hover detection
  useFrame(() => {
    if (modelRef.current) {
      if (autoRotate) {
        // Base rotation speed
        modelRef.current.rotation.y += rotationSpeed;
      } else if (hoverRotate && isHovered) {
        // Faster rotation on hover
        modelRef.current.rotation.y += 0.035;
      }
    }
  });

  // Effect to handle hover state changes
  useEffect(() => {
    // Handle hover state for 3D canvas
    const handleSetHover = (hover: boolean) => {
      setIsHovered(hover);
      if (hover) {
        // Increase rotation speed on hover
        setRotationSpeed(0.025);
      } else {
        // Reset to base rotation speed
        setRotationSpeed(0.015);
      }
    };

    // Adding event listeners to parent canvas element
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('mouseenter', () => handleSetHover(true));
      canvas.addEventListener('mouseleave', () => handleSetHover(false));
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mouseenter', () => handleSetHover(true));
        canvas.removeEventListener('mouseleave', () => handleSetHover(false));
      }
    };
  }, []);
  
  // If we're loading a 2D image (not a 3D model), use a textured placeholder
  if (!isValidModel) {
    // For non-3D model URLs, create a colored box with a different color based on URL
    const colorHash = url.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const color = `hsl(${Math.abs(colorHash) % 360}, 70%, 80%)`;
    
    return (
      <SimplePlaceholderModel 
        ref={modelRef}
        url={url || ''} 
        autoRotate={Boolean(autoRotate)}
        hoverRotate={Boolean(hoverRotate)}
        color={color}
        wireframe={wireframe}
        detail={detail}
        {...props} 
      />
    );
  }
  
  // If there's an error loading the model, use our enhanced placeholder
  if (loadError || !model) {
    console.log("Using placeholder model due to load error or missing model");
    return (
      <SimplePlaceholderModel 
        ref={modelRef}
        url={url || ''} 
        autoRotate={Boolean(autoRotate)}
        hoverRotate={Boolean(hoverRotate)}
        wireframe={wireframe}
        detail={detail}
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
          ref={modelRef}
          url={url || ''} 
          autoRotate={Boolean(autoRotate)}
          hoverRotate={Boolean(hoverRotate)}
          wireframe={wireframe}
          detail={detail}
          {...props} 
        />
      );
    }
    
    // Apply initial rotation for better view
    safeModel.rotation.y = Math.PI / 6;
    
    // Center the model properly
    const box = new THREE.Box3().setFromObject(safeModel);
    const center = box.getCenter(new THREE.Vector3());
    safeModel.position.sub(center); // Center the model
    
    // Normalize the scale based on bounding box
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 2 / maxDim; // Normalize to a reasonable size
      safeModel.scale.multiplyScalar(scale);
    }
    
    // Return the cloned model
    return (
      <primitive 
        ref={modelRef}
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
        ref={modelRef}
        url={url || ''}
        autoRotate={Boolean(autoRotate)}
        hoverRotate={Boolean(hoverRotate)}
        wireframe={wireframe}
        detail={detail}
        {...props} 
      />
    );
  }
};

export default DressModel;
