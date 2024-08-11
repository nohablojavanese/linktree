export interface Profile {
  id: string;
  username: string;
  random_id: string;
  created_at: string;
  image_url?: string;
  verified?: boolean;
  theme: "default" | "simple" | "elegant" | "minimal" | "colorful";
}

export interface LinkType {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  isVisible: boolean;
  order: number;
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
