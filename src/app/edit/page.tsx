import React from "react";
import { createClient } from "@/lib/supabase/server";
import { EditableLinkItem } from "@/components/Update/EditableLinkItems";
import { EditableSocialLink } from "@/components/Update/EditableSocialLink";
import { UserProfile } from "@/components/UserProfile";
import {
  updateLink,
  deleteLink,
  updateLinkVisibility,
  updateSocialLink,
  deleteSocialLink,
} from "./actions";
import { redirect } from "next/navigation";
import { EditProfile } from "@/components/Update/EditProfile";
import { AddLink } from "@/components/Create/AddLink";
import { AddSocial } from "@/components/Create/AddSocial";
import { UpdateTheme } from "@/components/Update/UpdateTheme";

async function fetchUserData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (!user) {
    return { error: "User not authenticated" };
  }

  const [profileResult, linksResult, socialLinksResult, themeResult] =
    await Promise.all([
      supabase.from("user_profiles").select("*").eq("id", user.id).single(),
      supabase.from("links").select("*").eq("user_id", user.id),
      supabase.from("social_links").select("*").eq("user_id", user.id),
      supabase.from("themes").select("*").eq("user_id", user.id).single(),
    ]);

  return {
    profile: profileResult.data,
    links: linksResult.data,
    socialLinks: socialLinksResult.data,
    theme: themeResult.data,
    error:
      profileResult.error ||
      linksResult.error ||
      socialLinksResult.error ||
      themeResult.error,
  };
}
export default async function EditPage() {
  const { profile, links, socialLinks, theme, error } = await fetchUserData();

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
    <div className="mx-auto p-4 bg-gray-50 dark:bg-gray-900  min-h-screen overflow-hidden">
      <div className="max-w-md mx-auto space-y-6">
        <UserProfile
          username={profile.username}
          randomId={profile.random_id}
          createdAt={profile.created_at}
          imageUrl={profile.image_url}
        />
        <UpdateTheme
          currentTheme={theme?.theme || "default"}
          currentFontFamily={theme?.font_family || ""}
        />

        <EditProfile username={profile.username} imageUrl={profile.image_url} />

        <AddLink links={links || []} />

        <div className="space-y-4">
          {links?.map((link) => (
            <EditableLinkItem
              key={link.id}
              {...link}
              onUpdate={updateLink}
              onDelete={deleteLink}
              onVisible={updateLinkVisibility}
            />
          ))}
        </div>

        <AddSocial socialLinks={socialLinks || []} />

        <div className="space-y-4">
          {socialLinks?.map((socialLink) => (
            <EditableSocialLink
              key={socialLink.id}
              {...socialLink}
              onUpdate={updateSocialLink}
              onDelete={deleteSocialLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
