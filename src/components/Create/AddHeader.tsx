/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useTransition } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { createLink } from "@/app/edit/actions";
import { toast } from "sonner";
export const AddHeader: React.FC = () => {
  const [isPending, startTransition] = useTransition();

  const handleAddHeader = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", "Headline");
      formData.append("url", "");
      formData.append("description", "");
      formData.append("app", "Header");
      formData.append("isVisible", "false");

      try {
        await createLink(formData);
        toast.success("Header has been created.");
      } catch (error) {
        console.error("Error Adding header:", error);
        toast.error("Error Adding Header");
      }
    });
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-md text-gray-400 dark:text-gray-400">
      <CardBody>
        <Button
          onClick={handleAddHeader}
          color="primary"
          className="w-full"
          startContent={<Plus size={16} />}
          isLoading={isPending}
        >
          {isPending ? "Adding Header..." : "Add Header"}
        </Button>
      </CardBody>
    </Card>
  );
};