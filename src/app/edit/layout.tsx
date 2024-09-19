import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import UserPagePreview from "@/components/EditPreview/PagePreview";
import MobileMockup from "@/components/EditPreview/Mobile";
import PreviewOverlay from "@/components/EditPreview/PreviewOverlay";
import { createClient } from "@/lib/supabase/server";
import { ThemeSwitcher } from "@/components/DarkMode";
import { Toaster } from "@/components/shadcn/ui/sonner";
import GlobalMenu from "@/components/Profile/GlobalMenu";

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
    <div className="flex">
      <GlobalMenu/>
      <div className="flex-1 overflow-hidden">
        <Toaster />
        <div className="container mx-auto pb-20 px-0">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/3">{children}</div>

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
        </div>
      </div>
    </div>
  );
}
