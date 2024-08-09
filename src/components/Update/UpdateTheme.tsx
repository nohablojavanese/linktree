"use client";
import React, { useState } from "react";
import { Card, CardBody, Button, Select, SelectItem } from "@nextui-org/react";
import { updateTheme } from "@/app/edit/actions";
import { z } from "zod";
import { FormatTheme, FormatFont, ThemeKey, FontKey } from "@/lib/theme/basic";
import { GrFormEdit } from "react-icons/gr";

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
  const [isEditing, setIsEditing] = useState(false);
  const [themeError, setThemeError] = useState("");
  const [fontFamilyError, setFontFamilyError] = useState("");

  const validateForm = (formData: FormData) => {
    const newTheme = formData.get("theme") as string;
    const newFontFamily = formData.get("font_family") as string;
    let isValid = true;

    try {
      themeSchema.parse(newTheme);
      setThemeError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setThemeError(error.errors[0].message);
        isValid = false;
      }
    }

    try {
      fontFamilySchema.parse(newFontFamily);
      setFontFamilyError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFontFamilyError(error.errors[0].message);
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (validateForm(formData)) {
      try {
        await updateTheme(formData);
        setIsEditing(false);
      } catch (error) {
        if (error instanceof Error) {
          setThemeError(error.message);
        }
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-4 dark:bg-gray-800">
      <CardBody>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            color="primary"
            className="w-full text-gray-400 dark:text-gray-400"
          >
            <GrFormEdit size={20} />
            Edit Theme
          </Button>
        ) : (
          <form onSubmit={handleSubmit}>
            <Select
              name="theme"
              label="Theme"
              placeholder="Select a theme"
              defaultSelectedKeys={[currentTheme]}
              className="mb-4"
              isInvalid={!!themeError}
              errorMessage={themeError}
            >
              {Object.keys(FormatTheme).map((theme) => (
                <SelectItem key={theme} value={theme}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </SelectItem>
              ))}
            </Select>
            <Select
              name="font_family"
              label="Font Family"
              placeholder="Select a font family"
              defaultSelectedKeys={[currentFontFamily]}
              className="mb-4"
              isInvalid={!!fontFamilyError}
              errorMessage={fontFamilyError}
            >
              {Object.keys(FormatFont).map((font) => (
                <SelectItem key={font} value={font}>
                  {font.charAt(0).toUpperCase() + font.slice(1)}
                </SelectItem>
              ))}
            </Select>
            <div className="flex justify-between">
              <Button type="submit" color="primary" className="text-gray-400">
                Update Theme
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                color="secondary"
                className="text-gray-400"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardBody>
    </Card>
  );
};
