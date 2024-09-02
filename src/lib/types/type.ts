export interface Profile {
  id: string;
  username: string;
  bio?: string;
  random_id: string;
  created_at: string;
  image_url?: string;
  hero_url?: string;
  verified?: boolean;
  background_url?: string;
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
