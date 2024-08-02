import React from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { createClient } from "@/lib/supabase/server";
import { EditableLinkItem } from "@/components/EditableLinkItems";
import { EditableSocialLink } from "@/components/EditableSocialLink";
import { UserProfile } from "@/components/UserProfile";
import {
  createLink,
  updateLink,
  deleteLink,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "./actions";
import { redirect } from "next/navigation";
import { EditProfile } from "@/components/EditProfile";

async function fetchUserData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (!user) {
    return { error: "User not authenticated" };
  }

  const [profileResult, linksResult, socialLinksResult] = await Promise.all([
    supabase.from("user_profiles").select("*").eq("id", user.id).single(),
    supabase.from("links").select("*").eq("user_id", user.id),
    supabase.from("social_links").select("*").eq("user_id", user.id),
  ]);

  return {
    profile: profileResult.data,
    links: linksResult.data,
    socialLinks: socialLinksResult.data,
    error: profileResult.error || linksResult.error || socialLinksResult.error,
  };
}
export default async function EditPage() {
  const { profile, links, socialLinks, error } = await fetchUserData();

  if (error) {
    console.error("Error fetching data:", error);
    return <div className="text-center p-4 text-red-500">Error loading data. Please try again later.</div>;
  }

  if (!profile) {
    return <div className="text-center p-4 text-red-500">Profile not found. Please contact support.</div>;
  }

  return (
    <main className="container mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-md mx-auto space-y-6">
        <UserProfile
          username={profile.username}
          randomId={profile.random_id}
          createdAt={profile.created_at}
          imageUrl={profile.image_url} 
        />
        <EditProfile username={profile.username} imageUrl={profile.image_url} />

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Your Links</h2>
          <form action={createLink} className="space-y-4">
            <Input
              name="title"
              label="Title"
              placeholder="Enter link title"
              className="dark:text-white"
            />
            <Input
              name="url"
              label="URL"
              placeholder="Enter link URL"
              className="dark:text-white"
            />
            <Textarea
              name="description"
              label="Description"
              placeholder="Enter link description"
              className="dark:text-white"
            />
            <Button type="submit" color="primary" className="w-full">
              Add Link
            </Button>
          </form>
        </section>

        <div className="space-y-4">
          {links?.map((link) => (
            <EditableLinkItem
              key={link.id}
              {...link}
              onUpdate={updateLink}
              onDelete={deleteLink}
            />
          ))}
        </div>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Your Social Links</h2>
          <form action={createSocialLink} className="space-y-4">
            <Input
              name="platform"
              label="Platform"
              placeholder="Enter platform name"
              className="dark:text-white"
            />
            <Input
              name="url"
              label="URL"
              placeholder="Enter social link URL"
              className="dark:text-white"
            />
            <Button type="submit" color="primary" className="w-full">
              Add Social Link
            </Button>
          </form>
        </section>

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
    </main>
  );
}