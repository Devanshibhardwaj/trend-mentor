
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold sm:inline-block">
              StyleSage AI
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-foreground/80 flex items-center space-x-1">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link to="/wardrobe" className="transition-colors hover:text-foreground/80 flex items-center space-x-1">
            <Shirt className="h-4 w-4" />
            <span>Wardrobe</span>
          </Link>
          <Link to="/virtual-try-on" className="transition-colors hover:text-foreground/80 flex items-center space-x-1">
            <Camera className="h-4 w-4" />
            <span>Virtual Try-On</span>
          </Link>
          <Link to="/weather-styling" className="transition-colors hover:text-foreground/80 flex items-center space-x-1">
            <Cloud className="h-4 w-4" />
            <span>What to Wear Today</span>
          </Link>
          <Link to="/advanced-features" className="transition-colors hover:text-foreground/80">
            Advanced Features
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center space-x-3">
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button size="sm">
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
