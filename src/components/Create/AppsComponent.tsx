import React from "react";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/ui/carousel";
import { Link, Upload, ImageIcon, MoreHorizontal } from "lucide-react";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { MdFacebook, MdYoutubeSearchedFor } from "react-icons/md";
import { BiLogoTiktok } from "react-icons/bi";
import Image from "next/image";

type AppOption = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

const appOptions: AppOption[] = [
  { key: "link", icon: <Link size={24} />, label: "Link" },
  { key: "image", icon: <ImageIcon size={24} />, label: "Image" },
  { key: "instagram", icon: <InstagramLogoIcon />, label: "Instagram" },
  { key: "upload", icon: <Upload size={24} />, label: "Upload" },
  { key: "facebook", icon: <MdFacebook size={24} />, label: "Facebook" },
  { key: "twitter", icon: <TwitterLogoIcon />, label: "Twitter" },
  {
    key: "tiktok_profile",
    icon: <BiLogoTiktok size={24} />,
    label: "TikTok Profile",
  },
  {
    key: "tiktok_video",
    icon: <BiLogoTiktok size={24} />,
    label: "TikTok Video",
  },
  {
    key: "youtube",
    icon: <MdYoutubeSearchedFor size={24} />,
    label: "YouTube",
  },
  {
    key: "more",
    icon: <MoreHorizontal size={24} />,
    label: "More",
  }
];

type AppSelectorProps = {
  selectedApp: string;
  onAppSelect: (app: string) => void;
};

export const AppSelector: React.FC<AppSelectorProps> = ({
  selectedApp,
  onAppSelect,
}) => {
  const handleCarouselButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {appOptions.map((app) => (
            <CarouselItem
              key={app.key}
              className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <Card
                className={cn(
                  "flex flex-col items-center justify-center p-2 cursor-pointer transition-all w-full h-20 md:h-24",
                  selectedApp === app.key
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                )}
                onClick={() => onAppSelect(app.key)}
              >
                <CardContent className="flex flex-col items-center justify-center p-1 md:p-2">
                  <div className="text-2xl md:text-3xl">{app.icon}</div>
                  <span className="mt-1 text-[10px] md:text-xs text-center line-clamp-1">{app.label}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" onMouseDown={handleCarouselButtonClick} />
        <CarouselNext className="hidden md:flex" onMouseDown={handleCarouselButtonClick} />
      </Carousel>
    </div>
  );
};
