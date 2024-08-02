// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { Button } from '@nextui-org/react';
import { SunIcon, MoonIcon } from 'lucide-react';
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <Button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className="fixed top-4 right-4"
  >
    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
  </Button>
  )
};