import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Dashboard } from "@/components/Profile/menu";
import UserPagePreview from "@/components/EditPreview/PagePreview";
import MobileMockup from "@/components/EditPreview/Mobile";
import PreviewOverlay from "@/components/EditPreview/PreviewOverlay";
import { createClient } from "@/lib/supabase/server";
import { ThemeSwitcher } from "@/components/DarkMode";
import { Toaster } from "@/components/shadcn/ui/sonner";

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
    <Dashboard>
      <Toaster />
      <div className="container mx-auto px-0">
        <div className="flex flex-col lg:flex-row">
          <ThemeSwitcher />
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
    </Dashboard>
  );
}
