"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, Paintbrush, LineChart, Crown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/shadcn/ui/tooltip";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface DashboardProps {
  children: ReactNode;
}

const navItems: NavItemProps[] = [
  { href: "/edit", icon: <Home className="h-5 w-5" />, label: "Home" },
  {
    href: "/edit/profile",
    icon: <Settings className="h-5 w-5" />,
    label: "Profile",
  },
  {
    href: "/edit/appearance",
    icon: <Paintbrush className="h-5 w-5" />,
    label: "Appearance",
  },
  {
    href: "/edit/analytics",
    icon: <LineChart className="h-5 w-5" />,
    label: "Analytics",
  },
  {
    href: "/edit/premium",
    icon: <Crown className="h-5 w-5" />,
    label: "Premium",
  },
];

const NavItem: React.FC<NavItemProps> = ({ href, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-blue-100 dark:hover:bg-blue-900 ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {icon}
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-gray-800 text-white rounded-md"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const PCNav: React.FC = () => (
  <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-white dark:bg-gray-900 sm:flex">
    <nav className="flex flex-col items-center gap-4 p-2">
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  </aside>
);

const MobileNav: React.FC = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-10 flex justify-around bg-white dark:bg-gray-900 border-t p-2 sm:hidden">
    {navItems.map((item) => (
      <NavItem key={item.href} {...item} />
    ))}
  </nav>
);

export function Dashboard({ children }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <PCNav />
      <main className="pt-4 pb-16 sm:ml-16 sm:pb-4">
        <div className="container mx-auto md:px-4 px-0">
          {children}
          </div>
      </main>
      <MobileNav />
    </div>
  );
}
