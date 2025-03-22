
import { Palette, Moon, Sun, Gem, CloudSun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative group">
          {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem] transition-all animate-gentle-rotate" />}
          {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem] transition-all animate-pulse-sophisticated" />}
          {theme === "vibrant" && <Gem className="h-[1.2rem] w-[1.2rem] transition-all text-primary/80" />}
          {theme === "pastel" && <CloudSun className="h-[1.2rem] w-[1.2rem] transition-all text-primary/80" />}
          {theme === "system" && <Palette className="h-[1.2rem] w-[1.2rem] transition-all" />}
          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-scale-in rounded-lg overflow-hidden">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex gap-2 cursor-pointer">
          <Sun className="h-[1rem] w-[1rem]" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex gap-2 cursor-pointer">
          <Moon className="h-[1rem] w-[1rem]" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("vibrant")} className="flex gap-2 cursor-pointer">
          <Gem className="h-[1rem] w-[1rem]" />
          <span>Vibrant</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("pastel")} className="flex gap-2 cursor-pointer">
          <CloudSun className="h-[1rem] w-[1rem]" />
          <span>Pastel</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex gap-2 cursor-pointer">
          <Palette className="h-[1rem] w-[1rem]" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
