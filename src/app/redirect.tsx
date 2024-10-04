'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/shadcn/ui/card";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { ArrowRight, Home } from 'lucide-react';

interface AuthenticatedUserViewProps {
  setHomepagePreference: () => Promise<void>;
}

export default function AuthenticatedUserView({ setHomepagePreference }: AuthenticatedUserViewProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const redirectTimer = setTimeout(() => {
      router.push('/edit');
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  const handleVisitHomepage = async () => {
    await setHomepagePreference();
    router.push('/');
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
              "Redirecting to Dashboard..."
            )}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            {loading ? (
              <Skeleton className="h-4 w-[200px] mx-auto mt-2 bg-gray-200 dark:bg-gray-700" />
            ) : (
              "You will be automatically redirected to the dashboard in a moment."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          {loading ? (
            <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
          ) : (
            <div className="rounded-full bg-blue-500 dark:bg-blue-600 p-4 text-white">
              <ArrowRight className="h-8 w-8" />
            </div>
          )}
          <Button 
            variant="outline" 
            onClick={handleVisitHomepage}
            className="mt-4 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors duration-200"
            disabled={loading}
          >
            <Home className="mr-2 h-4 w-4" /> Visit Homepage
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}