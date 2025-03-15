
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WeatherBasedSuggestions from '@/components/WeatherBasedSuggestions';
import OccasionStyling from '@/components/OccasionStyling';
import MoodBasedStyling from '@/components/MoodBasedStyling';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const WeatherStyling = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">What to Wear Today?</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get personalized outfit recommendations based on the weather, occasion, your mood, and style preferences.
            </p>
          </div>
          
          <Tabs defaultValue="weather" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="weather">Weather-Based</TabsTrigger>
              <TabsTrigger value="occasion">Occasion-Based</TabsTrigger>
              <TabsTrigger value="mood">Mood-Based</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weather">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <WeatherBasedSuggestions />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="occasion">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <OccasionStyling />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="mood">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <MoodBasedStyling />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WeatherStyling;
