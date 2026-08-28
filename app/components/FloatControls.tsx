import React from "react";
import { WEDDING_CONFIG } from "../config/wedding";

interface FloatControlsProps {
  isVisible: boolean;
  isPlaying: boolean;
  onToggleMusic: () => void;
  guestName?: string;
}

export function FloatControls({
  isVisible,
  isPlaying,
  onToggleMusic,
  guestName,
}: FloatControlsProps) {
  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const url = window.location.href;
    const couple = `${WEDDING_CONFIG.groom.name} & ${WEDDING_CONFIG.bride.name}`;
    const greeting = guestName ? ` untuk ${guestName}` : "";
    const title = `Undangan Pernikahan ${couple}`;
    const text = `Bismillah, dengan penuh kebahagiaan kami mengundang Anda${greeting} ke pernikahan ${couple}. Buka undangan:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to WhatsApp
      }
    }

    const fullMessage = `${text} ${url}`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`float-controls ${isVisible ? "on" : ""}`}
      id="floatControls"
    >
      <button
        className={`fbtn ${!isPlaying ? "paused" : ""}`}
        id="musicBtn"
        data-testid="music-toggle-button"
        title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        onClick={onToggleMusic}
        type="button"
        aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
      >
        <div className="music-bars">
          <span />
          <span />
          <span />
          <span />
        </div>
      </button>

      <button
        className="fbtn"
        id="shareBtn"
        data-testid="share-whatsapp-button"
        title="Bagikan Undangan"
        onClick={handleShare}
        type="button"
        aria-label="Bagikan Undangan"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </button>
    </div>
  );
}

