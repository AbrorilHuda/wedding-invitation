import React from "react";

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
  const handleShare = () => {
    if (typeof window === "undefined") return;

    const url = window.location.href;
    const greeting = guestName ? ` untuk ${guestName}` : "";
    const text = `Bismillah, dengan penuh kebahagiaan kami mengundang Anda${greeting} ke pernikahan Miftah & Sofia. Buka undangan: ${url}`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
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
        aria-label="Toggle Musik"
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
        title="Bagikan ke WhatsApp"
        onClick={handleShare}
        type="button"
        aria-label="Bagikan Undangan"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.42 1.32-1.95 1.36-.5.05-.98.22-3.3-.69-2.79-1.1-4.55-3.96-4.69-4.15-.14-.19-1.13-1.5-1.13-2.86s.71-2.03.96-2.31c.24-.28.54-.35.72-.35.18 0 .36 0 .52.01.17.01.39-.06.61.47.24.55.79 1.9.86 2.04.07.14.12.3.02.49-.1.19-.14.3-.29.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.57.17.28.75 1.24 1.61 2 1.11.99 2.05 1.3 2.33 1.44.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.37-.23.61-.14.24.09 1.55.73 1.81.86.27.14.44.21.51.32.07.12.07.66-.17 1.34z" />
        </svg>
      </button>
    </div>
  );
}
