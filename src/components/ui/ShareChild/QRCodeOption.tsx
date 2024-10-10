"use client";
import React, { useState, useRef } from "react";
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Upload, Palette } from "lucide-react";

interface QRCodeOptionProps {
  Url: string;
  onBack: () => void;
}

const QRCodeOption: React.FC<QRCodeOptionProps> = ({ Url, onBack }) => {
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logo, setLogo] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      const svg = qrCodeRef.current.querySelector("svg");
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = "qrcode.png";
          downloadLink.href = pngFile;
          downloadLink.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={qrCodeRef} className="bg-white p-4 rounded-lg shadow-md">
        <QRCodeSVG
          value={Url}
          size={200}
          fgColor={qrColor}
          bgColor={bgColor}
          level="H"
          title={`Scan this QR code to open ${Url}`}
          imageSettings={{
            src: logo,
            x: undefined,
            y: undefined,
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
      </div>
      <p className="mt-4 text-center text-gray-600">{Url}</p>

      <div className="mt-2 text-black space-y-4 w-full max-w-xs">
        {/* QR Color */}
        <div className="flex space-x-4">
          <div className="w-1/2 flex flex-col items-center">
            <label
              htmlFor="qrColor"
              className="mb-2 text-sm font-medium text-center"
            //   style={{ color: qrColor }}
            >
              QR Color
            </label>
            <div className="flex items-center">
              <Palette className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="color"
                id="qrColor"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-8 h-8 p-0 border-0 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="ml-2 px-2 py-1 w-20 text-sm border rounded-md text-center"
                // style={{ color: 'black' }}
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center">
            <label
              htmlFor="bgColor"
              className="mb-2 text-sm font-medium text-center"
            //   style={{ color: bgColor }}
            >
              Background Color
            </label>
            <div className="flex items-center">
              <Palette className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="color"
                id="bgColor"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-8 h-8 p-0 border-0 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="ml-2 px-2 py-1 w-20 text-sm border rounded-md text-center"
                // style={{ color: 'black' }}
              />
            </div>
          </div>
        </div>

        {/* Logo */}

        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          ref={fileInputRef}
          className="hidden"
        />
        <Button
          onPress={() => fileInputRef.current?.click()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          startContent={<Upload className="w-5 h-5" />}
        >
          Upload Logo
        </Button>
        <Dropdown>
          <DropdownTrigger>
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
              Choose Preset Logo
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Preset Logos">
            <DropdownItem
              key="default"
              onPress={() => setLogo("/path/to/default-logo.png")}
            >
              Default Logo
            </DropdownItem>
            {/* Add more preset logos here */}
          </DropdownMenu>
        </Dropdown>
        <Button
          onPress={downloadQRCode}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          startContent={<Download className="w-5 h-5" />}
        >
          Download QR Code
        </Button>
      </div>
    </div>
  );
};

export default QRCodeOption;
