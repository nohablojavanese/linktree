import React, { ReactNode } from "react";

interface MobileMockupProps {
  children: ReactNode;
}

const MobileMockup: React.FC<MobileMockupProps> = ({ children }) => {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[80vh] w-[calc(80vh*0.5)]">
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800">
        <div className="max-w-screen-sm overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default MobileMockup;
