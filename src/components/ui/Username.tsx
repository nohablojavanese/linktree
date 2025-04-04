import { fetchUserData } from "@/app/edit/appearance/page";
import UsernameClient from "./UsernameClient";
import ShareDialog from "./ShareDialog";

const Username = async () => {
  const { profile, error } = await fetchUserData();

  if (error || !profile || !profile.username) {
    console.error("Error fetching user data:", error);
    return <div>No username found</div>;
  }

  const Url = `${process.env.NEXT_PUBLIC_SITE_URL}/${profile.username}`;

  return (
    <div className="my-6">
      {/* <UsernameClient Url={Url} /> */}
      <ShareDialog Url={Url} />
    </div>
  );
};

export default Username;
