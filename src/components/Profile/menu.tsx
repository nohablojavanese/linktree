"use client";
import Image from "next/image";
import Link from "next/link";
import { Home, LineChart, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/shadcn/ui/tooltip";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface DashboardProps {
  children: ReactNode;
}

export function Dashboard({ children }: DashboardProps) {
  const pathname = usePathname();

  return (
    <div className="">
      <aside className="absolute inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background bg-black sm:flex">
        <nav className="flex fixed flex-col items-center gap-4 px-2 py-4">
          <Link
            href="/edit"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-blue-600 text-lg font-semibold text-white md:h-8 md:w-8 md:text-base"
          >
            <Home className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Home</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/edit/profile"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-blue-600 dark:hover:text-blue-300 md:h-8 md:w-8 ${
                    pathname === "/edit/profile"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="dark:bg-blue-600 rounded-xl dark:text-white"
              >
                Profile
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/edit/analytics"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-blue-600 dark:hover:text-blue-300 md:h-8 md:w-8 ${
                    pathname === "/edit/analytics"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="dark:bg-blue-600 rounded-xl dark:text-white"
              >
                Analytics
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <main className="flex-1 relative ml-14">{children}</main>
    </div>
  );
}
