"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WatermarkProps {
  username: string;
  verified?: boolean;
}

const Watermark: React.FC<WatermarkProps> = ({ verified, username }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (verified) {
      // Hide after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [verified]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.footer
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 text-center text-white"
        >
          {verified ? (
            <div className="flex justify-center items-center">
              <span>Welcome to {username} </span>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <span>Create a link like this </span>
              <a
                href="/login"
                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
              >
                Create Now
              </a>
            </div>
          )}
        </motion.footer>
      )}
    </AnimatePresence>
  );
};

export default Watermark;
