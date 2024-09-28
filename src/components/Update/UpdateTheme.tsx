"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Tooltip,
  Spinner,
  Button,
} from "@nextui-org/react";
import { updateTheme } from "@/app/edit/appearance/actions";
import { z } from "zod";
import { FormatTheme, FormatFont, ThemeKey, FontKey } from "@/lib/theme/basic";

const ThemeModel = z.enum(
  Object.keys(FormatTheme) as [ThemeKey, ...ThemeKey[]]
);
const FontModel = z.enum(Object.keys(FormatFont) as [FontKey, ...FontKey[]]);

export type UpdateThemeProps = {
  currentTheme: ThemeKey;
  currentFontFamily: FontKey;
};

export const UpdateTheme: React.FC<UpdateThemeProps> = ({
  currentTheme,
  currentFontFamily,
}) => {
  const [themeError, setThemeError] = useState("");
  const [fontFamilyError, setFontFamilyError] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>(currentTheme);
  const [selectedFontFamily, setSelectedFontFamily] =
    useState<FontKey>(currentFontFamily);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleThemeClick = async (theme: ThemeKey) => {
    try {
      // Validate the theme
      ThemeModel.parse(theme);
      setSelectedTheme(theme);
      setIsUpdating(true);
      // Artificial delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const formData = new FormData();
      formData.append("theme", theme);
      FontModel.parse(selectedFontFamily);
      formData.append("font_family", selectedFontFamily);
      await updateTheme(formData);
      // Optionally, add a success message here
    } catch (error) {
      if (error instanceof z.ZodError) {
        setThemeError("Invalid theme or font family selected");
      } else if (error instanceof Error) {
        setThemeError(error.message);
      }
      // Optionally, revert the selection if the update fails
      setSelectedTheme(currentTheme);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="w-full h-full dark:bg-gray-800 relative">
      {isUpdating && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <Spinner size="lg" color="white" />
        </div>
      )}
      <CardBody>
        <div className="mb-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.keys(FormatTheme).map((theme) => (
                <div key={theme} className="m-2 text-center cursor-pointer">
                  <Tooltip
                    content={
                      <Button 
                        className={`${FormatTheme[theme as ThemeKey]} !m-0`}
                        size="sm"
                      >
                        {theme}
                      </Button>
                    }
                    placement="top"
                    classNames={{
                      base: "before:bg-transparent shadow-none",
                      content: "py-0 px-0 bg-transparent",
                    }}
                  >
                    <Image
                      // src={`/path/to/theme/images/${theme}.png`}
                      src={`/theme/${theme}.png`}
                      alt={theme}
                      className={`cursor-pointer object-cover w-40 h-60 sm:w-48 sm:h-72 md:w-48 md:h-64 
                        ${
                          selectedTheme === theme
                            ? "border-2 border-blue-500"
                            : ""
                        }
                        ${isUpdating ? "opacity-50 filter blur-sm" : ""}`}
                      onClick={() => !isUpdating && handleThemeClick(theme as ThemeKey)}
                    />
                  </Tooltip>
                  <Button
                    className={`mt-2 text-xs block md:hidden ${FormatTheme[theme as ThemeKey]} ${
                      selectedTheme === theme ? "ring-2 ring-blue-500" : ""
                    }`}
                    size="sm"
                    onClick={() => !isUpdating && handleThemeClick(theme as ThemeKey)}
                  >
                    {theme}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          {themeError && <p className="text-red-500">{themeError}</p>}
        </div>
        {/* Add Font Family */}
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
