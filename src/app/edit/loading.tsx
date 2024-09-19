import React from "react";
import { Skeleton } from "@nextui-org/react";
const EditPageLoading = () => {
  return (
    <div className="mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-hidden">
      <div className="max-w-md mx-auto space-y-6">
        {/* Links placeholder */}
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="w-full h-48 rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default EditPageLoading;
