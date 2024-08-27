"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Card, CardBody, Input } from "@nextui-org/react";
import { updateProfile } from "@/app/edit/appearance/actions";
import { z } from "zod";
import { debounce } from "lodash";

const censoredWords = ["badword", "offensive", "inappropriate"];
const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(20, "Username must be at most 20 characters long")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores"
  )
  .refine(
    (username) =>
      !censoredWords.some((word) => username.toLowerCase().includes(word)),
    "Username contains inappropriate language"
  );
const urlSchema = z
  .string()
  // .url("Invalid URL format ex: https://websource.com/picture.png")
  .optional()
  .refine(
    (url) => {
      if (!url) return true; // Skip if the URL is not provided (optional case)
      return /\.(png|jpe?g|gif|bmp|webp|svg)$/i.test(url); // Check for image file extension
    },
    {
      message: "URL must end with an image file extension (png, jpg, etc.)",
    }
  );
const bioSchema = z.string().max(160).optional();

type ProfileField =
  | "username"
  | "bio"
  | "background_url"
  | "hero_url"
  | "image_url";

export type EditProfileProps = {
  profile: {
    username: string;
    bio?: string;
    background_url?: string ;
    hero_url?: string;
    image_url?: string;
  };
};

export const EditProfile: React.FC<EditProfileProps> = ({ profile }) => {
  const [errors, setErrors] = useState<Partial<Record<ProfileField, string>>>(
    {}
  );
  const [updatedFields, setUpdatedFields] = useState<Partial<typeof profile>>(
    {}
  );

  const validateField = (field: ProfileField, value: string) => {
    try {
      switch (field) {
        case "username":
          usernameSchema.parse(value);
          break;
        case "bio":
          bioSchema.parse(value);
          break;
        case "background_url":
        case "hero_url":
        case "image_url":
          urlSchema.parse(value);
          break;
      }
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleUpdate = useCallback(
    async (field: ProfileField, value: string) => {
      if (validateField(field, value)) {
        try {
          await updateProfile({ [field]: value });
          // Optionally, you can add some visual feedback here to indicate successful update
        } catch (error) {
          if (error instanceof Error) {
            setErrors((prev) => ({ ...prev, [field]: error.message }));
          }
        }
      }
    },
    []
  );

  const debouncedUpdate = useMemo(
    () => debounce(handleUpdate, 500),
    [handleUpdate]
  );

  const handleChange = (field: ProfileField, value: string) => {
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
    debouncedUpdate(field, value);
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-4 dark:bg-gray-800">
      <CardBody>
        <div className="space-y-4">
          {(Object.keys(profile) as ProfileField[]).map((field) => (
            <Input
              key={field}
              name={field}
              label={
                field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")
              }
              defaultValue={profile[field]}
              className="w-full"
              isInvalid={!!errors[field]}
              isClearable
              errorMessage={errors[field]}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
