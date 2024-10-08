import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/MainPage/NavBar";
import LandingPage from "@/components/LandingPage/page";
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

  return (
    <div className="flex flex-col min-h-[100dvh] dark:bg-[#1a1b1e] dark:text-white">
      <Navbar />
      {user && !homepage ? (
        <AuthenticatedUserView setHomepagePreference={setHomepagePreference} />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}
