
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ThreeDModelViewer } from '@/components/3D';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Refactored Components
import CameraView from '@/components/virtual-try-on/CameraView';
import FilterControls from '@/components/virtual-try-on/FilterControls';
import AccessoriesSelector from '@/components/virtual-try-on/AccessoriesSelector';
import OutfitSelector from '@/components/virtual-try-on/OutfitSelector';
import SavedLooks from '@/components/virtual-try-on/SavedLooks';
import CameraController from '@/components/virtual-try-on/CameraController';

const VirtualTryOn = () => {
  // State management
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [activeModel, setActiveModel] = useState<string>('https://models.readyplayer.me/64b68c3fd857b9e67b51f2c6.glb');
  
  // Filter states
  const [activeFilter, setActiveFilter] = useState<string>('none');
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  
  // Accessories states
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(null);
  const [showAccessories, setShowAccessories] = useState<boolean>(false);
  
  // Enhanced outfits with both 2D images and 3D models
  const outfits = [
    { 
      id: 1, 
      name: "Blue Party Dress",
      image: "https://models.readyplayer.me/64ac8accd857b9e67b51d39a.glb",
      description: "An elegant blue party dress perfect for special events and evening parties.",
      is3D: true
    },
    { 
      id: 2, 
      name: "Red Evening Gown", 
      image: "https://models.readyplayer.me/64ac8b62d857b9e67b51d3c4.glb",
      description: "An elegant red evening gown for formal events and special occasions.",
      is3D: true
    },
    { 
      id: 3, 
      name: "Modern Suit", 
      image: "https://models.readyplayer.me/64b68c3fd857b9e67b51f2c6.glb",
      description: "A modern, professional suit for business meetings and formal work environments.",
      is3D: true
    },
    { 
      id: 4, 
      name: "Casual Outfit", 
      image: "https://models.readyplayer.me/64b68bc8d857b9e67b51f29a.glb",
      description: "A comfortable casual outfit perfect for everyday wear.",
      is3D: true
    },
    { 
      id: 5, 
      name: "Summer Dress", 
      image: "https://models.readyplayer.me/64ac8dedd857b9e67b51d43c.glb",
      description: "A light and airy summer dress perfect for hot days and beach outings.",
      is3D: true
    },
    { 
      id: 6, 
      name: "Wedding Dress", 
      image: "https://models.readyplayer.me/64b86eecd857b9e67b51f9ca.glb",
      description: "A beautiful white wedding dress for your special day.",
      is3D: true
    },
    { 
      id: 7, 
      name: "Leather Jacket Outfit", 
      image: "https://models.readyplayer.me/64ac8c9ed857b9e67b51d3f0.glb",
      description: "A stylish leather jacket outfit for a trendy, edgy look.",
      is3D: true
    },
    { 
      id: 8, 
      name: "Cocktail Dress", 
      image: "https://models.readyplayer.me/64b86dc9d857b9e67b51f982.glb",
      description: "A sophisticated cocktail dress for semi-formal events and parties.",
      is3D: true
    },
    { 
      id: 9, 
      name: "Business Casual", 
      image: "https://models.readyplayer.me/64b68fcbd857b9e67b51f312.glb",
      description: "A professional business casual outfit suitable for office environments.",
      is3D: true
    },
    { 
      id: 10, 
      name: "Winter Coat Ensemble", 
      image: "https://models.readyplayer.me/64b68e8dd857b9e67b51f2f8.glb",
      description: "A warm winter coat with accessories for cold weather.",
      is3D: true
    },
    { 
      id: 11, 
      name: "Sportswear Collection", 
      image: "https://models.readyplayer.me/64c2a7d6d857b9e67b52078a.glb",
      description: "Athletic wear perfect for workouts and sports activities.",
      is3D: true
    },
    { 
      id: 12, 
      name: "Formal Tuxedo", 
      image: "https://models.readyplayer.me/64bfe03dd857b9e67b520122.glb",
      description: "An elegant tuxedo for black-tie events and formal occasions.",
      is3D: true
    }
  ];

  // Cleanup camera on component unmount
  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoStream]);

  const activateCamera = async () => {
    try {
      console.log("Attempting to activate camera...");
      // Stop any existing streams
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      console.log("Camera stream obtained:", stream);
      setVideoStream(stream);
      setCameraActive(true);
      
      toast.success('Camera activated successfully!');
      return Promise.resolve();
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions.');
      return Promise.reject(error);
    }
  };

  const stopCamera = () => {
    console.log("Stopping camera...");
    if (videoStream) {
      videoStream.getTracks().forEach(track => {
        console.log("Stopping track:", track.kind, track.id);
        track.stop();
      });
      setVideoStream(null);
    }
    setCameraActive(false);
    setActiveFilter('none');
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setShowAccessories(false);
    setSelectedAccessory(null);
    toast.success('Camera stopped');
  };

  const resetToModel = () => {
    stopCamera();
    // Reset to the last selected model
    if (selectedOutfit) {
      const outfit = outfits.find(o => o.id === selectedOutfit);
      if (outfit) {
        setActiveModel(outfit.image);
      }
    } else {
      setActiveModel('https://models.readyplayer.me/64b68c3fd857b9e67b51f2c6.glb');
    }
  };

  const selectOutfit = (id: number, image: string) => {
    setSelectedOutfit(id);
    setActiveModel(image);
    
    const outfit = outfits.find(o => o.id === id);
    if (outfit?.is3D) {
      toast.success('3D model loaded! Drag to rotate and zoom with scroll');
    } else {
      toast.success('Outfit selected for virtual try-on');
    }
  };

  const handleCapture = () => {
    if (!selectedOutfit) {
      toast.error('Please select an outfit first');
      return;
    }
    
    if (!cameraActive) {
      toast.error('Please activate your camera first');
      return;
    }
    
    toast.success('Processing your virtual try-on...');
    // In a real implementation, this would process the image with AR technology
    setTimeout(() => {
      toast.success('Virtual try-on complete! How does it look?');
    }, 2000);
  };
  
  const handleAccessorySelect = (name: string) => {
    setSelectedAccessory(name);
    setShowAccessories(true);
    toast.success(`Added ${name} to your look!`);
  };

  const handleSwitchToTryOn = () => {
    document.querySelector('[value="try-on"]')?.dispatchEvent(new Event('click'));
  };

  // Animation variants
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Virtual Try-On</h1>
          <p className="text-muted-foreground mb-8">
            See how outfits look on you with interactive 3D previews and AR technology.
          </p>
        </motion.div>
        
        <Tabs defaultValue="try-on" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="try-on">Try On Outfits</TabsTrigger>
            <TabsTrigger value="saved">Saved Looks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="try-on" className="mt-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="md:col-span-2" variants={itemVariants}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0 relative">
                    {cameraActive ? (
                      <CameraView 
                        cameraActive={cameraActive}
                        videoStream={videoStream}
                        selectedOutfit={selectedOutfit}
                        outfitName={selectedOutfit ? outfits.find(o => o.id === selectedOutfit)?.name || '' : ''}
                        activeFilter={activeFilter}
                        brightness={brightness}
                        contrast={contrast}
                        saturation={saturation}
                        showAccessories={showAccessories}
                        selectedAccessory={selectedAccessory}
                        onCapture={handleCapture}
                        onStopCamera={stopCamera}
                      />
                    ) : (
                      <div className="aspect-video overflow-hidden">
                        <ThreeDModelViewer 
                          modelUrl={activeModel}
                          title={selectedOutfit ? outfits.find(o => o.id === selectedOutfit)?.name : "Select an outfit"}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <CameraController 
                  cameraActive={cameraActive} 
                  activateCamera={activateCamera}
                  onResetToModel={resetToModel}
                />
                
                {/* Camera filter and accessories controls */}
                {cameraActive && (
                  <motion.div 
                    className="mt-6 space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <FilterControls 
                      activeFilter={activeFilter}
                      brightness={brightness}
                      contrast={contrast}
                      saturation={saturation}
                      showAccessories={showAccessories}
                      onFilterChange={setActiveFilter}
                      onBrightnessChange={setBrightness}
                      onContrastChange={setContrast}
                      onSaturationChange={setSaturation}
                      onAccessoryToggle={setShowAccessories}
                    />
                    
                    {showAccessories && (
                      <AccessoriesSelector 
                        selectedAccessory={selectedAccessory}
                        onAccessorySelect={handleAccessorySelect}
                      />
                    )}
                  </motion.div>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <OutfitSelector 
                  outfits={outfits}
                  selectedOutfit={selectedOutfit}
                  onSelectOutfit={selectOutfit}
                />
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="saved" className="mt-6">
            <SavedLooks onTryOnClick={handleSwitchToTryOn} />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default VirtualTryOn;
