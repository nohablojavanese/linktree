"use client";
import React, { useState, useCallback } from "react";
import { Card, CardBody, Tooltip, Spinner, Button } from "@nextui-org/react";
import Image from "next/image";
import { updateTheme } from "@/app/edit/appearance/actions";
import { z } from "zod";
import { FormatTheme, ThemeKey } from "@/lib/theme/basic";

const ThemeModel = z.enum(
  Object.keys(FormatTheme) as [ThemeKey, ...ThemeKey[]]
);

export type UpdateThemeProps = {
  currentTheme: ThemeKey;
};

const ThemeImage: React.FC<{
  theme: ThemeKey;
  alt: string;
  themeClass: string;
  isSelected: boolean;
  isUpdating: boolean;
  onClick: () => void;
}> = ({ theme, alt, themeClass, isSelected, isUpdating, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-40 h-60 sm:w-48 sm:h-72 md:w-48 md:h-64">
      {!imageError ? (
        <Image
          src={`/theme/${theme}.png`}
          alt={alt}
          className={`cursor-pointer object-cover w-full h-full
            ${isSelected ? "border-2 border-blue-500" : ""}
            ${isUpdating ? "opacity-50 filter blur-sm" : ""}`}
          onClick={onClick}
          onError={() => setImageError(true)}
          fill
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center ${themeClass} 
            cursor-pointer text-lg font-bold
            ${isSelected ? "border-2 border-blue-500" : ""}
            ${isUpdating ? "opacity-50 filter blur-sm" : ""}`}
          onClick={onClick}
        >
          {alt}
        </div>
      )}
    </div>
  );
};

export const UpdateTheme: React.FC<UpdateThemeProps> = ({ currentTheme }) => {
  const [themeError, setThemeError] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>(currentTheme);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleThemeClick = useCallback(
    async (theme: ThemeKey) => {
      try {
        ThemeModel.parse(theme);
        setSelectedTheme(theme);
        setIsUpdating(true);

        const formData = new FormData();
        formData.append("theme", theme);
        await updateTheme(formData);
        
        // Add a 2-second delay after successful update
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setThemeError("Invalid theme selected");
        } else if (error instanceof Error) {
          setThemeError(error.message);
        }
        setSelectedTheme(currentTheme);
      } finally {
        setIsUpdating(false);
      }
    },
    [currentTheme]
  );

  return (
    <Card className="w-full h-full dark:bg-gray-800 relative">
      {isUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-center">
            <Spinner size="lg" color="white" />
            <p className="text-white mt-2">Previewing Theme...</p>
          </div>
        </div>
      )}

      <CardBody>
        <div className="mb-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(FormatTheme).map(
                ([theme, { class: themeClass, alt }]) => (
                  <div key={theme} className="m-2 text-center cursor-pointer">
                    <Tooltip
                      content={
                        <Button className={`${themeClass} !m-0`} size="sm">
                          {alt}
                        </Button>
                      }
                      className="hidden md:block bg-transparent"
                      placement="top"
                    >
                      <div>
                        {" "}
                        {/* Wrapper div to make Tooltip work */}
                        <ThemeImage
                          theme={theme as ThemeKey}
                          alt={alt}
                          themeClass={themeClass}
                          isSelected={selectedTheme === theme}
                          isUpdating={isUpdating}
                          onClick={() =>
                            !isUpdating && handleThemeClick(theme as ThemeKey)
                          }
                        />
                      </div>
                    </Tooltip>
                    <div className="flex justify-center">
                      <Button
                        className={`mt-2 text-xs block md:hidden ${themeClass} ${
                          selectedTheme === theme ? "ring-2 ring-blue-500" : ""
                        }`}
                        size="sm"
                        onClick={() =>
                          !isUpdating && handleThemeClick(theme as ThemeKey)
                        }
                      >
                        {alt}
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          {themeError && <p className="text-red-500">{themeError}</p>}
        </div>
      </CardBody>
    </Card>
  );
};

// <div className="mb-4">
//   <label className="block text-gray-400 mb-2">Font Family</label>
//   <div className="flex flex-wrap justify-center">
//     {Object.keys(FormatFont).map((font) => (
//       <div key={font} className="m-2 text-center">
//         <Tooltip content={font} placement="top">
//           <Image
//             // src={`/path/to/font/images/${font}.png`}
//             src="/image.png"
//             alt={font}
//             className={`cursor-pointer w-full h-auto max-w-xs ${selectedFontFamily === font ? 'border-2 border-blue-500' : ''}`}
//             onClick={() => handleFontClick(font as FontKey)}
//           />
//         </Tooltip>
//         {/* <p className="mt-2 text-sm text-gray-400">{font}</p> */}
//       </div>
//     ))}
//   </div>
//   {fontFamilyError && <p className="text-red-500">{fontFamilyError}</p>}
// </div>
