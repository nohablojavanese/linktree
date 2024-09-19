import PCNav from './NavProps';
import MobileNav from './MobileNav';
import { Profile } from "@/lib/types/type";
import { fetchUserData } from '@/app/edit/appearance/page';

const ResponsiveNav: React.FC = async () => {
  const { profile } = await fetchUserData();

  if (!profile) {
    return null; // Or some fallback UI
  }

  return (
    <>
      <PCNav user={profile} />
      <MobileNav />
    </>
  );
};

export default ResponsiveNav;