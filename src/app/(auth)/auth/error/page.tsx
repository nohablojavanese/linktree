import React from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";

interface ErrorParams {
  error?: string;
  error_code?: string;
  error_description?: string;
}

export default function StatusPage({
  searchParams,
}: {
  searchParams: ErrorParams;
}) {
  if (!searchParams.error) {
    redirect("/");
  }

  const { error, error_code, error_description } = searchParams;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Error: {error}
        </h1>
        {error_code && (
          <p className="text-center text-gray-600 dark:text-gray-300 mb-2">
            Error Code: {error_code}
          </p>
        )}
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          {error_description?.replace(/\+/g, ' ')}
        </p>
        <div className="space-y-4">
          <Button
            as={Link}
            href="/login"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Return to Login
          </Button>
          <Button
            as={Link}
            href="/"
            variant="bordered"
            className="w-full text-blue-600 dark:text-blue-400"
          >
            Go to Home
          </Button>
        </div>
        <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
          If you continue to experience issues, please contact our support team.
        </p>
      </div>
    </div>
  );
}