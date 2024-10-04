"use client";

import { Input, Button } from "@nextui-org/react";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const UsernameClient = ({ Url }: { Url: string }) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(Url)
      .then(() => {
        toast.success("URL copied to clipboard", {
          description: `Share the ${Url} to your friends`,
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy URL", {
          description: "Please try again.",
          duration: 3000,
        });
      });
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        value={Url}
        readOnly
        variant="bordered"
        size="sm"
        className="min-w-[250px] flex-grow"
      />
      <Button
        size="sm"
        variant="flat"
        isIconOnly
        aria-label="Copy profile URL"
        onClick={handleCopy}
      >
        <Copy size={18} />
      </Button>
      <Button
        size="sm"
        variant="flat"
        isIconOnly
        aria-label="Open profile in new tab"
        as="a"
        href={Url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink size={18} />
      </Button>
    </div>
  );
};

export default UsernameClient;
