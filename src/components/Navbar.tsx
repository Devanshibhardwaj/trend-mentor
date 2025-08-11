
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, UserCircle, X, Home, Shirt, Camera, Cloud, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-20"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-semibold tracking-tight">
                StyleSage
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                AI Fashion
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group">
            <span className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/wardrobe" className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group">
            <span className="flex items-center space-x-2">
              <Shirt className="h-4 w-4" />
              <span>Wardrobe</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/virtual-try-on" className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group">
            <span className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Try-On</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/weather-styling" className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group">
            <span className="flex items-center space-x-2">
              <Cloud className="h-4 w-4" />
              <span>Weather</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center space-x-3">
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => signOut()}
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/auth">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-primary/5"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button size="sm" className="fashion-button">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-50 bg-background border-b md:hidden transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="container py-4 flex flex-col space-y-4">
          <Link
            to="/"
            className="px-4 py-2 hover:bg-accent rounded-md flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/wardrobe"
            className="px-4 py-2 hover:bg-accent rounded-md flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Shirt className="h-5 w-5" />
            <span>Wardrobe</span>
          </Link>
          <Link
            to="/virtual-try-on"
            className="px-4 py-2 hover:bg-accent rounded-md flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Camera className="h-5 w-5" />
            <span>Virtual Try-On</span>
          </Link>
          <Link
            to="/weather-styling"
            className="px-4 py-2 hover:bg-accent rounded-md flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Cloud className="h-5 w-5" />
            <span>What to Wear Today</span>
          </Link>
          <Link
            to="/advanced-features"
            className="px-4 py-2 hover:bg-accent rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Advanced Features
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
