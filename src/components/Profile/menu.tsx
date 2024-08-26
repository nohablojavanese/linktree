"use client";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Settings,
  Paintbrush,
  LineChart,
  Crown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
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
  isExpanded: boolean;
}

interface DashboardProps {
  children: ReactNode;
}

const navItems: Omit<NavItemProps, "isExpanded">[] = [
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

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isExpanded }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={`flex items-center justify-start px-5 py-4 transition-colors hover:bg-blue-100 dark:hover:bg-blue-900 rounded-xl ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            <div className="flex items-center">
              {icon}
              {isExpanded && <span className="ml-3">{label}</span>}
            </div>
          </Link>
        </TooltipTrigger>
        {!isExpanded && (
          <TooltipContent
            side="right"
            className="bg-gray-800 text-white rounded-xl"
          >
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

const PCNav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`fixed hidden inset-y-0 left-0 z-10 md:flex flex-col bg-white dark:bg-gray-900 border-r transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <Link href="/edit" className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            L
          </div>
          {isExpanded && <span className="ml-3 font-semibold">Logo</span>}
        </Link>
      </div>
      <nav className="flex flex-col flex-grow">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} isExpanded={isExpanded} />
        ))}
      </nav>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-1/2 -right-3 text-blue-500 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full p-1 transform -translate-y-1/2"
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
};

const MobileNav: React.FC = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-10 flex justify-around bg-white dark:bg-gray-900 border-t p-2 md:hidden">
    {navItems.map((item) => (
      <NavItem key={item.href} {...item} isExpanded={false} />
    ))}
  </nav>
);

export function Dashboard({ children }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <PCNav />
      <main className="transition-all duration-300">
          {children}
      </main>
      <MobileNav />
    </div>
  );
}
