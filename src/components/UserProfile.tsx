'use client'
import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import Image from "next/image";

export type UserProfileProps = {
  username: string;
  randomId: string;
  createdAt: string;
  imageUrl?: string | null;
};

export const UserProfile: React.FC<UserProfileProps> = ({
  username,
  randomId,
  createdAt,
  imageUrl,
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <Card className="w-full max-w-md mx-auto mb-4 dark:bg-gray-800">
      <CardHeader className="flex justify-center pb-0">
        <div className="relative w-24 h-24">
          {!imageLoaded && (
            <Skeleton className="rounded-full w-24 h-24" />
          )}
          <Image
            src={imageUrl ?? '/image.png'}
            alt={`${username}'s profile picture`}
            width={96}
            height={96}
            className={`rounded-full ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </CardHeader>
      <CardBody className="text-center">
        {username ? (
          <h2 className="text-2xl font-bold mb-2  text-gray-500 dark:text-gray-400">{username}</h2>
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
      </CardBody>
    </Card>
  );
};