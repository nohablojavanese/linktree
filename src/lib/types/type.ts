export interface Profile {
    id: string;
    username: string;
    random_id: string;
    created_at: string;
    image_url?: string;
    verified?: boolean;
    theme: "default" | "simple" | "elegant" | "minimal" | "colorful";
  }
  
  export  interface Link {
    id: string;
    title: string;
    url: string;
    imageUrl: string;
    isVisible: boolean;
  }
  
  export  interface SocialLinkType {
    id: string;
    platform: string;
    url: string;
  }
  
  export  interface UserPageProp {
    profile: Profile;
    links: Link[];
    socialLinks: SocialLinkType[];
  }