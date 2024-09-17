import React from "react";
// import { motion } from "framer-motion";
import { LinkItemProps } from "./LinkItems";
import { getThemeClass, FormatTheme, FormatFont } from "@/lib/theme/basic";

interface LinkWrapperProps extends LinkItemProps {
  children: React.ReactNode;
}

const LinkWrapper: React.FC<LinkWrapperProps> = ({ themes, url, children }) => {
  const themeClass = getThemeClass(
    themes.theme || "modernMinimal", // Set modernMinimal as default
    FormatTheme,
    "modernMinimal"
  );
  const fontClass = getThemeClass(
    themes.font_family || "sans",
    FormatFont,
    "sans"
  );

  return (
    <div
      // whileHover={{ scale: 1.02 }}
      // whileTap={{ scale: 0.98 }}
      className="w-full mb-3"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full p-4 ${themeClass} ${fontClass} text-center transition-all duration-300`}
      >
        {children}
      </a>
    </div>
  );
};

export default LinkWrapper;
