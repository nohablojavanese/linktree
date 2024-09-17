import React from "react";
import { LinkItemProps } from "./LinkItems";
import LinkWrapper from "./LinkWrapper";

const SpotifyLink: React.FC<LinkItemProps> = (props) => {
  const { title, url } = props;

  // Extract Spotify URI from the URL
  const spotifyUri = url.replace("https://open.spotify.com/", "spotify:");

  return (
    <LinkWrapper {...props}>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <iframe
          src={`https://open.spotify.com/embed/${spotifyUri
            .split(":")
            .slice(1)
            .join("/")}`}
          width="100%"
          height="352"
          // allowTransparency={true}
          allow="encrypted-media"
          className="rounded-xl"
        ></iframe>
      </div>
    </LinkWrapper>
  );
};

export default SpotifyLink;
