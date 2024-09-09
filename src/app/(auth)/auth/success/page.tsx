import React from "react";
import Link from "next/link";
import { AlertCircle, CheckCheckIcon, Clock } from "lucide-react";
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";
import Countdown from "./Countdown";

interface SuccessParams {
  status: "success" | "pending";
  message: string;
  email: string;
  redirectUrl?: string;
}

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: SuccessParams;
}) {
  if (!searchParams.status) {
    redirect("/login");
  }
  const { status, message, email, redirectUrl } = searchParams;

  const isPending = status === "pending";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md w-full">
        <div className="flex items-center justify-center mb-2">
          {isPending ? (
            <Clock className="w-12 h-12 text-yellow-500" />
          ) : (
            <CheckCheckIcon className="w-12 h-12 text-blue-500" />
          )}
        </div>
        <h1 className={`text-2xl font-bold text-center ${isPending ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-900 dark:text-white'} mb-2`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          {message}
        </p>
        {isPending && <Countdown initialSeconds={60} />}
        <div className="space-y-4">
          <Button
            as={Link}
            href="/login"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white" // isPending
          >
            {isPending ? "Resend OTP" : "Continue"}
          </Button>
          <Button
            as={Link}
            href="/"
            variant="bordered"
            className="w-full hover:text-blue-600 text-gray-600 dark:text-gray-400"
          >
            Return to Home
          </Button>
        </div>
        <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
          If you continue to experience issues, please contact our support team.
        </p>
      </div>
    </div>
  );
}
