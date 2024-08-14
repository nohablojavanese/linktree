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
      className={cn(
        "fixed top-4 right-4 rounded-xl border-gray-400 z-50",
        className
      )}
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
