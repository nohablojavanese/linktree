import React, { useState, useEffect } from "react";
import { Button } from "@/components/shadcn/ui/button"; // Import Button component
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/shadcn/ui/carousel";
import { Link, Upload, ImageIcon, MoreHorizontal } from "lucide-react";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { MdFacebook, MdYoutubeSearchedFor } from "react-icons/md";
import { BiLogoSpotify, BiLogoTiktok } from "react-icons/bi";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
type AppOption = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

const appOptions: AppOption[] = [
  { key: "Link", icon: <Link size={24} />, label: "Link" },
  { key: "Image", icon: <ImageIcon size={24} />, label: "Image" },
  { key: "Instagram", icon: <InstagramLogoIcon />, label: "Instagram" },
  { key: "File Upload", icon: <Upload size={24} />, label: "Upload" },
  { key: "Facebook", icon: <MdFacebook size={24} />, label: "Facebook" },
  { key: "Twitter", icon: <TwitterLogoIcon />, label: "Twitter" },
  { key: "Spotify", icon: <BiLogoSpotify />, label: "Spotify" },

  {
    key: "Tiktok Profile",
    icon: <BiLogoTiktok size={24} />,
    label: "TikTok Profile",
  },
  {
    key: "Tiktok Video",
    icon: <BiLogoTiktok size={24} />,
    label: "TikTok Video",
  },
  {
    key: "Youtube",
    icon: <MdYoutubeSearchedFor size={24} />,
    label: "YouTube",
  },
  {
    key: "Custom",
    icon: <MoreHorizontal size={24} />,
    label: "Custom",
  },
];

type AppSelectorProps = {
  selectedApp: string;
  onAppSelect: (app: string) => void;
  onClose: () => void; // Add this prop
};

export const AppSelector: React.FC<AppSelectorProps> = ({
  selectedApp,
  onAppSelect,
  onClose, // Add this prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [userSelected, setUserSelected] = useState<number | null>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!api || !thumbApi) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      thumbApi.scrollTo(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, thumbApi]);

  const handleThumbClick = (index: number) => {
    api?.scrollTo(index);
    setUserSelected(index);
    onAppSelect(appOptions[index].key);
  };

  return (
    <div className="w-full mx-auto space-y-2">
      <Button
        onClick={toggleOpen}
        variant="outline"
        className={`w-full max-w-full rounded-full relative overflow-hidden group transition-colors duration-300 ${
          isOpen || !selectedApp
            ? "bg-gray-500 text-white hover:bg-gray-600 hover:text-white"
            : "bg-blue-500 text-white hover:bg-blue-600  hover:text-white"
        }`}
      >
        <span className="relative z-10 w-full text-center">
          {isOpen
            ? selectedApp
              ? `Selecting ${selectedApp}`
              : "Select an App"
            : selectedApp
            ? `Using ${selectedApp} (Click to change)`
            : "Add App"}
        </span>
        <div
          className={`absolute inset-0 h-full w-full transform -translate-x-full transition-transform duration-300 ease-in-out ${
            isOpen || !selectedApp ? "bg-gray-600" : "bg-blue-600"
          } group-hover:translate-x-0`}
        />
      </Button>

      {isOpen && (
        <div className="transition-all duration-300 ease-in-out space-y-4">
          {/* Jumbotron Carousel */}
          <Carousel
            plugins={[
              AutoScroll({
                speed: 2,
                startDelay: 1000,
                stopOnFocusIn: true,
                stopOnMouseEnter: true,
                // stopOnInteraction: false,
              }),
            ]}
            setApi={setApi}
            className="max-w-[400px] mx-auto rounded-xl overflow-hidden" // Added rounding and overflow hidden
          >
            <CarouselContent>
              {appOptions.map((app, index) => (
                <CarouselItem key={app.key}>
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                    {" "}
                    {/* Added rounding to each item */}
                    <Image
                      src={`/image.png`}
                      alt={app.label}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold">
                      {" "}
                      {/* Reduced text size */}
                      {index + 1}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-12" />
            <CarouselNext className="hidden sm:flex -right-12" />
          </Carousel>

          {/* Thumbnail Carousel */}
          <Carousel
            setApi={setThumbApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {appOptions.map((app, index) => (
                <CarouselItem
                  key={app.key}
                  className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <Card
                    className={cn(
                      "flex flex-col items-center justify-center p-2 cursor-pointer transition-all w-full h-20 md:h-24",
                      userSelected === index
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                        : "border-gray-200 hover:border-gray-300  dark:border-gray-700 dark:hover:border-gray-600"
                    )}
                    onClick={() => handleThumbClick(index)}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-1 md:p-2">
                      <div className="text-2xl md:text-3xl">{app.icon}</div>
                      <span className="mt-1 text-[10px] md:text-xs text-center line-clamp-1">
                        {app.label}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </div>
  );
};
