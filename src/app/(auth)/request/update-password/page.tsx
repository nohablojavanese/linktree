import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";
import { MdEmail } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { code: string; error?: string; error_description?: string };
}) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/edit");
  }

  const isError = !!searchParams.error;
  const errorMessage = searchParams.error_description
    ? decodeURIComponent(searchParams.error_description).replace(/\+/g, " ")
    : "An error occurred while resetting your password.";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          {isError ? (
            <BiErrorCircle className="w-12 h-12 text-red-500" />
          ) : (
            <MdEmail className="w-12 h-12 text-blue-500" />
          )}
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          {isError ? "Password Reset Error" : "Create a New Password"}
        </h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6 text-balance">
          {isError
            ? errorMessage
            : "Enter your new password to reset your account"}
        </p>
        <div className="w-full px-8 sm:max-w-md mx-auto mt-4">
          <ResetPasswordForm code={searchParams.code} isError={isError} />
        </div>
        {!isError && (
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
            Make sure you have an active email to receive our email.
          </p>
        )}
      </div>
    </div>
  );
}
