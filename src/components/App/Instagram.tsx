"use client";

import React, { useEffect, useRef } from "react";
import { LinkItemProps } from "./LinkItems";
import Script from "next/script";
import LinkWrapper from "./LinkWrapper";

const InstagramEmbed: React.FC<LinkItemProps> = (props) => {
  const { title, url } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if (containerRef.current) {
          containerRef.current.style.height = `${width}px`;
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <LinkWrapper {...props}>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
        <div
          ref={containerRef}
          className="relative w-full bg-white rounded-2xl p-2 overflow-hidden"
          style={{ minHeight: "300px", maxHeight: "600px" }}
        >
          <blockquote
            className="instagram-media w-full h-full"
            data-instgrm-captioned
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: "0",
              borderRadius: "0px",
              boxShadow: "none",
              display: "block",
              margin: "0",
              minWidth: "auto",
              padding: "0",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          </blockquote>
          <Script
            src="https://www.instagram.com/embed.js"
            strategy="lazyOnload"
            onLoad={() => {
              if (window.instgrm) {
                window.instgrm.Embeds.process();
              }
            }}
          />
        </div>
      </div>
    </LinkWrapper>
  );
};

export default InstagramEmbed;
