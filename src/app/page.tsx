import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/MainPage/NavBar";
import HeroSection from "@/components/MainPage/HeroSection";
import FeaturesSection from "@/components/MainPage/FeaturedSection";
import { CardDemo } from "@/components/MainPage/CardDemo";
import LinkProfileCounter from "@/components/MainPage/Counter";
import PremiumSection from "@/components/MainPage/PremiumSection";
import UsernameChecker from "@/components/MainPage/NameCheck";
import AuthenticatedUserView from "@/app/redirect";
import { cookies } from "next/headers";
import { setHomepagePreference } from "./actions";

export default async function HomePage() {
  const cookieStore = cookies();
  const homepage = cookieStore.get("homepage")?.value === "true";

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const HomePageContent = () => (
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

  if (!user || homepage) {
    return <HomePageContent />;
  }

  return (
    <AuthenticatedUserView setHomepagePreference={setHomepagePreference} />
  );
}
