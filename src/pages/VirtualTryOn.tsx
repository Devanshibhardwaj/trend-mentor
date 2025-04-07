
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThreeDModelViewer } from '@/components/3D';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Camera, Upload, RefreshCw, Sparkles, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

const VirtualTryOn = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [activeModel, setActiveModel] = useState<string>('/lovable-uploads/29e68d4d-0754-4c2c-b1af-217373bb4050.png');
  
  // Sample outfits for demonstration
  const outfits = [
    { id: 1, name: "Floral Summer Dress", image: "/lovable-uploads/29e68d4d-0754-4c2c-b1af-217373bb4050.png" },
    { id: 2, name: "Business Formal", image: "/placeholder.svg" },
    { id: 3, name: "Evening Attire", image: "/placeholder.svg" },
    { id: 4, name: "Sporty Look", image: "/placeholder.svg" },
  ];

  const activateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setCameraActive(true);
      
      const videoElement = document.getElementById('camera-preview') as HTMLVideoElement;
      if (videoElement) {
        videoElement.srcObject = stream;
      }
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
    
    toast.success('Processing your virtual try-on...');
    // In a real implementation, this would process the image with AR technology
    setTimeout(() => {
      toast.success('Virtual try-on complete! How does it look?');
    }, 2000);
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
                      <div className="aspect-video bg-black relative overflow-hidden">
                        <video 
                          id="camera-preview" 
                          autoPlay 
                          playsInline 
                          className="w-full h-full object-cover"
                        ></video>
                        
                        <motion.div 
                          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-md px-3 py-1 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex items-center">
                            <Sparkles className="h-3 w-3 mr-1 text-primary" />
                            Trying: {selectedOutfit ? outfits.find(o => o.id === selectedOutfit)?.name : "Select an outfit"}
                          </div>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="aspect-video overflow-hidden">
                        <ThreeDModelViewer 
                          modelUrl={activeModel}
                          title={selectedOutfit ? outfits.find(o => o.id === selectedOutfit)?.name : "Select an outfit"}
                        />
                      </div>
                    )}
                    
                    {cameraActive && (
                      <motion.div 
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Button variant="secondary" onClick={stopCamera}>
                          Stop Camera
                        </Button>
                        <Button 
                          onClick={handleCapture} 
                          disabled={!selectedOutfit}
                          className="bg-primary/90 hover:bg-primary"
                        >
                          Capture Try-On
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
                
                <motion.div 
                  className="flex justify-center space-x-4 mt-4"
                  variants={itemVariants}
                >
                  {!cameraActive ? (
                    <Button 
                      onClick={activateCamera} 
                      variant="outline"
                      className="group relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors rounded-md"></span>
                      <Camera className="h-4 w-4 mr-2" />
                      Try On Using Camera
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setActiveModel('/lovable-uploads/29e68d4d-0754-4c2c-b1af-217373bb4050.png')}
                      variant="outline"
                      className="group relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors rounded-md"></span>
                      <RotateCw className="h-4 w-4 mr-2" />
                      Back to 3D View
                    </Button>
                  )}
                </motion.div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium mb-4">Select an Outfit</h3>
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {outfits.map((outfit) => (
                    <motion.div key={outfit.id} variants={itemVariants}>
                      <Card 
                        className={`cursor-pointer transition-all hover:shadow-md ${selectedOutfit === outfit.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => selectOutfit(outfit.id, outfit.image)}
                      >
                        <CardContent className="p-3 flex items-center space-x-3">
                          <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={outfit.image} 
                              alt={outfit.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{outfit.name}</h4>
                            <p className="text-xs text-muted-foreground">Click to try on</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="mt-6"
                  variants={itemVariants}
                >
                  <Button 
                    variant="outline" 
                    className="w-full group relative overflow-hidden"
                    onClick={() => toast.success("Upload your own outfit feature coming soon!")}
                  >
                    <span className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors rounded-md"></span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Your Own
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="saved" className="mt-6">
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No Saved Looks Yet</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Try on some outfits and save your favorites to see them here.
              </p>
              <Button onClick={() => document.querySelector('[value="try-on"]')?.dispatchEvent(new Event('click'))}>
                Start Virtual Try-On
              </Button>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default VirtualTryOn;
