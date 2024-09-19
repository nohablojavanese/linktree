"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      className={`fixed hidden inset-y-0 left-0 z-10 md:flex flex-col text-black bg-white dark:bg-gray-900 border-r transition-all duration-300 ${
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
            <button className="flex items-center w-full text-black">
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
          <DropdownMenu aria-label="User menu actions" variant="flat" className="text-black">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">@{user.username}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="visit-site">Visit Site</DropdownItem>
            <DropdownItem key="terms">Terms</DropdownItem>
            <DropdownItem key="privacy">Privacy Policy</DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={handleSignOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

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

export default PCNavClient;
