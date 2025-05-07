
import { Anchor, Sunset, Leaf, Moon, CloudSun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [rotateIcon, setRotateIcon] = useState(false);
  const [userPref, setUserPref] = useState<string | null>(null);
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Check user preferences
    try {
      const savedPrefs = localStorage.getItem('userPreferences');
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        setUserPref(prefs.timePreference);
      }
    } catch (e) {
      console.error("Error loading user preferences:", e);
    }
  }, []);
  
  // Add rotation effect when theme changes
  useEffect(() => {
    if (mounted) {
      setRotateIcon(true);
      const timer = setTimeout(() => setRotateIcon(false), 600);
      return () => clearTimeout(timer);
    }
  }, [theme, mounted]);
  
  if (!mounted) return null;
  
  const getThemeTooltip = () => {
    switch (theme) {
      case 'nautical':
        return "Nautical theme for clean, minimalist designs";
      case 'sunset':
        return "Sunset theme for warm, inviting experiences";
      case 'forest':
        return "Forest theme for creative, natural aesthetics";
      case 'galaxy':
        return "Galaxy theme for dark mode lovers";
      default:
        return "System theme";
    }
  };
  
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.6, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 1.5,
      transition: { duration: 0.5 }
    },
    hover: { scale: 1.2, rotate: 5 },
    rotate: { rotate: 360, transition: { duration: 0.6 } }
  };
  
  const bgVariants = {
    initial: { scale: 0, borderRadius: "50%" },
    animate: { scale: 1, borderRadius: "50%" },
    hover: { scale: 1.1, borderRadius: "30%" }
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.05,
        duration: 0.2
      }
    })
  };

  // Suggest a theme based on user preferences
  const getSuggestedThemeText = () => {
    if (userPref === 'night-owl' && theme !== 'galaxy') {
      return "Try Galaxy theme";
    } else if (userPref === 'early-bird' && theme !== 'sunset') {
      return "Try Sunset theme";
    } else if (userPref === null) {
      return null; // No suggestion if no preferences
    } else {
      return null; // No suggestion if already using appropriate theme
    }
  };

  const suggestedTheme = getSuggestedThemeText();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-full z-0"
            variants={bgVariants}
            initial="initial"
            animate={isHovered ? "hover" : "animate"}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          />
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={theme} 
              className="relative z-10"
              variants={iconVariants}
              initial="initial"
              animate={rotateIcon ? "rotate" : "animate"}
              exit="exit"
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {theme === "nautical" && (
                <Anchor className="h-[1.2rem] w-[1.2rem] text-blue-500" />
              )}
              {theme === "sunset" && (
                <Sunset className="h-[1.2rem] w-[1.2rem] text-orange-400" />
              )}
              {theme === "forest" && (
                <Leaf className="h-[1.2rem] w-[1.2rem] text-green-500" />
              )}
              {theme === "galaxy" && (
                <Moon className="h-[1.2rem] w-[1.2rem] text-purple-500" />
              )}
              {theme === "system" && (
                <CloudSun className="h-[1.2rem] w-[1.2rem] text-gray-400" />
              )}
            </motion.div>
          </AnimatePresence>
          
          <motion.span 
            className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
          
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="animate-scale-in rounded-lg overflow-hidden w-48 p-2"
      >
        <motion.ul
          initial="hidden"
          animate="visible"
          className="space-y-1"
        >
          {suggestedTheme && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-2 px-2 py-1.5 text-xs bg-primary/5 rounded-md text-center font-medium text-primary"
            >
              {suggestedTheme} 🌟
            </motion.div>
          )}
          
          <motion.li variants={dropdownItemVariants} custom={0}>
            <DropdownMenuItem 
              onClick={() => setTheme("nautical")} 
              className="flex gap-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors rounded-md"
            >
              <Anchor className="h-[1rem] w-[1rem] text-blue-500" />
              <span>Nautical Mode</span>
            </DropdownMenuItem>
          </motion.li>
          
          <motion.li variants={dropdownItemVariants} custom={1}>
            <DropdownMenuItem 
              onClick={() => setTheme("sunset")} 
              className="flex gap-2 cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors rounded-md"
            >
              <Sunset className="h-[1rem] w-[1rem] text-orange-400" />
              <span>Sunset Mode</span>
            </DropdownMenuItem>
          </motion.li>
          
          <motion.li variants={dropdownItemVariants} custom={2}>
            <DropdownMenuItem 
              onClick={() => setTheme("forest")} 
              className="flex gap-2 cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors rounded-md"
            >
              <Leaf className="h-[1rem] w-[1rem] text-green-500" />
              <span>Forest Mode</span>
            </DropdownMenuItem>
          </motion.li>
          
          <motion.li variants={dropdownItemVariants} custom={3}>
            <DropdownMenuItem 
              onClick={() => setTheme("galaxy")} 
              className="flex gap-2 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors rounded-md"
            >
              <Moon className="h-[1rem] w-[1rem] text-purple-500" />
              <span>Galaxy Mode</span>
            </DropdownMenuItem>
          </motion.li>
          
          <motion.li variants={dropdownItemVariants} custom={4}>
            <DropdownMenuItem 
              onClick={() => setTheme("system")} 
              className="flex gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-colors rounded-md"
            >
              <CloudSun className="h-[1rem] w-[1rem] text-gray-400" />
              <span>System</span>
            </DropdownMenuItem>
          </motion.li>
        </motion.ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
