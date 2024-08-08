"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export type LinkItemProps = {
  id: string;
  title: string;
  url: string;
  imageUrl?: string;
  description?: string;
};

export const LinkItem: React.FC<LinkItemProps> = ({
  title,
  url,
  imageUrl,
  description,
}) => {
  const formattedUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="w-full mb-4"
    >
      <motion.a
        href={formattedUrl}
        target="_blank"
        // rel="noopener noreferrer"
        className="w-full p-4 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {imageUrl && (
          <div className="mr-4 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={title}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        )}
        <span className="text-sm md:text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </span>
      </motion.a>
    </motion.div>
  );
};

export default LinkItem;
