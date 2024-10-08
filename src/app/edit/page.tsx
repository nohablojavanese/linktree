import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { EditableSocialLink } from "@/components/Update/EditableSocialLink";
import { updateSocialLink, deleteSocialLink } from "./actions";
import { redirect } from "next/navigation";
import { AddLink } from "@/components/Create/AddLink";
import { AddSocial } from "@/components/Create/AddSocial";
import { DragLinks } from "@/components/Drag/ServerDrag";
import SignOutButton from "@/components/SignOut";
import { Suspense } from "react";
import { AddApp } from "@/components/Create/AddApp";
import { AddHeader } from "@/components/Create/AddHeader";

async function fetchUserData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [profileResult, linksResult, socialLinksResult, themeResult] =
    await Promise.all([
      supabase.from("user_profiles").select("*").eq("id", user.id).single(),
      supabase
        .from("links")
        .select("*")
        .eq("user_id", user.id)
        .order("order", { ascending: true }),
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
export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await fetchUserData();

  return {
    title: profile ? `Edit | ${profile.username}` : "Edit",
    description: "Edit Page",
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
    <div className="mx-auto p-4 dark:bg-gray-900 bg-white min-h-screen overflow-hidden">
      <div className="max-w-md mx-auto space-y-6">
        <AddLink links={links || []} />
        <AddHeader />
        {/* <AddApp links={links || []} /> */}
        <Suspense fallback={<p>Loading Links...</p>}>
          {links && links.length > 0 ? <DragLinks links={links} /> : null}
        </Suspense>
        {/* <AddSocial socialLinks={socialLinks || []} />
        <div className="space-y-4">
          {socialLinks?.map((socialLink) => (
            <EditableSocialLink
              key={socia}
              {...socialLink}
              onUpdate={updateSocialLink}
              onDelete={deleteSocialLink}
            />
          ))}
        </div> */}
        <SignOutButton />
      </div>
    </div>
  );
}
