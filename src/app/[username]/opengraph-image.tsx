import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/types/type";

export const runtime = "edge";

export const alt = "User Profile Card";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Reuse this function from your page.tsx to maintain consistency
async function fetchUserProfile(username: string) {
  const supabase = createClient();
  try {
    const { data: profile, error } = await supabase
      .rpc("clean_user_profile", { search_username: username })
      .single<Profile>();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
    return profile;
  } catch (error) {
    console.error("Unexpected error fetching user profile:", error);
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: { username: string };
}) {
  const profile = await fetchUserProfile(params.username);

  const fallbackImage = (message: string) =>
    new ImageResponse(
      (
        <div
          style={{
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
          }}
        >
          <h1 style={{ fontSize: 60, textAlign: "center" }}>{message}</h1>
        </div>
      ),
      { ...size }
    );

  if (!profile) {
    return fallbackImage("Profile Not Found");
  }

  try {
    const image = new ImageResponse(
      (
        <div
          style={{
            background: profile.hero_url 
              ? `url(${profile.hero_url})` 
              : 'white',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            color: profile.hero_url ? 'white' : 'black',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              borderRadius: "10px",
              ...(profile.hero_url
                ? { background: "rgba(0, 0, 0, 0.6)" }
                : {}),
            }}
          >
            {profile.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.image_url}
                alt={`${profile.username}'s profile picture`}
                width={200}
                height={200}
                style={{ borderRadius: "50%", marginBottom: "20px" }}
              />
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ 
                fontSize: 60, 
                margin: 0, 
                color: profile.hero_url ? 'white' : 'black' 
              }}>
                {profile.username || 'Unknown User'}
              </h1>
              {profile.verified && (
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#4CAF50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                  ✓
                </div>
              )}
            </div>
            {profile.bio && (
              <p style={{ 
                fontSize: 30, 
                margin: '10px 0', 
                color: profile.hero_url ? 'white' : 'black', 
                textAlign: 'center' 
              }}>
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      ),
      { ...size }
    );

    // Add caching headers only in production
    if (process.env.NODE_ENV === "production") {
      image.headers.set(
        "Cache-Control",
        "public, max-age=3600, must-revalidate"
      );
    } else {
      image.headers.set("Cache-Control", "no-store, max-age=0");
    }

    return image;
  } catch (error) {
    console.error("Error generating OG image:", error);
    return fallbackImage("Error Generating Image");
  }
}
