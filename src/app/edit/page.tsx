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

async function fetchUserData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    return <div>Error loading data. Please try again later.</div>;
  }

  if (!profile) {
    return <div>Profile not found. Please contact support.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>

      <UserProfile
        username={profile.username}
        randomId={profile.random_id}
        createdAt={profile.created_at}
      />

      <h2 className="text-xl font-semibold mb-4">Your Links</h2>
      <form action={createLink} className="mb-8">
        <Input
          name="title"
          label="Title"
          placeholder="Enter link title"
          className="mb-4"
        />
        <Input
          name="url"
          label="URL"
          placeholder="Enter link URL"
          className="mb-4"
        />
        <Textarea
          name="description"
          label="Description"
          placeholder="Enter link description"
          className="mb-4"
        />
        <Button type="submit" color="primary">
          Add Link
        </Button>
      </form>

      <div className="space-y-4 mb-8">
        {links?.map((link) => (
          <EditableLinkItem
            key={link.id}
            {...link}
            onUpdate={updateLink}
            onDelete={deleteLink}
          />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Your Social Links</h2>
      <form action={createSocialLink} className="mb-8">
        <Input
          name="platform"
          label="Platform"
          placeholder="Enter platform name"
          className="mb-4"
        />
        <Input
          name="url"
          label="URL"
          placeholder="Enter social link URL"
          className="mb-4"
        />
        <Button type="submit" color="primary">
          Add Social Link
        </Button>
      </form>

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
  );
}