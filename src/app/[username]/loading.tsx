import React from 'react';
import { Skeleton } from "@nextui-org/react";

const UserPageLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-md mx-auto space-y-6 px-4">
        {/* User Profile placeholder */}
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="w-24 h-24 rounded-full" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-2/3 h-4" />
        </div>

        {/* Links placeholder */}
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="w-full h-12 rounded-lg" />
        ))}

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

export default UserPageLoading;