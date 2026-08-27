import React, { useEffect } from "react";
import type { GalleryPhoto } from "../types/invitation";

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  photos: GalleryPhoto[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({
  isOpen,
  currentIndex,
  photos,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <div
      className={`lightbox ${isOpen ? "open" : ""}`}
      id="lightbox"
      data-testid="lightbox"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="lb-close"
        id="lbClose"
        onClick={onClose}
        aria-label="Tutup foto"
        type="button"
      >
        &times;
      </button>

      <button
        className="lb-nav lb-prev"
        id="lbPrev"
        onClick={onPrev}
        aria-label="Foto sebelumnya"
        type="button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <img
        id="lbImg"
        src={currentPhoto.fullSrc}
        alt={currentPhoto.alt || "Galeri Foto"}
      />

      <button
        className="lb-nav lb-next"
        id="lbNext"
        onClick={onNext}
        aria-label="Foto selanjutnya"
        type="button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
