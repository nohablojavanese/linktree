"use client";
import Navbar from "@/components/MainPage/NavBar";
import HeroSection from "@/components/MainPage/HeroSection";
import FeaturesSection from "@/components/MainPage/FeaturedSection";
import { CardDemo } from "@/components/MainPage/CardDemo";
import LinkProfileCounter from "@/components/MainPage/Counter";
import PremiumSection from "@/components/MainPage/PremiumSection";
import UsernameChecker from "@/components/MainPage/NameCheck";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] dark:bg-[#1a1b1e] dark:text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PremiumSection />
        <CardDemo />
        <LinkProfileCounter />
        <UsernameChecker />
      </main>
    </div>
  );
}
