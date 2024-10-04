import { fetchUserData } from '@/app/edit/appearance/page';
import UsernameClient from './UsernameClient';

const Username = async () => {
  const { profile, error } = await fetchUserData();
  
  if (error || !profile || !profile.username) {
    console.error("Error fetching user data:", error);
    return <div>No username found</div>; // Debugging fallback
  }

  const Url = `${process.env.NEXT_PUBLIC_SITE_URL}/${profile.username}`;

  return (
    <div className="mt-10">
      <UsernameClient Url={Url} />
    </div>
  );
};

export default Username;