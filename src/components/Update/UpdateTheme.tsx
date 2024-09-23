"use client";
import React, { useState } from "react";
import { Card, CardBody, Image, Tooltip } from "@nextui-org/react";
import { updateTheme } from "@/app/edit/appearance/actions";
import { z } from "zod";
import { FormatTheme, FormatFont, ThemeKey, FontKey } from "@/lib/theme/basic";

const themeSchema = z.enum(
  Object.keys(FormatTheme) as [ThemeKey, ...ThemeKey[]]
);
const fontFamilySchema = z.enum(
  Object.keys(FormatFont) as [FontKey, ...FontKey[]]
);

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
  const [selectedFontFamily, setSelectedFontFamily] = useState<FontKey>(currentFontFamily);

  const validateForm = () => {
    let isValid = true;

    try {
      themeSchema.parse(selectedTheme);
      setThemeError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setThemeError(error.errors[0].message);
        isValid = false;
      }
    }

    try {
      fontFamilySchema.parse(selectedFontFamily);
      setFontFamilyError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFontFamilyError(error.errors[0].message);
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("theme", selectedTheme);
      formData.append("font_family", selectedFontFamily);

      try {
        await updateTheme(formData);
      } catch (error) {
        if (error instanceof Error) {
          setThemeError(error.message);
        }
      }
    }
  };

  const handleThemeClick = (theme: ThemeKey) => {
    setSelectedTheme(theme);
    handleSubmit();
  };

  const handleFontClick = (font: FontKey) => {
    setSelectedFontFamily(font);
    handleSubmit();
  };

  return (
    <Card className="w-full h-full dark:bg-gray-800">
      <CardBody>
        <div className="mb-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.keys(FormatTheme).map((theme) => (
                <div key={theme} className="m-2 text-center cursor-pointer ">
                  <Tooltip content={theme} placement="top" className="text-blue-400 cursor-pointer">
                    <Image
                      // src={`/path/to/theme/images/${theme}.png`}
                      src={`/theme/${theme}.png`}
                      alt={theme}
                      
                      className={`cursor-pointer object-cover w-40 h-60 sm:w-48 sm:h-72 md:w-48 md:h-64 ${selectedTheme === theme ? 'border-2 border-blue-500' : ''}`}
                      onClick={() => handleThemeClick(theme as ThemeKey)}
                    />
                  </Tooltip>
                  <p className={`mt-2 text-xs ${selectedTheme === theme ? 'bg-blue-500 rounded-full font-bold text-white' : 'text-gray-400'} `}>{theme}</p>
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
