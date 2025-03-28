
import { Sparkles, Moon, Sun, Zap, CloudSun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const iconVariants = {
    initial: { scale: 0.8, rotate: -10, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 0.8, rotate: 10, opacity: 0 },
    hover: { scale: 1.2, rotate: 5 }
  };
  
  const bgVariants = {
    initial: { scale: 0, borderRadius: "50%" },
    animate: { scale: 1, borderRadius: "50%" },
    hover: { scale: 1.1, borderRadius: "30%" }
  };

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
            className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full z-0"
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
              animate="animate"
              exit="exit"
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {theme === "elegant" && (
                <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-400" />
              )}
              {theme === "fun" && (
                <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
              )}
              {theme === "playful" && (
                <Zap className="h-[1.2rem] w-[1.2rem] text-pink-500" />
              )}
              {theme === "cosmic" && (
                <Sparkles className="h-[1.2rem] w-[1.2rem] text-purple-500" />
              )}
              {theme === "system" && (
                <CloudSun className="h-[1.2rem] w-[1.2rem] text-blue-400" />
              )}
            </motion.div>
          </AnimatePresence>
          
          <motion.span 
            className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
          
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-scale-in rounded-lg overflow-hidden">
        <DropdownMenuItem 
          onClick={() => setTheme("fun")} 
          className="flex gap-2 cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
        >
          <Sun className="h-[1rem] w-[1rem] text-yellow-500" />
          <span>Fun Mode</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("elegant")} 
          className="flex gap-2 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
        >
          <Moon className="h-[1rem] w-[1rem] text-indigo-400" />
          <span>Elegant Mode</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("playful")} 
          className="flex gap-2 cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
        >
          <Zap className="h-[1rem] w-[1rem] text-pink-500" />
          <span>Playful Mode</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("cosmic")} 
          className="flex gap-2 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
        >
          <Sparkles className="h-[1rem] w-[1rem] text-purple-500" />
          <span>Cosmic Mode</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")} 
          className="flex gap-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
        >
          <CloudSun className="h-[1rem] w-[1rem] text-blue-400" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
