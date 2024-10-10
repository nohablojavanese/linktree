import Image from "next/image";
import LinkItem from "../App/LinkItems";
import { SocialLink } from "../SocialLinks";
import { UserProfile } from "../UserProfile";
import { UserPageProp } from "@/lib/types/type";

const UserPageReturn: React.FC<UserPageProp> = ({
  profile,
  links,
  socialLinks,
  themes,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-page background */}
      {!profile.background_url && <div className="fixed inset-0 bg-black" />}
      {profile.background_url && (
        <div className="fixed inset-0">
          <Image
            src={profile.background_url}
            alt="Background"
            fill
            sizes="(max-width: 768px) 100vw, 1920px"
            className="object-cover"
          />
        </div>
      )}
      {/* Content overlay */}
      <div
        className={`absolute inset-0 flex flex-col items-center ${
          profile.background_url ? "bg-black bg-opacity-60" : ""
        }`}
      >
        {/* Hero Image */}
        <div
          className={`w-full max-w-3xl ${
            profile.hero_url ? "h-60" : "h-20"
          } relative overflow-hidden md:rounded-b-3xl`}
        >
          {profile.hero_url && (
            <>
              <Image
                src={profile.hero_url}
                alt="Hero"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>
            </>
          )}
        </div>

        {/* Profile section */}
        <div
          className={`w-full max-w-3xl px-4 ${
            profile.hero_url ? "-mt-20" : "mt-4"
          }`}
        >
          <UserProfile
            username={profile.username}
            bio={profile.bio}
            created_at={profile.created_at}
            image_url={profile.image_url}
            verified={profile.verified}
            id={profile.id}
            random_id={profile.random_id}
            updated_at={profile.updated_at}
            redirect={false}
          />

          {/* Links section */}
          <div className="mt-8 space-y-4">
            {links?.map(
              (link) =>
                link.isVisible && (
                  <LinkItem
                    key={link.id}
                    id={link.id}
                    title={link.title}
                    url={link.url}
                    imageUrl={link.imageUrl}
                    isVisible={link.isVisible}
                    app={link.app}
                    themes={themes}
                  />
                )
            )}
          </div>

          {/* Social links */}
          <div className="mt-8 flex justify-center space-x-4 pb-8">
            {socialLinks?.map((socialLink) => (
              <SocialLink key={socialLink.id} {...socialLink} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPageReturn;
