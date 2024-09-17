// "use client";
import { ThemeTypes } from "@/lib/types/type";
import DefaultLink from "./DefaultLink";
import SpotifyLink from "./SpotifyLink";
import HeadlineLink from "./HeadlineLink";
import Youtube from "./Youtube";
import TikTok from "./Tiktok";
import TwitterEmbed from "./X";
import InstagramEmbed from "./Instagram";
export type LinkItemProps = {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  isVisible: boolean;
  themes: ThemeTypes;
  app: string | null;
};

const LinkItem: React.FC<LinkItemProps> = (props) => {
  const { app } = props;

  switch (app) {
    case "Spotify":
      return <SpotifyLink {...props} />;
    case "Instagram":
      return <InstagramEmbed {...props} />;
    case "Youtube":
      return <Youtube {...props} />;
    case "TikTok":
      return <TikTok {...props} />;
    case "Twitter":
      return <TwitterEmbed {...props} />;
    case "header":
      return <HeadlineLink {...props} />;
    default:
      return <DefaultLink {...props} />;
  }
};

export default LinkItem;
