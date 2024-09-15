/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Button,
  Modal,
  Input,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { createClient } from "@/lib/supabase/client";
import Cropper from "react-easy-crop"; // Import the Cropper component
import { getCroppedImg } from "@/lib/utils"; // Contain the getCroppedImg function to crop the image
import { z } from "zod";
import { LinkIcon, UploadCloud, UploadCloudIcon } from "lucide-react";
import { getAuthenticatedUser } from "@/app/edit/actions"; // Contain the supabase client to get the authenticated user

// Define the image types and their corresponding dimensions
const IMAGE_TYPES = {
  image: { width: 200, height: 200 },
  hero: { width: 1500, height: 500 },
  background: { width: 1920, height: 1080 },
};
export type ImageType = keyof typeof IMAGE_TYPES;

interface ImageUploaderProps {
  imageType: ImageType;
  currentImageUrl?: string;
  onUploadComplete: (url: string) => void;
  onRemoveImage: () => void;
}

const urlSchema = z
  .string()
  .url()
  .refine((url) => {
    return /\.(jpeg|jpg|gif|png|webp)$/i.test(url);
  }, "URL must end with a valid image extension (.jpg, .png, .gif, .webp)");

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageType,
  currentImageUrl,
  onUploadComplete,
  onRemoveImage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"file" | "link" | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadType(null);
    setImageUrl("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleUpload = async () => {
    if (!croppedAreaPixels) {
      setError("Please crop the image before uploading.");
      return;
    }

    setIsUploading(true);
    setError(null);
    const supabase = createClient();

    try {
      const user = await getAuthenticatedUser();

      const croppedImage = await getCroppedImg(
        imageUrl,
        croppedAreaPixels,
        IMAGE_TYPES[imageType].width,
        IMAGE_TYPES[imageType].height
      );

      // Convert base64 to blob
      const res = await fetch(croppedImage);
      const blob = await res.blob();

      const fileName = `${user.id}_${imageType}_${Date.now()}.jpg`;
      const bucketName = `user_${imageType}`;

      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, blob, {
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      if (publicUrlData) {
        // Call onUploadComplete with the public URL
        onUploadComplete(publicUrlData.publicUrl);
        handleCloseModal();
      } else {
        throw new Error("Failed to get public URL");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(
        "An error occurred while uploading the image. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    setIsUploading(true);
    setError(null);
    try {
      await onRemoveImage();
      console.log("Image removed successfully");
    } catch (error) {
      console.error("Error removing image:", error);
      setError("An error occurred while removing the image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
        {imageType.charAt(0).toUpperCase() + imageType.slice(1)}
      </h3>
      {currentImageUrl ? (
        <div className="flex items-center gap-4 bg-gray-100  dark:bg-gray-800 p-4 rounded-2xl">
          {!imageError ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={currentImageUrl}
                alt={`Current Image`}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Error
              </span>
            </div>
          )}
          <div className="flex-grow">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Current Image
            </p>
            <Button
              color="danger"
              variant="flat"
              onClick={handleRemoveImage}
              className="text-sm"
              isLoading={isUploading}
              disabled={isUploading}
            >
              {isUploading ? "Removing..." : "Remove Image"}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={handleUploadClick}
          color="primary"
          variant="flat"
          className="w-full justify-center py-6 text-sm border-2 border-dashed bg-gray-100 dark:bg-gray-800  border-gray-300 dark:border-gray-600 rounded-2xl"
          isLoading={isUploading}
          disabled={isUploading}
        >
          {isUploading ? (
            "Processing..."
          ) : (
            <>
              <UploadCloud className="w-6 h-6 mr-2" />
              Upload {imageType.charAt(0).toUpperCase() + imageType.slice(1)}
            </>
          )}
        </Button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="lg"
        className="dark:bg-gray-800"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-800 dark:text-gray-200 text-center">
                Upload {imageType.charAt(0).toUpperCase() + imageType.slice(1)}
              </ModalHeader>
              <ModalBody>
                {!uploadType && (
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => setUploadType("file")}
                      color="primary"
                      variant="solid"
                      className="border-2 border-gray-300 dark:border-gray-600 bg-blue-500 dark:bg-gray-800"
                      startContent={<UploadCloudIcon className="w-4 h-4" />}
                    >
                      Upload File
                    </Button>
                    <Button
                      onClick={() => setUploadType("link")}
                      color="secondary"
                      variant="solid"
                      className="border-2 border-gray-300 dark:border-gray-600 bg-blue-500 dark:bg-gray-800"
                      startContent={<LinkIcon className="w-4 h-4" />}
                    >
                      Insert Link
                    </Button>
                  </div>
                )}
                {uploadType === "file" && (
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    description="Upload Image file less than 3MB."
                    className="text-sm text-gray-600 dark:text-gray-300"
                  />
                )}
                {uploadType === "link" && (
                  <div className="flex flex-col gap-2">
                    <Input
                      placeholder="Enter Image URL"
                      value={imageUrl}
                      startContent={<LinkIcon className="w-4 h-4" />}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="text-sm text-gray-800 dark:text-gray-200"
                      description="Enter a valid image URL, that ends with a valid image extension (.jpg, .png, .gif, .webp)."
                    />
                  </div>
                )}
                {imageUrl && (
                  <div className="h-64 relative">
                    <Cropper
                      image={imageUrl}
                      crop={crop}
                      zoom={zoom}
                      aspect={
                        IMAGE_TYPES[imageType].width /
                        IMAGE_TYPES[imageType].height
                      }
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={handleCropComplete}
                    />
                  </div>
                )}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  onClick={handleUpload}
                  disabled={isUploading || !imageUrl}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
