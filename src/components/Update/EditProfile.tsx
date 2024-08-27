"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Card, CardBody, Input } from "@nextui-org/react";
import { updateProfile } from "@/app/edit/appearance/actions";
import { z } from "zod";
import { debounce } from "lodash";
import { ImageUploader } from "./ImageUploader";

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
    
    const handleImageUploadComplete = (field: 'background_url' | 'hero_url' | 'image_url', url: string) => {
      setUpdatedFields((prev) => ({ ...prev, [field]: url }));
      handleUpdate(field, url);
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
          {/* Username and Bio inputs */}
          <Input
            name="username"
            label="Username"
            defaultValue={profile.username}
            className="w-full"
            isInvalid={!!errors.username}
            isClearable
            errorMessage={errors.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />
          <Input
            name="bio"
            label="Bio"
            defaultValue={profile.bio}
            className="w-full"
            isInvalid={!!errors.bio}
            isClearable
            errorMessage={errors.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
          />

          {/* Image uploaders */}
          <ImageUploader 
            imageType="image" 
            onUploadComplete={(url) => handleImageUploadComplete('image_url', url)} 
          />
          <ImageUploader 
            imageType="hero" 
            onUploadComplete={(url) => handleImageUploadComplete('hero_url', url)} 
          />
          <ImageUploader 
            imageType="background" 
            onUploadComplete={(url) => handleImageUploadComplete('background_url', url)} 
          />
        </div>
      </CardBody>
    </Card>
  );
};
