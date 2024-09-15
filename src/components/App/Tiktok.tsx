import React from "react";
import { LinkItemProps } from "./LinkItems";
import LinkWrapper from "./LinkWrapper";

const TikTok: React.FC<LinkItemProps> = (props) => {
  const { title, url } = props;

  // Extract video ID from the URL
  const videoId = url.split("/video/")[1];

  return (
    <LinkWrapper {...props}>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          width="100%"
          height="600"
          allowFullScreen
        ></iframe>
      </div>
    </LinkWrapper>
  );
};

export default TikTok;
