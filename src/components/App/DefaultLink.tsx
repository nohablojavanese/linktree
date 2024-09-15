import React from "react";
import Image from "next/image";
import { LinkItemProps } from "./LinkItems";
import LinkWrapper from "./LinkWrapper"; 

const DefaultLink: React.FC<LinkItemProps> = (props) => {
  const { title, imageUrl } = props;

  return (
    <LinkWrapper {...props}>
      <div className="flex items-center justify-center">
        {imageUrl && (
          <div className="flex-shrink-0 mr-3">
            <Image
              src={imageUrl}
              alt={title}
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
        )}
        <div className="font-semibold">{title}</div>
      </div>
    </LinkWrapper>
  );
};

export default DefaultLink;
