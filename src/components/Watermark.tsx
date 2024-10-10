"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WatermarkProps {
  username: string;
  verified?: boolean;
  notFound?: boolean;
}

const Watermark: React.FC<WatermarkProps> = ({
  verified,
  username,
  notFound = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (verified) {
      // Hide after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
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
          className="fixed bottom-4 left-0 right-0 mx-auto px-4 z-50"
        >
          <div className="bg-gray-800 text-white text-xs md:text-sm rounded-2xl shadow-lg p-4 max-w-max mx-auto">
            {verified ? (
              <div className="flex flex-col justify-center items-center">
                <span className="font-bold">Welcome to @{username}</span>
                <a href="/login" className="mt-2">
                  <span>
                    {notFound
                      ? `Built using Wisp, create your own Wisp.bio/${username}`
                      : "Built using Wisp, create your own Wisp.bio/you"}
                  </span>
                </a>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <a href="/login">
                  <span>
                    {notFound ? (
                      <>
                        This Page is available! Create your own{" "}
                        <strong>Wisp.bio/{username}</strong> before someone else
                        claims it!
                      </>
                    ) : (
                      <>
                        Built using Wisp, create your own{" "}
                        <strong>Wisp.bio/you</strong>
                      </>
                    )}
                  </span>
                </a>
              </div>
            )}
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
};

export default Watermark;
