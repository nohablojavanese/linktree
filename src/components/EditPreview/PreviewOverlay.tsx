'use client'
import React, { useState, ReactNode } from 'react';
import { X } from 'lucide-react';

interface PreviewOverlayProps {
  children: ReactNode;
}

const PreviewOverlay: React.FC<PreviewOverlayProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg z-10"
      >
        Preview
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-full h-full relative overflow-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewOverlay;