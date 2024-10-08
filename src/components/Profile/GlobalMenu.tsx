import PCNav from "./NavProps";
import MobileNav from "./MobileNav";
import { fetchUserData } from "@/app/edit/appearance/page";

const ResponsiveNav: React.FC = async () => {
  const { profile } = await fetchUserData();

  if (!profile) {
    return null; // Or some fallback UI
  }

  return (
    <div className="z-40">
      <PCNav user={profile} />
      <MobileNav />
    </div>
  );
};

export default ResponsiveNav;
