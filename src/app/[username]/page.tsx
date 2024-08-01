import React from 'react';
import { createClient } from '@/lib/supabase/client';
import { LinkItem } from '@/components/LinkItems';
import { SocialLink } from '@/components/SocialLinks';
import { UserProfile } from '@/components/UserProfile';
import { notFound } from 'next/navigation';

export const dynamicParams = true;

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: profiles } = await supabase.from('user_profiles').select('username');
  
  return profiles?.map(({ username }) => ({
    username,
  })) || [];
}

export default async function UserPage({ params }: { params: { username: string } }) {
  const supabase = createClient();

  try {
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('username', params.username)
      .single();

    if (profileError || !profile) {
      notFound();
    }

    const { data: links, error: linksError } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', profile.id);

    const { data: socialLinks, error: socialLinksError } = await supabase
      .from('social_links')
      .select('*')
      .eq('user_id', profile.id);

    if (linksError || socialLinksError) {
      console.error('Error fetching links:', linksError);
      console.error('Error fetching social links:', socialLinksError);
      return <div>Error loading data. Please try again later.</div>;
    }

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{profile.username} Profile</h1>

        <UserProfile
          username={profile.username}
          randomId={profile.random_id}
          createdAt={profile.created_at}
        />

        <h2 className="text-xl font-semibold mb-4">Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {links?.map((link) => (
            <LinkItem key={link.id} {...link} />
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Social Links</h2>
        <div className="space-y-4">
          {socialLinks?.map((socialLink) => (
            <SocialLink key={socialLink.id} {...socialLink} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in UserPage:', error);
    return <div>An unexpected error occurred. Please try again later.</div>;
  }
}