'use client'
import React, { useState } from 'react';
import { Button, Input, Card, CardBody } from "@nextui-org/react";
import { EditableSocialLink } from "@/components/EditableSocialLink";
import { createSocialLink } from '@/app/edit/actions';
import { z } from "zod";

const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required").max(50, "Platform must be 50 characters or less"),
  url: z.string().refine((url) => {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
    return urlPattern.test(url);
  }, {
    message: "Invalid URL format",
  }),
});


type SocialLinkItem = {
  id: string;
  platform: string;
  url: string;
};

type YourSocialLinksProps = {
  socialLinks: SocialLinkItem[];
};

export const AddSocial: React.FC<YourSocialLinksProps> = ({ socialLinks }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const validateForm = (formData: FormData) => {
      try {
        socialLinkSchema.parse({
          platform: formData.get('platform'),
          url: formData.get('url'),
        });
        setErrors({});
        return true;
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
        return false;
      }
    };
  
    const handleSubmit = (formData: FormData) => {
      if (validateForm(formData)) {
        createSocialLink(formData);
        setIsEditing(false);
      }
    };
  
    return (
      <Card className="w-full bg-white dark:bg-gray-800 shadow-md text-gray-400 dark:text-gray-400">
        <CardBody>
          {!isEditing ? (
            <div>
              <Button 
                onClick={() => setIsEditing(true)} 
                color="primary" 
                className="w-full"
              >
                Add New Social Link
              </Button>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-4">
              <Input
                name="platform"
                label="Platform"
                placeholder="Enter platform name"
                className="dark:text-white"
                isInvalid={!!errors.platform}
                errorMessage={errors.platform}
              />
              <Input
                name="url"
                label="URL"
                placeholder="Enter social link URL"
                className="dark:text-white"
                isInvalid={!!errors.url}
                errorMessage={errors.url}
              />
              <div className="flex justify-between">
                <Button type="submit" color="primary">
                  Add Social Link
                </Button>
                <Button onClick={() => setIsEditing(false)} color="secondary">
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardBody>
      </Card>
    );
  };