"use client";

import React, { Suspense, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import AuthForm from "./AuthForm";
import { z } from "zod";
import { KeyRoundIcon } from "lucide-react";
import { BiIdCard } from "react-icons/bi";

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
    <Suspense fallback={<p>Loading...</p>}>
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as "login" | "signup")}
        aria-label="Authentication options"
        variant="light"
        fullWidth
        classNames={{
          tabList: "w-full relative rounded-xl p-0 border-2 ",
          cursor: "w-full bg-blue-600",
          tabContent: "group-data-[selected=true]:text-white",
        }}
      >
        <Tab
          key="login"
          title={
            <div className="flex items-center space-x-2">
              <KeyRoundIcon size={14} />
              <span>Login</span>
            </div>
          }
        >
          <AuthForm formType="login" onSubmit={onSubmit} schema={loginSchema} />
        </Tab>
        <Tab
          key="signup"
          title={
            <div className="flex items-center space-x-2">
              <BiIdCard size={14} />
              <span>Sign Up</span>
            </div>
          }
        >
          <AuthForm
            formType="signup"
            onSubmit={onSubmit}
            schema={signupSchema}
          />
        </Tab>
      </Tabs>
    </Suspense>
  );
}
