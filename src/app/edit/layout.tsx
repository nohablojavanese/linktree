import React from "react";
import { ReactNode } from "react";
import { Dashboard } from "@/components/Profile/menu";
import UserPagePreview from "@/components/EditPreview/PagePreview";
import MobileMockup from "@/components/EditPreview/Mobile";
import PreviewOverlay from "@/components/EditPreview/PreviewOverlay";

interface EditLayoutProps {
  children: ReactNode;
}

const EditLayout: React.FC<EditLayoutProps> = ({ children }) => {
  return (
    <Dashboard>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 pr-0  mb-4 lg:mb-0">
          {children}
        </div>
        <div className="hidden lg:flex lg:w-1/3 items-center justify-center sticky bg-[#F3F3F1] dark:bg-gray-900 ">
          <div className="transform scale-90 sticky over">
            <MobileMockup>
              <UserPagePreview />
            </MobileMockup>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <PreviewOverlay>
          <UserPagePreview />
        </PreviewOverlay>
      </div>
    </Dashboard>
  );
};


export default EditLayout;