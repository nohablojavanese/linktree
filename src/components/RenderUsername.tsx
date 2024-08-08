import React from "react";
import { LinkItem } from "@/components/LinkItems";
import { SocialLink } from "@/components/SocialLinks";
import { UserProfile } from "@/components/UserProfile";
import { UserPageProp } from "@/lib/types/type";
import Watermark from "./Watermark";

const UserPageReturn: React.FC<UserPageProp> = ({
  profile,
  links,
  socialLinks,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md ">
        <div className="p-6 space-y-6">
          <UserProfile
            username={profile.username}
            randomId={profile.random_id}
            createdAt={profile.created_at}
            imageUrl={profile.image_url}
            verified={profile.verified}
          />

          <div className="space-y-4">
            {links?.map(
              (link) =>
                link.isVisible && (
                  <LinkItem
                    theme={profile.theme || "default"}
                    id={link.id}
                    title={link.title}
                    url={link.url}
                    imageUrl={link.imageUrl}
                    isVisible={link.isVisible}
                    // description={link.description}
                  />
                )
            )}
          </div>

          <div className="flex justify-center space-x-4">
            {socialLinks?.map((socialLink) => (
              <SocialLink key={socialLink.id} {...socialLink} />
            ))}
          </div>
          <Watermark username={profile.username} verified={profile.verified} />
        </div>
      </div>
    </div>
  );
};

export default UserPageReturn;
