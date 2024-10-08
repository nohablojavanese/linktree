import React, { ReactNode } from "react";

interface MobileMockupProps {
  children: ReactNode;
}

const MobileMockup: React.FC<MobileMockupProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 border-gray-800 dark:border-gray-800 bg-gray-800 border-[3%] rounded-[10%]">
      <div className="h-[5%] w-[1%] bg-gray-800 dark:bg-gray-800 absolute -left-[4%] top-[12%] rounded-l-lg"></div>
      <div className="h-[7%] w-[1%] bg-gray-800 dark:bg-gray-800 absolute -left-[4%] top-[21%] rounded-l-lg"></div>
      <div className="h-[7%] w-[1%] bg-gray-800 dark:bg-gray-800 absolute -left-[4%] top-[30%] rounded-l-lg"></div>
      <div className="h-[10%] w-[1%] bg-gray-800 dark:bg-gray-800 absolute -right-[4%] top-[24%] rounded-r-lg"></div>
      <div className="absolute inset-[3%] rounded-[7%] overflow-hidden bg-white dark:bg-gray-900">
        {children}
      </div>
    </div>
  );
};

export default MobileMockup;
