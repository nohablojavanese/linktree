"use client";
import React from "react";
import { Skeleton, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

export type UserProfileProps = {
  username: string;
  bio?: string;
  createdAt: string;
  imageUrl?: string | null;
  verified?: boolean;
};

const DefaultAvatar: React.FC<{ username: string }> = ({ username }) => {
  const letter = username.charAt(0).toUpperCase();
  const color = `hsl(${Math.random() * 360}, 70%, 70%)`;

  return (
    <div
      className="w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white"
      style={{ backgroundColor: color }}
    >
      {letter}
    </div>
  );
};

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  bio,
  createdAt,
  imageUrl,
  verified,
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div className="flex flex-col items-center text-center">
      <ProfileImage username={username} imageUrl={imageUrl} onLoad={() => setImageLoaded(true)} />
      <div className="mt-4">
        <Username username={username} verified={verified} />
        <Bio bio={bio} />
        <JoinDate createdAt={createdAt} />
      </div>
    </div>
  );
};

const ProfileImage: React.FC<{ username: string; imageUrl?: string | null; onLoad: () => void }> = ({
  username,
  imageUrl,
  onLoad,
}) => {
  if (!imageUrl) return <DefaultAvatar username={username} />;

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

const Username: React.FC<{ username: string; verified?: boolean }> = ({ username, verified }) => (
  <h1 className="text-2xl font-bold text-white flex items-center justify-center">
    @{username}
    {verified !== undefined && (
      <Tooltip className="text-black" content={verified ? "Verified" : "Unverified"}>
        <span>
          <MdVerified
            className={`ml-2 ${verified ? "text-blue-500" : "text-gray-400 hidden"} cursor-help`}
            size={24}
          />
        </span>
      </Tooltip>
    )}
  </h1>
);

const Bio: React.FC<{ bio?: string }> = ({ bio }) => (
  <h2 className="text-sm text-white mt-2">{bio}</h2>
);

const JoinDate: React.FC<{ createdAt: string }> = ({ createdAt }) => (
  <p className="text-xs text-gray-300 mt-1">
    Joined{" "}
    {new Date(createdAt).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })}
  </p>
);

export { UserProfile };
