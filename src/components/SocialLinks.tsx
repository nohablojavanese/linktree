"use client";
import React from "react";
import { Card, CardBody, Link } from "@nextui-org/react";

export type SocialLinkProps = {
  id: string;
  platform: string;
  url: string;
};

export const SocialLink: React.FC<SocialLinkProps> = ({ platform, url }) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-md">
      <CardBody className="flex flex-row justify-between items-center">
        <span className="font-semibold dark:text-white">{platform}</span>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
        >
          {url}
        </Link>
      </CardBody>
    </Card>
  );
};
