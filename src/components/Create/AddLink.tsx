"use client";
import React, { useState } from "react";
import { Button, Input, Textarea, Card, CardBody } from "@nextui-org/react";
import { Link } from "lucide-react";

import { createLink } from "@/app/edit/actions";
import { z } from "zod";

const linkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  url: z.string().refine(
    (url) => {
      const urlPattern =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
      return urlPattern.test(url);
    },
    {
      message: "Invalid URL format",
    }
  ),
  description: z
    .string()
    .max(30, "Description must be 30 characters or less")
    .optional(),
});

type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
};

type YourLinksProps = {
  links: LinkItem[];
};

export const AddLink: React.FC<YourLinksProps> = ({ links }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (formData: FormData) => {
    try {
      linkSchema.parse({
        title: formData.get("title"),
        url: formData.get("url"),
        description: formData.get("description"),
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
      createLink(formData);
      setIsEditing(false);
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-md text-gray-400 dark:text-gray-400">
      <CardBody>
        {!isEditing ? (
          <div className="">
            <Button
              onClick={() => setIsEditing(true)}
              color="primary"
              className="w-full "
            >
              <Link size={16} />
              Add Link
            </Button>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-4">
            <Input
              name="title"
              isRequired
              label="Title"
              placeholder="Enter link title"
              className="dark:text-white"
              isInvalid={!!errors.title}
              errorMessage={errors.title}
            />
            <Input
              name="url"
              isRequired
              label="URL"
              placeholder="Enter link URL"
              className="dark:text-white"
              isInvalid={!!errors.url}
              errorMessage={errors.url}
            />
            <Textarea
              name="description"
              label="Description"
              placeholder="Enter link description"
              className="dark:text-white"
              isInvalid={!!errors.description}
              errorMessage={errors.description}
            />
            <div className="flex justify-between">
              <Button type="submit" color="primary">
                Add Link
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
