"use client";
import React from "react";
import { Skeleton, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { Profile } from "@/lib/types/type";
import { DefaultAvatar } from "@/components/ui/DefaultAvatar";

const UserProfile: React.FC<Profile> = ({
  username,
  bio,
  created_at,
  image_url,
  verified,
  random_id,
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div className="flex flex-col items-center text-center">
      <ProfileImage
        username={username}
        imageUrl={image_url}
        random_id={random_id}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="mt-4">
        <Username username={username} verified={verified} />
        <Bio bio={bio} />
        {/* <JoinDate created_at={created_at} /> */}
      </div>
    </div>
  );
};

const ProfileImage: React.FC<{
  username: string;
  imageUrl?: string | null;
  random_id: string;
  onLoad: () => void;
}> = ({ username, imageUrl, random_id, onLoad }) => {
  if (!imageUrl)
    return (
      <DefaultAvatar username={username} random_id={random_id} size={128} />
    );

  return (
    <div className="relative">
      <Skeleton className="rounded-full w-32 h-32" />
      <Image
        src={imageUrl}
        alt={`${username}'s Profile Picture`}
        width={128}
        height={128}
        className="rounded-full object-cover w-32 h-32 border-4 border-white absolute top-0 left-0"
        onLoad={onLoad}
      />
    </div>
  );
};

const Username: React.FC<{ username: string; verified?: boolean }> = ({
  username,
  verified,
}) => (
  <h1 className="text-2xl font-bold text-white flex items-center justify-center">
    @{username}
    {verified !== undefined && (
      <Tooltip
        className="text-black"
        content={verified ? "Verified" : "Unverified"}
      >
        <span>
          <MdVerified
            className={`ml-2 ${
              verified ? "text-blue-500" : "text-gray-400 hidden"
            } cursor-help`}
            size={24}
          />
        </span>
      </Tooltip>
    )}
  </h1>
);

const Bio: React.FC<{ bio?: string | null }> = ({ bio }) => (
  <h2 className="text-sm text-white mt-2">{bio}</h2>
);

const JoinDate: React.FC<{ created_at: string }> = ({ created_at }) => (
  <p className="text-xs text-gray-300 mt-1">
    Joined{" "}
    {new Date(created_at).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })}
  </p>
);

export { UserProfile };
