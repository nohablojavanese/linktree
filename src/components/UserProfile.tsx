"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import SignOutButton from "./SignOut";

export type UserProfileProps = {
  username: string;
  randomId: string;
  createdAt: string;
  imageUrl?: string | null;
  verified?: boolean;
};

const DefaultAvatar: React.FC<{ username: string }> = ({ username }) => {
  const letter = username.charAt(0).toUpperCase();
  const color = `hsl(${Math.random() * 360}, 70%, 70%)`;

  return (
    <div 
      className="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold"
      style={{ backgroundColor: color }}
    >
      {letter}
    </div>
  );
};

export const UserProfile: React.FC<UserProfileProps> = ({
  username,
  randomId,
  createdAt,
  imageUrl,
  verified,
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <Card className="w-full max-w-md mx-auto mb-4 dark:bg-gray-800">
      <CardHeader className="flex justify-center pb-0">
        <div className="relative w-24 h-24">
          {imageUrl ? (
            <>
              {!imageLoaded && <Skeleton className="rounded-full w-24 h-24" />}
              <Image
                src={imageUrl}
                alt={`${username}'s Profile Picture`}
                width={96}
                height={96}
                style={{ objectFit: "cover" }}
                className={`rounded-full cover w-24 h-24 ${
                  imageLoaded ? "opacity-100 " : "opacity-0 "
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </>
          ) : (
            <DefaultAvatar username={username} />
          )}
        </div>
      </CardHeader>
      <CardBody className="text-center">
        {username ? (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-500 dark:text-gray-400 flex items-center justify-center">
              @{username}
              {verified !== undefined && (
                <Tooltip
                  className="text-black dark:text-gray-100"
                  content={verified ? "Verified" : "Unverified"}
                >
                  <span>
                    <MdVerified
                      className={`ml-2 ${
                        verified ? "text-blue-500" : "text-gray-200 dark:text-gray-600 hidden"
                      } cursor-help`}
                      size={20}
                    />
                  </span>
                </Tooltip>
              )}
            </h2>
            <a
              href={`/${username}`}
              className="text-md font-bold mb-2 text-gray-500 dark:text-gray-400 hover:text-blue-400"
            >
              Link
            </a>
          </div>
        ) : (
          <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
        )}
        {createdAt ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Member since: {new Date(createdAt).toLocaleDateString()}
          </p>
        ) : (
          <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
        )}
        {randomId ? (
          <p className="text-sm mb-2 dark:text-gray-300 text-gray-500 ">
            <strong>ID:</strong> {randomId}
          </p>
        ) : (
          <Skeleton className="h-4 w-2/3 mx-auto mb-2" />
        )}
        {/* <SignOutButton/> */}
      </CardBody>
    </Card>
  );
};