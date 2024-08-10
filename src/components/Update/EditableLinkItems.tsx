"use client";
import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Button,
  Switch,
} from "@nextui-org/react";
import { LinkType } from "@/lib/types/type";
import { z } from "zod";
import { Link } from "lucide-react";

const linkItemSchema = z.object({
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

type EditableLinkItemProps = LinkType & {
  onUpdate: (formData: FormData) => Promise<void>;
  onDelete: (formData: FormData) => Promise<void>;
  onVisible: (id: string, isVisible: boolean) => Promise<void>;
};

export const EditableLinkItem: React.FC<EditableLinkItemProps> = ({
  id,
  title,
  url,
  description,
  isVisible,
  onUpdate,
  onDelete,
  onVisible,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    try {
      linkItemSchema.parse({
        title: formData.get("title"),
        url: formData.get("url"),
        description: formData.get("description"),
      });
      setErrors({});
      startTransition(async () => {
        await onUpdate(formData);
        setIsEditing(false);
      });
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
    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", id);
      await onDelete(formData);
    });
  };

  const handleVisibilityChange = (checked: boolean) => {
    startTransition(async () => {
      await onVisible(id, checked);
    });
  };

  const formattedUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  return (
    <AnimatePresence>
      <Card className="w-full bg-white dark:bg-gray-800 shadow-md">
        {!isEditing ? (
          <motion.div
            key="view-mode"
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 90 }}
            transition={{ duration: 1 }}
          >
            <CardBody>
              <div className="absolute top-2 right-2 flex flex-col items-center">
                <Switch
                  onChange={(e) => handleVisibilityChange(e.target.checked)}
                  isSelected={isVisible}
                  size="md"
                  color={isVisible ? "success" : undefined}
                  startContent={<BiSolidShow size={16} />}
                  endContent={<BiSolidHide size={16} />}
                  isDisabled={isPending}
                />
                <span className="text-gray-500 dark:text-gray-400">
                  {isVisible ? "Visible" : "Hidden"}
                </span>
              </div>

              <a
                href={formattedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 group"
              >
                <Link
                  size={16}
                  className="text-gray-900 dark:text-gray-100 group-hover:text-blue-500"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
              </a>
              <p className="text-sm text-gray-500 dark:text-gray-400">{url}</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {description}
              </p>

              <Button
                onClick={() => setIsEditing(true)}
                color="primary"
                size="sm"
                className="mt-4 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
              >
                Edit
              </Button>
            </CardBody>
          </motion.div>
        ) : (
          <motion.div
            key="edit-mode"
            initial={{ opacity: 0, rotateX: 90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: -90 }}
            transition={{ duration: 1 }}
          >
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
                  isLoading={isPending}
                >
                  {isPending ? 'Updating...' : 'Update'}
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  color="secondary"
                  size="sm"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  isDisabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  color="danger"
                  size="sm"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  isLoading={isPending}
                >
                  {isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </CardFooter>
            </form>
          </motion.div>
        )}
      </Card>
    </AnimatePresence>
  );
};