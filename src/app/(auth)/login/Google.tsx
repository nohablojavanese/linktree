'use client'
import React from 'react';
import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";

interface GoogleSignInButtonProps {
  onGoogleSignIn: () => Promise<{
    success: boolean;
    url?: string;
    errors?: { general: string[] };
  }>;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onGoogleSignIn }) => {
  const handleClick = async () => {
    const result = await onGoogleSignIn();
    if (result.success && result.url) {
      window.location.href = result.url;
    } else if (result.errors) {
      // Handle errors, e.g., show an error message to the user
      console.error(result.errors.general[0]);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full bg-white text-gray-700 border font-semibold border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
      startContent={<FcGoogle className="w-5 h-5" />}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;