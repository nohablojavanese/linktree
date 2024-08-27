import React, { useState } from "react";
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
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/utils";
import { z } from 'zod';
import { redirect } from 'next/navigation';
// Define the image types and their corresponding dimensions
const IMAGE_TYPES = {
  image: { width: 200, height: 200 },
  hero: { width: 1500, height: 500 },
  background: { width: 1920, height: 1080 },
};
type ImageType = keyof typeof IMAGE_TYPES;

interface ImageUploaderProps {
  imageType: ImageType;
  onUploadComplete: (url: string) => void;
}
const urlSchema = z.string().url().refine((url) => {
  return /\.(jpeg|jpg|gif|png|webp)$/i.test(url);
}, "URL must end with a valid image extension (.jpg, .png, .gif, .webp)");
async function getAuthenticatedUser() {
  const supabase = createClient();
  const session = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (!session) redirect("/login");

  return user;
}
export const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageType,
  onUploadComplete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"file" | "link" | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadType(null);
    setImageUrl("");
    setFile(null);
    setIsCropping(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setIsCropping(true);
    }
  };
  const isValidImageUrl = (url: string): boolean => {
    return /\.(jpeg|jpg|gif|png|webp)$/i.test(url);
  };
  const handleLinkSubmit = () => {
    setError(null);
    try {
      urlSchema.parse(imageUrl);
      // If parsing succeeds, proceed with loading the image
      const img = new Image();
      img.onload = () => {
        setIsCropping(true);
      };
      img.onerror = () => {
        setError("Unable to load the image. Please check the URL and try again.");
      };
      img.src = imageUrl;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError("Invalid image URL. Please try again.");
      }
    }
  };

  const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(
        imageUrl,
        croppedAreaPixels,
        IMAGE_TYPES[imageType].width,
        IMAGE_TYPES[imageType].height
      );
      setImageUrl(croppedImage);
      setIsCropping(false);
    } catch (e) {
      console.error("Error cropping image:", e);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setError(null);
    const supabase = createClient();

    try {
      const user = await getAuthenticatedUser();

      // Convert base64 to blob
      const res = await fetch(imageUrl);
      const blob = await res.blob();

      const fileName = `${user.id}_${imageType}_${Date.now()}.jpg`;
      const bucketName = `user_${imageType}`;

      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      if (publicUrlData) {
        // Update user profile with new image URL
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ [`${imageType}_url`]: publicUrlData.publicUrl })
          .eq('id', user.id);

        if (updateError) throw updateError;

        onUploadComplete(publicUrlData.publicUrl);
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError( 'An error occurred while uploading the image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Button onClick={handleUploadClick}>Upload {imageType} Image</Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload {imageType} Image
              </ModalHeader>
              <ModalBody>
                {!uploadType && (
                  <div className="flex gap-2 justify-center">
                    <Button onClick={() => setUploadType("file")}>
                      Upload File
                    </Button>
                    <Button onClick={() => setUploadType("link")}>
                      Upload Link
                    </Button>
                  </div>
                )}
                {uploadType === "file" && (
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                )}
                {uploadType === "link" && (
                  <div className="flex flex-col gap-2">
                    <Input
                      placeholder="Enter image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <Button onClick={handleLinkSubmit}>Submit</Button>
                  </div>
                )}
                {isCropping && (
                  <div style={{ height: "300px", position: "relative" }}>
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
                {!isCropping && imageUrl && (
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "300px" }}
                    />
                    <div className="flex gap-2">
                      <Button color="danger" onClick={() => setImageUrl("")}>
                        Delete
                      </Button>
                      <Button
                        color="primary"
                        onClick={handleUpload}
                        disabled={isUploading}
                      >
                        {isUploading ? "Uploading..." : "Upload"}
                      </Button>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {isCropping ? (
                  <>
                    <Button color="danger" onClick={() => setIsCropping(false)}>
                      Cancel
                    </Button>
                    <Button color="primary" onClick={handleCrop}>
                      Crop
                    </Button>
                  </>
                ) : (
                  <Button color="danger" onClick={onClose}>
                    Close
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
