import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { UserCircle } from "lucide-react";
const Navbar = () => {
  const {
    user,
    signOut
  } = useAuth();
  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              StyleSage AI
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground/80 mx-0">
              Home
            </Link>
            <Link to="/wardrobe" className="transition-colors hover:text-foreground/80">
              Wardrobe
            </Link>
            <Link to="/virtual-try-on" className="transition-colors hover:text-foreground/80">
              Virtual Try-On
            </Link>
            <Link to="/weather-styling" className="transition-colors hover:text-foreground/80">
              What to Wear Today
            </Link>
            <Link to="/advanced-features" className="transition-colors hover:text-foreground/80">
              Advanced Features
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          {user ? <div className="flex items-center space-x-3">
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div> : <div className="flex items-center space-x-2">
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
            </div>}
        </div>
      </div>
    </header>;
};
export default Navbar;