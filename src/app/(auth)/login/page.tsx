import React from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import AuthTabs from "./AuthTabs";
import GoogleSignInButton from "./Google";
import { handleAuth, handleGoogleSignIn } from "./action";
import { getGreeting } from "@/lib/helper/greeting";
export default async function AuthPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
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
      <div className="flex flex-col justify-start flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 ">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {getGreeting({ language: 'en', useEmoji: true })}
        </h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Welcome to Wisp Account Portal
        </h2>
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <div className="flex flex-col h-full">
            <div className="flex-shrink-0">
              <div className="mb-6">
                <GoogleSignInButton onGoogleSignIn={onGoogleSignIn} />
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-400 bg-white dark:bg-gray-900">
                    Or continue with email
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-grow mt-6 overflow-y-auto">
              <AuthTabs onSubmit={onSubmit} />
            </div>
            <div className="mt-3 flex items-center justify-center ">
              <a className="text-gray-500 text-sm" href="/request">
                Forgot Password?
              </a>
            </div>
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
