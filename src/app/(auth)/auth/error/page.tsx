import React from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Button } from "@nextui-org/react";

export default function AuthErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Authentication Error
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          We encountered an issue while trying to authenticate your account. This could be due to an expired or invalid authentication code.
        </p>
        <div className="space-y-4">
          <Button
            as={Link}
            href="/login"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Try Again
          </Button>
          <Button
            as={Link}
            href="/"
            variant="bordered"
            className="w-full text-blue-600 dark:text-blue-400"
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