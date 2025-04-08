
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useModelLoader } from '../hooks/useModelLoader';
import SimplePlaceholderModel from './SimplePlaceholderModel';

interface DressModelProps {
  url: string;
  autoRotate: boolean;
  [key: string]: any;
}

const DressModel = ({ url, autoRotate, ...props }: DressModelProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isValidModel, model, loadError } = useModelLoader(url);
  
  // Auto-rotate effect
  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.003;
    }
  });
  
  // If we can't load a real model, use our simple placeholder
  if (!isValidModel || loadError || !model) {
    return <SimplePlaceholderModel ref={meshRef} url={url} autoRotate={autoRotate} {...props} />;
  }
  
  // If we have a valid model, render it
  return (
    <primitive 
      ref={meshRef} 
      object={model} 
      scale={1.5} 
      {...props} 
    />
  );
};

export default DressModel;
