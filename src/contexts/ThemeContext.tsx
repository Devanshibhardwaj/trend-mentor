
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "elegant" | "vibrant" | "playful" | "cosmic" | "system";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isTransitioning: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("elegant");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousTheme, setPreviousTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Check if user has previously set a theme preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && ["elegant", "vibrant", "playful", "cosmic", "system"].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      // Default to elegant theme for new users
      setTheme("elegant");
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
    root.classList.remove("elegant", "vibrant", "playful", "cosmic", "system", "from-elegant", "from-vibrant", "from-playful", "from-cosmic", "from-system");
    
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
      const themes: Theme[] = ["elegant", "vibrant", "playful", "cosmic", "system"];
      const currentIndex = themes.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      return themes[nextIndex];
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isTransitioning }}>
      {children}
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
