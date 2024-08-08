"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";


type Theme = "default" | "simple" | "elegant" | "minimal" | "colorful";

const themeStyles: Record<Theme, string> = {
  default:
    "bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 text-gray-800 dark:text-white",
  simple:
    "bg-gray-100 dark:bg-gray-700 bg-opacity-70 dark:bg-opacity-70 text-gray-700 dark:text-gray-200",
  elegant:
    "bg-gray-800 dark:bg-white bg-opacity-70 dark:bg-opacity-70 text-white dark:text-gray-800",
  minimal:
    "bg-gray-200 dark:bg-gray-600 bg-opacity-70 dark:bg-opacity-70 text-gray-600 dark:text-gray-300",
  colorful:
    "bg-gradient-to-r from-purple-400 to-pink-500 bg-opacity-70 text-white"
};

export type LinkItemProps = {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  description?: string;
  isVisible: boolean;
  theme: "default" | "simple" | "elegant" | "minimal" | "colorful";
};

export const LinkItem: React.FC<LinkItemProps> = ({
  title,
  url,
  imageUrl,
  theme
  // description,
}) => {
  const formattedUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

      const themeClass = themeStyles[theme];


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
        className={`w-full p-4 backdrop-filter backdrop-blur-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center ${themeClass}`}
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
