import React from 'react';
import { createClient } from "@/lib/supabase/server";
import UserPageReturn from "@/components/RenderUsername";

const UserPagePreview: React.FC = async () => {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return <div className="p-4 text-center">User not authenticated</div>;
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user.id)
    .order("order", { ascending: true });

  const { data: socialLinks } = await supabase
    .from("social_links")
    .select("*")
    .eq("user_id", user.id);

  const { data: theme } = await supabase
    .from("themes")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    return <div className="p-4 text-center">Profile not found</div>;
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <UserPageReturn 
        profile={profile}
        links={links || []}
        socialLinks={socialLinks || []}
        themes={theme || {}}
      />
    </div>
  );
};

export default UserPagePreview;