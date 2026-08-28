import React, { useEffect, useRef } from "react";
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
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Handle Touch Swipe Navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Horizontal swipe threshold: 45px, and ensure it was primarily horizontal
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        // Swiped Left -> Next Photo
        onNext();
      } else {
        // Swiped Right -> Prev Photo
        onPrev();
      }
    } else if (diffY < -80) {
      // Swiped down -> close
      onClose();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="lb-header">
        <div className="lb-counter">
          {currentIndex + 1} / {photos.length}
        </div>
        <button
          className="lb-close"
          id="lbClose"
          onClick={onClose}
          aria-label="Tutup foto"
          type="button"
        >
          &times;
        </button>
      </div>

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

      <div className="lb-img-wrap">
        <img
          id="lbImg"
          src={currentPhoto.fullSrc}
          alt={currentPhoto.alt || "Galeri Foto"}
        />
        {currentPhoto.alt && (
          <div className="lb-caption">{currentPhoto.alt}</div>
        )}
      </div>

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

      <div className="lb-hint">Usap ke kiri/kanan untuk navigasi</div>
    </div>
  );
}

