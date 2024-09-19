"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <Button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600  top-0 left-0 bold"
    >
      Sign out
    </Button>
  );
}