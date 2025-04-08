
import { useState, useRef } from 'react';
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
  const [activeModel, setActiveModel] = useState<string>('/lovable-uploads/29e68d4d-0754-4c2c-b1af-217373bb4050.png');
  
  // Filter states
  const [activeFilter, setActiveFilter] = useState<string>('none');
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  
  // Accessories states
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(null);
  const [showAccessories, setShowAccessories] = useState<boolean>(false);
  
  // Sample outfits for demonstration
  const outfits = [
    { id: 1, name: "Floral Summer Dress", image: "/lovable-uploads/29e68d4d-0754-4c2c-b1af-217373bb4050.png" },
    { id: 2, name: "Business Formal", image: "/placeholder.svg" },
    { id: 3, name: "Evening Attire", image: "/placeholder.svg" },
    { id: 4, name: "Sporty Look", image: "/placeholder.svg" },
  ];

  const activateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      setVideoStream(stream);
      setCameraActive(true);
      
      toast.success('Camera activated successfully!');
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
    setCameraActive(false);
    setActiveFilter('none');
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setShowAccessories(false);
    setSelectedAccessory(null);
  };

  const selectOutfit = (id: number, image: string) => {
    setSelectedOutfit(id);
    setActiveModel(image);
    toast.success('Outfit selected for virtual try-on');
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
                  onResetToModel={() => setActiveModel('/lovable-uploads/29e68d4d-0754-4c2c-b1af-217373bb4050.png')}
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
