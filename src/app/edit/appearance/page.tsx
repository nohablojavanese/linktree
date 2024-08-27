import React, { Suspense } from "react";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { EditProfile } from "@/components/Update/EditProfile";
import { UpdateTheme } from "@/components/Update/UpdateTheme";

async function fetchUserData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [profileResult, themeResult] = await Promise.all([
    supabase
      .from("user_profiles")
      .select("username, background_url, hero_url, image_url, bio")
      .eq("id", user.id)
      .single(),
    supabase.from("themes").select("*").eq("user_id", user.id).single(),
  ]);

  return {
    profile: profileResult.data,
    theme: themeResult.data,
    error: profileResult.error || themeResult.error,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await fetchUserData();

  return {
    title: profile ? `Appearance | ${profile.username}` : "Appearance",
    description: "Appearance",
  };
}

export default async function EditPage() {
  const { profile, theme, error } = await fetchUserData();

  if (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="text-center p-4 text-red-500">
        Error loading data. Please try again later.
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center p-4 text-red-500">
        Profile not found. Please contact support.
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 bg-[#F3F3F1] dark:bg-gray-900 min-h-screen overflow-hidden">
      <div className="max-w-md mx-auto space-y-6">
        <Suspense fallback={<a>Loading...</a>}>
          <UpdateTheme
            currentTheme={theme?.theme || "default"}
            currentFontFamily={theme?.font_family || ""}
          />
        </Suspense>
        <Suspense fallback={<a>Loading...</a>}>
          <EditProfile profile={profile} />
        </Suspense>
      </div>
    </div>
  );
}
