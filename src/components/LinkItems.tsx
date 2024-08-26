"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ThemeTypes } from "@/lib/types/type";
import { FormatFont, FormatTheme, getThemeClass } from "@/lib/theme/basic";

export type LinkItemProps = {
  id: string;
  title: string;
  url: string;
  // description: string;
  imageUrl: string;
  isVisible: boolean;
  themes: ThemeTypes;
};
export const LinkItem: React.FC<LinkItemProps> = ({
  title,
  url,
  imageUrl,
  themes,
}) => {
  const formattedUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  const themeClass = getThemeClass(themes.theme, FormatTheme, "default");
  const fontClass = getThemeClass(themes.font_family, FormatFont, "sans");

  const linkStyle = {
    fontFamily: themes.font_family,
    theme: themes.theme,
    // color: themes.text_color,
    // backgroundColor: themes.background_color,
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="w-full mb-4 flex justify-center"
  >
    <motion.a
      href={formattedUrl}
      target="_blank"
      className={`w-full p-4 hover:shadow-lg transition-all duration-300 ${themeClass} ${fontClass}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col items-center justify-center">
        {imageUrl && (
          <div className="mb-2">
            <Image
              src={imageUrl}
              alt={title}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        )}
        <div className="text-center">
          <span className="text-sm md:text-lg font-semibold">{title}</span>
        </div>
      </div>
    </motion.a>
  </motion.div>
  );
};

export default LinkItem;
