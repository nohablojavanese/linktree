"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { LogInIcon, LogOutIcon, StarIcon, User } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js"; // Import the Session type
import { ThemeSwitcher } from "../DarkMode";
import { MdArrowDropDown } from "react-icons/md";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  href: string;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [session, setSession] = useState<Session | null>(null); // Set the correct type
  const router = useRouter();
  const supabase = createClient();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const navItems: NavItem[] = [
    { name: "Templates", href: "/templates" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Discover", href: "/discover" },
    { name: "Pricing", href: "/pricing" },
    { name: "Learn", href: "/learn" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md dark:bg-[#1a1b1e]/80"
          : "bg-[#0070f3] text-white"
      }`}
    >
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Image src="/favicon.png" alt="logo" width={24} height={24} />
          <span
            className={`text-lg  font-semibold ${
              isScrolled ? "text-[#0070f3]" : ""
            }  `}
          >
            Wisp
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 text-sm font-medium
                transition-all duration-200 ease-in-out rounded-2xl
                ${
                  isScrolled
                    ? "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    : "text-white hover:bg-white/20"
                }
                ${
                  pathname === item.href
                    ? isScrolled
                      ? "bg-gray-200 dark:bg-gray-700 rounded-xl"
                      : "bg-white/20 rounded-xl"
                    : ""
                }
              `}
              aria-label={`Navigate to ${item.name}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center md:gap-2 gap-0">
          <Dropdown className="bg-black text-white">
            <DropdownTrigger>
              <Button 
                className={`font-bold shadow-lg text-white
                  ${isScrolled ? "bg-black text-white" : "bg-yellow-500"}
                  p-2 min-w-[40px] sm:min-w-[120px]`}
                endContent={<MdArrowDropDown className="hidden sm:inline" />}
                startContent={
                  <>
                    <StarIcon
                      className={`w-6 h-6 sm:w-5 sm:h-5 ${
                        isScrolled ? "text-yellow-500" : "text-white"
                      }`}
                    />
                    <span className="hidden sm:inline ml-1">Get Premium</span>
                  </>
                }
                aria-label="Get Premium"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Premium options">
              <DropdownSection title="Trials" showDivider>
                <DropdownItem
                  description="Free Trial Premium Features for 14 days"
                  key="public"
                >
                  Free Trial
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title="Limited Events" showDivider>
                <DropdownItem
                  description="Content Creators with 1000+ Followers"
                  key="creator"
                >
                  For Creator
                </DropdownItem>
                <DropdownItem
                  description="Business with reputable brand"
                  key="business"
                >
                  For Business Owner
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>

          {session ? (
            <Dropdown className="bg-black text-white">
              <DropdownTrigger>
                <Button
                  className={`font-bold bg-transparent border-none ${
                    isScrolled ? " text-blue-500" : "text-white"
                  }`}
                  endContent={<MdArrowDropDown />}
                  startContent={<User />}
                >
                  <span className="hidden sm:inline">Account</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Account options">
                <DropdownItem
                  key="signout"
                  onClick={() => router.push("/edit")}
                >
                  Edit
                </DropdownItem>
                <DropdownItem key="signout" onClick={handleSignOut}>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Link href="/login">
              <Button
                className={`flex bg-transparent font-bold ${
                  isScrolled ? "text-blue-500" : "text-white"
                }`}
                endContent={<LogInIcon className="md:ml-2" />}
              >
                <span className="hidden md:inline">Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
