import React from "react";
import { Skeleton } from "@nextui-org/react";
const EditPageLoading = () => {
  return (
    <div className="mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-hidden">
      {/* Theme Switcher placeholder */}
      <div className="flex justify-end mb-4">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* User Profile placeholder */}
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="w-24 h-24 rounded-full" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/3 h-4" />
        </div>

        {/* Update Theme placeholder */}
        <Skeleton className="w-full h-12 rounded-lg" />

        {/* Edit Profile placeholder */}
        <div className="space-y-2">
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>

        {/* Add Link placeholder */}
        <Skeleton className="w-full h-12 rounded-lg" />

        {/* Links placeholder */}
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="w-full h-16 rounded-lg" />
        ))}

        {/* Add Social placeholder */}
        <Skeleton className="w-full h-12 rounded-lg" />

        {/* Social Links placeholder */}
        {[...Array(2)].map((_, index) => (
          <Skeleton key={index} className="w-full h-16 rounded-lg" />
        ))}

        {/* Sign Out Button placeholder */}
        <Skeleton className="w-full h-12 rounded-lg" />
      </div>
    </div>
  );
};

export default EditPageLoading;
