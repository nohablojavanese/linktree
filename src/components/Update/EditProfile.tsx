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
  const { errors, updatedFields, handleChange, handleImageUploadComplete, handleRemoveImage } = useProfileForm(profile);

  return (
    <Card className="w-full max-w-md mx-auto mb-4 dark:bg-gray-800">
      <CardBody>
        <div className="space-y-4">
          <ProfileInput
            name="username"
            label="Username"
            defaultValue={profile.username}
            error={errors.username}
            onChange={(value) => handleChange('username', value)}
          />
          <ProfileInput
            name="bio"
            label="Bio"
            defaultValue={profile.bio}
            error={errors.bio}
            onChange={(value) => handleChange('bio', value)}
          />
          {['image', 'hero', 'background'].map((type) => (
            <ImageUploader 
              key={type}
              imageType={type as 'image' | 'hero' | 'background'}
              currentImageUrl={profile[`${type}_url` as 'image_url' | 'hero_url' | 'background_url']}
              onUploadComplete={(url) => handleImageUploadComplete(`${type}_url` as 'image_url' | 'hero_url' | 'background_url', url)}
              onRemoveImage={() => handleRemoveImage(`${type}_url` as 'image_url' | 'hero_url' | 'background_url')}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

// Create a custom hook for form state management
function useProfileForm(initialProfile: EditProfileProps['profile']) {
  const [errors, setErrors] = useState<Partial<Record<ProfileField, string>>>({});
  const [updatedFields, setUpdatedFields] = useState<Partial<typeof initialProfile>>({});

  const handleUpdate = useCallback(async (field: ProfileField, value: string) => {
    try {
      await updateProfile({ [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, [field]: error.message }));
      }
    }
  }, []);

  const debouncedUpdate = useMemo(() => debounce(handleUpdate, 500), [handleUpdate]);

  const handleChange = useCallback((field: ProfileField, value: string) => {
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
    debouncedUpdate(field, value);
  }, [debouncedUpdate]);

  const handleImageUploadComplete = useCallback((field: 'background_url' | 'hero_url' | 'image_url', url: string) => {
    setUpdatedFields((prev) => ({ ...prev, [field]: url }));
    handleUpdate(field, url);
  }, [handleUpdate]);

  const handleRemoveImage = useCallback(async (field: 'background_url' | 'hero_url' | 'image_url') => {
    try {
      await updateProfile({ [field]: null });
      setUpdatedFields((prev) => ({ ...prev, [field]: null }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, [field]: error.message }));
      }
    }
  }, []);

  return { errors, updatedFields, handleChange, handleImageUploadComplete, handleRemoveImage };
}

// Create a reusable ProfileInput component
const ProfileInput: React.FC<{
  name: string;
  label: string;
  defaultValue?: string;
  error?: string;
  onChange: (value: string) => void;
}> = ({ name, label, defaultValue, error, onChange }) => (
  <Input
    name={name}
    label={label}
    defaultValue={defaultValue}
    className="w-full"
    isInvalid={!!error}
    isClearable
    errorMessage={error}
    onChange={(e) => onChange(e.target.value)}
  />
);
