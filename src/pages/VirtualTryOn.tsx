
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Camera, Upload, RefreshCw } from 'lucide-react';

const VirtualTryOn = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  
  // Sample outfits for demonstration
  const outfits = [
    { id: 1, name: "Casual Summer", image: "/placeholder.svg" },
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

  const selectOutfit = (id: number) => {
    setSelectedOutfit(id);
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Virtual Try-On</h1>
        <p className="text-muted-foreground mb-8">
          See how outfits look on you using your camera with our AR technology.
        </p>
        
        <Tabs defaultValue="try-on" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="try-on">Try On Outfits</TabsTrigger>
            <TabsTrigger value="saved">Saved Looks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="try-on" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="overflow-hidden">
                  <CardContent className="p-0 relative">
                    {cameraActive ? (
                      <div className="aspect-video bg-black relative">
                        <video 
                          id="camera-preview" 
                          autoPlay 
                          playsInline 
                          className="w-full h-full object-cover"
                        ></video>
                        {selectedOutfit && (
                          <div className="absolute top-4 left-4 bg-background/80 rounded-md px-3 py-1 text-sm">
                            Trying: Outfit #{selectedOutfit}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <div className="text-center">
                          <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">Camera preview will appear here</p>
                          <Button 
                            onClick={activateCamera} 
                            className="mt-4"
                          >
                            Activate Camera
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {cameraActive && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                        <Button variant="secondary" onClick={stopCamera}>
                          Stop Camera
                        </Button>
                        <Button onClick={handleCapture} disabled={!selectedOutfit}>
                          Capture Try-On
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Select an Outfit</h3>
                <div className="space-y-4">
                  {outfits.map((outfit) => (
                    <Card 
                      key={outfit.id}
                      className={`cursor-pointer transition-all ${selectedOutfit === outfit.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => selectOutfit(outfit.id)}
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
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full" onClick={() => toast.success("Upload your own outfit feature coming soon!")}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Your Own
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="mt-6">
            <div className="text-center py-12">
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
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default VirtualTryOn;
