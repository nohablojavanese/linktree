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
          className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 text-center text-white text-xs md:text-md"
        >
          {verified ? (
            <div className="flex justify-center items-center">
              <span>Welcome to @{username} </span>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <a href="/login" className="">
                <span>Built by LokerAI, create your own Links.id/you </span>
              </a>
            </div>
          )}
        </motion.footer>
      )}
    </AnimatePresence>
  );
};

export default Watermark;
