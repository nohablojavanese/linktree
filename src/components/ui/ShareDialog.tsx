/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Share2, ArrowLeft } from "lucide-react";
import ShareOptions from "./ShareChild/ShareOption";
import QRCodeOption from './ShareChild/QRCodeOption';

interface ShareDialogProps {
  Url: string;
  className?: string; // Add this line
}

type ActiveOption = "main" | "share" | "qr";

const ShareDialog: React.FC<ShareDialogProps> = ({ Url, className }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeOption, setActiveOption] = useState<ActiveOption>("main");

  const renderContent = () => {
    switch (activeOption) {
      case "main":
        return (
          <ShareOptions
            Url={Url}
            onShareClick={() => setActiveOption("share")}
            onQRClick={() => setActiveOption("qr")}
          />
        );
      case "share":
        return (
          <ShareOptions
            Url={Url}
            showSocialOptions
            onBack={() => setActiveOption("main")}
          />
        );
      case "qr":
        return (
          <QRCodeOption 
            Url={Url} 
            onBack={() => setActiveOption("main")}
          />
        );
    }
  };

  return (
    <div className={`${className}`}>
      <Button 
        className={`bg-gray-400 hover:bg-purple-700 text-gray-200 ${className}`} 
        onPress={onOpen} 
        startContent={<Share2 className="w-5 h-5" />}
      >
        Share
      </Button>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="lg"
        classNames={{
          body: "p-6",
          closeButton: "hover:bg-gray-100 rounded-full",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center border-b pb-4">
                <h3 className="text-black text-2xl font-bold">
                  Share your Wisp
                </h3>
              </ModalHeader>
              <ModalBody>
                <p className="text-gray-600 mb-4">
                  Get more visitors by sharing your Wisp URL everywhere. Create or Copy your Wisp URL.
                </p>
                {activeOption !== "main" && (
                  <Button
                    onPress={() => setActiveOption("main")}
                    variant="light"
                    className="mb-4 text-purple-600 hover:bg-purple-100"
                    startContent={<ArrowLeft className="w-4 h-4" />}
                  >
                    Back
                  </Button>
                )}
                {renderContent()}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ShareDialog;
