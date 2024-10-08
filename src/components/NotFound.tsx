"use client";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Watermark from "./Watermark";

interface NotFoundProps {
  username: string;
}

const UserNotFoundSkeleton = ({ username }: { username: string }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-md mx-auto space-y-6 px-4">
        {/* User Profile placeholder */}
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            @{username}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            User not found, You can claim and use this username
          </div>
        </div>

        {/* Links placeholder */}
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="w-full h-12 rounded-lg" />
        ))}

        {/* Claim and Reserve placeholders */}
        <Skeleton className="w-full h-12 rounded-lg bg-blue-200 dark:bg-blue-700" />
        <Skeleton className="w-full h-12 rounded-lg bg-green-200 dark:bg-green-700" />

        {/* Social Links placeholder */}
        <div className="flex justify-center space-x-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="w-10 h-10 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export const NotFound = ({ username }: NotFoundProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <UserNotFoundSkeleton username={username} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-md mx-auto space-y-6 px-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            @{username}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            User not found, claim this username
          </div>
        </div>

        <Link
          href="/login"
          className="block w-full py-3 px-4 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition-colors"
        >
          Claim wisp.bio/{username}
        </Link>
        <Link
          href="/reserve"
          className="block w-full py-3 px-4 bg-green-500 text-white text-center rounded-lg hover:bg-green-600 transition-colors"
        >
          Reserve Username
        </Link>

        <div className="flex justify-center space-x-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      </div>
      <Watermark username={username} notFound={true} />
    </div>
  );
};
