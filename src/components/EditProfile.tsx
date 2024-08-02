'use client'
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react";
import { updateProfile } from "@/app/edit/actions";
import { z } from "zod";

const usernameSchema = z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/);

export type EditProfileProps = {
  username: string;
  imageUrl: string;
};

export const EditProfile: React.FC<EditProfileProps> = ({ username, imageUrl }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const newUsername = formData.get('username') as string;
    try {
      usernameSchema.parse(newUsername);
      setUsernameError("");
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setUsernameError(error.errors[0].message);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-4 dark:bg-gray-800">
      {/* <CardHeader>
      </CardHeader> */}
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
          <form action={handleSubmit}>
            <Input
              name="username"
              label="Username"
              defaultValue={username}
              className="mb-4"
              errorMessage={usernameError}
            />
            <Input
              name="imageUrl"
              label="Profile Image URL"
              defaultValue={imageUrl}
              className="mb-4"
            />
            <div className="flex justify-between">
              <Button type="submit" color="primary" className="text-gray-400">
                Update Profile
              </Button>
              <Button onClick={() => setIsEditing(false)} color="secondary" className="text-gray-400">
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardBody>
    </Card>
  );
};