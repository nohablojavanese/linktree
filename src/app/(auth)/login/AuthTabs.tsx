"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/shadcn/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { Label } from "@/components/shadcn/ui/label";
import { AlertCircle } from "lucide-react";
import { z } from "zod";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

// Zod schemas
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

interface AuthFormProps {
  formType: "login" | "signup";
  schema: z.ZodSchema;
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

function AuthForm({ formType, onSubmit, schema }: AuthFormProps) {
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string[];
  }>({});
  const [remainingAttempts, setRemainingAttempts] = useState(10);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate the changed field
    const result = schema.safeParse({ ...formData, [name]: value });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    const submitResult = await onSubmit(formType, formDataToSubmit);

    if (!submitResult.success && submitResult.errors) {
      setErrors(submitResult.errors);
      setRemainingAttempts(submitResult.remainingAttempts);
    } else {
      // Handle successful login/signup
      window.location.href = "/edit";
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
      <CardHeader>
        <CardTitle>{formType === "login" ? "Login" : "Sign Up"}</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {formType === "login"
            ? "Enter your credentials to login"
            : "Create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className={`bg-gray-50 dark:bg-gray-700 rounded-xl ${
                errors.email
                  ? "border-red-500 dark:border-red-500 border-1"
                  : "border-gray-200 dark:border-gray-600 border-1"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-gray-700 dark:text-gray-300"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              
              required
              value={formData.password}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoIosEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              // className="max-w-xs"
              onChange={handleInputChange}
              className={`bg-gray-50 dark:bg-gray-700 rounded-full ${
                errors.password
                  ? "border-red-500 dark:border-red-500 border-1"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.password[0]}
              </p>
            )}
          </div>
          {formType === "signup" && (
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                // type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <IoIosEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className={`bg-gray-50 dark:bg-gray-700 rounded-full ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword[0]}
                </p>
              )}
            </div>
          )}
          {errors.general && (
            <p className="text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.general[0]}
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {formType === "login" ? "Login" : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}
