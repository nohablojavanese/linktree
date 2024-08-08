'use client'
import React, { useState } from 'react';
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { SocialLinkProps } from './SocialLinks';
import { z } from "zod";

const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required").max(50, "Platform must be 50 characters or less"),
  url: z.string().url("Invalid URL format"),
});

type EditableSocialLinkProps = SocialLinkProps & {
  onUpdate: (formData: FormData) => void;
  onDelete: (formData: FormData) => void;
};

export const EditableSocialLink: React.FC<EditableSocialLinkProps> = ({ id, platform, url, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (formData: FormData) => {
    try {
      socialLinkSchema.parse({
        platform: formData.get('platform'),
        url: formData.get('url'),
      });
      setErrors({});
      onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleDelete = () => {
    const formData = new FormData();
    formData.append('id', id);
    onDelete(formData);
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-md">
      {!isEditing ? (
        <CardBody>
          <h3 className="text-lg font-semibold">{platform}</h3>
          <p className="text-sm text-gray-500">{url}</p>
          <Button onClick={() => setIsEditing(true)} color="primary" size="sm" className="mt-4">
            Edit
          </Button>
        </CardBody>
      ) : (
        <form action={handleSubmit}>
          <input type="hidden" name="id" value={id} />
          <CardBody className="gap-4">
            <Input
              label="Platform"
              name="platform"
              defaultValue={platform}
              className="dark:text-white"
              isInvalid={!!errors.platform}
              errorMessage={errors.platform}
            />
            <Input
              label="URL"
              name="url"
              defaultValue={url}
              className="dark:text-white"
              isInvalid={!!errors.url}
              errorMessage={errors.url}
            />
            <div className="flex justify-between mt-2">
              <Button type="submit" color="primary" size="sm">Update</Button>
              <Button onClick={() => setIsEditing(false)} color="secondary" size="sm">Cancel</Button>
              <Button onClick={handleDelete} color="danger" size="sm">Delete</Button>
            </div>
          </CardBody>
        </form>
      )}
    </Card>
  );
};