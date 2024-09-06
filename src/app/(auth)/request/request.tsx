"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { requestPasswordReset } from "./actions";
import React from "react";

export default function ForgotPasswordForm({ ip }: { ip: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(10);
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    const result = await requestPasswordReset(email, ip);
    setMessage(result.message);
    setIsError(!result.success);
    setRemainingAttempts(result.remainingAttempts);
    setIsLoading(false);

    if (result.success) {
      setEmail("");
      setIsDisabled(true);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="mb-4 text-center text-gray-600 dark:text-gray-300"
          required
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="bordered"
          className="w-full hover:bg-blue-600 hover:text-blue-50 text-blue-600 dark:text-blue-400"
          disabled={isLoading}
          isDisabled={isDisabled}
        >
          {isLoading ? "Sending..." : "Reset Password"}
        </Button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            isError ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
      {remainingAttempts > 0 && remainingAttempts < 3 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You have {remainingAttempts} remaining attempts left!
        </p>
      )}
      {remainingAttempts === 0 && (
        <p className="text-sm text-red-500 dark:text-red-400">
          No attempts left. Please try again later.
        </p>
      )}
    </div>
  );
}