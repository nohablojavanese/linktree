"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Card, CardBody, Input, Spinner } from "@nextui-org/react";
import { updateProfile, removeImage } from "@/app/edit/appearance/actions";
import { z } from "zod";
import { debounce } from "lodash";
import { ImageUploader } from "./ImageUploader";
import { toast } from "sonner";
import { censoredString } from "@/lib/cencored/zodProvanity";
import { CheckCircle } from "lucide-react";

const usernameSchema = censoredString(
  z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(10, "Username must be at most 10 characters long")
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
    handleChange,
    handleImageUploadComplete,
    handleRemoveImage,
    isLoading,
    isSuccess,
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
            isLoading={isLoading.username || false}
            isSuccess={isSuccess.username || false}
            maxLength={10} // Assuming max length for username is 20
          />
          <ProfileInput
            name="bio"
            label="Bio"
            defaultValue={profile.bio}
            error={errors.bio}
            onChange={(value) => handleChange("bio", value)}
            isLoading={isLoading.bio || false}
            isSuccess={isSuccess.bio || false}
            maxLength={100} // As per your bio schema
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
  const [isLoading, setIsLoading] = useState<
    Partial<Record<ProfileField, boolean>>
  >({});
  const [isSuccess, setIsSuccess] = useState<
    Partial<Record<ProfileField, boolean>>
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

      setIsLoading((prev) => ({ ...prev, [field]: true }));
      setIsSuccess((prev) => ({ ...prev, [field]: false }));
      try {
        await updateProfile({ [field]: value });
        setErrors((prev) => ({ ...prev, [field]: undefined }));
        setIsSuccess((prev) => ({ ...prev, [field]: true }));
        toast.success(`${field} updated successfully`);

        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSuccess((prev) => ({ ...prev, [field]: false }));
        }, 3000);
      } catch (error) {
        if (error instanceof Error) {
          setErrors((prev) => ({ ...prev, [field]: error.message }));
          toast.error(`Failed to update ${field}: ${error.message}`);
        } else {
          toast.error(`An unexpected error occurred while updating ${field}`);
        }
      } finally {
        setIsLoading((prev) => ({ ...prev, [field]: false }));
      }
    },
    [validateField]
  );

  const debouncedUpdate = useMemo(
    () => debounce(handleUpdate, 3000),
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
    isLoading,
    isSuccess,
  };
}

const ProfileInput: React.FC<{
  name: string;
  label: string;
  defaultValue?: string;
  isDisabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
  isLoading: boolean;
  isSuccess: boolean;
  maxLength?: number;
}> = ({
  name,
  label,
  defaultValue,
  error,
  onChange,
  isDisabled,
  isLoading,
  isSuccess,
  maxLength,
}) => {
  const [value, setValue] = useState(defaultValue || "");

  const getInputColor = ():
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger" => {
    if (isLoading) return "warning";
    if (isSuccess) return "success";
    if (error) return "danger";
    return "default";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setValue("");
    onChange("");
  };

  return (
    <div>
      <Input
        name={name}
        label={label}
        value={value}
        isDisabled={isDisabled}
        className="w-full"
        color={getInputColor()}
        isInvalid={!!error}
        isClearable
        onClear={handleClear}
        errorMessage={error}
        onChange={handleInputChange}
        // maxLength={maxLength}
        endContent={
          isLoading ? (
            <Spinner size="sm" color="warning" />
          ) : isSuccess ? (
            <CheckCircle className="h-5 w-5 text-success" />
          ) : null
        }
      />
      {maxLength && (
        <div
          className={`text-xs mt-1 text-right ${
            value.length > maxLength
              ? "text-red-500 font-bold"
              : "text-gray-500"
          }`}
        >
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

const IMAGE_TYPES = ["image", "hero", "background"] as const;
