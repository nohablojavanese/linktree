import React from 'react';
import { Skeleton } from "@nextui-org/react";

const AuthPageLoading = () => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto lg:w-96 space-y-6">
          {/* Tabs placeholder */}
          <div className="flex space-x-2 mb-4">
            <Skeleton className="w-1/2 h-10 rounded-lg" />
            <Skeleton className="w-1/2 h-10 rounded-lg" />
          </div>

          {/* Form fields placeholder */}
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
          
          {/* Submit button placeholder */}
          <Skeleton className="w-full h-12 rounded-lg" />

          {/* Additional links placeholder */}
          <div className="flex justify-between">
            <Skeleton className="w-1/3 h-4" />
            <Skeleton className="w-1/3 h-4" />
          </div>
        </div>
      </div>
      <div className="relative flex-1 hidden w-0 lg:block">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
};

export default AuthPageLoading;