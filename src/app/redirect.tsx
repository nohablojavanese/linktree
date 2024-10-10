"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/ui/card";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { ArrowRight, Home } from "lucide-react";
import { getGreeting } from "@/lib/helper/greeting";
import { Progress } from "@/components/shadcn/ui/progress";

interface AuthenticatedUserViewProps {
  setHomepagePreference: () => Promise<void>;
}

export default function AuthenticatedUserView({
  setHomepagePreference,
}: AuthenticatedUserViewProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState(5);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const countdownInterval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownInterval);
          router.push("/edit");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  const handleVisitHomepage = async () => {
    await setHomepagePreference();
    router.push("/");
  };

  const handleRedirectNow = () => {
    router.push("/edit");
  };

  if (!isClient) {
    return null; // or a simple loading indicator
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-[350px] bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {loading ? (
              <Skeleton className="h-8 w-[250px] mx-auto bg-gray-200 dark:bg-gray-700" />
            ) : (
              "Redirecting to Dashboard"
            )}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            {loading ? (
              <Skeleton className="h-12 w-[200px] mx-auto mt-2 bg-gray-200 dark:bg-gray-700" />
            ) : (
              <>
                {getGreeting({ language: "en" })}. Since you are already logged
                in, you will be automatically redirected to the dashboard.
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          {loading ? (
            <>
              <Skeleton className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-[200px] bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-2 w-[250px] bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 w-[200px] bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 w-[200px] bg-gray-200 dark:bg-gray-700" />
            </>
          ) : (
            <>
              <div className="rounded-full bg-blue-500 dark:bg-blue-600 p-4 text-white">
                <ArrowRight className="h-8 w-8" />
              </div>
              <div className="text-center text-gray-600 dark:text-gray-300">
                {remainingTime === 0
                  ? "Redirecting..."
                  : `Redirecting in ${remainingTime} seconds`}
              </div>
              <Progress
                value={(5 - remainingTime) * 20}
                className="w-[250px] border-2 border-gray-200 dark:border-blue-600"
                indicatorClassName="bg-blue-500 dark:bg-blue-600"
              />
              <Button
                variant="outline"
                onClick={handleRedirectNow}
                className="mt-4 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors duration-200"
              >
                <ArrowRight className="mr-2 h-4 w-4" /> Redirect Now
              </Button>
              <Button
                variant="default"
                onClick={handleVisitHomepage}
                className="rounded-full bg-blue-500 dark:bg-blue-600 text-white hover:bg-white hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-100 transition-colors duration-200"
              >
                <Home className="mr-2 h-4 w-4" /> Visit Homepage
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
