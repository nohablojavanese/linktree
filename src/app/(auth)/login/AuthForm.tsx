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
import { AlertCircle, Key } from "lucide-react";
import { z } from "zod";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";
import { MdEmail, MdPassword } from "react-icons/md";

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
    redirectUrl?: string;
  }>;
}

export default function AuthForm({
  formType,
  onSubmit,
  schema,
}: AuthFormProps) {
  const router = useRouter();
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
    // confirmPassword: "",
  });
  const [isVisible, setIsVisible] = useState(false);
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
    return schema.safeParse(formData).success;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const formDataToSubmit = new FormData(e.currentTarget);

    try {
      const result = await onSubmit(formType, formDataToSubmit);

      if (!result.success) {
        setErrors(result.errors || {});
        setRemainingAttempts(result.remainingAttempts);
      } else if (result.redirectUrl) {
        // Use window.location for a full page reload
        window.location.href = result.redirectUrl;
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
              isDisabled={remainingAttempts === 0}
              className={`bg-gray-50 dark:bg-gray-700 rounded-xl ${
                errors.email
                  ? "border-red-500 dark:border-red-500 border-1"
                  : "border-gray-200 dark:border-gray-600 border-1"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center">
                <MdEmail className="w-4 h-4 mr-1" />
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
              isDisabled={remainingAttempts === 0}
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
                <Key className="w-4 h-4 mr-1" />
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
                className={`bg-gray-50 dark:bg-gray-700 rounded-xl ${
                  errors.confirmPassword
                    ? "border-red-500 dark:border-red-500 border-1"
                    : "border-gray-200 dark:border-gray-600 border-1"
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
          {errors.general && remainingAttempts !== 0 && (
            <div className="flex items-center justify-center text-center text-red-500">
              <AlertCircle className="w-4 h-4 mr-1 text-center justify-center items-center" />
              <p className="text-sm ">{errors.general[0]}</p>
            </div>
          )}
          <Button
            type="submit"
            className={`w-full ${
              isFormValid() && remainingAttempts > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            isDisabled={!isFormValid() || remainingAttempts === 0}
            isLoading={isLoading}
          >
            {formType === "login" ? "Login" : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center justify-center ">
        {remainingAttempts > 0 && remainingAttempts < 3 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You have {remainingAttempts} remaining attempts left!
          </p>
        )}
        {remainingAttempts === 0 && (
          <p className="text-sm text-red-500 dark:text-red-400">
            You have no remaining attempts left. Please try again later.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
