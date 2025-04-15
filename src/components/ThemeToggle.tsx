
import { Sun, Moon, Sparkles, Star, CloudSun } from "lucide-react";
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
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
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
  
  const iconVariants = {
    initial: { scale: 0.8, rotate: -10, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 0.8, rotate: 10, opacity: 0 },
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
            className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full z-0"
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
              {theme === "elegant" && (
                <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-400" />
              )}
              {theme === "vibrant" && (
                <Sparkles className="h-[1.2rem] w-[1.2rem] text-pink-400" />
              )}
              {theme === "playful" && (
                <Star className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
              )}
              {theme === "cosmic" && (
                <Sun className="h-[1.2rem] w-[1.2rem] text-purple-400" />
              )}
              {theme === "system" && (
                <CloudSun className="h-[1.2rem] w-[1.2rem] text-indigo-400" />
              )}
            </motion.div>
          </AnimatePresence>
          
          <motion.span 
            className="absolute -bottom-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"
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
          <motion.li variants={dropdownItemVariants} custom={0}>
            <DropdownMenuItem 
              onClick={() => setTheme("elegant")} 
              className="flex gap-2 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors rounded-md"
            >
              <Moon className="h-[1rem] w-[1rem] text-indigo-400" />
              <span>Elegant Mode</span>
            </DropdownMenuItem>
          </motion.li>
          
          <motion.li variants={dropdownItemVariants} custom={1}>
            <DropdownMenuItem 
              onClick={() => setTheme("vibrant")} 
              className="flex gap-2 cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors rounded-md"
            >
              <Sparkles className="h-[1rem] w-[1rem] text-pink-400" />
              <span>Vibrant Mode</span>
            </DropdownMenuItem>
          </motion.li>
          
          <motion.li variants={dropdownItemVariants} custom={2}>
            <DropdownMenuItem 
              onClick={() => setTheme("playful")} 
              className="flex gap-2 cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors rounded-md"
            >
              <Star className="h-[1rem] w-[1rem] text-yellow-400" />
              <span>Playful Mode</span>
            </DropdownMenuItem>
          </motion.li>
          
          <motion.li variants={dropdownItemVariants} custom={3}>
            <DropdownMenuItem 
              onClick={() => setTheme("cosmic")} 
              className="flex gap-2 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors rounded-md"
            >
              <Sun className="h-[1rem] w-[1rem] text-purple-400" />
              <span>Cosmic Mode</span>
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
