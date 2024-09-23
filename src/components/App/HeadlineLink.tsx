import React from "react";
import { LinkItemProps } from "./LinkItems";
import LinkWrapper from "./LinkWrapper";

const HeadlineLink: React.FC<LinkItemProps> = (props) => {
  const { title } = props;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg font-semibold mt-4 mb-4">{title}</h1>
    </div>
  );
};

export default HeadlineLink;
