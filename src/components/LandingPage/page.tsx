import HeroSection from "../MainPage/HeroSection";
import FeaturesSection from "../MainPage/FeaturedSection";
import { CardDemo } from "../MainPage/CardDemo";
import LinkProfileCounter from "../MainPage/Counter";
import PremiumSection from "../MainPage/PremiumSection";
import UsernameChecker from "@/components/MainPage/NameCheck";

export default function LandingPage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FeaturesSection />
      <PremiumSection />
      <CardDemo />
      <LinkProfileCounter />
      <UsernameChecker />
    </main>
  );
}