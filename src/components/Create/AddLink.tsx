"use client";
import React, { useState, useTransition, useEffect } from "react";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Link, Plus, X } from "lucide-react";
import { BiSolidPaste } from "react-icons/bi";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
  });

  useEffect(() => {
    const getClipboardContent = async () => {
      try {
        const text = await navigator.clipboard.readText();
        setFormData((prevState) => ({ ...prevState, url: text }));
      } catch (error) {
        console.error("Failed to read clipboard contents: ", error);
      }
    };

    if (isOpen) {
      getClipboardContent();
    }
  }, [isOpen]);

  const validateForm = (data: typeof formData) => {
    try {
      linkSchema.parse(data);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(formData)) {
      startTransition(async () => {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value);
        });
        await createLink(formDataToSend);
        onClose();
        setFormData({ title: "", url: "", description: "" });
      });
    }
  };

  const handleInputChange = (key: keyof typeof formData) => (value: string) => {
    setFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleClearForm = () => {
    setFormData({ title: "", url: "", description: "" });
  };

  return (
    <>
      <Card className="w-full bg-white dark:bg-gray-800 shadow-md text-gray-400 dark:text-gray-400">
        <CardBody>
          <Button
            onClick={onOpen}
            color="primary"
            className="w-full"
            startContent={<Plus size={16} />}
          >
            Add Link
          </Button>
        </CardBody>
      </Card>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        backdrop="opaque"
        placement="bottom-center"
        className="text-gray-900 dark:text-gray-100"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-60",
        }}
      >
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              Add New Link
            </ModalHeader>
            <ModalBody>
              <Input
                name="title"
                label="Title"
                placeholder="Enter link title"
                className="dark:text-white"
                value={formData.title}
                onValueChange={handleInputChange("title")}
                isInvalid={!!errors.title}
                errorMessage={errors.title}
              />
              <Input
                name="url"
                label="URL"
                placeholder="Enter link URL"
                className="dark:text-white"
                value={formData.url}
                onValueChange={handleInputChange("url")}
                isInvalid={!!errors.url}
                errorMessage={errors.url}
                endContent={
                  <Button
                    isIconOnly
                    variant="flat"
                    onPress={() =>
                      navigator.clipboard
                        .readText()
                        .then((text) =>
                          setFormData((prevState) => ({
                            ...prevState,
                            url: text,
                          }))
                        )
                    }
                  >
                    <BiSolidPaste />
                  </Button>
                }
              />
              <Textarea
                name="description"
                label="Description"
                placeholder="Enter link description"
                className="dark:text-white"
                value={formData.description}
                onValueChange={handleInputChange("description")}
                isInvalid={!!errors.description}
                errorMessage={errors.description}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="warning"
                variant="light"
                onPress={handleClearForm}
                startContent={<X size={16} />}
              >
                Clear
              </Button>
              <Button color="primary" type="submit" isLoading={isPending}>
                {isPending ? "Adding..." : "Add Link"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
