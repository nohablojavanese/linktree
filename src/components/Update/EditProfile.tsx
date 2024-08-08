"use client";
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react";
import { updateProfile } from "@/app/edit/actions";
import { z } from "zod";

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

  const imageUrlSchema = z
  .string()
  // .url("Invalid URL format ex: https://websource.com/picture.png")
  .transform((url) => {
    if (!/^https?:\/\//.test(url)) {
      return `https://${url}`;
    }
    return url;
  });

export type EditProfileProps = {
  username: string;
  imageUrl: string;
};

export const EditProfile: React.FC<EditProfileProps> = ({
  username,
  imageUrl,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");

  const validateForm = (formData: FormData) => {
    const newUsername = formData.get("username") as string;
    const newImageUrl = formData.get("imageUrl") as string;
    let isValid = true;

    try {
      usernameSchema.parse(newUsername);
      setUsernameError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setUsernameError(error.errors[0].message);
        isValid = false;
      }
    }
    try {
      imageUrlSchema.parse(newImageUrl);
      setImageUrlError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setImageUrlError(error.errors[0].message);
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
        await updateProfile(formData);
        setIsEditing(false);
      } catch (error) {
        if (error instanceof Error) {
          setUsernameError(error.message);
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
            Edit Profile
          </Button>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center mb-4">
              <Input
                name="username"
                label="Username"
                defaultValue={username}
                className="flex-1"
                isInvalid={!!usernameError}
                errorMessage={usernameError}
                description={`Username should be unique`}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">@</span>
                  </div>
                }
              />
            </div>
            <Input
              name="imageUrl"
              label="Profile Image URL"
              defaultValue={imageUrl}
              isClearable
              className="mb-4"
              isInvalid={!!imageUrlError}
              errorMessage={imageUrlError}
              placeholder="https://"
              // startContent={
              //   <div className="pointer-events-none flex items-center">
              //     <span className="text-default-400 text-small">https://</span>
              //   </div>
              // }
  
            />
            <div className="flex justify-between">
              <Button type="submit" color="primary" className="text-gray-400">
                Update Profile
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
