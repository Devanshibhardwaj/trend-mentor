
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThreeDModelViewer } from '@/components/3D';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Camera, Upload, RefreshCw, Sparkles, RotateCw, Sliders, Wand2, Shapes, Crown, Glasses } from 'lucide-react';
import { motion } from 'framer-motion';

const VirtualTryOn = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [activeModel, setActiveModel] = useState<string>('/lovable-uploads/29e68d4d-0754-4c2c-b1af-217373bb4050.png');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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
  
  // Sample accessories for demonstration
  const accessories = [
    { id: 1, name: "Sunglasses", icon: <Glasses className="h-5 w-5" /> },
    { id: 2, name: "Crown", icon: <Crown className="h-5 w-5" /> },
    { id: 3, name: "Earrings", icon: <Shapes className="h-5 w-5" /> },
    { id: 4, name: "Necklace", icon: <Shapes className="h-5 w-5" /> },
  ];
  
  // Sample filters
  const filters = [
    { id: 'none', name: 'None' },
    { id: 'grayscale', name: 'Grayscale' },
    { id: 'sepia', name: 'Sepia' },
    { id: 'vintage', name: 'Vintage' },
    { id: 'cool', name: 'Cool' },
    { id: 'warm', name: 'Warm' }
  ];
  
  // Apply filters to video
  useEffect(() => {
    if (cameraActive && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      const renderFrame = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          // Set canvas dimensions to match video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          // Draw the video frame
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Apply filters
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Apply brightness, contrast, saturation
          for (let i = 0; i < data.length; i += 4) {
            // Apply brightness
            const brightnessAdjust = brightness / 100;
            data[i] = Math.min(255, Math.max(0, data[i] * brightnessAdjust));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * brightnessAdjust));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * brightnessAdjust));
            
            // Apply filter effects
            switch (activeFilter) {
              case 'grayscale':
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
                break;
              case 'sepia':
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
                data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
                data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
                break;
              case 'cool':
                data[i + 2] = Math.min(255, data[i + 2] * 1.2); // Boost blue
                break;
              case 'warm':
                data[i] = Math.min(255, data[i] * 1.2); // Boost red
                break;
              case 'vintage':
                data[i] = Math.min(255, data[i] * 1.1);
                data[i + 1] = Math.min(255, data[i + 1] * 0.9);
                data[i + 2] = Math.min(255, data[i + 2] * 0.8);
                break;
            }
            
            // Apply contrast
            const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
            data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
            data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
            data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
            
            // Apply saturation
            const satFactor = saturation / 100;
            const gray = 0.2989 * data[i] + 0.5870 * data[i + 1] + 0.1140 * data[i + 2];
            data[i] = Math.min(255, Math.max(0, gray + satFactor * (data[i] - gray)));
            data[i + 1] = Math.min(255, Math.max(0, gray + satFactor * (data[i + 1] - gray)));
            data[i + 2] = Math.min(255, Math.max(0, gray + satFactor * (data[i + 2] - gray)));
          }
          
          ctx.putImageData(imageData, 0, 0);
          
          // Draw accessories if enabled
          if (showAccessories && selectedAccessory) {
            // Here we would position accessories based on face detection
            // For demo, just position in center
            ctx.font = '100px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.textAlign = 'center';
            
            // Simple accessory placement - in a real app, you'd use face detection
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 3;
            
            if (selectedAccessory === 'Sunglasses') {
              ctx.fillText('🕶️', centerX, centerY);
            } else if (selectedAccessory === 'Crown') {
              ctx.fillText('👑', centerX, centerY - 50);
            } else if (selectedAccessory === 'Earrings') {
              ctx.fillText('💎', centerX - 100, centerY);
              ctx.fillText('💎', centerX + 100, centerY);
            } else if (selectedAccessory === 'Necklace') {
              ctx.fillText('📿', centerX, centerY + 100);
            }
          }
        }
        requestAnimationFrame(renderFrame);
      };
      
      renderFrame();
    }
  }, [cameraActive, activeFilter, brightness, contrast, saturation, showAccessories, selectedAccessory]);

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
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
      
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
                        {/* Hidden video element for capturing camera feed */}
                        <video 
                          ref={videoRef}
                          autoPlay 
                          playsInline 
                          muted
                          className="hidden"
                        ></video>
                        
                        {/* Canvas for displaying processed video with filters/accessories */}
                        <canvas 
                          ref={canvasRef}
                          className="w-full h-full object-cover"
                        ></canvas>
                        
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
                
                {/* Camera filter and accessories controls */}
                {cameraActive && (
                  <motion.div 
                    className="mt-6 space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-card rounded-lg p-4 border">
                      <div className="flex items-center mb-4">
                        <Sliders className="w-5 h-5 mr-2 text-primary" />
                        <h3 className="text-lg font-medium">Adjust Filters</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <Select 
                            value={activeFilter} 
                            onValueChange={setActiveFilter}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select filter" />
                            </SelectTrigger>
                            <SelectContent>
                              {filters.map(filter => (
                                <SelectItem key={filter.id} value={filter.id}>
                                  {filter.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="show-accessories" className="flex-grow">Accessories</Label>
                            <Switch
                              id="show-accessories"
                              checked={showAccessories}
                              onCheckedChange={setShowAccessories}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <Label>Brightness</Label>
                              <span className="text-xs text-muted-foreground">{brightness}%</span>
                            </div>
                            <Slider
                              value={[brightness]}
                              min={50}
                              max={150}
                              step={1}
                              onValueChange={([value]) => setBrightness(value)}
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <Label>Contrast</Label>
                              <span className="text-xs text-muted-foreground">{contrast}%</span>
                            </div>
                            <Slider
                              value={[contrast]}
                              min={50}
                              max={150}
                              step={1}
                              onValueChange={([value]) => setContrast(value)}
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <Label>Saturation</Label>
                              <span className="text-xs text-muted-foreground">{saturation}%</span>
                            </div>
                            <Slider
                              value={[saturation]}
                              min={0}
                              max={200}
                              step={1}
                              onValueChange={([value]) => setSaturation(value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {showAccessories && (
                      <div className="bg-card rounded-lg p-4 border">
                        <div className="flex items-center mb-4">
                          <Wand2 className="w-5 h-5 mr-2 text-primary" />
                          <h3 className="text-lg font-medium">Accessories</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {accessories.map(accessory => (
                            <Card 
                              key={accessory.id}
                              className={`cursor-pointer transition-all hover:border-primary ${selectedAccessory === accessory.name ? 'border-2 border-primary' : ''}`}
                              onClick={() => handleAccessorySelect(accessory.name)}
                            >
                              <CardContent className="p-3 flex flex-col items-center justify-center text-center">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                  {accessory.icon}
                                </div>
                                <span className="text-sm">{accessory.name}</span>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
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
