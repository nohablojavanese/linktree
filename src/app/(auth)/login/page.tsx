import React from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import AuthTabs from "./AuthTabs";
import GoogleSignInButton from "./Google";
import { handleAuth, handleGoogleSignIn } from "./action";

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
  const onGoogleSignIn = async () => {
    "use server";
    return handleGoogleSignIn();
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
    <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="w-full max-w-sm mx-auto lg:w-96">
          <div className="mb-6">
            <GoogleSignInButton onGoogleSignIn={onGoogleSignIn} />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-400 bg-white dark:bg-gray-900">Or continue with email</span>
            </div>
          </div>
        <div className="mt-6">
        <AuthTabs onSubmit={onSubmit} />  
        </div>
      </div>
    </div>
    <div className="relative flex-1 hidden w-0 lg:block">
      <Image
        className="absolute inset-0 object-cover w-full h-full"
        src="https://techcrunch.com/wp-content/uploads/2021/03/Linktree-8.png"
        alt="Background image"
        fill
      />
    </div>
  </div>
  );
}
