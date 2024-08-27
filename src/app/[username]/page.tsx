import React from "react";
import { createClient } from "@/lib/supabase/client";
import { UserNotFound } from "@/components/NotFound";
import { redirect } from "next/navigation";
import UserPageReturn from "@/components/RenderUsername";
import { Metadata, ResolvingMetadata } from "next";
import Watermark from "@/components/Watermark";

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
type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("username", params.username)
    .single();

  if (!profile) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${profile.username} Links`,
    description: profile.bio || `Check out ${profile.username}'s profile`,
    openGraph: {
      title: `${profile.display_name || profile.username}'s Profile`,
      description: profile.bio || `Check out ${profile.username}'s profile`,
      url: `https://yourdomain.com/${profile.username}`,
      siteName: "Linked.id",
      images: [
        {
          url: profile.image_url || "https://yourdomain.com/default-avatar.png",
          width: 1200,
          height: 630,
          alt: `${profile.username}'s profile picture`,
        },
      ],
      locale: "en_US",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.display_name || profile.username}'s Profile`,
      description: profile.bio || `Check out ${profile.username}'s profile`,
      images: [profile.image_url || "/image.png"],
    },
  };
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
    // if (params.username !== profile.username) {
    //   redirect(`/${profile.username}`); // Redirect to the new username
    // }
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
      .single();

    if (linksError || socialLinksError || themeError) {
      console.error("Error fetching links:", linksError);
      console.error("Error fetching social links:", socialLinksError);
      console.error("Error fetching social links:", themeError);
      return <div>Error loading data. Please try again later.</div>;
    }

    return (
      <>
        <UserPageReturn
          profile={profile}
          links={links}
          socialLinks={socialLinks}
          themes={theme}
        />
        <Watermark username={profile.username} verified={profile.verified} />
      </>
    );
  } catch (error) {
    console.error("Error in UserPage:", error);
    return <div>An unexpected error occurred. Please try again later.</div>;
  }
}
