import ForgotPasswordForm from './request';
import { headers } from 'next/headers';
import { MdEmail } from "react-icons/md";
import Link from 'next/link';
import { MdArrowBack } from "react-icons/md";

export default async function ForgotPasswordPage() {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 ">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md max-w-md w-full relative">
        <Link href=".." className="absolute top-4 left-4 flex items-center text-blue-500 hover:text-blue-600 transition-colors">
          <MdArrowBack className="mr-1" />
          <span>Back</span>
        </Link>
          
        <div className="flex items-center justify-center mb-4">
          <MdEmail className="w-12 h-12 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Forgot Password?
        </h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6 text-pretty">
          Enter your email or username to receive password reset link
        </p>
        <ForgotPasswordForm ip={ip} />
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Make sure you have an active email to receive our email.
        </p>
      </div>
    </div>
  );
}