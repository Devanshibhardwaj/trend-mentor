
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Info, RotateCw, ShoppingBag, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import * as THREE from 'three';
import { Badge } from '@/components/ui/badge';

interface Outfit {
  id: number;
  name: string;
  image: string;
  description?: string;
  is3D: boolean;
}

interface OutfitSelectorProps {
  outfits: Outfit[];
  selectedOutfit: number | null;
  onSelectOutfit: (id: number, image: string) => void;
}

// Enhanced 3D thumbnail model with rotation
const ThumbnailModel = ({ color, isRotating, isHovered }: { color: string, isRotating: boolean, isHovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (meshRef.current) {
      // Center the mesh
      meshRef.current.position.set(0, 0, 0);
      
      // Set initial rotation
      meshRef.current.rotation.set(
        THREE.MathUtils.degToRad(15), 
        THREE.MathUtils.degToRad(45), 
        0
      );
    }
  }, []);
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  );
};

const OutfitSelector = ({
  outfits,
  selectedOutfit,
  onSelectOutfit
}: OutfitSelectorProps) => {
  const [hoveredOutfit, setHoveredOutfit] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      toast.info("Removed from favorites");
    } else {
      setFavorites([...favorites, id]);
      toast.success("Added to favorites");
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Select an Outfit</h3>
        <Badge variant="outline" className="bg-primary/10">
          {outfits.length} Items
        </Badge>
      </div>
      
      <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2 -mr-2 scrollbar-thin">
        <motion.div 
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {outfits.map((outfit) => (
            <motion.div 
              key={outfit.id} 
              variants={itemVariants}
              onMouseEnter={() => setHoveredOutfit(outfit.id)}
              onMouseLeave={() => setHoveredOutfit(null)}
              className="transform transition-transform duration-300 hover:scale-[1.01]"
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedOutfit === outfit.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => onSelectOutfit(outfit.id, outfit.image)}
                  >
                    <CardContent className="p-3 flex items-center space-x-3">
                      <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0 relative">
                        {outfit.is3D ? (
                          <div className="w-full h-full">
                            <Canvas 
                              camera={{ position: [0, 0, 2.5] }} 
                              className="w-full h-full"
                            >
                              <ambientLight intensity={0.8} />
                              <pointLight position={[10, 10, 10]} intensity={1.5} />
                              <spotLight
                                position={[0, 5, 5]}
                                angle={0.3}
                                penumbra={1}
                                intensity={2}
                                castShadow
                              />
                              <ThumbnailModel 
                                color={`hsl(${Math.abs(outfit.id * 30) % 360}, 70%, 60%)`}
                                isRotating={true} 
                                isHovered={hoveredOutfit === outfit.id}
                              />
                              {hoveredOutfit === outfit.id && (
                                <OrbitControls 
                                  enableZoom={false} 
                                  autoRotate={true} 
                                  autoRotateSpeed={10}
                                />
                              )}
                            </Canvas>
                            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] px-1 py-0.5 rounded-bl">
                              3D
                            </div>
                          </div>
                        ) : (
                          <>
                            <img 
                              src={outfit.image} 
                              alt={outfit.name} 
                              className="w-full h-full object-cover"
                            />
                          </>
                        )}
                        
                        {hoveredOutfit === outfit.id && outfit.is3D && (
                          <div className="absolute top-0 left-0 bg-black/30 text-white text-xs flex items-center justify-center w-full h-full">
                            <RotateCw className="w-4 h-4 animate-spin" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between w-full">
                          <h4 className="font-medium text-sm truncate">
                            {outfit.name}
                          </h4>
                          <button 
                            className="text-muted-foreground hover:text-primary transition-colors"
                            onClick={(e) => toggleFavorite(outfit.id, e)}
                          >
                            <Star className={`h-4 w-4 ${favorites.includes(outfit.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {outfit.is3D ? "Interactive 3D model" : "Click to try on"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                {outfit.description && (
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{outfit.name}</h4>
                      <p className="text-sm text-muted-foreground">{outfit.description}</p>
                      {outfit.is3D && (
                        <p className="text-xs flex items-center gap-1 text-primary">
                          <RotateCw className="h-3.5 w-3.5" /> 
                          Hover and drag to rotate the 3D model
                        </p>
                      )}
                    </div>
                  </HoverCardContent>
                )}
              </HoverCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="mt-6 flex flex-col gap-2">
        <Button 
          variant="outline" 
          className="w-full group relative overflow-hidden"
          onClick={() => toast.success("Upload your own outfit feature coming soon!")}
        >
          <span className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors rounded-md"></span>
          <Upload className="h-4 w-4 mr-2" />
          Upload Your Own
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full group relative overflow-hidden"
          onClick={() => toast.info("Shop more outfits feature coming soon!")}
        >
          <span className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors rounded-md"></span>
          <ShoppingBag className="h-4 w-4 mr-2" />
          Shop More Outfits
        </Button>
      </div>
    </div>
  );
};

export default OutfitSelector;
