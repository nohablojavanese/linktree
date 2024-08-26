import React from "react";
import { LinkItem } from "@/components/LinkItems";
import { SocialLink } from "@/components/SocialLinks";
import { UserProfile } from "@/components/UserProfile";
import { UserPageProp } from "@/lib/types/type";

const UserPageReturn: React.FC<UserPageProp> = ({
  profile,
  links,
  socialLinks,
  themes,
}) => {
  return (
    <div className="min-h-screen relative">
      {/* Full-page background */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${profile.background_url})` }}
      />
      
      {/* Content overlay */}
      <div className="relative  min-h-screen bg-black bg-opacity-50 flex flex-col items-center">
        {/* Hero Image */}
        <div 
          className="w-full max-w-3xl h-60 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${profile.hero_url})` }}
        />

        {/* Profile section */}
        <div className="w-full max-w-3xl px-4 -mt-20">
          <UserProfile
            username={profile.username}
            createdAt={profile.created_at}
            imageUrl={profile.image_url}
            heroUrl={profile.hero_url}
            verified={profile.verified}
          />

          {/* Links section */}
          <div className="mt-8 space-y-4">
            {links?.map(
              (link) =>
                link.isVisible && (
                  <LinkItem
                    key={link.id}
                    themes={themes}
                    id={link.id}
                    title={link.title}
                    url={link.url}
                    imageUrl={link.imageUrl}
                    isVisible={link.isVisible}
                  />
                )
            )}
          </div>

          {/* Social links */}
          <div className="mt-8 flex justify-center space-x-4">
            {socialLinks?.map((socialLink) => (
              <SocialLink key={socialLink.id} {...socialLink} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPageReturn;