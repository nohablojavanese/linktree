"use client";
import React from "react";
import { Skeleton, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

export type UserProfileProps = {
  username: string;
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

export const UserProfile: React.FC<UserProfileProps> = ({
  username,
  createdAt,
  imageUrl,
  verified,
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div className="relative">
      <div className="absolute">
        {imageUrl ? (
          <>
            {!imageLoaded && <Skeleton className="rounded-full w-32 h-32" />}
            <Image
              src={imageUrl}
              alt={`${username}'s Profile Picture`}
              width={128}
              height={128}
              className={`rounded-full object-cover w-32 h-32 border-4 border-white ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </>
        ) : (
          <DefaultAvatar username={username} />
        )}
      </div>
      <div className="pt-36">
        {username ? (
          <h1 className="text-2xl font-bold text-white flex items-center">
           @{username}
            {verified !== undefined && (
              <Tooltip content={verified ? "Verified" : "Unverified"}>
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
        ) : (
          <Skeleton className="h-10 w-3/4 mb-2" />
        )}
        {createdAt ? (
          <p className="text-sm text-gray-300">
            Joined{" "}
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        ) : (
          <Skeleton className="h-4 w-1/2" />
        )}
      </div>
    </div>
  );
};
