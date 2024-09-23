"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Card, CardBody, Input } from "@nextui-org/react";
import { updateProfile, removeImage } from "@/app/edit/appearance/actions";
import { z } from "zod";
import { debounce } from "lodash";
import { ImageUploader } from "./ImageUploader";
import { toast } from "sonner";
import { censoredString } from "@/lib/cencored/zodProvanity";

const usernameSchema = censoredString(
  z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  "Username contains inappropriate language"
);
const urlSchema = z
  .string()
  .optional()
  .refine(
    (url) => {
      if (!url) return true;
      return /\.(png|jpe?g|gif|bmp|webp|svg)$/i.test(url);
    },
    {
      message: "URL must end with an image file extension (png, jpg, etc.)",
    }
  );
const bioSchema = censoredString(
  z.string().max(100, "Bio must be at most 100 characters long"),
  "Bio contains inappropriate language"
);

const profileSchema = z.object({
  username: usernameSchema,
  bio: bioSchema,
  background_url: urlSchema,
  hero_url: urlSchema,
  image_url: urlSchema,
});

type ProfileField = keyof z.infer<typeof profileSchema>;

export type EditProfileProps = {
  profile: z.infer<typeof profileSchema>;
};

export const EditProfile: React.FC<EditProfileProps> = ({ profile }) => {
  const {
    errors,
    updatedFields,
    handleChange,
    handleImageUploadComplete,
    handleRemoveImage,
  } = useProfileForm(profile);

  return (
    <Card className="w-full h-full dark:bg-gray-800">
      <CardBody>
        <div className="space-y-4">
          <ProfileInput
            name="username"
            label="Username"
            defaultValue={profile.username}
            error={errors.username}
            onChange={(value) => handleChange("username", value)}
          />
          <ProfileInput
            name="bio"
            label="Bio"
            defaultValue={profile.bio}
            error={errors.bio}
            onChange={(value) => handleChange("bio", value)}
          />
          {IMAGE_TYPES.map((type) => (
            <ImageUploader
              key={type}
              imageType={type}
              currentImageUrl={profile[`${type}_url` as keyof typeof profile]}
              onUploadComplete={(url) =>
                handleImageUploadComplete(
                  `${type}_url` as keyof typeof profile,
                  url
                )
              }
              onRemoveImage={() =>
                handleRemoveImage(`${type}_url` as keyof typeof profile)
              }
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

function useProfileForm(initialProfile: EditProfileProps["profile"]) {
  const [errors, setErrors] = useState<Partial<Record<ProfileField, string>>>(
    {}
  );
  const [updatedFields, setUpdatedFields] = useState<
    Partial<typeof initialProfile>
  >({});

  const validateField = useCallback((field: ProfileField, value: string) => {
    try {
      profileSchema.shape[field].parse(value);
      return undefined;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return "Validation error";
    }
  }, []);

  const handleUpdate = useCallback(
    async (field: ProfileField, value: string) => {
      const validationError = validateField(field, value);
      if (validationError) {
        setErrors((prev) => ({ ...prev, [field]: validationError }));
        toast.error(validationError);
        return;
      }

      try {
        await updateProfile({ [field]: value });
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      } catch (error) {
        if (error instanceof Error) {
          setErrors((prev) => ({ ...prev, [field]: error.message }));
        }
      }
    },
    [validateField]
  );

  const debouncedUpdate = useMemo(
    () => debounce(handleUpdate, 500),
    [handleUpdate]
  );

  const handleChange = useCallback(
    (field: ProfileField, value: string) => {
      setUpdatedFields((prev) => ({ ...prev, [field]: value }));
      debouncedUpdate(field, value);
    },
    [debouncedUpdate]
  );

  const handleImageUploadComplete = useCallback(
    (field: keyof typeof initialProfile, url: string) => {
      setUpdatedFields((prev) => ({ ...prev, [field]: url }));
      handleUpdate(field as ProfileField, url);
    },
    [handleUpdate]
  );

  const handleRemoveImage = useCallback(
    async (field: keyof typeof initialProfile) => {
      try {
        const imageType = field.replace("_url", "") as
          | "image"
          | "hero"
          | "background";
        const result = await removeImage(imageType);
        if (result.success) {
          setUpdatedFields((prev) => ({ ...prev, [field]: undefined }));
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrors((prev) => ({ ...prev, [field]: error.message }));
        }
      }
    },
    []
  );

  return {
    errors,
    updatedFields,
    handleChange,
    handleImageUploadComplete,
    handleRemoveImage,
  };
}

const ProfileInput: React.FC<{
  name: string;
  label: string;
  defaultValue?: string;
  isDisabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
}> = ({ name, label, defaultValue, error, onChange, isDisabled }) => (
  <Input
    name={name}
    label={label}
    defaultValue={defaultValue}
    isDisabled={isDisabled}
    className="w-full"
    isInvalid={!!error}
    isClearable
    errorMessage={error}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value)
    }
  />
);

const IMAGE_TYPES = ["image", "hero", "background"] as const;
