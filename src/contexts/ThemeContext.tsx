
import { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "nautical" | "sunset" | "forest" | "galaxy" | "system";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isTransitioning: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Animation for theme transitions
const ThemeTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={Math.random()} // Force re-render on theme change
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("sunset");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousTheme, setPreviousTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Check if user has previously set a theme preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && ["nautical", "sunset", "forest", "galaxy", "system"].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      // Default to sunset theme (light theme) for new users
      setTheme("sunset");
    }
  }, []);

  useEffect(() => {
    if (!previousTheme) {
      setPreviousTheme(theme);
      return;
    }

    // Update document class when theme changes
    const root = document.documentElement;
    
    // Add transitioning class for smooth animations
    setIsTransitioning(true);
    root.classList.add('theme-transitioning');
    
    // Remember the previous theme for transition effects
    root.classList.add(`from-${previousTheme}`);
    
    // Remove all possible theme classes
    root.classList.remove("nautical", "sunset", "forest", "galaxy", "system", "from-nautical", "from-sunset", "from-forest", "from-galaxy", "from-system");
    
    // Add the new theme class
    root.classList.add(theme);
    
    localStorage.setItem("theme", theme);
    
    // Store the current theme as the previous theme for the next change
    setPreviousTheme(theme);
    
    // Remove transitioning class after animation completes
    const timer = setTimeout(() => {
      root.classList.remove('theme-transitioning', `from-${previousTheme}`);
      setIsTransitioning(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [theme, previousTheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      // Cycle through themes
      const themes: Theme[] = ["nautical", "sunset", "forest", "galaxy", "system"];
      const currentIndex = themes.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      return themes[nextIndex];
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isTransitioning }}>
      <ThemeTransition>
        {children}
      </ThemeTransition>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
