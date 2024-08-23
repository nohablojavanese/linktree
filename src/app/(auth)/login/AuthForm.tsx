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
import { Label } from "@/components/shadcn/ui/label";
import { AlertCircle } from "lucide-react";
import { z } from "zod";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

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

export default function AuthForm({ formType, onSubmit, schema }: AuthFormProps) {
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
  });
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const result = schema.safeParse({ ...formData, [name]: value });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const isFormValid = () => {
    return (
      schema.safeParse(formData).success &&
      Object.values(formData).every((value) => value !== "")
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    try {
      const submitResult = await onSubmit(formType, formDataToSubmit);

      if (!submitResult.success && submitResult.errors) {
        setErrors(submitResult.errors);
        setRemainingAttempts(submitResult.remainingAttempts);
      } else {
        window.location.href = "/edit";
      }
    } catch (error) {
      setErrors({
        general: ["An unexpected error occurred. Please try again."],
      });
    } finally {
      setIsLoading(false);
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
              onChange={handleInputChange}
              className={`bg-gray-50 dark:bg-gray-700 rounded-xl ${
                errors.password
                  ? "border-red-500 dark:border-red-500 border-1"
                  : "border-gray-200 dark:border-gray-600 border-1"
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
                required
                onChange={handleInputChange}
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
            className={`w-full ${
              isFormValid()
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            isDisabled={!isFormValid()}
            isLoading={isLoading}
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
