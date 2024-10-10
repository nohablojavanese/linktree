// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./shadcn/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // If you have a utility function to combine class names

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(" rounded-xl border-gray-400 z-50", className)}
      variant="outline"
      size="icon"
    >
      {theme === "dark" ? (
        <SunIcon className="" />
      ) : (
        <MoonIcon className="text-gray-600" />
      )}
    </Button>
  );
}

export function SimpleThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center cursor-pointer"
    >
      {theme === "dark" ? (
        <>
          <SunIcon className="w-4 h-4 mr-2 text-yellow-400" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <MoonIcon className="w-4 h-4 mr-2 text-blue-600" />
          <span>Dark Mode</span>
        </>
      )}
    </div>
  );
}


