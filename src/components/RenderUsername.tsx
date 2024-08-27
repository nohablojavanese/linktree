"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@nextui-org/react";
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
  const [bgLoaded, setBgLoaded] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  return (
    <div className="min-h-screen relative">
      {/* Full-page background */}
      {!profile.background_url && (
        <div className="absolute bg-white  inset-0" />
      )}
      {profile.background_url && (
        <div className="fixed inset-0 z-0">
          {!bgLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <Image
            src={profile.background_url}
            alt="Background"
            fill
            // priority
            sizes="(max-width: 768px) 100vw, 1920px"
            className=" object-cover"
            onLoad={() => setBgLoaded(true)}
          />
        </div>
      )}
      {/* Content overlay */}
      <div className="relative min-h-screen bg-black bg-opacity-60 flex flex-col items-center">
        {/* Hero Image */}
        <div
          className={`w-full max-w-3xl ${
            profile.hero_url ? "h-60" : "h-20"
          } relative`}
        >
          {profile.hero_url && (
            <>
              {!heroLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <Image
                src={profile.hero_url}
                alt="Hero"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1500px"
                className=" object-cover"
                onLoad={() => setHeroLoaded(true)}
              />
            </>
          )}
        </div>

        {/* Profile section */}
        <div
          className={`w-full max-w-3xl px-4 ${
            profile.hero_url? "-mt-20" : "mt-4"
          }`}
        >
          <UserProfile
            username={profile.username}
            bio={profile.bio}
            createdAt={profile.created_at}
            imageUrl={profile.image_url}
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
