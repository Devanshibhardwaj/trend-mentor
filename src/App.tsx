
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import StepGuide from "./components/StepGuide";
import Index from "./pages/Index";
import Wardrobe from "./pages/Wardrobe";
import VirtualTryOn from "./pages/VirtualTryOn";
import AdvancedFeatures from "./pages/AdvancedFeatures";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import WeatherStyling from "./pages/WeatherStyling";
import AdminSync from "./pages/AdminSync";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <StepGuide />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/wardrobe" element={<Wardrobe />} />
              <Route path="/virtual-try-on" element={<VirtualTryOn />} />
              <Route path="/advanced-features" element={<AdvancedFeatures />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/weather-styling" element={<WeatherStyling />} />
              <Route path="/admin-sync" element={<AdminSync />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
