"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js"; // Import the Session type
import { ThemeSwitcher } from "../DarkMode";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [session, setSession] = useState<Session | null>(null); // Set the correct type
  const router = useRouter();
  const supabase = createClient();

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
            Link.id
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          {["Home", "Features", "Premium", "Demo", "Stats", "Check"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                isScrolled ? "text-black dark:text-white" : "text-white"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {session ? (
          <div className="flex items-center gap-4">
            <Button
              radius="full"
              className={`font-bold accordion-up bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg ${
                isScrolled
                  ? "bg-gradient-to-br from-blue-500 to-gray-500 text-white shadow-lg"
                  : ""
              }  `}
              color="primary"
              onClick={() => router.push("/edit")}
            >
              Edit
            </Button>
            <Button
              className="md:flex hidden "
              color="danger"
              endContent={<LogOutIcon />}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
            <ThemeSwitcher className="md:flex hidden relative top-0 right-0" />
          </div>
        ) : (
          <a href="/login" target="_self">
            <Button
              className={`font-bold bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg ${
                isScrolled
                  ? "bg-gradient-to-br from-blue-500 to-gray-500 text-white shadow-lg"
                  : ""
              }  `}
              color="primary"
              endContent={<LogInIcon />}
            >
              Login
            </Button>
          </a>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
