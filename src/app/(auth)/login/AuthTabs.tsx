"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import AuthForm from "./AuthForm";
import { z } from "zod";

const emailSchema = z.string().email("Invalid email format");
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const signupSchema = loginSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface AuthTabsProps {
  onSubmit: (
    action: "login" | "signup",
    formData: FormData
  ) => Promise<{
    success: boolean;
    errors?: {
      email?: string[];
      password?: string[];
      confirmPassword?: string[];
      general?: string[];
    };
    remainingAttempts: number;
  }>;
}

export default function AuthTabs({ onSubmit }: AuthTabsProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <Tabs
      defaultValue="login"
      className="w-full"
      onValueChange={(value) => setActiveTab(value as "login" | "signup")}
    >
      <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 rounded-full">
        <TabsTrigger
          value="login"
          className="data-[state=active]:text-gray-800 text-gray-400 dark:text-white data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          className="data-[state=active]:text-gray-800 text-gray-400 dark:text-white data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700"
        >
          Sign Up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <AuthForm formType="login" onSubmit={onSubmit} schema={loginSchema} />
      </TabsContent>
      <TabsContent value="signup">
        <AuthForm formType="signup" onSubmit={onSubmit} schema={signupSchema} />
      </TabsContent>
    </Tabs>
  );
}
