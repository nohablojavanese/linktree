"use client";
import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BiSolidShow,
  BiSolidHide,
  BiTrash,
  BiEdit,
  BiSolidPaste,
} from "react-icons/bi";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Button,
  Switch,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ButtonGroup,
} from "@nextui-org/react";
import { LinkType } from "@/lib/types/type";
import { z } from "zod";
import { Link, ChevronDown, ChevronUp } from "lucide-react";

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
  app,
  url,
  description,
  isVisible,
  onUpdate,
  onDelete,
  onVisible,
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPending, startTransition] = useTransition();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();
  const [copyUrl, setUrl] = useState<string>("");

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };
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
        onEditModalClose();
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
      onDeleteModalClose();
    });
  };

  const handleVisibilityChange = () => {
    startTransition(async () => {
      await onVisible(id, !isVisible);
    });
  };

  const formattedUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  const truncatedUrl = url?.length > 40 ? `${url.slice(0, 40)}...` : url;

  const truncatedDescription =
    description?.length > 40 ? `${description.slice(0, 40)}...` : description;

  return (
    <>
      <Card className="w-full">
        <CardBody className="p-4">
          <div className="flex flex-col justify-center text-center">
            <div className="space-x-2 group">
              <a href={formattedUrl} target="_blank" rel="noopener noreferrer">
                <Link
                  size={16}
                  className="text-gray-900 dark:text-gray-100 group-hover:text-blue-500"
                />
              </a>
              <h3 className="text-md md:text-lg font-semibold text-gray-900 dark:text-gray-100 break-all">
                {title} - {app}
              </h3>
            </div>
            <div className="text-xs md:text-sm flex flex-col text-gray-500 dark:text-gray-400 break-all">
              {isDescriptionExpanded ? url : truncatedUrl}
              {url.length > 40 && (
                <a
                  className="text-xs cursor-pointer hover:text-blue-600"
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                >
                  {isDescriptionExpanded ? "Hide" : "Show More"}
                </a>
              )}
            </div>

            <div className="mt-2 text-gray-700 dark:text-gray-300 text-xs md:text-md">
              {isDescriptionExpanded ? description : truncatedDescription}
              {description?.length > 40 && (
                <Button
                  size="sm"
                  variant="light"
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                  endContent={
                    isDescriptionExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )
                  }
                >
                  {isDescriptionExpanded ? "Hide" : "More"}
                </Button>
              )}
            </div>
          </div>
        </CardBody>

        <CardFooter className="flex justify-center space-x-4">
          <ButtonGroup>
            <Button
              onClick={onEditModalOpen}
              color="primary"
              size="sm"
              className="button-base bg-blue-600 hover:bg-blue-600"
              startContent={<BiEdit size={16} />}
            >
              <span className="hidden md:block">Edit</span>
            </Button>
            <Button
              onClick={onDeleteModalOpen}
              color="danger"
              size="sm"
              className="button-base bg-red-600 hover:bg-red-600"
              startContent={<BiTrash size={16} />}
            >
              <span className="hidden md:block">Delete</span>
            </Button>
            <Button
              onClick={handleVisibilityChange}
              size="sm"
              color={isVisible ? "success" : "danger"}
              className={`button-base ${
                isVisible
                  ? "bg-green-200 hover:bg-green-200"
                  : "bg-red-200 hover:bg-red-600"
              }`}
              isDisabled={isPending}
            >
              <Switch
                onChange={handleVisibilityChange}
                isSelected={isVisible}
                size="sm"
                color={isVisible ? "success" : undefined}
                startContent={<BiSolidShow size={16} />}
                endContent={<BiSolidHide size={16} />}
                isDisabled={isPending}
              />
              <span className="hidden md:block">
                {isVisible ? "Visible" : "Hidden"}
              </span>
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        backdrop="opaque"
        placement="bottom-center"
        className="text-gray-900 dark:text-gray-100"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-60",
        }}
      >
        <ModalContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(new FormData(e.target as HTMLFormElement));
            }}
          >
            <ModalHeader className="flex flex-col gap-1">Edit Link</ModalHeader>
            <ModalBody>
              <input type="hidden" name="id" value={id} />
              <Input
                label="Title"
                name="title"
                defaultValue={title}
                className="dark:text-white"
                isInvalid={!!errors.title}
                errorMessage={errors.title}
                description={`Tersimpan: ${title}`}
              />
              <Input
                label="URL"
                name="url"
                // isClearable
                onValueChange={setUrl}
                // defaultValue={url}
                description={`Tersimpan: ${truncatedUrl}`}
                value={copyUrl}
                className="dark:text-white"
                isInvalid={!!errors.url}
                errorMessage={errors.url}
                endContent={
                  <Button
                    startContent={<BiSolidPaste />}
                    onPress={handlePasteFromClipboard}
                    isIconOnly
                    color="warning"
                  ></Button>
                }
              />

              <Textarea
                label="Description"
                name="description"
                defaultValue={description}
                className="dark:text-white"
                isInvalid={!!errors.description}
                errorMessage={errors.description}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onEditModalClose}>
                Cancel
              </Button>
              <Button
                color="success"
                variant="shadow"
                type="submit"
                isLoading={isPending}
                className="text-white"
              >
                {isPending ? "Updating..." : "Update"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Delete Modal */}
      <Modal
        backdrop="opaque"
        placement="bottom-center"
        className="text-gray-900 dark:text-gray-100"
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete Link?
          </ModalHeader>
          <ModalBody>
            <p>
              Anda akan menghapus <span className="font-bold">{title}</span>{" "}
              menuju link {url}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="light"
              onPress={onDeleteModalClose}
            >
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete} isLoading={isPending}>
              {isPending ? "Menghapus..." : "Hapus"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
