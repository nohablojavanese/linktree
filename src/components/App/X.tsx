import React, { Suspense } from "react";
import { LinkItemProps } from "./LinkItems";
import LinkWrapper from "./LinkWrapper";
import dynamic from 'next/dynamic';

const Tweet = dynamic(() => import('react-tweet').then((mod) => mod.Tweet), { ssr: false });
const TweetSkeleton = dynamic(() => import('react-tweet').then((mod) => mod.TweetSkeleton), { ssr: false });
const TweetNotFound = dynamic(() => import('react-tweet').then((mod) => mod.TweetNotFound), { ssr: false });

const TwitterEmbed: React.FC<LinkItemProps> = (props) => {
  const { title, url } = props;

  // Extract tweet ID from the URL
  const getTweetId = (url: string): string | null => {
    const match = url.match(/\/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const tweetId = getTweetId(url);

  if (!tweetId) {
    return null;
  }

  return (
    <LinkWrapper {...props}>
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <Suspense fallback={<TweetSkeleton />}>
          <Tweet id={tweetId} fallback={<TweetNotFound />} />
        </Suspense>
      </div>
    </LinkWrapper>
  );
};

export default TwitterEmbed;