import { Home, Settings, Paintbrush, LineChart, Crown } from "lucide-react";

export const navItems = [
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
