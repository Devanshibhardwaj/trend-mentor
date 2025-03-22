
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "vibrant" | "pastel" | "system";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("vibrant");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Check if user has previously set a theme preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && ["dark", "light", "vibrant", "pastel", "system"].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      // Default to vibrant theme for new users
      setTheme("vibrant");
    }
  }, []);

  useEffect(() => {
    // Update document class when theme changes
    const root = document.documentElement;
    
    // Add transitioning class for smooth animations
    setIsTransitioning(true);
    root.classList.add('theme-transitioning');
    
    root.classList.remove("light", "dark", "vibrant", "pastel");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    localStorage.setItem("theme", theme);
    
    // Remove transitioning class after animation completes
    const timer = setTimeout(() => {
      root.classList.remove('theme-transitioning');
      setIsTransitioning(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "vibrant";
      if (prevTheme === "vibrant") return "pastel";
      if (prevTheme === "pastel") return "system";
      return "light";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
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
