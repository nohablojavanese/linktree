"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, LogOut } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import NavItem from "./NavItem";
import { Profile } from "@/lib/types/type";
import { navItems } from "./navItems";
import { signOut } from "@/lib/supabase/sign";
import { useRouter } from "next/navigation";
import { SimpleThemeSwitcher } from "../DarkMode";
import { getGreeting } from "@/lib/helper/greeting";

interface PCNavClientProps {
  user: Profile;
}

const PCNavClient: React.FC<PCNavClientProps> = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    const { success } = await signOut();
    if (success) {
      router.refresh(); // Refresh the current page to reflect the signed-out state
    }
  };

  return (
    <aside
      className={`fixed hidden inset-y-0 left-0 z-10 md:flex flex-col text-black dark:text-white bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo component */}
      </div>
      <nav className="flex flex-col flex-grow">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} isExpanded={isExpanded} />
        ))}
      </nav>

      {/* Profile dropdown */}
      <div className="mt-auto mb-4 px-4">
        <Dropdown placement="top-start" backdrop="blur">
          <DropdownTrigger>
            <button className="flex items-center w-full text-black dark:text-white">
              <Avatar
                isBordered
                size="sm"
                src={user.image_url || "https://i.pravatar.cc/150"}
                className="transition-transform"
              />
              {isExpanded && (
                <span className="ml-3 text-sm font-medium truncate">
                  {user.username}
                </span>
              )}
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="User menu actions"
            variant="flat"
            className="text-black dark:text-white "
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">
                {getGreeting({ language: "en" })},
              </p>
              <p className="text-sm text-gray-500">{user.username}</p>
            </DropdownItem>
            {/* <DropdownItem key="settings">My Settings</DropdownItem> */}
            <DropdownItem
              key="visit-site"
              onPress={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_URL}/${user.username}`,
                  "_blank"
                )
              }
            >
              <div className="flex items-center">
                <span>Visit Site</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </DropdownItem>
            <DropdownItem key="terms">Terms</DropdownItem>
            <DropdownItem key="privacy">Privacy Policy</DropdownItem>
            <DropdownItem key="theme">
              <SimpleThemeSwitcher />
            </DropdownItem>

            <DropdownItem
              key="logout"
              color="danger"
              className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
              onPress={handleSignOut}
            >
              <div className="flex items-center">
                <LogOut className="w-4 h-4" />
                <span className="ml-2">Log Out</span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-1/2 -right-3 text-blue-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 transform -translate-y-1/2"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
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

export default PCNavClient;
