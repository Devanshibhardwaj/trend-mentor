
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import AdvancedFeatures from './pages/AdvancedFeatures';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import Wardrobe from './pages/Wardrobe';
import VirtualTryOn from './pages/VirtualTryOn';
import Gallery from './pages/Gallery';
import WeatherStyling from './pages/WeatherStyling';
import TrendingOutfits from './components/TrendingOutfits';
import AdminSync from './pages/AdminSync';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/advanced-features" element={<AdvancedFeatures />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/virtual-try-on" element={<VirtualTryOn />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/weather-styling" element={<WeatherStyling />} />
          <Route path="/trending" element={<TrendingOutfits />} />
          <Route path="/admin/sync" element={<AdminSync />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
