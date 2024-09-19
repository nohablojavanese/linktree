import PCNavClient from "./PCNavClient";
import { Profile } from "@/lib/types/type";

interface PCNavProps {
  user: Profile;
}

export default function PCNav({ user }: PCNavProps) {
  return <PCNavClient user={user} />;
}