import React from "react";
import { createClient } from "@/lib/supabase/server"; 
import { UserNotFound } from "@/components/NotFound";
import { redirect } from "next/navigation";
import UserPageReturn from "@/components/RenderUsername";
import { Metadata, ResolvingMetadata } from "next";
import Watermark from "@/components/Watermark";
import DeepLinkRedirect from "./Deeplink";
import { Profile } from "@/lib/types/type";

export const dynamicParams = true;
export const revalidate = 0; // Disable static generation for this route
type Props = {
  params: { username: string };
};

async function fetchUserProfile(username: string) {
  const supabase = createClient();
  const { data: profile, error } = await supabase
    .rpc('clean_user_profile', { search_username: username })
    .single<Profile>();

  if (error && error.code === 'PGRST116') {
    return null; // User not found
  }
  if (error) throw error;
  return profile;
}

async function fetchUserData(userId: string) {
  const supabase = createClient();
  const [links, socialLinks, theme] = await Promise.all([
    supabase.from("links").select("*").eq("user_id", userId).order('order', { ascending: true }),
    supabase.from("social_links").select("*").eq("user_id", userId),
    supabase.from("themes").select("*").eq("user_id", userId).single(),
  ]);

  return {
    links: links.data || [],
    socialLinks: socialLinks.data || [],
    theme: theme.data,
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const profile = await fetchUserProfile(params.username);

  if (!profile) {
    return { title: "User Not Found" };
  }

  return {
    title: `${profile.username} Links`,
    description: profile.bio || `Check out ${profile.username}'s profile`,
    openGraph: {
      title: `${profile.username}'s Profile`,
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
      title: `${profile.username}'s Profile`,
      description: profile.bio || `Check out ${profile.username}'s profile`,
      images: [profile.image_url || "/image.png"],
    },
  };
}

export default async function UserPage({ params }: Props) {
  const profile = await fetchUserProfile(params.username);
  
  if (!profile) {
    return <UserNotFound username={params.username} />;
  }

  if (params.username !== profile.username) {
    redirect(`/${profile.username}`);
  }

  // Handle DeepLink redirection
  if (profile.redirect === true && profile.url) {
    return <DeepLinkRedirect url={profile.url} />;
  }

  const { links, socialLinks, theme } = await fetchUserData(profile.id);

  return (
    <>
      <UserPageReturn
        profile={profile}
        links={links}
        socialLinks={socialLinks}
        themes={theme || {}}
      />
      <Watermark username={profile.username} verified={profile.verified} />
    </>
  );
}
