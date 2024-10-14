export interface Profile {
  id: string;
  username: string;
  random_id: string;
  created_at: string;
  updated_at: string;
  image_url?: string | null;
  verified: boolean;
  background_url?: string | null;
  hero_url?: string | null;
  bio?: string | null;
  email?: string | null;
  redirect: boolean;
  url?: string | null;
}

export interface LinkType {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  isVisible: boolean;
  order: number;
  app: string
}

export interface SocialLinkType {
  id: string;
  platform: string;
  url: string;
}

export interface ThemeTypes {
  id: string;
  user_id: string;
  theme: string;
  font_family: string;
  background_color: string;
  text_color: string;
}

export interface UserPageProp {
  profile: Profile;
  links: LinkType[];
  socialLinks: SocialLinkType[];
  themes: ThemeTypes;
}

export const AppInputConfig = {
  Link: ['title', 'url', 'description'],
  Instagram: ['title', 'url', 'description'],
  Tiktok: ['title', 'url', 'description'],
  Header: ['title'],
  Spotify: ['title', 'url'],
  Twitter: ['title', 'url'],
  Youtube: ['title', 'url', 'description'],
  // Add more app types as needed
};

export type AppInputType = keyof typeof AppInputConfig;

export function defaultApp(app: FormDataEntryValue | null): AppInputType {
  if (typeof app === 'string' && app in AppInputConfig) {
    return app as AppInputType;
  }
  return 'Link'; // Default to 'Link' if app is null, empty, or invalid
}