import React from "react";
import { createClient } from "@/lib/supabase/client";
import { UserNotFound } from "@/components/NotFound";
import { redirect } from "next/navigation";
import UserPageReturn from "@/components/RenderUsername";

export const dynamicParams = true;
export const revalidate = 0; // Disable static generation for this route

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: profiles } = await supabase
    .from("user_profiles")
    .select("username");

  return (
    profiles?.map(({ username }) => ({
      username,
    })) || []
  );
}

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();

  try {
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("username", params.username)
      .single();

    if (profileError || !profile) {
      return <UserNotFound username={params.username} />;
    }
    // Check if the current username matches the one in the database
    if (params.username !== profile.username) {
      redirect(`/${profile.username}`); // Redirect to the new username
    }
    const { data: links, error: linksError } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", profile.id);

    const { data: socialLinks, error: socialLinksError } = await supabase
      .from("social_links")
      .select("*")
      .eq("user_id", profile.id);

      const { data: theme, error: themeError } = await supabase
      .from("themes")
      .select("*")
      .eq("user_id", profile.id)
      .single()

    if (linksError || socialLinksError || themeError ) {
      console.error("Error fetching links:", linksError);
      console.error("Error fetching social links:", socialLinksError);
      console.error("Error fetching social links:", themeError);
      return <div>Error loading data. Please try again later.</div>;
    }

    return (
      <UserPageReturn
        profile={profile}
        links={links}
        socialLinks={socialLinks}
        themes={theme}
      />
    );
  } catch (error) {
    console.error("Error in UserPage:", error);
    return <div>An unexpected error occurred. Please try again later.</div>;
  }
}
