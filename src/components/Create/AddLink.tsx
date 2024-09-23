"use client";
import React, { useState, useTransition } from "react";
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
import { AppSelector } from "./AppsComponent";

import { createLink, fetchMetadata } from "@/app/edit/actions";
import { z } from "zod";
import { toast } from "sonner";
import { censoredString, censoredUrl } from "@/lib/cencored/zodProvanity";

const CreateLinkSchema = z.object({
  title: censoredString(
    z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be 100 characters or less"),
    "Title contains inappropriate language"
  ),
  url: censoredUrl(z.string().min(1, "URL is required")),
  description: censoredString(
    z.string().max(30, "Description must be 30 characters or less").optional(),
    "Description contains inappropriate language"
  ),
  app: z.string().optional(),
});

type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  app: string;
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
    app: "Link",
  });
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

  const validateForm = (data: typeof formData) => {
    try {
      CreateLinkSchema.parse(data);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let validatedFormData = { ...formData };

    try {
      // Normalize URL
      validatedFormData.url = validatedFormData.url.trim();
      if (
        !validatedFormData.url.startsWith("http://") &&
        !validatedFormData.url.startsWith("https://")
      ) {
        validatedFormData.url = `https://${validatedFormData.url}`;
      }

      // Validate URL
      const validatedUrl = censoredUrl(z.string().url()).parse(
        validatedFormData.url
      );
      validatedFormData.url = validatedUrl;

      // If title is empty, fetch metadata
      if (!validatedFormData.title.trim()) {
        setIsLoadingMetadata(true);
        try {
          const metadata = await fetchMetadata(validatedFormData.url);
          validatedFormData.title = metadata;
          setFormData(validatedFormData);
        } catch (error) {
          console.error("Error fetching metadata:", error);
          toast.error("Error Finding your Title", {
            description: `We cant Find the Title from ${validatedFormData.url}`,
            icon: "🚨",
          });
        } finally {
          setIsLoadingMetadata(false);
        }
      }

      // Validate the entire form data
      if (validateForm(validatedFormData)) {
        startTransition(async () => {
          const formDataToSend = new FormData();
          Object.entries(validatedFormData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
          });
          await createLink(formDataToSend);
          onClose();
          setFormData({ title: "", url: "", description: "", app: "" });
          toast.success("Link has been created", {
            description: `Added ${validatedFormData.title} to your page`,
            icon: "🚀",
          });
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        // Handle non-Zod errors
        console.error("Unexpected error:", error);
        setErrors({ url: "Please Add a Valid URL" });
      }
    }
  };

  const handleInputChange = (key: keyof typeof formData) => (value: string) => {
    setFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleClearForm = () => {
    setFormData({ title: "", url: "", description: "", app: "" });
  };

  const handleAppSelect = (app: string) => {
    setFormData((prevState) => ({ ...prevState, app }));
  };

  const handleCloseApp = () => {
    // This function is opt
  };

  const ErrorMessage: React.FC<{ error: string }> = ({ error }) => {
    if (error.includes("blocked domain")) {
      return (
        <span>
          URL contains a blocked domain. Please check our{" "}
          <a href="/terms" className="text-red-500 underline">
            Terms of Service
          </a>
        </span>
      );
    }
    return <span>{error}</span>;
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
        size="2xl"
        backdrop="opaque"
        placement="bottom-center"
        className="text-gray-900 dark:text-gray-100"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-60",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex text-center flex-col gap-1">
                Add {formData.app || "Link"}
              </ModalHeader>
              <ModalBody>
                <Input
                  name="url"
                  label="URL"
                  placeholder={`Enter ${formData.app || "link"} URL`}
                  className="dark:text-white"
                  value={formData.url}
                  onValueChange={handleInputChange("url")}
                  isInvalid={!!errors.url}
                  errorMessage={
                    errors.url && <ErrorMessage error={errors.url} />
                  }
                  isDisabled={isLoadingMetadata}
                  startContent={
                    !formData.url.startsWith("http") && (
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          https://
                        </span>
                      </div>
                    )
                  }
                  endContent={
                    <Button
                      isIconOnly
                      variant="flat"
                      onPress={() =>
                        navigator.clipboard.readText().then((text) =>
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
                <Input
                  name="title"
                  label="Title"
                  placeholder="Add title for your viewer"
                  className="dark:text-white"
                  value={formData.title}
                  onValueChange={handleInputChange("title")}
                  isInvalid={!!errors.title}
                  isClearable
                  errorMessage={errors.title}
                  isDisabled={isLoadingMetadata}
                />
                <Input
                  name="description"
                  label="Description"
                  placeholder="Add description (optional)"
                  className="dark:text-white"
                  value={formData.description}
                  onValueChange={handleInputChange("description")}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description}
                />
                <div className="w-full" onClick={(e) => e.preventDefault()}>
                  <AppSelector
                    selectedApp={formData.app}
                    onAppSelect={handleAppSelect}
                    onClose={handleCloseApp}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  color="warning"
                  variant="light"
                  onPress={handleClearForm}
                  startContent={<X size={16} />}
                  type="button"
                >
                  Clear
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={isPending || isLoadingMetadata}
                >
                  {isPending || isLoadingMetadata ? "Adding..." : "Add Link"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
