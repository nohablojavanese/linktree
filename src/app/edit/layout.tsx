import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import UserPagePreview from "@/components/EditPreview/PagePreview";
import MobileMockup from "@/components/EditPreview/Mobile";
import PreviewOverlay from "@/components/EditPreview/PreviewOverlay";
import { createClient } from "@/lib/supabase/server";
import { ThemeSwitcher } from "@/components/DarkMode";
import { Toaster } from "@/components/shadcn/ui/sonner";
import GlobalMenu from "@/components/Profile/GlobalMenu";
import Username from "@/components/ui/Username";

interface EditLayoutProps {
  children: ReactNode;
}

async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export default async function EditLayout({ children }: EditLayoutProps) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Toaster />
      <div className="flex h-screen">
        <GlobalMenu />
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row md:ml-16 ">
          {/* Main content area */}
          <div className="w-full md:w-2/3 overflow-hidden z-20">
            <div className="h-full overflow-y-auto scrollbar-hide dark:bg-gray-900 bg-gray-100">
              {children}
            </div>
            {/* PreviewOverlay for mobile view */}
            <div className="md:hidden">
              <PreviewOverlay>
                <UserPagePreview />
              </PreviewOverlay>
            </div>
          </div>

          {/* Preview section - only visible on desktop */}
          <div className="hidden md:flex w-1/3 dark:bg-gray-900 bg-gray-100 flex-col items-center justify-start ">
            <div className="w-full h-[calc(100vh-2rem)] flex items-center justify-center  overflow-y-auto scrollbar-hide">
              <div className="relative" style={{ width: '20vw', height: '40vw' }}>
                <MobileMockup>
                  <UserPagePreview />
                </MobileMockup>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <Username />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
