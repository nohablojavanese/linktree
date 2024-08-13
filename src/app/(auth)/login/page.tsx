import React from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import AuthTabs from "./AuthTabs";
import { handleAuth } from "./action";

export default async function AuthPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/edit");
  }

  const onSubmit = async (action: "login" | "signup", formData: FormData) => {
    "use server";
    const headersList = headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    return handleAuth(action, formData, ip);
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <AuthTabs onSubmit={onSubmit} />
        </div>
      </div>
      <div className="relative flex-1 hidden w-0 lg:block">
        <Image
          className="absolute inset-0 object-cover w-full h-full"
          src="https://techcrunch.com/wp-content/uploads/2021/03/Linktree-8.png"
          alt="Background image"
          fill
          // layout="fill"
        />
      </div>
    </div>
  );
}
