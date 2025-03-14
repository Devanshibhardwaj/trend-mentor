
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-10",
        isScrolled 
          ? "py-2 glass-effect shadow-sm" 
          : "py-6 bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a 
            href="/" 
            className="text-xl md:text-2xl font-medium tracking-tight" 
            aria-label="Trendsetter home"
          >
            Trendsetter
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks className="flex space-x-8" />
          <Button className="bg-primary hover:bg-primary/90 rounded-full px-6">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 focus:outline-none" 
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-background pt-24 px-6 z-40 transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <NavLinks className="flex flex-col space-y-6 items-center" />
        <div className="mt-8 flex justify-center">
          <Button className="bg-primary hover:bg-primary/90 rounded-full px-6 w-full">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavLinksProps {
  className?: string;
}

const NavLinks = ({ className }: NavLinksProps) => (
  <ul className={className}>
    <li>
      <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
        Features
      </a>
    </li>
    <li>
      <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
        How It Works
      </a>
    </li>
    <li>
      <a href="#ai-recommendations" className="text-foreground/80 hover:text-foreground transition-colors">
        AI Style
      </a>
    </li>
  </ul>
);

export default Navbar;
