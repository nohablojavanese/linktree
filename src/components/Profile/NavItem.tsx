'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isExpanded }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={`flex items-center justify-start px-5 py-4 transition-colors rounded-xl`}
          >
            <div className={`flex items-center ${
              isActive
                ? "text-blue-500"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            }`}>
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

export default NavItem;