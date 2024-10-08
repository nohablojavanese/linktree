import React from "react";
import { Card, CardContent } from "./shadcn/ui/card";
import { Input } from "./shadcn/ui/input";
import { Button } from "./shadcn/ui/button";
import { AppleIcon } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  message?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  message = "Exciting analytics features are on the way! Soon you'll be able to gain valuable insights into your link performance and audience engagement.",
}) => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <CardContent className="text-center space-y-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 text-transparent bg-clip-text">
            {title}
          </h1>
          <p className="text-xl text-gray-600">{message}</p>
        </CardContent>
      </main>

      <footer className="p-4 flex justify-between text-sm text-gray-500">
        <div>Privacy Policy</div>
        <div>Facebook / Instagram / LinkedIn</div>
      </footer>
    </div>
  );
};

export default ComingSoon;
