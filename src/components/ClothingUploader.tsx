
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface ClothingUploaderProps {
  onAddItem: (item: { id: string; name: string; category: string; imageUrl: string }) => void;
}

const ClothingUploader = ({ onAddItem }: ClothingUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!preview) {
      toast.error('Please upload an image');
      return;
    }
    
    if (!name.trim()) {
      toast.error('Please enter a name for your item');
      return;
    }
    
    if (!category) {
      toast.error('Please select a category');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Check if the user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('You must be logged in to add items to your wardrobe');
        setIsUploading(false);
        return;
      }
      
      // Upload the image to Supabase Storage
      let imageUrl = '';
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('wardrobe_images')
          .upload(filePath, file);
          
        if (uploadError) {
          toast.error('Error uploading image: ' + uploadError.message);
          setIsUploading(false);
          return;
        }
        
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('wardrobe_images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
      }
      
      // Add the item to the wardrobe_items table
      const { error: insertError, data: insertedItem } = await supabase
        .from('wardrobe_items')
        .insert({
          name,
          category, 
          image_url: imageUrl,
          user_id: user.id
        })
        .select()
        .single();
        
      if (insertError) {
        toast.error('Error adding item to wardrobe: ' + insertError.message);
        setIsUploading(false);
        return;
      }
      
      // Call the onAddItem prop with the new item
      onAddItem({
        id: insertedItem.id,
        name: insertedItem.name,
        category: insertedItem.category,
        imageUrl: insertedItem.image_url || '',
      });
      
      // Reset form
      setPreview(null);
      setName('');
      setCategory('');
      setFile(null);
      
      toast.success('Item added to your wardrobe!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsUploading(false);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreview(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image-upload">Upload Image</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <div
                  className={`aspect-square rounded-md border-2 border-dashed flex items-center justify-center overflow-hidden relative ${
                    preview ? 'border-primary/30' : 'border-muted-foreground/30 hover:border-muted-foreground/50'
                  }`}
                >
                  {preview ? (
                    <>
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 rounded-full bg-black/60 text-white p-1 hover:bg-black/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop an image or click to browse
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={triggerFileInput}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Browse
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      toast.info('Camera functionality would open device camera');
                    }}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Camera
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    id="item-name"
                    placeholder="E.g., Blue denim jacket"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="item-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tops">Tops</SelectItem>
                      <SelectItem value="Bottoms">Bottoms</SelectItem>
                      <SelectItem value="Outerwear">Outerwear</SelectItem>
                      <SelectItem value="Footwear">Footwear</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full mt-6" 
                  disabled={isUploading || !preview || !name.trim() || !category}
                >
                  {isUploading ? 'Adding to Wardrobe...' : 'Add to Wardrobe'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClothingUploader;
