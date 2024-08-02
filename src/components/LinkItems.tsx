'use client'
import React from 'react';
import { Card, CardBody, CardFooter, Link } from "@nextui-org/react";

export type LinkItemProps = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export const LinkItem: React.FC<LinkItemProps> = ({ title, url, description }) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-md">
      <CardBody>
        <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
      </CardBody>
      <CardFooter>
        <Link href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 dark:text-blue-400 hover:underline">
          {url}
        </Link>
      </CardFooter>
    </Card>
  );
};