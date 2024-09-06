"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from './action';
import { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { z } from "zod";

const passwordSchema = z.string().min(8, "Password must be at least 8 characters long");

export default function ResetPasswordForm({ code, isError }: { code: string | null; isError: boolean }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const validatePassword = (password: string) => {
    try {
      passwordSchema.parse(password);
      setPasswordError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordError(error.errors[0].message);
      }
      return false;
    }
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !validatePassword(password) ||
      !validateConfirmPassword(confirmPassword)
    )
      return;

    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    const result = await resetPassword(formData, code);

    if (result?.error) {
      setMessage(result.error);
    } else {
      router.push(
        "/login?message=Your Password has been reset successfully. Sign in."
      );
    }

    setIsLoading(false);
  };

  if (isError) {
    return (
      <div className="text-center">
        <Button
          as={Link}
          href="/request"
          variant="bordered"
          className="w-full hover:bg-red-600 hover:text-red-50 text-red-600 dark:text-red-400"
        >
          Request Another Code
        </Button>
      </div>
    );
  }

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
      onSubmit={handleSubmit}
    >
      <Input
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validatePassword(e.target.value);
        }}
        placeholder="••••••••"
        className="mb-4"
        required
        errorMessage={passwordError}
        isInvalid={!!passwordError}
      />
      <Input
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          validateConfirmPassword(e.target.value);
        }}
        placeholder="••••••••"
        className="mb-4"
        required
        errorMessage={confirmPasswordError}
        isInvalid={!!confirmPasswordError}
      />
      <Button
        type="submit"
        variant="bordered"
        className="w-full hover:bg-blue-600 hover:text-blue-50 text-blue-600 dark:text-blue-400"
        disabled={isLoading}
      >
        {isLoading ? "Resetting..." : "Reset"}
      </Button>

      <div className=" py-8 flex flex-col justify-center items-center">
        {message && (
          <p
            className={`text-center text-xs ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
