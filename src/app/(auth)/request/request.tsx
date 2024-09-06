"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { requestPasswordReset } from "./actions";
import { validateEmail } from "@/lib/utils"; // Assume this function exists in utils

export default function ForgotPasswordForm({ ip }: { ip: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(10);
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          variant="flat"
          // value={}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className="mb-4 text-center text-gray-600 dark:text-gray-300"
          required
          isClearable
          isDisabled={isLoading  || isDisabled }
          errorMessage={!isValidEmail && email ? "Please enter a valid email" : ""}
        />
        <Button
          type="submit"
          variant="bordered"
          className="w-full hover:bg-blue-600 hover:text-blue-50 text-blue-600 dark:text-blue-400 relative overflow-hidden group"
          isDisabled={isLoading || !isValidEmail || isDisabled} 
        >
          <span className="relative z-10">
            {isLoading ? "Sending..." : "Reset Password"}
          </span>
          <div className="absolute inset-0 h-full w-full transform -translate-x-full bg-blue-600 group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
        </Button>
      </form>
      <div className=" py-6 flex flex-col justify-center items-center">
        {message && (
          <p
            className={`text-center text-xs ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
        {remainingAttempts > 0 && remainingAttempts < 3 && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            You have {remainingAttempts} remaining attempts left!
          </p>
        )}
        {remainingAttempts === 0 && (
          <p className="text-xs text-red-500 dark:text-red-400">
            No attempts left. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}
