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
      <div className="w-full lg:w-2/3 pr-0 lg:pr-4 mb-4 lg:mb-0">
        {children}
      </div>
      <div id="mobile-preview" className="hidden lg:block lg:w-1/3">
        <div className="fixed top-0 right-0 w-1/3 h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="transform scale-[0.85] origin-center">
            <MobileMockup>
              <UserPagePreview />
            </MobileMockup>
          </div>
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