import React from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { BiGlobeAlt } from "react-icons/bi";
import { Copy, Globe, QrCodeIcon } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import toast from "sonner";
interface ShareOption {
  name: string;
  icon: string;
  shareUrl: string;
}

const shareOptions: ShareOption[] = [
  {
    name: "Share on Snapchat",
    icon: "/Social/snapchat.png",
    shareUrl: "https://www.snapchat.com/scan?attachmentUrl=",
  },
  {
    name: "Share on Facebook",
    icon: "/Social/facebook.png",
    shareUrl: "https://www.facebook.com/sharer.php?u=",
  },
  {
    name: "Share on LinkedIn",
    icon: "/Social/linkedin.png",
    shareUrl: "https://www.linkedin.com/shareArticle?mini=true&url=",
  },
  {
    name: "Share on X",
    icon: "/Social/x.png",
    shareUrl: "https://twitter.com/intent/tweet?url=",
  },
  {
    name: "Share via WhatsApp",
    icon: "/Social/whatsapp.png",
    shareUrl: "https://api.whatsapp.com/send?text=",
  },
  {
    name: "Share via Email",
    icon: "/Social/email.png",
    shareUrl: "mailto:?body=",
  },
];

interface ShareOptionsProps {
  Url: string;
  showSocialOptions?: boolean;
  onShareClick?: () => void;
  onQRClick?: () => void;
  onBack?: () => void;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({
  Url,
  showSocialOptions,
  onShareClick,
  onQRClick,
  onBack,
}) => {
  const handleShare = (shareUrl: string) => {
    window.open(shareUrl + encodeURIComponent(Url), "_blank");
  };

  const renderButton = (
    text: string,
    icon: string | React.ReactNode,
    onClick?: () => void,
    shareUrl?: string,
    className?: string
  ) => (
    <Button
      key={text}
      onPress={shareUrl ? () => handleShare(shareUrl) : onClick}
      startContent={
        typeof icon === "string" ? (
          <Image src={icon} alt={text} width={24} height={24} />
        ) : (
          icon
        )
      }
      className={`w-full justify-start mb-2 ${className}`}
    >
      {text}
    </Button>
  );

  if (showSocialOptions) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {shareOptions.map((option) =>
          renderButton(
            option.name,
            option.icon,
            undefined,
            option.shareUrl,
            "bg-white hover:bg-gray-100 text-gray-800"
          )
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {renderButton(
        "Add to your socials",
        <BiGlobeAlt className="w-5 h-5" />,
        onShareClick,
        undefined,
        "bg-blue-500 hover:bg-blue-600 text-white"
      )}
      {renderButton(
        "My Linktree QR code",
        <QrCodeIcon className="w-5 h-5" />,
        onQRClick,
        undefined,
        "bg-green-500 hover:bg-green-600 text-white"
      )}
      {renderButton(
        "Send Instagram Auto-DMs",
        <FaInstagram className="w-5 h-5" />,
        undefined,
        undefined,
        "bg-pink-500 hover:bg-pink-600 text-white"
      )}
      {renderButton(
        "Open Profile",
        <Globe className="w-5 h-5" />,
        () => window.open(Url, "_blank"),
        undefined,
        "bg-indigo-500 hover:bg-indigo-600 text-white"
      )}
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded text-gray-700">
        <span className="truncate mr-2">{Url}</span>
        <Button
          onPress={() => {
            navigator.clipboard.writeText(Url);
            // toast.success("URL copied to clipboard!");
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white"
          startContent={<Copy className="w-4 h-4" />}
        >
          Copy
        </Button>
      </div>
    </div>
  );
};

export default ShareOptions;
