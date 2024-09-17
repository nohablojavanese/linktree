import React, { Suspense } from "react";
import { LinkItemProps } from "./LinkItems";
import LinkWrapper from "./LinkWrapper";
import { Tweet, TweetNotFound, TweetSkeleton } from "react-tweet";

const TwitterEmbed: React.FC<LinkItemProps> = (props) => {
  const { title, url } = props;
  const tweetId = url.split("/").pop() || "";

  return (
    <LinkWrapper {...props}>
      <div className="flex flex-col w-full max-w-xl mx-auto">
        <h2 className="text-lg sm:text-base font-semibold mb-2">{title}</h2>
        <div className="text-left md:mx-auto block">
          <div className="w-full rounded-xl ">
            <Suspense fallback={<TweetSkeleton />}>
                <Tweet
                  id={tweetId}
                  fallback={<TweetNotFound />}
                />
            </Suspense>
          </div>
        </div>
      </div>
    </LinkWrapper>
  );
};

export default TwitterEmbed;
