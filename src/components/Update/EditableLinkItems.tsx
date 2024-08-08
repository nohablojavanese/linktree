"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { LinkItemProps } from "../LinkItems";
import { z } from "zod";

const linkItemSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  url: z.string().url("Invalid URL format"),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional(),
});

type EditableLinkItemProps = LinkItemProps & {
  onUpdate: (formData: FormData) => void;
  onDelete: (formData: FormData) => void;
};

export const EditableLinkItem: React.FC<EditableLinkItemProps> = ({
  id,
  title,
  url,
  description,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (formData: FormData) => {
    try {
      linkItemSchema.parse({
        title: formData.get("title"),
        url: formData.get("url"),
        description: formData.get("description"),
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
    formData.append("id", id);
    onDelete(formData);
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-md">
      {!isEditing ? (
        <CardBody>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{url}</p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>
          <Button
            onClick={() => setIsEditing(true)}
            color="primary"
            size="sm"
            className="mt-4 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
          >
            Edit
          </Button>
        </CardBody>
      ) : (
        <form action={handleSubmit}>
          <input type="hidden" name="id" value={id} />
          <CardBody className="gap-4">
            <Input
              label="Title"
              name="title"
              defaultValue={title}
              className="dark:text-white"
              isInvalid={!!errors.title}
              errorMessage={errors.title}
            />
            <Input
              label="URL"
              name="url"
              defaultValue={url}
              className="dark:text-white"
              isInvalid={!!errors.url}
              errorMessage={errors.url}
            />
            <Textarea
              label="Description"
              name="description"
              defaultValue={description}
              className="dark:text-white"
              isInvalid={!!errors.description}
              errorMessage={errors.description}
            />
          </CardBody>

          <CardFooter className="justify-between pt-0">
            <Button
              type="submit"
              color="primary"
              size="sm"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              color="secondary"
              size="sm"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              color="danger"
              size="sm"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
};
