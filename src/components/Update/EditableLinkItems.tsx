"use client";
import React, { useState, useTransition } from "react";
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
import { AppInputType, AppInputConfig, defaultApp } from "@/lib/types/type";
import { toast } from "sonner";
import { censoredString, censoredUrl } from "@/lib/cencored/zodProvanity";

const getAppSchema = (app: AppInputType | null | undefined) => {
  const defaultApp: AppInputType = "Link";
  const appType = app || defaultApp;

  const baseSchema: z.ZodRawShape = {};

  if (AppInputConfig[appType].includes("title")) {
    baseSchema.title = z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be 100 characters or less");
  }

  if (AppInputConfig[appType].includes("url")) {
    baseSchema.url = censoredUrl(z.string().url("Invalid URL format, please add http:// or https://"));
  }

  if (AppInputConfig[appType].includes("description")) {
    baseSchema.description = z
      .string()
      .max(30, "Description must be 30 characters or less")
      .optional();
  }

  return z.object(baseSchema);
};

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
  const [copyUrl, setUrl] = useState<string>(url || "");

  const validApp = defaultApp(app);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | FormData
  ) => {
    console.log("handleSubmit called");
    let formData: FormData;

    if (e instanceof FormData) {
      formData = e;
    } else {
      e.preventDefault();
      formData = new FormData(e.currentTarget);
    }

    formData.append("id", id);
    formData.append("app", validApp);

    console.log("FormData:", Object.fromEntries(formData));

    try {
      const schema = getAppSchema(validApp);
      const dataToValidate: { [key: string]: FormDataEntryValue | null } = {};

      AppInputConfig[validApp].forEach((field) => {
        dataToValidate[field] = formData.get(field);
      });

      console.log("Data to validate:", dataToValidate);

      schema.parse(dataToValidate);
      console.log("Validation passed");

      setErrors({});
      startTransition(async () => {
        console.log("Starting update transition");
        try {
          await onUpdate(formData);
          console.log("Update completed");
          toast.success("Update completed");
          onEditModalClose();
        } catch (updateError) {
          console.error("Error during update:", updateError);
          toast.error("Error during update");
        }
      });
    } catch (error) {
      console.error("Validation or other error:", error);
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

  const AppInput = () => {
    return AppInputConfig[validApp].map((inputType) => {
      switch (inputType) {
        case "title":
          return (
            <Input
              key="title"
              label="Title"
              name="title"
              defaultValue={title}
              className="dark:text-white"
              isInvalid={!!errors.title}
              errorMessage={errors.title}
            />
          );
        case "url":
          return (
            <Input
              key="url"
              label="URL"
              name="url"
              isClearable
              onValueChange={setUrl}
              defaultValue={url}
              className="dark:text-white"
              isInvalid={!!errors.url}
              errorMessage={errors.url}
            />
          );
        case "description":
          return (
            <Input
              key="description"
              label="Description"
              name="description"
              defaultValue={description}
              className="dark:text-white"
              isInvalid={!!errors.description}
              errorMessage={errors.description}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <>
      <Card className="w-full">
        <CardBody className="p-4">
          <div className="flex flex-col justify-center text-center">
            <div className=" group">
              <a href={formattedUrl} target="_blank" rel="noopener noreferrer">
                <Link
                  size={16}
                  className="text-gray-900 dark:text-gray-100 group-hover:text-blue-500"
                />
              </a>
              <h3 className="text-md md:text-lg font-semibold text-gray-900 dark:text-gray-100 break-all">
                {title}
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
            <ModalHeader className="flex flex-col gap-1 text-center">
              Edit {validApp}
            </ModalHeader>
            <ModalBody>
              <input type="hidden" name="id" value={id} />
              {AppInput()}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onEditModalClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isPending}
                onClick={() => {
                  console.log("Submit button clicked");
                  handleSubmit(
                    new FormData(
                      document.querySelector("form") as HTMLFormElement
                    )
                  );
                }}
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
              You are about to delete <span className="font-bold">{title}</span>{" "}
              leading to the link {url}
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
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
