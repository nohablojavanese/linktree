import React, { Suspense } from "react";
import { LinkItemProps } from "./LinkItems";
import LinkWrapper from "./LinkWrapper";
import { Skeleton } from "@nextui-org/react";

const Youtube: React.FC<LinkItemProps> = (props) => {
  const { title, url } = props;

  // Extract video ID from the URL
  const videoId = url.includes("youtu.be") 
    ? url.split("youtu.be/")[1].split("?")[0] // For short links
    : url.split("v=")[1].split("&")[0]; // For standard links

  const embedParams = [
    "controls=0",
    "rel=0",
    "loop=1",
    "start=0",
    "fs=0",
    "modestbranding=1",
    "iv_load_policy=3",
    "autohide=1",
    "playsinline=1",
    "playlist=" + videoId, // Required for looping
  ].join("&");

  return (
    <LinkWrapper {...props}>
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <Suspense
          fallback={
            <Skeleton className="rounded-xl w-full aspect-video">
              <div className="w-full h-full rounded-xl bg-default-300"></div>
            </Skeleton>
          }
        >
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?${embedParams}`}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Suspense>
      </div>
    </LinkWrapper>
  );
};

export default Youtube;
