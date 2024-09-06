import ForgotPasswordForm from './request';
import { headers } from 'next/headers';
import { MdEmail } from "react-icons/md";

export default function ForgotPasswordPage() {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <MdEmail className="w-12 h-12 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Forgot Password?
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Enter Email or Username to Continue your Password Reset
        </p>
        <ForgotPasswordForm ip={ip} />
        <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
          Make sure you have an active email to receive our email.
        </p>
      </div>
    </div>
  );
}