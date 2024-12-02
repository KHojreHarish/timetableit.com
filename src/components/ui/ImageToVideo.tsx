"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

const ImageToVideo: React.FC<{ imageUrl: string; youtubeId: string }> = ({
  imageUrl,
  youtubeId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const handleClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Handle ESC key press to close modal (optional)
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = ""; // Reset on cleanup
    };
  }, [isOpen]);

  return (
    <div className="image-container">
      <Image
        src={imageUrl}
        alt="Video: What can Calendar Online do for you?"
        onClick={handleClick}
        height={1440}
        width={1440}
      />
      {isOpen && (
        <div className="video-modal">
          <iframe
            ref={videoRef}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            allowFullScreen
            title="YouTube video"
            className="video-modal-iframe"
          />
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageToVideo;
